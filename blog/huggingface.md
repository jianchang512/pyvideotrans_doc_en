---
title: Using HuggingFace Models in the Software A Detailed Guide
date: 2025-06-06 14:33:00
description: Hugging Face (huggingface.co) is a popular machine learning model hub containing a vast number of available speech recognition models. When the built-in Faster-Whisper model lacks sufficient support for low-resource languages, or when you need a specifically optimized model, Hugging Face is the ideal platform to find a solution. This feature is available for software **version v3.71 and above** and only supports models converted by `ctranslate2`.

---



## Using Hugging Face Models in the Software: A Detailed Guide

Hugging Face (huggingface.co) is a popular machine learning model hub containing a vast number of available speech recognition models. When the built-in Faster-Whisper model lacks sufficient support for low-resource languages, or when you need a specifically optimized model, Hugging Face is the ideal platform to find a solution.

This feature is available for software **version v3.71 and above** and only supports models converted by `ctranslate2`.

---

### **Step 1: Confirm Model Compatibility**

Before using a Hugging Face model, you must confirm that the model has been converted by `ctranslate2`. If the model has not been converted by `ctranslate2`, it cannot be used in the software.

Here are several ways to check:

**1. Explicit Label on the Page**

If the model page explicitly displays "Converted from ctranslate2" or similar wording, the model is compatible.

![The image clearly indicates it was converted by ctranslate2](https://pvtr2.pyvideotrans.com/1749136471541_image.png)
As shown in the image, if the page explicitly states it was converted using `ctranslate2`, then the model is usable.

**2. Check Code References**

Even if the page doesn't explicitly state it, you can check if the model page contains code snippets related to `from faster_whisper`. Typically, such models are also compatible.
![Check if the example code on the model page contains 'from faster_whisper'](https://pvtr2.pyvideotrans.com/1749179810914_image.png)

**3. Examine the `config.json` File Structure**

If the above two methods are inconclusive, you can click the `Files and versions` tab on the model page, then find and click the `config.json` file.

![Click the file list to view the config.json structure](https://pvtr2.pyvideotrans.com/1749136683957_image.png)

If the structure of the `config.json` file resembles the image below, for example, if the file begins with `alignment_heads` and contains fields like `lang_ids` in the middle, then the model is usually compatible.

![Structure contains 'alignment_heads' and 'lang_ids', etc.](https://pvtr2.pyvideotrans.com/1749136784537_image.png)

---

### **Step 2: Obtain and Configure the Model ID**

Once you confirm the model is compatible, you can add it to the software for use.

**1. Obtain the Model ID**

The Model ID consists of two parts separated by `/`: `username/model_name`. For example: `zh-plus/faster-whisper-large-v2-japanese-5k-steps`.

You can find and click the copy button on the model details page to directly obtain the Model ID, as shown in the image below:

![Go to the model details page and directly click to copy the ID](https://pvtr2.pyvideotrans.com/1749136946826_image.png)

**2. Add the Model ID to the Software**

*   Open the software, click `Menu` -> `Tools` -> `Advanced Options`.
*   At the end of the `Faster and OpenAI Model List` text box, paste the Model ID you copied after the existing content, using an English comma `,` as a separator.
*   Click `Save` to apply the changes.

![Paste separated by an English comma](https://pvtr2.pyvideotrans.com/1749137037698_image.png)

---

### **Step 3: Use and Automatically Download the Model**

*   Return to the software's main interface.
*   Select `faster-whisper (local)` from the `Speech Recognition` dropdown list.
*   In the `Model` dropdown list on the right, select the Model ID you just added.
![Select the Model ID you just added](https://pvtr2.pyvideotrans.com/1749179002003_image.png)
The software will automatically download the model from the domestic mirror site `https://hf-mirror.com`, no VPN required.

---

### **Important Notes**

**1. Model Availability Limitation**

The software only supports downloading publicly available models on Hugging Face. It cannot download or use models that require your agreement to terms (such as accepting a license agreement) to download (as shown in the image below) or private models.

![Non-public models cannot be downloaded](https://pvtr2.pyvideotrans.com/1749137379440_image.png)

**2. Use of Domestic Mirror Site**

*   When the software interface language is set to Chinese, the software will automatically use the domestic mirror site `https://hf-mirror.com` for model downloads, avoiding VPN issues.
*   If the software interface is in English, it will still attempt to download from the official Hugging Face website, which may require a VPN.
*   You can click `Menu` -> `Tools` -> `Advanced Options` -> `Interface Language`, enter `zh` and save, then restart the software to change the interface to Chinese.
![Enter 'zh' and save, then restart the software to change the interface to Chinese](https://pvtr2.pyvideotrans.com/1749179047972_image.png)