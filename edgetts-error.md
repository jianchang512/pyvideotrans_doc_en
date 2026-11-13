---
title: Common Edge-TTS Errors
date: 2024-01-22 14:33:00
description: These errors typically occur during the dubbing phase when using the "edgeTTS" channel. This is the TTS service API used by Microsoft for the "Read Aloud" feature in the Edge browser. It is free to use, but recently there seem to be new rate-limiting measures. A large number of requests from the same IP in a short period can trigger a 403 block, causing errors.
---
> "Current IP is restricted, please use a proxy"
> "Number of dubbing errors exceeds 1/3"

Errors like those above generally appear during the dubbing stage, specifically when using the "edgeTTS" channel. This is Microsoft's TTS service API for the "Read Aloud" feature in the Edge browser. It's free to use, but recently, new rate-limiting measures seem to have been implemented. A high volume of requests from the same IP address in a short time can trigger a 403 block, leading to errors.

![](https://pvtr2.pyvideotrans.com/img/fanyichucuo1.webp)
![](https://pvtr2.pyvideotrans.com/img/fanyichucuo2.webp)

## How to Resolve?

#### First: Check if there is a latest version patch package. If yes, download and overwrite to upgrade first, then test if the issue is resolved.

Download and upgrade address: https://pyvideotrans.com/downpackage

#### Second: If you know what a proxy/VPN/wall is, then use it. Enter the HTTP proxy address into the "Network Proxy" text box.

![](https://pvtr2.pyvideotrans.com/img/fanyichucuo4.webp)

#### Third: As shown in the image below, click on "Dubbing Channel". In the pop-up window, change the concurrency to 1 and the pause to 5. This reduces errors by slowing down the dubbing speed.

![](https://pvtr2.pyvideotrans.com/img/fanyichucuo5.webp)

#### Fourth: If none of the above methods work, you can switch to other dubbing channels.

For example, free dubbing services include "GPT-SoVITS", "ChatTTS", "F5-TTS", "CosyVoice", etc. Deploy the corresponding project locally. The settings dialog will have tutorial links for each.
![](https://pvtr2.pyvideotrans.com/img/fanyichucuo6.webp)
![](https://pvtr2.pyvideotrans.com/img/fanyichucuo7.webp)

Or use paid online APIs, such as 302.AI, ByteDance Volcano Voice Synthesis, OpenAI-TTS, etc.
![](https://pvtr2.pyvideotrans.com/img/fanyichucuo8.webp)

#### Fully Local Offline Translation Setup

Translation Channel Selection: Offline Translation OTT

![](https://pvtr2.pyvideotrans.com/img/fanyichucuo9.webp)

Dubbing Channel Selection: F5-TTS / CosyVoice / FishTTS / GPT-SoVITS / clone-voice / ChatTTS are all local options requiring separate deployment. Deployment tutorials are available in the settings dialog.

Speech Recognition Selection: faster-whisper / openai-whisper / SenseVoice / STT are all local recognition options.

Most Stable Translation Setup:

For stability, commercial-grade APIs are most suitable, unless your local machine is very powerful, in which case local translation can be used.

Translation Channel Options: 302.AI / OpenAI-ChatGPT / ByteDance Volcano Large Model / Baidu Translate / Tencent Translate

![](https://pvtr2.pyvideotrans.com/img/fanyichucuo10.webp)

Dubbing Channel Options: ByteDance Volcano Voice Synthesis / OpenAI-TTS / 302.AI
![](https://pvtr2.pyvideotrans.com/img/fanyichucuo11.webp)

Speech Recognition Channel Options: ByteDance Volcano Subtitle Generation
![](https://pvtr2.pyvideotrans.com/img/fanyichucuo12.webp)