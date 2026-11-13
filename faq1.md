---
title: Error containing "ffprobe exect error"
date: 2024-01-22 14:33:00
description: This is most likely caused by the video file name being too long or the video file path being too deep. This is especially common with videos downloaded from YouTube, where the names are often hundreds of characters long. If such a video is also stored in a deeply nested folder structure, you will almost certainly encounter the Windows path length limitation.
---
## Error containing "ffprobe exect error"


![](https://pvtr2.pyvideotrans.com/images/f9842ed0a362453c2d7e9ce39d0a0e07.jpg)

1. If you frequently encounter errors containing the phrase "ffprobe exect error" during execution, it is most likely due to the video file name being too long or the video file path being too deep. This is particularly common with videos downloaded from YouTube, where titles are often hundreds of characters long. If such a video is stored in a deeply nested folder structure, you will almost certainly hit the Windows path length limit.


![](https://pvtr2.pyvideotrans.com/images/04d23e741b37cfaf448df7d0126f7b49.jpg)

As shown in the image above, a deeply nested folder structure combined with a long video file name will almost certainly cause an error when calling `ffprobe` or `ffmpeg` to execute a command.

The solution is very simple. Just create a folder with an English name directly under a drive, rename the video to a simple name, and place it there. For example, use `D:/myvideos/1.mp4`. Then try again, and the error should be gone.


2. For non-Windows versions, check if ffmpeg is installed. If not, please install ffmpeg.
For the Windows version, check if the ffmpeg folder contains `ffprobe.exe`. If not, please download `ffmpeg.exe` and `ffprobe.exe` and place them in that directory.