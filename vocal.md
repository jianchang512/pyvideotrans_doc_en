---
title: 2 Recommended Tools for Vocal and Background Sound Separation
date: 2024-01-22 14:33:00
description: In audio-to-text tasks, background noise or accompaniment can also affect recognition accuracy. To achieve more precise results, it's necessary to remove background accompaniment from the audio in advance.
---
In audio-to-text tasks, background noise or accompaniment can also affect recognition accuracy. To achieve more precise results, it's necessary to remove background accompaniment from the audio in advance.

## 2 Recommended Tools for Vocal and Background Sound Separation

**First, vocal-separate:** A local, offline tool for vocal and background sound separation based on [spleeter](https://github.com/deezer/spleeter). There is a pre-packaged version for Windows—just extract and double-click to use. For Mac/Linux, you need to deploy from source. It has a Chinese interface, is very simple to use, supports direct video processing, and is relatively fast.

![](https://pvtr2.pyvideotrans.com/images/7dbe59f0976c2c96efc51fc9c1202144.jpg)

**Second, Ultimate Vocal Remover:** This is the desktop GUI version of uvr5. On Windows, it needs to be installed on the C drive; otherwise, issues may arise. It has an English interface with many options, making operation relatively more complex. However, it is more powerful and delivers better results.

![](https://pvtr2.pyvideotrans.com/images/3090034c947a03939dd807185f782805.jpg)

----

## vocal-separate Installation and Usage

**1.** For Windows, first download the pre-packaged version from here. For other systems, pull the source code for deployment.
https://github.com/jianchang512/vocal-separate/releases

![](https://pvtr2.pyvideotrans.com/images/c32105bc781b180320c12b4e24bfca9a.jpg)

**2.** After downloading, extract the files and double-click `start.exe`. Wait for the browser page to open automatically. If you see an error similar to the one in the image below, don't worry—it's just a reminder that GPU acceleration is unavailable, which doesn't affect usage.

![](https://pvtr2.pyvideotrans.com/images/f3b037495db564c37abce5ecbbd404c9.jpg)

Upon successful startup, the following browser page will open.

![](https://pvtr2.pyvideotrans.com/images/b74a0af2982c41c06e28c68ccb8e821e.jpg)

**3.** As shown in the image above, drag and drop or click to upload the audio or video file from which you want to isolate the vocals. Videos will be automatically converted to audio before processing.

From the model selection, choose "2stems" to separate the uploaded file into two files: vocals and other sounds.

You can also choose the 4stems or 5stems models. In addition to isolating the vocals, these will further separate the other sounds into files like "drums" and "bass." Generally, using 2stems is sufficient.

![](https://pvtr2.pyvideotrans.com/images/23ca264486a0f640d2d4699023d5bb86.jpg)

You can preview the separation results on the webpage. Click to download or go directly to the displayed result directory to find the separated files. The vocal file is named **vocals.wav**, and the other sounds file is named **accompaniment.wav**.

![](https://pvtr2.pyvideotrans.com/images/9066c1ccb8e2514176b66648d01a384a.jpg)

It's that simple.

----

## Ultimate Vocal Remover Installation and Usage

**1.** First, go here to download: https://github.com/Anjok07/ultimatevocalremovergui/releases/tag/v5.6

![](https://pvtr2.pyvideotrans.com/images/d968599e97eb361cfa1df05d260265f4.jpg)

For the Windows version, you can also click this link to download directly. After downloading, double-click the .exe file and follow the installation steps by clicking "Next."
https://github.com/Anjok07/ultimatevocalremovergui/releases/download/v5.6/UVR_v5.6.0_setup.exe

**2.** After installation is complete, double-click the desktop icon to launch.

![](https://pvtr2.pyvideotrans.com/images/9e92da7e0a2ace8bd7d74046f08fbf04.jpg)

**3.** As shown in the image below, select the audio file to process, set the output directory, choose the model to use, bitrate, and various other options. Except for "Select Input" and "Select Output," all other options are optional and can be left at their defaults.

![](https://pvtr2.pyvideotrans.com/images/b43315437f0999d4e4e569d2b920ba0c.jpg)

"**Select Input**": Click to select the audio file to process.

"**Select Output**": Click to choose where to save the processed files.

"**CHOOSE PROCESS METHODS**": Select the processing method. The default is MDX-Net, which likely offers the best results, so you can keep it as default.

![](https://pvtr2.pyvideotrans.com/images/38b10765eb05b11a8446365889e991d0.jpg)

"**CHOOSE MDX-NET MODEL**": The model corresponding to the method chosen above. If the method is not "MDX-Net," you will need to download additional models.

![](https://pvtr2.pyvideotrans.com/images/3ca4859617b27486045defe9eac4e278.jpg)

![](https://pvtr2.pyvideotrans.com/images/3de31d131127b242b73abf4345970b2b.jpg)

"**Start Processing**": The button to start the separation process after all selections are made. Click it to begin the separation operation and wait for the completion prompt.

![](https://pvtr2.pyvideotrans.com/images/015e3df71efcc252e4ee1a4b4b2f8f35.jpg)