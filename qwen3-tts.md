---
title: Qwen3-TTS Windows Package
date: 2026-01-24 14:33:00
description: Qwen-TTS is an advanced speech synthesis technology that converts text to highly realistic, natural-sounding human voice. It automatically adjusts rhythm and emotion based on text content. Beyond standard Chinese and English, it supports three Chinese dialects  Beijing dialect, Shanghai dialect (Wu), and Sichuan dialect.
---

# Zero-to-Running! Qwen3-TTS Voice Synthesis/Cloning Windows Package Tutorial

## Introduction

**Qwen3-TTS** is an extremely powerful voice synthesis (TTS) model that can not only generate speech from text, but also **clone your voice** and even **design a completely new voice from a text description**!

Deploying this kind of open-source large model typically requires a complex Python environment and various dependency installations, creating a high barrier for non-technical users.

This package is a **one-click Windows 10/11 package**:
- **No** manual Python installation needed
- **No** complex environment variable configuration needed
- **Built-in** environment management tool (uv.exe)
- **Automatic** model download (configured with a fast mirror)

Just download, extract, and double-click to get started!

---

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Operating System | Windows 10/11 |
| Disk Space | 10GB+ recommended |
| Hardware | CPU works; NVIDIA GPU enables acceleration (10x faster) |

---

## Step 1: Download and Extract

1. Download the package:

