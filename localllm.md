---
title: Local Large Language Models and OpenAI-Compatible AI Interfaces
date: 2024-01-22 14:33:00
description: How to use local LLMs and OpenAI ChatGPT-compatible AI services for translation in pyVideoTrans.
---

# Compatible AI / Local LLM Translation Channel

## What is it?

In pyVideoTrans, AI large language models can serve as highly effective translation channels by leveraging context for significantly improved translation quality. The **Compatible AI / Local Model** channel supports all AI services that use an OpenAI ChatGPT-compatible interface, including:

- Online AI platforms (Moonshot AI, Baichuan AI, 01.AI, etc.)
- Locally deployed models (via Ollama, LM Studio, etc.)
- Any third-party service with an OpenAI-compatible API

## Prerequisites

- pyVideoTrans software
- An API key from the AI platform (for online services) or a local model (for offline use)

---

## Using Online AI Platforms

### Moonshot AI (月之暗面)

1. Open the menu bar → **Translation Settings** → **OpenAI ChatGPT API Settings**
2. In the **API URL** field, enter: `https://api.moonshot.cn/v1`
3. Enter the API key from the Moonshot platform in the **SK** field (get it at: https://platform.moonshot.cn/console/api-keys)
4. In the **model text box**, enter: `moonshot-v1-8k,moonshot-v1-32k,moonshot-v1-128k`
5. Select a model from the dropdown
6. Click **Test**, then save after success

![](https://pvtr2.pyvideotrans.com/img/localllm02.jpg)

### Baichuan AI (百川智能)

1. Open the menu bar → **Translation Settings** → **OpenAI ChatGPT API Settings**
2. In the **API URL** field, enter: `https://api.baichuan-ai.com/v1`
3. Enter the API key from the Baichuan platform in the **SK** field (get it at: https://platform.baichuan-ai.com/console/apikey)
4. In the **model text box**, enter: `Baichuan4,Baichuan3-Turbo,Baichuan3-Turbo-128k,Baichuan2-Turbo`
5. Select a model from the dropdown
6. Click **Test**, then save after success

![](https://pvtr2.pyvideotrans.com/img/localllm07.jpg)

### 01.AI (零一万物)

| Setting | Value |
|---------|-------|
| API URL | `https://api.lingyiwanwu.com/v1` |
| API Key | Get from https://platform.lingyiwanwu.com/apikeys |
| Model | `yi-lightning` |

---

## Using Ollama for Local Model Deployment

### Step 1: Install Ollama

1. Go to https://ollama.com/download
2. Download the installer for your operating system

![](https://pvtr2.pyvideotrans.com/images/4336c48c4ec11563f33fbc09baa07f37.jpg)

3. Run the installer and click **Install** to complete setup

![](https://pvtr2.pyvideotrans.com/images/9beedd165d61e4d98acda548b566dbce.jpg)

### Step 2: Download a Model

After installation, a command window will open automatically. Enter the following command to download the Qwen model:

```
ollama run qwen
```

![](https://pvtr2.pyvideotrans.com/images/f17c24ee244a265dd011e81da873e91d.jpg)

Wait for the download to complete:

![](https://pvtr2.pyvideotrans.com/images/ca247a0885e0e7ba85cbb2e401ef13e9.jpg)

When you see **"Success"**, the model deployment is complete.

![](https://pvtr2.pyvideotrans.com/images/3821569aa36c3500a80bc91eda4604bf.jpg)

> The default API endpoint is `http://localhost:11434`

> **How to reopen the command window?** Press `Win+Q`, search for `cmd`, open Command Prompt, and enter `ollama run qwen`.

![](https://pvtr2.pyvideotrans.com/images/d7cf385d319c76e2d022bf1435792b91.jpg)
![](https://pvtr2.pyvideotrans.com/images/7f905d54b5897ea7d7b2e3ddf35d86f5.jpg)

### Step 3 (Optional): Install a GUI

If you prefer a graphical interface, install ChatBox for a better UI experience:

1. Go to https://chatboxai.app/zh and download

![](https://pvtr2.pyvideotrans.com/images/3904ad609152bd04c4a9828f6c052139.jpg)

2. After installation, click **"Start Setup"**
3. In settings, select **"Ollama"** as the AI model provider, enter `http://localhost:11434` as the API domain, and select `Qwen:latest` as the model
4. Save and start using

![](https://pvtr2.pyvideotrans.com/images/46abcc4ba32f70e1f38fda21b63370fa.jpg)

### Step 4: Configure in pyVideoTrans

1. Open **Menu** → **Settings** → **OpenAI Compatible / Local LLM**
2. In the middle text box, add the model name (e.g., `qwen` — separate multiple models with commas)
3. In the **API URL** field, enter: `http://localhost:11434/v1`
4. **Enter anything in the SK field** (e.g., `1234`)
5. Select the model to use
6. Click **Test**, then save after success

![](https://pvtr2.pyvideotrans.com/images/d6205374bac7450c0d7aa970cccdbd75.jpg)
![](https://pvtr2.pyvideotrans.com/img/localllmv1.webp)

### Step 5: Use Other Models

Beyond Qwen, Ollama supports many models. The process is just as simple:

1. Browse all available models at https://ollama.com/library
2. Copy the model name
3. In the command window, run `ollama run <model-name>`

For example, to install the `openchat` model:

```
ollama run openchat
```

![](https://pvtr2.pyvideotrans.com/images/b19ff4885be54bf6b8e8b2dae25c4d47.jpg)

![](https://pvtr2.pyvideotrans.com/images/d5d4dc2c6055830ceba20eb2c809ab90.jpg)

![](https://pvtr2.pyvideotrans.com/images/7dfb0cab90a5a43c389beadbeb48d2b2.jpg)

---

## Important Notes

1. **Request rate limits**: Most AI translation channels may limit requests per minute. If you see rate limit errors, click **"Translation Channel ↓"** on the main interface and increase the **pause seconds** to 10 — meaning a 10-second wait after each translation, capping at 6 requests per minute.

![](https://pvtr2.pyvideotrans.com/img/localllm04.jpg)

2. **Excessive blank lines in output**: If the model you selected is not intelligent enough (especially smaller locally deployed models), it may fail to follow formatting instructions, resulting in many blank lines. You can try:
   - Using a larger model
   - Going to **Menu** → **Tools/Options** → **Advanced Options** → **Send full subtitle content when using AI translation**, and unchecking it

![](https://pvtr2.pyvideotrans.com/img/localllm05.jpg)

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Failed to connect to Ollama | Ollama not running | Make sure the Ollama service is running (port 11434) |
| API URL incorrect | Format wrong | Local models should use `http://localhost:11434/v1` |
| Empty translation result | Model capability insufficient | Try a larger model (e.g., 14B or 32B version) |
| Slow local model translation | Insufficient hardware resources | Use GPU acceleration, or choose a smaller model |
