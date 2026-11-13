---
title: Gemini TTS Dubbing
date: 2025-05-24 14:33:00
description: Gemini 2.5 adds multi-speaker text-to-speech dubbing, supporting 24 languages and 30 voice characters
---

## Gemini TTS Voice Channel

**What is it?**

Gemini TTS is a speech synthesis feature from Google, built on the Gemini 2.5 model. It supports multi-speaker text dubbing with 24 languages and 30 voice characters.

**Supported Models:**
- `gemini-2.5-flash-preview-tts` (recommended — lower limits, higher free quota)
- `gemini-2.5-pro-preview-tts`

**Prerequisites:**
- Google account
- pyVideoTrans v3.70+ or later

## Step 1: Get a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Log in with your Google account
3. Go to the API Keys page
4. Create and copy your API Key

## Step 2: Configure the Software

1. Open the software and go to **Menu → Translation Settings → Gemini Pro**
2. Enter your API Key
3. At the bottom, under **TTS Model**, select a model:
   - Recommended: `gemini-2.5-flash-preview-tts` (higher free quota)
4. Save the settings

![Gemini configuration](https://pvtr2.pyvideotrans.com/1748064664038_image.png)

## Step 3: Use Gemini TTS

1. Return to the main interface
2. Select `Gemini TTS` from the **Voice Channel** dropdown
3. Choose the target language
4. Select a voice from the **Voice** dropdown
5. Click the dubbing button to start

![Select Gemini TTS voice](https://pvtr2.pyvideotrans.com/1748064701564_image.png)

## Available Voices (30)

Gemini TTS provides the following voices:

```
Zephyr, Puck, Charon, Kore, Fenrir, Leda, Orus, Aoede,
Callirrhoe, Autonoe, Enceladus, Iapetus, Umbriel, Algieba,
Despina, Erinome, Algenib, Rasalgethi, Laomedeia, Achernar,
Alnilam, Schedar, Gacrux, Pulcherrima, Achird, Zubenelgenubi,
Vindemiatrix, Sadachbia, Sadaltager, Sulafat
```

## Common Issues and Solutions

### 429 Rate Limit Error

Gemini currently enforces strict API rate limits. When processing many text lines, especially in dual-speaker mode, you may encounter generation failures (particularly with Chinese text). The error message will contain the `429` error code.

**Solutions:**

1. **Wait and retry**: Wait a few minutes or longer, then try again
2. **Adjust concurrency settings**:
   - Increase the pause duration after each dubbing request
   - Reduce the number of concurrent requests
3. **Upgrade to a paid account**: Subscribe to Google's paid plan for higher limits

![429 error solution](https://pvtr2.pyvideotrans.com/1748064566013_image.png)

## Important Notes

> 1. **Google account**: You need a free Google account. If you don't have one, you can register at the Google website — a phone number is typically sufficient for registration.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Cannot connect to API | Check your network connection and ensure you can access Google services |
| 429 rate limit | Wait and retry, or reduce concurrency |
| Insufficient balance | Upgrade to a paid Google account |
| Can't find TTS settings | Make sure you're using v3.70+ or later |
