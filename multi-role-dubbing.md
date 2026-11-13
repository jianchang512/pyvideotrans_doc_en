---
title: Voice Cloning & Multi-Speaker Dubbing
description: Using the original video's voice for dubbing (voice cloning) and multi-speaker dubbing
---

# Voice Cloning & Multi-Speaker Dubbing


Voice cloning uses the original video speaker's voice to generate target-language dubbing. For example, translating a Chinese video to English — the resulting English dubbing still sounds like the original speaker.

### Basic Principle

1. Extract subtitle data to be dubbed
2. Based on subtitle start/end times, clip the corresponding audio segment from the original video as **reference audio**
3. Send the reference audio and translated subtitle text to a TTS engine that supports voice cloning

### Services That Support Voice Cloning

| Service | Local/Online | Languages | Rating |
|---------|-------------|-----------|--------|
| OmniVoice-TTS | Built-in | All languages | ⭐⭐⭐ |
| Qwen-TTS | Built-in | Chinese, English, Japanese, Korean, 10+ | ⭐⭐⭐ |
| F5-TTS | Built-in | Chinese, English | ⭐⭐⭐ |
| Confucius-TTS | Built-in | 14 languages | ⭐⭐⭐ |
| ZipVoice-TTS | Built-in | Chinese, English | ⭐⭐ |
| ChatterBox | Built-in | 10+ languages | ⭐⭐ |
| GPT-SoVITS | Local API | Chinese, English, Japanese, Korean | ⭐⭐⭐ |
| Index-TTS | Local API | Chinese, English | ⭐⭐⭐ |
| VoxCPM-TTS | Local API | 10+ languages | ⭐⭐⭐ |
| CosyVoice | Local API | Chinese, English, Japanese, Korean, 10+ | ⭐⭐ |
| Spark-TTS | Local API | Chinese, English | ⭐⭐ |

::: details What do "Local API" and "Built-in" mean?

- **Local API**: Many open-source models can be deployed locally. After deployment and startup, enter the API URL or WebUI URL in the software settings. The software will call your deployed model service (e.g., GPT-SoVITS, CosyVoice).
- **Built-in**: Some models can be integrated into the software without separate deployment — usable out of the box. However, to keep the software package small, only the calling code is included. The models are downloaded online on first use.

> [View all model download URLs and manual download instructions](/aboutmodels)

:::

### Best Cloning Configuration

For the best cloning results, configure as follows on the main interface and advanced options:

1. **Force subtitle duration control**: TTS engines typically require reference audio of 3-10 seconds.
   - Go to `Menu → Tools → Advanced Options → Speech Recognition`
   - Max speech duration: 6-10
   - Min speech duration: 3000-4000
2. **Translation service**: Use DeepSeek or OpenAI LLMs, check "Send full subtitle".
3. **Vocal/BGM separation**: Click "More Settings" on the main interface, check "Separate vocal/BGM" to significantly improve cloning quality.

### Using Local Reference Audio

Sometimes you may want to clone the voice from a local audio file instead of the original video.

**Steps**:

1. Prepare a 3-10 second WAV audio file, ensuring:
   - Clear, single voice
   - No background noise
   - No excessive silence at start/end

2. Copy the audio to the `f5-tts` folder in the software directory.

3. Open `Menu → TTS Settings → Set Reference Audio` and enter:
   
   **filename.wav#spoken text in the audio**, e.g., `myaudio1.wav#你说四大皆空，却为何紧闭双眼`

4. Save, then select `myaudio1.wav` from the voice dropdown on the main interface.

> **Note**: GPT-SoVITS reference audio should be placed in the GPT-SoVITS software root directory, not the `f5-tts` folder.

---

## Multi-Speaker Dubbing

### Description

Multi-speaker dubbing allows you to assign different AI voice roles to different speakers in the video. For example:
- Male characters use a male voice
- Female characters use a female voice
- Different characters use different voice styles

### Method 1

0. Select only one video for translation (not batch)
1. On the main interface, click "More Settings"
2. Check "Identify Speakers" and set the number of speakers
3. After subtitle translation is complete, assign different voice roles to each speaker in the pop-up window
4. Click "Confirm" to continue processing

### Method 2

**Left panel → Multi-Speaker Dubbing**: Import subtitles and manually assign a role to each subtitle line. Also supports importing subtitles with speaker identifiers. Each subtitle line must start with `[spk1]` or `[speaker1]`.

---
