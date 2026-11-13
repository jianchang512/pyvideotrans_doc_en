---
title: Index-TTS2 Windows One-Click Package, IndexTTS2 Integration Package
date: 2025-09-10 14:33:00
description: One-click integration package download for index-tts2 on Windows 10 and 11, IndexTTS2 integration package
---



# Download Index-TTS2 Windows One-Click Integration Package


## Download Link

> Direct download of the index-tts2 integration package for Windows system
> 
> [Baidu Netdisk Download Link](https://pan.baidu.com/s/1dmLdhJgBC7HlfY-hITMVeg?pwd=1234)
>
> [huggingface.co Download Link](https://huggingface.co/mortimerme/repocollect/resolve/main/indextts2-0529.7z?download=true)
>
> After extracting, double-click `start webui.bat` and wait for the model to download automatically. Once completed, it will launch.

## How to Use

1. Extract the downloaded file after download.
2. Double-click the extracted `start webui.bat` file.
3. On first launch, it will automatically create a Python environment, install dependencies, and download the index-tts2 model. This may take anywhere from a few minutes to tens of minutes, so please be patient.

![](https://pvtr2.pyvideotrans.com/1757555342996_image.png)

---

If the bottom of the final window shows as the image below, it means success.

![](https://pvtr2.pyvideotrans.com/1757555245090_Snipaste_2025-09-10_14-06-22.png)

---

If the final screen shows `Error:` or similar text as in the image below, it indicates failure. Please close the window and reopen it.

![](https://pvtr2.pyvideotrans.com/1757555246399_3.png)


4. Upon success, the browser will automatically open the address `http://127.0.0.1:7860`.

![](https://pvtr2.pyvideotrans.com/1757555427297_image.png)


## Change Model Download Source Address

By default, the Index-TTS2 model is downloaded from modelscope.cn. If you prefer to download from huggingface.co, open the `webui.py` file, locate line 53, delete the `#` symbol before the following 4 lines of code, and then delete the subsequent 3 lines of code. See the image for reference.

![](https://pvtr2.pyvideotrans.com/1757555601819_image.png)




- [index-tts2 Official Repository](https://github.com/index-tts/index-tts)