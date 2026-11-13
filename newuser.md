---
title: Quick Start Guide for Beginners
date: 2024-01-22 14:33:00
description: The video translation and dubbing software is feature-rich and might seem a bit complex at first. Its core function is actually to generate and embed dubbing and subtitles in another language for a video. The "Custom Configuration Translation" button on the left is used to accomplish this task.
---
## Quick Start Guide for Beginners

The video translation and dubbing software is feature-rich and might seem a bit complex at first. Its core function is actually to generate and embed dubbing and subtitles in another language for a video. The "Custom Configuration Translation" button on the left is used to accomplish this task.

## Video Translation and Dubbing Embedding

**Action Button: `Custom Configuration Translation`**
![](https://pvtr2.pyvideotrans.com/img/changjing7.webp)

Use Case: You can use this feature to generate translated dubbing and subtitles for a video. After clicking the "Custom Configuration Translation" button, select the video file to translate, choose a translation channel (e.g., Microsoft Translator), set the original language to the language in the video, and set the target language to the translated language. The dubbing channel can be left as the default Edge-TTS, then select a voice role, and set the subtitle embedding method.

After clicking "Start," when processing is complete, a video file with translated dubbing and subtitles will be generated in the results directory. Open it to play and view the effect.

In addition, the software also integrates several other practical features for user convenience.

Depending on the usage scenario, you can operate as follows:

## Generate Subtitles for Audio or Video

**Action Button: `Audio/Video to Subtitles`**

![](https://pvtr2.pyvideotrans.com/img/changjing1.webp)

Use Case: When you have an audio or video file but no corresponding subtitle file, you can use this feature. Click the "Audio/Video to Subtitles" button on the left, then select the audio/video file in the top area, specify the spoken language, and choose "faster-whisper local" and the model you wish to use.

Click the "Start" button, wait for processing to complete, then open the results directory to see the generated SRT subtitle file.

## Generate and Translate Subtitles Simultaneously

**Action Button: `Recognize and Translate Subtitles`**
![](https://pvtr2.pyvideotrans.com/img/changjing2.webp)

Use Case: This feature is similar to the previous one, but it not only generates subtitles but also translates them into another language simultaneously. For example, if you have an English video and want to generate English subtitles while also translating them into Chinese subtitles, you can use this feature. First, select the language in the audio/video as the original language, then choose the target language as Chinese.

Click "Start." After processing is complete, the results directory will contain two SRT subtitle files, one for each language.

## Generate Dubbing for Subtitles

**Action Button: `Batch Dubbing for Subtitles`**
![](https://pvtr2.pyvideotrans.com/img/changjing3.webp)

Use Case: If you already have an SRT subtitle file and want to generate dubbing based on the subtitles, click this button. Select the SRT subtitle file, set the language of the subtitles, then choose a dubbing channel and voice role. You can also adjust the speech rate, volume, and pitch as needed. After clicking the "Execute" button, when processing is complete, open the results directory to see the generated audio file.

## Embed Subtitles or Dubbing for a Single Video

**Action Button: `Audio/Video/Subtitle Merge`**
![](https://pvtr2.pyvideotrans.com/img/changjing4.webp)

Use Case: When you have a video file and a subtitle file and want to embed the subtitles into the video, you can use this feature. After clicking the "Audio/Video/Subtitle Merge" button, select the corresponding video and subtitle files. If you also want to embed audio, you can select the corresponding audio file. After processing is complete, the results directory will display the merged video with embedded subtitles or dubbing.

## Batch Merge Videos and Subtitles

**Action Button: `Video and Subtitle Merge`**
![](https://pvtr2.pyvideotrans.com/img/changjing5.webp)

Use Case: This feature is very practical when you have a large number of video and subtitle files that need to be embedded one-to-one. Compared to single processing, batch operations are more efficient. The only requirement is that the video and subtitle filenames follow a certain naming rule. For example, the subtitle file for a video named `1.mp4` should be named `1.srt`.

Place all video and subtitle files into the same folder, ensure the filenames match, and the software will automatically process and generate the merged video files.

## Batch Merge Videos and Audio

**Action Button: `Video and Audio Merge`**
![](https://pvtr2.pyvideotrans.com/img/changjing6.webp)

Use Case: If you have a large number of videos and corresponding audio files and want to merge the audio as dubbing into the videos, you can use this feature. Similar to the batch subtitle merge feature, the naming of video and audio files also needs to follow the same rule. For example, the audio file for `1.mp4` could be `1.mp3` or `1.wav`, and the filenames must be consistent.

Place these files into the same folder, and the software will automatically merge the video and audio files.