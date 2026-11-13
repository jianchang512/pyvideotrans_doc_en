---
title: Creating a Windows AI Project All-in-One Package from Scratch Using F5-TTS as an Example, You Can Become an All-in-One Package Master!
date: 2024-01-22 14:33:00
description: This tutorial uses F5-TTS as an example to create an all-in-one package on Windows 10 using Python 3.10. The main steps are as follows
---


For AI beginners, deploying AI software from source code can be challenging. With an all-in-one package, you just need to download, extract, and double-click to use it, greatly lowering the barrier to entry. However, sometimes you might not find a ready-made package, or the package isn't updated promptly. In such cases, you can try creating your own all-in-one package and share it with others.

> Since AI project models are usually very large, and with GPU support, even when compressed into a 7z format, the file size can far exceed 5GB, making it difficult to upload to cloud storage or store locally. Therefore, I will no longer be creating all-in-one packages. If you are interested, you can follow this tutorial to create your own and share it.

This tutorial uses F5-TTS as an example to create an all-in-one package on Windows 10 using Python 3.10. The main steps are:

1.  **Download Python 3.10 embed version** (not the exe installer, but a zip archive).
2.  **Install pip** and configure the dependency search path for the project.
3.  **Download F5-TTS source code**.
4.  **Install F5-TTS dependency modules**.
5.  **Create a one-click launch script** and set the model directory to the project directory.
6.  **Configure a proxy** to download models.
7.  **Perform one cloning task** to complete the download of other models like Whisper.
8.  **Compress into an all-in-one package**.
9. **Create all-in-one packages for other AI projects**


---

## Preparation Before Starting:

First, create an empty folder. To avoid errors, it is recommended to create an English-named folder on a non-system drive, for example, `D:\f5win`.
This article uses `D:\f5win` as an example. Then, create another empty folder `runtime` inside it to store the Python 3.10 embed version files you will download later.

**Before you start, be sure to click "View" in the folder navigation bar, then check "File name extensions". Otherwise, subsequent operations may easily go wrong, especially for those unfamiliar with file extensions.**

