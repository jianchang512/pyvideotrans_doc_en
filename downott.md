---
title: Offine-Text-Translate Local Offline Text Translation OTT
date: 2024-01-22 14:33:00
description: Offine-Text-Translate Local Offline Text Translation OTT
---



## Offine-Text-Translate Local Offline Text Translation OTT

Supports multi-language local offline text translation and provides an API interface.

>
>
> This project is a repackaging based on the [open-source project LibreTranslate](https://github.com/LibreTranslate/LibreTranslate). Its purpose is to provide an easy-to-deploy translation API service directly on a local machine, without requiring Docker. It also offers a pre-compiled Windows .exe package that can be used by simply double-clicking, requiring no deployment, making it convenient for beginners and novices.
>
> The first startup requires downloading the model; subsequent runs can be performed offline.
>
> If you wish to use the original LibreTranslate project or deploy it in Docker, please visit https://github.com/LibreTranslate/LibreTranslate
>

# Using the Windows Pre-compiled Package

0. If you cannot access the address https://raw.githubusercontent.com, you must set a proxy address in set.ini: `PROXY=`

You can also download the pre-packaged model from Baidu Netdisk. After extracting it, copy the ".local" folder inside and overwrite it into the root directory of this software. [Click to go to Baidu Netdisk to download](https://pan.baidu.com/s/1h5upbQIQw3LmUU6-3-YRbw?pwd=72bj)

1. [Click to download the Windows pre-compiled package](https://github.com/jianchang512/ott), extract it to an English directory without spaces, and double-click start.exe.

2. The first startup will automatically download the model. After the download is complete, the current API service address and port will be displayed, and it will be ready to use.
(You can also download the pre-packaged model from Baidu Netdisk. After extracting it, copy the ".local" folder inside and overwrite it into the root directory of this software.)

3. You can write your own program to request this API service to replace functions like Baidu Translate, or fill it into some software that requires translation functionality. For example, to use it in the [Video Translation and Dubbing Software](https://github.com/jianchang512/pyvideotrans), fill in the server address and port in the software menu - Settings - OTT (default is http://127.0.0.1:9911).

# Source Code Deployment on Windows

0. First, go to python.org to download and install Python 3.9+ (3.10 is recommended). During installation, carefully check and select the "Add ... Path" checkbox for convenience in subsequent steps.

1. Install the Git client on Windows. [Click to download](https://git-scm.com/download/win). Choose to download the 64-bit Git for Windows Setup. After downloading, double-click to install, following the steps until completion.

2. Create an empty directory, for example, create a directory named "ott" on the D drive. Then enter this directory `D:/ott`. In the folder address bar, type `cmd` and press Enter. In the opened cmd black window, enter `git clone https://github.com/jianchang512/ott .` and press Enter to execute.

3. Create a virtual environment. In the same cmd window, continue by entering the command `python -m venv venv` and press Enter.

>     Note here: If it prompts "python is not recognized as an internal or external command, operable program or batch file", it means the checkbox was not selected during Step 0 installation. Re-double-click the downloaded Python installer, select "Modify", and make sure to select "Add ... Path".
>
>     After reinstalling Python, **you must close the already opened cmd window**; otherwise, the command might still not be found. Then enter `D:/ott`, type `cmd` in the address bar and press Enter, and re-execute `python -m venv venv`.
>

4. After the previous command executes successfully, continue by entering `.\venv\scripts\activate` and press Enter. Then execute `pip install -r requirements.txt --no-deps`. If it prompts "not found version xxx", please change the mirror source to the official pip source or Alibaba Cloud mirror.

5. If you need to enable CUDA acceleration for translation, then continue by executing separately:
    `pip uninstall -y torch`

    `pip install torch==2.1.2 --index-url https://download.pytorch.org/whl/cu121`

6. Set the proxy in set.ini: PROXY=proxy address. For example, if your proxy address is `http://127.0.0.1:10189`, then fill it in as `PROXY=http://127.0.0.1:10189`.

7. Execute the command to start the service: `python start.py`