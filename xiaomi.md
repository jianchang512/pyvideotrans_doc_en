---
title: Xiaomi MiMo AI Translation and Dubbing Channel
date: 2024-01-22 14:33:00
description: Xiaomi MiMo AI's subtitle translation and TTS dubbing channel, supporting Chinese-English translation and dubbing.
---

# Xiaomi MiMo AI — Translation and Dubbing Channel

Xiaomi MiMo AI is an AI platform launched by Xiaomi. pyVideoTrans has integrated its translation and TTS dubbing features since v3.98-327.

---

## What Is This?

- **Translation channel**: Uses Xiaomi's large language model to translate subtitles into the target language
- **Dubbing channel**: Uses Xiaomi TTS to generate dubbed audio (currently supports Chinese and English)

---

## Prerequisites

1. A Xiaomi MiMo AI platform account
2. An API Key created from the platform console

---

## Configuration Steps

### Step 1: Obtain an API Key

1. Visit the [Xiaomi MiMo Platform Console](https://platform.xiaomimimo.com/#/console/api-keys)
2. Log in or register a Xiaomi account
3. Create an API Key and copy it

![](https://pvtr2.pyvideotrans.com/1774595519577_image.png)

### Step 2: Enter in pyVideoTrans

1. Go to Menu → **Translation Settings** → **Xiaomi AI**
2. Paste the API Key into the corresponding input box
3. Click **Test** to verify
4. After a successful test, click **Save**

![](https://pvtr2.pyvideotrans.com/1774595530704_image.png)

### Step 3: Use

1. Select **Xiaomi AI** from the **Translation Channel** dropdown on the main screen
2. Select **Xiaomi TTS** from the **Dubbing Channel** dropdown
3. Choose your target language and you're ready to go

---

## Available Voices

The full list of Xiaomi TTS voices is available at: https://platform.xiaomimimo.com/docs/zh-CN/usage-guide/speech-synthesis-v2.5

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| API Key error | Check that the key was copied completely, with no extra spaces |
| Test button returns error | Verify network connection and ensure the API Key is valid |
| TTS produces no sound | Currently only Chinese and English are supported — check the target language |
| Insufficient balance | Recharge at the [Xiaomi Model Console](https://platform.xiaomimimo.com/#/console/balance) |

> After Xiaomi's free trial period ends, you'll need to recharge via the platform console to continue using the service.
