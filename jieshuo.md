---
title: One-Click Creation of Commentary Short Videos
date: 2024-01-22 14:33:00
description: Leverage the GeminiAI large model to create commentary short videos or video summaries for long videos with one click. Also supports subtitle translation using the three-step reflection method & audio/video transcription to subtitles.
---



## One-Click Creation of Commentary Short Videos / Video Summaries

Leverage the GeminiAI large model to create commentary short videos or video summaries for long videos with one click. Also supports subtitle translation using the three-step reflection method & audio/video transcription to subtitles.


## Features

- Create commentary short videos for long videos with one click.
- Generate video summaries.
- Support for translating SRT subtitles using the three-step reflection method.
- Support for transcribing audio/video into SRT subtitles.

## Interface

![image](https://github.com/user-attachments/assets/aeb39f4f-9eb0-4c5d-b776-386a67b99a22)


Launching will open a single-page application in your web browser at `http://127.0.0.1:5030`. You can perform operations to create commentary videos, translate subtitles, or transcribe audio/video.

## Important Notes

1. A reliable VPN/proxy is essential, especially for video commentary. Unstable connections may lead to failure.
2. The core functionality relies on prompt engineering. You can modify the prompts yourself for better results.
3. Depends on GeminiAI. You can apply for a free API key. It is recommended to use the `gemini-1.5-flash` model for its generous free tier.
4. Most encountered issues are likely due to an unstable VPN/proxy connection.

## Deployment

**Windows**

Download the pre-packaged version:

https://github.com/jianchang512/ai2srt/releases/download/v0.3/window-gemini-video-tools-0.3.7z


Extract the archive and double-click `启动.bat` to run.

**Linux and Mac**

```

git clone https://github.com/jianchang512/ai2srt

cd ai2srt

python3 -m venv venv


source ./venv/bin/activate

pip3 install -r requirements.txt


python3 app.py


```