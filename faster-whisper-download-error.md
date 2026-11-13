---
title: Manual Download Method for faster-whisper Model
date: 2025-10-12 15:33:00
description: If you want to manually download from huggingface.co and copy it to the software's model directory for use, then continue reading this article
---


> This article introduces the method of manually downloading models from the huggingface website after a download failure in the **faster-whisper[Local]** speech recognition channel, as well as download addresses for other related models used in the software.

**Make sure you have upgraded to version v3.91**

When using the **faster-whisper[Local]** speech recognition channel, you need to download the model from the overseas website `https://huggingface.co` or from the domestic mirror `https://hf-mirror.com`. The former requires a stable and reliable proxy tool, otherwise it is prone to failure. The latter mirror site itself seems to have unstable network, often leading to download timeouts and failures.


![](https://pvtr2.pyvideotrans.com/1760345848384_image.png)


## Manually Download Models for the faster-whisper (Local) Channel

> Choose the model according to your needs. The best model is `large-v3`. Without CUDA acceleration, ensure RAM is at least 16GB. With CUDA acceleration, ensure VRAM is over 10GB.

- **Download the tiny model**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-tiny`.
  2. Open the model download address: https://huggingface.co/Systran/faster-whisper-tiny/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

- **Download the tiny.en model (English speech recognition only)**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-tiny.en`.
  2. Open the model download address: https://huggingface.co/Systran/faster-whisper-tiny.en/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

- **Download the base model**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-base`.
  2. Open the model download address: https://huggingface.co/Systran/faster-whisper-base/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

- **Download the base.en model (English speech recognition only)**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-base.en`.
  2. Open the model download address: https://huggingface.co/Systran/faster-whisper-base.en/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

- **Download the small model**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-small`.
  2. Open the model download address: https://huggingface.co/Systran/faster-whisper-small/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

- **Download the small.en model (English speech recognition only)**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-small.en`.
  2. Open the model download address: https://huggingface.co/Systran/faster-whisper-small.en/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

- **Download the medium model**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-medium`.
  2. Open the model download address: https://huggingface.co/Systran/faster-whisper-medium/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

- **Download the medium.en model (English speech recognition only)**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-medium.en`.
  2. Open the model download address: https://huggingface.co/Systran/faster-whisper-medium.en/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

- **Download the large-v3-turbo model**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--mobiuslabsgmbh--faster-whisper-large-v3-turbo`.
  2. Open the model download address: https://huggingface.co/mobiuslabsgmbh/faster-whisper-large-v3-turbo/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

- **Download the large-v1 model**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-large-v1`.
  2. Open the model download address: https://huggingface.co/Systran/faster-whisper-large-v1/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

- **Download the large-v2 model**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-large-v2`.
  2. Open the model download address: https://huggingface.co/Systran/faster-whisper-large-v2/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

- **Download the large-v3 model**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-whisper-large-v3`.
  2. Open the model download address: https://huggingface.co/Systran/faster-whisper-large-v3/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

----

**The following distilled models can only be used for recognizing and transcribing English speech in audio/video.**


- **Download the distil-large-v3 model**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-distil-whisper-large-v3`.
  2. Open the model download address: https://huggingface.co/Systran/faster-distil-whisper-large-v3/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

- **Download the distil-large-v3.5 model**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--distil-whisper--distil-large-v3.5-ct2`.
  2. Open the model download address: https://huggingface.co/distil-whisper/distil-large-v3.5-ct2/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

- **Download the distil-small.en model**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-distil-whisper-small.en`.
  2. Open the model download address: https://huggingface.co/Systran/faster-distil-whisper-small.en/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

- **Download the distil-medium.en model**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-distil-whisper-medium.en`.
  2. Open the model download address: https://huggingface.co/Systran/faster-distil-whisper-medium.en/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

- **Download the distil-large-v2 model**:
  1. Create a folder: Inside the `models` folder in the same directory as `sp.exe(sp.py)`, create a folder named `models--Systran--faster-distil-whisper-large-v2`.
  2. Open the model download address: https://huggingface.co/Systran/faster-distil-whisper-large-v2/tree/main
  3. Download all .json/.bin/.txt files from that page and copy them to the folder you just created. Overwrite if files already exist.

## Domestic Mirror Address for faster-whisper Models

https://modelscope.cn/models/himyworld/fasterwhisper/files

## Noise Reduction Model, Voice/Sound Separation Model, m2m100 Model, Real-time Speech Recognition Model, VITS Model, Built-in Speaker Diarization Model

https://modelscope.cn/models/himyworld/videotrans/files