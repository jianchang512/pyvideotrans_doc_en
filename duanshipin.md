---
title: Short Video Optimization Guide
description: Dedicated optimization settings for short-form videos
---

# Short Video Optimization Guide

Short-form videos (such as TikTok, Kuaishou, YouTube Shorts, Instagram Reels) have different translation requirements compared to long-form content. Subtitles on short videos must be concise and punchy to fit compact vertical screens. Below is the recommended optimization guide for short videos.

---

## Core Principles

The key to short video subtitling is **brevity**:
- Fewer characters per subtitle line
- Shorter subtitle display duration
- Appropriately smaller font size

---

## Optimization Steps

### 1. Select the Best STT Engine & Settings

We recommend using `faster-whisper(Built-in) + large-v3` model and enabling **SecondarySTT**.

Adjust parameters in `Advanced Options -> ASR Settings`:
- **Recognition(2): max duration(s)**: Set to `1.0-2.0` (shorter durations help create shorter subtitle segments).
- **Recognition(2): min duration(ms)**: Set to `500-1000` (helps keep subtitle segments concise).


### 2. Control Subtitle Character Length

In `Advanced Options -> Alignment`:
- **Number of Characters per line for CJK**: Set to `10-15` characters.
- **Number of Characters per line for Other**: Set to `20-40` characters.

This prevents long subtitles from running off the screen.

### 3. Reduce Font Size

If subtitles still appear too long on screen, navigate to `More... -> Subtitle style -> Font Size` and reduce the font size by 1–2 points.

### 4. Remove Punctuation

Under `More... -> Default Punct`, select `Remove Punct`. This delivers a cleaner, more modern look for short-form video captions.

### 5. Translation Engine

Select DeepSeek or another AI engine paired with a flagship online LLM model.

### 6. Voice Dubbing Engine

Select a TTS engine based on your needs. If using the `clone` voice role:
- Ensure the following in `Advanced Options -> ASR Settings`:
  - **VAD:Max speech duration(s)**: Set to `3-6`
  - **VAD: min speech duration(ms)**: Set to `1000-3000`

---

## Before vs. After Comparison

| Before Optimization | After Optimization |
|---------------------|--------------------|
| Subtitles too long, overflow screen edges | Short and compact, fits vertical screens perfectly |
| Font too large, obscures video content | Clean font size, unobtrusive |
| Punctuation clutters reading flow | Punctuation removed, clean and legible |
| Long subtitle duration | Fast-paced, dynamic rhythm matching short video style |

---

## Related Documentation

* [Improving AI Subtitle Translation Quality](/aitranslate) — Translation modes comparison & glossary usage
* [Optimizing Local LLMs as Translation Engines](/llmbetter) — Local LLM configuration guide
* [Customizing AI Translation Prompts](/prompt) — Custom prompt guide
* [Recommended Configurations for Best Quality](/bester) — Optimal settings for every stage
* [Troubleshooting Blank Subtitle Lines](/faq17)