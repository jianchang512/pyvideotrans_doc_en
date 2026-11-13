---
title: How to Choose a Translation Channel
date: 2024-01-22 14:33:00
description: Subtitles generated from audio/video recognition are translated into the target language via a translation channel, and then used for dubbing. Clearly, the translation quality directly affects the dubbing outcome.
---
Subtitles generated from audio/video recognition are translated into the target language via a translation channel, and then used for dubbing. Clearly, the translation quality directly affects the dubbing outcome.

![image.png](https://pvtr2.pyvideotrans.com/img/selecttrans1.webp)

## Translation channels can be divided into traditional translation and AI translation:

*   Traditional Translation: Google Translate, Microsoft Translator, DeepL, Baidu Translate, Tencent Translate
*   AI Translation: ChatGPT, Gemini, AzureGPT, 302.ai, various domestic AI services, local large language models

## By Pricing Model

*   Free & Unlimited: Google, Microsoft
*   Free with Quota/Limits: Baidu Translate, Tencent Translate, various domestic AI services, Gemini
*   Paid: DeepL, ChatGPT, AzureGPT, Gemini

## By Proxy Requirement

*   Proxy Required: Google, ChatGPT, Gemini
*   No Proxy Required: Domestic translation services, DeepL

## The Software Supports Two Translation Methods

*   1.  Submit only the pure text from the subtitles to the translation channel, and replace the original text in the subtitles with the translation result.

    > All traditional translation channels (except Google) use this method.

    *   Advantages: Ensures the translation result is valid SRT subtitle format; saves on character count.
    *   Disadvantages: When the number of lines in the translation result doesn't match the original, it forces line-by-line translation, losing context and resulting in poor quality.

    > With this method, excessive blank lines may appear. Since they lack line numbers, it's impossible to determine which line they belong to, so they can only be placed at the end, potentially causing subtitle misalignment. Therefore, when blank lines appear, the software will force re-translation line by line, losing contextual relevance.

*   2.  Submit the complete SRT subtitle format to the translation channel, including line numbers, timestamps, and other non-translatable content.

    *   Advantages: Better contextual relevance, avoids excessive blank lines.
    *   Disadvantages: Wastes tokens; less intelligent AI might return incorrect SRT format, e.g., merging the line number into the next line, converting English punctuation in timestamps to Chinese, etc., causing the returned result to no longer be valid SRT and leading to parsing errors.

    > This method may still return blank lines, but it doesn't affect the outcome because the blank lines have valid line numbers and timestamps. It's usually because the translation result for that line was merged into the previous line for semantic coherence, especially when the line contains only one or two isolated words.
    >
    > ![image.png](https://pvtr2.pyvideotrans.com/img/selecttrans2.webp)

By default, AI translation and the Google channel use this second method. If you uncheck **Menu -> Tools/Options -> Advanced Options -> Subtitle Translation -> Send complete subtitle content for AI translation**, the first method will be used.

![image.png](https://pvtr2.pyvideotrans.com/img/selecttrans3.webp)

## Number of Subtitles Translated at Once

![image.png](https://pvtr2.pyvideotrans.com/img/selecttrans4.webp)

**Menu -> Tools/Options -> Advanced Options -> Subtitle Translation -> Number of subtitles to translate simultaneously** allows you to set how many subtitles are translated in one batch. A larger number translates faster and provides better contextual relevance, but if too large, it may exceed the character limit of the respective channel, and blank lines may increase.

## Summary: Choosing a Translation Channel

*   **Want to be completely free and unlimited**: First choice `Google` (requires proxy), second choice `Microsoft Translator`.
*   **Completely free but accept frequency/quota limits**: First choice various domestic AI providers, such as `deepseek.com`, `kimi.moonshot.cn`, `302.ai`, etc. Second choice Tencent Translate, Baidu Translate, Gemini (requires proxy).
*   **No proxy available**: First choice domestic AI providers, second choice `Microsoft Translator`, `Tencent Translate`, `Baidu Translate`, etc.
*   **Want the best quality**: First choice `OpenAI ChatGPT`. If you don't have a paid account, you can choose third-party relay APIs, e.g., 302.ai. Second choice `Gemini` (requires proxy). Third choice domestic AI providers.
*   **Not recommended for use**: DeepLx. This essentially uses free DeepL traffic against its terms. Due to the high number of subtitle lines and frequent requests in a short time, local deployment will quickly get your IP blocked by DeepL, making it unusable.
*   **Not recommended for use**: Local large model translation. Limited by computer resources, locally deployed models are generally smaller and less intelligent, making it highly likely to result in chaotic translation output formats. If you insist on using it, please **uncheck** `Menu -> Tools/Options -> Advanced Options -> Subtitle Translation -> Send complete subtitle content for AI translation`, and set `Number of subtitles to translate simultaneously` to 5 or smaller.
*   **Extreme case: want to translate only one line at a time** to ensure 100% correct format with no blank lines, set `Menu -> Tools/Options -> Advanced Options -> Subtitle Translation -> Number of subtitles to translate simultaneously` to 1. This trades quality for perfect format.

## How to Use Various Domestic AI Providers in the Software

Ensure the provider's API is compatible with OpenAI. Copy the provider's API address, SK (secret key), and model name. Open the software's `Translation Settings -> OpenAI ChatGPT & Compatible APIs`.

![image.png](https://pvtr2.pyvideotrans.com/img/selecttrans5.webp)

Fill in the provider's specified API address in the **API URL** field. Enter the provided secret key in the **SK** field. Enter the model name in the large text box, then select it from the **"Select Model"** dropdown. Test to ensure it works, then save.