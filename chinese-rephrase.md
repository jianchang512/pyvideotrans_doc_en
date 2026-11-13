---
title: Chinese Resegmentation Feature Usage
date: 2024-01-22 14:33:00
description: Chinese Resegmentation Feature Usage
---
## Chinese Resegmentation Feature Usage

Whisper is currently the mainstream speech recognition model, but it still has significant shortcomings in Chinese recognition. Compared to English speech recognition, Whisper's performance in Chinese recognition shows a considerable gap. It not only frequently outputs traditional Chinese characters but also lacks punctuation, resulting in poorly segmented subtitles. Even when resegmenting using the returned character-level timestamps, the results remain unsatisfactory if the audio/video lacks clear silent intervals for segmentation.

In contrast, Alibaba's FunASR series models perform excellently in Chinese recognition. However, their supported language range is limited, being applicable only to Chinese and unable to handle other languages.

Therefore, in version 2.92, Alibaba's Chinese punctuation restoration model has been introduced. This model can restore punctuation marks in Chinese recognition results and resegment sentences based on punctuation and silent intervals. Due to the addition of this punctuation restoration model, the software size has increased by approximately 400MB.

## Enabling Chinese Resegmentation

**The Alibaba Chinese punctuation model will automatically be used to resegment the results when the following conditions are met:**

1.  The "**Chinese Resegmentation**" option is checked on the main interface or the Audio/Video to Subtitle interface;
2.  The spoken language of the audio/video is **Chinese**;
3.  The speech recognition engine selected is "faster-whisper", "openai-whisper", or "deepgram.com";
4.  The segmentation mode selected is **Full Recognition**.

![](https://pvtr2.pyvideotrans.com/img/v2.92.1.jpg)
![](https://pvtr2.pyvideotrans.com/img/v2.92.2.jpg)

Once the above conditions are met, the system will first restore punctuation marks after speech recognition is complete, and then resegment sentences based on the punctuation and silent intervals to improve the accuracy and readability of the subtitles.