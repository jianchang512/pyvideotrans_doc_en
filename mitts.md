---
title: Xiaomi TTS Voice Channel
date: 2024-01-22 14:33:00
description: Xiaomi MiMo TTS voice channel, supporting Chinese and English dubbing
---

## Xiaomi TTS Voice Channel

**What is it?**

Xiaomi TTS is a speech synthesis service from Xiaomi, powered by their large language model technology. Currently supports Chinese and English dubbing, with free quota available.

**Prerequisites:**
- Register a Xiaomi developer account
- Obtain an API Key
- pyVideoTrans v3.98-327+ or later

![](https://pvtr2.pyvideotrans.com/1774595519577_image.png)

![](https://pvtr2.pyvideotrans.com/1774595530704_image.png)

## Step 1: Get an API Key

1. Visit: https://platform.xiaomimimo.com/#/console/api-keys
2. Register and log in to a Xiaomi developer account
3. Create an API Key
4. Copy and save it

## Step 2: Configure the Software

1. Open the software and go to **Menu → TTS Settings → Xiaomi TTS**
2. Paste the API Key
3. Click the **Test** button
4. If no errors occur and audio plays, it's working
5. Click **Save**

## Step 3: Start Dubbing

1. Return to the main interface
2. Select `xiaomi TTS` from the **Voice Channel** dropdown
3. Select the target language (currently Chinese and English only)
4. Choose a voice
5. Start dubbing

## Available Voices

Xiaomi TTS currently supports only the following voices:
- `mimo_default` - Default voice (female)
- `default_zh` - Chinese default voice (female)
- `default_en` - English default voice (female)

## Important Notes

- After Xiaomi's free trial period ends, you'll need to top up your Xiaomi model console balance to continue
  - Top-up URL: https://platform.xiaomimimo.com/#/console/balance
- Currently only supports Chinese and English
- Currently only offers female voices

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Test failed | Verify your API Key is correct |
| Insufficient balance | Top up at the Xiaomi console |
| Language unavailable | Currently only Chinese and English are supported |
| Limited voice selection | Xiaomi TTS currently has few voices — consider other channels |
