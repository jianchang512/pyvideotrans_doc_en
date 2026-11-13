---
title: ByteDance Speech Synthesis Model 2.0 (Doubao TTS 2.0) Guide
date: 2025-10-25 14:33:00
description: How to use ByteDance's Doubao TTS 2.0 channel for high-quality Chinese voice synthesis
---

## ByteDance Speech Synthesis Model 2.0 (Doubao TTS 2.0) Guide

**What is it?**

Doubao TTS 2.0 is a high-quality Chinese voice synthesis service from ByteDance (the company behind TikTok), built on large language model technology. It produces natural and fluid voice output.

> **Important**: ByteDance has many similarly-named speech synthesis products. This guide specifically covers the **"Speech Synthesis Model → Large Model Speech Synthesis API"** — make sure you select the right one, otherwise it won't work.

![](https://pvtr2.pyvideotrans.com/1761748823948_image.png)

## How to Get Started

### Step 1: Register and Log In

1. Visit [Volcengine Console](https://console.volcengine.com/)
2. Register an account and log in
3. Complete identity verification (required)

### Step 2: Create an Application

1. In the console, find **Doubao Speech Synthesis Model 2.0**

![](https://pvtr2.pyvideotrans.com/1761747934841_image.png)

Or go directly to: https://console.volcengine.com/speech/app

2. **Note**: Switch to **"Legacy"** mode in the upper left corner — the new interface is cluttered and hard to navigate

3. Navigate through: **Legacy → Application Center → Application Management → Create Application**

![](https://pvtr2.pyvideotrans.com/1761748031818_image.png)

4. Fill in an application name and description (any value works)
5. **Important**: You must check the **"Doubao Speech Synthesis Model 2.0 → Doubao Speech Synthesis Model 2.0 Character Version"** checkbox

![](https://pvtr2.pyvideotrans.com/1761749047692_image.png)

### Step 3: Activate Free Trial or Paid Plan

1. Visit the speech synthesis page: https://console.volcengine.com/speech/service/10035
2. At the top, select the application you just created
3. Click **"Free Trial"** to activate

![](https://pvtr2.pyvideotrans.com/1761749100902_image.png)

### Step 4: Copy Configuration Details

Scroll down on the page and copy the following:

1. **App ID**: Visible at the bottom of the page
2. **Access Token**: To the right of the App ID — click to copy

![Copy configuration details](https://pvtr2.pyvideotrans.com/img/volc6.webp)

## Using It in pyVideoTrans

### Step 1: Enter Configuration

1. Open the software and go to **Menu → TTS Settings → Doubao Speech Synthesis Model 2.0**
2. Enter your App ID and Access Token
3. Click the test button to verify the connection
4. Save after a successful test

![](https://pvtr2.pyvideotrans.com/1761749366962_image.png)

### Step 2: Select a Voice

1. Return to the main interface
2. Select **Doubao Speech Synthesis Model 2.0** from the **Voice Channel** dropdown
3. Choose the target language
4. Select a voice from the **Voice** dropdown — click to preview

![](https://pvtr2.pyvideotrans.com/1761749284871_image.png)

## Important Notes

- Many voices require separate activation and purchase in the ByteDance console
- If a voice fails or is unavailable, you likely need to purchase it separately
- Make sure you've selected **"Large Model Speech Synthesis API"** and not a similar product
- The App ID and Access Token must correspond to the application you created

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't find Doubao Speech Synthesis Model 2.0 | Switch to "Legacy" mode and follow the navigation path |
| Test failed | Verify your App ID and Access Token are correct |
| Some voices unavailable | You need to separately activate and purchase those voices in the ByteDance console |
| Identity verification prompt | Complete identity verification in the Volcengine console |
