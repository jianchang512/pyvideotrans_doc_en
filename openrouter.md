---
title: Introduction to OpenRouter.ai
date: 2024-01-22 14:33:00
description: A platform that provides both domestic and international mainstream AI models, making it convenient for Chinese users to use **OpenRouter.ai**!
---
AI has permeated every aspect of our work and entertainment. Whether it's the international giants like OpenAI, Gemini, and Claude, or domestic players like DeepSeek, Zhipu AI, Tongyi Qianwen, and Kimi, major companies offer powerful AI models.

However, a major headache is that for each platform's model we want to use, we need to register an account, and sometimes even bind a payment method. Want to use ChatGPT? You need an OpenAI account. Want to try Gemini? You need a Google account.

Of course, there are some AI aggregation platforms on the market, such as Alibaba Cloud's Bailian, ByteDance's Volcano Ark, etc. But they mainly focus on their own models and lack top international models. While Silicon Flow offers some international models, the selection isn't comprehensive, missing popular choices like OpenAI and Claude.

Is there a platform that provides both domestic and international mainstream AI models and is convenient for Chinese users? The answer is yes, and that is **OpenRouter.ai**!

**Advantages of OpenRouter.ai:**

*   **Directly accessible from China with stable speeds**: No special network environment is needed for smooth usage.
*   **Comprehensive model selection**: Includes mainstream AI models from both China and abroad, such as OpenAI, Google, Claude, Deepseek, Qwen, and more.
*   **Free quota**: Provides a daily free request quota, allowing you to easily experience various models.

## 1. Free Registration and Login

Visit the OpenRouter.ai official website: [https://openrouter.ai](https://openrouter.ai)

*   If you have a Google account, you can log in directly using it.
*   If not, click "**Sign up**" to register with your email.

![Registration and Login](https://pvtr2.pyvideotrans.com/img/20250212012827-0.webp)

![image.png](https://pvtr2.pyvideotrans.com/img/20250212012828-1.webp)

After registering, open your email and click the verification link in the email to log in.

## 2. Create an API Key

After logging in, go to the API key management page: [https://openrouter.ai/settings/keys](https://openrouter.ai/settings/keys)

![Create API Key](https://pvtr2.pyvideotrans.com/img/20250212012828-2.webp)

Click "**Create Key**" to create a new API key.

![Create](https://pvtr2.pyvideotrans.com/img/20250212012828-3.webp)

Copy the generated API key and store it securely.

![Copy API Key](https://pvtr2.pyvideotrans.com/img/20250212012828-4.webp)

## 3. Explore Free Models

Visit the **OpenRouter.ai** models list page: [https://openrouter.ai/models](https://openrouter.ai/models)

Filter to show all free models as shown below.

![Filter Free Models](https://pvtr2.pyvideotrans.com/img/20250212012829-5.webp)

You will see many models marked with `(free)`. These are all available for free use, including the full-featured `DeepSeek:R1`.

![Free Models List](https://pvtr2.pyvideotrans.com/img/20250212012829-6.webp)

**Free Quota Explanation:**

OpenRouter.ai provides each user with a daily free request quota of 200 requests.

![Free Quota](https://pvtr2.pyvideotrans.com/img/20250212012829-7.webp)

## 4. Using OpenRouter.ai as a Replacement for OpenAI

Select a model you are interested in and copy its Model Name.

![image.png](https://pvtr2.pyvideotrans.com/img/20250212012830-8.webp)

Now, you can use OpenRouter.ai in any application or code that supports the OpenAI API format by using the following:

*   **API Endpoint**: `https://openrouter.ai/api/v1`
*   **API Key (SK)**: The OpenRouter.ai API key you copied earlier
*   **Model Name**: The model name you just copied

## 5. Special Recommendation: Free Experience of Full-Featured DeepSeek-R1

OpenRouter.ai also offers a special model: `deepseek/deepseek-r1:free`

Visit: [https://openrouter.ai/deepseek/deepseek-r1:free](https://openrouter.ai/deepseek/deepseek-r1:free)

![DeepSeek-R1](https://pvtr2.pyvideotrans.com/img/20250212012830-9.webp)

This is a full-featured DeepSeek-R1 reasoning model, completely free to call!

## 6. Example: Using OpenRouter.ai in pyVideoTrans

Using the video translation software pyVideoTrans as an example, here's how to use OpenRouter.ai in a practical application:

1.  Open the software, go to "Menu" -> "OpenAI ChatGPT API".
2.  In "API URL", enter: `https://openrouter.ai/api/v1`
3.  In "SK", enter your OpenRouter.ai API key.
4.  In "Fill in all available models", paste the model name you copied.
5.  Click "Save".

![image.png](https://pvtr2.pyvideotrans.com/img/20250212012830-10.webp)