---
title: Where the Tool Supports Batch Functionality
date: 2024-01-22 14:33:00
description: There are currently 4 areas Batch Video Translation + Dubbing, Batch Subtitle-to-Speech Synthesis, Batch Subtitle File Translation, and Batch Subtitle Recognition from Audio/Video.
---
The tool supports batch functionality in the following 4 areas: Batch Video Translation + Dubbing, Batch Subtitle-to-Speech Synthesis, Batch Subtitle File Translation, and Batch Subtitle Recognition from Audio/Video.

## Batch Video Translation + Dubbing

In the software interface, click "Select Video" to choose multiple videos for processing. Then set the source language, target language, and dubbing voice. Click "Start" to process all selected videos sequentially.

![](https://pvtr2.pyvideotrans.com/images/b6177039929bb9b84b1f1f09ee3c0fa8.jpg)

## Batch Subtitle-to-Speech Synthesis

Click the "Subtitle-to-Speech Synthesis" button on the left. In the opened interface, click to select one or more SRT subtitle files.

![](https://pvtr2.pyvideotrans.com/images/d8e04f591c2ffefd8c543f44f83bca92.jpg)

The tool will automatically synthesize speech for all selected subtitles one by one. After completion, click "Open Directory" in the bottom right corner to view the saved results.

![](https://pvtr2.pyvideotrans.com/images/b56f6e74be676e83f6d1f5419f1af8b5.jpg)

## Batch Subtitle Translation

This is a new feature added in version 1.48. First, ensure you have downloaded the 1.48 upgrade patch package, then extract and overwrite the old files with it.

Select "Batch Subtitle Translation" on the left, choose one or more SRT subtitle files, configure the translation settings, and click "Start". Wait for the process to complete automatically.

Similarly, after completion, click "Open Result Save Directory" to see all the translated SRT files.

![](https://pvtr2.pyvideotrans.com/images/80d0f1fadb54357ba83d807819431aab.jpg)

## Batch Subtitle Recognition from Audio/Video

Click "Audio/Video to Text" on the left, then select one or more audio or video files. After setting the relevant parameters, click "Start" to process all selected files one by one.

![](https://pvtr2.pyvideotrans.com/images/643bc697f8773c0f6607395d917f324d.jpg)

After processing, click "Open Recognition Result Directory" at the bottom to open the location where results are saved.

![](https://pvtr2.pyvideotrans.com/images/5fe0e12c8eb76c74231463b4bb1c603c.jpg)

## Batch Video Watermark Addition with Images

Go to Menu -> Tools -> Add Watermark to Video. The interface is shown below.

![](https://pvtr2.pyvideotrans.com/images/shuiyin1.jpg)

1.  Select the video file(s) to add a watermark to. You can choose one or multiple files.
2.  Select the watermark image.
3.  Choose the watermark position: Top Left, Top Right, Bottom Right, Bottom Left, or Center of the video.
4.  Set the margin distance from the top/bottom edges and from the left/right edges. The default is 10 pixels.
5.  Set the watermark size. It is recommended to pre-process the image dimensions and set this size to the actual image size to prevent distortion. The default is 50x50 (width 50px, height 50px).
6.  Click "Start Execution". Wait for completion, then open the result save directory to view the output files.