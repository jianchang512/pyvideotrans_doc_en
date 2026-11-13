---
title: Using ByteDance Volcano Subtitle Generation
date: 2024-01-22 14:33:00
description: Using ByteDance Volcano Subtitle Generation
---

# This article explains how to use the `ByteDance Volcano Subtitle Generation` channel in speech recognition


![](https://pvtr2.pyvideotrans.com/1761549735548_image.png)


> Please note, this refers to the `ByteDance Volcano Subtitle Generation` channel, which is **not the same thing** as `ByteDance Speech Recognition Large Model Fast Version`.
>
> Also, ByteDance Volcano has a large number of similarly named speech recognition services. You **must** use the specified `Audio and Video Generation` service. Refer to the corresponding ByteDance documentation image:  
> ![](https://pvtr2.pyvideotrans.com/1761551219585_image.png)
>


## First, Log in and Register for Volcano Engine

Login address: [https://console.volcengine.com/auth/login](https://console.volcengine.com/auth/login). The Volcano backend can be a bit messy. After logging in, please click directly on this address: https://console.volcengine.com/speech/app to create an application.

If you don't have an account, you'll need to register first, and also complete real-name verification.

## Create an Application

After logging in and completing real-name verification in the previous step, open this address: https://console.volcengine.com/speech/app to create an application. Please double-check that the top-left corner is set to **Legacy Version**. In the new version, you might not easily find where to create an application, and you might accidentally end up creating an `Intelligent Agent Application`, which naturally won't work with this software.


![](https://pvtr2.pyvideotrans.com/1761549270733_image.png)


https://console.volcengine.com/speech/service/9

Please double-check that the top-left corner is **Legacy Version**, and the opened menu item on the left is `API Service Center -- Audio/Video Subtitles -- Audio/Video Subtitle Generation`. If the selected product is incorrect, it definitely won't work properly.



Click "Create Application". Fill in the name in English, description is optional. The important part is the list of checkboxes below. Scroll to the bottom and select **Audio and Video Subtitle Generation**. This is mandatory; others can be left unchecked.

![](https://pvtr2.pyvideotrans.com/1761549380146_image.png)


Click OK, then proceed to the next step "Obtain APP ID and Access Token".


## Obtain Access Token / Activate Official Version

After creating the application, go to the service activation area to copy the Access Token. Navigate as shown in the image below, click on **API Service Center -- Audio/Video Subtitles -- Audio/Video Subtitle Generation** on the left, or go directly to:

https://console.volcengine.com/speech/service/9

You will see all created applications. Select the one you want to use. By default, it's a trial version with 20 hours of free usage.

Select your application from the dropdown at the top of the page. Scroll to the bottom and find the **"Service Interface Authentication Information"** section. Copy the **APP ID** and **Access Token**; these two pieces of information will be used in the code.


![](https://pvtr2.pyvideotrans.com/1761549485007_image.png)



## Using it in the pyVideoTrans Software

![](https://pvtr2.pyvideotrans.com/1761549587099_image.png)

> **Special Note:** `ByteDance Volcano Subtitle Generation` and `ByteDance Speech Recognition Large Model Fast Version` are two different things and need to be configured separately.

1. Open the pyVideoTrans video translation and dubbing software. Go to `Menu -- Speech Recognition Settings -- ByteDance Volcano Subtitle Generation`.
2. Enter the APP ID and Access Token.
3. Save. Then, on the main interface, select "ByteDance Volcano Subtitle Generation".
![](https://pvtr2.pyvideotrans.com/1743256301624_image.png)