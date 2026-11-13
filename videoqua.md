---
title: Video Quality Preservation
date: 2025-06-22
description: Understand causes of quality loss during video processing and conditions for lossless output
---

# Video Quality Preservation

During video translation, the software must re-encode the video, which can cause quality loss. This guide explains why quality loss occurs and how to preserve the original quality as much as possible.

---

## 1. Why Does Quality Loss Occur?

The fundamental cause of video quality loss is **re-encoding**. The following scenarios trigger re-encoding:

| Scenario | Reason |
|----------|--------|
| Original video is not H.264 MP4 | Codec format conversion is needed |
| "Slow Video" is enabled | Speed change requires re-encoding |
| Hard subtitles are embedded | Subtitles must be burned into the video frames |
| Audio duration exceeds video | The video tail must be frozen to extend its length |

> **Core principle**: Video encoding works like file compression. Each "decompress > modify > recompress" cycle loses some detail. H.264 (libx264) is the most widely compatible codec today, and the loss from repeated encoding is relatively controlled.

---

## 2. Conditions for Lossless Output

Lossless output is possible when **all** of the following conditions are met:

1. ✅ Original video is encoded as `H.264 (libx264)` in MP4 format
2. ✅ "Slow Video" is not enabled
3. ✅ Hard subtitles are not embedded (choose not to embed, or use soft subtitles)
4. ✅ In More Settings..., the 264/265 encoder is set to `264`
5. ✅ Dubbing duration does not exceed the original video duration (otherwise the tail will be truncated)

> ⚠️ Even with all conditions met, if dubbing duration exceeds the video duration, the excess will still be truncated. In that case, enable "Auto Speedup" or increase the speaking rate to avoid truncation.

---

## 3. Quality Settings

If lossless conditions cannot be met, use these settings to minimize quality loss:

### More Settings... > Video Output Control

| Parameter | Description | Default | Recommendation |
|-----------|-------------|---------|----------------|
| Video Output Quality (CRF) | Lower values = higher quality, larger files | 23 | Set to 18-20 for quality priority |
| Output Video Preset | Balance between encoding speed and quality | medium | Choose slow for quality priority |
| 264/265 Encoder | 264 has broad compatibility; 265 has better compression | 264 | Generally keep 264 |
| Output Video Format | mp4 or mkv | mp4 | Choose as needed |
| Frame Rate Mode | vfr for better quality; cfr for better compatibility | vfr | Choose as needed |

---

## 4. FAQ

### Q: The output video file is extremely large. What should I do?

1. Check if "Slow Video" is enabled — this is the most common cause of large files
2. Adjust the CRF value: increase "Video Output Quality" in More Settings... (e.g., 25-30). Files will be smaller but quality will also decrease
3. Switch encoders: change 264 to 265 for smaller files at the same quality level

### Q: Is fully lossless output possible?

In theory, yes, but with limitations. When the video is H.264 MP4 and no speed changes or hard subtitles are applied, the software preserves the original encoding. However, if dubbing duration exceeds the video duration, the tail will still be truncated, making re-encoding unavoidable.

### Q: How do I choose a CRF value?

| CRF Value | Quality | File Size | Use Case |
|-----------|---------|-----------|----------|
| 0 | Lossless | Very large | Testing only |
| 18-20 | Recommended | Moderate | High quality needs |
| 23 | Default | Moderate | General use |
| 28-30 | Lower | Smaller | Quick preview |

---

## 5. Summary

| Goal | Settings |
|------|----------|
| Highest quality | CRF=18, preset=slow, 264 encoding, no speed change, no hard subtitles |
| Balanced quality and speed | CRF=23, preset=medium, 264 encoding (default) |
| Smallest file | CRF=30, preset=ultrafast, 265 encoding |
| Lossless output | H.264 MP4 + no speed change + no hard subtitles + 264 encoding |

## Related Documents

* [Improving AI Translation Subtitle Quality](/aitranslate) — Translation mode comparison and glossary usage
* [Using Local LLMs as a Translation Channel](/llmbetter) — Local LLM configuration guide
* [Customizing AI Translation Prompts](/prompt) — Custom translation prompts
* [Recommended Settings for Best Video Translation](/bester) — Optimal configuration for each stage
* [Why "Blank Subtitle Lines" Appear After Translation](/faq17)
