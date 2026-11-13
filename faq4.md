---
title: Missing ffmpeg
date: 2024-01-22 14:33:00
description: For Windows systems, the pre-packaged version already includes ffmpeg, no action is needed. The source code contains an ffmpeg.7z file; extract it and place it in the software's root directory.
---
## Missing ffmpeg

For Windows systems, the pre-packaged version already includes ffmpeg, so no action is required. The source code contains an `ffmpeg.7z` file; extract it and place it in the software's root directory.

For Linux systems, on Debian-based distributions, you can install it using `apt-get install ffmpeg`, or on Fedora-based distributions, use `yum install ffmpeg`.

For macOS, install it using `brew install ffmpeg`.

## Installing ffmpeg

Why install it? If an AI project involves audio or video, it almost certainly requires ffmpeg, so installation is recommended.

**Download ffmpeg and Set Environment Variables**

Download link for the Windows version of ffmpeg:

https://www.gyan.dev/ffmpeg/builds/packages/ffmpeg-6.1.1-full_build.7z

> Download other versions here: https://www.gyan.dev/ffmpeg/builds/

After downloading, extract the archive and navigate to the `bin` directory. You will see three `.exe` files. Copy them to a directory with an English path, for example, I copied them to the folder `E:\sdk\ffmpeg`. Then, add this path to the `Path` environment variable.

**How to Add to the Path Environment Variable**: Press the `Win` key + `Pause` key (top right). In the window that opens, click sequentially: **Advanced system settings** -> **Environment Variables** -> **System variables** -> find the `Path` line and double-click it.

Then, click **New** -> **Browse**, and navigate to the directory containing those three `.exe` files.

In the browse dialog, find the directory containing the previously mentioned `ffmpeg.exe` file, then click **OK**.

You will now see the newly added path on the left. Click **OK** to close, then click **OK** on all subsequent dialogs to close them.

**Verify the Installation**

Open any Command Prompt (cmd) window and type `ffmpeg` then press Enter. If it displays information similar to the following, the installation is correct. If you see a message like "'ffmpeg' is not recognized as an internal or external command...", it means there was an error configuring the environment variables. Please reconfigure them.