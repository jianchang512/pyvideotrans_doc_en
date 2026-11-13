---
title: The Difference Between Whole Recognition and Equal Segmentation
date: 2024-01-22 14:33:00
description: The Difference Between Whole Recognition and Equal Segmentation
---
## The Difference Between Whole Recognition and Equal Segmentation

**Whole Recognition:**

This method provides the best speech recognition results but is also the most computationally intensive. If the video file is large and the large-v3 model is used, it may cause the application to crash.

During recognition, the entire audio file is passed to the model. The model internally uses VAD (Voice Activity Detection) for segmentation, recognition, and sentence breaking. The default silence segmentation is 200ms, and the maximum sentence length is 3 seconds. These settings can be configured in the menu: Tools/Options -> Advanced Options -> VAD Settings.

**Equal Segmentation:**

As the name suggests, this method cuts the audio file into segments of equal, fixed length before passing them to the model. The OpenAI model forces the use of equal segmentation. This means when using the OpenAI model, regardless of whether you selected "Whole Recognition" or "Pre-segmentation," the system will forcibly use "Equal Segmentation."

Each segment in equal segmentation is 10 seconds long, and the silence segmentation interval between sentences is 500ms. These settings can be configured in the menu: Tools/Options -> Advanced Options -> VAD Settings.

Note: While set to 10 seconds, each subtitle will generally be around 10 seconds in duration. However, the actual audio length for each segment is not necessarily exactly 10 seconds, as the system accounts for speech duration and removes trailing silence from the end of the audio clip.