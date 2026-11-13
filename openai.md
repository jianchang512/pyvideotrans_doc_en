---
title: Using OpenAI's ChatGPT API
date: 2024-01-22 14:33:00
description: If you have a free account, you also have free API access, though the free tier has very low rate limits. Paid accounts and third-party relay services are also supported.
---

# OpenAI ChatGPT Translation Channel

## What is it?

OpenAI's ChatGPT is one of the most well-known AI language models worldwide, offering excellent translation quality. pyVideoTrans connects to ChatGPT through an OpenAI-compatible interface, supporting both the official OpenAI API and third-party relay API services.

## Prerequisites

- pyVideoTrans software
- An OpenAI account (free accounts can access the API, but with strict rate limits) or a third-party relay service account

---

## Option 1: Using the Official OpenAI API

### Getting an API Key (SK)

**Step 1:** Go to https://platform.openai.com and click **"Log in"** in the top-right corner

![](https://pvtr2.pyvideotrans.com/images/63a5835289cb35ad8709c3bd8e2fc178.jpg)

**Step 2:** After logging in, click the **lock icon** on the left to view API information

![](https://pvtr2.pyvideotrans.com/images/adfd9bbdb05fff7247cbdb8668e2fd3c.jpg)

**Step 3:** On the right side, click **"Create new secret key"** to create a Secret Key (SK)

![](https://pvtr2.pyvideotrans.com/images/719880580d0e835745b25ba37438381b.jpg)
![](https://pvtr2.pyvideotrans.com/images/f5e9534fb213016ebd9c2feff9ec10a5.jpg)

**Step 4:** After verification, a dialog will appear with your Secret Key. **This key is only shown once — copy and save it immediately before closing the dialog!**

![](https://pvtr2.pyvideotrans.com/images/e1a11af68a47a72897c66b791c915cd3.jpg)

### Configuring in pyVideoTrans

1. Click the **Settings menu** in the top-left corner → **OpenAI/ChatGPT**
2. Enter your copied Secret Key in the **SK** field
3. **Leave the API URL empty** (not needed when using the official account)
4. Select a model (e.g., `gpt-4o`, `gpt-4o-mini`, etc.)
5. Click **Test**, then save after success

![](https://pvtr2.pyvideotrans.com/images/11d56c675705d78302260bb21fbf3f30.jpg)

> **Free account limitations**: Free ChatGPT accounts can use the API, but are limited to roughly 3 requests per minute. Exceeding the limit causes various errors. Consider upgrading to a paid account or using a third-party relay service for a better experience.

---

## Option 2: Using a Third-Party Relay API

There are many third-party relay services available — quality varies and some may shut down unexpectedly. Choose at your own discretion; we do not make specific recommendations.

### Getting the Key and API URL

**Step 1:** Register on your chosen third-party platform and create an API key

![](https://pvtr2.pyvideotrans.com/images/69b78e1d90e42522e8f1d822b15af046.jpg)

**Step 2:** Copy the key and paste it into pyVideoTrans's **SK** text box

![](https://pvtr2.pyvideotrans.com/images/8da5c64ec68d0543ac10b888ffb5bccb.jpg)

**Step 3:** Obtain the API URL from the third-party provider (from their documentation or support), and enter it into the **"API URL"** text box

![](https://pvtr2.pyvideotrans.com/images/b6269d1fd33da93ecead66cd5f009b46.jpg)

Result after filling in:

![](https://pvtr2.pyvideotrans.com/images/8f5508a51bbf32bb3a025903d3565609.jpg)

> **Key information**: Regardless of which third-party API service you use, the two essential pieces of information are: ① the secret key (SK / Secret Key) and ② the third-party API URL address.

---

## Recommended Configuration

| Setting | Official API | Third-Party Relay |
|---------|-------------|-------------------|
| API URL | Leave empty | Enter the third-party URL |
| SK | From OpenAI platform | From the third-party platform |
| Model | `gpt-4o`, `gpt-4o-mini` | Depends on third-party support |
| Max Output Tokens | 8192 (default) | Adjust as needed |

## Important Notes

1. **Request rate limits**: Most AI translation channels may limit the number of requests per minute. If you see rate limit errors, click **"Translation Channel ↓"** on the main interface and set the **pause seconds** to 10, which means a 10-second wait after each translation — capping at 6 requests per minute to avoid exceeding limits.

   ![](https://pvtr2.pyvideotrans.com/img/localllm04.jpg)

2. **Excessive blank lines in output**: If the model you selected is not intelligent enough (especially smaller locally deployed models), it may fail to follow formatting instructions properly, resulting in many blank lines. You can try:
   - Using a larger model
   - Going to **Menu** → **Tools/Options** → **Advanced Options** → **Send full subtitle content when using AI translation**, and unchecking it

   ![](https://pvtr2.pyvideotrans.com/img/localllm05.jpg)

3. **Using with Immersive Translate**: To use a third-party API with the "Immersive Translate" extension, append `/v1/chat/completions` to the API URL — i.e., `third-party-api-address/v1/chat/completions`.

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| "Authentication Error" | SK incorrect or expired | Re-create the secret key and enter it |
| "Insufficient balance" | Account balance too low | Top up your OpenAI account |
| Connection timeout | Incorrect API URL or network issue | Verify the API URL and check network connectivity |
| "Rate limit exceeded" | Too many requests | Increase the post-translation pause time |
| Empty translation result | Model unsupported or format issue | Try a different model, confirm API URL is correct |
