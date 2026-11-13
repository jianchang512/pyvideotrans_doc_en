---
title: Using Index-TTS as a Dubbing Channel
date: 2025-09-10 14:33:00
description: Source deployment and installation of Index-TTS on Windows 10/11.
---

# Using Index-TTS as a Dubbing Channel

## What is Index-TTS

Index-TTS is an open-source TTS service from Bilibili that supports Chinese and English voice cloning with excellent audio quality.

> Index-TTS open-source: https://github.com/index-tts/index-tts

---

## Prerequisites

| Requirement | Details |
|-------------|---------|
| pyVideoTrans version | v3.66 or higher |
| Hardware | NVIDIA GPU recommended |
| Operating System | Windows (package), Linux/macOS (source deployment) |

---

## Windows Package (recommended for beginners)

### Download

- Baidu Cloud download: https://pan.baidu.com/s/1dmLdhJgBC7HlfY-hITMVeg?pwd=1234
- HuggingFace download: https://huggingface.co/mortimerme/repocollect/resolve/main/indextts2-0529.7z?download=true

### Start

1. Download and extract
2. Double-click `启动webui.bat` (Start WebUI)
3. Wait for the model to download automatically
4. After startup, the default address is `http://127.0.0.1:7860`

---

## Source Deployment

Follow the official project documentation: https://github.com/index-tts/index-tts

After deployment, start `webui.py`. The default address is `http://127.0.0.1:7860`.

---

## Using in pyVideoTrans

### Configuration Steps

1. Start the Index-TTS WebUI (ensure your browser can open `http://127.0.0.1:7860`)
2. Open pyVideoTrans, go to Menu → TTS Settings → F5-TTS/Spark-TTS/index-TTS/Dia-TTS
3. Enter in the "IndexURL" text box: `http://127.0.0.1:7860`
4. Click "Test" — if no errors, configuration is successful
5. Select "Index-TTS" from the "TTS Channel" dropdown on the main screen

> **Note**: Only the official Index-TTS WebUI is supported.

---

## Reference Audio Requirements

| Item | Requirement |
|------|-------------|
| Format | WAV (recommended) |
| Duration | 3–10 seconds (ideal) |
| Content | Clear pronunciation, no background noise |
| Location | `f5-tts` folder under pyVideoTrans root directory |

### Reference Audio Format

```
audio_filename.wav#text corresponding to the audio
```

> **Source code verification** (`_index.py`): Index-TTS uses the `/gen_single` Gradio API endpoint and supports v1 and v2 versions. The v2 version adds emotion control (`emo_control_method`), with the default option being "Same as the voice reference."

---

## Troubleshooting

### 1. Third-party package doesn't work

If you're using a third-party package, replace its `webui.py` with the one from the [official Index-TTS source code](https://github.com/index-tts/index-tts), then launch that `webui.py`.

### 2. Error: `配音全部失败 Value: 'Same as the voice reference' is not in the list of choices`

Or error: `Value: '与音色参考音频相同' is not in the list of choices`.

**Solution**: Open the `webui.py` file in the Index-TTS project, search for `i18n("与音色参考音频相同")`, and replace it with `Same as the voice reference`.

### 3. Connection failed

Make sure:
- Index-TTS WebUI is running
- The address is correct (default: `http://127.0.0.1:7860`)
- The browser can open the WebUI interface

### 4. Model download is slow

First launch requires downloading the model. Be patient. For faster downloads, configure a network proxy.
