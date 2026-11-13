---
title: Using pyVideoTrans in Command Line Mode
date: 2026-01-20 14:33:00
description:  This document provides a detailed guide on how to use the pyVideoTrans video translation tool via the command line (CLI). The tool supports four core features Speech-to-Text (STT), Text-to-Speech (TTS), Subtitle Translation (STS), and Full Automatic Video Translation (VTV).
---

# pyVideoTrans Command Line Tool User Guide

This document provides a detailed guide on how to use the **pyVideoTrans** video translation tool via the command line (CLI). The tool supports four core features: Speech-to-Text (STT), Text-to-Speech (TTS), Subtitle Translation (STS), and Full Automatic Video Translation (VTV).

---

## ⚠️ Important Notes Before You Start

1.  **Running Method**: This guide assumes you are running commands using `uv run cli.py`.
2.  **File Path**: The `--name` parameter **must** be the **absolute path** of the file.
3.  **Path Quoting**: If your path contains spaces, you **must** wrap it in double quotes `""`.
    *   ✅ Correct: `--name "C:\My Videos\test file.mp4"`
    *   ❌ Incorrect: `--name C:\My Videos\test file.mp4`
4.  **Finding Voice Roles**: Please select the corresponding TTS provider and target language in the software UI to see the available voice roles. Due to space and readability, they are not listed here.

---

## 1. Speech-to-Text (STT)

Extract speech from video or audio files and generate an SRT subtitle file.

### Basic Command Format
```bash
uv run cli.py --task stt --name "Absolute file path" [optional parameters]
```

