---
title: Using GroqCloud in Software
date: 2024-01-22 14:33:00
description: GroqCloud is a foreign AI inference platform offering generous free credits and a variety of model choices, making it ideal for free trials. This article explains how to use GroqCloud and integrate it with video translation software.
---
## Using GroqCloud in Software

GroqCloud is a foreign AI inference platform offering generous free credits and a variety of model choices, making it ideal for free trials. This article explains how to use GroqCloud and integrate it with video translation software.

> **GroqCloud Website:** [https://console.groq.com/](https://console.groq.com/)

## Requires a VPN (Science Internet)

GroqCloud blocks access from IP addresses in Mainland China. If you cannot access it, please ensure your VPN tool is enabled.

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121900-0.webp)

## Login, Register, and View Available Models

After logging in, follow the steps shown in the image below to view all available models.

> **GroqCloud Model List:** [https://console.groq.com/playground](https://console.groq.com/playground)

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121901-1.webp)

The models `whisper-large-v3` and `whisper-large-v3-turbo` are highly recommended. They can convert audio to subtitles, with performance nearly identical to OpenAI's official models.

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121901-2.webp)

Other models are primarily used for text translation, such as `llama-3.2-11b-text-preview` and `llama-3.2-90b-text-preview`. It is generally recommended to choose models with larger parameters (e.g., 90b) for better results.

## Get a Free API Key

> **Get API Key:** [https://console.groq.com/keys](https://console.groq.com/keys)

Follow the steps shown in the image below to create a new API key.

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121901-3.webp)

## Connect to Video Translation Software

In your video translation software, find the speech recognition settings (usually in the menu bar) and select the OpenAI Speech Recognition API option.

Fill in the following information:

*   **API URL:** `https://api.groq.com/openai/v1`
*   **API Key:** The key you created in the previous step
*   **Available Models:** `whisper-large-v3, whisper-large-v3-turbo, distil-whisper-large-v3-en` (It is recommended to use only the first two, which support multiple languages; the last one supports only English)

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121901-4.webp)

## Test

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121902-5.webp)

## Using Other Models for Translation

Similarly, in the translation settings, select the OpenAI ChatGPT option. Fill in `https://api.groq.com/openai/v1` as the API address, enter your API key, and type the name of the model you want to use in the text box. **Do not select models with "vision" in their name, as these are vision models and may cause errors during use.**

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121902-6.webp)

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121902-7.webp)

## Troubleshooting: Connection Errors

If you encounter the following error message, please check if your VPN tool is working properly and if the system proxy or global proxy is correctly configured.

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121903-8.webp)

For example, some VPN software can automatically configure the system proxy.

![image.png](https://pvtr2.pyvideotrans.com/img/20241116121903-9.webp)