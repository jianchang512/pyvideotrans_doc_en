---
title: Installing the Voice Cloning Tool clone-voice
date: 2025-07-15 14:33:00
description: A voice cloning tool that uses any human voice to synthesize speech from text, or convert one voice into another using that voice's characteristics. Works without an NVIDIA GPU.
---

# TTS Channel: clone-voice

> The model used in this project is xtts_v2 from [coqui.ai](https://coqui.ai/). The model is released under the [Coqui Public Model License 1.0.0](https://coqui.ai/cpml.txt). Please follow this license when using the project. Full license text: https://coqui.ai/cpml.txt

## What is clone-voice

clone-voice is a voice cloning tool that uses any human voice to synthesize speech from text, or convert one voice into another using that voice's characteristics.

Key features:
- **Easy to use**: Works without an NVIDIA GPU. Download the pre-compiled version, double-click `app.exe` to open the web interface, and use it with just mouse clicks
- **Multi-language support**: Supports 16 languages including Chinese, English, Japanese, Korean, French, German, Italian, and more
- **Online recording**: Record voice directly from the microphone as reference audio
- **Quality**: Excellent for English; passable for Chinese

> **Model limitation**: The xtts model can only be used for learning and research purposes, not for commercial use.

---

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Operating System | Windows (pre-compiled), Linux, macOS (source deployment) |
| Disk Space | Pre-compiled: ~4.7GB (main: 1.7G + model: 3G) |
| Python | Source deployment requires Python 3.9–3.11 |
| GPU | Optional; NVIDIA GPU enables CUDA acceleration |

---

## Windows Pre-compiled Version

### Step 1: Download

[Open the Releases download page](https://github.com/jianchang512/clone-voice/releases) and download:
- Pre-compiled main file (~1.7GB)
- Model file (~3GB)

### Step 2: Extract

Extract to a location, e.g., `E:/clone-voice`

### Step 3: Extract the Model

Extract the downloaded model into the `tts` folder inside the software directory. After extraction:

![image](https://github.com/jianchang512/clone-voice/assets/3378335/4b5a60eb-124d-404b-a748-c0a527482e90)

> The `tts` folder should contain 3 subdirectories.

### Step 4: Launch

1. Double-click `app.exe`
2. Wait for the web window to open automatically
3. **Read the text prompts in the cmd window carefully** — any errors will be displayed there

> On first launch, the model needs to cold-load, which takes some time. Wait for `http://127.0.0.1:9988` to appear and the browser page to open, then wait another 2–3 minutes before performing conversions.

### Step 5: Use

#### Text → Voice

1. Select the "Text → Voice" button
2. Enter text in the text box, or click to import an SRT subtitle file
3. Click "Start Now"

#### Voice → Voice

1. Select the "Voice → Voice" button
2. Click or drag the audio file to convert (mp3/wav/flac)
3. Select the voice to clone from the "Voice File to Use" dropdown
4. If no suitable option, click "Upload" to select a 5–20s pre-recorded voice file
5. Or click "Start Recording" to record 5–20s of voice online
6. Click "Start Now"

> If your machine has an NVIDIA GPU with a properly configured CUDA environment, CUDA acceleration will be used automatically.

---

## Source Deployment (Linux / Mac / Windows)

### Deployment Steps

1. **Install Python and Git**: Python 3.9–3.11 required. Install [Git](https://github.com/git-for-windows/git/releases/download/v2.44.0.windows.1/Git-2.44.0-64-bit.exe)

2. **Clone the source code**:
   ```bash
   # Create an empty directory, e.g., E:/clone-voice
   # Open cmd in that directory and run:
   git clone git@github.com:jianchang512/clone-voice.git .
   ```

3. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```

4. **Activate the environment** (Windows):
   ```bash
   E:/clone-voice/venv/scripts/activate
   ```

5. **Install dependencies**:
   ```bash
   pip install -r requirements.txt --no-deps
   ```

6. **Enable CUDA acceleration** (optional, requires NVIDIA GPU):
   ```bash
   pip uninstall -y torch
   pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu121
   ```

7. **Install FFmpeg**:
   - Windows: Extract `ffmpeg.7z` and place `ffmpeg.exe` in the same directory as `app.py`
   - Linux/macOS: Download from [FFmpeg official site](https://ffmpeg.org/download.html) and place the `ffmpeg` executable in the root directory

   ![image](https://github.com/jianchang512/clone-voice/assets/3378335/0c61c8b6-7f7e-475f-8984-47fb87ba58e8)

8. **First run to download model**:
   ```bash
   python code_dev.py
   ```
   - Enter `y` when prompted to accept the license
   - Wait for the model download to complete

9. **Start the service**:
   ```bash
   python app.py
   ```

10. **Train the model** (optional):
    ```bash
    python train.py
    ```
    Training parameters can be adjusted in `param.json`.

---

## Using in pyVideoTrans

1. Start clone-voice's web interface (default: `http://127.0.0.1:9988`)
2. Open pyVideoTrans, go to Menu → TTS Settings → clone-voice
3. Enter the API address: `http://127.0.0.1:9988`
4. Click "Test" — if no errors, configuration is successful
5. Select "clone-voice" from the "TTS Channel" dropdown on the main screen

---

## Reference Audio Requirements

| Item | Requirement |
|------|-------------|
| Format | WAV, MP3, or FLAC |
| Duration | 5–20 seconds (ideal) for best synthesis quality |
| Content | Clear, accurate pronunciation, no background noise |
| Languages | Supports 16 languages |

---

## Troubleshooting

### 1. Model Download Stalls or Fails

The model is hosted on huggingface.co. If the download fails repeatedly, try using a network proxy or mirror.

### 2. Model Check/Update on Every Launch

Each startup connects to check or update the model. To disable this, edit the dependency package:

Open `\venv\Lib\site-packages\TTS\utils\manage.py`, around line 389, in the `def download_model` method, comment out the block from `if md5sum is not None:` to the `else`.

### 3. Stuck After Launch

On first launch, the model needs to cold-load, which takes time. Wait for `http://127.0.0.1:9988` to appear and the browser page to open, then wait another 2–3 minutes before performing conversions.

### 4. cmd Window Freezes, Requires Enter to Continue

Click the icon in the top-left corner of the cmd window, select "Properties", and uncheck "QuickEdit Mode" and "Insert Mode".

### 5. Voice-to-Voice Thread Startup Failure

First, verify the model is correctly placed (the `tts` folder should contain 3 subdirectories):

![image](https://github.com/jianchang512/clone-voice/assets/3378335/4b5a60eb-124d-404b-a748-c0a527482e90)

If correctly placed but still failing, [download extra-to-tts_cache.zip](https://github.com/jianchang512/clone-voice/releases/download/v0.0.1/extra-to-tts_cache.zip) and copy the 2 extracted files to the `tts_cache` folder in the software root directory.

If the above doesn't work, configure a stable network proxy.

### 6. Text Length Exceeds Limit

```
The text length exceeds the character limit of 182/82 for language
```

Sentences separated by periods are too long. Break long sentences with periods rather than commas, or manually edit `clone/character.json` to adjust the limit.

### 7. Error `symbol not found __svml_cosf8_ha`

Download the DLL from https://www.dll-files.com/svml_dispmd.dll.html and copy it to `C:\Windows\System32`.

---

## CUDA Acceleration

### Installing CUDA Tools

[Detailed installation guide](https://juejin.cn/post/7318704408727519270)

1. Update your GPU driver to the latest version
2. Install [CUDA Toolkit 11.8](https://developer.nvidia.com/cuda-downloads)
3. Install [cuDNN for CUDA 11.X](https://developer.nvidia.com/rdp/cudnn-archive)

### Verify Installation

Press `Win + R`, type `cmd`, press Enter, then run:

```bash
nvcc --version
```

Confirm version information is displayed:

![image](https://github.com/jianchang512/pyvideotrans/assets/3378335/e68de07f-4bb1-4fc9-bccd-8f841825915a)

Then run:

```bash
nvidia-smi
```

Confirm output is displayed and the CUDA version is visible:

![image](https://github.com/jianchang512/pyvideotrans/assets/3378335/71f1d7d3-07f9-4579-b310-39284734006b)

If both commands produce output, CUDA is installed correctly and can be used for acceleration. Otherwise, reinstall.
