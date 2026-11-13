---
title: Speech-to-Text Recognition Tool
date: 2024-01-22 14:33:00
description: An offline local speech-to-text tool based on the openai-whisper open-source model. It can recognize human speech from video/audio and convert it to text, outputting in JSON, SRT subtitle (with timestamps), or plain text format. It can serve as a self-hosted alternative to OpenAI's speech recognition API or Baidu speech recognition, with accuracy comparable to the OpenAI official API.
---

# Speech Recognition Channel: STT Local Recognition Tool

## What is this?

STT is an **offline local speech recognition tool** based on the Faster-Whisper open-source model, capable of converting human speech in video or audio to text.

**Key features**:
- Fully offline — no internet required
- Multiple output formats: JSON, SRT subtitles, plain text
- Built-in base model with additional models available for download
- CUDA GPU acceleration support
- Accuracy comparable to OpenAI's official API

> GitHub repository: [https://github.com/jianchang512/stt](https://github.com/jianchang512/stt)

## Available Models

STT supports the following Whisper models, listed from lowest to highest recognition quality:

| Model | Parameters | VRAM | Quality | Use Case |
|-------|-----------|------|---------|----------|
| base | 74M | ~1 GB | Basic | Quick testing, simple scenarios |
| small | 244M | ~2 GB | Good | Daily use |
| medium | 769M | ~5 GB | Very good | Multilingual recognition |
| large | 1550M | ~10 GB | Excellent | High-accuracy recognition |
| large-v3 | 1550M | ~10 GB | Best | Highest accuracy requirements |

> Model download: [https://github.com/jianchang512/stt/releases/tag/0.0](https://github.com/jianchang512/stt/releases/tag/0.0)

**Model selection tip**: If GPU VRAM is limited, start with the base or small model. Larger models are more accurate but require more hardware resources.

## Pre-compiled Windows Version

### Requirements

- Windows 10/11 64-bit
- For GPU acceleration: NVIDIA GPU with CUDA properly configured

### Installation Steps

1. **Download the pre-compiled package**
   Visit the [Releases page](https://github.com/jianchang512/stt/releases) and download the latest pre-compiled package.

2. **Extract the files**
   Extract to any location. Paths without Chinese characters or spaces are recommended, such as `E:/stt`.

3. **Start the service**
   Double-click `start.exe` and wait for the browser to automatically open the local web interface.

4. **Recognize speech**
   - Click the upload area or drag an audio/video file onto it
   - Select the spoken language (Chinese/English/Auto-detect, etc.)
   - Select the output format (JSON/SRT/plain text)
   - Select the model to use (base model is built in)
   - Click "Start Recognition"
   - Wait for completion — results will appear in the text box at the bottom of the page

5. **GPU acceleration**
   If the machine has an NVIDIA GPU with CUDA properly configured, GPU acceleration will be used automatically.

## Linux and macOS Source Code Deployment

### Requirements

- Python 3.9 to 3.11
- pip package manager
- FFmpeg (must be installed manually)

### Deployment Steps

1. **Create project directory and clone the source code**

   Create an empty directory (e.g., `E:/stt`), open a terminal in that directory (on Windows, type `cmd` in the address bar and press Enter), then run:

   ```bash
   git clone git@github.com:jianchang512/stt.git .
   ```

2. **Create and activate a virtual environment**

   ```bash
   # Create virtual environment
   python -m venv venv

   # Activate (choose based on OS)
   # Windows:
   %cd%/venv/scripts/activate
   # Linux/Mac:
   source ./venv/bin/activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

   > **Tip**: If you encounter version conflicts, try `pip install -r requirements.txt --no-deps` to skip dependency checks.

4. **Install FFmpeg**

   - **Windows**: Extract `ffmpeg.7z` and place `ffmpeg.exe` and `ffprobe.exe` in the project root directory
   - **Linux/Mac**: Download from the [FFmpeg official site](https://ffmpeg.org/download.html) and place the `ffmpeg` and `ffprobe` binaries in the project root directory

5. **Download the model**

   Visit the [model download page](https://github.com/jianchang512/stt/releases/tag/0.0) and download the desired model. Place the `.pt` file in the `models` folder inside the project root directory.

6. **Start the service**

   ```bash
   python start.py
   ```

   Wait for the browser window to open automatically.

## API Reference

STT provides a RESTful API for integration with other tools.

### Endpoint

```
POST {url}/api
```

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| file | File | Yes | Audio file (WAV format, 16kHz sample rate, mono) |
| language | String | No | Language code (e.g., `zh`, `en`). Leave empty for auto-detect. |
| model | String | No | Model name (e.g., `base`, `small`) |
| response_format | String | No | Output format: `json`, `srt`, `text` |

### Response Format

```json
{
  "code": 0,
  "data": "Recognized text or SRT content"
}
```

- `code` is 0 for success, 1 for failure
- `data` contains the recognition result

### Retry Mechanism

The API supports automatic retry — if recognition fails, it will automatically retry.

## Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Browser doesn't open automatically | Firewall block or port in use | Manually visit `http://localhost:7860` |
| Empty recognition results | Unsupported audio format | Convert audio to WAV format (16kHz, mono) using FFmpeg |
| Very slow recognition | GPU acceleration not enabled | Check CUDA environment; ensure NVIDIA drivers and CUDA Toolkit are installed correctly |
| Insufficient VRAM error | GPU VRAM not enough | Switch to a smaller model (e.g., base or small) |
| Dependency installation failed | Python version incompatibility | Ensure Python 3.9–3.11 is being used |
| FFmpeg not found | FFmpeg not placed correctly | Ensure ffmpeg and ffprobe are in the project root directory |
