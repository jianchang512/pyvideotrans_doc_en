---
title: SenseVoice Alibaba's Open-Source Speech Recognition Foundation Model
date: 2024-01-22 14:33:00
description: SenseVoice Alibaba's Open-Source Speech Recognition Foundation Model
---
SenseVoice is an open-source speech recognition foundation model from Alibaba. It supports recognizing speech in Chinese, Japanese, Korean, and English. Compared to some previous models, it features faster recognition speed and higher accuracy.

However, the officially released version has not included timestamp output by default, which is inconvenient for subtitle creation. Currently, this **API project** was created by using other VAD models for pre-segmentation and then recognizing with SenseVoice. It has been integrated into video translation software for easier use.

[SenseVoice Official Repository](https://github.com/FunAudioLLM/SenseVoice)

[This API Project https://github.com/jianchang512/sense-api](https://github.com/jianchang512/sense-api)

## Purpose of This Project

1.  Replace the official `api.py` file to enable SRT subtitle output with timestamps.
2.  Connect for use with video translation and dubbing software.
3.  Includes a Windows integrated package. You can start the API by double-clicking `run-api.bat`, or launch the browser interface by double-clicking `run-webui.bat`.

> This `api.py` ignores emotion recognition processing and only supports speech recognition for Chinese, Japanese, Korean, and English.

## First, Deploy the SenseVoice Project

1.  Deploy using the official source code method, which supports deployment on Windows/Linux/MacOSX. For specific tutorials, please refer to the SenseVoice project homepage: https://github.com/FunAudioLLM/SenseVoice. After deployment, download the `api.py` file from this project and overwrite the `api.py` file that comes with the official package (**If you want to use it in video translation software, you must overwrite it; otherwise, you cannot get subtitles with timestamps**).

2.  Deploy using the Windows integrated package, which only supports deployment on Windows 10/11. Download the compressed package from the right side of this page: https://github.com/jianchang512/sense-api/releases. After extracting, double-click `run-api.bat` to use the `API`, or double-click `run-webui.bat` to open the web interface.

## Using the API

The default API address is `http://127.0.0.1:5000/asr`

You can open the `api.py` file to modify:

```
HOST='127.0.0.1'
PORT=5000
```

1.  If deployed via official source code, remember to overwrite the `api.py` file, then execute `python api.py`.
2.  If using the Windows integrated package, simply double-click `run-api.bat`.
3.  Wait until the terminal displays `http://127.0.0.1:5000`, which indicates a successful startup and it's ready to use.

![](https://pvtr2.pyvideotrans.com/img/sense2.jpg)

> Note: The first time you use it, it will download the model from ModelScope online, which may take a longer time.

## Using in Video Translation and Dubbing Tools

Fill in the API address in the menu -> Speech Recognition Settings -> SenseVoice Speech Recognition window's API Address field.

![](https://pvtr2.pyvideotrans.com/img/sense1.jpg)

## Calling the API from Source Code

-   API Address: Assuming the default API address is http://127.0.0.1:5000
-   Call Method: POST
-   Request Parameters
    -   lang: String type. Can pass one of zh | ja | ko | en.
    -   file: The audio binary data to be recognized, in WAV format.
-   Response
    -   Recognition Success Returns: `{code:0, msg:ok, data:"Complete SRT subtitle format string"}`
    -   Recognition Failure Returns: `{code:1, msg:"Error reason"}`
    -   Other Internal Errors Return: `{detail:"Error message"}`

Example: To recognize the audio file `10.wav`, where the spoken language is Chinese.

```python
import requests
res = requests.post(f"http://127.0.0.1:5000/asr", files={"file": open("c:/users/c1/videos/10s.wav", 'rb')}, data={"lang":"zh"}, timeout=7200)
print(res.json())
```

## Using the WebUI in a Browser

1.  If using the official package deployed from source, execute `python webui.py`. Wait until the terminal shows `http://127.0.0.1:7860`, then enter this address in your browser to use it.
2.  If using the Windows integrated package, double-click `run-webui.bat`. After successful startup, the browser will open automatically.

![](https://pvtr2.pyvideotrans.com/img/sense2.jpg)