---
title: Using CosyVoice3 in pyVideoTrans
date: 2024-01-22 14:33:00
description: Supports Chinese, English, Japanese, Korean, and Cantonese with language codes zh|en|jp|ko|yue.
---

# TTS Channel: CosyVoice3

## What is CosyVoice3

CosyVoice is an open-source TTS service from Alibaba's Tongyi Lab, supporting voice cloning in Chinese, English, Japanese, Korean, and Cantonese. CosyVoice3 is the latest version, with the following features:

- 5 languages supported: Chinese (zh), English (en), Japanese (jp), Korean (ko), Cantonese (yue)
- 3-second rapid cloning: clone a voice from just 3 seconds of reference audio
- Built-in clone character: directly replicate the voice from the original video

> CosyVoice open-source: https://github.com/FunAudioLLM/CosyVoice

---

## Prerequisites

| Requirement | Details |
|-------------|---------|
| pyVideoTrans version | Latest version recommended |
| Hardware | NVIDIA GPU recommended |
| Network | First launch downloads models from modelscope.cn |

---

## Important: WebUI File Modification

> **The official `webui.py` included with CosyVoice3 cannot be used directly!** The audio component uses streaming output, which causes the API to return m3u8 files instead of wav audio.

### Solution

Open `webui.py`, search for `streaming=True` and change it to `streaming=False`, then restart `webui.py`.

Alternatively, download a pre-modified `webui.py` to replace the official one:
- Download: https://github.com/jianchang512/stt/releases/download/0.0/cosyvoice3-webui-py.zip

---

## Deployment

### Option A: Windows Package (recommended for beginners)

- Baidu Cloud download: https://pan.baidu.com/s/1Lp1GNGZGaO6WQG3NLli_RQ?pwd=1234
- HuggingFace download: https://huggingface.co/mortimerme/repocollect/resolve/main/cosyvoice3-0529.7z?download=true

Download, extract, and double-click the startup script.

### Option B: From Source

1. Deploy the official project
2. Confirm that `webui.py` starts successfully and you can perform a dubbing operation in the UI
3. Download the modified `webui.py` and replace the official one
4. Restart `webui.py`

---

## Using in pyVideoTrans

### Steps

1. **Upgrade**: Make sure pyVideoTrans is updated to the latest version
2. **Start the WebUI**: Ensure the CosyVoice project is deployed and `webui.py` is running. Open `http://127.0.0.1:8000` in your browser
3. **Configure address**: Open pyVideoTrans → Menu → TTS Settings → CosyVoice, enter the WebUI address (default: `http://127.0.0.1:8000`)
4. **Fill in reference audio**: Enter the reference audio filename and corresponding text
5. **Select channel**: Choose CosyVoice from the "TTS Channel" dropdown on the main screen

### Reference Audio Format

```
audio_filename.wav#text corresponding to the audio
```

Example: `nverguo.wav#Queen of Women speaking`

Place the audio file in the `f5-tts` folder under the pyVideoTrans project root directory.

### Character Selection

- **clone character**: Replicates the voice from the original video (automatic cloning)
- **custom character**: Uses the configured reference audio for cloning

---

## Reference Audio Requirements

| Item | Requirement |
|------|-------------|
| Format | WAV (recommended) |
| Duration | 3–10 seconds (ideal) |
| Content | Clear pronunciation, no background noise |
| Location | `f5-tts` folder under pyVideoTrans root directory |

> **Source code verification** (`_cosyvoice.py`): CosyVoice uses the `/generate_audio` API endpoint. Reference audio automatically gets an `<|endofprompt|>` tag added, and streaming output is forced off (`stream: False`).

---

## Troubleshooting

### 1. Model Download Is Slow on First Use

The first launch automatically downloads models from modelscope.cn, which may take a while. Please be patient.

### 2. Returns m3u8 File Instead of Audio

This is because the WebUI file hasn't been modified. Search for `streaming=True` and change it to `streaming=False`, or download the modified `webui.py`.

### 3. Dubbing Quality Is Poor

- Ensure the reference audio is high quality (clear pronunciation, no noise)
- Reference audio duration should be 3–10 seconds
- Try different reference audio

### 4. Connection Failed

Make sure:
- CosyVoice WebUI is running
- The address is correct (default: `http://127.0.0.1:8000`)
- The browser can open the WebUI interface
