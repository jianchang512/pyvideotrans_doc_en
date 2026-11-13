---
title: GVS Hard Subtitle AI Extraction
date: 2026-01-20 14:33:00
description: This project utilizes advanced multimodal models like **GLM-4.6V** and **Gemini** to directly "read" text from video frames. It not only boasts extremely high recognition accuracy but also leverages AI's semantic understanding to automatically handle subtitle deduplication, sentence splitting, and timeline alignment.
---

# GVS Hard Subtitle AI Extraction

> Github Source Code: https://github.com/jianchang512/gvs
>
> Pre-packaged Windows Version Download: [Baidu Netdisk](https://pan.baidu.com/s/117h5oE215i0uQwthfoZz_A?pwd=1234) | [github](https://github.com/jianchang512/gvs/releases/download/V1.0/GVS-1.0.7z)

**GVS** is a video hard subtitle extraction tool based on **AI Vision Large Models**.

This project utilizes advanced multimodal models like **GLM-4.6V** and **Gemini** to directly "read" text from video frames. It not only boasts extremely high recognition accuracy but also leverages AI's semantic understanding to automatically handle subtitle deduplication, sentence splitting, and timeline alignment.

> 💡 **Core Concept**: Abandon the cumbersome process of local OCR dictionary correction. Feed video screenshots directly to AI and let AI write the SRT subtitles for you.

## ✨ Core Features

- **🚀 AI-Native Processing**: Uses Zhipu AI (free glm-4.6v-flash model) or Google Gemini for recognition, with strong anti-interference capability and multi-language support.
- **🆓 Free to Use**:
  - Default support for **Zhipu AI**'s `glm-4.6v-flash` series models (**completely free**, use upon registration).
  - Supports **Gemini** free tier models.
- **⚡ Intelligent Batch Processing**: Uses 1 frame per second sampling, packs every 20 frames for sending, reducing API request frequency and avoiding frequent rate limits.
- **🧠 Automatic Deduplication & Concatenation**: Leverages LLM's contextual capabilities to automatically merge consecutive identical subtitles, generating perfect SRT timelines.
- **🖥️ Modern GUI**: Dark-themed interface built with PySide6, supporting drag-and-drop operations and real-time log display.
- **🛠️ Rapid Deployment**: Uses `uv` for dependency management, making environment setup lightning fast.

## 📸 Interface Preview

![](https://pvtr2.pyvideotrans.com/1769096566272_image.png)

## 🛠️ Source Code Deployment Guide

This project recommends using [uv](https://docs.astral.sh/uv/getting-started/installation/) for rapid deployment. Of course, you can also use traditional pip.

### Prerequisites

1.  **FFmpeg**: For video frame extraction.
    *   **Windows**: [Download FFmpeg](https://ffmpeg.org/download.html), extract it, and add the `bin` directory to your system's `Path` environment variable.
    *   **Mac**: `brew install ffmpeg`
    *   **Linux**: `sudo apt install ffmpeg`
    *   *Verification*: Type `ffmpeg -version` in the terminal; no error means success.

2.  **Python 3.10+**

### Method 1: Using uv (Recommended)

If you are a Python developer or prefer a cleaner, isolated environment:

1.  Install uv (if not installed):
    Go to this page to install: https://docs.astral.sh/uv/getting-started/installation/
2.  Clone the project:
    ```bash
    git clone https://github.com/jianchang512/gvs.git
    cd gvs
    ```
3.  Sync dependencies and run:
    ```bash
    # uv will automatically create a virtual environment and install dependencies based on pyproject.toml and uv.lock
    uv sync

    # Run the software
    uv run app.py
    ```

### Method 2: Using pip

```bash
git clone https://github.com/jianchang512/gvs.git
cd gvs

# It's recommended to create a virtual environment first
python -m venv venv
# Windows activation
.\venv\Scripts\activate
# Mac/Linux activation
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
# Or install core libraries manually:
pip install PySide6 Pillow requests
```

## 🔑 API Key Acquisition Guide

This project relies on cloud AI models, requiring an API Key. Both channels below offer free tiers:

### 1. Zhipu AI (Free, Recommended for Chinese Users)
*   **Model**: `glm-4.6v-flash` / `glm-4v-flash`
*   **Cost**: **Free** (Flash models are currently free and open).
*   **How to Get**:
    1. Visit the [Zhipu AI Open Platform](https://bigmodel.cn/usercenter/proj-mgmt/apikeys).
    2. Register an account and complete real-name verification.
    3. Create a new API Key on the "API Keys" page.
    4. Copy the Key and paste it into the software.

### 2. Google Gemini
*   **Model**: `gemini-2.5-flash` / `gemini-3-flash-preview`
*   **Cost**: Provides a free tier (Free Tier), meaning a certain amount of free calls per day.
*   **How to Get**:
    1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey).
    2. Click "Create API key".
    3. Copy the Key and paste it into the software.

## 📖 Usage Instructions

1.  **Start the Software**: Run `app.py`.
2.  **Import Video**: Click the dashed box or directly drag and drop a video file into the software interface.
3.  **Select Region**:
    *   Most movie/TV show subtitles are at the **bottom**.
    *   For short video titles at the top, select **Top**.
    *   If unsure, select **Full Screen** (slightly higher Token consumption, but most stable).
4.  **Configure Service**:
    *   Select a service provider (Zhipu AI or Gemini).
    *   Enter the corresponding API Key (the software saves it automatically; no need to enter it next time).
    *   Select a model (recommended to use models with the `flash` suffix, as they are fast and free/cheap).
5.  **Start Extraction**: Click the "Start Extraction" button.
6.  **View Results**:
    *   After the progress bar completes, the software will automatically create an `output` folder in the current directory.
    *   The SRT subtitle file will be generated in the `output` directory.
    *   Click "Open Output Directory" in the interface to go directly there.

## ⚙️ File Structure

```text
gvs/
├── app.py              # Main program entry point
├── config.json         # User configuration file (auto-generated)
├── api_debug.log       # API request debug log (for troubleshooting AI hallucinations or errors)
├── output/             # Subtitle output directory
├── pyproject.toml      # uv project configuration
└── uv.lock             # uv dependency lock file
```

## 🤝 Secondary Development & Contribution

Pull Requests or Issues are welcome!

### Development Tips
*   **UI Modifications**: The project uses pure code to build the PySide6 interface (no `.ui` files). Please modify the `setup_ui` method in the `MainWindow` class directly.
*   **AI Logic**: Core logic is in the `AIClient` class. To add support for new LLMs (like Claude or OpenAI), please refer to the `_call_zhipu` method for implementation.
*   **Image Processing**: Uses `Pillow` for cropping and compression; logic is in the `crop_image_bytes` function.

## ⚠️ Frequently Asked Questions (FAQ)

**Q: Getting an error "Cannot get video duration" after clicking start?**
A: Please ensure **FFmpeg** is installed on your computer and added to the system environment variables. Restart your computer or terminal and try again.

**Q: Why do recognized subtitles occasionally have typos?**
A: Although AI is powerful, errors can still occur under extremely blurry, stylized text, or highly complex background conditions. It is recommended to use the "Bottom" cropping mode to reduce background interference.

**Q: Getting a "429 Too Many Requests" error mid-task?**
A: This triggers the API rate limit. The software has a built-in retry mechanism and will automatically pause for 10 seconds before retrying. If this occurs frequently, it is recommended to check your API quota or switch models.

## 📜 Open Source License

MIT License. This means you can use, modify, and distribute this project for free, but you must retain the original author's copyright notice.

## Acknowledgements

- requests
- pyside6
- Zhipu AI