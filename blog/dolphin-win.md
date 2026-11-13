---
title: Easily Transcribe Audio/Video in Eastern Languages (Dialects and Low-Resource Languages) into Subtitles - Dolphin All-in-One Package
date: 2025-07-27 18:33:00
description: Easily Transcribe Audio/Video in Eastern Languages (Dialects and Low-Resource Languages) into Subtitles - Dolphin All-in-One Package
---

**Have you ever encountered this frustration?**

Many speech-to-text tools work well with English, but their performance is often unsatisfactory when dealing with Eastern languages like Chinese dialects (Cantonese, Sichuanese, etc.), Vietnamese, Filipino, and others.

**Good news is here!**

The Dataocean AI team has developed and open-sourced the **Dolphin** project. This is a speech transcription model specifically optimized for Eastern languages, enabling more accurate recognition of these languages.

To make this powerful tool accessible and easy to use for non-technical users, I have created a **simple-to-use graphical interface and a one-click all-in-one package**.

---

### Download Links

-   • **Method 1:**  Download from Baidu Netdisk: https://pan.baidu.com/s/1ODhqN-GiaHoGdU-ml3kCUQ?pwd=i2ui
-   • **GitHub Address:**  https://github.com/jianchang512/speech2text-df

* * *

### Key Features: Simple & Efficient

-   • **Focus on Eastern Languages:**  Specially optimized to support various Eastern languages and dialects.
-   • **Easy to Use:**  Simply upload an audio/video file, select the language, and click a button.
-   • **Flexible Output:**  Generates SRT subtitle files by default, also supports TXT text or JSON format.

* * *

### How to Use? (Graphical Interface Version)

Follow the steps below to get started easily:

1.  1. **Launch the Tool**

1.  -   • After running the program, it will automatically open a web interface in your browser, typically at `http://127.0.0.1:5080`. If it doesn't open automatically, just enter this address manually.

1.  2. **Upload Audio or Video File**

1.  -   • Click the "Choose File" button on the interface and locate the audio or video file you want to transcribe.
    -   • Supports multiple formats: mp3, mp4, mpeg, mpga, m4a, wav, webm, aac, flac, mov, mkv, avi, etc.

1.  3. **Select Language**

1.  -   • In the "Language Selection" dropdown menu, find the language corresponding to your file (e.g., Chinese Mandarin, Chinese Sichuanese, Cantonese, etc.).
    -   • **Not sure about the language?**  No problem, select "Auto Detect" and let the tool figure it out for you.

1.  4. **Select Output Format**

    ![Image](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/adc306866589485a97901d06ec06aec9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbW9ydGltZXI=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDQ0MTY4MjcwNDYyMzk5MiJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1753710913&x-orig-sign=GvxBX%2FczePYw1EXrDQYuTiP180E%3D "null")

1.  -   • By default, it generates SRT subtitle files.
    -   • You can also choose to output TXT (plain text) or JSON (structured data) as needed.

1.  5. **Start Transcription**

1.  -   • Click the "Start Transcription" button.
    -   • The tool will automatically perform a series of processes in the background:
    -   -   • Convert your file to the WAV audio format suitable for processing.
        -   • Split the audio into small segments to improve processing speed and accuracy.
        -   • Use the Dolphin model to recognize speech in each segment.
        -   • Finally, organize the recognition results into your chosen format (e.g., SRT).

1.  6. **Get Results**

1.  -   • After transcription is complete, the results will be displayed directly on the interface.
    -   • You can directly **copy** the text, or click the **Download** button to save the results as a file for use in video editing or other applications.

* * *

### For Developers: API Interface Usage

If you are a developer and want to integrate this functionality into your own program, the all-in-one package also provides an API interface.

-   • **Endpoint:** `/v1/audio/transcriptions`
-   • **Method:** `POST`
-   • **Content-Type:** `multipart/form-data` (Note: Not application/json, because files need to be uploaded)
-   • **Request Parameters:**
-   -   • `file`: (Required) The audio/video file itself.
    -   • `language`: (Optional) Target language code (see table below). Leave empty for auto-detection.
    -   • `response_format`: (Optional) Response format, supports `"srt"`, `"json"`, `"txt"`. Defaults to `"srt"`.
-   • **Response:**
-   -   • **Success:** Returns transcribed text in the specified format (SRT, JSON, or TXT).
    -   • **Failure:** Returns a JSON object containing error information.

### Supported Language Codes

