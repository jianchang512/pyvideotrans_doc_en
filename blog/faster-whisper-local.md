---
title: The Simplest Speech-to-Text Solution Fully Offline, Free, Secure, and Unlimited!
date: 2025-11-08 14:33:00
description: Zero learning curve, generates subtitles without an internet connection, easy for beginners. A complete illustrated guide to local speech recognition based on
---

If you're looking for a completely free, locally-run, and top-performing speech-to-subtitle tool, you've come to the right place.

![Effect and usage demonstration](https://pvtr2.pyvideotrans.com/1762844849551_stt.gif)

This tutorial will guide you step-by-step through the entire setup process. It's very simple, and even computer novices can handle it easily. Let's get started!

## Part 1: Preparations (Skip this part if you already have uv and ffmpeg)

Before we begin, we need to invite two "little helpers" to your computer: `uv` and `ffmpeg`. Don't worry, it's easy!

### **Step 1: Install uv**

`uv` is like a smart butler. It helps us automatically handle all the complex program configurations; we just need a simple command.

*   **Download Link:**
    Windows users, please download `uv` here:
    `https://github.com/astral-sh/uv/releases/download/0.9.8/uv-x86_64-pc-windows-msvc.zip`

*   **Instructions:**
    1.  After downloading, extract the `uv-x86_64-pc-windows-msvc.zip` archive. You'll see files like `uv.exe`.
    2.  Now, we need to place this "butler" where the system can always find it. Open any folder on your computer, **clear the existing path** in the address bar at the top, then type `%userprofile%\.local\bin` and press Enter.
        ![Enter specific path in file address bar](https://pvtr2.pyvideotrans.com/1762673253425_image.png)
    3.  Copy and paste **all the files** you just extracted (including `uv.exe`) into this newly opened folder.
        ![Paste uv.exe files into the specified path](https://pvtr2.pyvideotrans.com/1762673298235_image.png)

*   **Tip:** This step is to let the computer "remember" where `uv` is, so we can use it directly from anywhere in the future!
*   *(If you are a Mac user, it's even simpler. Just run `wget -qO- https://astral.sh/uv/install.sh | sh` in the terminal.)*

### **Step 2: Install ffmpeg**

`ffmpeg` is a versatile tool for processing audio and video. Our program needs it to read any audio or video files you upload.

*   **Download Link:**
    Windows users, please download `ffmpeg` here:
    `https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-full.7z`

*   **Instructions:**
    1.  After downloading, extract the `ffmpeg-release-full.7z` archive.
    2.  Enter the extracted folder (name similar to `ffmpeg-x.x.x-full_build`), and find the `bin` folder inside.
    3.  In the `bin` folder, you'll see an `ffmpeg.exe` file. **Copy** it.
    4.  Paste this `ffmpeg.exe` file into **the same folder** where we stored `uv.exe` earlier (i.e., the `%userprofile%\.local\bin` folder).

*   *(If you are a Mac user, it's also simple. Run `brew install ffmpeg` in the terminal.)*

### What if uv or ffmpeg is still not found?

> Open a new cmd window and type `uv`. If it says not found, it means `%userprofile%/.local/bin` is not in the environment variables.

Click the "Start Menu" in the bottom left corner, find "Command Prompt", right-click --> More ---> Run as administrator. Paste this command and press Enter to execute:

`reg add "HKCU\Environment" /v Path /t REG_EXPAND_SZ /d "%PATH%;%USERPROFILE%\.local\bin" /f`

![](https://pvtr2.pyvideotrans.com/1762845015239_path.gif)

**Excellent!** The most crucial preparations are complete. You only need to install these two tools once, and you won't have to worry about them again.

## Part 2: Download the Program and Model

Now, let's download the transcription tool itself.

### **Step 1: Download the Main Program**

*   **Download Link:** `https://pyvideotrans.com/stt.7z` (approx. 600KB)

*   **Instructions:**
    1.  Click the link above to download the `stt.7z` archive.
    2.  Extract it to a location you prefer, such as the desktop. After extraction, you'll get a folder named `models`, and files `app.py` and `index.html`.
        ![](https://pvtr2.pyvideotrans.com/1762800336864_image.png)

### **Step 2: Download the Core Model**

The model is the "brain" of this tool, responsible for recognizing speech.

*   **Download Model (Inside China):** `https://hf-mirror.com/dropbox-dash/faster-whisper-large-v3-turbo/resolve/main/model.bin?download=true`
*   **Download Model (Outside China):** `https://huggingface.co/dropbox-dash/faster-whisper-large-v3-turbo/resolve/main/model.bin?download=true`
*   **Instructions:**
    1.  Click the link to download the `model.bin` file (file size 1.6G, please be patient).
    2.  After downloading, move it into the program folder we just extracted. The specific path is: enter the program folder -> enter the `models` folder -> enter the `turbo` folder, then place the `model.bin` **inside this `turbo` folder**.
![](https://pvtr2.pyvideotrans.com/1762801398027_image.png)

## Part 3: Launch and Use

1.  Open the program folder we extracted earlier.
2.  In the address bar at the top of the folder, **clear all content**, type `cmd`, and press Enter. This will open a black command window.
3.  In the black window, type the following command and press Enter:
    ```
    uv run app.py
    ```
    ![](https://pvtr2.pyvideotrans.com/1762703986708_image.png)
4.  Wait a moment. When the window displays information similar to the following, it means the service has started successfully!
    ![](https://pvtr2.pyvideotrans.com/1762800099472_image.png)

5.  Simultaneously, your default browser will automatically open a new page. This is the interface of our speech transcription tool!
    ![](https://pvtr2.pyvideotrans.com/1762800084113_image.png)

Now, you can click or drag your audio/video files onto it, adjust parameters, and then click "Submit Transcription" to experience it! Enjoy!