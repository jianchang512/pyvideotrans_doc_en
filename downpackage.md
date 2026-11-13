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


### v4.18 Full Package (2.7G)

- HuggingFace: https://huggingface.co/mortimerme/repocollect/resolve/main/win-pyvideotrans-v4.18.7z?download=true

### v4.18 Patch (400MB)

> The patch cannot be used standalone — only for overlaying the existing full package. If the app crashes after patching, download the full package. If extracting the patch causes errors, download the full package.

- HuggingFace: https://huggingface.co/mortimerme/repocollect/resolve/main/win-PatchUpdate-v4.18.7z?download=true




::: details Previous versions (v4.17 / v4.03)

> If the new version has bugs, try the previous version.

**v4.17 Full Package (2.7G)**
- HuggingFace: https://huggingface.co/mortimerme/repocollect/resolve/main/win-pyvideotrans-v4.17-1028.7z?download=true

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


## ChangeLog

- feat: ask before start the TTS channel may not support the target language
- fix(align): write the silent placeholder of a failed line at 48 kHz stereo
- fix(dubbing): apply the volume setting in subtitle dubbing
- fix(tts): convert Doubao 2.0 audio to 48 kHz stereo like other channels 
- fix(tts): write Doubao 2.0's mono PCM to both channels 
- fix(translator): stop a line ending in an ellipsis from joining the next
- test(tts): expect the mono wav that the Doubao 2.0 channel now saves
- fix(translator): strip multi-line `<think>` blocks before reading the translation
- fix(align): in video slow-down, end the last slot where the video ends 
- fix(dubbing): import subtitles without [speaker] tags in multi-role dubbing again
- fix(ui): take dropped files from their URLs and list their names
- fix(prepare): escape the speaker name when removing its [Name] tag 
- fix(ui): convert an imported target-language .ass file to SRT
- fix(params): stop adding deleted bundled reference audios back at every start
- fix(srt): import and dub .ass files saved as GBK or UTF-16
- fix(ui): save Multi-Speaker dubbing once, in the chosen folder
- fix(dubbing): don't overwrite a same-named file with mp3/m4a output or one-request Edge-TTS
- fix(dubbing): don't reuse cached clone dubbing from another video 
- fix(tts): save Qwen3-TTS lines re-dubbed with a preset voice
- fix(tts): apply peak normalization and the silence settings when re-dubbing with built-in channels
- fix(ui): use the channels' own params keys in the OpenRouter, DeepSeek and MiniMax windows 
- fix(recogn): list the whisper.cpp and Whisper.NET models again
- fix(onlyone): start the dubbing proofreading panel from the main window's silence and sync choices
- fix(ui): select the saved TTS model in the OpenRouter window
- fix(tts): use the Index-TTS and VoxCPM versions chosen in the settings window again
- fix(tts): apply the speech rate correctly in Piper and the GPT-SoVITS api.py request
- fix(srt): import, dub and translate .srt and .txt files saved as GBK
- fix(translator): reuse the translation cache when "Send SRT" is on
- fix should_recogn2 when is_audio_trans
- Optimize: allow add shibie.wav to target output as stt wav
- Optimize dubbing peak normalize
- STT proivder add audio.cpp





