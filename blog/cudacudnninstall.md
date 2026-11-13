---
title: Installing CUDA 12.6 and cuDNN 9.8 on Windows (Detailed Guide for Beginners)
date: 2025-03-13 17:11:37
description: This article provides detailed steps for installing CUDA 12.6 and cuDNN 9.8

---

If you want to run programs that require GPU acceleration (like AI software) on your computer, you may need to install CUDA.

CUDA is a toolkit developed by NVIDIA that allows your graphics card to do more work. This guide will walk you through installing CUDA 12.6 and the corresponding cuDNN 9.8 on Windows 10.

> Why choose CUDA 12.6 instead of 12.8? Because 12.8 is the latest version, and some software might not be fully compatible yet, which can lead to issues. Version 12.6 is a relatively stable and up-to-date choice. Of course, if you prefer version 12.4 or 12.8, the installation process is similar; you can adjust the version numbers by following this tutorial.

Don't worry, even if you have no technical background, you can get this done by following the steps! Let's get started!

---

## Step 1: Check if Your Graphics Card is NVIDIA

1. **Open Device Manager**
   - Right-click the "Start" button (the Windows icon) in the bottom-left corner of your desktop.
   - In the pop-up menu, select "Windows Administrative Tools" > "Computer Management" to open the window.
![](https://pvtr2.pyvideotrans.com/1741855032238_image.png)

2. **Find Graphics Card Information**
   - In the Computer Management window, click `Device Manager` on the left, then find "Display adapters" on the right and click the small arrow in front to expand it.
![](https://pvtr2.pyvideotrans.com/1741855122134_image.png)

   - Look for the word "NVIDIA," such as "NVIDIA GeForce GTX 1660."
   - If you see it, congratulations! Your graphics card is NVIDIA, and you can proceed. If not (e.g., it shows "Intel" or "AMD"), CUDA won't work, and this tutorial ends here.

---

## Step 2: Check and Update Your Graphics Driver Version

1. **Open NVIDIA Management Software**
   - If you have installed the graphics driver, there might be a green "NVIDIA" icon in the system tray (next to the time). Right-click it and select "NVIDIA GeForce Experience" to open it.
![](https://pvtr2.pyvideotrans.com/1741855239945_image.png)

   - If you don't see it, skip to step 3 to download manually.

2. **Check Driver Version and Update**
   - After opening, click "Drivers" in the top-left corner.
   - It will show the current driver version (e.g., "546.33"). If a newer version is available, there will be a "Download" button.
   - Click "Download" and follow the prompts to install. Restart your computer after installation.

3. **No Software? Download Driver Manually**
   - Open your browser and go to: **https://www.nvidia.com/en-us/geforce/drivers/** to download the driver update software, then install it.
   - After installation, open it and follow the instructions to check for and update the driver.

---

## Step 3: Check for Existing CUDA and Determine Maximum Supported Version

1. **Open Command Prompt (CMD)**
   - Press the Windows key + R on your keyboard to open the "Run" window.
   - Type `cmd` and press Enter to open a black command prompt window.

![](https://pvtr2.pyvideotrans.com/1741855372973_image.png)

2. **Check CUDA Version**
   - In the command prompt, type: `nvcc -V`
![](https://pvtr2.pyvideotrans.com/1741855649019_image.png)

   Press Enter. If it shows something like `Cuda compilation tools, release 12.6, V12.6.xxx`, it means CUDA is already installed, and the version is 12.6. If it shows "not recognized as an internal or external command," CUDA is not installed, and you should proceed with the installation.

3. **Check the Maximum Supported CUDA Version**
   - In the command prompt, type: `nvidia-smi`
![](https://pvtr2.pyvideotrans.com/1741855628289_image.png)

   Press Enter. A table will appear. Look for "CUDA Version" in the top-right corner (e.g., 12.6 or higher). This indicates the highest version your driver supports. As long as it's 12.6 or above, you can install CUDA 12.6.

---

## Step 4: Download and Install CUDA 12.6

1. **Download CUDA 12.6**
   - Open your browser and go to the NVIDIA download page: **[https://developer.nvidia.com/cuda-downloads?target_os=Windows&target_arch=x86_64&target_version=10&target_type=exe_local](https://developer.nvidia.com/cuda-downloads?target_os=Windows&target_arch=x86_64&target_version=10&target_type=exe_local)**
   - Select "Windows" > "x86_64" > "10" > "exe (local)," then click "Download."
   - The filename will be something like `cuda_12.8.1_572.61_windows.exe`, and it will be downloaded to your "Downloads" folder.

![](https://pvtr2.pyvideotrans.com/1741856979317_image.png)

2. **Install CUDA (Custom Mode)**
   - Double-click the downloaded file. An installation window will pop up. Agree to the license and click Next.
   - Select "Custom (Advanced)" installation and click Next.
![](https://pvtr2.pyvideotrans.com/1741855836251_image.png)

   - In the options list, only check the first line "CUDA." Uncheck all other options to avoid conflicts.
![](https://pvtr2.pyvideotrans.com/1741857278399_image.png)

   - Then click the `+` sign in front of `CUDA` and uncheck `Visual Studio Integration` to prevent installation failures.
![](https://pvtr2.pyvideotrans.com/1741857065756_image.png)

   - Click "Next" and follow the prompts to complete the installation. The default path is `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.6`.

3. **What to Do If You Encounter an Error?**
![](https://pvtr2.pyvideotrans.com/1741857329334_image.png)

   - If the installation is interrupted with a message like "Not Installed" or "Failed," you might have selected the wrong options. Run the installer again, choose custom installation, ensure only the first line "CUDA" is selected (with all others unchecked), and under CUDA, uncheck `Visual Studio Integration`.
   - If it still fails, proceed to the next step to install Visual Studio.

---

## Step 5: Install Visual Studio (If CUDA Installation Fails)
> If you unchecked `Visual Studio Integration` in the previous step, you likely won't encounter an error. If you do, please install Visual Studio as described here.

1. **Download Visual Studio Community Edition**
   - Open your browser and go to: **[https://visualstudio.microsoft.com/zh-hans/free-developer-offers/](https://visualstudio.microsoft.com/zh-hans/free-developer-offers/)**
   - Click "Free download Visual Studio Community" (Community Edition) to download the installer.
![](https://pvtr2.pyvideotrans.com/1741856177861_image.png)

2. **Install C++ Development Environment**
   - Double-click the installer. In the pop-up window, select "Desktop development with C++."
   - Click "Install." This may take several tens of minutes. Restart your computer after installation.
![](https://pvtr2.pyvideotrans.com/1741856668321_image.png)

3. **Reinstall CUDA 12.6**
   - Go back to Step 4 and run the CUDA installer again. In custom mode, select only the "Runtime" option for installation. This time, it should succeed.

---

## Step 6: Verify CUDA Installation and Configure Environment Variables

1. **Check if Installation Was Successful**
   - Open CMD (Windows key + R, type `cmd`).
   - Type: `nvcc -V`
![](https://pvtr2.pyvideotrans.com/1741855649019_image.png)
   If it shows `Cuda compilation tools, release 12.6, V12.6.xxx`, the installation was successful. If it says "not recognized as an internal or external command," you need to add environment variables.

2. **Add CUDA to Environment Variables**
   - Right-click "This PC," select "Properties" > "Advanced system settings" > "Environment Variables."
   - Under "System variables," find "Path," click "Edit," then "New," and add the following paths:
     ```
     C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.6\bin
     C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.6\lib
     C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.6\include
     C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.6\libnvvp
     ```
   - Click "OK" to save and close all windows.
   - Reopen CMD and type `nvcc -V`. You should now see the version information.

![](https://pvtr2.pyvideotrans.com/img/20241117234510-4.webp)
![](https://pvtr2.pyvideotrans.com/img/20241117234510-5.webp)
![](https://pvtr2.pyvideotrans.com/1741856509207_image.png)
![](https://pvtr2.pyvideotrans.com/1741856513146_image.png)

---

## Step 7: Install cuDNN 9.8

1. **Download cuDNN 9.8**
   - Open your browser and go to: **[https://developer.nvidia.com/cudnn-downloads?target_os=Windows&target_arch=x86_64&target_version=10&target_type=exe_local](https://developer.nvidia.com/cudnn-downloads?target_os=Windows&target_arch=x86_64&target_version=10&target_type=exe_local)**
   - You may need to log in to your NVIDIA account (register for free if you don't have one).
   - Select the "local" version and download the Windows `.exe` file.
![](https://pvtr2.pyvideotrans.com/1741856943400_image.png)

2. **Install cuDNN**
   - Double-click the downloaded `.exe` file and follow the prompts to install.

> If cuDNN doesn't work in your programs after installation, you can open the installation directory (default: `C:\Program Files\NVIDIA\CUDNN\v9.8`), copy the `lib`, `bin`, and `include` folders, and paste them into `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.6`, overwriting if prompted.

---

## Finally: All Done!

Now CUDA 12.6 and cuDNN 9.8 are installed! You can start running programs that require GPU support. If there are software instructions (e.g., run `python script.py`), open CMD, navigate to your project folder, and try the corresponding commands.