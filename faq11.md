---
title: After processing several videos, I found the hard drive is almost full
date: 2024-01-22 14:33:00
description: After selecting "Video Auto Slow", the video is cut into small segments based on subtitles, and then each segment undergoes transformations such as extension, resulting in video segments with a total size several times that of the original video. This is also one of the reasons why the "Video Auto Slow" feature is very slow.
---


## After processing several videos, I found the hard drive is almost full

After selecting "Video Auto Slow", the video is cut into small segments based on subtitles, and then each segment undergoes transformations such as extension, resulting in video segments with a total size several times that of the original video. This is also one of the reasons why the "Video Auto Slow" feature is very slow.

- After processing is complete, you can manually delete all contents in the `tmp` cache folder under the software directory, but do not delete the `tmp` folder itself.
If not manually deleted, it will also be automatically cleaned up when the software is closed.

- On Windows systems, please open the user home directory, typically `C:/users/username/`. After closing the software, delete the `pyvideotrans` folder in that directory.