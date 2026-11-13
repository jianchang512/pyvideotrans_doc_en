---
title: Always Prompts Insufficient Video Memory
date: 2024-01-22 14:33:00
description: Video memory is full. Use smaller models, such as `medium` or `small` instead of `large-v3`. The `large-v3` model requires at least 8GB of video memory, but that doesn't guarantee smooth operation on an 8GB graphics card. Other software will also consume video memory simultaneously, and larger videos will require even more video memory.
---
## Always Prompts Insufficient Video Memory (whole all Unable to allocate)

1.  **Use a Smaller Model**: Change the recognition model from `large-v3` to `medium`, `small`, or `base`. The `large-v3` model requires at least 10GB of video memory.
2.  Try disabling the **Secondary Recognition** option in the top-right corner of the main interface. This is especially important when translating multiple videos simultaneously, as the secondary recognition of an earlier video may run concurrently with the first transcription of a later video, requiring 2-3 times the video memory. This could cause an error if the available video memory is insufficient.
3.  **Adjust Advanced Settings**: Make the following changes in the menu bar **`Tools/Options` -> `Advanced Options`** to sacrifice some accuracy for lower video memory usage:
    *   `CUDA Data Type`: Change `float32` to `float16` or `int8`.
    *   `beam_size`: Change `5` to `1`.
    *   `best_of`: Change `5` to `1`.
    *   `Context`: Change `true` to `false`.