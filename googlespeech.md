---
title: Using Google Speech Recognition
date: 2024-01-22 14:33:00
description: Google's speech recognition is not powerful and cannot distinguish or return punctuation marks.
---

![](https://pvtr2.pyvideotrans.com/1743256236197_image.png)


## Notes When Using Google Recognition

1. A network proxy must be configured; otherwise, it cannot connect.
2. Google's speech recognition is not powerful and cannot distinguish or return punctuation marks.
3. Suitable for audio recognition with clean background noise and clear, accurate human speech.

## How to Use

In the software interface, select **GoogleSpeech** from the mode dropdown box. When this option is selected, there is no need to choose a model or segmentation method.





## Pros and Cons

**Pros**: No need to download models, saves system resources, simple to use.

**Cons**: Requires a proxy, effectiveness is slightly inferior.


## Proxy Issue

When using services like Google Gemini, due to well-known reasons, a proxy is mandatory. The general format is `http://127.0.0.1:port_number`. If you are certain you are using a system proxy and can access it in your browser but don't know how to fill in the network proxy address, execute the following command to confirm if the system proxy is correctly enabled.

Hold down the `Windows key + R key`, type `ms-settings:network-proxy` in the pop-up Run window, and then click OK.


![](https://pvtr2.pyvideotrans.com/images/323478f258180a58f6530b701474415b.jpg)

If the settings panel that pops up is similar to the image below, it indicates the system proxy is correctly set, and you may not need to fill in the "Network Proxy Address" in the software.

![](https://pvtr2.pyvideotrans.com/images/265f18a6f68a76495fabe6db51b5b9d9.jpg)