![Show File Extensions](https://pvtr2.pyvideotrans.com/1742362096642_image.png)

---

## 1. Download Python 3.10 Embed Version

**Important Note:** Download the embed version here, not the exe installer. This version does not depend on your local Python environment. Even if you already have Python installed on your machine, you still need to download this version.

*   **Download URL:** [https://www.python.org/downloads/release/python-31011/](https://www.python.org/downloads/release/python-31011/)
*   After opening the webpage, scroll to the bottom and click **`Windows embeddable package (64-bit)`** to download. You will get a zip archive.

    ![Download Python Embed Version](https://pvtr2.pyvideotrans.com/1742360097619_image.png)

    **Be sure to download this version, don't get it wrong!**

*   After downloading, extract the zip archive and copy all the files inside to the `runtime` folder you created earlier. As shown below:

    ![Copy Python Embed Files to the runtime Folder](https://pvtr2.pyvideotrans.com/1742360433231_image.png)

---

## 2. Install pip and Modify Package Search Path

The embed version of Python does not include the pip module, so it needs to be installed manually.

*   **Install pip:**
    *   Open this address: [https://bootstrap.pypa.io/get-pip.py](https://bootstrap.pypa.io/get-pip.py)
    *   Right-click and save the file to the `runtime` directory. After saving, there should be a file named `get-pip.py` inside the `runtime` folder.

        ![Download get-pip.py](https://pvtr2.pyvideotrans.com/1742360448904_image.png)
        ![get-pip.py File](https://pvtr2.pyvideotrans.com/1742360472565_image.png)
        ![get-pip.py in the runtime Directory](https://pvtr2.pyvideotrans.com/1742360494176_image.png)

    *   Type `cmd` in the address bar of the `runtime` folder and press Enter to open a terminal window (black window).

        ![Open cmd and confirm the path is inside runtime](https://pvtr2.pyvideotrans.com/1742360600919_image.png)

    *   In the terminal window, enter the command `.\python get-pip.py` and press Enter. **Be sure to note** whether the current folder address displayed in the command line is inside the `runtime` folder, otherwise an error will occur.

        Wait for the installation to complete...

        ![pip Installing](https://pvtr2.pyvideotrans.com/1742360614065_image.png)

        The pip module is successfully installed!

        ![pip Module Successfully Installed](https://pvtr2.pyvideotrans.com/1742360629734_image.png)

*   **Modify the `python310._pth` file:**
    *   Find the file named `python310._pth` inside the `runtime` folder, right-click and open it with Notepad.

        ![Default Content Inside python310._pth File](https://pvtr2.pyvideotrans.com/1742360752236_image.png)

    *   On the line below the dot `.` in the second line, add the following three lines:
        ```
        ./Lib/site-packages
        ../src
        ../src/f5_tts
        ```
    *   Save the file. The modified file content should look like below. Please check carefully to ensure it's correct:

        ![Modified python310._pth File Content Should Be As Follows](https://pvtr2.pyvideotrans.com/1742363216298_image.png)

---

## 3. Download F5-TTS Source Code

*   Open the F5-TTS project's GitHub repository: [https://github.com/SWivid/F5-TTS](https://github.com/SWivid/F5-TTS)
*   Download the source code zip archive.

    ![Download F5-TTS Source Code](https://pvtr2.pyvideotrans.com/1742361017262_image.png)

*   Extract the downloaded zip file, and copy **all files** from inside the `F5-TTS-main` folder to the `D:\f5win` folder. **Note:** Copy the files inside, not the entire `F5-TTS-main` folder.

    ![Copy Files Inside F5-TTS-main](https://pvtr2.pyvideotrans.com/1742361126719_image.png)

    After extraction, the contents of the `D:\f5win` folder should look like the image below:

    ![Correct Directory Structure of D:\f5win After Copying](https://pvtr2.pyvideotrans.com/1742361138303_image.png)

---
**Return to the Previous CMD Window**
> In the same terminal window, execute the `cd ../` command to ensure the address before the command prompt has removed the `runtime` part, becoming as shown below. All subsequent operations should be performed in the `D:/f5win` directory.

![](https://pvtr2.pyvideotrans.com/1742360938573_image.png)

## 4. Install Dependency Modules

*   Return to the cmd terminal window and confirm again that the current path displayed is `D:\f5win` (without `runtime`).
*   Execute the following command to install dependencies (note the spaces and dot):
    ```
    .\runtime\python -m pip install -e .
    ```

    ![Installing Dependencies](https://pvtr2.pyvideotrans.com/1742361239203_image.png)

    Wait for the installation to complete...
    
![All Dependencies Installed](https://pvtr2.pyvideotrans.com/1742365877802_image.png)


*   **If you want the all-in-one package to support NVIDIA GPUs (Optional):**
    Continue by executing the following command to install the CUDA version of PyTorch and torchaudio (note the spaces and dot, the command should not be line-wrapped):
    ```
    .\runtime\python -m pip install torch==2.4.0+cu124 torchaudio==2.4.0+cu124 --extra-index-url https://download.pytorch.org/whl/cu124
    ```

---

## 5. Create a One-Click Launch Script

> By default, models are saved to the user directory on the C drive. For the convenience of packaging, we need to download models inside the all-in-one package.

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

Due to restrictions in the domestic network environment, you cannot directly access Hugging Face (huggingface.co) where the F5-TTS models are located. Therefore, you need to configure a proxy and set it as the system proxy.

For example, if using v2ray, you can set it like this:

![Set as System Proxy in v2ray](https://pvtr2.pyvideotrans.com/1742362853836_image.png)

After configuration, double-click the `run.bat` file you just created.

*   **If double-clicking opens the file directly with Notepad, it means renaming the extension failed. Please return to the preparation section at the top of this article and follow the instructions to enable file extensions.**
*   If double-clicking opens a black window, it will start downloading models to the `D:\f5win\models` folder.

    ![Downloading Models](https://pvtr2.pyvideotrans.com/1742362951031_image.png)

*   If an error similar to the one below appears, it means you haven't configured the proxy environment properly, or haven't correctly set it as the system proxy, preventing connection to Hugging Face to download models.

    ![Download Model Error: Cannot Connect to huggingface.co](https://pvtr2.pyvideotrans.com/1742363094226_image.png)
    
    > Sometimes the download fails halfway. The most common reason is an unstable proxy node. Please switch to a more stable proxy or node.

*   After the models are downloaded, a browser window will automatically open.
    ![Models Downloaded, Browser Opens Automatically](https://pvtr2.pyvideotrans.com/1742363834396_image.png)

---

## 7. Perform One Cloning Task to Download the Whisper Model

During voice cloning, if no corresponding text is provided for the reference audio, F5-TTS will automatically download the Whisper model from Hugging Face. To make the package complete, we need to download it in advance.

*   In the automatically opened web window, select a clean reference audio of 5-10 seconds, enter the text you want to synthesize (e.g., "Hello friend"), then click "Synthesize".

    ![Web Interface](https://pvtr2.pyvideotrans.com/1742363930933_image.png)

*   This will start downloading the Whisper model.

    ![Downloading Whisper Model](https://pvtr2.pyvideotrans.com/1742364455801_image.png)

*   When synthesis succeeds without errors, you can start packaging the project into an all-in-one package.

![](https://pvtr2.pyvideotrans.com/1742366963652_image.png)

---

## 8. Compress into an All-in-One Package

*   Before compression, you can rename `run.bat` to `Click Me to Start.bat` to make it easier for novice users to understand.
*   Compress the entire `D:\f5win` folder into a zip file, or into a smaller 7z file.
*   Share the compressed package with others. They can extract it and double-click `run.bat` (or `Click Me to Start.bat`) to use it.

![](https://pvtr2.pyvideotrans.com/1742367192101_image.png)

---

## 9. How to Create All-in-One Packages for Other AI Projects

Most open-source Python-based projects on GitHub can be packaged into all-in-one packages using a similar method. The main differences lie in the following three points:

1.  **Python Version:** Python 3.10 is the most universal version, suitable for most projects. If a project has special requirements (e.g., 3.11 or 3.12), you can find the corresponding version's `Windows embeddable package (64-bit)` on this page: [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/). **Be sure not to download the exe installer.**

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
    *   The part `"%~dp0runtime\python"` remains unchanged. Change the part after it to the corresponding project's launch command (excluding `python`).
    *   If in doubt, you can give the content of `run.bat` and the target project's launch command to an AI and ask it to provide a new launch script modeled after `run.bat`. Remember to tell the AI to use the Python interpreter from `run.bat`.