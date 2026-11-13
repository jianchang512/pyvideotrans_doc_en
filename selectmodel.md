---
title: Introduction and Selection of Speech Recognition Models
date: 2024-01-22 14:33:00
description: Speech recognition converts human speech in audio/video into text. It is the first step in video translation and a key factor determining the quality of subsequent dubbing and subtitles.
---

Speech recognition converts human speech in audio/video into text. It is the first step in video translation and a key factor determining the quality of subsequent dubbing and subtitles.
Currently, the software primarily supports two models capable of local offline recognition: **faster-whisper local** and **openai-whisper local**.

![image.png](https://pvtr2.pyvideotrans.com/img/select1.webp)

Both are very similar. Essentially, **faster-whisper** is an optimized derivative of **openai-whisper**. Their recognition accuracy is basically the same, but the former is faster. Comparatively, the former also has higher environmental configuration requirements when using CUDA acceleration.

## faster-whisper Local Recognition Mode

This is the default and recommended mode for the software. It is faster and more efficient.

The model sizes in this mode, from smallest to largest, are: `tiny -> base -> small -> medium -> large-v1 -> large-v3`

![image.png](https://pvtr2.pyvideotrans.com/img/select2.webp)

From front to back, the model size gradually increases from **60MB** to **2.7G**, and the required memory, VRAM, and CPU/GPU consumption also gradually increase. If available VRAM is below 10G, it is not recommended to use **large-v3**, as it may cause crashes or freezes.

From **tiny** to **large-v3**, as the size and resource consumption increase, the corresponding recognition accuracy also improves. Models like `tiny/base/small` are tiny models; they are very fast and use few resources, but their accuracy is very low.

`medium` is a medium-sized model. For videos with Chinese pronunciation, it is recommended to use a model at least as large as `medium` or larger; otherwise, the results will be poor.

If the CPU is powerful enough and memory is ample, even without CUDA acceleration, you can choose the `large-v1/v2` model. The accuracy will be significantly improved compared to the previous small and medium models, although the recognition speed will decrease.

`large-v3` consumes significant resources and is not recommended unless your computer is very powerful. It is suggested to use `large-v3-turbo` instead. Both have the same accuracy, but `large-v3-turbo` is faster and uses fewer resources.

> Models with names ending in `.en` or starting with `distil` can only be used for videos with English pronunciation. Please do not use them for videos in other languages.

## openai-whisper Local Recognition Mode

The models in this mode are basically the same as those in **faster-whisper**, also ranging from small to large: `tiny -> base -> small -> medium -> large-v1 -> large-v3`. The usage notes are also the same. `tiny/base/small` are tiny models, and `large-v1/v2/v3` are large models.

## Summary and Selection Method

1.  It is recommended to prioritize the **faster-whisper** local mode, unless you want to use CUDA acceleration but keep encountering environment errors, in which case you can use the **openai-whisper** local mode.
2.  Regardless of the mode, for videos with Chinese pronunciation, it is recommended to use at least the **medium** model, with **small** being the absolute minimum. For English pronunciation videos, use at least **small**. Of course, if computer resources are sufficient, it is recommended to choose **large-v3-turbo**.
3.  Models ending in `.en` or starting with `distil` can only be used for videos with English pronunciation.