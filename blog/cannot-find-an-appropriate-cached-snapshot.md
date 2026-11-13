---
title: How to Manually Download the Faster-Whisper Model
date: 2025-10-12 15:33:00
description: If you want to manually download from huggingface.co and copy it to the software's model directory for use, continue reading this article.
---


> This article describes how to manually download models from the Hugging Face website if the **faster-whisper [local]** speech recognition channel fails to download.

**Make sure you have upgraded to version v3.91**

When using the **faster-whisper [local]** speech recognition channel, you need to download the model from the external website `https://huggingface.co` or from a domestic mirror `https://hf-mirror.com`. The former requires a VPN/proxy with a stable and reliable connection, otherwise it can easily fail. The latter mirror site itself seems to have unstable network connections, often leading to download timeouts.

![](https://pvtr2.pyvideotrans.com/1760345848384_image.png)

## Manually Download Models for the faster-whisper (Local) Channel

> Choose the model you want to use. The best model is `large-v3`. When not using CUDA acceleration, ensure at least 16GB of RAM; with CUDA acceleration, ensure at least 10GB of VRAM.

- **Download the tiny model:**
  1. Create a folder: In the `models` folder located in the same directory as `sp.exe` (or `sp.py`), create a folder named `models--Systran--faster-whisper-tiny`.
  2. Open the model download page: https://huggingface.co/Systran/faster-whisper-tiny/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files from that page and copy them into the folder you created. If files already exist, you can overwrite them directly.

- **Download the tiny.en model (English only):**
  1. Create a folder: In the `models` folder (same directory as `sp.exe`/`sp.py`), create a folder named `models--Systran--faster-whisper-tiny.en`.
  2. Open the model download page: https://huggingface.co/Systran/faster-whisper-tiny.en/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files from that page and copy them into the folder. Overwrite if needed.

- **Download the base model:**
  1. Create a folder named `models--Systran--faster-whisper-base` inside the `models` folder.
  2. Open the download page: https://huggingface.co/Systran/faster-whisper-base/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files and copy them into the folder. Overwrite if needed.

- **Download the base.en model (English only):**
  1. Create a folder named `models--Systran--faster-whisper-base.en` inside the `models` folder.
  2. Open the download page: https://huggingface.co/Systran/faster-whisper-base.en/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files and copy them into the folder. Overwrite if needed.

- **Download the small model:**
  1. Create a folder named `models--Systran--faster-whisper-small` inside the `models` folder.
  2. Open the download page: https://huggingface.co/Systran/faster-whisper-small/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files and copy them into the folder. Overwrite if needed.

- **Download the small.en model (English only):**
  1. Create a folder named `models--Systran--faster-whisper-small.en` inside the `models` folder.
  2. Open the download page: https://huggingface.co/Systran/faster-whisper-small.en/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files and copy them into the folder. Overwrite if needed.

- **Download the medium model:**
  1. Create a folder named `models--Systran--faster-whisper-medium` inside the `models` folder.
  2. Open the download page: https://huggingface.co/Systran/faster-whisper-medium/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files and copy them into the folder. Overwrite if needed.

- **Download the medium.en model (English only):**
  1. Create a folder named `models--Systran--faster-whisper-medium.en` inside the `models` folder.
  2. Open the download page: https://huggingface.co/Systran/faster-whisper-medium.en/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files and copy them into the folder. Overwrite if needed.

- **Download the large-v3-turbo model:**
  1. Create a folder named `models--mobiuslabsgmbh--faster-whisper-large-v3-turbo` inside the `models` folder.
  2. Open the download page: https://huggingface.co/mobiuslabsgmbh/faster-whisper-large-v3-turbo/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files and copy them into the folder. Overwrite if needed.

- **Download the large-v1 model:**
  1. Create a folder named `models--Systran--faster-whisper-large-v1` inside the `models` folder.
  2. Open the download page: https://huggingface.co/Systran/faster-whisper-large-v1/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files and copy them into the folder. Overwrite if needed.

- **Download the large-v2 model:**
  1. Create a folder named `models--Systran--faster-whisper-large-v2` inside the `models` folder.
  2. Open the download page: https://huggingface.co/Systran/faster-whisper-large-v2/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files and copy them into the folder. Overwrite if needed.

- **Download the large-v3 model:**
  1. Create a folder named `models--Systran--faster-whisper-large-v3` inside the `models` folder.
  2. Open the download page: https://huggingface.co/Systran/faster-whisper-large-v3/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files and copy them into the folder. Overwrite if needed.

----

**The following distilled models are only suitable for transcribing English audio/video content.**

- **Download the distil-large-v3 model:**
  1. Create a folder named `models--Systran--faster-distil-whisper-large-v3` inside the `models` folder.
  2. Open the download page: https://huggingface.co/Systran/faster-distil-whisper-large-v3/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files and copy them into the folder. Overwrite if needed.

- **Download the distil-large-v3.5 model:**
  1. Create a folder named `models--distil-whisper--distil-large-v3.5-ct2` inside the `models` folder.
  2. Open the download page: https://huggingface.co/distil-whisper/distil-large-v3.5-ct2/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files and copy them into the folder. Overwrite if needed.

- **Download the distil-small.en model:**
  1. Create a folder named `models--Systran--faster-distil-whisper-small.en` inside the `models` folder.
  2. Open the download page: https://huggingface.co/Systran/faster-distil-whisper-small.en/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files and copy them into the folder. Overwrite if needed.

- **Download the distil-medium.en model:**
  1. Create a folder named `models--Systran--faster-distil-whisper-medium.en` inside the `models` folder.
  2. Open the download page: https://huggingface.co/Systran/faster-distil-whisper-medium.en/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files and copy them into the folder. Overwrite if needed.

- **Download the distil-large-v2 model:**
  1. Create a folder named `models--Systran--faster-distil-whisper-large-v2` inside the `models` folder.
  2. Open the download page: https://huggingface.co/Systran/faster-distil-whisper-large-v2/tree/main
  3. Download all `.json`, `.bin`, and `.txt` files and copy them into the folder. Overwrite if needed.