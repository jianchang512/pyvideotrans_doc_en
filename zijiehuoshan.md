---
title: Using Volcano Ark (ByteDance) Models for Translation
date: 2024-01-22 14:33:00
description: Since version 1.92, pyVideoTrans supports using Volcano Ark models for subtitle translation. Setup instructions below.
---

# Volcano Ark Translation Channel

## What is it?

Volcano Ark (火山方舟) is ByteDance's AI model service platform, providing API access to large language models like Doubao (豆包). Since pyVideoTrans **v1.92**, you can use Volcano Ark models for subtitle translation.

## Prerequisites

- pyVideoTrans **v3.97** or higher
- A Volcano Ark platform account
- **Identity verification** (required for this service)

---

## Full Setup Guide

### Step 1: Register and log in

Go to https://console.volcengine.com/auth/login/ and register or log in.

### Step 2: Complete identity verification

This is a required step for using the service.

1. After logging in, go to the account center: https://console.volcengine.com/user/authentication/detail/
2. Click **Identity Verification**
3. Choose face verification or bank card verification
4. Complete the verification process

### Step 3: Enable model services

1. Go to the service activation page: https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement
2. Click any **"Enable Service"** button
3. On the page that opens, **select all models** and click confirm to enable
4. After submitting, return to the activation page and refresh to confirm everything is enabled

### Step 4: Create an API Key

1. Find the **"API key"** menu on the activation page
2. Direct link: https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey
3. Click **Create API Key**
4. Copy the generated API key and save it

### Step 5: Configure in pyVideoTrans

1. Make sure pyVideoTrans is upgraded to **v3.97+**
2. Open the software → **Menu** → **Translation Settings** → **ByteDance LLM Translation**
3. Enter your **API Key**
4. Select a Doubao model to use, or manually enter another model name
5. Click the **Test** button to verify the connection
6. Save after a successful test, then use it from the main interface

## Recommended Configuration

| Setting | Recommended Value |
|---------|-------------------|
| API URL | `https://ark.cn-beijing.volces.com/api/v3` (default, no changes needed) |
| API Key | Obtained from Volcano Ark platform |
| Model | Choose from models supported by Volcano Ark |
| Max Output Tokens | 32768 (default) |

## Important Notes

**Important reminders** when using this service:
- **Do not send or inquire about sensitive topics** or content containing sensitive terms
- **Do not send inappropriate content**
- Violations may result in the model refusing to respond, or in severe cases, **account suspension**

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Cannot register | Requires a domestic phone number | Use a phone number from a supported region |
| Identity verification failed | ID information mismatch | Re-enter correct identity information |
| Model not enabled | Setup step not completed | Complete all model activation as described in Step 3 |
| API key invalid | Key entered incorrectly | Re-obtain the API key from Volcano Ark |
| "Cannot answer" response | Content triggered safety filters | Avoid sending sensitive content |
| Connection timeout | Network issue | Check your network connection |
