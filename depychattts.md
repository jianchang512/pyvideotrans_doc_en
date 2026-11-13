---
title: ChatTTS Deployment Guide
date: 2024-01-22 14:33:00
description: ChatTTS Deployment Guide
---

## ChatTTS Deployment Guide

![](https://pvtr2.pyvideotrans.com/images/49c0cea156fee169155c6a79794e8bf8.jpg)

## Windows Pre-packaged Version

1. Download the compressed package from [Releases](https://github.com/jianchang512/chatTTS-ui/releases), extract it, and double-click `app.exe` to use it.

## Source Code Deployment on Linux

1. Set up a Python 3.9+ environment.
2. Create an empty directory `/data/chattts` and execute the command: `cd /data/chattts && git clone https://github.com/jianchang512/chatTTS-ui .`
3. Create a virtual environment: `python3 -m venv venv`
4. Activate the virtual environment: `source ./venv/bin/activate`
5. Install dependencies: `pip3 install -r requirements.txt`
6. If CUDA acceleration is not needed, execute: `pip3 install torch torchaudio`

    If CUDA acceleration is needed, execute:
    ```
    pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu118

    pip install nvidia-cublas-cu11 nvidia-cudnn-cu11
    ```
    Additionally, install the CUDA 11.8 Toolkit. Please search for the installation method yourself.
7. Execute `python3 app.py` to start. It will automatically open a browser window at the default address `http://127.0.0.1:9966`.

## Source Code Deployment on macOS

1. Set up a Python 3.9+ environment and install Git. Execute the command: `brew install git python@3.10`
   Then continue with:
    ```
    export PATH="/usr/local/opt/python@3.10/bin:$PATH"

    source ~/.bash_profile

    source ~/.zshrc
    ```
2. Create an empty directory `/data/chattts` and execute the command: `cd /data/chattts && git clone https://github.com/jianchang512/chatTTS-ui .`
3. Create a virtual environment: `python3 -m venv venv`
4. Activate the virtual environment: `source ./venv/bin/activate`
5. Install dependencies: `pip3 install -r requirements.txt`
6. Install torch: `pip3 install torch torchaudio`
7. Execute `python3 app.py` to start. It will automatically open a browser window at the default address `http://127.0.0.1:9966`.

## Source Code Deployment on Windows

1. Download Python 3.9+. During installation, make sure to select `Add Python to environment variables`.
2. Download and install Git from: https://github.com/git-for-windows/git/releases/download/v2.45.1.windows.1/Git-2.45.1-64-bit.exe
3. Create an empty folder `D:/chattts` and navigate into it. Type `cmd` in the address bar and press Enter. In the opened cmd window, execute the command: `git clone https://github.com/jianchang512/chatTTS-ui .`
4. Create a virtual environment by executing: `python -m venv venv`
5. Activate the virtual environment by executing: `.\venv\scripts\activate`
6. Install dependencies by executing: `pip install -r requirements.txt`
7. If CUDA acceleration is not needed, execute: `pip install torch torchaudio`

    If CUDA acceleration is needed, execute:
    ```
    pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu118
    ```
    Additionally, install the CUDA 11.8 Toolkit. Please search for the installation method yourself.
8. Execute `python app.py` to start. It will automatically open a browser window at the default address `http://127.0.0.1:9966`.

## Common Issues

1. Missing `spk_stat.pt` after downloading the model from modelscope

After downloading the model from modelscope, you might encounter the error: `AssertionError: Missing spk_stat.pt: **/pzc163/chatTTS/asset/spk_stat.pt`

Download `spk_stat.pt` from https://huggingface.co/2Noise/ChatTTS/blob/main/asset/spk_stat.pt and copy it to the `asset` directory to resolve the issue.

2. If you encounter errors on macOS, please try:

`brew install libomp`

3. If prompted "not support python3.12+"

Please downgrade to Python 3.10.