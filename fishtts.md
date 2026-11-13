---
title: Deploying Fish TTS and Starting the API Service
date: 2024-01-22 14:33:00
description: pyVideoTrans v2.04+ supports using Fish TTS API for high-quality voice synthesis
---

## Fish-TTS / Fish-Speech Voice Channel

**What is it?**

Fish-Speech is an open-source voice synthesis project that supports voice cloning — it can generate speech in a similar voice using a reference audio sample. Ideal for users who need a specific voice for dubbing.

**Prerequisites:**
- You need to deploy and run the Fish-Speech API service
- pyVideoTrans v3.63+ is required
- Fish-Speech version 1.5.0 or higher

> **Important**: Starting from v3.63, pyVideoTrans requires Fish-Speech version 1.5.0 or higher. Earlier versions will not work.

## Step 1: Deploy Fish-Speech

### Get the Project

- Repository: https://github.com/fishaudio/fish-speech
- Documentation: https://speech.fish.audio

### Start the API Service

1. Follow the Fish-Speech documentation to complete deployment
2. **You must start the API service** — launching only the WebUI is not enough
3. Default API address: `http://127.0.0.1:8080/v1/tts`

> **Note**: Make sure the API service is running before proceeding with configuration.

## Step 2: Configure the API in pyVideoTrans

1. Open pyVideoTrans
2. Go to **Menu → Settings → Fish TTS**
3. Enter the Fish TTS API address in the **API Address** field
4. Default address: `http://127.0.0.1:8080/v1/tts`

## Step 3: Configure Reference Audio

Fish-Speech uses reference audio to clone voices. You need to provide a reference audio file along with its corresponding text.

### Format

```
audio_file_path#corresponding text
```

### Examples

**Example 1: Single reference audio**

If you have a `1.wav` file in the same folder as `sp.exe` or `sp.py`, with the corresponding text "Hello, my dear friends", enter:

```
1.wav#Hello, my dear friends
```

**Example 2: Multiple reference audio files**

If you want to use multiple reference audio files, create a folder (e.g., `wavs`) in the `sp.exe` directory, then enter:

```
1.wav#Hello, my dear friends
wavs/2.wav#Nice weather today, let's go for a swim
```

### Reference Audio Requirements

- **Format**: WAV format
- **Duration**: 10-20 seconds is optimal
- **Quality**: Clear, no background noise
- **Location**: Place in the same folder as `sp.exe` or `sp.py`
- **Naming**: Use simple English or numeric names without spaces

> **Tip**: If the reference text is very long, just let it wrap naturally — don't add manual line breaks.

## Step 4: Use Fish-TTS for Dubbing

1. Save the settings, then return to the main interface
2. Select `FishTTS` from the **Voice Channel** dropdown
3. Your added reference audio will appear in the **Voice** dropdown
4. Select a voice and start dubbing

![Select FishTTS voice](https://pvtr2.pyvideotrans.com/images/354242cb1499485fad10864b0128ca5c.jpg)

## Important Notes

1. **File naming**: Use simple English or numeric names for reference audio files and folders — no spaces
2. **Language support**: Fish-Speech has limited language support — make sure the text is within supported languages
3. **Voices not showing**: If you added reference audio in settings but it doesn't appear on the main interface, switch the voice channel to `edgeTTS` first, then switch back to `FishTTS`
4. **API must be running**: Just opening the browser interface is not enough — the API service must be active

## Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "This channel needs deployed and started" | Fish-Speech is not running | Ensure the API service is running |
| Connection refused | Incorrect API address | Check the API address and port |
| Voices not appearing | Caching issue | Switch to another channel and back |
| Generated voice doesn't sound like the reference | Poor reference audio quality | Use clearer, longer reference audio |
