---
title: OmniVoice Deployment and Usage Guide
date: 2024-01-22 14:33:00
description: OmniVoice is an advanced zero-shot multilingual TTS model supporting over 600 languages with high-quality speech generation, excellent inference speed, and voice cloning.
---

**Since v4.05, this TTS service is built-in — no separate deployment or model download needed. The following applies only to versions before v4.05.**
If the initial model download fails, manually open https://huggingface.co/k2-fsa/OmniVoice/tree/main, download all files, and place them in `app_dir/models/models--k2-fsa--OmniVoice/`.

---

# TTS Service: OmniVoice-TTS

## 1. What is OmniVoice

OmniVoice is an advanced zero-shot multilingual TTS model with the following features:

- **Ultra-multilingual support**: 600+ languages
- **High-quality speech**: Natural and fluent voice output
- **Voice cloning**: Clone voice characteristics from reference audio
- **Fast inference**: Excellent inference speed

Since pyVideoTrans v4.05, OmniVoice is built-in — no additional deployment needed.

> OmniVoice open-source repository: https://github.com/k2-fsa/OmniVoice

---

## 2. Prerequisites

| Requirement | Details |
|-------------|---------|
| pyVideoTrans version | ≥ v3.98-0403 |
| OS | Windows (package), Linux/macOS (source) |
| Hardware | NVIDIA GPU recommended (GPU acceleration) |
| Network | First launch downloads model from huggingface.co (mirror or VPN needed in China) |

---

## 3. Windows Package (Recommended for Beginners)

### Download

- Baidu Netdisk: https://pan.baidu.com/s/1e6nHkq69TvUQe5VE02V-eg?pwd=1234
- HuggingFace: https://huggingface.co/mortimerme/repocollect/resolve/main/omnivoice-0528.7z?download=true

### Launch

1. Download the `.7z` file and extract it
2. Double-click `start.bat`
3. Wait for successful startup (confirmed by the following screen):

![](https://pvtr2.pyvideotrans.com/1775195351713_2.png)

> First launch will download the model from the mirror site https://hf-mirror.com by default. The official huggingface.co is not directly accessible from China — a VPN is needed.
>
> ![](https://pvtr2.pyvideotrans.com/1775224670184_image.png)

---

## 4. macOS/Linux Source Deployment

### Step 1: Download Source

1. Go to the [OmniVoice official repository](https://github.com/k2-fsa/OmniVoice)
2. Click the green `<>Code` button, then `Download ZIP`
3. Extract and enter the folder containing `pyproject.toml` (usually inside `OmniVoice-master`)

### Step 2: Install uv

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

> Windows: [Download uv zip](https://releases.astral.sh/github/uv/releases/download/0.11.3/uv-x86_64-pc-windows-msvc.zip), extract and place `uv.exe` alongside `pyproject.toml`.

### Step 3: Install Dependencies

In the folder containing `pyproject.toml`, open a terminal and run:

```bash
uv sync
```

In China, use a mirror:

```bash
uv sync --default-index "https://mirrors.aliyun.com/pypi/simple"
```

### Step 4: Set Model Download Mirror

The model website huggingface.co cannot be accessed directly from China. Set a mirror:

**Windows:**
```bash
set HF_ENDPOINT=https://hf-mirror.com
```

**macOS/Linux:**
```bash
export HF_ENDPOINT=https://hf-mirror.com
```

### Step 5: Launch API

```bash
uv run omnivoice-demo --ip 0.0.0.0 --port 8081
```

---

## 5. Using in pyVideoTrans

### Configuration Steps

1. Open pyVideoTrans
2. Menu → TTS Settings → OmniVoice-URL
3. Enter: `http://127.0.0.1:8081`
4. Below, enter reference audio filenames and their corresponding text

### Reference Audio Format

```
audio_filename.wav#text spoken in the audio
```

**Example**: If you have `nverguo.wav` (clean female voice), place it in the `f5-tts` folder under pyVideoTrans, and enter:

```
nverguo.wav#enter the spoken text here
```

![](https://pvtr2.pyvideotrans.com/1775224521142_image.png)

5. Click "Test" — if OK, save and use.

---

## 6. Using on Google Colab

Open [this URL](https://colab.research.google.com/drive/1Q299nPs6CDHB2y3tiSIDFIcRM2OyP9bR?usp=sharing) to use OmniVoice on Colab:

1. Click "Run All"
2. Wait for a URL like `https://xxxxxxxx.gradio.live` to appear in the last cell
3. Open it in a browser to use
4. Copy the URL to pyVideoTrans → Menu → TTS Settings → OmniVoice-URL

---

## 7. Reference Audio Requirements

| Item | Requirement |
|------|-------------|
| Format | WAV (recommended) |
| Duration | 3~10 seconds (optimal) |
| Content | Clear pronunciation, no background noise |
| Location | `f5-tts` folder under pyVideoTrans root |

> **Source code reference** (`_omnivoice.py`): OmniVoice uses the `/_clone_fn` Gradio API endpoint, supports 60+ language code mappings, and has built-in retry mechanism (tenacity). Also supports OmniVoice-Studio (port 3900) via REST API `/generate` endpoint.

---

## 8. FAQ

### 1. Can't find `pyproject.toml` after source extraction?

After extraction, there's usually an `OmniVoice-master` folder. Open it to see `pyproject.toml` or `pyproject`. All operations must be done inside this folder.

### 2. `uv is not recognized as an internal or external command`?

UV is not installed or not in PATH. Windows: [download uv zip](https://releases.astral.sh/github/uv/releases/download/0.11.3/uv-x86_64-pc-windows-msvc.zip), extract and copy `uv.exe` to the `pyproject.toml` directory.

### 3. Model download is very slow and fails?

Default download from huggingface.co fails in China. Set mirror:

**Windows:** `set HF_ENDPOINT=https://hf-mirror.com`
**macOS/Linux:** `export HF_ENDPOINT=https://hf-mirror.com`

### 4. `uv sync` fails?

Default installation downloads packages from abroad. Use the Alibaba mirror:

```bash
uv sync --default-index "https://mirrors.aliyun.com/pypi/simple"
```

### 5. Still fails with Alibaba mirror?

MSVC environment may be missing. [Install MSVC](/blog/visualstudiocomm).

### 6. How to use OmniVoice directly in a browser for dubbing?

After launching, open http://127.0.0.1:8081 in a browser.

### 7. How to modify startup port and model mirror in the package?

Open `start.bat` with a text editor:
- Delete `set "HF_ENDPOINT=https://hf-mirror.com"` to stop using the mirror
- Change `set "PORT=8081"` to your desired port number
