---
title: Creating a Windows AI Project All-in-One Package from Scratch Using F5-TTS as an Example, You Can Become a Packaging Pro!
date: 2025-03-19 14:57:04
description: This hands-on tutorial teaches you how to create a Windows AI project all-in-one package from scratch, using F5-TTS as an example. Core steps include downloading Python 3.10 embed version, manually installing pip and modifying environment variables, obtaining project source code, installing dependencies (including optional CUDA PyTorch), creating a one-click launch script to specify the model download location, and solving model download issues in restricted network environments. Through a complete walkthrough, even AI beginners can learn to package and share AI applications, becoming packaging pros. Finally, the tutorial extrapolates key techniques for creating packages for other Python-based AI projects.
---

For AI beginners, deploying an AI application from source code can be challenging. An all-in-one package, which only requires downloading, extracting, and double-clicking to use, significantly lowers the barrier to entry. However, sometimes a ready-made package might not be available, or existing packages aren't updated promptly. In such cases, you can try creating your own package and sharing it with others.

> Since AI project models are typically very large, and with GPU support, even when compressed into a 7z file, the size can far exceed 5GB, making it difficult to upload to cloud storage or store. Therefore, I will no longer be creating these packages. If you're interested, you can follow this tutorial to create your own package and share it.

This tutorial uses F5-TTS as an example to create an all-in-one package on Windows 10 using Python 3.10. The main steps are:

1.  **Download the Python 3.10 embed version** (not the exe installer, but a zip archive).
2.  **Install pip** and configure the dependency search path for the project.
3.  **Download the F5-TTS source code**.
4.  **Install F5-TTS's dependency modules**.
5.  **Create a one-click launch script** and set the model directory to be within the project folder.
6.  **Configure a proxy** to download models.
7.  **Perform a cloning task once** to complete the download of other models like Whisper.
8.  **Compress into an all-in-one package**.
9.  **Create packages for other AI projects**

---

## Preparation Before Starting:

First, create an empty folder. To avoid errors, it's recommended to create an English-named folder on a non-system drive, for example, `D:\f5win`.
This article uses `D:\f5win` as an example. Then, create another empty folder `runtime` inside it to store the Python 3.10 embed version files you'll download later.

**Before starting, be sure to click "View" in the folder navigation bar and check "File name extensions". Otherwise, subsequent operations may easily go wrong, especially for those unfamiliar with extensions.**

