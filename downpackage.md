---
title: Download pyVideoTrans Video Translation Software for Free
date: 2026-01-21 08:33:00
description: Free download of pyVideoTrans video translation software
---

# Win10/11 Pre-packaged Version Download

> [macOS/Linux Installation Guide](/deply)

::: details Small donations help sustain open-source development

If this project helps you, please consider a small donation to support ongoing development and maintenance.

- **Donate via ko-fi:** https://ko-fi.com/jianchang512


:::


### v4.19 Full Package (2.7G)

- HuggingFace: https://huggingface.co/mortimerme/repocollect/resolve/main/win-pyvideotrans-v4.19.7z?download=true

### v4.19 Patch (400MB)

> The patch cannot be used standalone — only for overlaying the existing full package. If the app crashes after patching, download the full package. If extracting the patch causes errors, download the full package.

- HuggingFace: https://huggingface.co/mortimerme/repocollect/resolve/main/win-PatchUpdate-v4.19.7z?download=true




::: details Previous versions (v4.18 / v4.03)

> If the new version has bugs, try the previous version.

**v4.18 Full Package (2.7G)**
- HuggingFace: https://huggingface.co/mortimerme/repocollect/resolve/main/win-pyvideotrans-v4.18.7z?download=true

**v4.14 Full Package (2.7G)**
- HuggingFace: https://huggingface.co/mortimerme/repocollect/resolve/main/win-pyvideotrans-v4.14.7z?download=true


**v4.03 Full Package (2.7G)**

- HuggingFace: https://huggingface.co/mortimerme/repocollect/resolve/main/win-pyvideotrans-v4.03-0626.7z?download=true

:::

---


**Extraction notes:**

- Extract the 7z archive. After extraction, locate `sp.exe` and double-click to launch. Do NOT run inside the archive.
- Do NOT extract to the desktop or system folders requiring admin permissions (e.g., `Program Files` on C drive).
- Avoid path issues: extraction path must NOT contain Chinese characters, spaces, or special symbols.
- If 7zip reports errors, try [Bandizip](https://bandisoft.com/bandizip/)

---


## v4.19 ChangeLog

- Supports using DeepSeek for speech recognition and text dubbing. 
- faster-whisper/Audio.cpp supports enabling AMD/Intel graphics card acceleration through Vulkan. 
- The translation channel `OpenAI ChatGPT` supports the responses API. If the API address ends with `/responses`, it will automatically use `responses` to send data
* fix(dubbing): save a one-subtitle .srt dubbed with Edge-TTS, and keep its start time, auto speed-up and volume by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1274
* fix(tts): dub subtitle lines that contain & or < with Azure TTS by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1276
* fix(translator): keep apostrophes, quotes and & in Google translations by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1275
* fix(tts): give Doubao 2.0 and Ali Bailian the ids 18 and 19 on dev, so the TTS list runs the chosen channel by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1278
* fix(translator): send the Reasoning Effort chosen for the VolcEngine LLM channel by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1277
* fix(tts): give Doubao 2.0 and Ali Bailian the ids 18 and 19 on main by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1280
* fix(srt): keep the Chinese lines of GBK subtitles in the Batch Subtitle Format Converter by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1279
* feat: add WorldRouter subtitle translation provider by @xueyuanhuang in https://github.com/jianchang512/pyvideotrans/pull/1281
* feat(translator): add Standard Compute translation channel by @henrikdukefoss in https://github.com/jianchang512/pyvideotrans/pull/1282
* fix(srt): read .srt and .txt subtitles saved as UTF-16 or UTF-32 with a BOM by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1283
* fix(vas): burn subtitles into a video without an audio track in Merge V/A/Srt by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1284
* fix(vas): don't pad the chosen .wav file itself in Merge V/A/Srt by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1285
* fix(srt): draw the bottom language of bilingual hard subtitles in the font chosen for it by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1286
* fix(ui): keep each line's voice after a line is deleted in Edit Subtitles & Assign Voice Roles by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1287
* fix(recogn): keep a decimal in one cue on the second pass by @GPT-AGI in https://github.com/jianchang512/pyvideotrans/pull/1288
* fix(ui): keep the countdown of the dubbing proofreading panel running when there are more than 200 dubbed lines by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1292
* feat(translator): add UberLLM translation channel by @PSA-Team-source in https://github.com/jianchang512/pyvideotrans/pull/1291
* fix(ui): cut one clip per line of an .ass file in Trim Video by Subtitles by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1293
* fix(ui): create the output folder shown in a tool window when it doesn't exist by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1294
* fix(ui): save next to each file with Save to SourceDir and Save to Original by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1295
* fix(ui): keep hand edits when using Replace in the subtitle proofreading panels by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1296
* fix(ui): read .vtt times without hours in Trim Video by Subtitles by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1297
* fix(vas): show Execution Complete in Merge V/A/Srt only once the video is saved by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1298
* fix(ui): don't change the working folder in Merge Video & Audio and Batch Add Watermarks by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1299
* fix(ui): put the watermark at the chosen position in Batch Add Watermarks by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1300
* fix(ui): show the progress of Batch Add Watermarks from 0 to 100% by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1301
* fix(ui): open the recordings folder in Real-time Speech-to-Text when output/ is missing by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1302
* fix(ui): show the settings of Translation V/A again after using STT-Translation by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1303
* fix(tts): use the saved Audio.cpp model when no model is passed by @tanishqbaweja in https://github.com/jianchang512/pyvideotrans/pull/1304
* add language zh_TW by @lwhuang in https://github.com/jianchang512/pyvideotrans/pull/1306
* feat: add end-to-end Vulkan GPU acceleration for ASR, HY-MT2 & TTS by @fangfufu in https://github.com/jianchang512/pyvideotrans/pull/1305
* feat(gpu): fall back to CUDA for non-Vulkan models by @fangfufu in https://github.com/jianchang512/pyvideotrans/pull/1309
* perf(audio): pass CPU core count to audiocpp_cli --threads by @fangfufu in https://github.com/jianchang512/pyvideotrans/pull/1308
* feat(translator): add Requesty translation channel by @Thibaultjaigu in https://github.com/jianchang512/pyvideotrans/pull/1311
* feat(translator): add TrustedRouter translation channel by @jperla in https://github.com/jianchang512/pyvideotrans/pull/1312