### Parameter Details
| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `--task` | str | **Yes** | `stt` | Task type identifier |
| `--name` | str | **Yes** | - | Absolute path to the audio/video file |
| `--recogn_type` | int | No | 0 | Speech recognition provider ID (see [Appendix 1](#appendix-1-speech-recognition-provider-list)) |
| `--model_name` | str | No | `tiny` | Model size (`tiny`, `small`, `base`, `medium`, `large-v2`, etc. Please check the specific model names in the software UI based on the selected recognition provider) |
| `--detect_language`| str | No | `auto` | Source audio language code, defaults to automatic detection |
| `--cuda` | bool | No | False | Add this flag to enable GPU (CUDA) acceleration |
| `--remove_noise` | bool | No | False | Add this flag to enable audio noise reduction |
| `--enable_diariz` | bool | No | False | Add this flag to enable speaker diarization (differentiating speakers) |
| `--nums_diariz` | int | No | -1 | Specify the number of speakers (only effective when speaker diarization is enabled) |
| `--fix_punc` | bool | No | False | Add this flag to try restoring punctuation |

### Usage Examples
**Transcribe using Faster-Whisper (tiny model):**
```bash
uv run cli.py --task stt --name "D:\videos\demo.mp4" --recogn_type 0 --model_name tiny
```
**Use GPU acceleration and specify the source language as Chinese:**
```bash
uv run cli.py --task stt --name "D:\videos\demo.mp4" --detect_language zh-cn --cuda
```

---

## 2. Text-to-Speech (TTS)

Convert an SRT subtitle file or text into audio speech.

### Basic Command Format
```bash
uv run cli.py --task tts --name "Absolute SRT file path" --voice_role "Voice name" [optional parameters]
```

### Parameter Details
| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `--task` | str | **Yes** | `tts` | Task type identifier |
| `--name` | str | **Yes** | - | Absolute path to the SRT subtitle file |
| `--tts_type` | int | No | 0 | TTS provider ID (see [Appendix 2](#appendix-2-tts-provider-list)) |
| `--voice_role` | str | **Yes** | - | **Voice name** (Please check the specific role names in the software UI based on the selected TTS provider) |
| `--voice_rate` | str | No | `+0%` | Speech rate adjustment (e.g., `+10%`, `-10%`) |
| `--volume` | str | No | `+0%` | Volume adjustment |
| `--pitch` | str | No | `+0Hz` | Pitch adjustment |
| `--target_language_code`| str | No | - | Target language code (required by some TTS engines) |
| `--voice_autorate`| bool | No | False | Automatically speed up audio to align with subtitle timestamps |
| `--align_sub_audio`| bool | No | False | Force modify subtitle timestamps to match audio length |

### Usage Examples
**Generate Audio with Edge-TTS (Chinese male voice):**
```bash
uv run cli.py --task tts --name "C:\subs\movie.srt" --tts_type 0 --voice_role "zh-CN-YunyangNeural" --target_language_code zh-cn
```

---

## 3. Subtitle Translation (STS)

Translate an SRT subtitle file into another language.

### Basic Command Format
```bash
uv run cli.py --task sts --name "Absolute SRT file path" --target_language_code "Target language" [optional parameters]
```

### Parameter Details
| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `--task` | str | **Yes** | `sts` | Task type identifier |
| `--name` | str | **Yes** | - | Absolute path to the SRT subtitle file |
| `--translate_type` | int | No | 0 | Translation provider ID (see [Appendix 3](#appendix-3-translation-provider-list)) |
| `--target_language_code`| str | **Yes** | - | Target language code (see [Appendix 4](#appendix-4-language-code-list)) |
| `--source_language_code`| str | No | `auto` | Source language code |

### Usage Examples
**Translate subtitles to English (using Google Translate):**
```bash
uv run cli.py --task sts --name "D:\subs\source.srt" --target_language_code en --translate_type 0
```

---

## 4. Video Translation (VTV)

Full pipeline process: **Transcription -> Translation -> TTS -> Compositing**, directly generating a translated video.

### Basic Command Format
```bash
uv run cli.py --task vtv --name "Video path" --source_language_code "Source language" --target_language_code "Target language" [optional parameters]
```

### Parameter Details
> VTV mode integrates the parameters of all the functions above. Listed below are parameters not already covered.

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `--task` | str | **Yes** | `vtv` | Task type identifier |
| `--name` | str | **Yes** | - | Absolute path to the video file |
| `--source_language_code`| str | **Yes** | - | **Spoken language** (Cannot be set to auto in VTV mode) |
| `--target_language_code`| str | **Yes** | - | **Target language** |
| `--subtitle_type` | int | No | 1 | Subtitle embedding method (see description below) |
| `--video_autorate` | bool | No | False | Automatically slow down video to match new audio duration |
| `--is_separate` | bool | No | False | Whether to separate vocals from background music (preserve background sound) |
| `--recogn2pass` | bool | No | False | Whether to perform a second pass of speech recognition (improves accuracy) |
| `--clear_cache` | bool | No | True | Whether to clean up temporary files (default is to clean) |
| `--no-clear-cache` | flag | No | - | Add this flag to **not** clear the cache |

**Regarding the `--subtitle_type` value:**
*   `0`: No subtitles embedded
*   `1`: Hardcoded subtitles (default)
*   `2`: Soft subtitles
*   `3`: Hardcoded bilingual subtitles
*   `4`: Soft bilingual subtitles

### Usage Examples
**Translate Chinese to English video, keep background audio, embed hardcoded subtitles, use GPU:**
```bash
uv run cli.py --task vtv --name "E:\movies\clip.mp4" --source_language_code zh-cn --target_language_code en --voice_role "en-US-GuyNeural" --is_separate --cuda --subtitle_type 1
```

---

## Appendix: Provider and Code Reference Tables

### Appendix 1: Speech Recognition Provider List (`--recogn_type`)

**In the software UI, this corresponds to the order number of the specific recognition provider, starting from 0.**

- 0 = faster-whisper (Local)
- 1 = openai-whisper (Local)
- 2 = Qwen-ASR (Local)
- 3 = Alibaba FunASR (Local)
- 4 = Huggingface_ASR
- 5 = OpenAI Speech-to-Text API
- 6 = Gemini ASR
- 7 = Alibaba Bailian Qwen3-ASR
- 8 = ByteDance Voice LLM (Fast)
- 9 = Zhipu AI GLM-ASR
- 10 = Deepgram.com
- 11 = Parakeet-tdt
- 12 = Whisper.cpp
- 13 = Faster-Whisper-XXL.exe
- 14 = WhisperX
- 15 = 302.AI
- 16 = ElevenLabs.io
- 17 = Google Recognition API (Free)
- 18 = STT Speech Recognition (Local)
- 19 = Whisper.NET
- 20 = CAMB AI
- 21 = Custom Recognition API

*Supported model names, only applicable to faster-whisper and openai-whisper providers. Check the software UI for other providers (`--model_name`):* `tiny`, `small`, `base`, `medium`, `large-v3-turbo`, `large-v1`, `large-v2`, `large-v3`

### Appendix 2: TTS Provider List (`--tts_type`)

**In the software UI, this corresponds to the order number of the specific TTS provider, starting from 0.**

**After selecting the target language and TTS provider, the available specific role names will be displayed in the software UI.**

- 0 = Edge-TTS (Free)
- 1 = Qwen3-TTS (Local, built-in)
- 2 = OmniVoice (Local API)
- 3 = Piper (Local, built-in)
- 4 = VITS (Local, built-in)
- 5 = GPT-SoVITS (Local API)
- 6 = F5-TTS (Local API)
- 7 = Index-TTS (Local API)
- 8 = CosyVoice (Local API)
- 9 = Supertonic (Local, built-in)
- 10 = VoxCPM (Local API)
- 11 = ChatterBox (Local API)
- 12 = Doubao Speech Synthesis Model 2.0
- 13 = Qwen3-TTS
- 14 = XiaoMi-TTS
- 15 = GLM-TTS (Zhipu AI)
- 16 = Minimaxi-TTS
- 17 = OpenAI-TTS
- 18 = Gemini TTS
- 19 = Elevenlabs.io
- 20 = X.AI TTS
- 21 = Azure-TTS
- 22 = 302.AI
- 23 = ChatTTS (Local API)
- 24 = Spark-TTS (Local API)
- 25 = Dia-TTS (Local API)
- 26 = kokoro-TTS (Local API)
- 27 = clone-voice (Local API)
- 28 = Fish-TTS (Local API)
- 29 = gTTS (Free)
- 30 = CAMB AI TTS
- 31 = MOSS-TTS-Nano
- 32 = Custom TTS API

### Appendix 3: Translation Provider List (`--translate_type`)

**In the software UI, this corresponds to the order number of the specific translation provider, starting from 0.**

- 0 = Google (Free)
- 1 = Microsoft (Free)
- 2 = M2M100 (Local)
- 3 = OpenAI ChatGPT
- 4 = DeepSeek
- 5 = Gemini AI
- 6 = Zhipu AI
- 7 = AzureGPT AI
- 8 = Compatible AI/Local Models
- 9 = OpenRouter
- 10 = SiliconFlow
- 11 = 302.AI
- 12 = Alibaba Bailian
- 13 = ByteDance LLM
- 14 = Tencent Translation
- 15 = Baidu Translate
- 16 = DeepL
- 17 = DeepLx
- 18 = Alibaba Machine Translation
- 19 = LibreTranslate (Local)
- 20 = MiniMax AI
- 21 = XiaoMi AI
- 22 = CAMB AI
- 23 = Custom Translation API

### Appendix 4: Language Code List

**Applicable for `--source_language_code` and `--target_language_code`**

| Code | Language | Code | Language | Code | Language |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **en** | English | **zh-cn** | Chinese (Simplified) | **zh-tw** | Chinese (Traditional) |
| **fr** | French | **de** | German | **ja** | Japanese |
| **ko** | Korean | **ru** | Russian | **es** | Spanish |
| **th** | Thai | **it** | Italian | **pt** | Portuguese |
| **vi** | Vietnamese | **ar** | Arabic | **tr** | Turkish |
| **hi** | Hindi | **hu** | Hungarian | **uk** | Ukrainian |
| **id** | Indonesian | **ms** | Malay | **kk** | Kazakh |
| **cs** | Czech | **pl** | Polish | **nl** | Dutch |
| **sv** | Swedish | **he** | Hebrew | **bn** | Bengali |
| **fa** | Persian | **fil** | Filipino | **ur** | Urdu |
| **yue**| Cantonese   | **el**  | Greek  | **km**  | Khmer |
| **nb**| Norwegian   |  **ro** | Romanian  |  |  |