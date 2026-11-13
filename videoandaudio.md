---
title: Batch Merge Video and Audio
date: 2024-01-22 14:33:00
description: If you have many videos and corresponding audio files and want to embed each audio into its matching video, doing it one by one can be tedious and inefficient. Using this feature, you can batch embed audio into videos.
---
## Batch Merge Video and Audio

If you have many videos and corresponding audio files and want to embed each audio into its matching video, doing it one by one can be tedious and inefficient. Using this feature, you can batch embed audio into videos.

![](https://pvtr2.pyvideotrans.com/images/videoandaudio1.jpg)

### How to Use

1. Create a folder and move the videos and audio files you want to merge into that folder.

2. The video and audio files to be merged must have the same name (excluding the file extension). The program uses this to determine which audio file belongs to which video.

For example, if the full name of a video is `001.mp4`, its name without the extension is `001`. The audio file you want to embed into this video must also be named `001`. If the audio is in WAV format, its full name would be `001.wav`. If it's in MP3 format, the full name would be `001.mp3`.

During processing, the software takes `001.mp4`, removes the extension to get `001`, and then searches the folder for files like `001.wav`, `001.mp3`, `001.flac`, `001.aac`, or `001.m4a`. If found, it embeds that audio into the video `001.mp4`.

3. Select this folder in the software interface.

4. Set whether to keep the original audio from the video. If selected, the processed video will contain two audio tracks: one from the original video file and one from the added audio file.