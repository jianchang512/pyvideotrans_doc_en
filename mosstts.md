---
title: MossTTS Integration Guide
date: 2024-01-22 14:33:00
description: How to integrate MossTTS
---

Starting from pyVideoTrans v3.99-0421, MossTTS-Nano-100M is now supported for voice dubbing.

## Deploying MossTTS from Source

1. Go to the [MOSS-TTS-Nano-100M official repository](https://github.com/OpenMOSS/MOSS-TTS-Nano/blob/main/README_zh.md) and follow the instructions for deployment. Then run `python app.py` to start the API.
2. Open the `pyVideoTrans` software, go to `Menu - TTS Settings - MossTTS-API URL`, and fill in the interface address. The default is `http://127.0.0.1:18083`. Then, in the character list below, fill in the reference audio files and their corresponding texts.

> A reference audio refers to a WAV file you want to use for voice cloning. The ideal duration is 3–10 seconds, with clear pronunciation.
>
> For example, if you have an audio file `nverguo.wav` containing a clean voice of the daughter of the emperor speaking, place it in the `f5-tts` folder under the `pyVideoTrans` software, and then fill in the corresponding text of the speech in the character text field.
>
> `nverguo.wav#Enter the spoken text here`

3. Click "Test". If it shows "OK", save the settings and start using it.