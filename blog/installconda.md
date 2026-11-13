---
title: How to Install Miniconda and Configure an AI Software Environment on Windows 10
date: 2025-03-13 18:02:11
description: This tutorial provides a detailed guide for Windows 10 users on installing Miniconda and configuring an AI software environment. It covers downloading Miniconda from the official source, installation steps (highlighting the crucial step of adding it to the PATH environment variable to avoid 'command not found' errors), checking the installation via command line, and creating and activating a Python 3.10 virtual environment. The tutorial also explains how to install single modules using pip within the virtual environment and how to batch-install dependencies via a requirements.txt file. It lists common pip commands and solutions for frequent issues like network and permission errors. The goal is to help AI beginners with zero experience quickly set up the foundational environment needed to run AI programs.

---

Miniconda is a lightweight version of Anaconda that helps you quickly install Python and various packages. It's more suitable for beginners running AI programs than the full Anaconda distribution.

This tutorial will guide you step-by-step through installing Miniconda on Windows 10, using the official download link, configuring a Python 3.10 environment, and installing some common modules. Don't worry, even if you have no prior experience, you can easily get it done!

---

## Step 1: Download and Install Miniconda

1. **Download Miniconda**
   - Open your browser, enter this URL, and press Enter:
     **[https://www.anaconda.com/download/success#miniconda](https://www.anaconda.com/download/success#miniconda)**
   - Scroll down to the "Miniconda" section, click the download link for Windows, or use this direct link:
     **[https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe](https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe)**
![](https://pvtr2.pyvideotrans.com/1741858490861_image.png)

   - The file will be saved to your "Downloads" folder (e.g., `C:\Users\YourUsername\Downloads`), with a filename like `Miniconda3-latest-Windows-x86_64.exe`.

2. **Install Miniconda**
   - Double-click the downloaded file to open the installer window.
   - Click "Next", then agree to the license terms (click "I Agree").
![](https://pvtr2.pyvideotrans.com/1741858543784_image.png)

   - **Important:** On the "Advanced Options" page, check the box for **Add Miniconda3 to my PATH environment variable**. This allows you to use the `conda` command directly. Otherwise, you will encounter the error: `'conda' is not recognized as an internal or external command, operable program or batch file.`
![](https://pvtr2.pyvideotrans.com/1741858681423_image.png)
    - Note: Some computers might warn that adding to PATH is not recommended. Ignore this warning and check the box. This is a common pitfall for beginners; if you don't check it, the commands won't work later.

![](https://pvtr2.pyvideotrans.com/1741858751173_image.png)

   - Click "Install", wait a few minutes for the process to complete, then click "Finish".

---

## Step 2: Check Installation and Create a Python 3.10 Virtual Environment

1. **Open the Command Line Terminal (CMD)**
   - Press the Windows key + R on your keyboard to open the "Run" dialog.
   - Type `cmd` and press Enter to open the black command line window.

2. **Check if Miniconda is Installed Successfully**
   - In the command line, type: `conda --version`
     Press Enter. If you see something like `conda 25.1.1`, the installation was successful.

![](https://pvtr2.pyvideotrans.com/1741859714241_image.png)

If it says "'conda' is not recognized...", it means the environment variable wasn't added. Reinstall and make sure to check **Add Miniconda3 to my PATH environment variable**.
![](https://pvtr2.pyvideotrans.com/1741859759865_image.png)

3. **Create a Python 3.10 Virtual Environment**
   - In the command line, type: `conda create -n myai python=3.10`
   - `myai` is the name of the environment, which you can change (e.g., `ai_env`).
![](https://pvtr2.pyvideotrans.com/1741859804821_image.png)
   - After pressing Enter, the system will download Python 3.10 and some base packages. It will ask for confirmation "Y/N". Type `y` and press Enter to continue the installation.

![](https://pvtr2.pyvideotrans.com/1741859833599_image.png)

4. **Activate the Virtual Environment**
   - Type: `conda activate myai`
     Press Enter. If you see `(myai)` appear at the beginning of the command line prompt, you have successfully entered the environment.

![](https://pvtr2.pyvideotrans.com/1741859933246_image.png)

5. **Common Virtual Environment Commands**
   - **Deactivate the environment**: Type `conda deactivate` and press Enter. The `(myai)` prefix will disappear.
   - **View all environments**: Type `conda env list` to see a list of environments you've created.
   - **Delete an environment** (if you no longer need it): Type `conda env remove -n myai`.

---

## Step 3: Use pip to Install Modules and requirements.txt

1. **Ensure You Are in the Virtual Environment**
   - Type `conda activate myai` and confirm that `(myai)` is present in the command line prompt.

2. **Install a Common Module for Testing**
   - For example, install `numpy` (a mathematical computing tool needed by many AI programs):
     `pip install numpy`
     Press Enter. After download and installation, you can check the version with `python -c "import numpy; print(numpy.__version__)"`.

3. **Install from requirements.txt**
   - If your AI software provides a `requirements.txt` file (listing required packages), copy it to a folder (e.g., a new folder "AIProject" on your desktop).
   - Navigate to that folder, then delete the contents of the folder address bar, type `cmd`, and press Enter to open a terminal window in that location:

![](https://pvtr2.pyvideotrans.com/1741860046149_image.png)

   - Then type:
     `pip install -r requirements.txt`
     Press Enter. This will automatically install all packages listed in the file.

---

## Step 4: Common pip Commands and Troubleshooting Frequent Errors

1. **Common pip Commands**
   - **Check pip version**: `pip --version` to see if it's up-to-date.
   - **Upgrade pip**: If the version is old, type `pip install --upgrade pip`.
   - **List installed packages**: `pip list` to see what's installed.
   - **Uninstall a package**: For example, `pip uninstall numpy` to remove it.

2. **Common Errors and Solutions**
   - **Network Error (Slow download or failure)**:
     - It might be a network issue. Try a few more times, or use a domestic mirror in China to speed up downloads:
       `pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple`
   - **Permission Error (Access Denied)**:
     - Run CMD as an administrator: Right-click the Start menu, select "Command Prompt (Admin)", and try the command again.
![](https://pvtr2.pyvideotrans.com/1741860107200_image.png)

   - **Dependency Conflict (Version incompatibility)**:
     - If prompted about a package conflict, try upgrading pip (`pip install --upgrade pip`) and then reinstalling. If it still doesn't work, ask the software author for recommended versions.
   - **Command Not Recognized**:
     - If `pip` doesn't work, try `python -m ensurepip` followed by `python -m pip install --upgrade pip` to repair it.

---

Now Miniconda is installed, your Python 3.10 environment is configured, and you can install various required packages. If your AI software has run instructions (e.g., `python run.py`), try entering the corresponding command while in the virtual environment (with the `(myai)` prefix active).