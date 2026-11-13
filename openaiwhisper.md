---
title: openai-whisper (Local) Speech Recognition
date: 2024-01-22 14:33:00
description: The core principle of the video translation software recognize speech from video into text, translate the text to the target language, dub the translated text, then embed the dubbing and subtitles into the video.
---

# openai-whisper (Local) Speech Recognition

### Overview

This is the official open-source Whisper model from OpenAI. Compared to faster-whisper, it is slower but slightly more accurate. If you need higher recognition precision and don't mind slower processing, this channel is a good choice.

**Key differences from faster-whisper:**

| Comparison | openai-whisper | faster-whisper |
|------------|---------------|----------------|
| Recognition speed | Slower | Fast (several times faster) |
| Accuracy | Slightly higher | Slightly lower |
| Model format | `.pt` files | Folder structure (`.json`/`.bin`/`.txt`) |
| Download source | OpenAI official CDN | HuggingFace |
| Model size | Comparable to faster-whisper | Comparable to openai-whisper |

**Key advantages:**

- Runs entirely locally — audio files are never uploaded to the internet
- Slightly higher accuracy than faster-whisper
- Models downloaded from OpenAI's official CDN, relatively stable access worldwide
- Auto-downloaded on first use, then fully available offline

![image.png](https://pvtr2.pyvideotrans.com/images/66cd7fb8af434a37aca402f575c65e12~tplv-73owjymdk6-jj-mark_0_0_0_0_q75.webp)

## Prerequisites

Before using openai-whisper, please confirm the following requirements:

| Requirement | Details |
|-------------|---------|
| Disk space | At least 5–15 GB reserved for model files (larger models need more) |
| RAM | Basic models (tiny/base) require 4 GB+; large series requires 16 GB+ |
| GPU (optional) | NVIDIA GPU + CUDA acceleration provides significant speedup; large-v3 requires 10 GB+ VRAM |
| Network | Internet required on first use to download models; afterward, fully offline |

## Model Selection

**The first time you use a model, it will be automatically downloaded from openai-whisper's official CDN.**

`tiny --> base --> small --> medium --> large-v3-turbo --> large-v1 --> large-v2 --> large-v3`

Models increase in size from left to right, with higher accuracy and greater memory/VRAM requirements.

It is recommended to use at least `large-v3-turbo` or larger. The best-performing model is **large-v3**.

### Model Reference Table

| Model | Use Case | RAM | VRAM (CUDA) | Notes |
|-------|----------|-----|-------------|-------|
| tiny | Quick preview | 2 GB+ | 1 GB+ | Fastest, lowest accuracy |
| base | Simple content | 3 GB+ | 1 GB+ | Good for clear speech |
| small | General use | 4 GB+ | 2 GB+ | Balanced speed and accuracy |
| medium | Multilingual | 8 GB+ | 5 GB+ | Good multilingual performance |
| large-v3-turbo | Recommended starting point | 10 GB+ | 6 GB+ | Fast with high accuracy |
| large-v1 | High accuracy | 16 GB+ | 10 GB+ | Classic large model |
| large-v2 | High accuracy | 16 GB+ | 10 GB+ | Improved large model |
| large-v3 | Best results | 16 GB+ | 10 GB+ | **Recommended** — best overall |

> Note: openai-whisper models are `.pt` files, different from faster-whisper's folder structure. They are automatically saved in the software directory after download.

## Optimal Configuration

For the best speech recognition results, follow these settings:

1. Select model `large-v3` (ensure your system has more than 16 GB RAM or more than 10 GB VRAM). If requirements aren't met, try `large-v1` or `large-v3-turbo`.
2. Explicitly set the **speech language** to match the language spoken in the video.
3. In *Menu → Tools → Advanced Options → Speech Recognition Parameters*: set `Minimum speech duration (ms)` to 1000, `Maximum speech duration (s)` to 5 or higher, and **do not check** `Whisper pre-split audio`.

> **Important for voice cloning**: If you plan to dub with the `clone` role (cloning the original speaker's voice), it is strongly recommended to set `Minimum speech duration (ms)` to 3000 and `Maximum speech duration (s)` to 10. This is because voice cloning uses the original audio segment corresponding to the subtitle duration as a reference, and most dubbing channels require this reference audio to be 3–10 seconds long — otherwise dubbing will likely fail.
> You should also check `Whisper pre-split audio` and `Merge short subtitles into adjacent` to ensure subtitle durations fall within the 3–10 second range.

4. If the original speech is unclear or has background noise, enable **Noise Reduction**.
5. If you are not using the `clone` role and want shorter subtitles (e.g., for vertical video), you can lower `Maximum speech duration (s)` to 3 or 2. If dubbing is enabled, you can also check `Secondary recognition`.

> Secondary recognition: When dubbing is enabled and embedded single subtitles are selected, checking this option means the software will re-transcribe the dubbed audio after dubbing is complete, generating shorter subtitles embedded in the video to ensure precise alignment between subtitles and dubbed audio.


## CUDA Acceleration

To speed up processing, on Windows and Linux, if you have an NVIDIA GPU, you can install the CUDA and cuDNN environment and enable `CUDA Acceleration` in the software, which significantly improves execution speed.


![image.png](https://pvtr2.pyvideotrans.com/images/25fc2cf7b19c46409671f20a3818db13~tplv-73owjymdk6-jj-mark_0_0_0_0_q75.webp)

[View CUDA and cuDNN installation tutorial](https://pvt9.com/gpu.html)

### CUDA Acceleration Setup Steps

1. Confirm your NVIDIA GPU supports CUDA (GTX 10 series or newer)
2. Download and install the corresponding version of CUDA Toolkit
3. Download and install the corresponding version of cuDNN
4. Enable `CUDA Acceleration` in the software
5. Restart the software to apply the configuration

## Model Download Information

openai-whisper models use the `.pt` format, different from faster-whisper's folder structure.

### Automatic Download

The first time you use a model, the software automatically downloads the corresponding `.pt` model file from OpenAI's official CDN (`openaipublic.azureedge.net`). Once downloaded, it is cached locally and does not require internet access.

### Manual Download

If automatic download fails, you can manually download the model files:

1. Visit OpenAI's official model download page: https://github.com/openai/whisper/blob/main/whisper/__init__.py
2. Find the download link for the corresponding model on the page
3. Place the downloaded `.pt` file in the model cache folder inside the software directory

### Model Storage Location

Model files are automatically saved in the software's runtime directory after download — no manual path configuration needed.


## Common Issues and Troubleshooting

### Download fails or gets stuck

**Cause:** Unstable network or inability to access OpenAI CDN.

**Solutions:**

1. Check your network connection and ensure internet access
2. If using a proxy, configure proxy settings correctly in the system
3. Try downloading again during a period with better network conditions
4. Download model files manually — see the "Manual Download" section above

### Recognition results are blank or garbled

**Cause:** Model files downloaded incompletely or are corrupted.

**Solutions:**

1. Delete the corresponding `.pt` model file from the software directory and restart the software to re-download
2. Verify the model file is complete (file size should match the official specification)

### Recognition is very slow

**Cause:** CUDA acceleration is not enabled, or the model is too large.

**Solutions:**

1. Confirm CUDA and cuDNN are installed, and enable `CUDA Acceleration` in the software
2. If you don't have an NVIDIA GPU, try a smaller model (such as `base` or `small`)
3. Verify your GPU VRAM meets the model's requirements

### Out of memory (OOM)

**Cause:** The model is too large for available RAM or VRAM.

**Solutions:**

1. Use a smaller model (e.g., `large-v3-turbo` instead of `large-v3`)
2. Close other memory-intensive programs
3. Ensure at least 16 GB RAM when using large-series models

### Wrong language detected

**Cause:** The speech language was not correctly specified.

**Solutions:**

1. Explicitly set the **speech language** in the software to match the language in the video
2. If the video contains multiple languages, try processing in segments

### Choosing between faster-whisper and openai-whisper

If you're unsure which channel to choose, here are some recommendations:

- **Prioritize speed:** Choose `faster-whisper` for faster processing
- **Prioritize accuracy:** Choose `openai-whisper` for slightly higher accuracy
- **First-time users:** Start with `faster-whisper` for a better experience
- **Large model processing:** The difference is minimal — choose based on personal preference
