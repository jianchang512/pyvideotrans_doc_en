---
title: F5-TTS Dubbing Service
date: 2024-01-22 14:33:00
description: F5-TTS is an open-source TTS service from Shanghai Jiao Tong University. It supports Chinese-English speech synthesis and voice cloning by default.
---

# TTS Service: F5-TTS

> F5-TTS is an open-source TTS service from Shanghai Jiao Tong University, supporting Chinese-English speech synthesis and voice cloning by default.

Starting from v4.04, F5-TTS is built into the software — no additional deployment needed.

In addition to the default Chinese and English, it also supports Japanese, French, German, Russian, Italian, Spanish, Hindi, and Arabic models. These community-maintained models (not official F5-TTS) can be found in the [F5-TTS shared model list](https://github.com/SWivid/F5-TTS/blob/main/src/f5_tts/infer/SHARED.md).

## Model Download URLs

> On first use, models are auto-downloaded — this may take a while and may fail. If it fails, download the `.pt`, `.safetensors`, and `.txt` files from the URLs below and place them in the corresponding model folder (create it if it doesn't exist).

- Official Chinese-English model (1.35G): https://huggingface.co/SWivid/F5-TTS/tree/main/F5TTS_v1_Base
> Model folder: `app_dir/models/models--SWivid--F5-TTS/F5TTS_v1_Base`

- Japanese model (5.6G): https://huggingface.co/Jmica/F5TTS/tree/main/JA_21999120
> Model folder: `app_dir/models/models--Jmica--F5TTS/JA_21999120`

- French model (5.4G): https://huggingface.co/RASPIAUDIO/F5-French-MixedSpeakers-reduced/tree/main
> Model folder: `app_dir/models/models--RASPIAUDIO--F5-French-MixedSpeakers-reduced`

- German model (1.35G): https://huggingface.co/hvoss-techfak/F5-TTS-German/tree/main
> Model folder: `app_dir/models/models--hvoss-techfak--F5-TTS-German`

- Russian model (3.4G): https://huggingface.co/hotstone228/F5-TTS-Russian/tree/main
> Model folder: `app_dir/models/models--hotstone228--F5-TTS-Russian`

- Italian model (1.35G): https://huggingface.co/alien79/F5-TTS-italian/tree/main
> Model folder: `app_dir/models/models--alien79--F5-TTS-italian`

- Spanish model (5.4G): https://huggingface.co/jpgallegoar/F5-Spanish/tree/main
> Model folder: `app_dir/models/models--jpgallegoar--F5-Spanish`

- Hindi model (2.5G): https://huggingface.co/SPRINGLab/F5-Hindi-24KHz/tree/main
> Model folder: `app_dir/models/models--SPRINGLab/F5-Hindi-24KHz`

- Arabic model (2.6G): https://huggingface.co/silma-ai/silma-tts/tree/main
> Model folder: `app_dir/models/models--silma-ai--silma-tts`

## Configuring Reference Audio

> Reference audio is configured uniformly via Menu → TTS Settings → Set Reference Audio.

### Steps

1. Open the "Reference Audio" settings interface.
2. In the "Reference Audio" text box, enter content in the following format:
   ```
   audio_filename.wav#text spoken in the audio file
   ```
3. Place the reference audio file in the `f5-tts` folder under the pyVideoTrans root directory (create it if it doesn't exist).

### Example

If you have an audio file `nverguo.wav` containing the speech "女儿国王说话", enter:

```
nverguo.wav#女儿国王说话
```

![Place reference audio in pyVideoTrans's f5-tts folder](https://pvtr2.pyvideotrans.com/1742227715529_image.png)

![Reference audio and its text content](https://pvtr2.pyvideotrans.com/1742230242932_image.png)

### Reference Audio Requirements

| Item | Requirement |
|------|-------------|
| Format | WAV (recommended), MP3 also acceptable |
| Duration | 3~10 seconds |
| Content | Clear pronunciation, no background noise |
| Text | Must match the audio content |

---
