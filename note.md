---
title: Speech Recognition Model Classification and Explanation
date: 2024-01-22 14:33:00
description: There are 14 speech recognition models in total, which can be divided into 3 categories. All are used to transcribe human speech in videos into subtitle text.
---

There are 14 speech recognition models in total, which can be divided into 3 categories. All are used to transcribe human speech in videos into subtitle text.

To reduce the download size, the software only includes the smallest **tiny** model by default. This model has the lowest recognition accuracy. For better results, please download other, larger models.

### Models Usable in Both OpenAI and Faster Modes

- **tiny, tiny.en**: The smallest model, fastest speed, consumes the least resources, but has the lowest accuracy.
- **base, base.en**: Slightly larger than tiny.
- **small, small.en**: Slightly larger than base.
- **medium, medium.en**: Medium-sized model. For Chinese recognition, you must choose at least the **medium** model or larger.
- **large-v1, large-v2, large-v3**: The largest models with the highest accuracy. Require 8GB or 12GB+ of available VRAM.

> Models ending with **.en** can only be used for audio/video with English pronunciation.

### Models Usable Only in Faster Mode

- **distil-whisper-small.en**: For English videos only.
- **distil-whisper-medium.en**: For English videos only.
- **distil-whisper-large-v2**: Requires 8GB+ VRAM. Currently performs well for English videos; performance is very poor for other languages.

### First Category: Models with the .en Suffix

For example, `tiny.en`, `base.en`, `medium.en`, etc. As the name suggests, these models are only used for processing videos where the original language is English. In other words, if the speech in the video you are processing is in English, choosing a model with the `.en` suffix will yield better results than the equivalent model without `.en`.

### Second Category: Models without the .en Suffix

Can be used for all supported languages, such as `tiny`, `large-v1`, etc.

### Third Category: Models Starting with 'distil'

Currently, there are only three models in this category, and they can only process videos where the original language is English. Even without the `.en` suffix, it is recommended to use them only for videos with English pronunciation; their performance for videos in other languages will be very poor.

The characteristic of these models is faster speed. Note that distil models can only be used in **faster** mode and cannot be used in **openai** mode.

- distil-whisper-small.en
- distil-whisper-medium.en
- distil-whisper-large-v2

### Faster Model Download

All models are downloaded from this address: `https://github.com/jianchang512/stt/releases/tag/0.0`

After opening, choose based on the mode you want to use. It is recommended to choose the **faster** models for faster speed.

After downloading the faster model, the compressed package contains a folder. Copy the folder inside to the **models** folder in the software directory.

For example, after downloading the medium model, opening the compressed package will reveal a folder. Copy this folder to the **models** directory.

### OpenAI Model Download

The same address: `https://github.com/jianchang512/stt/releases/tag/0.0`

Scroll down. After downloading, you will get a file with a `.pt` suffix. Copy this file directly to the **models** directory.