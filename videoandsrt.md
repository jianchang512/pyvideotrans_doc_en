---
title: Batch Merge Videos and SRT Subtitles
date: 2024-01-22 14:33:00
description: Similar to batch merging videos and audio, you can also batch embed subtitles into their corresponding videos one by one. For example, if you have 20 videos, each with a corresponding SRT subtitle file, using this feature allows you to embed all 20 SRT files into their respective 20 videos at once.
---
## Batch Merge Videos and SRT Subtitles

Similar to batch merging videos and audio, you can also batch embed subtitles into their corresponding videos one by one. For example, if you have 20 videos, each with a corresponding SRT subtitle file, using this feature allows you to embed all 20 SRT files into their respective 20 videos at once.

![](https://pvtr2.pyvideotrans.com/images/videoandsrt1.jpg)

### How to Use

1. Create a folder and move the videos and SRT subtitle files you want to merge into this folder.

2. The names of the videos and subtitles to be merged must be identical (excluding the file extension). The program uses this to determine which SRT subtitle file belongs to which video.

For example, if the full name of a video is `001.mp4`, the name without the extension is `001`. Therefore, the SRT subtitle file you want to embed into this video must be named `001.srt`.

During processing, when the software finds `001.mp4`, it will remove the extension to get `001`. It will then search the folder for a file named `001.srt`. If found, it will embed that subtitle file into the video `001.mp4`.

3. Select this folder in the software interface.

4. By default, subtitles are embedded as hard subtitles. If you select "Embed Soft Subtitles," they will be embedded as soft subtitles. When using soft subtitles, you must select the subtitle language; otherwise, they may appear garbled. Also, note that soft subtitles require support from the video player. Some domestic players may not display them or may show garbled text.