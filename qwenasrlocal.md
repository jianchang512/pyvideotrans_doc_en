---
title: Qwen-ASR Local Speech Recognition Model
date: 2026-01-22 14:33:00
description: Qwen-ASR local speech recognition model integration
---

# Qwen-ASR Local Speech Recognition Model

## What is this?

Qwen-ASR is a local speech recognition model developed by the Alibaba Tongyi Qianwen team. It converts audio speech into text without requiring an internet connection. The model runs entirely locally, protecting your privacy while providing high-accuracy speech recognition.

Select `Qwen-ASR (Local)` in pyVideoTrans's speech recognition service to use this model.

## Version Requirements

> **Must upgrade to v3.97+ to use the Qwen-ASR local model.**

## Model Selection

Qwen-ASR offers two model sizes, each with its own trade-offs:

| Model | Parameters | Accuracy | Resource Usage | Recommended For |
|-------|-----------|----------|---------------|-----------------|
| 0.6B | 600M | High | Lower | Limited VRAM, speed priority |
| 1.7B | 1.7B | Higher | Higher | Accuracy priority, sufficient VRAM |

- **0.6B model**: Smaller, faster inference, lower VRAM requirements. Suitable for average computers.
- **1.7B model**: Higher recognition accuracy, but requires more VRAM and compute. Suitable for best-quality seekers.

## Model Download

### Auto-download (Recommended)

On first use, the software will automatically download the required model from the model repository. The Chinese UI defaults to using the ModelScope domestic mirror.

### Manual Download

If auto-download fails or is too slow, download manually.

#### Step 1: Verify Directory Structure

Ensure the following model directories exist under the software's `models/` folder (create them if missing):

```
app_dir/
└── models/
    ├── models--Qwen--Qwen3-ASR-0.6B/    (0.6B model directory)
    └── models--Qwen--Qwen3-ASR-1.7B/    (1.7B model directory)
```

#### Step 2: Download 1.7B Model

1. Open HuggingFace page: [https://huggingface.co/Qwen/Qwen3-ASR-1.7B/tree/main](https://huggingface.co/Qwen/Qwen3-ASR-1.7B/tree/main)
2. Download all files from the page.
3. Place all files in `models/models--Qwen--Qwen3-ASR-1.7B/`.

#### Step 3: Download 0.6B Model

1. Open HuggingFace page: [https://huggingface.co/Qwen/Qwen3-ASR-0.6B/tree/main](https://huggingface.co/Qwen/Qwen3-ASR-0.6B/tree/main)
2. Download all files from the page.
3. Place all files in `models/models--Qwen--Qwen3-ASR-0.6B/`.

#### Step 4: Select Model

In the software's speech recognition settings, select either `0.6B` or `1.7B` as needed.

![](https://pvtr2.pyvideotrans.com/1770876402238_image.png)

![](https://pvtr2.pyvideotrans.com/1770876375956_image.png)

![](https://pvtr2.pyvideotrans.com/1770876414628_image.png)

## How It Works

Qwen-ASR uses **VAD (Voice Activity Detection)** for audio preprocessing:

1. Uses the `ten-vad` model to intelligently segment audio into short clips.
2. Processes clips in batches of 8 for inference.
3. Merges recognition results from all clips.

This approach has low VRAM usage and fast inference, making it suitable for long audio files.

---

## FAQ

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Model download failed | Network issue or HuggingFace blocked | Use ModelScope mirror or download manually |
| Empty recognition results | Unsupported audio format | Use common format (wav/mp3/aac), preferably WAV |
| Out of VRAM | Insufficient GPU memory | Use 0.6B model or close other VRAM-intensive programs |
| Very slow recognition | GPU acceleration not used | Check CUDA environment configuration |
| Software freezes | Long audio processing | This is normal — be patient, or use shorter audio |
