---
title: Video Dubbing Auto-Sync (Part 2) The Evolution from "Ideal Model" to "Engineering Reality"
date: 2025-07-21 14:33:00
description: When we deployed this model into more complex real-world applications, we realized the real challenges had just begun. Real-world media processing is full of tiny, unpredictable "uncertainties." A theoretically perfect model often crumbles in the face of these uncertainties.
---


[In the previous article](/en/blog/audio-subtitles-video-sync), we explored the basic idea of automating video dubbing synchronization and built a preliminary framework. The core idea of that framework was "decoupling": splitting the process into four independent stages: preparation, decision, execution, and merging. This architecture freed us from fragile single-loop logic, taking the first step from "usable" to "reliable."

However, when we deployed this model into more complex real-world applications, we realized the real challenges had just begun. Real-world media processing is full of tiny, unpredictable "uncertainties." A theoretically perfect model often crumbles in the face of these uncertainties.

This article continues our exploration journey, focusing on how to handle these "devilish details," and how our automation solution evolved step by step from an "ideal model" into an "engineering reality" capable of advancing steadily under fire.

## The Millisecond "Lie" of `ffmpeg`

The previous strategy of "absorbing" tiny gaps by merging tens of milliseconds of silence into the preceding video clip avoided the "jump frame" problem. In theory, this should perfectly maintain timeline continuity.

But reality soon delivered a heavy blow. We discovered that even when precisely commanding `ffmpeg` to create a `2540` millisecond clip, the actual duration of the file it generated might be `2543` ms, or `2538` ms. This tiny deviation stems from the inherent complexity of video encoding—factors like frame rate and keyframe positions affect the precise final output duration.

A few milliseconds of error in a single clip seem harmless. But in a long video with hundreds of clips, these tiny errors accumulate continuously. By the time processing reaches the latter half of the video, the cumulative deviation could reach several seconds or even tens of seconds, enough to cause audio and video to fall out of sync again.

Our initial "ideal model"—which used a variable `current_timeline_ms` to accumulate the **estimated duration** of each clip—completely failed in the face of this reality.

## From "Predicting the Future" to "Acknowledging Reality"

After careful consideration, I decided: **Abandon predicting the future and instead build the timeline entirely based on what has already happened.**

I introduced a new, more reality-aligned logic to reconstruct the audio merging stage (`_recalculate_timeline_and_merge_audio`).

**The core of the new logic is:**
1.  **Factual Baseline**: At any moment, `len(merged_audio)`—the total duration of the currently concatenated audio—is the only trusted "fact." It represents where the timeline truly stands.
2.  **Dynamic Calibration**: When preparing to concatenate the next subtitle segment `it`, we no longer assume it should start at the estimated time point `it['start_time']`. Instead, we first make a comparison:
    *   `offset = it['start_time'] - len(merged_audio)`

    This `offset` is the gap between "expectation" and "reality."
3.  **Intelligent Response**:
    *   **If `offset > 0`**: This means "reality" is lagging behind "expectation" (previous clips were actually shorter than estimated). At this point, sound cannot appear early. We must use a silent segment of `offset` duration to "wait" for the timeline to reach the correct position.
    *   **If `offset < 0`**: This means "reality" is ahead of "expectation" (previous clips were actually longer than estimated). At this point, we cannot brutally cut out existing sound. We must "acknowledge" this fact and push the start time of the current subtitle back by `abs(offset)` milliseconds to catch up with reality.

To propagate the impact of this "push-back," we introduced a crucial variable: `add_extend_time`. Whenever a clip is forced to be pushed back, this shift amount is accumulated into `add_extend_time`. The `start_time` and `end_time` of all subsequent subtitles are then incremented by this cumulative offset.

This mechanism transformed our timeline construction process from a rigid plan into a dynamic system with self-calibration capabilities. It is no longer afraid of `ffmpeg`'s millisecond "lies" because it can always dynamically adjust the position of subsequent segments based on the already concatenated parts, ensuring every step is taken on solid ground.

## The "Last Mile" of Audio Speedup: `atempo` and `pydub` Working in Tandem

