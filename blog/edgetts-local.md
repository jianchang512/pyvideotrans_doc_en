---
title: If You Want a Simple and Free Text-to-Speech Service!
date: 2025-11-08 15:33:00
description: If you've been looking for a simple, free text-to-speech service but couldn't find one, keep reading. You're about to get it build a completely freeunlimited character
---

If you've been looking for a simple, free text-to-speech service but couldn't find one, keep reading. You're about to get it: build a **completely free**, **unlimited character**, text-to-speech service supporting **hundreds of languages and voices** (powered by Microsoft's free TTS service) **on your own computer**.

Look, here is its clean and intuitive interface, with all functions clear at a glance:

![](https://pvtr2.pyvideotrans.com/1762703093250_image.png)

## Step 1: Prepare the "Toolbox"

Before we start, we need to prepare two "tools": `uv` and the TTS service code.

### 1. Download `uv`

`uv` helps us automatically configure and run all the dependencies needed for the project, saving us from complex Python environment setup. With it, everything becomes simple!

*   **Download `uv`:** Visit this link to download the Windows version compressed package:
    `https://github.com/astral-sh/uv/releases/download/0.9.8/uv-x86_64-pc-windows-msvc.zip`

*   **Extract the files:** Extract the downloaded `uv-x86_64-pc-windows-msvc.zip` file. You'll get 3 `.exe` files, the most important one being `uv.exe`.

*   **Place `uv.exe`:** We need to put these files in a special location so you can use the `uv` command directly from any folder.
    1.  Open any folder on your computer.
    2.  Clear the address bar at the top of the folder, then paste and enter `%userprofile%\.local\bin`.
    3.  Press Enter. The system will automatically open a hidden folder named `bin`. ![](https://pvtr2.pyvideotrans.com/1762705782605_image.png)

    4.  Copy the 3 `.exe` files you just extracted (including `uv.exe`) into this `bin` folder.

### 2. Download the "Core Files" for the TTS Service (Only 13kb!)

I've already packaged all the necessary files for you. You just need to download and extract them to a place you can easily find (like creating a new folder on the desktop or the root directory of the D drive, etc.).

*   **Download link:** `https://pyvideotrans.com/edgettsui.zip`

*   **Extract the files:** After extraction, you will see the following 3 files:
    *   `app.py`: This is the "brain" of our TTS service, responsible for handling the speech synthesis logic.
    *   `index.html`: This is the service's "operation interface", the webpage you see in your browser.
    *   `edge_tts.json`: This is a thick "voice menu" that defines all available languages and voice options.

**Please make sure these three "parts" are all in the same folder, neatly placed like this:**

![](https://pvtr2.pyvideotrans.com/1762705240877_image.png)


## Step 2: Start the Service!

Now, it's time to bring your TTS service to life!

1.  **Open the Command Line Window:**
    *   Navigate to the folder where you stored those 3 core files.
    *   Clear the address bar of this folder, type `cmd`, and press Enter.
    *   A black Command Prompt window (also called CMD) will pop up, and it has automatically navigated to your current folder.
    ![](https://pvtr2.pyvideotrans.com/1762703986708_image.png)

2.  **Enter the Startup Command:**
 *   Confirm that the path displayed in the black window is where your code files are located. Then, at the cursor, type our only "startup command" and press Enter: `uv run app.py`
   ![](https://pvtr2.pyvideotrans.com/1762703280423_image.png)

  *   When the black window displays messages like "Server started...", **your default browser will automatically open a page!**
  *   **The first startup will be slightly slower** (it may take tens of seconds or even longer) because `uv` will automatically download and configure the environment needed to run `app.py`. Please be patient.

Congratulations! Your private TTS service is now successfully running on your computer!

## Step 3: How to Use Your TTS Tool?

This TTS interface is designed to be very simple and intuitive; you'll get it at a glance:

![](https://pvtr2.pyvideotrans.com/1762703093250_image.png)

*   **Text Box:** Input or paste the text you want to convert into speech here. If you have long text or subtitle files, you can also click the "Import TXT / SRT File" button to load them directly.
*   **Language and Voice:**
    *   First, select your desired language on the left (e.g., "Chinese Mandarin").
    *   Then, in the dropdown menu on the right, choose your preferred voice character (there are male and female voices with various tones; there's one for you!).
*   **Volume, Speed, Pitch:** Drag these sliders like a sound engineer to adjust to your favorite pronunciation effect.
*   **Start TTS:** Click this big button, wait a moment, and the generated audio will appear with a player below and start playing automatically.
    *   If you are satisfied, you can also click the "Download MP3" button to save this speech to your local drive for later use.

The most considerate feature is that it automatically remembers your last selected language, voice, and slider settings. The next time you open it, it will be your most familiar configuration without needing to reset!



## What if %userprofile%\.local\bin is not in the Environment Variables?
Click the "Start Menu" in the lower left corner, find "Command Prompt", right-click --> More ---> Run as administrator, paste this command, press Enter to execute.

reg add "HKCU\Environment" /v Path /t REG_EXPAND_SZ /d "%PATH%;%USERPROFILE%\.local\bin" /f


## Frequently Asked Questions

*   **Q: How do I close this service?**
    A: Go back to that black Command Prompt window and press the `Ctrl + C` key combination on your keyboard (hold down `Ctrl` and `C` keys simultaneously). The service will stop.

*   **Q: What if I get an error saying `uv` is not a valid command when running the command?**
    A: This means `uv.exe` is not correctly recognized by the system. Please go back to the top of the article and re-check the "1. Install `uv`" section in "Step 1: Prepare". Ensure `uv.exe` has been downloaded and correctly placed in the `%userprofile%\.local\bin` directory.
    
*   **Q: After I close it, how do I open it again next time?**
    A: You can repeat the operations in "Step 2": find the folder, open the `cmd` window, and run `uv run app.py` again.
    If you find this a bit troublesome, you can create a quick launch file:
    1.  In the folder where `app.py` is stored, create a new text document and name it `start.txt`.
    2.  Copy the code below and paste it into the `start.txt` file:
        ```
        @echo off
        call uv run app.py
        
        pause    
        ```
    3.  Save and close `start.txt`. ![](https://pvtr2.pyvideotrans.com/1762706106584_image.png)

    4.  **Change the file extension:** Rename `start.txt` to `start.bat`.
        *   **If you can't see the `.txt` suffix:** You need to first click the `View` tab at the top of the folder, then check the `File name extensions` option on the right. This will allow you to see and modify file extensions. ![](https://pvtr2.pyvideotrans.com/1762705435663_image.png)

        *   After the change, the system will prompt you that "Changing the file extension may make the file unusable." Click "Yes" to confirm. ![](https://pvtr2.pyvideotrans.com/1762705457380_image.png)

    5.  In the future, you just need to double-click this `start.bat` file, and the TTS service will start automatically!
![](https://pvtr2.pyvideotrans.com/1762705492028_image.png)


---

Alright, that's the end of the tutorial!

It's that simple. No complex environment configuration, no payment required, and you have a powerful, free text-to-speech tool.

Go try it out and let your text "speak"!