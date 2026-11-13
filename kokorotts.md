---
title: Kokoro TTS Project
date: 2024-01-22 14:33:00
description: A web UI and API project for Kokoro TTS, supporting 8 languages Chinese, English, Japanese, French, Italian, Portuguese, Spanish, and Hindi
---

## Kokoro TTS Voice Channel

**What is it?**

Kokoro TTS is a lightweight voice synthesis project supporting 8 languages: Chinese, English, Japanese, French, Italian, Portuguese, Spanish, and Hindi. It provides a web interface and API endpoints.

**Advantages:**
- Supports 8 languages
- Web interface for previewing audio
- Compatible with OpenAI API format
- Lightweight and fast to start

![Kokoro TTS Web interface](https://pvtr2.pyvideotrans.com/img/pre.jpg)

## Project Information

- Repository: https://github.com/jianchang512/kokoro-uiapi
- Default UI address after starting: `http://127.0.0.1:5066`
- Supports dubbing for text and SRT subtitles
- Supports online preview and download
- Supports subtitle alignment

## Installation

### Windows Users

1. Download the package: https://github.com/jianchang512/kokoro-uiapi/releases/v0.1
2. Extract and double-click `start.bat` to launch
3. For GPU acceleration, make sure you have an NVIDIA GPU with CUDA 12 installed

### Linux/macOS Users

**Prerequisites:**
- Python 3.8+ (3.10-3.11 recommended)
- ffmpeg installed:
  - Linux: `apt install ffmpeg` or `yum install ffmpeg`
  - macOS: `brew install ffmpeg`

**Installation Steps:**

```bash
# 1. Clone the repository
git clone https://github.com/jianchang512/kokoro-uiapi

# 2. Create and activate a virtual environment
cd kokoro-uiapi
python3 -m venv venv
source venv/bin/activate

# 3. Install dependencies
pip3 install -r requirements.txt

# 4. Start
python3 app.py
```

## Using It in pyVideoTrans

### Step 1: Start Kokoro TTS

- Windows package: double-click `start.bat`
- Source install: run `python3 app.py`

### Step 2: Configure pyVideoTrans

1. Upgrade pyVideoTrans to v3.48+ or later
2. Go to **Menu → TTS Settings → Kokoro TTS**
3. In the HTTP address field, enter: `http://127.0.0.1:5066`
4. Click the test button to verify the connection
5. Save the settings

![Enter Kokoro TTS address](https://pvtr2.pyvideotrans.com/img/kokoro01.jpg)

### Step 3: Start Dubbing

1. Return to the main interface
2. Select `Kokoro TTS` from the **Voice Channel** dropdown
3. Choose the target language and voice
4. Click the dubbing button to start

## OpenAI API Compatibility

Kokoro TTS's API is compatible with the OpenAI TTS format, so you can use the OpenAI SDK to call it.

### API Details

- Endpoint: `http://127.0.0.1:5066/v1/audio/speech`
- Method: `POST`
- Content-Type: `application/json`

### Request Parameters

```json
{
    "input": "Text to synthesize",
    "voice": "Voice name",
    "speed": 1.0
}
```

### OpenAI SDK Example

```python
from openai import OpenAI

client = OpenAI(
    api_key='123456',
    base_url='http://127.0.0.1:5066/v1'
)

try:
    response = client.audio.speech.create(
        model='tts-1',
        input='Hello, my dear friends',
        voice='zf_xiaobei',
        response_format='mp3',
        speed=1.0
    )
    with open('./test_openai.mp3', 'wb') as f:
        f.write(response.content)
    print("MP3 file saved successfully")
except Exception as e:
    print(f"An error occurred: {e}")
```

## Voice List

### English Voices

```
af_alloy, af_aoede, af_bella, af_jessica, af_kore, af_nicole, af_nova,
af_river, af_sarah, af_sky, am_adam, am_echo, am_eric, am_fenrir,
am_liam, am_michael, am_onyx, am_puck, am_santa, bf_alice, bf_emma,
bf_isabella, bf_lily, bm_daniel, bm_fable, bm_george, bm_lewis
```

### Chinese Voices

```
zf_xiaobei, zf_xiaoni, zf_xiaoxiao, zf_xiaoyi,
zm_yunjian, zm_yunxi, zm_yunxia, zm_yunyang
```

### Japanese Voices

```
jf_alpha, jf_gongitsune, jf_nezumi, jf_tebukuro, jm_kumo
```

### Other Language Voices

- **French**: `ff_siwis`
- **Italian**: `if_sara, im_nicola`
- **Hindi**: `hf_alpha, hf_beta, hm_omega, hm_psi`
- **Spanish**: `ef_dora, em_alex, em_santa`
- **Portuguese**: `pf_dora, pm_alex, pm_santa`

## Proxy/VPN

The source deployment method requires downloading voice pt files from Hugging Face, so you may need to set up a proxy or VPN beforehand.

Alternatively, you can download the models in advance and extract them to the `app.py` directory:
- Model download: https://github.com/jianchang512/kokoro-uiapi/releases/download/v0.1/moxing--jieya--dao--app.py--mulu.7z

## Credits

- [Kokoro-82M](https://github.com/hexgrad/kokoro)