- [Download Qwen3-TTS Windows Package from Baidu Cloud](https://pan.baidu.com/s/1Feqd18y6fwMD7JcvhjEN1w?pwd=1234)
- [Download from GitHub](https://github.com/jianchang512/stt/releases/download/0.0/qwen3tts-win-0124.7z)

2. **【Important】** Extract to a path **without Chinese characters or spaces** (e.g., `D:\AI\QwenTTS`)

   - **Bad example**: `C:\Users\ZhangSan\Desktop\New Folder`
   - **Good example**: `D:\Tools\Qwen-TTS`

3. Open the folder — you should see the following file structure:

![](https://pvtr2.pyvideotrans.com/1769268248188_image.png)

---

## Step 2: Install the Runtime Environment (one-time only)

**After downloading and extracting, double-click `0解压后立即点此安装运行环境.bat` (Install runtime environment immediately after extraction). This only needs to be run once.**

---

## Step 3: Choose a Function (5 startup scripts)

The folder contains **5 `.bat` files**, each for a different function and model size. Choose based on your hardware and needs:

### 1. Voice Cloning Mode (based on reference audio)

This mode lets you upload a 3–10 second reference audio clip, and the AI will mimic that voice to speak.

| Startup Script | Features |
|----------------|----------|
| 启动语音克隆-0.6B模型.bat (Voice Clone - 0.6B) | Faster, lower hardware requirements, good for trying out |
| 启动语音克隆-1.7B模型.bat (Voice Clone - 1.7B) | Better quality, more realistic, slightly slower |

### 2. Voice Design Mode

This mode doesn't need reference audio — you describe the voice in text, e.g., "a deep, magnetic middle-aged male voice."

| Startup Script | Features |
|----------------|----------|
| 启动声音设计.bat (Voice Design) | Uses 1.7B model, create unique voices with text prompts |

> **Note**: Voice Design mode cannot be used in pyVideoTrans — it only works in the WebUI.

### 3. Custom Voice Mode (built-in preset characters)

This mode includes preset high-quality voices like Vivian, Uncle_fu, and Sohee — stable and pleasant sounding.

| Startup Script | Features |
|----------------|----------|
| 启动自定义音色-0.6B模型.bat (Custom Voice - 0.6B) | Faster |
| 启动自定义音色-1.7B模型.bat (Custom Voice - 1.7B) | Better quality |

> **Note**: In this mode, you cannot use reference audio — you can only select characters from the dropdown menu.

---

## Step 4: Start and Auto-Configure

1. Double-click your chosen `.bat` file
2. A black command-line window will appear — **do not close it!**
3. **On first run**, the tool will automatically configure the environment and download model files
   - A China mirror (hf-mirror.com) is built in for faster downloads
   - Depending on your connection speed, this may take several minutes to over ten minutes — please be patient
4. When you see the following text in the black window, startup is complete:

```text
* To create a public link, set `share=True` in `launch()`.
```

![](https://pvtr2.pyvideotrans.com/1769268892569_image.png)

---

## Step 5: Start Using

1. Open a browser (Chrome or Edge recommended)
2. Enter in the address bar: `http://127.0.0.1:8000` and press Enter
3. You'll see the Qwen3-TTS interface:
   - **Input box**: Enter the text you want the AI to read
   - **Reference Audio / Prompt**: Upload audio or enter a description, depending on the mode you started
   - **Generate**: Click the button to generate speech

![](https://pvtr2.pyvideotrans.com/1769268232931_1.png)

![](https://pvtr2.pyvideotrans.com/1769268226099_2.png)

---

## Using in pyVideoTrans

### Voice Cloning Mode

1. Configure reference audio in pyVideoTrans (Menu → TTS Settings → Qwen-tts (Local))
2. Select "Qwen3-TTS" from the "TTS Channel" dropdown on the main screen
3. Select "clone" from "Dubbing Character" to use reference audio cloning

### Custom Voice Mode

1. Configure the Qwen3-TTS address in pyVideoTrans
2. Select "Qwen3-TTS" from the "TTS Channel" dropdown on the main screen
3. Select a built-in voice (e.g., Vivian, Serena) from "Dubbing Character"

### Error Messages

- **Error `Cannot find a function with api_name: /run_voice_clone`**: You're using the `clone` character or reference audio in pyVideoTrans, but you didn't start a voice cloning model. Start `Qwen3-TTS-12Hz-0.6B-Base` or `Qwen3-TTS-12Hz-1.7B-Base`.

- **Error `Cannot find a function with api_name: /run_instruct`**: You're using a built-in voice, but you didn't start the custom voice model. Start `Qwen3-TTS-12Hz-0.6B-CustomVoice` or `Qwen3-TTS-12Hz-1.7B-CustomVoice`.

- **Error when starting VoiceDesign model**: pyVideoTrans only supports voice cloning and custom voice models, not the voice design model.

---

## Advanced: Enable GPU Acceleration

By default, the configuration is set to **CPU mode** to ensure it works on all computers.

If you have an **NVIDIA GPU** with **CUDA** installed, follow these steps for 10x+ inference speed:

### Step 1: Install CUDA PyTorch

In the folder containing the bat files, clear the address bar, type `cmd`, press Enter, then run:

**CUDA 12.x:**
```bash
runtime\python -m pip install --force-reinstall torch torchaudio --index-url https://download.pytorch.org/whl/cu128
```

**CUDA 13.x:**
```bash
runtime\python -m pip install --force-reinstall torch torchaudio --index-url https://download.pytorch.org/whl/cu130
```

### Step 2: Edit the Startup Script

1. Right-click the `.bat` file you want to modify, select "Edit" (or open with Notepad)
2. Find the last line containing:

```batch
--device cpu --dtype float32
```

3. **Delete** this line (remove `--device cpu --dtype float32`)
4. Save the file and double-click to run again. The program will automatically use GPU acceleration.

---

## Reference Audio Requirements

| Item | Requirement |
|------|-------------|
| Format | WAV (recommended) |
| Duration | 3–10 seconds |
| Content | Clear pronunciation, no background noise |
| Location | `f5-tts` folder under pyVideoTrans root directory |

---

## Troubleshooting

### 1. Window flashes and closes immediately?

Check whether the extraction path contains Chinese characters or spaces. Make sure the VC++ runtime is installed (usually present on gaming PCs).

### 2. Generation is very slow?

CPU mode is naturally slower than GPU. If you have an NVIDIA GPU, follow the "Advanced: Enable GPU Acceleration" section. The 1.7B model being slower than 0.6B is normal.

### 3. Stuck on first startup?

The tool is downloading models, which are several gigabytes. Check the black window for progress bars or download indicators. As long as no errors appear, please be patient.

### 4. Model download failed?

The default download source is hf-mirror.com. If it still fails:
- Check your network connection
- Try accessing huggingface.co
- Manually download model files to the `models` directory

### 5. Error `Cannot find a function with api_name: /run_voice_clone`?

You're using the `clone` character or reference audio dubbing in pyVideoTrans, which requires the voice cloning model (Base model), but you started a different model (e.g., custom voice model or voice design model). Switch to the correct startup script.