| Language Code | Chinese Name       |
| ------------- | ------------------ |
| zh-CN         | Chinese (Mandarin) |
| zh-TW         | Chinese (Taiwan)   |
| zh-WU         | Chinese (Wu)       |
| zh-SICHUAN    | Chinese (Sichuanese) |
| zh-SHANXI     | Chinese (Shanxi)   |
| zh-ANHUI      | Chinese (Anhui)    |
| zh-TIANJIN    | Chinese (Tianjin)  |
| zh-NINGXIA    | Chinese (Ningxia)  |
| zh-SHAANXI    | Chinese (Shaanxi)  |
| zh-HEBEI      | Chinese (Hebei)    |
| zh-SHANDONG   | Chinese (Shandong) |
| zh-GUANGDONG  | Chinese (Guangdong)|
| zh-SHANGHAI   | Chinese (Shanghai) |
| zh-HUBEI      | Chinese (Hubei)    |
| zh-LIAONING   | Chinese (Liaoning) |
| zh-GANSU      | Chinese (Gansu)    |
| zh-FUJIAN     | Chinese (Fujian)   |
| zh-HUNAN      | Chinese (Hunan)    |
| zh-HENAN      | Chinese (Henan)    |
| zh-YUNNAN     | Chinese (Yunnan)   |
| zh-MINNAN     | Chinese (Hokkien)  |
| zh-WENZHOU    | Chinese (Wenzhou)  |
| ja-JP         | Japanese           |
| th-TH         | Thai               |
| ru-RU         | Russian            |
| ko-KR         | Korean             |
| id-ID         | Indonesian         |
| vi-VN         | Vietnamese         |
| ct-NULL       | Cantonese (Unknown)|
| ct-HK         | Cantonese (Hong Kong)|
| ct-GZ         | Cantonese (Guangdong)|
| hi-IN         | Hindi              |
| ur-IN         | Urdu (India)       |
| ur-PK         | Urdu               |
| ms-MY         | Malay              |
| uz-UZ         | Uzbek              |
| ar-MA         | Arabic (Morocco)   |
| ar-GLA        | Arabic             |
| ar-SA         | Arabic (Saudi Arabia)|
| ar-EG         | Arabic (Egypt)     |
| ar-KW         | Arabic (Kuwait)    |
| ar-LY         | Arabic (Libya)     |
| ar-JO         | Arabic (Jordan)    |
| ar-AE         | Arabic (UAE)       |
| ar-LVT        | Arabic (Levant)    |
| fa-IR         | Persian            |
| bn-BD         | Bengali            |
| ta-SG         | Tamil (Singapore)  |
| ta-LK         | Tamil (Sri Lanka)  |
| ta-IN         | Tamil (India)      |
| ta-MY         | Tamil (Malaysia)   |
| te-IN         | Telugu             |
| ug-NULL       | Uyghur             |
| ug-CN         | Uyghur             |
| gu-IN         | Gujarati           |
| my-MM         | Burmese            |
| tl-PH         | Tagalog            |
| kk-KZ         | Kazakh             |
| or-IN         | Odia               |
| ne-NP         | Nepali             |
| mn-MN         | Mongolian          |
| km-KH         | Khmer              |
| jv-ID         | Javanese           |
| lo-LA         | Lao                |
| si-LK         | Sinhala            |
| fil-PH        | Filipino           |
| ps-AF         | Pashto             |
| pa-IN         | Punjabi            |
| kab-NULL      | Kabyle             |
| ba-NULL       | Bashkir            |
| ks-IN         | Kashmiri           |
| tg-TJ         | Tajik              |
| su-ID         | Sundanese          |
| mr-IN         | Marathi            |
| ky-KG         | Kyrgyz             |
| az-AZ         | Azerbaijani        |

**API Call Example (using curl)**

```
curl -X POST http://127.0.0.1:5080/v1/audio/transcriptions \
  -F "file=@/your/path/your_audio.mp3" \
  -F "language=zh-CN" \
  -F "response_format=srt"
```

**API Call Example (using Python `openai` library)**  
(This library can conveniently call interfaces compatible with the OpenAI API format)

```
from openai import OpenAI

# Configure the client to point to the local service address
client = OpenAI(base_url='http://127.0.0.1:5080/v1', api_key='any string will do') # api_key is not important in this scenario

audio_file_path = "your_audio.wav" # Replace with your file path

with open(audio_file_path, 'rb') as file_handle:
    # Initiate the transcription request
    transcript = client.audio.transcriptions.create(
        file=(audio_file_path, file_handle), # Pass filename and file content
        model='base', # Model name, fixed as 'base' here or adjust based on actual situation
        language='zh-CN', # Specify language
        response_format="srt" # Specify response format
    )
    # Print transcription result (SRT format text)
    print(transcript)
```

**Response Example (SRT Format)**

```
1
00:00:00,000 --> 00:00:02,500
Hello, this is a test audio.

2
00:00:02,500 --> 00:00:05,000
Hope the transcription result is accurate.
```

* * *

### Want it Faster? Enable GPU Acceleration (Optional)

-   • **Why GPU?**  If you have a suitable NVIDIA graphics card and the environment properly configured, using a GPU can significantly increase transcription speed, especially noticeable when processing long audio.
-   • **How to Enable?**
-   1.  1. **Prerequisite:**  Ensure your computer has the correct NVIDIA graphics driver and CUDA 12.x environment installed.
    1.  2. **Install Support:**  In the all-in-one package folder, find and double-click the `Install GPU Support.bat` file. It will automatically complete the relevant setup.
-   • **Note:**  The default all-in-one package does not include GPU support to keep the file size small.

* * *

### A Few Tips

1.  1. **File Size & Duration:**  It is recommended that a single file not be too large (e.g., not exceeding 1GB), and the duration is best kept within 1 hour. Very large files may process extremely slowly.
1.  2. **Audio Quality:**  The clearer the audio and the less background noise, the better the transcription results. Try to use high-quality audio sources.
1.  3. **First Use Requires Internet:**  The first time transcribing a particular language, the program needs to connect to the internet to download some necessary data for that language. It is recommended to successfully transcribe all commonly used languages once (even with a very short test audio), after which it can be used offline.

* * *