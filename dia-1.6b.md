---
title: Deploy Dia-1.6B TTS from Source on Windows 10/11
date: 2024-01-22 14:33:00
description: Deploy Dia-1.6B TTS from source on Windows 10/11
---

# Deploy Dia-1.6B TTS from Source on Windows 10/11

> Starting from v3.68, the F5-TTS configuration interface can be used for F5-TTS/Spark-TTS/index-TTS/Dia-TTS simultaneously. You just need to enter the correct URL address (usually http://127.0.0.1:7860 on your local machine) and select the corresponding service from the dropdown list.
>

## 1. Ensure Python 3.10 and Git are Installed

> If Python 3.10 is not installed, [check this tutorial for installation](/en/_posts/pythoninstall).
>
> If Git is not installed, please open the page https://git-scm.com/downloads/win and click `64-bit Git for Windows Setup` to download and install the exe.

## 2. Download the Source Code and Install

Find a folder, type `cmd` in the address bar and press Enter, then execute the following commands in order:
```
git clone https://github.com/nari-labs/dia.git
cd dia
python -m venv .venv
venv\scripts\activate

pip install -e .

```
If no red error messages appear, the installation is complete.

## 3. Enable the WebUI

Navigate to the `dia` folder where you can see the directory containing `app.py`. Type `cmd` in the address bar, then execute `venv\scripts\activate` to activate the virtual environment, followed by the startup command below:

`python app.py`

If no errors occur, open your browser and go to `http://127.0.0.1:7860`.