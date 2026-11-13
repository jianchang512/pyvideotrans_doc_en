---
title: Why Does Repeated Processing of the Same Video Yield the Same Recognition Results?
date: 2024-01-22 14:33:00
description: Why Does Repeated Processing of the Same Video Yield the Same Recognition Results?
---
## Why Does Repeated Processing of the Same Video Yield the Same Recognition Results?

By default, if a video already has completed subtitle files (either recognized or translated), the system will not perform recognition or translation again. This is to save time and computational resources. If you want to process the video again, please open the "Target Folder" (i.e., the folder you selected for "Save to..." or, if not manually chosen, the `_video_out` folder in the same directory as the original video), delete all its contents, and then run the process again.

![](https://pvtr2.pyvideotrans.com/images/19c2a85129075a8b20ba5f112729ed59.jpg)

Alternatively, you can simply rename the original video. The system will then not reuse the previous results.