---
title: Must-Have Tools uv and ffmpeg!
date: 2025-11-05 15:33:00
description: If you frequently work on AI projects or need to edit videos and extract audio, you must know these two incredibly practical tools.
---

If you frequently work on AI projects or need to edit videos and extract audio, you must know these two incredibly practical tools:

* 🎬 **ffmpeg**: The "Swiss Army knife" of audio and video, capable of editing, transcoding, extracting subtitles, and more—it does it all.
* 🧰 **uv**: A fantastic tool for managing Python environments, letting you run various AI projects with a single command, no manual configuration needed.

Even better, both can be **used directly on Windows**. Just download the `.exe` files, extract them, and they're ready to use—**no installation required, no system clutter**.
Set them up in minutes and instantly turn your computer into an AI experimentation platform!

---

## 🧩 Step 1: Install uv (The Python Environment Management Marvel)

**uv** is an ultra-fast, ultra-lightweight Python package manager.
Simply put, it automatically downloads, installs, and runs all the libraries your AI project needs—
No more manually installing Python, creating virtual environments, then running `pip install` one by one, potentially encountering a slew of module conflict errors!

### ✅ Windows Installation Steps

1. **Download uv**

   👉 Click the link below to download the Windows version zip file:

   ```
   https://github.com/astral-sh/uv/releases/download/0.9.8/uv-x86_64-pc-windows-msvc.zip
   ```

2. **Extract the Files**

   After downloading, extract the zip. You'll see a folder containing `uv.exe` and two other `.exe` files.

3. **Open the System's Special Directory**

   To let your computer recognize the `uv` command from anywhere, we need to place these files in a specific path.

   * Open any folder (e.g., "This PC" or "Documents")
   * Click the **address bar** at the top and type:

     ```
     %userprofile%
     ```

     Then press **Enter**. This will automatically navigate to your user home directory.

4. **Copy the uv Files to That Directory**

   Copy the extracted `uv.exe` and the other `.exe` files from the same folder into this directory.

   Next, open a CMD terminal. If you haven't opened one yet, press the Windows key + R, type `cmd`, and press Enter. Then paste the command **`reg add "HKCU\Environment" /v Path /t REG_EXPAND_SZ /d "%PATH%;%USERPROFILE%" /f`** and press Enter to execute.

   ✅ The benefit of this: You can now directly use `uv` in any command-line window without typing complex paths!

---

### 🍎 macOS User Installation

If you're using macOS, installation is even simpler. Just open "Terminal" and enter:

```bash
wget -qO- https://astral.sh/uv/install.sh | sh
```

---

## 🎬 Step 2: Install ffmpeg (The Swiss Army Knife for Audio/Video Processing)

**ffmpeg** is an essential tool for all video professionals and AI enthusiasts.
It can handle almost any audio/video task: editing, extracting audio tracks, format conversion, merging, adding subtitles... it masters them all!

### ✅ Windows Installation Steps

1. **Download ffmpeg**

   Click the link below to get the full Windows build package:

   ```
   https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-full.7z
   ```

2. **Extract the Files**

   After downloading, extract the archive. You'll see a folder named something like `ffmpeg-x.x.x-full_build` (the version number may vary).

3. **Locate the Key Files**

   Open that folder → navigate into the `bin` subfolder inside. You'll find:

   * `ffmpeg.exe`
   * `ffprobe.exe` (for querying audio/video information)
   * `ffplay.exe` (a simple media player)

   💡 It's recommended to copy all three files together for future convenience.

4. **Place Them in the Same Location as uv**

   Copy these three `.exe` files to **the same directory as uv**:

   ```
   %userprofile%\.local\bin
   ```

   Now you can directly use `ffmpeg` by typing it in any command-line window!

---

### 🍎 macOS User Installation

macOS users can directly run the following command in Terminal:

```bash
brew install ffmpeg
```

---

## What if %userprofile%\.local\bin is not in the PATH environment variable?
Open the Start Menu in the bottom-left corner, find "Command Prompt", right-click --> More --> Run as administrator. Paste this command and press Enter to execute.

reg add "HKCU\Environment" /v Path /t REG_EXPAND_SZ /d "%PATH%;%USERPROFILE%\.local\bin" /f


---

## 🎉 All Done! You've Successfully Configured uv and ffmpeg!

👏 Congratulations! At this point, both powerful tools are installed.
With this one-time setup, you can use them directly from any directory in the future.

From now on:

* Need to process a video? Open Command Prompt (CMD) and type:

  ```bash
  ffmpeg -i input.mp4 -ss 00:00:10 -t 5 output.mp4
  ```

  (The example above cuts a 5-second clip starting from the 10-second mark.)

* Want to run a Python AI project? Simply type:

  ```bash
  uv run script.py
  ```

Isn't it simple?
Whether you're a video editing pro or a newbie AI enthusiast, these two tools will help you get twice the results with half the effort.

---

## ❤️ Summary

| Tool         | Purpose              | Installation Method                     |
| ------------ | -------------------- | --------------------------------------- |
| **uv**       | Manages Python environments & dependencies | Extract and place in `%userprofile%\.local\bin` |
| **ffmpeg**   | Processes audio/video files         | Extract and place in the same directory          |

💡 If you no longer need them in the future, simply delete these `.exe` files. No traces will be left on your system.
Lightweight, clean, and useful—that's their charm!