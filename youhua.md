---
title: Optimizing Segmentation
description: Adjusting subtitle duration and segmentation during speech recognition
---

# Optimizing Segmentation

The segmentation quality of speech-recognized subtitles directly impacts the final translation quality. This guide explains how to tune parameters for the best segmentation results.

---

## 1. Model Selection

Different languages have different optimal models:

| Language | Recommended Model | Notes |
|----------|------------------|-------|
| English | faster-whisper `large-v3` | Best English recognition |
| Chinese | Qwen-ASR / FunASR | Excellent Chinese recognition |
| Japanese | openai-whisper `large-v3` | Good Japanese recognition |
| Other languages | openai-whisper `large-v3` | General-purpose model supporting dozens of languages |

---

## 2. Parameter Tuning

### Speech Duration Parameters

| Parameter | Location | Default | Description |
|-----------|----------|---------|-------------|
| Max speech duration (sec) | ASR Settings | 6 | Force-split when exceeded |
| Min speech duration (ms) | ASR Settings | 3000 | Merge into adjacent subtitle if below this |
| Silence split duration (ms) | ASR Settings | 140 | Only split at silence gaps longer than this |

**Tuning tips**:
- Need shorter subtitles: decrease **Max speech duration** (e.g., 3–4 sec)
- Need longer subtitles: increase **Max speech duration** (e.g., 8–10 sec)
- Merge more short subtitles: increase **Min speech duration (ms)** (e.g., 4000)

### VAD Parameters

| Parameter | Location | Description |
|-----------|----------|-------------|
| VAD selection | ASR Settings | `silero` (default) or `tenvad` |
| Speech threshold | ASR Settings | Lower = more sensitive, may pick up noise as speech |

### Other Parameters

| Parameter | Location | Description |
|-----------|----------|-------------|
| Pre-segment audio with Whisper | ASR Settings | Recommended when using clone voices |
| Merge short subtitles | ASR Settings | Enabled by default, merges very short subtitles |
| STT again | Main UI | Re-recognize after dubbing to generate a more accurate timeline |

---

## 3. Denoise and Vocal/BGM Separation

If your video has background music or noise:

1. Click **More Settings...**
2. Enable **Split Vocal/BGM**
3. Optionally enable **Re-embed BGM** to re-add the separated background audio

> 💡 Separating vocals significantly improves recognition accuracy, especially for videos with loud background music.

---

## 4. Single Video Interactive Mode

In single-video mode, you can pause at each stage and manually edit:

1. After speech recognition → subtitle edit window appears
2. After translation → translated subtitle edit window appears
3. After dubbing → dubbing result edit window appears

Each window has a countdown (default 30 seconds). After timeout it auto-saves and continues. Click **Stop Countdown** to pause.

---

## 5. LLM Resegment

If the recognized subtitle segmentation is not ideal, use LLM Resegment:

1. Enable **LLM Resegment** on the main interface
2. Configure the LLM channel in **More Settings...** (supports OpenAI-ChatGPT or DeepSeek)
3. Set **LLM Resegment batch size** (default 20 lines)

> ⚠️ Do not use LLM Resegment with clone voices — it disrupts the timeline.

---

## Related Docs

* [Improving AI Translation Quality](/aitranslate) — Translation mode comparison and glossary usage
* [Using Local LLMs as Translation Channel](/llmbetter) — Local LLM configuration guide
* [Customizing AI Translation Prompts](/prompt) — Custom translation prompts
* [Best Settings for Video Translation](/bester) — Optimal configuration for each stage
* [Blank Subtitle Lines: Causes and Fixes](/faq17)
