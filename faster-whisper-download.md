---
title: Manual Download Method for faster-whisper Models
date: 2025-10-12 15:33:00
description: If you want to manually download from huggingface.co and copy the models to the software's model directory for use, please continue reading this article.
---


> This article introduces how to manually download models from the huggingface website after a failed download via the **faster-whisper[local]** speech recognition channel, as well as download links for other related models used in the software.

**Make sure you have upgraded to version v3.91**

When using the **faster-whisper[local]** speech recognition channel, you need to download models from the external website `https://huggingface.co` or the domestic mirror `https://hf-mirror.com`. The former requires a stable and reliable proxy tool, as it can easily fail otherwise. The latter mirror site itself seems to have unstable network connections, often resulting in download timeouts and failures.


![](https://pvtr2.pyvideotrans.com/1760345848384_image.png)


## Manually Download Models for the faster-whisper (Local) Channel

> Choose the model based on your needs. The best model is `large-v3`. If not using CUDA acceleration, ensure your RAM is at least 16GB. With CUDA acceleration, ensure your VRAM is greater than 10GB.

- **Download the tiny model**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-tiny`.
  2. Open the model download page: https://huggingface.co/Systran/faster-whisper-tiny/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

- **Download the tiny.en model (English only)**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-tiny.en`.
  2. Open the model download page: https://huggingface.co/Systran/faster-whisper-tiny.en/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

- **Download the base model**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-base`.
  2. Open the model download page: https://huggingface.co/Systran/faster-whisper-base/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

- **Download the base.en model (English only)**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-base.en`.
  2. Open the model download page: https://huggingface.co/Systran/faster-whisper-base.en/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

- **Download the small model**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-small`.
  2. Open the model download page: https://huggingface.co/Systran/faster-whisper-small/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

- **Download the small.en model (English only)**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-small.en`.
  2. Open the model download page: https://huggingface.co/Systran/faster-whisper-small.en/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

- **Download the medium model**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-medium`.
  2. Open the model download page: https://huggingface.co/Systran/faster-whisper-medium/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

- **Download the medium.en model (English only)**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-medium.en`.
  2. Open the model download page: https://huggingface.co/Systran/faster-whisper-medium.en/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

- **Download the large-v3-turbo model**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--mobiuslabsgmbh--faster-whisper-large-v3-turbo`.
  2. Open the model download page: https://huggingface.co/mobiuslabsgmbh/faster-whisper-large-v3-turbo/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

- **Download the large-v1 model**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-large-v1`.
  2. Open the model download page: https://huggingface.co/Systran/faster-whisper-large-v1/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

- **Download the large-v2 model**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-large-v2`.
  2. Open the model download page: https://huggingface.co/Systran/faster-whisper-large-v2/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

- **Download the large-v3 model**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-large-v3`.
  2. Open the model download page: https://huggingface.co/Systran/faster-whisper-large-v3/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

---

**The following distilled models are only suitable for transcribing English speech in audio/video.**

- **Download the distil-large-v3 model**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-distil-whisper-large-v3`.
  2. Open the model download page: https://huggingface.co/Systran/faster-distil-whisper-large-v3/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

- **Download the distil-large-v3.5 model**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--distil-whisper--distil-large-v3.5-ct2`.
  2. Open the model download page: https://huggingface.co/distil-whisper/distil-large-v3.5-ct2/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

- **Download the distil-small.en model**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-distil-whisper-small.en`.
  2. Open the model download page: https://huggingface.co/Systran/faster-distil-whisper-small.en/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

- **Download the distil-medium.en model**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-distil-whisper-medium.en`.
  2. Open the model download page: https://huggingface.co/Systran/faster-distil-whisper-medium.en/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

- **Download the distil-large-v2 model**:
  1. Create a folder: Inside the `models` folder located in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-distil-whisper-large-v2`.
  2. Open the model download page: https://huggingface.co/Systran/faster-distil-whisper-large-v2/tree/main
  3. Download all .json, .bin, and .txt files from that page and copy them into the folder you just created. You can overwrite existing files if prompted.

## Domestic Mirror Link for faster-whisper Models

https://modelscope.cn/models/himyworld/fasterwhisper/files

## Noise Reduction Model, Voice/Background Separation Model, m2m100 Model, Real-time Speech Recognition Model, VITS Model, Built-in Speaker Diarization Model

https://modelscope.cn/models/himyworld/videotrans/files