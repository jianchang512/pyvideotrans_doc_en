---
title: OpenAI TTS Voice Channel
date: 2024-01-22 14:33:00
description: High-quality voice synthesis using OpenAI's TTS-1 model
---

## OpenAI TTS Voice Channel

**What is it?**

OpenAI TTS uses the TTS-1 model from ChatGPT for speech synthesis, delivering very natural and fluid voice output. It supports multiple voice styles and is ideal for users who need high voice quality.

**Prerequisites:**
- A **paid** OpenAI account
- Account must have TTS-1 model access
- A valid API Key

![OpenAI TTS voice channel](https://pvtr2.pyvideotrans.com/images/5618d5c551db4aca840f2df4217b0f5c~tplv-73owjymdk6-jj-mark_0_0_0_0_q75.webp)

## Step 1: Get an API Key

1. Visit the [OpenAI website](https://platform.openai.com/) and log in with your paid account
2. Go to the API Keys page (left menu → API Keys)
3. Click "Create new secret key" to generate a new API Key
4. **Copy and save it immediately** — the key is only shown once

## Step 2: Configure the Software

1. Open the software and go to **Menu → Settings → ChatGPT and Compatible APIs**
2. Fill in the following:
   - **API URL**: Enter the OpenAI API address (usually `https://api.openai.com/v1`)
   - **API Key**: Paste the key you just copied
   - **Model**: Select `tts-1` or `tts-1-hd`
3. Click the test button to verify the connection

![API configuration](https://pvtr2.pyvideotrans.com/images/ff1817126f0d495d8b040d27e90ec607~tplv-73owjymdk6-jj-mark_0_0_0_0_q75.webp)

## Step 3: Select a Voice

After configuration, return to the main interface:
1. Select `OpenAI TTS` from the **Voice Channel** dropdown
2. Choose a voice from the **Voice** dropdown
3. Click the play button to preview

![Select a voice](https://pvtr2.pyvideotrans.com/images/6af9836e38c44b759925eab017043914~tplv-73owjymdk6-jj-mark_0_0_0_0_q75.webp)

## Available Voices

OpenAI TTS provides the following standard voices:
- **alloy** - Neutral voice
- **echo** - Male voice
- **fable** - British accent
- **onyx** - Deep male voice
- **nova** - Female voice
- **shimmer** - Soft female voice

## Important Notes

- TTS-1 is billed per character — keep usage costs in mind
- "Insufficient balance" errors mean your account needs a top-up
- If using a relay/proxy API, enter the URL and Key in the appropriate fields
- If the API connection fails, check your network and verify the key is correct

## Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Unable to connect to API | Network issue or incorrect URL | Check the API URL and network connection |
| Authentication error | Invalid or expired key | Regenerate the API Key |
| Insufficient balance | Account needs funding | Top up your OpenAI account |
| Permission denied | Account lacks TTS permissions | Confirm your account is paid and has TTS access |
