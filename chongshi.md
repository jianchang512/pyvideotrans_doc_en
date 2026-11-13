---
title: Translation Channel Error Analysis and Resolution
date: 2024-01-22 14:33:00
description: When translating original subtitles into target language subtitles, the system connects to a translation API service. If the translation fails, it will retry up to 2 times before reporting an error.
---

When translating original subtitles into target language subtitles, the system connects to a translation API service. If the translation fails, it will retry up to 2 times before reporting an error.

## Currently, a total of 11 translation channels are supported, but almost none are directly usable for free.

**1. Some offer free trials but have rate limits and character limits** (e.g., Baidu Translate, Tencent Translate). When these limits are reached, errors naturally occur, making the service unavailable.

**2. Require a VPN/Proxy for free use**, such as Google Translate and occasionally unstable Microsoft Translate. If no proxy is used or the proxy is unstable, connection failures and errors are certain to occur.

**3. DeepLX, which leverages DeepL for free**, is deployed locally. However, the IP address often gets blocked after a few uses, leading to errors.

**4. For the paid version of DeepL**, you must ensure the authorization key is correct; otherwise, authorization errors will be reported.

**4. Using the official ChatGPT API interface**: Free users are only allowed 3 requests per minute. Exceeding this limit causes errors. If you are not a paying user, don't consider the official ChatGPT API—it's essentially unusable. Even paid accounts require a VPN/Proxy.

**5. Using third-party relayed ChatGPT API interfaces**: The API addresses provided by third parties may also be blocked. Without a proxy, connections will fail, naturally resulting in errors.

**6. Models like Kimi, Qwen**, and many other large language models offer interfaces fully compatible with OpenAI's, which can be used as third-party ChatGPT APIs. Simply enter the relevant API address and secret key in the ChatGPT API settings.

In summary, each translation channel has requirements regarding proxies, APIs, keys, etc. If these are not met, errors will definitely occur.

**If an error occurs, please carefully check the API address, authorization key, proxy settings, etc., one by one, according to the translation channel you are using.**

Finally, to help novice users get started quickly and avoid getting stuck on the translation channel step, version 1.40 specifically added the "**FreeGoogle**" translation channel. It requires no proxy or any configuration—just select it to use.

If you are not a novice user, please do not use this translation channel. It has request limits, and exceeding them will still cause errors. Please leave the request quota for novice users. This channel essentially uses a reverse-proxied Google Translate service.