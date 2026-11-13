---
title: Advanced Options Reference
date: 2024-01-22 14:33:00
description: Detailed descriptions of each advanced option
---

## Advanced Options Reference

In `Menu → Tools / Options → Advanced Options`, you can customize various parameters for finer control.

![](https://pvtr2.pyvideotrans.com/1786510765759_image.png)

#### 【General Settings】

-  **`UI Language`**: Set the software UI language. Requires a restart to take effect.

-  **`Interactive Translation Review Timeout (s)`**: Pause duration (in seconds) for interactive review in single-video translation. Set to 0 to sk
ip the editor window.

-  **`Standalone Tools Output Directory`**: Sets the output directory for standalone tools (e.g., batch transcription, subtitle dubbing, srt transl
ation). Not for main video translation results. Defaults to the 'output' folder in the installation directory.

-  **`Retry Attempts on Failure`**: Number of retry attempts for recoverable network or processing errors.

-  **`Disable Desktop Notifications`**: Suppress desktop notifications upon task completion or failure.

-  **`Vocal Separation Threads`**: Number of threads allocated for vocal separation and denoising. Higher values are faster but increase resource c
onsumption.

-  **`Vocal Separation Model`**: Model used for separating vocal tracks from background audio.

-  **`Denoise Model`**: ZipEnhancer automatically selects the optimal device via audio.cpp; other models run on CPU only.

-  **`Batch Size for Video Translation`**: Number of videos to process concurrently in batch mode. Default is 0 (unlimited).

-  **`Show Advanced Settings on Main UI`**: Most advanced parameters are hidden by default to keep the interface simple. Enable this to display all
 parameters on the main interface.

-  **`Max Concurrent CPU Tasks [Restart Required]`**: Maximum concurrent CPU tasks. Higher values increase speed but consume more RAM; should not e
xceed total CPU cores.
(Restart required to apply changes)

-  **`Max Concurrent GPU Tasks [Restart Required]`**: Maximum concurrent GPU tasks. Recommended setting is 1 unless you have high-capacity VRAM.
(Restart required to apply changes)

-  **`Force Compute Device for Heavy Tasks`**: Force heavy tasks to run on a designated device. Do not modify unless you understand the configurati
on requirements.

-  **`Enable 8-bit Quantization for Qwen3-TTS`**: Apply 8-bit quantization to Qwen3-TTS to reduce VRAM consumption.


#### 【Video Output Settings】

-  **`Video Quality Control (CRF)`**: Constant Rate Factor (CRF) controls compression quality. 0 = lossless (very large file size); 51 = worst qual
ity (smallest file size).

-  **`Video Encoding Preset`**: Balances encoding speed and compression ratio (ultrafast, superfast, veryfast, faster, fast, medium, slow, slower,
veryslow). Slower presets produce smaller files at equal quality.

-  **`Video Codec (H.264 / H.265)`**: Select libx264 or libx265. H.264 offers broader compatibility; H.265 provides higher compression efficiency a
nd clarity.

-  **`Output Video Container (mp4/mkv)`**: Container format for the output video (mp4 or mkv).

-  **`Frame Rate Mode (VFR / CFR)`**: When slow-motion video processing is applied, Variable Frame Rate (VFR) yields smoother playback, whereas Con
stant Frame Rate (CFR) provides maximum compatibility.

-  **`Force Software Video Encoding`**: Force FFmpeg to use software encoding? (Slower, but avoids hardware-specific encoding glitches. Hardware ac
celeration is preferred by default).

-  **`Enable CUDA Hardware Decoding`**: Force CUDA decoding during the final video muxing step. Faster, but more prone to pipeline errors.

-  **`Custom FFmpeg Parameters`**: Custom FFmpeg parameters inserted before the output file argument (e.g., -bf 7 -b_ref_mode middle).


#### 【Speech Recognition (ASR)】

-  **`VAD Engine`**: Select the Voice Activity Detection (VAD) engine.

-  **`VAD Speech Threshold`**: Minimum confidence threshold to detect speech. Audio exceeding this probability is treated as speech, while lower se
gments are treated as silence or noise. Lower values increase sensitivity but may misidentify background noise as voice.

-  **`No-Speech Threshold`**: Lowering this value helps suppress hallucinations, but may skip low-volume speech.

-  **`Max Speech Duration (s)`**: Maximum allowed duration (in seconds) for a single speech segment. Segments exceeding this will be forcefully spl
it.

-  **`Min Speech Duration (ms)`**: Minimum speech duration (in milliseconds). Subtitle segments shorter than this threshold will attempt to merge w
ith adjacent segments.

-  **`Min Silence Duration for Split (ms)`**: Minimum trailing silence (in milliseconds) required to trigger a segment split. Splits will only occu
r during silent intervals exceeding this duration.

-  **`Secondary Recognition Model`**: Model used for secondary speech recognition (restricted to faster-whisper pipeline).

-  **`Secondary ASR Max Speech Duration (s)`**: Maximum speech segment duration (in seconds) for secondary recognition. Segments exceeding this wil
l be split forcefully.

-  **`Secondary ASR Min Speech Duration (ms)`**: Minimum speech duration (in milliseconds) for secondary recognition. Subtitle segments shorter tha
n this threshold will attempt to merge with adjacent segments.

-  **`Speaker Diarization Model`**: Speaker diarization model. The built-in model supports Chinese and English.
Using Pyannote requires a Hugging Face Access Token and accepted user terms on huggingface.co.

Guide: https://pvt9.com/shuohuaren

-  **`Hugging Face Token`**: Enter your Hugging Face Access Token. Required for Pyannote models. See tutorial: https://pvt9.com/shuohuaren

-  **`Compute Type`**: Computation data type for Faster-Whisper: int8 (minimal resource usage, fastest, lower accuracy); float32 (high resource usa
ge, slower, high accuracy); float16 (recommended for CUDA acceleration). 'default' automatically selects the best option.

-  **`Beam Size`**: Beam size for transcription accuracy (1–5). 1 uses the least VRAM; 5 provides highest accuracy at higher VRAM usage.

-  **`Best Of`**: Candidate sampling count (1–5). 1 uses the least VRAM; 5 provides better consistency at higher VRAM usage.

-  **`Condition on Previous Text`**: Provides preceding text as context to Whisper. Improves accuracy and consistency, but increases VRAM consumpti
on and may cause repetitive loops or hallucinations.

-  **`Sampling Temperature`**: Sampling temperature for transcription randomness.

-  **`Repetition Penalty`**: Increase this value to reduce repetitive loops in generated text.

-  **`Compression Ratio Threshold`**: Decrease this threshold to suppress repetitive hallucinations.

-  **`Hotwords`**: Keywords or specific vocabulary expected in the audio to guide recognition accuracy. Separate multiple entries with English comm
as.

-  **`Gemini ASR Batch Chunk Size`**: Number of audio slices submitted per batch when using Gemini ASR. Larger values yield better context, but may
 increase request failure rates.

-  **`Convert Traditional Chinese to Simplified`**: Automatically convert recognized Traditional Chinese subtitles into Simplified Chinese.

-  **`Remove Trailing Punctuation`**: Remove trailing punctuation marks from subtitle lines.

-  **`Cloud ASR Request Delay (s)`**: Delay (in seconds) between cloud ASR requests to prevent rate limiting.

-  **`LLM Proofreading Batch Size (Lines)`**: Number of subtitle lines sent per batch for LLM proofreading. Larger values provide better context an
d segmentation, but excessively large batches may exceed model context/output token limits. Default: 20 lines.

-  **`LLM Provider for Proofreading`**: AI provider used for LLM-based subtitle proofreading and correction.

-  **`Use LLM for Resegmentation Instead of Correction`**: Use the LLM for sentence re-segmentation instead of simple error correction. Subtitles w
ill be restructured and re-split based on semantic boundaries rather than just correcting typos.


#### 【Subtitle Translation】

-  **`Traditional Translation Batch Size (Lines)`**: Number of subtitle lines submitted per batch to traditional translation engines.

-  **`AI Translation Batch Size (Lines)`**: Number of subtitle lines submitted per batch to AI translation engines.

-  **`Post-Translation Delay (s)`**: Delay (in seconds) between translation requests to comply with API rate limits.

-  **`Further streamline translation`**: Upon selection, AI translation prompts will be added, requiring the translation results to be extremely co
ncise to avoid excessively long dubbing.

-  **`AI Translation Temperature`**: Temperature parameter for AI translation models. Default: 0.1.

-  **`Include Full Transcript Context in AI Translation`**: Attach the entire original transcript as reference for higher translation accuracy.
[Notice]
1. Requires an advanced model supporting long context windows.
2. Response times may increase significantly.


#### 【Dubbing Settings】

-  **`Dubbing Threads`**: Number of concurrent TTS synthesis threads.

-  **`Post-Dubbing Delay (s)`**: Delay (in seconds) between dubbing requests to comply with API rate limits.

-  **`Trim Start/End Silence in Dubbed Segments`**: Trim leading and trailing silence buffers from each dubbed clip to improve video-audio synchron
ization.

-  **`Strip All Silence in Dubbed Segments`**: Strip all silence buffers (including start, end, and internal pauses) from dubbed clips for tighter
sync.

-  **`Silence Removal Intensity`**: Intensity of silence removal: 'default' (moderate), 'low' (preserves natural pauses), 'max' (aggressive silence
 stripping).

-  **`Keep Segment Audio Files`**: Save individual TTS audio files generated for each subtitle line.

-  **`Text Normalization`**: Apply text normalization (formatting numbers, abbreviations, and symbols) prior to TTS synthesis.

-  **`EdgeTTS Max Concurrency`**: Max concurrent tasks for EdgeTTS. Higher values are faster, but increase the risk of request throttling or discon
nects.

-  **`EdgeTTS Retry Attempts`**: Number of retry attempts upon EdgeTTS failure. Non-recoverable failures will not resolve with excessive retries an
d will slow down processing.


#### 【A/V & Subtitle Sync】

-  **`Max Audio Speedup Multiplier`**: Maximum allowed audio acceleration multiplier. Default: 100.

-  **`Max Video Slowdown Multiplier`**: Maximum allowed video slow-motion multiplier. Default: 10 (maximum value: 10).

-  **`Max Line Length (CJK Characters)`**: Maximum characters per line for CJK subtitles before line-wrapping. Applies to translated subtitles or s
tandalone transcription outputs.

-  **`Max Line Length (Non-CJK)`**: Maximum characters per line for non-CJK subtitles before line-wrapping. Applies to translated subtitles or stan
dalone transcription outputs.


#### 【Whisper Prompt】


...