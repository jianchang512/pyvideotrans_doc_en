---
title: Speech Denoising Methods
date: 2024-01-22 14:33:00
description: In many speech-related application scenarios, the presence of noise can severely impact performance and user experience. For example
---

### Why is Denoising Necessary?

In many speech-related application scenarios, the presence of noise can severely impact performance and user experience. For example:

-   **Speech Recognition:** Noise reduces the accuracy of speech recognition, especially in low signal-to-noise ratio (SNR) environments.
-   **Voice Cloning:** Noise degrades the naturalness and clarity of synthesized speech based on reference audio.

Speech denoising can help address these issues to a certain extent.

### Common Denoising Methods

Currently, speech denoising technology primarily includes the following methods:

1.  **Spectral Subtraction:** A classic denoising method with a simple principle.
2.  **Wiener Filtering:** This method works well for stationary noise but has limited effectiveness against varying noise.
3.  **Deep Learning:** This is currently the most advanced denoising method. It leverages powerful deep learning models, such as Recurrent Neural Networks (RNN), Convolutional Neural Networks (CNN), and Generative Adversarial Networks (GAN), to learn the complex relationship between noise and speech, achieving more accurate and natural denoising results.

### ZipEnhancer Model: Deep Learning Denoising

This tool is based on the open-source [ZipEnhancer model](https://modelscope.cn/models/iic/speech_zipenhancer_ans_multiloss_16k_base) from Tongyi Lab and provides a user-friendly interface and API, allowing everyone to easily experience the power of deep learning denoising.

[The project is open-source on GitHub](https://github.com/jianchang512/remove-noise)

The core of the ZipEnhancer model is the Transformer network architecture and a multi-task learning strategy. It can not only remove noise but also simultaneously enhance speech quality and eliminate echo. Its working principle is as follows:

*   **Self-Attention Mechanism:** Captures important long-term dependencies within the speech signal, understanding the contextual information of the sound.
*   **Multi-Head Attention Mechanism:** Analyzes speech features from different perspectives, enabling more refined noise suppression and speech enhancement.

### How to Use This Tool?

**Windows Pre-packaged Version:**

1.  Download and extract the pre-packaged version (https://github.com/jianchang512/remove-noise/releases/download/v0.1/win-remove-noise-0.1.7z).
2.  Double-click the `runapi.bat` file. Your browser will automatically open `http://127.0.0.1:5080`.
3.  Select an audio or video file to start denoising.

**Source Code Deployment:**

1.  **Environment Preparation:** Ensure Python 3.10 - 3.12 is installed.
2.  **Install Dependencies:** Run `pip install -r requirements.txt --no-deps`.
3.  **CUDA Acceleration (Optional):** If you have an NVIDIA GPU, you can install CUDA 12.1 to accelerate processing:
    ```bash
    pip uninstall -y torch torchaudio torchvision
    pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
    ```
4.  **Run the Program:** Run `python api.py`.

**Linux System:**

*   You need to install the `libsndfile` library: `sudo apt-get update && sudo apt-get install libsndfile1`.
*   **Note:** Ensure the `datasets` library version is 3.0, otherwise errors may occur. You can check the version using the command `pip list | grep datasets`.

### Interface Preview

![Interface Preview](https://pvtr2.pyvideotrans.com/img/remove-noise.jpg)

### API Usage

**Endpoint:** `http://127.0.0.1:5080/api`

**Request Method:** POST

**Request Parameters:**

*   `stream`: 0 to return an audio URL, 1 to return audio data.
*   `audio`: The audio or video file to be processed.

**Response (JSON):**

*   **Success (stream=0):** `{"code": 0, "data": {"url": "audio_URL"}}`
*   **Success (stream=1):** WAV audio data.
*   **Failure:** `{"code": -1, "msg": "error_message"}`

**Example Code (Python):** (Optimized from the original)

```python
import requests

url = 'http://127.0.0.1:5080/api'
file_path = './300.wav'


# Get audio URL
try:
  res = requests.post(url, data={"stream": 0}, files={"audio": open(file_path, 'rb')})
  res.raise_for_status()
  print(f"Denoised audio URL: {res.json()['data']['url']}")

except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")



# Get audio data
try:
    res = requests.post(url, data={"stream": 1}, files={"audio": open(file_path, 'rb')})
    res.raise_for_status()
    with open("ceshi.wav", 'wb') as f:
        f.write(res.content)
    print("Denoised audio saved as ceshi.wav")

except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")

```