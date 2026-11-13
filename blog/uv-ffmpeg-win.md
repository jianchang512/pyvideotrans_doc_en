---
title: 【Beginner's Guide】Setting Up Environment Variables for uv + ffmpeg on Windows
date: 2025-12-02 14:33:00
description: 【Beginner's Guide】Setting Up Environment Variables for uv + ffmpeg on Windows
---

![](https://pvtr2.pyvideotrans.com/1764778166268_path变量.gif)

When deploying AI projects like pyVideoTrans, F5-TTS, or Index-TTS, **uv** and **ffmpeg** are essential foundational tools.

Many friends have downloaded the software but encounter errors when running the source code:
> ![](https://pvtr2.pyvideotrans.com/1764778624067_image.png)

This is because the Windows system doesn't know where these tools are "hidden." This article will guide you step-by-step with images on how to add them to your system's environment variables.

## 1. Preparation
First, please ensure you have downloaded and extracted the relevant tools.
Assume you have placed `uv.exe` and `ffmpeg.exe` together in the `D:/tools` folder, as shown below:
> **Note**: Ensure you can directly see the `.exe` files inside this folder.

![](https://pvtr2.pyvideotrans.com/1764777668424_image.png)

## 2. Configuration Steps

**1. Open System Properties**
Return to your computer desktop, find the 【This PC】 icon, **right-click** on it, and select 【Properties】 at the bottom.
*(Tip: Windows 11 users, if you don't see Properties on the right-click menu, click "Show more options")*
![](https://pvtr2.pyvideotrans.com/1764777756443_1.png)

**2. Access Advanced Settings**
In the settings panel that pops up, scroll down to the bottom, find and click on 【Advanced system settings】.
![](https://pvtr2.pyvideotrans.com/1764777868740_2.png)

**3. Open Environment Variables**
In the small "System Properties" window that appears, click the 【Environment Variables】 button at the bottom right.
![](https://pvtr2.pyvideotrans.com/1764777928672_3.png)

**4. Edit the Path Variable (Key Step)**
In the lower "System variables" section, find the line named `Path`, select it, and then click 【Edit】 (or simply double-click on the Path line).
![](https://pvtr2.pyvideotrans.com/1764777974826_4.png)

**5. Add the Path**
In the list that pops up, click 【New】 in the top right corner, then click 【Browse】.
![](https://pvtr2.pyvideotrans.com/1764778017156_5.png)

**6. Locate the Folder**
In the browse dialog, navigate through `This PC` -> `D:` -> `tools` (or the folder where you placed the exe files), and click OK.
![](https://pvtr2.pyvideotrans.com/1764778052848_6.png)

**7. Save Settings**
Finally, **you must click 【OK】 on all pop-up windows consecutively** until all windows are closed for the settings to take effect.

## 3. Verify Success
1. Press the `Win + R` keys on your keyboard, type `cmd`, and press Enter. ![](https://pvtr2.pyvideotrans.com/1764778519290_image.png)
2. In the black command window, type `uv --version` or `ffmpeg -version`.
3. If a version number appears, the setup is successful! If it still says "is not recognized as an internal command," please restart your computer and try again.

---
## Appendix: Tool Download Links
*   **uv.exe**: Download and extract.
    *   [Download uv (Windows Version)](https://github.com/astral-sh/uv/releases/download/0.9.8/uv-x86_64-pc-windows-msvc.zip)
*   **ffmpeg.exe**: Download and extract, enter the `bin` folder, and place the 3 exe files inside into your tools directory.
    *   [Download ffmpeg](https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-full.7z)