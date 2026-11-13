---
title: Error messages appear, containing the word `ffmpeg`
date: 2024-01-22 14:33:00
description: The video file name or path contains `spaces, special characters (e.g., []{}*?$^@%+=&, etc.), or Arabic and other scripts`, causing the ffmpeg execution to fail.
---
## Error messages appear, containing the word `ffmpeg`

**Possible reasons are as follows**

- The video file name or path contains `spaces, special characters (e.g., []{}*?$^@%+=&, etc.), or Arabic and other scripts`, causing the ffmpeg execution to fail.

Please rename the video to a new name composed of simple `English letters and numbers`, and move the video to a directory whose path consists of simple characters like `English letters, numbers, and underscores`. This applies to the parent and grandparent directories as well.

For example:

`C:/Program file/videos` - This directory is not acceptable because it contains a space.

`D:/videos[001]` - This directory is also not acceptable because it contains special characters `[]`.

`E:/中文  ceshi 개하였다` - This contains Chinese and Korean characters along with spaces and will cause an error.

`E:/myvideos001` - This is acceptable, as it has no spaces or special characters.

- The original video might not contain an audio track. This is especially common with videos downloaded from YouTube, where the silent video and audio are downloaded separately by default. They need to be merged afterward. If not merged, the video will have no sound. Please play the video to confirm.
- The video file might be corrupted and unplayable.
- The folder containing the video or the `output/save folder` might not have write permissions. Please move it to a location with write permissions, or on Windows, right-click and select `Run as administrator`.