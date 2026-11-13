---
title: Audio & Video Timeline Alignment Explained
date: 2026-09-24 17:11:37
description: This document explains the core principles behind the "Dubbing, Subtitle, and Video Alignment" module (`videotrans/task/_rate.py`) in pyVideoTrans. This module aligns translated dubbing audio with the original silent video on the timeline, merging them into a smooth new video.
---

# Audio & Video Timeline Alignment Explained

> *Refactored on 2026-09-24*
>
> The key improvement in this update: **We upgraded from the old method of "adjusting audio and video separately based on theoretical estimates" to a "two-stage, closed-loop alignment mechanism (slow down the video first, measure its actual physical duration, and then precisely adjust the audio to match this measured duration)."** This completely eliminates the cumulative drift caused by FFmpeg's inability to adjust video speeds with millisecond precision. We also added mechanisms to handle silent video intros (forcing the first subtitle to zero and restoring it later) and extend the end of the video using freeze-frame padding (`tpad`).
>

---

This document explains how the "Dubbing, Subtitle, and Video Alignment" module (`videotrans/task/_rate.py` / `SpeedRate`) works in pyVideoTrans. This module ensures translated dubbing audio and the original silent video line up perfectly on the timeline, creating a smooth video with synchronized sound and picture.

---

[[toc]]

---

## 1. Background and Core Design Concept

In video translation, the generated text-to-speech (TTS) dubbing often differs in length from the original speech:
- **Original Subtitle**: For example, original Chinese audio `0:03.000 ~ 0:06.000` (duration: 3.0 seconds).
- **Translated Dubbing**: The English translation dubbing takes `4.5 seconds`.
- **The Conflict**: Merging them directly causes the dubbing to spill over by 1.5 seconds. This delays the video, overlaps subsequent sentences, or creates severe audio-video desync.

### Core Concept: Video First, Audio Second (Closed-Loop Error Elimination)
Traditional methods adjust both video and audio speeds simultaneously using theoretical math. However, **FFmpeg cannot change video speed with exact millisecond precision due to GOP and frame timestamp limits, causing 20 to 200 milliseconds of drift per clip**. Over long videos with many cuts, these errors pile up, leading to noticeable desync.

The new version introduces a **two-stage pipeline**:
1. **Stage 1 (Video Slowdown)**: First, slow down the video clips. As soon as a clip is generated, **measure its actual physical duration (`actual_duration`) directly from the file**.
2. **Stage 2 (Audio Speedup)**: Use the **measured physical duration of the video** as the target length for speeding up the audio. Using `pyrubberband`'s high-precision time-stretching algorithm, the error between audio and video is eliminated down to 0.

---

## 2. Key Challenges & Solutions

| Challenge | What Happens | The Solution |
|-----------|--------------|--------------|
| **FFmpeg Cut/PTS Drift** | Video PTS speed adjustments are bound to video frames, causing a 20–200ms drift per clip that adds up over time. | **Video First, Audio Second**: Slow down the video first, measure its physical duration using `get_video_duration`, then stretch the audio to match that real duration. |
| **Intro Silence Drift** | The first few seconds of a video may be silent. If subtitles don't start at 0 seconds, shifting can occur. | **Force First Subtitle to Zero**: Set subtitle 0's `start_time` to 0 to absorb the gap, then restore the silence offset before final audio concatenation. |
| **Wasted Pauses Between Subtitles** | Natural pauses between dialogue (tens to thousands of milliseconds) are left unused. | **Head-to-Tail Timeline Extension**: Extend each subtitle's `end_time` to the next subtitle's `start_time`. This makes full use of natural pauses and minimizes audio distortion from aggressive speedups. |
| **Dubbing Exceeds Video Length** | The final sentence is too long, or total dubbing duration exceeds the video length. | **Freeze-Frame Extension (`tpad`)**: Duplicate the final frame of the video to extend the visual, preventing cut-off audio or a black screen at the end. |

---

## 3. Overview of Alignment Modes

The system offers two main toggles in the settings: `should_audiorate` (audio speedup) and `should_videorate` (video slowdown).

| Mode | `should_audiorate` | `should_videorate` | Logic & Workflow |
|------|:---:|:---:|------|
| **Audio Speedup Only** | ✅ | ✗ | Video is left completely untouched. When dubbing exceeds the subtitle slot, the audio is sped up to fit (capped by `max_audio_speed_rate`). |
| **Video Slowdown Only** | ✗ | ✅ | Audio speed is not changed. Video clips are slowed down to match dubbing length (capped by `max_video_pts_rate`). |
| **Coordinated Mode (Recommended)** | ✅ | ✅ | **Split the difference equally**: Video slows down halfway to meet the audio -> Measure actual video duration -> Audio speeds up to match that exact video duration. |
| **No Speed Change** | ✗ | ✗ | Neither audio nor video speed is changed. Audio clips are stitched together with silence gaps; supports removing silence or shifting subtitle timestamps. |

