---
title: HuggingFace_ASR Speech Recognition Service
date: 2025-12-15 14:33:00
description: HuggingFace_ASR speech recognition service
---

## What is the HuggingFace_ASR Speech Recognition Service?

HuggingFace_ASR is a speech recognition service added in pyVideoTrans v3.91. It supports using open-source models from [HuggingFace](https://huggingface.co) for speech recognition. This service covers models for various languages — suitable for non-Chinese speech recognition (English, Japanese, Vietnamese, Thai, etc.).

---

## Prerequisites

- pyVideoTrans version ≥ v3.91
- First use of a model requires downloading from HuggingFace (internet connection required)
- Chinese users may need to use a mirror site or download manually (see below)
- GPU acceleration is recommended for significantly faster recognition (NVIDIA GPU)

---

## Auto-download

On first use, the software automatically downloads from:
- International: `https://huggingface.co`
- Chinese mirror: `https://hf-mirror.com`

> Due to network conditions, automatic download may fail for Chinese users. If it fails, see the **Manual Download** section below.

---

## Supported Models & Languages

### English

| Model | Language | Notes |
|-------|----------|-------|
| **nvidia/parakeet-ctc-1.1b** | English | NVIDIA, high accuracy |

### Japanese

| Model | Language | Notes |
|-------|----------|-------|
| **reazon-research/japanese-wav2vec2-large-rs35kh** | Japanese | wav2vec2 architecture |
| **kotoba-tech/kotoba-whisper-v2.0** | Japanese | Whisper optimized for Japanese |

### Vietnamese

| Model | Language | Notes |
|-------|----------|-------|
| **vinai/Phowhisper-large** | Vietnamese | Whisper-large-v3 fine-tuned |

### Thai

| Model | Language | Notes |
|-------|----------|-------|
| **biodatlab/whisper-th-large-v3** | Thai | Whisper-large-v3 Thai version |

---

## Manual Download

If automatic download fails, download the model files manually. All models follow the same storage rules:

1. Create the corresponding folder inside the `models` directory (same level as `sp.exe` / `sp.py`)
2. Open the model download page and download all files
3. Place the downloaded files into the created folder

> **Note**: Do not rename files after downloading. If the download directory already has files with the same name (e.g., `xxx(1)`), delete the old files first, then rename.

### nvidia/parakeet-ctc-1.1b (English)

1. Create folder: `models/models--nvidia--parakeet-ctc-1.1b`
2. URL: https://huggingface.co/nvidia/parakeet-ctc-1.1b/tree/main
3. Download all files from this page and place them in the folder

### reazon-research/japanese-wav2vec2-large-rs35kh (Japanese)

1. Create folder: `models/models--reazon-research--japanese-wav2vec2-large-rs35kh`
2. URL: https://huggingface.co/reazon-research/japanese-wav2vec2-large-rs35kh/tree/main
3. Download all files and place them in the folder

### kotoba-tech/kotoba-whisper-v2.0 (Japanese)

1. Create folder: `models/models--kotoba-tech--kotoba-whisper-v2.0`
2. URL: https://huggingface.co/kotoba-tech/kotoba-whisper-v2.0/tree/main
3. Download all files and place them in the folder

### biodatlab/whisper-th-large-v3 (Thai)

1. Create folder: `models/models--biodatlab--whisper-th-large-v3`
2. URL: https://huggingface.co/biodatlab/whisper-th-large-v3/tree/main
3. Download all files and place them in the folder

### vinai/Phowhisper-large (Vietnamese)

1. Create folder: `models/models--vinai--Phowhisper-large`
2. URL: https://huggingface.co/vinai/Phowhisper-large/tree/main
3. Download all files and place them in the folder

### openai/whisper-large-v3

1. Create folder: `models/models--openai--whisper-large-v3`
2. URL: https://huggingface.co/openai/whisper-large-v3/tree/main
3. Download all files and place them in the folder

### zai-org/GLM-ASR-Nano-2512

1. Create folder: `models/models--zai-org--GLM-ASR-Nano-2512`
2. URL: https://huggingface.co/zai-org/GLM-ASR-Nano-2512/tree/main
3. Download all files and place them in the folder

### anke01/whisper-small-uyghur

1. Create folder: `models/models--anke01--whisper-small-uyghur`
2. URL: https://huggingface.co/anke01/whisper-small-uyghur/tree/main
3. Download all files and place them in the folder

---

## Common Errors & Troubleshooting

### Auto-download failed

- **Cause**: Cannot reach HuggingFace or mirror site is unstable
- **Solution**: Use the manual download method above, or configure a proxy and retry

### Incorrect model file names

- **Cause**: Browser auto-renamed files during download (e.g., `xxx(1)`)
- **Solution**: Remove files with `(1)` suffix, place correctly named files in the model folder

### Empty recognition results or errors

- **Cause**: Incomplete model files or incorrect folder structure
- **Solution**: Check that all required files are in the model folder — re-download if necessary
