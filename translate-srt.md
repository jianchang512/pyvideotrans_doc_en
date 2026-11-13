---
title: Batch Translate SRT Subtitles
description: Guide to batch-translating SRT subtitle files
---

# Batch Translate SRT Subtitles


![](https://pvtr2.pyvideotrans.com/1782626791347_3.png)

The batch SRT translation feature lets you translate existing SRT subtitle files into a target language while preserving the original timeline and formatting.

---

## Overview

- Batch-translate multiple SRT subtitle files
- Auto-detect source language (or specify manually)
- Monolingual and bilingual output
- Translation glossary support
- Send full subtitle to AI for better context

---

## Steps

### 1. Select Translation Channel

Choose a translation engine from the **Trans Channel** dropdown.

### 2. Select Languages

- **Spoken Lang**: The language of the subtitle file (auto-detected by default)
- **Target Lang**: The language you want to translate into

### 3. Output Format

| Option | Description |
|--------|-------------|
| Monolingual subtitles | Output only the target language |
| Bilingual subtitles | Output both the original and translated text |

### 4. Other Settings

| Parameter | Description |
|-----------|-------------|
| Translation glossary | Custom terminology translations |
| Send full subtitle | Include timeline when translating with AI (recommended) |
| Network proxy | Set this if you need a proxy to access the internet |

### 5. Import Method

- **Import Source SRT**: Select one or more SRT files
- **Folder**: Select a folder containing SRT files
- **Overwrite current**: Replace the current editor content after import

### 6. Start Translation

Click **Start** to begin. Translations are saved automatically when complete.

> **Save options**: You can choose "Overwrite" (modify the original file directly) or "Save to..." (save to a new location).

---

## FAQ

### Q: Translation results are inaccurate?

- Try switching the translation channel (e.g., from Google to DeepSeek)
- Enable **Send SRT** so the AI can see the full context

### Q: Timeline is offset after translation?

- SRT translation normally preserves the original timeline
- If the timeline is off, the original SRT file may have formatting issues

---
