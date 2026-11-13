---
title: MegaTTS3 The Semi-Open-Source Voice Cloning Powerhouse - Hard to Install, Harder to Use? A Step-by-Step Guide from Zero to Mastery
date: 2025-03-18 15:33:00
description: This tutorial provides a detailed installation and usage guide for MegaTTS3 (ByteDance's Chinese/English voice cloning project) on Windows systems, addressing issues like sparse official documentation and installation difficulties. It offers step-by-step instructions for creating and configuring a virtual environment using Miniconda, downloading and placing the source code, installing dependencies (with special notes for Windows and modifications to requirements.txt), downloading pre-trained models (requires VPN), and optionally installing GPU acceleration support. It explains the "semi-open-source" nature of MegaTTS3, which restricts cloning to specific voice files provided by the official team. The guide details how to download usable voice files (.wav and corresponding .npy files) from Google Drive and demonstrates uploading voice files, inputting text, and synthesizing speech via the Web UI. The process for users to submit their own voice files for official review and potential inclusion is also covered.
---

MegaTTS3 is an open-source Chinese/English voice cloning project from ByteDance with impressive results. However, the official installation documentation is somewhat brief, and many users have reported difficulties installing it, especially on Windows. This tutorial aims to help you overcome these hurdles and successfully install and use MegaTTS3 on Windows.

Before we begin, let's clarify a few basic concepts used throughout this tutorial:

*   **CMD Console (Command Prompt)**:
    *   How to open: In the address bar of the folder you want to work in (e.g., `D:/python/megatts3`), delete the current path, type `cmd`, and press Enter. ![Open CMD Console](https://pvtr2.pyvideotrans.com/1743753694409_image.png)
    *   Purpose: A black window will pop up; this is the CMD console. All **commands** mentioned in this tutorial are entered and executed here by pressing Enter.
 ![CMD Console Example](https://pvtr2.pyvideotrans.com/1743753710261_image.png)
*   **Executing Commands**:
    *   Type a specific line of text (the "command") into the CMD console and press Enter.

---

## Initial Installation & Configuration

> **Strong Recommendation**: Use `Miniconda` to deploy MegaTTS3 on Windows to avoid many unnecessary issues. This tutorial is based on `Miniconda`.
> **Example Path**: This tutorial assumes your working directory (where MegaTTS3 is installed) is `D:/python/megatts3`. If your path is different, modify the paths in the commands accordingly.

### Step 1: Install Miniconda

1.  **Download Miniconda**:
    *   Visit in your browser: `https://www.anaconda.com/download/success#miniconda`
    *   Find the `Miniconda Installers` section on the page and click the download link.
 ![Click Download in the Miniconda Installers Section](https://pvtr2.pyvideotrans.com/1743752722653_image.png)

2.  **Install Miniconda**:
    *   Double-click the downloaded `.exe` installer.
    *   Click `Next` through the steps, and click `I Agree` on the license agreement page.
 ![Click Next](https://pvtr2.pyvideotrans.com/1743752841320_image.png)
    *   **Crucial Step**: During the installation options, **you must check the second checkbox: "Add Miniconda3 to my PATH environment variable"**. Ignore the red warning text next to it; please check it.
 ![Check the First and Second Checkboxes](https://pvtr2.pyvideotrans.com/1743752888140_image.png)
    *   Continue clicking `Next` or `Install` until the installation is complete.

### Step 2: Download MegaTTS3 Source Code

1.  **Visit the Official Repository**:
    *   Open the URL `https://github.com/bytedance/MegaTTS3`

2.  **Download the Code**:
    *   Click the green `<>Code` button, then select `Download ZIP`.
    *   ![Click Download ZIP to Download the Archive](https://pvtr2.pyvideotrans.com/1743753384301_image.png)

3.  **Extract and Place Files**:
    *   Extract the downloaded `MegaTTS3-main.zip` file.
    *   **Copy all** files and subfolders **inside** the extracted `MegaTTS3-main` folder to your prepared working directory, e.g., `D:/python/megatts3`.
 ![All Files Inside the Second Layer of the Archive](https://pvtr2.pyvideotrans.com/1743753622565_image.png)
    *   After copying, the `D:/python/megatts3` folder should contain folders like `assets`, `checkpoints`, `tts`, etc.
![Correct File List After Extraction and Copying](https://pvtr2.pyvideotrans.com/1743757823897_image.png)

### Step 3: Create and Activate a Virtual Environment

1.  **Open CMD Console**:
    *   Navigate to your working directory `D:/python/megatts3`.
    *   Type `cmd` in the address bar and press Enter.
     ![Open CMD Console](https://pvtr2.pyvideotrans.com/1743753694409_image.png)

2.  **Create Virtual Environment**:
    *   In the CMD console, enter the following command to create an environment named `megatts3env` using Python 3.10:
 ```bash
conda create -n megatts3env python=3.10
```
 ![Execute Command to Create Virtual Environment](https://pvtr2.pyvideotrans.com/1743754961227_image.png)
During installation, if prompted with `Proceed ([y]/n)?`, type `y` and press Enter.
![Type y, then Enter](https://pvtr2.pyvideotrans.com/1743753768973_image.png)

3.  **Activate Virtual Environment**:
    *   After creation, enter the following command to activate the environment (**you must execute this step to activate the virtual environment every time before running MegaTTS3**):
```bash
conda activate megatts3env
```
![Activate Environment](https://pvtr2.pyvideotrans.com/1743753846907_image.png)

Upon successful activation, the command prompt will display `(megatts3env)` at the beginning.

 ![After Activation, (megatts3env) Appears at the Start](https://pvtr2.pyvideotrans.com/1743753856760_image.png)


**Note: All following installation and run commands must be executed in a CMD console where the `(megatts3env)` environment is activated!**

### Step 4: Install Dependencies

> **Special Note**: Installing directly according to the official repository documentation on Windows will typically fail. Please strictly follow the order below.

1.  **Install pynini**:
    *   In the **activated** CMD console, enter and execute:
        ```bash
        conda install -y -c conda-forge pynini==2.1.5
        ```
    *   Wait for the command to complete.

2.  **Install WeTextProcessing 1.0.3**:
    *   Continue in the CMD console and execute:
        ```bash
        pip install WeTextProcessing==1.0.3
        ```
    *   Wait for the command to complete.

3.  **Modify requirements.txt and Install Remaining Dependencies**:
    *   Open the `requirements.txt` file in your working directory (`D:/python/megatts3`) with Notepad or another text editor.
    *   Find and **delete** the line containing `WeTextProcessing==1.0.4.1`.
    *   Save and close the file.
    *   Return to the CMD console and execute the following command to install the remaining dependencies:
        ```bash
        pip install -r requirements.txt
        ```
        
![You Must Delete This Line, Otherwise It Will Definitely Error](https://pvtr2.pyvideotrans.com/1743779797048_image.png)


4.  **Set Environment Variable**:
    *   Copy the entire line below, paste it into the CMD console, and press Enter to execute. **Note**: If your installation directory is not `D:/python/megatts3`, modify the path in the command to your actual path.
        ```bash
        conda env config vars set PYTHONPATH="D:/python/megatts3;%PYTHONPATH%"
        ```
    *   After successful setting, you need to **close the current CMD window, then open a new CMD window, and reactivate the environment `conda activate megatts3env`** for the environment variable to take effect.

**Check**: If none of the above steps produced errors (ignore yellow WARN messages), the dependency environment is successfully installed. If you encounter red errors, carefully check if you followed the order precisely, especially whether you correctly modified the `requirements.txt` file.

![Installation Complete](https://pvtr2.pyvideotrans.com/1743755237234_image.png)

### Step 5: Download Pre-trained Models

> **Hint**: Model files are hosted on Hugging Face Hub, which is inaccessible from within China without a VPN.

*   Ensure your CMD console is in the **activated** `(megatts3env)` state.
*   Execute the following command to download the model files to the `checkpoints` folder in your working directory:
    ```bash
    huggingface-cli download ByteDance/MegaTTS3 --local-dir ./checkpoints --local-dir-use-symlinks False
    ```
*   Wait patiently for the download to complete.
![Model Downloading](https://pvtr2.pyvideotrans.com/1743758193908_image.png)

### Step 6: (Optional) Add GPU Acceleration Support

> If your computer has an **NVIDIA GPU** and **CUDA 12.x** is installed, you can install the GPU version to accelerate speech synthesis.

*   Ensure the CMD console is activated `(megatts3env)`.
*   Execute the following command:

```bash
    pip install --force-reinstall torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu126
```

That's it! All installation and configuration work is now complete!

---

## Launching the MegaTTS3 Web Service

> You need to follow these steps to launch MegaTTS3 every time you want to use it.

1.  **Open CMD Console**:
    *   Navigate to your MegaTTS3 working directory (e.g., `D:/python/megatts3`).
    *   Type `cmd` in the address bar and press Enter.

2.  **Activate Virtual Environment**:
    *   Execute the command: `conda activate megatts3env`
 ![Activate Environment Before Launching](https://pvtr2.pyvideotrans.com/1743758360015_image.png)

3.  **(Recommended) Modify Gradio Listening Address**:
    *   **Strongly recommended before the first launch**: Open the file `D:\python\megatts3\tts\gradio_api.py` with a code editor or Notepad.
    *   Scroll to the end of the file, find `server_name="0.0.0.0"` and change it to `server_name="127.0.0.1"`.
    *   **Reason**: Using `0.0.0.0` on Windows may cause numerous irrelevant error messages and even launch failures. Changing it to `127.0.0.1` is generally more stable.
    *   Save the file after modification.
    
![Change 0.0.0.0 to 127.0.0.1](https://pvtr2.pyvideotrans.com/1743779994312_image.png)


![After Correct Modification](https://pvtr2.pyvideotrans.com/1743780020816_image.png)



4.  **Launch the Program**:
    *   In the activated CMD console, execute:
        ```bash
        python tts/gradio_api.py
        ```
   *   If successful, you will see output in the CMD console similar to below, indicating the service is running:
![Screen After Successful Launch](https://pvtr2.pyvideotrans.com/1743775458565_image.png)     

5.  **Access the Web Interface**:

    *   Open this address in your browser: `http://127.0.0.1:7929`.
 ![Open in Browser](https://pvtr2.pyvideotrans.com/1743775553395_image.png)

---

## Using MegaTTS3 for Voice Cloning

### Understanding Voice Source

MegaTTS3 is currently a **"semi-open-source"** project. This means you **cannot** clone arbitrary voice samples you provide. You **can only** use voices (latents) that have been pre-processed and published by ByteDance on a specific page.

*   **Official Explanation**: This is done for security and legal/regulatory reasons.
*   **If you want to clone your own voice**: You need to submit your audio following the official method, wait for their review and placement on the Latents page, and then download it for use. (Specific method detailed below)

### Downloading Usable Voice Files

1.  **Access the Google Drive Folder**:
    *   You need a VPN to access Google services and a Google account (free to register if you don't have one).
    *   Open the URL (i.e., the latents page): `https://drive.google.com/drive/folders/1QhcHWcy20JfqWjgqZX1YM3I6i9u4oNlr`
    *   There are three subfolders here (`librispeech_testclean_40`, `official_test_case`, `user_batch_1-3`) containing all currently available voices.

2.  **Select and Download Files**:
    *   Enter any folder, browse the `.wav` audio files, listen, and select the voice you want to clone (right-click on a wav file -> Open with -> Preview to listen).
![Enter Folder and Select Desired Voice to Clone](https://pvtr2.pyvideotrans.com/1743774978155_image.png)
![Right-click wav file -> Open with -> Preview to listen](https://pvtr2.pyvideotrans.com/1743780255790_image.png)
    *   **Important**: When you decide to download a `.wav` file (e.g., `speaker_xxx.wav`), **you must also download the `.npy` file with the same name** (i.e., `speaker_xxx.npy`). These two files are paired and both are required.
 ![After Downloading a wav, You Must Also Download the Same-Name npy File](https://pvtr2.pyvideotrans.com/1743775050834_image.png)
    *   Save the downloaded `.wav` and `.npy` files on your computer.

### Synthesizing Speech in the Web Interface

1.  **Open the Web Interface**:
    *   Ensure the MegaTTS3 service is running and open `http://127.0.0.1:7929` in your browser.

2.  **Upload Voice Files**:
    *   Find the upload area on the page.
    *   Click the "Upload.wav" area and select the `.wav` file you just downloaded.
    *   Click the "Upload.npy" area and select the `.npy` file with the same name as the `.wav` file. ![Web Interface Usage](https://pvtr2.pyvideotrans.com/1743775747414_image.png)

3.  **Input Text and Synthesize**:
    *   In the "Input Text" box, enter the Chinese or English text you want this voice to speak.
    *   Click the "Submit" button to execute.

4.  **Get Results**:
    *   Wait a short while; synthesis happens in the background.
    *   Once complete, you can directly play the generated speech in the top-right corner or find the download button to save it as an audio file.
    
    
Congratulations! You have now successfully installed and used MegaTTS3 for voice cloning on Windows!


## Submitting Your Own Voice for Cloning

If the voice you wish to clone is not available, you can submit it yourself.

1.  First, convert the audio file of the voice you want to clone to WAV format. The duration should not exceed 24 seconds; 5-24 seconds is recommended.
2.  The audio content must be legal, not infringe copyright, have no background noise, be clearly pronounced, and feature a single speaker.
3.  Open this URL: `https://drive.google.com/drive/folders/1gCWL1y_2xu9nIFhUX_OW5MbcFuB7J5Cl`, drag and drop your prepared WAV file inside, and wait for review and approval before it becomes usable.

![Drag and Drop Upload](https://pvtr2.pyvideotrans.com/1743780628188_image.png)

> After ByteDance's approval, they will create a corresponding `.npy` file with the same name. Both the `.wav` and `.npy` files will be placed in the `user_batch_1-3` folder on the aforementioned `latents` page. You can then download this `.wav` file and its corresponding `.npy` file for cloning.