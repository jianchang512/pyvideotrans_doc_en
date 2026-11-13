---
title: AzureTTS Voice Channel
date: 2024-01-22 14:33:00
description: Microsoft Azure's high-quality TTS service with natural-sounding voices, suitable for professional dubbing
---

## AzureTTS Voice Channel

**What is it?**

AzureTTS is a text-to-speech service from Microsoft Azure cloud platform. It produces very natural voice output, supports SSML markup, and is ideal for professional dubbing needs.

**Prerequisites:**
- An Azure account
- Azure Speech Services enabled
- An authorization Key and region information

![AzureTTS voice channel](https://pvtr2.pyvideotrans.com/images/84e7ac3806364cc0a1e5e0c66d3be0e8~tplv-73owjymdk6-jj-mark_0_0_0_0_q75.webp)

## Step 1: Enable Azure Speech Services

1. Visit [Azure Portal](https://portal.azure.com/) and log in
2. Create a resource → search for "Speech Services"
3. Create a Speech resource, choosing a suitable region (recommended: **East Asia**)
4. After creation, go to the resource details page

## Step 2: Get Your Key and Region

1. On the resource details page, find "Keys and Endpoint"
2. Copy **KEY 1** or **KEY 2** (either works)
3. Note your **region** (e.g., `eastasia`)

## Step 3: Configure the Software

1. Open the software and go to **Menu → Settings → AzureTTS**
2. Fill in the following:
   - **Authorization Key**: Paste the key you copied
   - **Region**: Enter `EastAsia` (or whichever region you selected)
   - **Custom Region**: Leave blank unless you have specific requirements
3. Click the test button to verify the connection

![Azure configuration](https://pvtr2.pyvideotrans.com/images/cfd2af7439244c26a09fbab4d3c45856~tplv-73owjymdk6-jj-mark_0_0_0_0_q75.webp)

## Step 4: Select a Voice

After configuration, return to the main interface:
1. Select `AzureTTS` from the **Voice Channel** dropdown
2. Choose the desired language in **Target Language**
3. Select a voice from the **Voice** dropdown
4. Click the play button to preview

## Free Trial Channel

Starting from v3.95, the software includes a free voice channel based on Azure's trial endpoint. This channel:
- Can use all Azure voices
- **Does not require an Azure account**
- May not be very stable
- For a better experience, consider subscribing to a paid Azure plan

## Supported Languages and Voices

AzureTTS supports 400+ languages and voice roles worldwide, including:
- Chinese (Mandarin, Cantonese, Taiwanese)
- English (American, British, Australian, etc.)
- Japanese, Korean
- French, German, Spanish
- Many more...

## Important Notes

- Billed per character — review Azure pricing before heavy usage
- Region selection affects latency — choose the nearest region to you
- If using a custom region, ensure it matches your Azure resource's region

## Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Authentication error | Invalid key | Verify the key was copied correctly |
| Resource not found | Incorrect region | Confirm the region matches your Azure resource |
| Quota exceeded | Usage limit reached | Check your Azure account quota or upgrade your plan |
