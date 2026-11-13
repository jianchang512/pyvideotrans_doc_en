---
title: ChatTTS UI Project Setup
date: 2024-01-22 14:33:00
description: Deploy the ChatTTS-ui project locally for high-quality Chinese voice synthesis
---

## ChatTTS Voice Channel

**What is it?**

ChatTTS is an open-source Chinese voice synthesis project that runs locally, providing high-quality Chinese voice output. The ChatTTS-ui project provides a web interface and API endpoints for it.

**Advantages:**
- Runs entirely locally, no internet needed
- Excellent Chinese voice quality
- Free and open source

## Prerequisites

- You need to deploy and run the ChatTTS-ui project
- An NVIDIA GPU is recommended
- At least 4GB of VRAM is recommended

## Step 1: Download or Deploy ChatTTS-ui

### Option 1: Download the Pre-packaged Version (Recommended)

1. Visit [ChatTTS-ui Releases](https://github.com/jianchang512/ChatTTS-ui/releases/)
2. Download the latest Windows pre-packaged version
3. Extract and double-click `start.bat` to launch

### Option 2: Build from Source

1. Clone the repository: `git clone https://github.com/jianchang512/chattts-ui`
2. Install dependencies and run

For detailed deployment instructions, see: [ChatTTS Deployment Guide](/depychattts)

## Step 2: Start ChatTTS-ui

1. Double-click `start.bat` (pre-packaged) or run `python app.py` (from source)
2. Wait for startup to complete
3. Default HTTP address: `http://127.0.0.1:9966`

## Step 3: Configure pyVideoTrans

1. Open pyVideoTrans
2. Go to **Menu → Settings → ChatTTS Address**
3. Enter the ChatTTS-ui HTTP address:
   ```
   http://127.0.0.1:9966
   ```
4. Click the test button to verify the connection
5. Save the settings

## Step 4: Use ChatTTS for Dubbing

1. Return to the main interface
2. Select `ChatTTS` from the **Voice Channel** dropdown
3. Choose a voice from the **Voice** dropdown
4. Click the dubbing button to start

## Important Notes

- ChatTTS-ui must be running for pyVideoTrans to use it
- The default address is `http://127.0.0.1:9966` — adjust if you changed the port
- If ChatTTS-ui is on another machine, replace `127.0.0.1` with the appropriate IP address
- First-time use may require downloading models — ensure you have internet connectivity

## Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Connection refused | ChatTTS-ui is not running | Make sure ChatTTS-ui is running |
| API URL error | Incorrect address | Check the address format, ensure it includes `http://` |
| Connection timeout | Network issue | Check your network connection and firewall settings |
