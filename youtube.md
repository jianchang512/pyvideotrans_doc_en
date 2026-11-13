---
title: Download YouTube Videos
date: 2024-01-22 14:33:00
description: The actual download process involves separately downloading the video (without audio) and audio files, which are then automatically merged after download.
---
## Download YouTube Videos

This mode is used to download videos from YouTube.

![image-20240808010810495](https://pvtr2.pyvideotrans.com/images/image-20240808010810495.png)

**Network Proxy Address**: As is well known, YouTube is inaccessible within mainland China. Therefore, you need to enter a network proxy address.

**Video Playback Page URL**: To download a specific video, open its playback page on the YouTube website and copy the address here.

**Select Save Directory**: Choose where to save the downloaded file.

**Use VID as Video Name**: By default, the video name is the full video title, which can be very long and contain various symbols. This might cause errors during processing on Windows. Selecting this option will shorten the name to prevent such issues.

**Note**:

1.  The actual download process involves separately downloading the video (without audio) and audio files, which are then automatically merged after download. Please wait until the merge is complete or you receive a download success prompt before opening the video file. Opening it prematurely may cause the merge to fail.
2.  If you installed from source code, you might encounter failures due to a missing executable file. You can download the appropriate file for your operating system from the following address and copy it to the `ffmpeg` folder of this software: https://github.com/jianchang512/pyvideotrans/releases/v2.19/

    Windows: Download `ytwin32.exe`

    Mac: Download `ytdarwin`

    Linux: Download `ytlinux`

There are many ways to download videos from YouTube (YouKu), whether via command line or web UI. This video translation software also includes a simple download feature. Go to **Menu -> Tools/Options -> Download YouTube Video** for convenient downloading.

![image.png](https://pvtr2.pyvideotrans.com/img/20241109002201-0.webp)

The download interface is shown below.

![image.png](https://pvtr2.pyvideotrans.com/img/20241109002201-1.webp)

Fill in the network proxy and video playback page address, then click download.

## Frequently Encountered Login Verification Errors

![image.png](https://pvtr2.pyvideotrans.com/img/20241109002201-2.webp)

![image.png](https://pvtr2.pyvideotrans.com/img/20241109002202-3.webp)

As shown in the images, these types of errors **firstly** may occur due to frequent downloads triggering risk control, and **secondly** may be because the proxy IP you are using is tainted and on YouTube's blacklist.

## Solutions:

**One:** Switch VPN nodes. You may need to try several different nodes to find a usable IP.

**Two:** Use the Chrome browser to log into YouTube normally first. Then, copy the cookie information into a file named `www.youtube.com_cookies.txt` and place this file in the same directory as the video translation software's `sp.exe`.

> Of course, this method is not guaranteed to be 100% successful, but it can significantly increase the download success rate and reduce errors.

## How to Get cookies.txt

1.  First, you need to install the Chrome browser. If not installed, you can download it from: https://www.google.cn/chrome
2.  Install the browser extension `# Get cookies.txt LOCALLY`. Installation address: `https://chromewebstore.google.com/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc`

    ![image.png](https://pvtr2.pyvideotrans.com/img/20241109002202-5.webp)

3.  Open the youtube.com website and log in.
4.  While on the youtube.com page, click the icon of the browser extension you just installed.

    ![image.png](https://pvtr2.pyvideotrans.com/img/20241109002203-6.webp)

    In the pop-up window, click `Export`. This will automatically download a cookies.txt file.

    ![image.png](https://pvtr2.pyvideotrans.com/img/20241109002203-7.webp)

    The downloaded file will be named `www.youtube.com_cookies.txt`. Copy it to the directory where `sp.exe` is located.

5.  Try downloading again.

## What to Do If It Still Fails

After successfully downloading a few videos, you might encounter download failures again. In this case, refresh the YouTube page and re-download the cookies.txt file to overwrite the old one.

Of course, due to YouTube's risk control measures, to truly improve the success rate, it's still necessary to choose cleaner VPN nodes.