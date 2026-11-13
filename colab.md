---
title: Transcribe Audio/Video to Subtitles with pyVideoTrans on Colab
date: 2024-01-22 14:33:00
description: This article will guide you step-by-step on how to use pyVideoTrans on Colab to transcribe audio/video into subtitles. No programming experience is needed. We provide a pre-configured Colab notebook; you just need to click a few buttons to get it done.
---
Google Colab is a free cloud-based programming environment. You can think of it as a computer in the cloud that can run code, process data, and even perform complex AI calculations, such as quickly and accurately converting your audio/video files into subtitles using large models.

This article will guide you step-by-step on how to use pyVideoTrans on Colab to transcribe audio/video into subtitles. No programming experience is needed. We provide a pre-configured Colab notebook; you just need to click a few buttons to get it done.

<video width="100%" controls src="/colab-he.mp4"></video>

## Prerequisites: Internet Access and a Google Account

Before you begin, you need two things:

1.  **Internet Access:** Due to certain reasons, Google services are not directly accessible from some regions. You may need to use specific methods to access Google websites.
2.  **Google Account:** You need a Google account to use Colab. Registration is completely free. With a Google account, you can log in to Colab and use its services.

> Make sure you can open Google: https://google.com

## Open the Colab Notebook

After confirming you can access Google and are logged into your Google account, click the link below to open the Colab notebook we've prepared for you:

https://colab.research.google.com/drive/1kPTeAMz3LnWRnGmabcz4AWW42hiehmfm?usp=sharing

You will see an interface similar to the image below. Since this is a shared notebook, you need to make a copy to your own Google Drive to modify and run it. Click "Copy to Drive" in the top left corner. Colab will automatically create and open a copy for you.

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004915-0.webp)

The image below shows the newly created page.

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004917-1.webp)

## Connect to a GPU/TPU

Colab runs code on a CPU by default. To speed up transcription, we need to use a GPU or TPU.

Click on the menu bar: **Runtime** -> **Change runtime type**. Then, in the "Hardware accelerator" dropdown, select **GPU** or **TPU**. Click **Save**.

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004918-2.webp)

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004918-3.webp)

Once saved, you're done. If any dialog boxes pop up, select options like Allow, Agree, etc.

> It's very simple to use, just three steps.

## 1. Clone the Source Code and Set Up the Environment

Find the first code block (the gray area with a play button) and click the play button to execute the code. This code will automatically download and install pyvideotrans along with its required software.

Wait for the code to finish executing. You'll see the play button turn into a checkmark. Red error messages may appear during the process; they can be ignored.

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004919-4.webp)

## 2. Check if GPU/TPU is Available

Run the second code block to confirm if the GPU/TPU connection is successful. If the output shows CUDA support, the connection is successful. If not, go back and check your GPU/TPU connection.

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004920-5.webp)

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004920-6.webp)

## 3. Upload Audio/Video and Start Transcription

*   **Upload File:** Click the file icon on the left side of the Colab interface to open the file browser.
    ![image.png](https://pvtr2.pyvideotrans.com/img/20241201004921-7.webp)

    Drag and drop your audio/video file from your computer directly into the blank area of the file browser to upload it.

    ![image.png](https://pvtr2.pyvideotrans.com/img/20241201004921-8.webp)

*   **Copy File Path:** After uploading, right-click on the filename and select "Copy path" to get the file's full path (e.g., `/content/yourfilename.mp4`).
    ![image.png](https://pvtr2.pyvideotrans.com/img/20241201004922-9.webp)

*   **Execute the Command**
    ![image.png](https://pvtr2.pyvideotrans.com/img/20241201004922-10.webp)

    Take the following command as an example:

    `!python3 cli.py --model large-v2 --language zh --file "/content/1.mp4"`

    > `!python3 cli.py ` is the fixed command prefix, including the exclamation mark, which is required.
    >
    > After `cli.py`, you can add control parameters, such as which model to use, the audio/video language, using GPU or CPU, where to find the file to transcribe, etc. Only the `audio/video file path` is mandatory; others can be omitted to use default values.

    If your video is named `1.mp4`, after copying its path, paste it into the command. Ensure the path is enclosed in English double quotes to prevent errors if the name contains spaces.

    `!python3 cli.py --file "Paste the copied path here"` becomes
    `!python3 cli.py --file "/content/1.mp4"`

    Then click the play button and wait for it to finish. The required model will be downloaded automatically, and the download speed is usually fast.

    ![image.png](https://pvtr2.pyvideotrans.com/img/20241201004923-12.webp)

    > The default model is `large-v2`. To switch to the `large-v3` model, execute the following command:
    >
    > `!python3 cli.py --model large-v3 --file  "Paste the copied path" `
    >
    > To also set the language to Chinese:
    >
    > `!python3 cli.py --model large-v3 --language zh  --file  "Paste the copied path" `

## Where to Find the Transcription Results

After starting the execution, you'll notice an `output` folder appears in the left-side file list. All transcription results are stored here, named after the original audio/video file.

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004924-13.webp)

Click on the `output` folder name to view all files inside. Right-click on a file and select "Download" to save it to your local computer.

![image.png](https://pvtr2.pyvideotrans.com/img/20241201004924-14.webp)

## Important Notes

1.  Internet access is crucial.
2.  Uploaded files and generated SRT files are only temporarily stored in Colab. When the connection is disconnected or the Colab free session limit is reached, files are automatically deleted, including all cloned source code and installed dependencies. Please download the generated results promptly.
3.  When you reopen Colab or reconnect after a disconnection, you need to start again from step 1.

    ![image.png](https://pvtr2.pyvideotrans.com/img/20241201004925-15.webp)

4.  If you close the browser, where can you find it next time?

    Open this address: https://colab.research.google.com/

    Click on the name you used last time.

    ![image.png](https://pvtr2.pyvideotrans.com/img/20241201004925-16.webp)

5.  As shown above, the name might be hard to remember. How to change it?

    ![image.png](https://pvtr2.pyvideotrans.com/img/20241201004925-17.webp)