Similar "precision" issues were encountered in audio speedup practice. While `pydub`'s `speedup` method is convenient, it sometimes results in significant audio quality loss. Therefore, we decided to use `ffmpeg`'s `atempo` filter.

`atempo` offers superior audio quality, but it also suffers from tiny deviations between the output duration and the theoretically calculated value. To solve this "last mile" precision problem, we designed a two-stage speedup strategy, encapsulated in the new `_audio_speedup` method.

1.  **Coarse Adjustment (ffmpeg atempo)**: First, use the `atempo` filter for the main speed change. For example, to speed up by 1.8x, we use `atempo=1.8`. This completes 99% of the work while ensuring audio quality.
2.  **Fine Adjustment (pydub trimming)**: Immediately after `atempo` processing, read its actual duration with `pydub`. Suppose we expect a `3000ms` audio, but `atempo` actually outputs `3008ms`. This 8ms gap is handled by `pydub`. A simple slicing operation `audio[:-8]` precisely trims the excess, yielding a perfect audio segment of exactly `3000ms`.

## The Final Evolved Version

After this series of iterations and refactoring, the `SpeedRate` class ultimately evolved into a more mature and robust form. It learned not to blindly trust the plan but to constantly adjust dynamically based on reality. It uses more professional tools for core tasks while employing more flexible methods to compensate for these tools' minor imperfections.

Below is the final implementation. It may not be the most "elegant"; the code is filled with various defensive checks and dynamic adjustment logic. But it is precisely these seemingly "tedious" parts that form the sturdy armor enabling it to run stably in a complex and ever-changing real world.

