---
title: Using zh_recogn for Chinese Speech Recognition
date: 2024-01-22 14:33:00
description: This recognition method only supports Chinese speech. It uses the Alibaba ModelScope community model, which provides good support for Chinese and can compensate for the insufficient Chinese support of foreign models.
---
## Using zh_recogn for Chinese Speech Recognition

This recognition method only supports Chinese speech. It uses the Alibaba ModelScope community model, which provides good support for Chinese and can compensate for the insufficient Chinese support of foreign models.

## How to Use

First, deploy the [zh_recogn project](https://github.com/jianchang512/zh_recogn).

Then start it. Enter the address (default http://127.0.0.1:9933) into the software's top-left menu: Settings -> zh_recogn Chinese Speech Recognition -> Address.

![](https://pvtr2.pyvideotrans.com/images/z2.png)

Then, in the software interface, select **zh_recogn** from the "faster mode" dropdown. When this option is selected, there is no need to choose a model or segmentation method.
![](https://pvtr2.pyvideotrans.com/images/z1.png)

----
----

# Deploying the zh_recogn Project

## Source Code Deployment

1. First, install Python 3.10, install [git](https://git-scm.com/downloads), and install ffmpeg. On Windows, download ffmpeg.exe and place it in the `ffmpeg` folder of this project. On Mac, use `brew install ffmpeg` to install.

2. Create an empty directory with an English name. Open cmd in this directory on Windows (use Terminal on macOS and Linux) and execute the command: `git clone https://github.com/jianchang512/zh_recogn ./`

3. Continue by executing `python -m venv venv`. Then, on Windows, execute `.\venv\scripts\activate`. On macOS and Linux, execute `source ./venv/bin/activate`.

4. Continue by executing `pip install -r requirements.txt --no-deps`.

5. For CUDA acceleration on Windows and Linux, continue by executing `pip uninstall torch torchaudio`, then execute `pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu118`.

6. Start the project with `python start.py`.

## Pre-packaged Version / Windows 10 & 11 Only

Download link: https://github.com/jianchang512/zh_recogn/releases

1. After downloading, extract it to a directory with an English name and double-click `start.exe`.

2. To reduce the package size, the pre-packaged version does not support CUDA. For CUDA acceleration, please use source code deployment.

## Using in the pyvideotrans Project

First, upgrade [pyvideotrans](https://github.com/jianchang512/pyvideotrans) to v1.62+. Then, open the top-left Settings menu -> zh_recogn Chinese Speech Recognition menu, fill in the address and port. The default is "http://127.0.0.1:9933". Do not add `/api` at the end.

## API

API address: http://ip:port/api (default `http://127.0.0.1:9933/api`)

Example Python code to request the API:

```
import requests

audio_file="D:/audio/1.wav"
file={"audio":open(audio_file,'rb')}
res=requests.post("http://127.0.0.1:9933/api",files=file,timeout=1800)

print(res.data)

[
    {
     line:1,
     time:"00:00:01,100 --> 00:00:03,300",
     text:"Subtitle content 1"
    },
    {
     line:2,
     time:"00:00:04,100 --> 00:00:06,300",
     text:"Subtitle content 2"
    },
]

```

When filling in the address in pyvideotrans, do not add `/api` at the end.

## Web Interface
![image](https://github.com/jianchang512/zh_recogn/assets/3378335/86305245-c206-4507-afb8-90193dd27bd1)

## Notes

1. The first time you use it, the model will be downloaded automatically, which may take a long time.
2. Only Chinese speech recognition is supported.
3. You can modify the binding address and port in the `set.ini` file.