---

## 4. Data Preprocessing: Head-to-Tail Stitching and Zeroing the First Subtitle

In `_prepare_data()`, the original subtitle timestamps and dubbing files are standardized and cleaned:

### 4.1 Force First Subtitle to Zero (`audio0_left_pad`)
If subtitle 0 starts after 0 seconds (for example, nobody speaks for the first 2.5 seconds), the system sets its start time to 0 and saves the offset:
```python
if self.queue_tts[0]['start_time'] > 0:
    self.audio0_left_pad = self.queue_tts[0]['start_time']
    self.queue_tts[0]['start_time'] = 0
```
**Why this helps**: It absorbs the opening silence so video slicing starts cleanly at 0 seconds, ensuring no video frames before the first dialogue are lost. When stitching the final audio, the system restores this silent gap based on the actual length of the first audio clip.

### 4.2 Eliminate Subtitle Gaps (Head-to-Tail)
To avoid over-accelerating audio, each subtitle's end time is extended to the start of the next subtitle:
```python
if i < len(self.queue_tts) - 1:
    next_sub = self.queue_tts[i + 1]
    current['end_time'] = next_sub['start_time']
    current['end_time_source'] = next_sub['start_time']
```
The final subtitle's end time is anchored to the total video duration (`self.raw_total_time`). This takes full advantage of silent pauses between sentences.

### 4.3 Missing Audio Placeholders
If a subtitle segment is missing its dubbing audio file, the system automatically creates a silent audio file of matching duration to prevent the pipeline from failing.

---

## 5. Detailed Breakdown of Alignment Modes

### 5.1 Mode 1: Audio Speedup Only
- **Condition**: `should_audiorate=True` and `should_videorate=False`.
- **Target Calculation**:
  If dubbing duration `dubb_duration > source_duration`:
  $$\text{ratio} = \frac{\text{dubb\_duration}}{\text{source\_duration}}$$
  If $\text{ratio} > \text{max\_audio\_speed\_rate}$ (default 50), the target duration is capped at $\frac{\text{dubb\_duration}}{\text{max\_audio\_speed\_rate}}$. Otherwise, the target duration is set directly to the subtitle slot length `source_duration`.
- **Execution**: Registered directly into `self.audio_data` during `_calculate_adjustments()`, then processed in parallel.

### 5.2 Mode 2: Video Slowdown Only
- **Condition**: `should_audiorate=False` and `should_videorate=True`.
- **Target Calculation**:
  Video target duration $\text{video\_target} = \text{dubb\_duration}$.
  $$\text{PTS} = \frac{\text{video\_target}}{\text{source\_duration}}$$
  PTS is capped by `max_video_pts_rate` (default 10).
- **Execution**: Slices, slows down, and stitches the video clips. No tasks are added to `self.audio_data`, keeping audio at original speed.

### 5.3 Mode 3: Audio Speedup + Video Slowdown (Coordinated Closed-Loop Mode)
This mode provides the highest accuracy and the best balance of audio and video quality.

#### Step 1: Split the Difference
When `dubb_duration > source_duration`, the audio and video **split the extra time evenly**:
$$\text{diff} = \text{dubb\_duration} - \text{source\_duration}$$
$$\text{video\_target} = \text{round}\left(\text{source\_duration} + \frac{\text{diff}}{2}\right)$$
$$\text{PTS} = \frac{\text{video\_target}}{\text{source\_duration}}$$

#### Step 2: Slow Down Video and Measure Duration
Slice and adjust the video clip based on `video_target`, then measure the actual physical duration `_actual_duration` of the generated clip.

#### Step 3: Dynamically Set Audio Speedup Tasks
Once `_video_speeddown` finishes, use the **measured clip duration** to define the audio target duration:
```python
self.audio_data.append({
    "filename": self.queue_tts[i]['filename'],
    "dubb_time": self.queue_tts[i]['dubb_time'],  # Original dubbing duration
    "target_time": _actual_duration               # Precise target = actual video clip duration
})
```
This ensures any timing errors or frame drift from video slowdown are smoothed out before audio processing begins.

### 5.4 Mode 4: No Speed Change (Simple Concatenation)
- **Condition**: Both toggles are disabled; runs `_run_no_rate_change_mode()`.
- **Features**:
  1. `remove_silent_mid=False`: Retains pauses between sentences by inserting generated silent clips.
  2. `remove_silent_mid=True`: Removes pauses between sentences for a tighter edit.
  3. `align_sub_audio=True`: Shifts subtitle timestamps backward to align strictly with when dubbing audio plays.
  4. If total audio length exceeds video length, the end of the video is extended with a freeze frame (`_video_extend`).

