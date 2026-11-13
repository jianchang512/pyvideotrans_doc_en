---
title: Video Dubbing Auto-Sync (Part 3) From "It Works" to "It's Usable"
date: 2025-07-24 17:33:00
description:
---

> [Previous Article](/en/blog/audio-subtitles-video-sync-2)

This is the third article in the series, marking the point where we've turned a narrow path of **subtitle and audio-video synchronization** into a passable dirt road. In the first two parts, we worked like mechanics, tightening screws everywhere: if a segment was off by over ten seconds, we fixed that segment; if pitch distortion was too harsh after time-stretching, we swapped the algorithm. Ultimately, a 23-minute video went from a visually obvious drift of over ten seconds down to around 200 ms—acceptable for an engineering prototype.

But between "it works" and "it's usable" lies a thorough overhaul. This article isn't about showing off more tricks; it's about laying out the entire approach so you can see clearly:

- What problem are we actually solving?
- What "strategic routes" did we prepare to tackle it?
- What does the actual implementation code look like? And why is it structured that way?

If you've read the previous articles, treat this as a "design spec + lessons learned." If you haven't, starting here is fine—all key information will be covered again.

---

## The Core Problem: In One Word, Misalignment
When dubbing a Chinese video into English or other languages like Russian or German, the most common issue is "different speaking rates." The same line of dialogue might take 3 seconds in Chinese but 4 seconds in English. The person on screen stops talking, but the voice continues—instantly breaking the viewer's immersion.

We can only do two things:
1. Make the audio faster (speed up).
2. Make the video slower (slow down).

Both have side effects:
- Speed up too much, and the audio becomes shrill and piercing.
- Slow down too much, and the action becomes sluggish like a replay.

Thus, the problem becomes: How to combine "speeding up" and "slowing down" to minimize side effects.

---

## Four Strategic Routes
We broke down the possible approaches into four "modes," implemented as four branches in the code. You can switch between them with one click based on content type.

| Mode | Core Idea | Suitable For | Notes |
| --- | --- | --- | --- |
| Shared Burden: Audio Speed-up + Video Slow-down | Both audio and video compromise, distributing distortion | General dialogue, news | Default recommendation |
| Video Concedes: Video Slow-down Only | Preserve audio quality, sacrifice video | Music videos, high-quality narration | Max slow-down 10x |
| Audio Adapts: Audio Speed-up Only | Preserve video, sacrifice audio quality | Dance, action scenes | No limit on speed-up factor |
| Pure & Simple: No Time-stretching | No time-stretching, pure concatenation | User explicitly requests | Pad end with silence or freeze frame |

All subsequent code revolves around "how to support all four modes in a single pipeline."

---

## From Blueprint to Reality: Three Major Revisions
### V1: Direct Concatenation – Error Snowballs
The initial approach was simple:
- Calculate how long each segment should be,
- Cut it out using FFmpeg,
- Concatenate the pieces one by one.

Running a 5-minute short video showed no issues; running a 23-minute one, the error snowballed to 13 seconds—floating-point errors, frame rate rounding, timebase differences all surfaced.

### V2: Theoretical Model – Error Reduced, Not Eliminated
We introduced "dynamic time offset":
- Each segment's start no longer depended on the previous segment's actual result,
- Instead, a formula calculated the "theoretical start."

Error dropped from 13 seconds to 3 seconds, still not good enough.

### V3: Physical Reality First – Error Converges to 200 ms
We abandoned prediction entirely, opting to "measure directly":
- After generating each video clip, immediately measure its real duration using ffprobe,
- Concatenate the audio strictly according to this "measured blueprint."

