---
title: Installing ffmpeg on Windows
date: 2024-01-22 14:33:00
description: Tutorial for installing ffmpeg on Windows
---

## Installing ffmpeg on Windows

> If you are using a pre-packaged version, ffmpeg is already built-in, and you do not need to install it separately.

Why install it? If your AI project involves audio or video, you will almost certainly need it, so installation is recommended.

**Download ffmpeg and set environment variables**

Download link for the Windows version of ffmpeg:

https://www.gyan.dev/ffmpeg/builds/#release-builds

Choose to download the `ffmpeg-release-full.7z` archive, which includes support for all common libraries. After downloading, extract it, navigate to the `bin` directory, and you will see 3 `.exe` files. Copy them to a folder with an English path, for example, I copied them to the folder `E:\sdk\ffmpeg`. Then add this path to the `Path` environment variable.

![image.png](https://pvtr2.pyvideotrans.com/img/20241128131131-0.webp)

**Method to add the Path environment variable**: Press the `Win` key + `Pause` key (top right). In the window that opens, click sequentially: **Advanced system settings** -> **Environment Variables** -> **System variables** -> find the `Path` line and double-click it.

![image.png](https://pvtr2.pyvideotrans.com/img/20241128131132-1.webp)

Then click **New** -> **Browse**, and navigate to the directory containing those 3 `.exe` files.

![image.png](https://pvtr2.pyvideotrans.com/img/20241128131132-2.webp)

In the browse dialog, find the directory containing the `ffmpeg.exe` file mentioned earlier, then click **OK**.

![image.png](https://pvtr2.pyvideotrans.com/img/20241128131133-3.webp)

You will then see the newly added path on the left. Click **OK** to close, and continue clicking **OK** to close all open dialogs.

![image.png](https://pvtr2.pyvideotrans.com/img/20241128131133-4.webp)

![03.gif](https://pvtr2.pyvideotrans.com/img/20241128131133-5.webp)

**Verify if the installation was successful**

Open any Command Prompt window, type `ffmpeg`, and press Enter. If the output looks like the image below, the installation is correct. If you see a message like "ffmpeg is not recognized as an internal or external command...", there was an error configuring the environment variable. Please reconfigure it.

![image.png](https://pvtr2.pyvideotrans.com/img/20241128131139-6.webp)

## Installing ffmpeg on Mac

1. Open a Terminal window and enter the command `brew -v`. If you get an error like "command not found," you need to install brew.

   - To install brew, continue by entering this command in the terminal:

     ```
     /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
     ```

   - Confirm the installation is complete. Wait for it to finish, then run `brew -v` again. If a version number is displayed, brew is installed successfully, and you can proceed to install ffmpeg.

2. Continue in the terminal and execute the command `brew install ffmpeg`. After it finishes, enter the command `ffmpeg`. If a large block of version information is output, ffmpeg has been successfully installed.