```python
import os
import shutil
import time
from pathlib import Path
import concurrent.futures

from pydub import AudioSegment
from pydub.exceptions import CouldntDecodeError

from videotrans.configure import config
from videotrans.util import tools

class SpeedRate:
    """
    Aligns translated dubbing audio with the original video timeline through audio speedup and video slowdown.
    This is a robust version refined through multiple practical iterations, focusing on handling real-world uncertainties.
    """

    MIN_CLIP_DURATION_MS = 50  # Minimum valid clip duration (milliseconds)

    def __init__(self,
                 *,
                 queue_tts=None,
                 shoud_videorate=False,
                 shoud_audiorate=False,
                 uuid=None,
                 novoice_mp4=None,
                 raw_total_time=0,
                 noextname=None,
                 target_audio=None,
                 cache_folder=None
                 ):
        self.queue_tts = queue_tts
        self.shoud_videorate = shoud_videorate
        self.shoud_audiorate = shoud_audiorate
        self.uuid = uuid
        self.novoice_mp4_original = novoice_mp4
        self.novoice_mp4 = novoice_mp4
        self.raw_total_time = raw_total_time
        self.noextname = noextname
        self.target_audio = target_audio
        self.cache_folder = cache_folder if cache_folder else Path(f'{config.TEMP_DIR}/{str(uuid if uuid else time.time())}').as_posix()
        Path(self.cache_folder).mkdir(parents=True, exist_ok=True)
        
        self.max_audio_speed_rate = max(1.0, float(config.settings.get('audio_rate', 5.0)))
        self.max_video_pts_rate = max(1.0, float(config.settings.get('video_rate', 10.0)))
        
        config.logger.info(f"SpeedRate initialized for '{self.noextname}'. AudioRate: {self.shoud_audiorate}, VideoRate: {self.shoud_videorate}")
        config.logger.info(f"Config limits: MaxAudioSpeed={self.max_audio_speed_rate}, MaxVideoPTS={self.max_video_pts_rate}, MinClipDuration={self.MIN_CLIP_DURATION_MS}ms")

    def run(self):
        """Main execution function"""
        self._prepare_data()
        self._calculate_adjustments()
        self._execute_audio_speedup()
        self._execute_video_processing()
        merged_audio = self._recalculate_timeline_and_merge_audio()
        if merged_audio:
            self._finalize_audio(merged_audio)
        return self.queue_tts

    def _prepare_data(self):
        """Step 1: Prepare and initialize data."""
        tools.set_process(text="Preparing data...", uuid=self.uuid)

        # Phase 1: Initialize independent data
        for it in self.queue_tts:
            it['start_time_source'] = it['start_time']
            it['end_time_source'] = it['end_time']
            it['source_duration'] = it['end_time_source'] - it['start_time_source']
            it['dubb_time'] = int(tools.get_audio_time(it['filename']) * 1000) if tools.vail_file(it['filename']) else 0
            it['target_audio_duration'] = it['dubb_time']
            it['target_video_duration'] = it['source_duration']
            it['video_pts'] = 1.0
        
        # Phase 2: Calculate gaps
        for i, it in enumerate(self.queue_tts):
            if i < len(self.queue_tts) - 1:
                next_item = self.queue_tts[i + 1]
                it['silent_gap'] = next_item['start_time_source'] - it['end_time_source']
            else:
                it['silent_gap'] = self.raw_total_time - it['end_time_source']
            it['silent_gap'] = max(0, it['silent_gap'])

    def _audio_speedup(self, audio_file, atempo, target_duration_ms):
        """Use ffmpeg atempo for coarse adjustment + pydub for fine-tuning to achieve precise audio speedup"""
        ext = Path(audio_file).suffix[1:]
        input_file = f"{audio_file}.tmp.{ext}"
        shutil.copy2(audio_file, input_file)
        try:
            tools.runffmpeg(["-y", "-i", input_file, "-filter:a", f"atempo={atempo}", audio_file])
            audio = AudioSegment.from_file(audio_file, format=ext)
            real_time = len(audio)
            diff = real_time - target_duration_ms
            
            # For tiny differences within 50ms, use pydub to force-trim for precise alignment
            if 0 < diff < 50:
                fast_audio = audio[:-diff]
                fast_audio.export(audio_file, format=ext)
                return len(fast_audio)
            return real_time
        finally:
            if Path(input_file).exists():
                os.remove(input_file)

    def _calculate_adjustments(self):
        """Step 2: Calculate adjustment plans."""
        tools.set_process(text="Calculating adjustments...", uuid=self.uuid)
        for i, it in enumerate(self.queue_tts):
            
            if it['dubb_time'] > it['source_duration'] and tools.vail_file(it['filename']):
                try:
                    _, _ = tools.remove_silence_from_file(it['filename'], silence_threshold=-50.0, chunk_size=10, is_start=True)
                    it['dubb_time'] = int(tools.get_audio_time(it['filename']) * 1000)
                except Exception as e:
                    config.logger.warning(f"Could not remove silence from {it['filename']}: {e}")

            effective_source_duration = it['source_duration']
            if it.get('silent_gap', 0) < self.MIN_CLIP_DURATION_MS:
                effective_source_duration += it['silent_gap']

            if it['dubb_time'] <= effective_source_duration or effective_source_duration <= 0:
                continue

            dub_duration = it['dubb_time']
            source_duration = effective_source_duration
            silent_gap = it['silent_gap']
            over_time = dub_duration - source_duration

            if self.shoud_audiorate and not self.shoud_videorate:
                required_speed = dub_duration / source_duration
                if required_speed <= 1.5:
                    it['target_audio_duration'] = source_duration
                else:
                    available_time = source_duration + (silent_gap if silent_gap >= self.MIN_CLIP_DURATION_MS else 0)
                    duration_at_1_5x = int(dub_duration / 1.5)
                    it['target_audio_duration'] = duration_at_1_5x if duration_at_1_5x <= available_time else available_time
            
            elif not self.shoud_audiorate and self.shoud_videorate:
                required_pts = dub_duration / source_duration
                if required_pts <= 1.5:
                    it['target_video_duration'] = dub_duration
                else:
                    available_time = source_duration + (silent_gap if silent_gap >= self.MIN_CLIP_DURATION_MS else 0)
                    duration_at_1_5x = source_duration * 1.5
                    it['target_video_duration'] = duration_at_1_5x if duration_at_1_5x <= available_time else available_time
            
            elif self.shoud_audiorate and self.shoud_videorate:
                if over_time <= 1000:
                    it['target_audio_duration'] = source_duration
                else:
                    adjustment_share = over_time // 2
                    it['target_audio_duration'] = dub_duration - adjustment_share
                    it['target_video_duration'] = source_duration + adjustment_share

            if self.shoud_audiorate and it['target_audio_duration'] < dub_duration:
                speed_ratio = dub_duration / it['target_audio_duration']
                if speed_ratio > self.max_audio_speed_rate:
                    it['target_audio_duration'] = dub_duration / self.max_audio_speed_rate
            
            if self.shoud_videorate and it['target_video_duration'] > source_duration:
                pts_ratio = it['target_video_duration'] / source_duration
                if pts_ratio > self.max_video_pts_rate: it['target_video_duration'] = source_duration * self.max_video_pts_rate
                it['video_pts'] = max(1.0, it['target_video_duration'] / source_duration)
    
    def _process_single_audio(self, item):
        """Process a single audio file speedup task"""
        input_file_path = item['filename']
        target_duration_ms = int(item['target_duration_ms'])
        
        try:
            current_duration_ms = int(tools.get_audio_time(input_file_path) * 1000)
            if target_duration_ms <= 0 or current_duration_ms <= target_duration_ms:
                return input_file_path, current_duration_ms, ""

            speedup_ratio = current_duration_ms / target_duration_ms
            after_duration = self._audio_speedup(input_file_path, speedup_ratio, target_duration_ms)
            item['ref']['dubb_time'] = after_duration
            return input_file_path, after_duration, ""
        except Exception as e:
            config.logger.error(f"Error processing audio {input_file_path}: {e}")
            return input_file_path, None, str(e)

    def _execute_audio_speedup(self):
        """Step 3: Execute audio speedup."""
        if not self.shoud_audiorate: return
        tasks = [
            {"filename": it['filename'], "target_duration_ms": it['target_audio_duration'], "ref": it}
            for it in self.queue_tts if it.get('dubb_time', 0) > it.get('target_audio_duration', 0) and tools.vail_file(it['filename'])
        ]
        if not tasks: return

        with concurrent.futures.ThreadPoolExecutor() as executor:
            futures = [executor.submit(self._process_single_audio, task) for task in tasks]
            for i, future in enumerate(concurrent.futures.as_completed(futures)):
                if config.exit_soft: executor.shutdown(wait=False, cancel_futures=True); return
                future.result()
                tools.set_process(text=f"Audio processing: {i + 1}/{len(tasks)}", uuid=self.uuid)

    def _execute_video_processing(self):
        """Step 4: Execute video cutting (using tiny gap absorption strategy)."""
        if not self.shoud_videorate or not self.novoice_mp4_original:
            return
            
        video_tasks = []
        processed_video_clips = []
        last_end_time = 0

        i = 0
        while i < len(self.queue_tts):
            it = self.queue_tts[i]
            gap_before = it['start_time_source'] - last_end_time
            if gap_before > self.MIN_CLIP_DURATION_MS:
                clip_path = Path(f'{self.cache_folder}/{i:05d}_gap.mp4').as_posix()
                video_tasks.append({"ss": tools.ms_to_time_string(ms=last_end_time), "to": tools.ms_to_time_string(ms=it['start_time_source']), "source": self.novoice_mp4_original, "pts": 1.0, "out": clip_path})
                processed_video_clips.append(clip_path)

            start_ss = it['start_time_source']
            end_to = it['end_time_source']
            
            if i + 1 < len(self.queue_tts):
                next_it = self.queue_tts[i+1]
                gap_after = next_it['start_time_source'] - it['end_time_source']
                if 0 < gap_after < self.MIN_CLIP_DURATION_MS:
                    end_to = next_it['start_time_source']
            
            current_clip_source_duration = end_to - start_ss
            if current_clip_source_duration > self.MIN_CLIP_DURATION_MS:
                clip_path = Path(f"{self.cache_folder}/{i:05d}_sub.mp4").as_posix()
                pts_val = it.get('video_pts', 1.0)
                if pts_val > 1.01:
                    new_target_duration = it.get('target_video_duration', current_clip_source_duration)
                    pts_val = max(1.0, new_target_duration / current_clip_source_duration)
                video_tasks.append({"ss": tools.ms_to_time_string(ms=start_ss), "to": tools.ms_to_time_string(ms=end_to), "source": self.novoice_mp4_original, "pts": pts_val, "out": clip_path})
                processed_video_clips.append(clip_path)
            last_end_time = end_to
            i += 1
        
        if (final_gap := self.raw_total_time - last_end_time) > self.MIN_CLIP_DURATION_MS:
            clip_path = Path(f'{self.cache_folder}/zzzz_final_gap.mp4').as_posix()
            video_tasks.append({"ss": tools.ms_to_time_string(ms=last_end_time), "to": "", "source": self.novoice_mp4_original, "pts": 1.0, "out": clip_path})
            processed_video_clips.append(clip_path)

        for j, task in enumerate(video_tasks):
            if config.exit_soft: return
            tools.set_process(text=f"Video processing: {j + 1}/{len(video_tasks)}", uuid=self.uuid)
            the_pts = task['pts'] if task.get('pts', 1.0) > 1.01 else ""
            tools.cut_from_video(ss=task['ss'], to=task['to'], source=task['source'], pts=the_pts, out=task['out'])
            
            output_path = Path(task['out'])
            if not output_path.exists() or output_path.stat().st_size == 0:
                config.logger.warning(f"Segment {task['out']} failed (PTS={task.get('pts', 1.0)}). Fallback.")
                tools.cut_from_video(ss=task['ss'], to=task['to'], source=task['source'], pts="", out=task['out'])
                if not output_path.exists() or output_path.stat().st_size == 0:
                    config.logger.error(f"FATAL: Fallback for {task['out']} also failed. MISSING.")

        valid_clips = [clip for clip in processed_video_clips if Path(clip).exists() and Path(clip).stat().st_size > 0]
        if not valid_clips:
            self.novoice_mp4 = self.novoice_mp4_original
            return

        concat_txt_path = Path(f'{self.cache_folder}/concat_list.txt').as_posix()
        tools.create_concat_txt(valid_clips, concat_txt=concat_txt_path)
        
        merged_video_path = Path(f'{self.cache_folder}/merged_{self.noextname}.mp4').as_posix()
        tools.set_process(text="Merging video clips...", uuid=self.uuid)
        tools.concat_multi_mp4(out=merged_video_path, concat_txt=concat_txt_path)
        self.novoice_mp4 = merged_video_path

    def _recalculate_timeline_and_merge_audio(self):
        """Step 5: Recalculate timeline and merge audio based on the "acknowledge reality" principle."""
        merged_audio = AudioSegment.empty()
        video_was_processed = self.shoud_videorate and self.novoice_mp4_original and Path(self.novoice_mp4).name.startswith("merged_")

        if video_was_processed:
            config.logger.info("Building audio timeline based on processed video clips.")
            add_extend_time = 0
            for clip_filename in sorted(os.listdir(self.cache_folder)):
                if not (clip_filename.endswith(".mp4") and ("_sub" in clip_filename or "_gap" in clip_filename)): continue
                
                clip_path = Path(f'{self.cache_folder}/{clip_filename}').as_posix()
                try:
                    if not (Path(clip_path).exists() and Path(clip_path).stat().st_size > 0): continue
                    clip_duration = tools.get_video_duration(clip_path)
                except Exception as e:
                    config.logger.warning(f"Corrupt clip {clip_path} (error: {e}). Skipping.")
                    continue

                if "_sub" in clip_filename:
                    index = int(clip_filename.split('_')[0])
                    it = self.queue_tts[index]
                    
                    it['start_time'] += add_extend_time
                    it['end_time'] += add_extend_time
                    start_end_duration = it['end_time'] - it['start_time']
                    
                    segment = AudioSegment.from_file(it['filename']) if tools.vail_file(it['filename']) else AudioSegment.silent(duration=clip_duration)
                    if len(segment) > clip_duration: segment = segment[:clip_duration]
                    elif len(segment) < clip_duration: segment += AudioSegment.silent(duration=clip_duration - len(segment))
                    
                    offset = it['start_time'] - len(merged_audio)
                    if offset > 0:
                        merged_audio += AudioSegment.silent(duration=offset)
                    elif offset < 0:
                        abs_offset = abs(offset)
                        it['start_time'] += abs_offset
                        add_extend_time += abs_offset
                    
                    merged_audio += segment
                    it['end_time'] = it['start_time'] + clip_duration
                    if clip_duration > start_end_duration:
                        add_extend_time += clip_duration - start_end_duration
                    
                    it['startraw'], it['endraw'] = tools.ms_to_time_string(ms=it['start_time']), tools.ms_to_time_string(ms=it['end_time']) 
                else: # gap
                    merged_audio += AudioSegment.silent(duration=clip_duration)
        else:
            config.logger.info("Building audio timeline based on original timings (video not processed).")
            add_extend_time = 0
            for i, it in enumerate(self.queue_tts):
                it['start_time'] += add_extend_time
                it['end_time'] += add_extend_time
                start_end_duration = it['end_time'] - it['start_time']
                
                dubb_time = int(tools.get_audio_time(it['filename']) * 1000) if tools.vail_file(it['filename']) else it['source_duration']
                segment = AudioSegment.from_file(it['filename']) if tools.vail_file(it['filename']) else AudioSegment.silent(duration=dubb_time)
                if len(segment) > dubb_time: segment = segment[:dubb_time]
                elif len(segment) < dubb_time: segment += AudioSegment.silent(duration=dubb_time - len(segment))

                offset = it['start_time'] - len(merged_audio)
                if offset > 0:
                    merged_audio += AudioSegment.silent(duration=offset)
                elif offset < 0:
                    abs_offset = abs(offset)
                    it['start_time'] += abs_offset
                    add_extend_time += abs_offset

                merged_audio += segment
                clip_time = len(segment)
                it['end_time'] = it['start_time'] + clip_time
                if clip_time > start_end_duration:
                    add_extend_time += clip_time - start_end_duration
                it['startraw'], it['endraw'] = tools.ms_to_time_string(ms=it['start_time']), tools.ms_to_time_string(ms=it['end_time'])
        return merged_audio

    def _export_audio(self, audio_segment, destination_path):
        """Export a Pydub audio segment to the specified path, handling different formats."""
        wavfile = Path(f'{self.cache_folder}/temp_{time.time_ns()}.wav').as_posix()
        try:
            audio_segment.export(wavfile, format="wav")
            ext = Path(destination_path).suffix.lower()
            if ext == '.wav': shutil.copy2(wavfile, destination_path)
            elif ext == '.m4a': tools.wav2m4a(wavfile, destination_path)
            else: tools.runffmpeg(["-y", "-i", wavfile, "-ar", "48000", "-b:a", "192k", destination_path])
        finally:
            if Path(wavfile).exists(): os.remove(wavfile)
    
    def _finalize_audio(self, merged_audio):
        """Step 6: Export and align final audio/video durations."""
        try:
            self._export_audio(merged_audio, self.target_audio)
            video_was_processed = self.shoud_videorate and self.novoice_mp4_original and Path(self.novoice_mp4).name.startswith("merged_")
            if not video_was_processed: return
            if not (tools.vail_file(self.novoice_mp4) and tools.vail_file(self.target_audio)): return

            video_duration_ms = tools.get_video_duration(self.novoice_mp4)
            audio_duration_ms = int(tools.get_audio_time(self.target_audio) * 1000)
            
            padding_needed = video_duration_ms - audio_duration_ms
            if padding_needed > 10:
                final_audio_segment = AudioSegment.from_file(self.target_audio) + AudioSegment.silent(duration=padding_needed)
                self._export_audio(final_audio_segment, self.target_audio)
        except Exception as e:
            config.logger.error(f"Failed to export or finalize audio: {e}")
            raise RuntimeError(f"Failed to finalize audio: {e}")
```

---

From a simple idea to an automation system capable of resisting various uncertainties in the real world, this path was filled with repeated refinement of details and constant subversion of core concepts. The final solution may not be the most theoretically elegant, but it has proven to be pragmatic, reliable, and effective after countless failures and debugging.

This is precisely the charm of engineering: it's not just about writing code, but about finding and constructing the most suitable solution amidst constraints and uncertainties.