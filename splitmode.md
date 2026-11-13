---
title: The Difference Between Whole Recognition and Equal Segmentation
date: 2024-01-22 14:33:00
description: The Difference Between Whole Recognition and Equal Segmentation
---

![](https://pvtr2.pyvideotrans.com/1743258212148_image.png)


## The Difference Between Whole Recognition and Equal Segmentation


**Whole Recognition:**

This method provides the best speech recognition results but is also the most resource-intensive for the computer. If the video file is large and the large-v3 model is used, it may cause the application to crash.

During recognition, the entire audio file is passed to the model. The model internally uses VAD (Voice Activity Detection) to segment, recognize, and punctuate the speech. The default silence split is 200ms, and the maximum sentence length is 3 seconds. These settings can be configured in the `Menu -> Tools/Options -> Advanced Options -> VAD` section.



**Equal Segmentation:**

As the name suggests, this method cuts the audio file into segments of fixed, equal length before passing them to the model. Notably, when using the OpenAI model, equal segmentation is enforced. This means that regardless of whether you select "Whole Recognition" or "Pre-segmentation," the system will forcibly use "Equal Segmentation" with the OpenAI model.

Each segment in equal segmentation is 10 seconds long, and the silence split interval between sentences is 500ms. These settings can be configured in the `Menu -> Tools/Options -> Advanced Options -> VAD` section.


**Note:** While the segment length is set to 10 seconds, and each subtitle will roughly correspond to a 10-second duration, the actual voiceover length for each segment is not necessarily exactly 10 seconds. This is due to the actual pronunciation duration and the removal of trailing silence from the voiceover.