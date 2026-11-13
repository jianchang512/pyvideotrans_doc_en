---
title: Source Code Deployment / macOS / Linux / Windows
date: 2024-01-22 14:33:00
description: Source code deployment
---

# macOS / Linux / Windows Source Code Deployment

> [It is recommended to use uv for installation. If you don't have uv yet, see the official installation guide.](https://docs.astral.sh/uv/getting-started/installation/)
>
> [Windows users can also follow this guide to install uv and ffmpeg.](https://pyvideotrans.com/blog/uv-ffmpeg)

1. macOS/Linux — Install prerequisite tools

   macOS requires the following commands:
   ```
   brew install libsndfile
   brew install git
   brew install python@3.10
   brew uninstall --ignore-dependencies ffmpeg
   brew tap homebrew-ffmpeg/ffmpeg
   brew install homebrew-ffmpeg/ffmpeg/ffmpeg
   ```

   Linux requires `ffmpeg>=6` — run `sudo yum install -y ffmpeg` or `apt-get install ffmpeg`.

   Windows requires downloading `ffmpeg>=6`. Place `ffmpeg.exe` and `ffprobe.exe` in `app_dir/ffmpeg/`. FFmpeg download URL: https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-full.7z

2. Create a folder without spaces or Chinese characters, enter it in the terminal, then run:
   ```
   git clone https://github.com/jianchang512/pyvideotrans
   cd pyvideotrans
   ```
   > Alternatively, go to https://github.com/jianchang512/pyvideotrans, click the green *Code* button to download the source, extract it, and enter the directory containing `sp.py`.

3. Run `uv sync` to install dependencies. Depending on your network, this may take minutes to tens of minutes. Users in China can use a mirror for faster installation: `uv sync --index https://mirrors.aliyun.com/pypi/simple/`

**Windows: ensure you can connect to github.com, otherwise installation will fail.**

> By default, the `whisper.net` local channel and `webui` are NOT installed. To install everything, run `uv sync --all-extras`.
>
> - To install only `whisper.net`, run `uv sync --extra dotnet`.
> - To install only the WebUI, run `uv sync --extra webui`.

4. Run `uv run sp.py` to open the GUI, or `uv run webui.py` to open the WebUI.

## Notes

- The latest source code is available from the `dev` branch.

- Qwen-TTS/Qwen-ASR and OmniVoice have conflicting `transformers` version requirements (the former requires 4.57.6, the latter >=5.3.0). To make both work, Qwen-TTS/Qwen-ASR were forked and modified. They are now installed from https://github.com/jianchang512/Qwen3-asr and https://github.com/jianchang512/Qwen3-tts. In `pyproject.toml`, the package names are `qwen-tts-pvt` and `qwen-asr-pvt`. To install them individually, run `uv add qwen-tts-pvt` and `uv add qwen-asr-pvt`.