---

## 6. Stage 1: Video Slowdown and Actual Measurement

Video cutting and speed adjustments are handled by `_cut_video_get_duration` using parallel processing via `ProcessPoolExecutor`:

```python
cmd = [
    '-y',
    '-ss', ss_time,
    '-t', f'{source_duration_s:.6f}',
    '-i', input_video_path,
    '-an',
    '-c:v', 'libx264',
    '-g', '1',                        # GOP=1 ensures keyframe accuracy
    '-preset', preset,
    '-crf', crf,
    '-pix_fmt', 'yuv420p'
]
cmd.extend(fps_mode)                  # CFR or VFR mode
cmd.append(os.path.basename(task['filename']))
```

### 6.1 Fallback Mechanism
If the output file is missing or smaller than 1024 bytes, the system automatically falls back to an explicit `-vf setpts=PTS` command to re-cut the clip:
```python
if not file_path.exists() or file_path.stat().st_size < 1024:
    cmd_backup = [
        '-y', '-ss', ss_time,
        '-t', f'{source_duration_s:.6f}',
        '-i', input_video_path,
        '-an', '-c:v', 'libx264', '-g', '1',
        '-preset', preset, '-crf', crf, '-pix_fmt', 'yuv420p',
        '-vf', 'setpts=PTS',
    ] + fps_mode
    tools.runffmpeg(cmd_backup, force_cpu=True, cmd_dir=work_dir)
```

### 6.2 Reading Actual Duration
Once a clip is created, the system immediately calls `tools.get_video_duration(task["filename"])` to measure its physical media length. This value is saved in `task['actual_duration']` and used as the benchmark for both subtitle alignment and audio speed adjustments.

---

## 7. Stage 2: Precise Audio Speed Adjustment

Audio speed changes support two engines: the high-quality **Rubber Band** engine (primary) and FFmpeg's **atempo** (fallback).

### 7.1 Rubber Band Engine (Recommended: Preserves Pitch & Tone)
Using the `pyrubberband` library, the audio speed is adjusted without altering voice pitch:
```python
def _change_speed_rubberband(input_path, target_duration):
    y, sr = sf.read(input_path)
    current_duration = round((len(y) / sr) * 1000)
    time_stretch_rate = current_duration / target_duration
    time_stretch_rate = max(0.2, min(time_stretch_rate, 50.0))

    y_stretched = pyrb.time_stretch(y, sr, time_stretch_rate)

    # Convert mono to stereo automatically to ensure consistent channel count
    if y_stretched.ndim == 1:
        y_stretched = np.column_stack((y_stretched, y_stretched))

    sf.write(input_path, y_stretched, sr)
```

### 7.2 FFmpeg atempo Cascading Engine (Fallback)
A single FFmpeg `atempo` filter only supports speed multipliers between `[0.5, 2.0]`. For speeds above 2.0x, multiple filters are chained dynamically:
```python
atempo_list = []
speed_factor = current_duration_ms / target_duration

while speed_factor > 2.0:
    atempo_list.append("atempo=2.0")
    speed_factor /= 2.0

atempo_list.append(f"atempo={speed_factor}")
filter_str = ",".join(atempo_list)
# e.g., 3.0x becomes "atempo=2.0,atempo=1.5"
```
A `-t` flag is applied at the end to trim the audio to the exact target millisecond, preventing rounding errors.

---

## 8. Final Audio Concatenation and Freeze-Frame Compensation

After all audio adjustments are complete, `_concat_audio_aligned()` builds the final audio track:

### 8.1 Smart First-Segment Silence Restoration
Subtitle 0 was temporarily moved to 0 seconds during preprocessing. During final concatenation, the system checks the actual audio duration `_audio0_ms` against the slot duration `_sub_ms`:
```python
if self.audio0_left_pad > 0:
    _audio0_ms = len(AudioSegment.from_file(self.queue_tts[0]['filename']))
    _sub_ms = self.queue_tts[0]['end_time']
    if _sub_ms > _audio0_ms:
        # Subtitle slot is larger than audio; shift the start time back to the right
        _start_time = min(_sub_ms - _audio0_ms, self.audio0_left_pad)
        self.queue_tts[0]['start_time'] = _start_time
        self.queue_tts[0]['source_duration'] = self.queue_tts[0]['end_time'] - _start_time

if self.queue_tts[0]['start_time'] > 0:
    audio_list.append(self._create_silen_file("head_0", self.queue_tts[0]['start_time']))
```
**Why this matters**: In videos where the first 3 seconds are silent, dubbing won't start prematurely at 0 seconds; it will begin naturally where the speech belongs.

### 8.2 Slot Filling and Tail Padding
The system iterates through all dubbing clips:
1. If an audio clip is shorter than its video slot, silence (`silence_tail_{i}.wav`) is appended to fill the slot.
2. The subtitle queue's `start_time` and `end_time` are updated so subtitles stay synced with the sound.

