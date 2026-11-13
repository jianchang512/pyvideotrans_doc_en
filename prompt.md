---
title: Modify AI Translation Prompts
date: 2025-06-22
description: Customize AI translation and LLM re-segmentation prompts to optimize translation results
---

# Modify AI Translation Prompts (Prompt)

pyVideoTrans lets you customize the prompts used for AI translation and LLM re-segmentation to improve translation results. This article explains how to find and modify these prompt files.

---

## I. Subtitle Translation Prompts

There are two different subtitle translation prompts. Which file is used depends on whether `SendSRT` is checked.

### Prompt Used When `SendSRT` Is Checked

> When the `SendSRT` checkbox is checked, this prompt is used automatically.

**Prompt location**: `software directory/videotrans/prompts/srt/` folder

This folder contains prompt files for multiple providers. Each file is named after the provider:

| File name | Corresponding provider |
|--------|---------|
| `chatgpt.txt` | OpenAI ChatGPT |
| `deepseek.txt` | DeepSeek |
| `gemini.txt` | Google Gemini |
| `zhipuai.txt` | Zhipu AI |
| `xiaomi.txt` | Xiaomi AI |
| `minimax.txt` | MiniMax |
| `bailian.txt` | Ali Bailian |
| `localllm.txt` | Local LLM / Compatible AI |

This translation mode sends line numbers, timestamp lines, and subtitle text to the AI model as a valid SRT subtitle string, and expects the AI to return translated subtitles in a valid SRT format.

**Editing note**: Items in curly braces such as `{lang}` and `{batch_input}` are variables. They are automatically replaced by the program. Do not modify or delete them.

### Per-Line Translation Prompt (When `SendSRT` Is Unchecked)

> When `SendSRT` is unchecked, this prompt is used.

**Prompt location**: under the `software directory/videotrans/prompts/text/` directory, for example `deepseek.txt`

This folder also contains prompt files for each provider, with the same structure as the `srt/` directory.

**Editing note**: Items in curly braces such as `{lang}` are variables. They are automatically replaced by the program. Do not modify or delete them.

---

## II. LLM Correction Prompts

For speech recognition results, you can use an AI model to correct typos and other errors.

**Prompt location**: `software directory/videotrans/prompts/resegment/llm.txt`

You can switch this in `Menu → Tools / Options → Advanced Options → General`. By default, it uses OpenAI ChatGPT and compatible AI providers.

**Use LLM for Resegmentation Instead of LLM Correction**:
Menu - Tools - Advanced Options - Speech Recognition Parameters - Use LLM for Resegmentation Instead of LLM Correction: Make sure the AI model used supports long context and long output. When checked, it will no longer only correct errors; it will re-segment the subtitles. The re-segmentation prompt is `software directory/videotrans/prompts/resegment/llm_re.txt`

---

## IV. Quick Modification Guide

| Scenario | File to modify |
|------|---------------|
| AI translation results are not ideal (full subtitle mode) | The `.txt` file for the corresponding provider under `videotrans/prompts/srt/` |
| AI translation results are not ideal (line-by-line translation mode) | The `.txt` file for the corresponding provider under `videotrans/prompts/text/` |
| LLM correction is not effective | `videotrans/prompts/resegment/llm.txt` |
| LLM re-segmentation | `videotrans/prompts/resegment/llm_re.txt` |

> **Important reminder**: Back up the original files before modifying prompts. Do not delete curly-brace variables such as `{lang}` and `{batch_input}`; the program automatically replaces them with actual values.

## Related Documents

* [Improve AI subtitle translation quality](/aitranslate) — Translation mode comparison and glossary usage
* [Better use of local LLMs as a translation provider](/llmbetter) — Local LLM configuration guide
* [Modify AI translation prompts](/prompt) — Customize translation prompts
* [Recommended settings for best video translation results](/bester) — Optimal configuration for each stage
* [Causes and solutions for "blank subtitle lines" after translation](/faq17)