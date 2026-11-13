---
title: Linux Source Code Deployment
date: 2024-01-22 14:33:00
description: It is recommended to use `miniconda` for installation and deployment on Linux to avoid many environmental issues.
---
## Linux Source Code Deployment

1. Install ffmpeg. On CentOS, run `yum install ffmpeg`; on Ubuntu, run `apt-get install ffmpeg`.
2. It is recommended to use uv for installation. If you do not have uv yet, install it by running the command `curl -LsSf https://astral.sh/uv/install.sh | sh`.
3. Download the source code by executing the following commands:

    ```
    git clone https://github.com/jianchang512/pyvideotrans
    cd pyvideotrans
    ```

4. Run the command `uv sync` to install the modules. Depending on your network conditions, this may take several minutes to over ten minutes. Users in mainland China can use a mirror to speed up the installation with the command: `uv sync --index https://mirrors.aliyun.com/pypi/simple/`.

> By default, local channels for qwen-tts, qwen-asr, moss-tts, and chatterbox are not installed. If needed, run `uv sync --all-extra`.

5. Run the command `uv run sp.py` to open the software interface.

**To use CUDA acceleration, execute the following commands respectively:**

> Example

```
uv remove torch torchaudio

uv add --reinstall torch torchaudio --index-url https://download.pytorch.org/whl/cu126

uv add nvidia-cublas-cu12 nvidia-cudnn-cu12
```