![Show File Extensions](https://pvtr2.pyvideotrans.com/1742362096642_image.png)

---

## 1. Download the Python 3.10 Embed Version

**Important Note:** Here we download the embed version, not the exe installer. This version does not depend on your local Python environment. Even if you already have Python installed, you still need to download this version.

*   **Download URL:** [https://www.python.org/downloads/release/python-31011/](https://www.python.org/downloads/release/python-31011/)
*   Open the webpage, scroll to the bottom, and click **`Windows embeddable package (64-bit)`** to download. You'll get a zip archive.

    ![Download Python Embed Version](https://pvtr2.pyvideotrans.com/1742360097619_image.png)

    **Be sure to download this version, don't get it wrong!**

*   After downloading, extract the zip archive and copy all the files inside to the `runtime` folder you created earlier. It should look like this:

    ![Python Embed Files Copied to Runtime Folder](https://pvtr2.pyvideotrans.com/1742360433231_image.png)

---

## 2. Install pip and Modify the Package Search Path

The embed version of Python does not include the pip module, so it needs to be installed manually.

*   **Install pip:**
    *   Open this URL: [https://bootstrap.pypa.io/get-pip.py](https://bootstrap.pypa.io/get-pip.py)
    *   Right-click and "Save As" to save the file to the `runtime` directory. After saving, there should be a file named `get-pip.py` in the `runtime` folder.

        ![Download get-pip.py](https://pvtr2.pyvideotrans.com/1742360448904_image.png)
        ![get-pip.py File](https://pvtr2.pyvideotrans.com/1742360472565_image.png)
        ![get-pip.py in Runtime Directory](https://pvtr2.pyvideotrans.com/1742360494176_image.png)

    *   In the address bar of the `runtime` folder, type `cmd` and press Enter to open a terminal window (black window).

        ![Open cmd and confirm the path is inside runtime](https://pvtr2.pyvideotrans.com/1742360600919_image.png)

    *   In the terminal window, type the command `.\python get-pip.py` and press Enter. **Be sure to check** that the current folder address shown in the command line is inside the `runtime` folder, otherwise an error will occur.

        Wait for the installation to complete...

        ![pip Installing](https://pvtr2.pyvideotrans.com/1742360614065_image.png)

        The pip module is successfully installed!

        ![pip Module Installed Successfully](https://pvtr2.pyvideotrans.com/1742360629734_image.png)

*   **Modify the `python310._pth` file:**
    *   In the `runtime` folder, find the file named `python310._pth`, right-click and open it with Notepad.

        ![Default content in python310._pth file](https://pvtr2.pyvideotrans.com/1742360752236_image.png)

    *   On the line below the dot `.` in the second line, add the following three lines:
        ```
        ./Lib/site-packages
        ../src
        ../src/f5_tts
        ```
    *   Save the file. The modified file content should look like this. Please check carefully to ensure it's correct:

        ![Modified python310._pth file content should be as follows](https://pvtr2.pyvideotrans.com/1742363216298_image.png)

---

## 3. Download F5-TTS Source Code

*   Open the F5-TTS project's GitHub repository: [https://github.com/SWivid/F5-TTS](https://github.com/SWivid/F5-TTS)
*   Download the source code zip archive.

    ![Download F5-TTS Source Code](https://pvtr2.pyvideotrans.com/1742361017262_image.png)

*   Extract the downloaded zip file. Copy **all files** from inside the `F5-TTS-main` folder to the `D:\f5win` folder. **Note:** Copy the files inside, not the entire `F5-TTS-main` folder.

    ![Copy Files from F5-TTS-main](https://pvtr2.pyvideotrans.com/1742361126719_image.png)

    After extraction, the contents of the `D:\f5win` folder should look like this:

    ![Correct Directory Structure of D:\f5win After Copying](https://pvtr2.pyvideotrans.com/1742361138303_image.png)

---
**Return to the Previous CMD Window**
> In the same terminal window, execute the `cd ../` command to ensure the address before the command prompt no longer includes `runtime`, changing to the following. Subsequent operations should be performed in the `D:/f5win` directory.

![](https://pvtr2.pyvideotrans.com/1742360938573_image.png)

## 4. Install Dependency Modules

*   Return to the cmd terminal window and confirm again that the current path shown is `D:\f5win` (without `runtime`).
*   Execute the following command to install dependencies (note spaces and the dot):
    ```
    .\runtime\python -m pip install -e .
    ```

    ![Installing Dependencies](https://pvtr2.pyvideotrans.com/1742361239203_image.png)

    Wait for the installation to complete...

![All Dependencies Installed](https://pvtr2.pyvideotrans.com/1742365877802_image.png)


*   **If you want the package to support NVIDIA GPUs (Optional):**
    Continue by executing the following command to install the CUDA version of PyTorch and torchaudio (note spaces and the dot, the command should not be line-wrapped):
    ```
    .\runtime\python -m pip install torch==2.4.0+cu124 torchaudio==2.4.0+cu124 --extra-index-url https://download.pytorch.org/whl/cu124
    ```

---

## 5. Create a One-Click Launch Script

> By default, models are saved to the user directory on the C drive. For packaging convenience, we need to download models inside the package.

*   In the `D:\f5win` folder, right-click -> New -> Text Document to create a `run.txt` file. Open it with Notepad and enter the following code:

![](https://pvtr2.pyvideotrans.com/1742365627762_image.png)


```bat
    @echo off

    chcp 65001 > nul

    set "HF_HOME=%~dp0models"
    set "MODELSCOPE_CACHE=%~dp0models"

    echo HF_HOME: %HF_HOME%
    echo MODELSCOPE_CACHE: %MODELSCOPE_CACHE%

    "%~dp0runtime\python" -m f5_tts.infer.infer_gradio  --inbrowser

    pause
```
> The above script means: save models to the `models` folder in the current directory, then launch the web interface and automatically open it in the browser.

*   After saving the file, rename `run.txt` to `run.bat`. A warning will pop up; select "Yes". **If no warning pops up, it means you modified it incorrectly. Please check if file extensions are displayed.**

    ![Warning Popup When Renaming to run.bat](https://pvtr2.pyvideotrans.com/1742362190709_image.png)

---

## 6. Configure Proxy Environment

Due to network restrictions in some regions, direct access to Hugging Face (huggingface.co), where F5-TTS models are hosted, is not possible. Therefore, you need to configure a proxy environment and set it as the system proxy.

For example, if using a tool like v2ray, you can set it up like this:

![Set as System Proxy in v2ray](https://pvtr2.pyvideotrans.com/1742362853836_image.png)

After configuration, double-click the `run.bat` file you just created.

*   **If double-clicking opens the file directly in Notepad, it means renaming the extension failed. Please go back to the preparation section at the top and follow the instructions to enable file extensions.**
*   If double-clicking opens a black window, it will start downloading models to the `D:\f5win\models` folder.

    ![Downloading Models](https://pvtr2.pyvideotrans.com/1742362951031_image.png)

*   If you encounter an error similar to the one below, it means your proxy environment is not configured correctly, or the system proxy is not set properly, preventing connection to Hugging Face to download models.

    ![Download Model Error: Cannot connect to huggingface.co](https://pvtr2.pyvideotrans.com/1742363094226_image.png)
    
    > Sometimes the download fails halfway. The most common reason is an unstable proxy node. Please switch to a more stable proxy or node.

*   After the models finish downloading, a browser window will automatically open.
    ![Models Downloaded, Browser Opens Automatically](https://pvtr2.pyvideotrans.com/1742363834396_image.png)

---

## 7. Perform a Cloning Task to Download the Whisper Model

When performing voice cloning, if the text corresponding to the reference audio is not provided, F5-TTS will automatically download the Whisper model from Hugging Face. To make the package complete, we need to download it in advance.

*   In the automatically opened web window, select a clean 5-10 second reference audio, input the text you want to synthesize (e.g., "Hello friend"), and click "Synthesize".

    ![Web Interface](https://pvtr2.pyvideotrans.com/1742363930933_image.png)

*   This will start downloading the Whisper model.

    ![Downloading Whisper Model](https://pvtr2.pyvideotrans.com/1742364455801_image.png)

*   When synthesis succeeds without errors, you can start packaging the project into an all-in-one package.

![](https://pvtr2.pyvideotrans.com/1742366963652_image.png)

---

## 8. Compress into an All-in-One Package

*   Before compressing, you can rename `run.bat` to something like `Launch Me.bat` to make it easier for novice users to understand.
*   Compress the entire `D:\f5win` folder into a zip file, or a more space-efficient 7z file.
*   Share the compressed package with others. After they extract it, they can double-click `run.bat` (or `Launch Me.bat`) to use it.

![](https://pvtr2.pyvideotrans.com/1742367192101_image.png)

---

## 9. How to Create Packages for Other AI Projects

Most open-source Python-based projects on GitHub can be packaged using a similar method. The main differences lie in the following three points:

1.  **Python Version:** Python 3.10 is the most universal version, suitable for most projects. If a project has specific requirements (e.g., 3.11 or 3.12), you can find the corresponding version's `Windows embeddable package (64-bit)` on this page: [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/). **Be sure not to download the exe installer.**

2.  **Content of the `python310._pth` file:**
    *   `./Lib/site-packages` is still mandatory.
    *   Add other paths based on the actual project structure.
    *   If the project has a code directory named `cfg`, add a line `../cfg`.
    *   If the project has a `src` directory with other folders inside, continue adding `../src/folder_name`.

3.  **The launch command in the `run.bat` script:**
    *   Only this line needs to be modified:
        ```
        "%~dp0runtime\python" -m f5_tts.infer.infer_gradio  --inbrowser
        ```
    *   The `"%~dp0runtime\python"` part remains unchanged. The part after it should be changed to the corresponding project's launch command (excluding `python`).
    *   If in doubt, you can provide the content of `run.bat` and the target project's launch command to an AI assistant, asking it to generate a new launch script following the pattern of `run.bat`. Remember to tell the AI to use the Python interpreter from within `run.bat`.