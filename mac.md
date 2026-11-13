---
title: Deploying Video Translation Software from Source on MacOS
date: 2024-01-22 14:33:00
description: On MacOS, install python3 and ffmpeg using brew. If your Mac doesn't support the brew command, you'll need to install Homebrew first.
---
## Installing Dependencies in Advance

On MacOS, install ffmpeg using brew. If your Mac doesn't support the brew command, you'll need to install Homebrew first.

Use this command to install Homebrew: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

The above command requires a stable internet connection via a VPN to execute successfully. If it fails, use the command below:

`/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"`

Open a terminal and run the following command: `brew install ffmpeg libsndfile git`

Make sure everything runs without errors, then proceed below.

## Downloading and Extracting Source Code

1. It's recommended to use `uv` for installation. If you don't have `uv` yet, run the following command to install it:

`curl -LsSf https://astral.sh/uv/install.sh | sh`

2. Download the source code by running the following commands:
   ```
   git clone https://github.com/jianchang512/pyvideotrans
   cd pyvideotrans
   ```

3. Run the command `uv sync` to install modules. Depending on your network, this may take several minutes to over ten minutes. Users in mainland China can use a mirror to speed up the installation with the command: `uv sync --index https://mirrors.aliyun.com/pypi/simple/`

> By default, qwen-tts, qwen-asr, moss-tts, and chatterbox local channels are not installed. If needed, run `uv sync --all-extra`.

4. Run the command `uv run sp.py` to open the software interface.

## How to Open the Software Again

Each time you open the software, navigate to the software directory in a terminal within the folder, then run the command `uv run sp.py` to launch the software.