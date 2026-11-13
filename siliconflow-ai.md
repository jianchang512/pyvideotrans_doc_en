---
title: SiliconFlow AI Model Integration
date: 2025-07-15 14:33:00
description: Since version 3.74, pyVideoTrans includes SiliconFlow as a dedicated translation channel.
---

# SiliconFlow AI Translation Channel

## What is it?

SiliconFlow (硅基流动, literally "Silicon Flow") is a popular AI inference service platform that provides API access to a variety of open-source large language models, including DeepSeek, Qwen, Llama, and more. Since version 3.74, pyVideoTrans has integrated SiliconFlow as a dedicated translation channel. It offers fast access and free tiers for many models.

## Prerequisites

- pyVideoTrans **v3.74** or higher
- A SiliconFlow platform account (to obtain an API key)

## How to Get an API Key

**Step 1: Sign up and log in to SiliconFlow**

Go to https://cloud.siliconflow.cn and register with your phone number or email.

**Step 2: Create an API Key**

1. After logging in, visit https://cloud.siliconflow.cn/account/ak
2. Click **"Create API Key"**
3. Give the key a name
4. Copy the generated API key and save it

**Step 3: Claim free credits**

SiliconFlow provides free credits for new users. Some models (such as Qwen-7B) can be used for free. Check your balance on the platform homepage.

## Configuring in pyVideoTrans

1. Open the menu bar → **Translation Settings** → **SiliconFlow Settings**
2. Enter the API key from SiliconFlow in the **API KEY** field
3. Select a model from the dropdown, for example:
   - `Qwen/Qwen2.5-7B-Instruct` (free, suitable for everyday translations)
   - `deepseek-ai/DeepSeek-V3` (high-quality translations)
   - You can also manually enter other models supported by SiliconFlow
4. Click the **Test** button to verify the connection
5. Save after a successful test

![](https://pvtr2.pyvideotrans.com/1752632796203_image.png)

![](https://pvtr2.pyvideotrans.com/1752632658237_image.png)

![](https://pvtr2.pyvideotrans.com/1752587739231_image.png)

## Recommended Configuration

| Setting | Recommended Value |
|---------|-------------------|
| API URL | `https://api.siliconflow.cn/v1` (default, no changes needed) |
| API Key | Obtained from SiliconFlow platform |
| Model | `Qwen/Qwen2.5-7B-Instruct` (free) or `deepseek-ai/DeepSeek-V3` (high quality) |
| Max Output Tokens | 8192 (default) |

## Popular Model Recommendations

| Model | Price | Features |
|-------|-------|----------|
| `Qwen/Qwen2.5-7B-Instruct` | Free | Great for everyday translations |
| `deepseek-ai/DeepSeek-V3` | Paid | High translation quality |
| `meta-llama/Meta-Llama-3.1-8B-Instruct` | Free | Excellent English translations |

> Browse all available models and pricing at https://cloud.siliconflow.cn/models.

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| "Authentication Error" | API key incorrect | Log in to SiliconFlow and generate a new key |
| Connection timeout | Network issue | Check your network connection |
| Model returns error | Incorrect model name format | Ensure the model name follows the `provider/model-name` format |
| Rate limit errors | Free models have rate limits | Increase the post-translation pause time, or upgrade to a paid model |
| Excessive blank lines in output | Model capability insufficient | Try a larger model (e.g., 14B or 32B version) |
