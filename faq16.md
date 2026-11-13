---
title: What is a Network Proxy
date: 2024-01-22 14:33:00
description: What is a Network Proxy
---
If you don't know what a proxy is and cannot access Google, then just ignore this. Remember not to use Google, Gemini, or OpenAI ChatGPT.

**Do not randomly fill in the `Network Proxy Address` field or enter an API address there. You can leave it blank, but do not fill it in incorrectly.**

![](https://pvtr2.pyvideotrans.com/images/5a2e9339824a94ce812b10b8a1edc0dc.jpg)

If you know what a proxy is, are aware that you are using a proxy tool on your computer, and can find the proxy port, then simply enter the proxy address into the Network Proxy Address box. The general format is `http://127.0.0.1:PortNumber`.

If you are using v2ray-type software, fill in `http://127.0.0.1:10809`.

If you are using Clash-type software, fill in `http://127.0.0.1:7890`.

**Please remember,** if you have deployed a local DeepLx, you need to enter the DeepLx address in "Settings Menu - DeepLX", not in the Network Proxy Address field, and then wonder why it doesn't work.

Similarly, if you are using a domestic relay API for ChatGPT, you should also enter the API address in "Settings Menu - OpenAI/ChatGPT", not in the Network Proxy Address field.

![](https://pvtr2.pyvideotrans.com/images/7379a81f557e9f09891919e733f40e68.jpg)

## Do I Still Need to Fill It In If I Have Set a System Proxy?

Press the `Windows key + R key`, type `ms-settings:network-proxy` in the Run window that pops up, and then click OK.

![](https://pvtr2.pyvideotrans.com/images/323478f258180a58f6530b701474415b.jpg)

If the settings panel that opens looks similar to the image below, it means the system proxy is correctly set, and you may not need to fill in the "Network Proxy Address" in the software.

![](https://pvtr2.pyvideotrans.com/images/265f18a6f68a76495fabe6db51b5b9d9.jpg)