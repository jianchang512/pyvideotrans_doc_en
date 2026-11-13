---
title: VITS-cnen and Piper-TTS Voice Channels
date: 2025-12-10 14:33:00
description: Built-in local voice channels that run without internet, supporting Chinese, English, and multiple other languages
---

## VITS-TTS and Piper-TTS Voice Channels

**What are they?**

Starting from v3.90, the software includes two built-in local voice channels. They run entirely on your machine — no internet, no API key needed. Ideal for users who prioritize privacy or have unstable connections.

## VITS-TTS Channel

**Features:**
- Runs locally, no internet required
- 175 Chinese voices, 109 English voices
- Does not support other languages
- Models download automatically on first use (a few hundred MB)

### How to Use

1. Select `VITS-TTS(Local)` from the **Voice Channel** dropdown on the main interface
2. Choose the target language (Chinese and English only)
3. Select a voice from the **Voice** dropdown
4. Click the dubbing button to start

> **Note**: On first use, the software will automatically download the VITS model files. Make sure you have an internet connection. Once downloaded, no internet is needed for subsequent use.

## Piper-TTS Channel

**Features:**
- Runs locally, no internet required
- Supports 20 languages
- Models download automatically on first use of each voice
- Voice models from: [Hugging Face Piper Voices](https://huggingface.co/rhasspy/piper-voices/tree/main)

### How to Use

1. Select `Piper-TTS(Local)` from the **Voice Channel** dropdown on the main interface
2. Choose the target language
3. Select a voice from the **Voice** dropdown
4. Click the dubbing button to start

> **Note**: On first use of each voice, the software downloads its model file. Model sizes vary — make sure you have enough disk space.

## Supported Languages (Piper-TTS)

Piper-TTS supports dubbing in the following languages:
- Chinese, English, Japanese, Korean
- French, German, Spanish, Italian
- Portuguese, Russian, Arabic
- And more...

## Troubleshooting

| Issue | Solution |
|-------|----------|
| First-time download is slow | Ensure a stable internet connection; try using a proxy |
| Insufficient disk space | Free up space or choose a smaller voice model |
| VITS only supports Chinese/English | Use Piper-TTS or another channel for other languages |
| Audio quality is mediocre | Local models have limited quality; use a cloud TTS service for better results |
