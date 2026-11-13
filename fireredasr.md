---
title: Xiaohongshu Open-Sources FireRedASR
date: 2024-01-22 14:33:00
description: Xiaohongshu has open-sourced a speech recognition project named FireRedASR, which performs excellently in Chinese speech recognition. Previously, they only open-sourced a smaller AED model. Recently, they released a larger LLM model, further improving recognition accuracy.
---

Xiaohongshu has open-sourced a speech recognition project named FireRedASR, which performs excellently in Chinese speech recognition. Previously, they only open-sourced a smaller AED model. Recently, they released a larger LLM model, further improving recognition accuracy.

This ASR model has been integrated into a package and can be conveniently used within the video translation software (pyVideoTrans).

## Package Download and Model Description

**Model Size:**

*   **AED Model (model.pth.tar):** 4.35GB
*   **LLM Model:** Contains two models
    *   Xiaohongshu Recognition Model (model.pth.tar): 3.37GB
    *   Qwen2-7B Model (4 files): Total 17GB

**Total model size is approximately 21GB.** Even when compressed into a 7z file, the size still exceeds 10GB. Due to size limitations preventing upload to GitHub or cloud storage, the package only contains the main program and does not include any model files.

After downloading the package, please follow the steps below to download the model files separately and place them in the specified locations.

> **Note:** The model files are hosted on the **huggingface.co** website, which is not directly accessible from within China. You will need a VPN to download them.

## Main Package Download

The main package is relatively small, **1.7G**. You can download it directly by opening the following address in your browser:

[https://github.com/jianchang512/fireredasr-ui/releases/download/v0.3/fireredASR-2025-0224.7z](https://github.com/jianchang512/fireredasr-ui/releases/download/v0.3/fireredASR-2025-0224.7z)

After downloading, extract the archive. You should see a file structure similar to the image below:

![](https://img.pyvideotrans.com/file/1740320246309_image.png)

## Download the AED Model

Downloading the AED model is relatively simple, requiring only one model file.

1.  Download the `model.pth.tar` file.
    > Download link:
    >
    > [https://huggingface.co/FireRedTeam/FireRedASR-AED-L/resolve/main/model.pth.tar?download=true](https://huggingface.co/FireRedTeam/FireRedASR-AED-L/resolve/main/model.pth.tar?download=true)

2.  Place the downloaded `model.pth.tar` file into the `pretrained_models/FireRedASR-AED-L` folder within the extracted package directory.

After downloading, the file location should look like the example below:

![](https://img.pyvideotrans.com/file/1740318846202_image.png)

## Download the LLM Model

Downloading the LLM model is slightly more complex, requiring a total of 5 files (1 Xiaohongshu model + 4 Qwen2 model files).

**1. Download the Xiaohongshu Model (model.pth.tar):**

*   Download link:
    [https://huggingface.co/FireRedTeam/FireRedASR-LLM-L/resolve/main/model.pth.tar?download=true](https://huggingface.co/FireRedTeam/FireRedASR-LLM-L/resolve/main/model.pth.tar?download=true)

*   Place the downloaded `model.pth.tar` file into the `pretrained_models/FireRedASR-LLM-L` folder within the package. Please ensure the folder name contains `LLM` and do not place it in the wrong location.

The file location should look like the example below:

![](https://img.pyvideotrans.com/file/1740319032881_image.png)

**2. Download the Qwen2 Model (4 files):**

*   Download the files from the following **4 links** separately and place them into the `pretrained_models/FireRedASR-LLM-L/Qwen2-7B-Instruct` folder within the package.

    *   [https://huggingface.co/Qwen/Qwen2-7B-Instruct/resolve/main/model-00001-of-00004.safetensors?download=true](https://huggingface.co/Qwen/Qwen2-7B-Instruct/resolve/main/model-00001-of-00004.safetensors?download=true)
    *   [https://huggingface.co/Qwen/Qwen2-7B-Instruct/resolve/main/model-00002-of-00004.safetensors?download=true](https://huggingface.co/Qwen/Qwen2-7B-Instruct/resolve/main/model-00002-of-00004.safetensors?download=true)
    *   [https://huggingface.co/Qwen/Qwen2-7B-Instruct/resolve/main/model-00003-of-00004.safetensors?download=true](https://huggingface.co/Qwen/Qwen2-7B-Instruct/resolve/main/model-00003-of-00004.safetensors?download=true)
    *   [https://huggingface.co/Qwen/Qwen2-7B-Instruct/resolve/main/model-00004-of-00004.safetensors?download=true](https://huggingface.co/Qwen/Qwen2-7B-Instruct/resolve/main/model-00004-of-00004.safetensors?download=true)

After downloading, the `Qwen2-7B-Instruct` folder should contain 4 files, as shown in the image below:

![](https://img.pyvideotrans.com/file/1740319183044_image.png)

## Starting the Package

Once all model files are downloaded and placed correctly, double-click the `启动.bat` (Start.bat) file in the package directory to launch the program.

After the program starts, it will automatically open the address `http://127.0.0.1:5078` in your browser. If you see the interface shown below, it means the program has started successfully and is ready to use.

![](https://img.pyvideotrans.com/file/1740319997817_image.png)

## Using it in Video Translation Software

If you want to use the FireRedASR model in the pyVideoTrans video translation software, please follow these steps:

1.  Ensure you have downloaded and placed the model files as described above and have successfully started the package.
2.  Open the pyVideoTrans software.
3.  In the software menu, navigate to **Menu** -> **Speech Recognition Settings** -> **OpenAI Speech Recognition & Compatible AI**.
4.  In the settings interface, fill in the relevant information as shown in the image below.

    ![](https://img.pyvideotrans.com/file/1740319865234_image.png)
5.  After filling in the details, click **Save**.
6.  In the speech recognition channel selection, choose **OpenAI Speech Recognition**.

    ![](https://img.pyvideotrans.com/file/1740320052716_image.png)

## API Address:

Default address: <http://127.0.0.1:5078/v1>

**Usage with OpenAI SDK**

```
from openai import OpenAI
client = OpenAI(api_key='123456',
    base_url='http://127.0.0.1:5078/v1')

audio_file = open("5.wav", "rb")
transcript = client.audio.transcriptions.create(
  model="whisper-1",
  file=audio_file,
  response_format="json",
  timeout=86400
)

print(transcript.text)


```