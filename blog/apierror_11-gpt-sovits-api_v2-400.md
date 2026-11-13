---
title: What does the error "APIError_11 is not defined" mean? Why does the GPT-SoVITS api_v2 interface always show a 400 client error?
date: 2025-08-09 01:33:00
description: What causes the error "APIError_11 is not defined"? Why does the GPT-SoVITS api_v2 interface always prompt a 400 client error?
---


# What does the error "APIError_11 is not defined" mean?


![](https://pvtr2.pyvideotrans.com/1754671103614_image.png)


This is a typo. Please re-download the 3.77-0809 patch package and overwrite the files. Even if you already have version 3.77 and have already overwritten it, when you see this section, please re-download and overwrite again to resolve the issue.

Download/Update Address: https://pyvideotrans.com/downpackage



# Why does the GPT-SoVITS api_v2 interface always show a 400 error?

![](https://pvtr2.pyvideotrans.com/1754671380575_image.png)

1.  First, ensure your software version is v3.77. If not, please upgrade. If it is already v3.77, please download the 3.77-0809 patch package and overwrite the files.
2.  Check if the reference audio you filled in under Menu -> TTS Settings -> GPT-SoVITS is correct.
    The audio must be in WAV format, and its duration must be between 3 and 10 seconds. Otherwise, a 400 error will occur.
    Place the audio file in the root directory of the GPT-SoVITS project. Fill in the name with the `.wav` extension. The example format is as follows:
    **123.wav#Hello my friend#zh**


![](https://pvtr2.pyvideotrans.com/1754671417989_image.png)

**Example Explanation:**
`123.wav` is the WAV format audio file, placed in the GPT-SoVITS root directory, with a duration between 3-10 seconds. The text in the middle is the corresponding text for that audio, and `zh` represents the language code for that text.

![](https://pvtr2.pyvideotrans.com/1754671350337_image.png)