### 8.3 Tail Alignment & Freeze-Frame (`_video_extend`)
At the end of the video, the total audio duration `_total_ms` is compared against the video duration `self.raw_total_time`:
- **Audio shorter than video**: Silence is added to the end of the audio track (`append_video_end`).
- **Audio longer than video**: Calls `_video_extend`, which uses FFmpeg's `tpad` filter to hold the last video frame:
  ```python
  cmd = [
      '-y', '-i', os.path.basename(self.novoice_mp4),
      '-vf', f'tpad=stop_mode=clone:stop_duration={sec:.3f}',
      '-c:v', 'libx264',
      '-crf', f'{settings.get("crf", 23)}',
      '-preset', settings.get('preset', 'veryfast'),
      '-an', 'final_video_with_freeze_lastend.mp4'
  ]
  ```
  After extending the video, the new duration is remeasured. Any tiny remaining difference is padded with silence.

---

## 9. TtsSpeedRate: Standalone Subtitle Dubbing

For "text/subtitle batch dubbing" tasks without a video file, `TtsSpeedRate` provides a streamlined version of `SpeedRate`:
1. **No Video Processing**: `self.should_videorate = False`, skipping video cutting and slow-motion steps.
2. **Forced Alignment**: Whenever dubbing is longer than the subtitle duration, it is sped up to match the subtitle timing.
3. **Clean Concatenation**: Retains opening gap padding and silence between segments, outputting a clean, aligned audio track.

---

## 10. Configuration and Encoding Parameters

### 10.1 External Settings
The module automatically detects configuration files in the root folder:
- `crf.txt`: Sets custom video quality CRF value (Default: `18`).
- `preset.txt`: Sets encoding speed preset (Default: `veryfast`; options include `ultrafast`, `medium`, `slow`, etc.).
- `settings.get('fps_mode')`: If set to `cfr`, it detects the input video's constant frame rate and adds `-r {fps} -fps_mode cfr`.

### 10.2 Concurrency and Paths
- **Adaptive Process Pool**: Thread/process count is set dynamically via `_wok = min(12, len(tasks), max(os.cpu_count() - 1, 1))` to balance speed and system stability.
- **Cross-Platform Paths**: All paths are built using `pathlib.Path` and converted with `.as_posix()`. Setting `cmd_dir=cache_folder` avoids common Windows issues with non-ASCII characters and backslashes.

---

## Appendix: Full Two-Stage Workflow Diagram

```text
                       ┌───────────────────────────────┐
                       │   Input: queue_tts + Video/TTS │
                       └───────────────┬───────────────┘
                                       │
                       ┌───────────────┴───────────────┐
                       │ Video Slowdown or Audio       │
                       │ Speedup Enabled?              │
                       └───────────────┬───────────────┘
                                       │
                   ┌───────────────────┴───────────────────┐
                  Yes                                      No
                   │                                       │
         ┌─────────┴─────────┐                   ┌─────────┴─────────┐
         │  _prepare_data()  │                   │ _run_no_rate_     │
         │ - Head-to-tail    │                   │   change_mode()   │
         │ - Subtitle 0 to 0 │                   │ Stitch audio with │
         │ - Save pad offset │                   │ no speed changes  │
         └─────────┬─────────┘                   └─────────┬─────────┘
                   │                                       │
         ┌─────────┴──────────┐                            │
         │_calculate_         │                            │
         │ adjustments()      │                            │
         │ Plan PTS & Targets │                            │
         └─────────┬──────────┘                            │
                   │                                       │
        ┌──────────┴──────────┐                            │
       【Stage 1: Video】     │                            │
        │ Cut & slow video    │                            │
        │ Measure actual_dur  │                            │
        │ Stitch novoice mp4  │                            │
        └──────────┬──────────┘                            │
                   │                                       │
        ┌──────────┴──────────┐                            │
       【Stage 2: Audio】     │                            │
        │ Target = measured   │                            │
        │ actual video length │                            │
        │ Rubberband speedup  │                            │
        └──────────┬──────────┘                            │
                   │                                       │
         ┌─────────┴──────────┐                            │
         │_concat_audio_      │                            │
         │ aligned()          │◄───────────────────────────┘
         │ - Restore padding  │
         │ - Pad silence gaps │
         │ - Freeze-frame end │
         └─────────┬──────────┘
                   │
         ┌─────────┴──────────┐
         │ _exec_concat_audio │
         │ Lossless FFmpeg    │
         │ Concatenation      │
         └─────────┬──────────┘
                   │
         ┌─────────┴──────────┐
         │ Output: Synced New │
         │ Video & Subtitles  │
         └────────────────────┘
```