After this step, the 23-minute video stabilized under 200 ms for the first time, and a 2-hour video's error was controllable around 1 second, which is acceptable.
![](https://pvtr2.pyvideotrans.com/1753372163068_image.png)

---

## Core Process Breakdown
Let's walk through the main steps of the `SpeedRate` class again.

### Entry `run()`: First, Branch
- If the user selects "Pure & Simple," directly call `_run_no_rate_change_mode()`, an independent branch that doesn't interfere with the complex logic.
- Otherwise, follow the full pipeline: prepare data → calculate adjustments → process audio → process video → rebuild audio → export.

### `_prepare_data()`: Lay the Foundation
- Read frame rate, calculate "original duration," calculate "gaps between subtitles."
- This data is used in every subsequent step, calculated upfront to avoid redundant work.

### `_calculate_adjustments()`: Make Decisions
Calculate the "theoretical target duration" according to the four modes. This step only does math, doesn't modify files.

### `_execute_audio_speedup()`: Modify the Audio
- Use `pydub.speedup` to process based on the rate.
- After processing, "trim" to ensure error < 10 ms.

### `_execute_video_processing()`: Modify the Video
- First, cut the entire segment into small clips, encoding them into an intermediate format to avoid concatenation artifacts.
- Immediately measure the "real duration" after each cut, write it back to the dictionary for later audio alignment.

### `_recalculate_timeline_and_merge_audio()`: Assemble Audio Based on Measured Results
- No longer rely on original subtitle durations, only look at "video real duration."
- If video is longer, pad audio with silence; if video is shorter, trim audio tail.

### `_finalize_files()`: Final Alignment
- If total audio and video lengths don't match, use silence padding or freezing the last frame as a fallback.

---

## Code Skeleton Overview
The following pseudo-code summarizes the main flow for quick orientation:

```
def run():
    if no_time_stretching:
        pure_concatenation()
        return
    prepare_data()
    calculate_theoretical_durations()
    speed_up_audio()
    slow_down_video_and_measure_real_durations()
    rebuild_audio_based_on_real_durations()
    final_alignment_and_export()
```

The actual implementation is spread across a dozen small functions, each doing one thing, named with verbs: `_cut`, `_concat`, `_export`... When reading, follow the call chain down.

---

## Lessons Learned (Pitfalls)
- **Concatenation Artifacts**: If video clips have inconsistent frame rates or color spaces (common when FFmpeg hardware acceleration is enabled), direct concat causes artifacts. We use an "intermediate format" to unify parameters before lossless concatenation.
- **Audio Resampling Noise**: To align, we once tried resampling all dubbed clips to 44.1 kHz and normalizing them, resulting in noticeable background noise that couldn't be completely eliminated despite much effort. We finally gave up, preferring to trim silence.
- **PTS Upper Limit**: FFmpeg's `setpts` easily fails and becomes impractical (video slideshow-like) when exceeding 10. Therefore, we enforce a hard limit, preferring to trim audio further.

---

## How to Use
Use `SpeedRate` as a regular class:

```
sr = SpeedRate(
        queue_tts=subtitle_queue,
        shoud_audiorate=True,
        shoud_videorate=True,
        novoice_mp4=path_to_silent_video, # ffmpeg -i video -an silent_video.mp4
        uuid=random_string,
        cache_folder=temporary_directory
)
sr.run()
```

Parameter Explanation:
- `queue_tts`: List of dictionaries for each subtitle line.
```
[
 {'line': 33, 'start_time': 131170, 'end_time': 132250,  'startraw': '00:02:11,170', 'endraw': '00:02:12,250', 'time': '00:02:11,170 --> 00:02:12,250','filename':'path_to_dubbed_segment_file'}
...
]
```
- `shoud_audiorate / shoud_videorate`: Boolean switches determining which strategy to use.
- Other path-type parameters should be provided as needed.

---

## Summary
The greatest value of this solution lies not in advanced algorithms, but in being "production-ready":
- Four strategies cover the vast majority of content types;
- "Measured alignment" solves floating-point errors;
- "Intermediate format" solves concatenation stability;
- "Short functions + clear naming" reduces maintenance difficulty.

---

## Full Code (With Detailed Comments)

```
import os
import shutil
import time
from pathlib import Path
import json

from pydub import AudioSegment

from videotrans.configure import config
from videotrans.util import tools

class SpeedRate:
    """
    Aligns translated dubbing with the original video timeline through audio speed-up and video slow-down.

Main Implementation Principle
# Functional Overview: Developed using Python3 for video translation functionality:
1. For a video in language A, separate the silent video file and audio file. Use speech recognition on the audio to obtain original subtitles, translate those subtitles into language B, dub the B language subtitles into B language audio, then synchronize and merge the B language subtitles and dubbing with the silent video from A to create a new video.
2. The current task is "dubbing, subtitle, and video alignment." B language subtitles are dubbed line by line, each line's dubbing generates an mp3 audio file.
3. Due to language differences, each dubbed line's duration may be longer than its subtitle's duration. For example, if a subtitle duration is 3s, but the dubbed mp3 is longer than 3s, there's a problem. Synchronization can be achieved by automatically speeding up the audio segment to 3s. Alternatively, the original video segment corresponding to that subtitle can be extracted and slowed down to extend its duration to match the dubbing length. Of course, both audio speed-up and video slow-down can be used simultaneously to avoid excessive audio speed-up or video slow-down.

# Detailed Audio-Video Synchronization Principle Explanation

## Strategy when both audio and video adjustments are enabled
1. If dubbing duration <= current segment's original subtitle duration, no audio speed-up or video slow-down is needed.
2. If dubbing duration > current segment's original subtitle duration, calculate the speed-up factor needed to shorten the audio to match the original subtitle duration.
- If this factor <= 1.5, apply this audio speed-up only, no video slow-down.
- If this factor > 1.5, add the silent gap between the current subtitle's end and the next subtitle's start (this gap may be 0, or less/greater than `self.MIN_CLIP_DURATION_MS`. For the last subtitle, it may extend to the video end) to the original subtitle duration, call it total_a.
   * If total_a >= dubbing duration, the dubbing can play naturally without speed-up, and video doesn't need slow-down. Note the resulting timeline shift and its effect on video cutting.
   * If total_a < dubbing duration, calculate the speed-up factor needed to shorten the dubbing to total_a.
        - If this factor <= 1.5, apply this audio speed-up only, no video slow-down. Note the timeline shift.
        - If this factor > 1.5, follow the original logic: audio speed-up and video slow-down each bear half the adjustment.

## When using only audio speed-up

1. If dubbing duration <= current segment's original subtitle duration, no audio speed-up needed.
2. If dubbing duration > current segment's original subtitle duration, calculate the speed-up factor needed to shorten the audio to match the original subtitle duration.
- If this factor <= 1.5, apply this audio speed-up.
- If this factor > 1.5, add the silent gap between the current subtitle's end and the next subtitle's start (may be 0, or less/greater than `self.MIN_CLIP_DURATION_MS`. For the last subtitle, it may extend to the video end) to the original subtitle duration, call it total_b.
   * If total_b >= dubbing duration, the dubbing can play naturally without speed-up. If there's remaining space after accommodating the dubbing, fill with silence.
   * If total_b < dubbing duration, ignore the factor, forcibly shorten the dubbing duration to total_a.
3. Pay attention to silent gaps at the beginning, end, and between subtitles, especially any remaining unused gap space. The final merged audio length, when a video exists (self.novoice_mp4), should equal the video length. If no video exists, it should equal the time from 0 to the last subtitle's end time.

## When using only video slow-down
1. If dubbing duration <= current segment's original subtitle duration, no video slow-down needed. Simply cut from this subtitle's start time to the next subtitle's start time (or from time 0 if it's the first subtitle).
2. If dubbing duration > current segment's original subtitle duration, add the silent gap between the current subtitle's end and the next subtitle's start (may be 0, or less/greater than `self.MIN_CLIP_DURATION_MS`. For the last subtitle, it may extend to the video end) to the original subtitle duration, call it total_c.
   * If total_c >= dubbing duration, no video slow-down needed, the dubbing can play naturally. In this case, cut a video segment of duration total_c (i.e., cut to the next subtitle's start time) without slow-down. Similarly, if it's the first subtitle, cut from time 0.
   * If total_c < dubbing duration, forcibly slow down the video segment (duration total_a) to extend its duration to match the dubbing length. Note: if the PTS factor exceeds 10, it may fail. Therefore, the maximum PTS is 10. If even at PTS=10 the video is still shorter than the dubbing, set PTS=10 and forcibly shorten the dubbing duration to match the slowed video.
3. Pay attention to cutting the region before the first subtitle (start time may be >0) and after the last subtitle (end time may be before video end).
4. For segments not requiring slow-down, directly cut from this subtitle's start time to the next subtitle's start time; no need to separately handle silence as no slow-down is involved.
5. For segments requiring slow-down, be mindful of the following silent gap to avoid losing video segments.

## When neither `audio speed-up` nor `video slow-down` is used

- Step 1: Concatenate audio according to subtitles
1. If the first subtitle doesn't start at 0, prepend silence.
2. If the duration from this subtitle's start time to the next subtitle's start time is >= this dubbing's duration, directly concatenate this dubbing file. If the difference > 0 (i.e., there's leftover space), append silence.
3. If the duration from this subtitle's start time to the next subtitle's start time is < this dubbing's duration, directly concatenate without further processing.
4. If it's the last subtitle, simply concatenate this dubbing segment without checking for space afterward.

- Step 2: Check if a video file exists
1. If self.novoice_mp4 is not None and the file exists, a video exists. Compare the merged audio duration with the video duration.
    - If audio duration < video duration, append silence to the audio until lengths match.
    - If audio duration > video duration, freeze the last video frame to extend the video until lengths match.
2. If no video file exists, no further processing is needed.



    ===============================================================================================
    """

    MIN_CLIP_DURATION_MS = 50

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
        self.noextname=noextname
        self.raw_total_time=raw_total_time
        self.queue_tts = queue_tts
        self.shoud_videorate = shoud_videorate
        self.shoud_audiorate = shoud_audiorate
        self.uuid = uuid
        self.novoice_mp4_original = novoice_mp4
        self.novoice_mp4 = novoice_mp4
        self.cache_folder = cache_folder if cache_folder else Path(f'{config.TEMP_DIR}/{str(uuid if uuid else time.time())}').as_posix()
        Path(self.cache_folder).mkdir(parents=True, exist_ok=True)

        self.target_audio_original = target_audio
        self.target_audio = Path(f'{self.cache_folder}/final_audio{Path(target_audio).suffix}').as_posix()

        self.max_audio_speed_rate = 100

        self.max_video_pts_rate = 10

        self.source_video_fps = 30

        config.logger.info(f"SpeedRate initialized. Audio speed-up: {self.shoud_audiorate}, Video slow-down: {self.shoud_videorate}")

    def run(self):
        # =========================================================================================
        # If neither audio speed-up nor video slow-down is enabled
        if not self.shoud_audiorate and not self.shoud_videorate:
            config.logger.info("Detected no time-stretching enabled, entering pure concatenation mode.")
            self._run_no_rate_change_mode()
            return self.queue_tts
        # Otherwise, execute the speed-up/slow-down synchronization pipeline
        self._prepare_data()
        self._calculate_adjustments()
        self._execute_audio_speedup()
        clip_meta_list_with_real_durations = self._execute_video_processing()
        merged_audio = self._recalculate_timeline_and_merge_audio(clip_meta_list_with_real_durations)
        if merged_audio:
            self._finalize_files(merged_audio)
        return self.queue_tts

    def _run_no_rate_change_mode(self):
        """
        Full implementation of Mode Four: "Pure Concatenation."
        1. Prepare data.
        2. Precisely measure `last_end_time` and fill silent gaps between subtitles.
        3. In the loop, concatenate dubbing, then decide how to fill subsequent silence based on the relationship between "available space" and "dubbing duration."
        4. After all segments are concatenated, call the generic `_finalize_files` method to handle final alignment with video.
        """
        process_text = "[Pure Mode] Merging audio..." if config.defaulelang != 'zh' else "[纯净模式] 正在拼接音频..."
        tools.set_process(text=process_text, uuid=self.uuid)
        config.logger.info("================== [Pure Mode] Processing Started ==================")

        # Ensure basic data is prepared
        self._prepare_data()

        merged_audio = AudioSegment.empty()
        last_end_time = 0

        # Step 1: Concatenate audio according to subtitles
        for i, it in enumerate(self.queue_tts):
            # 1. Fill silence before subtitle
            silence_duration = it['start_time_source'] - last_end_time
            if silence_duration > 0:
                merged_audio += AudioSegment.silent(duration=silence_duration)
                config.logger.info(f"Subtitle[{it['line']}] before, filled silence {silence_duration}ms")

            # Load dubbing segment
            segment = None
            if tools.vail_file(it['filename']):
                try:
                    segment = AudioSegment.from_file(it['filename'])
                except Exception as e:
                    config.logger.error(f"Subtitle[{it['line']}] failed to load audio file {it['filename']}: {e}, will ignore this segment.")
            else:
                config.logger.warning(f"Subtitle[{it['line']}] dubbing file does not exist: {it['filename']}, will ignore this segment.")

            if not segment:
                last_end_time = it['end_time_source'] # Even if audio doesn't exist, advance timeline
                continue

            # Update subtitle's new timestamps
            it['start_time'] = len(merged_audio)
            it['end_time'] = it['start_time'] + len(segment)
            it['startraw'], it['endraw'] = tools.ms_to_time_string(ms=it['start_time']), tools.ms_to_time_string(ms=it['end_time'])

            merged_audio += segment
            config.logger.info(f"Subtitle[{it['line']}] concatenated, dubbing duration: {len(segment)}ms, new time range: {it['start_time']}-{it['end_time']}")

            # 2. & 3. Fill silence after dubbing (if applicable)
            if i < len(self.queue_tts) - 1:
                next_start_time = self.queue_tts[i+1]['start_time_source']
                available_space = next_start_time - it['start_time_source']

                if available_space >= len(segment):
                    remaining_silence = available_space - len(segment)
                    if remaining_silence > 0:
                        merged_audio += AudioSegment.silent(duration=remaining_silence)
                        config.logger.info(f"Subtitle[{it['line']}] after, filled remaining silence {remaining_silence}ms")
                    last_end_time = next_start_time
                else:
                    # Dubbing duration > available space, directly connect to next, timeline naturally pushed back
                    last_end_time = it['start_time_source'] + len(segment)
            else:
                # 4. Last subtitle, no silence appended afterward
                last_end_time = it['end_time']

        # Step 2: Check video file and align
        self._finalize_files(merged_audio)
        config.logger.info("================== [Pure Mode] Processing Complete ==================")

    def _prepare_data(self):
        """
        This stage provides foundational data for all subsequent calculations. Key is calculating `source_duration` (original duration)
        and `silent_gap` (silent gap to next subtitle), which form the basis for all strategy decisions.
        Also, the `final_video_duration_real` field is initialized.
        :return:
        """
        process_text = "[1/5] Preparing data..." if config.defaulelang != 'zh' else "[1/5] 准备数据..."
        tools.set_process(text=process_text, uuid=self.uuid)
        config.logger.info("================== [Stage 1/5] Preparing Data ==================")

        if self.novoice_mp4_original and tools.vail_file(self.novoice_mp4_original):
            try: self.source_video_fps = tools.get_video_info(self.novoice_mp4_original, video_fps=True) or 30
            except Exception as e: config.logger.warning(f"Unable to detect source video frame rate, will use default 30. Error: {e}"); self.source_video_fps = 30
        config.logger.info(f"Source video frame rate set to: {self.source_video_fps}")

        for it in self.queue_tts:
            it['start_time_source'] = it['start_time']
            it['end_time_source'] = it['end_time']
            it['source_duration'] = it['end_time_source'] - it['start_time_source']
            it['dubb_time'] = self._get_audio_time_ms(it['filename'], line=it['line'])
            it['final_audio_duration_theoretical'] = it['dubb_time']
            it['final_video_duration_theoretical'] = it['source_duration']
            # For storing detected physical duration
            it['final_video_duration_real'] = it['source_duration']

        for i, it in enumerate(self.queue_tts):
            if i < len(self.queue_tts) - 1:
                it['silent_gap'] = self.queue_tts[i + 1]['start_time_source'] - it['end_time_source']
            else:
                it['silent_gap'] = self.raw_total_time - it['end_time_source']
            it['silent_gap'] = max(0, it['silent_gap'])

    def _calculate_adjustments(self):
        """
        - `if self.shoud_audiorate and self.shoud_videorate:` Both audio speed-up and video slow-down enabled.
        - `elif self.shoud_audiorate:` Audio speed-up only.
        - `elif self.shoud_videorate:` Video slow-down only.
        The nested `if` statements implement finer strategies like "prioritize using gaps," "prefer gentle adjustments," etc.
        Ultimately, it calculates a "theoretical target duration" for each segment needing adjustment.
        :return:
        """
        process_text = "[2/5] Calculating adjustments..." if config.defaulelang != 'zh' else "[2/5] 计算调整方案..."
        tools.set_process(text=process_text, uuid=self.uuid)
        config.logger.info("================== [Stage 2/5] Calculating Adjustments ==================")

        for i, it in enumerate(self.queue_tts):
            config.logger.info(f"--- Starting analysis for subtitle[{it['line']}] ---")
            dubb_duration = it['dubb_time']
            source_duration = it['source_duration']

            if source_duration <= 0:
                it['final_video_duration_theoretical'] = 0
                it['final_audio_duration_theoretical'] = 0
                config.logger.warning(f"Subtitle[{it['line']}] original duration is 0, skipping processing.")
                continue

            silent_gap = it['silent_gap']
            block_source_duration = source_duration + silent_gap

            config.logger.debug(f"Subtitle[{it['line']}]: Raw data: dubbing duration={dubb_duration}ms, subtitle duration={source_duration}ms, silent gap={silent_gap}ms, block total duration={block_source_duration}ms")

            # If audio can fit within original segment, no processing needed
            if dubb_duration <= source_duration:
                config.logger.info(f"Subtitle[{it['line']}]: Dubbing({dubb_duration}ms) <= Subtitle({source_duration}ms), no adjustment needed.")
                it['final_video_duration_theoretical'] = source_duration
                it['final_audio_duration_theoretical'] = dubb_duration
                continue

            target_duration = dubb_duration

            if self.shoud_audiorate and self.shoud_videorate:
                config.logger.debug(f"Subtitle[{it['line']}]: Entering [Audio+Video Combined] decision mode.")
                speed_to_fit_source = dubb_duration / source_duration
                if speed_to_fit_source <= 1.5:
                    config.logger.info(f"Subtitle[{it['line']}]: [Decision] Only audio speed-up needed (factor {speed_to_fit_source:.2f} <= 1.5), video not slowed.")
                    target_duration = source_duration
                elif block_source_duration >= dubb_duration:
                    config.logger.info(f"Subtitle[{it['line']}]: [Decision] Dubbing can fit using silent gap, no time-stretching needed.")
                    target_duration = dubb_duration
                else:
                    speed_to_fit_block = dubb_duration / block_source_duration
                    if speed_to_fit_block <= 1.5:
                        config.logger.info(f"Subtitle[{it['line']}]: [Decision] Audio speed-up to fill block is sufficient (factor {speed_to_fit_block:.2f} <= 1.5).")
                        target_duration = block_source_duration
                    else:
                        config.logger.info(f"Subtitle[{it['line']}]: [Decision] Factor({speed_to_fit_block:.2f}) > 1.5, audio and video share adjustment burden.")
                        over_time = dubb_duration - block_source_duration
                        video_extension = over_time / 2
                        target_duration = int(block_source_duration + video_extension)
            elif self.shoud_audiorate:
                config.logger.debug(f"Subtitle[{it['line']}]: Entering [Audio Speed-up Only] decision mode.")
                speed_to_fit_source = dubb_duration / source_duration
                if speed_to_fit_source <= 1.5:
                    target_duration = source_duration
                elif block_source_duration >= dubb_duration:
                    target_duration = dubb_duration
                else:
                    target_duration = block_source_duration
            elif self.shoud_videorate:
                config.logger.debug(f"Subtitle[{it['line']}]: Entering [Video Slow-down Only] decision mode.")
                if block_source_duration >= dubb_duration:
                    target_duration = dubb_duration
                else:
                    target_duration = dubb_duration

            if self.shoud_videorate:
                pts_ratio = target_duration / source_duration
                if pts_ratio > self.max_video_pts_rate:
                    config.logger.warning(f"Subtitle[{it['line']}]: Calculated PTS({pts_ratio:.2f}) exceeds maximum ({self.max_video_pts_rate}), forced correction applied.")
                    target_duration = int(source_duration * self.max_video_pts_rate)

            it['final_video_duration_theoretical'] = target_duration
            it['final_audio_duration_theoretical'] = target_duration

            config.logger.info(f"Subtitle[{it['line']}]: [Final Plan] Unified theoretical target audio/video duration: {target_duration}ms")

    def _execute_audio_speedup(self):
        """
        1.  Iterate through all subtitles, check if `dubb_time` > `final_audio_duration`.
        2.  For audio needing processing, calculate the precise speed-up factor.
        3.  Use `pydub.speedup` to perform time-stretching.
        4.  **Precision Fine-tuning**: After time-stretching, use slicing (`[:target_duration_ms]`) to fine-tune the audio, ensuring its final duration is within 10ms of the target.
        5.  Update `it['dubb_time']` with the processed real duration.

        :return:
        """
        process_text = "[3/5] Processing audio..." if config.defaulelang != 'zh' else "[3/5] 处理音频..."
        tools.set_process(text=process_text, uuid=self.uuid)
        config.logger.info("================== [Stage 3/5] Executing Audio Speed-up ==================")

        for it in self.queue_tts:
            target_duration_ms = int(it['final_audio_duration_theoretical'])
            if it['dubb_time'] > target_duration_ms and tools.vail_file(it['filename']):
                try:
                    current_duration_ms = it['dubb_time']
                    if target_duration_ms <= 0 or current_duration_ms - target_duration_ms < 10:
                        continue

                    speedup_ratio = current_duration_ms / target_duration_ms
                    if speedup_ratio < 1.01: continue

                    if speedup_ratio > self.max_audio_speed_rate:
                        config.logger.warning(f"Subtitle[{it['line']}]: Calculated audio speed-up factor({speedup_ratio:.2f}) exceeds limit({self.max_audio_speed_rate}), applying maximum value.")
                        speedup_ratio = self.max_audio_speed_rate

                    config.logger.info(f"Subtitle[{it['line']}]: [Execute] Audio speed-up, factor={speedup_ratio:.2f} (from {current_duration_ms}ms -> {target_duration_ms}ms)")
                    audio = AudioSegment.from_file(it['filename'])
                    fast_audio = audio.speedup(playback_speed=speedup_ratio)

                    if len(fast_audio) > target_duration_ms: fast_audio = fast_audio[:target_duration_ms]

                    fast_audio.export(it['filename'], format=Path(it['filename']).suffix[1:])
                    it['dubb_time'] = self._get_audio_time_ms(it['filename'], line=it['line'])
                except Exception as e:
                    config.logger.error(f"Subtitle[{it['line']}]: Audio speed-up failed {it['filename']}: {e}")

    def _execute_video_processing(self):
        """
        Video Processing Stage
        Its main task is no longer just processing video, but "measuring physical reality."
        1. `_create_clip_meta`: Create a "blueprint" containing all cutting tasks.
        2. Iterate through the blueprint, calling `_cut_to_intermediate` to generate each video clip.
        3. **Key Step**: After clip generation, `real_duration_ms = tools.get_video_duration(task['out'])`
           This line is the "physical probe," measuring the clip's real duration.
        4. Store the real duration back into the task metadata for the subsequent audio reconstruction stage.

        :return:
        """
        process_text = "[4/5] Processing video & probing real durations..." if config.defaulelang != 'zh' else "[4/5] 处理视频并探测真实时长..."
        tools.set_process(text=process_text, uuid=self.uuid)
        config.logger.info("================== [Stage 4/5] Executing Video Processing & Probing Real Durations ==================")
        if not self.shoud_videorate or not self.novoice_mp4_original:
            return None

        clip_meta_list = self._create_clip_meta()

        for task in clip_meta_list:
            if config.exit_soft: return None
            pts_param = str(task['pts']) if task.get('pts', 1.0) > 1.01 else None
            self._cut_to_intermediate(ss=task['ss'], to=task['to'], source=self.novoice_mp4_original, pts=pts_param, out=task['out'])

            real_duration_ms = 0
            if Path(task['out']).exists() and Path(task['out']).stat().st_size > 0:
                real_duration_ms = tools.get_video_duration(task['out'])

            task['real_duration_ms'] = real_duration_ms

            if task['type'] == 'sub':
                sub_item = self.queue_tts[task['index']]
                sub_item['final_video_duration_real'] = real_duration_ms
                config.logger.info(f"Subtitle[{task['line']}] video clip processing complete. Theoretical duration: {sub_item['final_video_duration_theoretical']}ms, Physical probed duration: {real_duration_ms}ms")
            else:
                config.logger.info(f"Gap clip {Path(task['out']).name} processing complete. Physical probed duration: {real_duration_ms}ms")


        self._concat_and_finalize(clip_meta_list)
        return clip_meta_list

    def _create_clip_meta(self):
        """
        - Iterate through subtitles, creating an independent cutting task for each "subtitle" and its surrounding "valid gaps."
        - Calculate the final PTS value for each subtitle clip: `final_video_duration / source_duration`.
        :return:
        """
        clip_meta_list = []
        if not self.queue_tts: return []

        if self.queue_tts[0]['start_time_source'] > self.MIN_CLIP_DURATION_MS:
            clip_path = Path(f'{self.cache_folder}/00000_first_gap.mp4').as_posix()
            clip_meta_list.append({"type": "gap", "out": clip_path, "ss": 0, "to": self.queue_tts[0]['start_time_source'], "pts": 1.0})

        for i, it in enumerate(self.queue_tts):
            if i > 0:
                gap_start = self.queue_tts[i-1]['end_time_source']
                gap_end = it['start_time_source']
                if gap_end - gap_start >= self.MIN_CLIP_DURATION_MS:
                    clip_path = Path(f'{self.cache_folder}/{i:05d}_gap.mp4').as_posix()
                    clip_meta_list.append({"type": "gap", "out": clip_path, "ss": gap_start, "to": gap_end, "pts": 1.0})

            if it['source_duration'] > 0:
                 clip_path = Path(f"{self.cache_folder}/{i:05d}_sub.mp4").as_posix()
                 pts_val = it['final_video_duration_theoretical'] / it['source_duration'] if it['source_duration'] > 0 else 1.0
                 clip_meta_list.append({"type": "sub", "index": i, "out": clip_path