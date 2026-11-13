---
title: MiniMaxi Subtitle Translation and Dubbing Integration
date: 2024-01-22 14:33:00
description: Integrate MiniMaxi's subtitle translation and dubbing features, supporting multiple emotion expressions
---

## MiniMaxi Dubbing and Translation Channel

**What is it?**

MiniMaxi (also known as Hailuo AI) is an AI service platform from MiniMax, offering text-to-speech and translation features. It supports 7 emotion expressions and produces natural-sounding voices.

**Prerequisites:**
- Register a MiniMaxi account
- Complete identity verification (for users in China)
- Obtain an API Key

**Note**: Domestic (minimaxi.com) and overseas (minimax.io) accounts and balances are completely separate.

## Registration

### Users in China

- Registration URL: https://platform.minimaxi.com/login

### Overseas Users

- Registration URL: https://platform.minimax.io/login

> **Important**: Domestic (minimaxi.com) and overseas (minimax.io) accounts, API Keys, and balances are completely separate and cannot be shared.

---

## Translation Integration

### Step 1: Get an API Key

1. After logging in, visit: https://platform.minimaxi.com/user-center/basic-information/interface-key
2. Create and copy your API Key

### Step 2: Configure the Software

1. Open the software and go to **Menu → Translation Settings → Minimax AI**
2. Fill in the following:
   - **API Address**:
     - Users in China: `https://api.minimaxi.com/v1`
     - Overseas users: `https://api.minimax.io/v1`
   - **SK**: Paste the API Key
3. Click the test button to verify the connection
4. Save the settings

![Translation settings](https://pvtr2.pyvideotrans.com/1773727771017_image.png)

### Step 3: Use Translation

1. Return to the main interface
2. Select `Minimax AI` from the **Translation Channel** dropdown
3. Start your translation task

---

## Dubbing Integration

### Step 1: Get an API Key

Same as the translation section — use the same API Key.

### Step 2: Configure the Software

1. Open the software and go to **Menu → TTS Settings → MiniMaxi API**
2. Fill in the following:
   - **API Address**:
     - Users in China: select `api.minimaxi.com`
     - Overseas users: select `api.minimax.io`
   - **SK**: Paste the API Key
3. Click the test button to verify the connection
4. Save the settings

![Dubbing settings](https://img.pyvideotrans.com/file/1741096615493_image.png)

![Enter API Key](https://img.pyvideotrans.com/file/1741096626565_image.png)

### Step 3: Select an Emotion

MiniMaxi supports 7 emotion expressions:
- Happy
- Sad
- Angry
- Fearful
- Disgusted
- Surprised
- Neutral

You can select a default emotion in the settings. However, testing shows the difference is minimal — adjust as needed.

### Step 4: Start Dubbing

1. Return to the main interface
2. Select `MiniMaxi` from the **Voice Channel** dropdown
3. Choose the target language and voice
4. Click the dubbing button to start

---

## Rate Limit Settings

> **Important**: Unless you have a high-tier MiniMaxi enterprise account, you'll likely encounter frequent `rate limit` errors.

**You must configure the following:**

1. Go to **Menu → Tools/Options → Advanced Options → Dubbing Adjustments**
2. Set **Concurrent Dubbing Count** to `1`
3. Set **Pause After Dubbing** to `25` seconds or more

Regular accounts are limited to 3 requests per minute — roughly one every 20 seconds.

![Rate limit settings](https://img.pyvideotrans.com/file/1741099589114_image.png)

---

## Notes for Users in China

> :warning: After logging in, you'll need to complete identity verification using a bank card and the phone number registered with your bank. If you haven't completed this step, tests may fail.

Additionally, when using this service, go to **Menu → Tools/Options → Advanced Options → Dubbing Adjustments**:
- Set concurrent dubbing count to `1`
- Set the pause after dubbing to a value greater than `25` seconds

Otherwise, you'll likely exceed the rate limit.

## Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Rate limit | Too many requests | Reduce concurrency, increase pause duration |
| Authentication error | Invalid API Key | Verify the key is correct |
| Identity verification failed | Verification not completed | Complete bank card identity verification |
| Insufficient balance | Account needs funding | Top up your MiniMaxi account |
