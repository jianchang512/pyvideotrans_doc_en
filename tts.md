---
title: Clone-Voice Tool
date: 2024-01-22 14:33:00
description: This is a voice cloning tool that can use any human voice tone to synthesize speech from text or convert one voice into another using that tone.
---
## Voice Cloning Tool


[clone-voice Open Source Project Repository](https://github.com/jianchang512/clone-voice)


The models used in this project are sourced from https://github.com/coqui-ai/TTS. The model license is [CPML](https://coqui.ai/cpml/) and is for learning and research purposes only, not for commercial use.


>
> This is a voice cloning tool that can use any human voice tone to synthesize speech from text or convert one voice into another using that tone.
>
> It's very simple to use. You don't need an NVIDIA GPU. Download the pre-compiled version, double-click `app.exe` to open a web interface, and you can use it with just a few clicks.
>
> Supports **16 languages including Chinese, English, Japanese, Korean, French, German, Italian**, and allows online voice recording via microphone.
>
> For optimal synthesis results, it is recommended to record audio lasting 5 to 20 seconds, with clear and accurate pronunciation and no background noise.
>
> The English synthesis effect is excellent, while the Chinese effect is acceptable.
>



# How to Use the Pre-compiled Windows Version (Other systems can deploy from source)

1. [Click here to open the Releases download page](https://github.com/jianchang512/clone-voice/releases), download the pre-compiled main file (1.7G) and the models (3G).

2. After downloading, extract the files to a location, e.g., `E:/clone-voice`.

3. Double-click `app.exe` and wait for the web window to open automatically. **Please read the text prompts in the cmd window carefully**, as any errors will be displayed there.

4. After downloading the models, extract them into the `tts` folder within the software directory.

5. Conversion Steps

	- Select the **【Text -> Voice】** button, enter text in the text box or click "Import SRT subtitle file", then click "Start Now".
	
	- Select the **【Voice -> Voice】** button, click or drag the audio file (mp3/wav/flac) you want to convert. Then, from the "Voice file to use" dropdown, select the voice tone you want to clone. If none are satisfactory, you can also click the "Local Upload" button to choose a pre-recorded 5-20s wav/mp3/flac voice file. Or click the "Start Recording" button to record your own voice online for 5-20s, then click "Use" after recording. Finally, click the "Start Now" button.

6. If the machine has an NVIDIA GPU and the CUDA environment is correctly configured, CUDA acceleration will be used automatically.



# Source Code Deployment (Linux, Mac, Windows)

**The source code version requires a global proxy because it needs to download models from https://huggingface.co, which is inaccessible from within China.**

0. Requirements: Python 3.9 -> 3.11.
1. Create an empty directory, e.g., `E:/clone-voice`. Open a cmd window in this directory by typing `cmd` in the address bar and pressing Enter.
   Use git to pull the source code to the current directory: `git clone git@github.com:jianchang512/clone-voice.git .`
2. Create a virtual environment: `python -m venv venv`.
3. Activate the environment. On Windows: `E:/clone-voice/venv/scripts/activate`.
4. Install dependencies: `pip install -r requirements.txt`.
5. On Windows, extract `ffmpeg.7z` and place `ffmpeg.exe` in the same directory as `app.py`. For Linux and Mac, download the corresponding version of ffmpeg from the [ffmpeg official website](https://ffmpeg.org/download.html), extract it, and place the executable binary `ffmpeg` in the root directory. The executable `ffmpeg` must be in the same directory as `app.py`.

   **First, run** `python code_dev.py`. When prompted to agree to the license, enter `y`, then wait for the models to finish downloading.
   Downloading the models requires a global proxy. The models are very large, and if the proxy is not stable and reliable, you may encounter many errors; most errors are caused by proxy issues.

   If it shows that multiple models were downloaded successfully but still prompts a "Downloading WavLM model" error at the end, you need to modify the library file `\venv\Lib\site-packages\aiohttp\client.py`. Around line 535, above `if proxy is not None:`, add your proxy address, e.g., `proxy="http://127.0.0.1:10809"`.

7. After the download is complete, start the application with `python app.py`.

8. Each startup will connect to external servers to check or update models. Please be patient. If you don't want it to check or update on every startup, you need to manually modify a file in the dependency package. Open `\venv\Lib\site-packages\TTS\utils\manage.py`, around line 389, in the `def download_model` method, comment out the following code:

```
if md5sum is not None:
	md5sum_file = os.path.join(output_path, "hash.md5")
	if os.path.isfile(md5sum_file):
	    with open(md5sum_file, mode="r") as f:
		if not f.read() == md5sum:
		    print(f" > {model_name} has been updated, clearing model cache...")
		    self.create_dir_and_download_model(model_name, model_item, output_path)
		else:
		    print(f" > {model_name} is already downloaded.")
	else:
	    print(f" > {model_name} has been updated, clearing model cache...")
	    self.create_dir_and_download_model(model_name, model_item, output_path)
```

9. The source code version may frequently encounter errors during startup, mostly due to proxy issues preventing model downloads from external servers or incomplete downloads. It is recommended to use a stable proxy and enable it globally. If you cannot complete the download, it is recommended to use the pre-compiled version.


# CUDA Acceleration Support

[Detailed Installation Guide for CUDA Toolkit](https://juejin.cn/post/7318704408727519270)



# Important Notes

The xtts model is for learning and research purposes only, not for commercial use.

0. The source code version requires a global proxy because it needs to download models from https://huggingface.co, which is inaccessible from within China. The source code version may frequently encounter errors during startup, mostly due to proxy issues preventing model downloads from external servers or incomplete downloads. It is recommended to use a stable proxy and enable it globally. If you cannot complete the download, it is recommended to use the pre-compiled version.

1. After startup, the model needs to be cold-loaded, which takes some time. Please wait patiently until `http://127.0.0.1:9988` is displayed and the browser page opens automatically. Wait an additional two to three minutes before performing conversions.

2. Features include:

		Text to Speech: Input text and generate speech using the selected voice tone.
		
		Voice to Voice: Select an audio file from your local machine and generate another audio file using the selected voice tone.

3. If the opened cmd window remains unresponsive for a long time and requires pressing Enter to continue output, click the icon in the top-left corner of the cmd window, select "Properties", then uncheck the boxes for "QuickEdit Mode" and "Insert Mode".