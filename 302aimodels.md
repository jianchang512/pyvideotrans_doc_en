---
title: Introduction to 302.AI Large Model Marketplace
date: 2024-01-22 14:33:00
description: As is well known, the API services of the three giants—OpenAI, Gemini, and Claude—are not directly accessible within China. To use them, one needs to bypass internet restrictions and possess a foreign credit card, or alternatively, rely on third-party API relay services. These third-party APIs are generally cheaper, but their quality and stability can be unreliable, and they might shut down at any time.
---
As is well known, the API services of the three giants—OpenAI, Gemini, and Claude—are not directly accessible within China. To use them, one needs to bypass internet restrictions and possess a foreign credit card, or alternatively, rely on third-party API relay services. These third-party APIs are generally cheaper, but their quality and stability can be unreliable, and they might shut down at any time.

> Some domestic API service providers have been recommended before, such as:
>
> Alibaba Bailian https://bailian.console.aliyun.com
>
> SiliconFlow https://cloud.siliconflow.cn
>
> ByteDance Volcano Ark https://console.volcengine.com/ark
>
> OpenRouter https://openrouter.ai

Currently, among the domestic AI large model marketplaces that can be accessed directly without a VPN, 302.AI seems to be the most comprehensive. It aggregates mainstream models from both domestic and international sources, covering everything from language models to image generation, audio/video generation, speech synthesis, speech recognition, and more. Almost every well-known AI large model can be used here.

*   **No VPN required, direct access within China, registration grants $1 credit.**
*   **Global Models, All in One Place:** Not only includes the three giants—OpenAI, Gemini, and Claude—but also integrates major domestic mainstream models like Qwen, Deepseek, etc.
*   **Comprehensive AI Capabilities:** Covers a full range of AI capabilities including language models, image generation, audio/video generation, speech synthesis, and speech recognition.
*   **OpenAI API Compatible:** Language models are perfectly compatible with the OpenAI API format, allowing direct replacement for ChatGPT-like calls.
*   **Pricing Matches Official Rates:** Top-tier models (e.g., GPT-4 series) are priced consistently with OpenAI's official rates.

## Model Lineup

**🌍 International AI Giants**
![image.png](https://pvtr2.pyvideotrans.com/img/20250213152741-0.webp)

**Domestic Mainstream AI Models**

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152741-1.webp)

**Deepseek-r1 Full Version**

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152742-2.webp)

**🎨 Text-to-Image Models**

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152742-3.webp)

**🎬 Text-to-Video Models**

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152742-4.webp)

**🎤 Speech Synthesis / Speech Recognition / Voice Cloning**

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152742-5.webp)

## 🔑 Quick Start Guide:

1.  **Register & Create an API Key:**
    *   Visit the registration page https://gpt302.saaslink.net/teRK8Y to complete registration. You'll receive a $1 credit upon registration. If you don't receive it, please follow the prompts on the page to join the community and contact support.
    *   Go to the API Key management page https://dash.302.ai/apis/list to create your exclusive API Key.

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152743-6.webp)

> **Friendly Reminder:** If the "API" option is not displayed on the left sidebar, please click on "Personal Center" and set your address to "Overseas".

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152743-7.webp)

2.  **Replace API Information:**

    *   **API Endpoint:** `https://api.302.ai/v1`
    *   **API Key:** Your created API Key
    *   **Model Name:** Enter the name of the model you want to use (supports all OpenAI/Gemini/Claude models)

3.  **Start Experiencing!**

    Taking the pyVideoTrans video translation software as an example:

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152743-8.webp)

## OpenAI SDK Usage Example:

```python
from openai import OpenAI
client = OpenAI(
    api_key='sk-123456',  # Replace with your API Key
    base_url='https://api.302.ai/v1'
)

completion = client.chat.completions.create(
    model="gpt-4o",  # Can be replaced with your desired model
    messages=[
        {"role": "system", "content": "You are an SRT subtitle translation assistant."},
        {
            "role": "user",
            "content": "Translate the SRT subtitles within the <INPUT> tags into English, ensuring the output conforms to the EBU-STL standard SRT subtitle format.<INPUT>............</INPUT>"
        }
    ]
)

print(completion.choices[0].message.content)

```

## 💰 Pricing Overview:

*   **Top-Tier Models:** Priced consistently with OpenAI/Gemini/Claude official rates.
*   **Some Self-Deployed Models:** Offer more competitive pricing.

 For the detailed price list, please click here to view https://302.ai/pricing

![image.png](https://pvtr2.pyvideotrans.com/img/20250213152744-9.webp)

**Click here to register and experience https://gpt302.saaslink.net/teRK8Y**