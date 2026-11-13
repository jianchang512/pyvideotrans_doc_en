---
title: Common Errors Encountered When Using Video Translation Software
date: 2024-01-22 14:33:00
description: When using video translation software, you may frequently encounter some errors, such as the one in the title and those shown in the images below.
---
When using video translation software, you may frequently encounter some errors, such as the one in the title and those shown in the images below.

![](https://pvtr2.pyvideotrans.com/img/httperror1.webp)

![](https://pvtr2.pyvideotrans.com/img/httperror2.webp)

**The error messages generally contain characters like these:**

`HTTPSConnection`

`Connection error`

`ConnectionError`

`HTTPSConnectionPool`

`Max retries exceeded with url`

These errors mainly occur in the following three usage scenarios:

-   When selecting **Google/OpenAI ChatGPT/Gemini/** in the translation channel.

![](https://pvtr2.pyvideotrans.com/img/httperror3.webp)

-   When selecting **OpenAI TTS/Elevenlabs.io/GoogleTTS** in the dubbing channel.

![](https://pvtr2.pyvideotrans.com/img/httperror4.webp)

-   When selecting **OpenAI Recognition API/** in the speech recognition section.

![](https://pvtrror5.webp)

**Why does this happen? Here are the main reasons:**

## Services Not Directly Accessible from Mainland China Require a VPN, Otherwise Errors Are Inevitable

From the three scenarios above, it's clear that these are all services requiring connections to foreign APIs. As is well known, due to the Great Firewall, these services are not directly accessible from mainland China. To use them, you must connect via a VPN. If you cannot directly open websites like Google (https://www.google.com) or the official OpenAI website (https://chat.openai.com) on your local machine, encountering errors is inevitable.

## Incorrect Proxy Settings Even with a VPN Active

If you can normally access Google on your local machine but the translation software still reports an error, please check the **Network Proxy** text box in the software interface. If there is content inside, but you don't know what it means, its purpose, or you didn't intentionally put it there, please delete it and try again.

![](https://pvtr2.pyvideotrans.com/img/httperror6.webp)

If it still doesn't work, check the VPN tool you are using and find the HTTP proxy port number it indicates. If your VPN tool is running locally, fill in the text box with `http://127.0.0.1:port_number`. For example, for V2Ray series software, it's usually `http://127.0.0.1:10809`, and for Clash series software, it's usually `http://127.0.0.1:7890`.

![](https://pvtr2.pyvideotrans.com/img/httperror7.webp)

**Special Note:** If you don't understand what the above paragraph is talking about, delete all content in the Network Proxy text box and keep it empty. Do not fill in anything. In other words, either leave it blank, or if you fill it in, you must ensure it is a correct and usable proxy address.

> Remember not to fill in the Network Proxy text box randomly or with website addresses or API addresses. Either leave it blank or fill in a usable proxy address and port.
>
> The software will automatically try to obtain proxy settings from the system by default. Generally, if a VPN is active on your local machine, even if the Network Proxy text box is left empty, these services should be accessible. However, this automatic detection might fail due to permissions, security policies, security software, firewalls, etc.
>
> If your local machine can access the services fine, but the software still frequently reports errors, please fill in the correct proxy address in the Network Proxy text box.

## Domestic Translation and AI Services Do Not Support Access via Foreign Proxies or IPs

When using **Baidu Translate/Tencent Translate/ByteDance Volcano Engine Translate/Doubao Model Recognition** in the translation software, you might encounter network connection errors or prompts about unsupported authorization. A possible reason is that the connection was attempted using a foreign IP (e.g., a VPN foreign node/VPN tool, etc.).

These domestic translation and AI services all prohibit access from foreign IPs. If you use a proxy to access these services, errors are certain to occur. Simply delete the content in the Network Proxy text box, and if necessary, turn off your local VPN tool.