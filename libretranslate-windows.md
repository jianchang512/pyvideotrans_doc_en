---
title: LibreTranslate Open-Source Local Machine Translation Project
date: 2024-01-22 14:33:00
description: LibreTranslate is an excellent open-source local machine translation project that supports translation between numerous languages. The official documentation provides installation methods for various platforms, including Docker. However, it does not offer a pre-packaged Windows installer; Docker is required for installation on Windows.
---
LibreTranslate is an excellent open-source local machine translation project that supports translation between numerous languages. The official documentation provides installation methods for various platforms, including Docker. However, it does not offer a pre-packaged Windows installer; Docker is required for installation on Windows.

> https://libretranslate.com/
>
> ![image.png](https://pvtr2.pyvideotrans.com/img/20241104003255-0.webp)
>
> ![image.png](https://pvtr2.pyvideotrans.com/img/20241104003256-1.webp)

I've simply created a Windows all-in-one package. Just extract it and double-click to use, making it convenient for novice users.

## Download the All-in-One Package

![image.png](https://pvtr2.pyvideotrans.com/img/20241104003257-2.webp)

> Baidu Netdisk link for the all-in-one package: https://pan.baidu.com/s/1UN7WL69DA59iKHHtT6h1GQ?pwd=a5ce
> Update patch download for the all-in-one package (changes the model storage location to the package directory instead of the C:\Users directory): https://pan.baidu.com/s/1yLWpJM8qXJO8sWVnZ_ew-A?pwd=g59m

Download the all-in-one package from the provided address. After downloading, extract it to a directory. You will see a file named `启动.bat` (Start.bat). Double-click it to launch. Upon successful startup, the following screen will be displayed.

![image.png](https://pvtr2.pyvideotrans.com/img/20241104003257-3.webp)

Note: The first time you launch it, it will download the translation models online. There are about 92 models in total, so the download time can be quite long. Please be patient.

If the download fails, please set up your system proxy in advance and restart `启动.bat`.

By default, after downloading, the models are stored in the user's home directory. Open any folder, delete the contents of the address bar, enter the command `%userprofile%/.local/share/argos-translate/packages`, and press Enter. You will then see all the downloaded models.

**After downloading and overwriting with the patch package, the model storage location will be changed to the `models` folder within the all-in-one package directory. You will need to re-download the models, or refer to the `补丁包说明.txt` (Patch Instructions.txt) to copy the `.local` folder into the `models` directory.**

> You must have completed at least some downloading before you can open this directory; otherwise, you will be prompted that the directory does not exist.
> ![image.png](https://pvtr2.pyvideotrans.com/img/20241104003257-4.webp)

It comes with a web interface. The default address is `http://127.0.0.1:5000`. Open this address in your browser to see the following interface.

![image.png](https://pvtr2.pyvideotrans.com/img/20241104003257-5.webp)

The left side is the input area for the original text to be translated, and the right side is the area for the translation results.

## Using the API

After successfully starting the service by double-clicking `启动.bat` in the previous step, the API is also ready for use. The API address is `http://127.0.0.1:5000/translate`.

The web page displays a JavaScript code example for using the translation API.

![image.png](https://pvtr2.pyvideotrans.com/img/20241104003258-6.webp)

## Using it in Video Translation Software

Open your video translation software, click on the menu -> Translation Settings -> LibreTranslate. In the window that appears, enter `http://127.0.0.1:5000/translate` in the "API URL" text box. Leave the "API KEY" field empty.

![image.png](https://pvtr2.pyvideotrans.com/img/20241104003258-7.webp)