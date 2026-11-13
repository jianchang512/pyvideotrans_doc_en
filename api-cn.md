---
title: pyVideoTrans Video Translation Software API Documentation
date: 2024-01-22 14:33:00
description: pyVideoTrans Video Translation Software API Documentation
---

# pyVideoTrans Video Translation Software API Documentation

Default API address: http://127.0.0.1:9011

> You can modify the IP and port by creating a `host.txt` file in the same directory as api.py (or api.exe). For example, if the content of `host.txt` is:
>
> `127.0.0.1:9801`
>
> Then the API address will change to http://127.0.0.1:9801

## Startup Method

> Upgrade to v2.57+

1.  **Pre-packaged version:** Double-click `api.exe` and wait for the terminal window to display `API URL http://127.0.0.1:9011`.
2.  **Source code version:** Execute `python api.py`.

## Translation/Dubbing/Recognition Channel Configuration

Certain channels, such as translation channels: OpenAI ChatGPT/AzureGPT/Baidu/Tencent/DeepL, etc., require configuration of API URLs and keys. To use them, please configure the relevant information in the settings via the GUI interface.

Except for the translation channels Google/FreeGoogle/Microsoft, the dubbing channel edge-tts, and the recognition modes faster-whisper/openai-whisper, all other channels require separate configuration. Please open the GUI interface and configure them under Menu Bar -> Settings.

## API List

### `/tts` - Dubbing Synthesis Interface Based on Subtitles

### Request Method POST

#### Request Data Type
`Content-Type: application/json`

#### Request Parameters

| Parameter Name   | Data Type | Required | Default | Optional Values | Description |
| ---------------- | --------- | -------- | ------- | --------------- | ----------- |
| name             | String    | Yes      | None    | None            | Absolute path to the SRT subtitle file requiring dubbing OR valid SRT subtitle format content. |
| tts_type         | Integer   | Yes      | None    | 0-11            | Dubbing channel. Specific values correspond to channel names listed below. |
| voice_role       | String    | Yes      | None    | -               | Character name corresponding to the dubbing channel. Role names for edge-tts/azure-tts/302.ai (azure model) vary based on the selected target language. See details at the bottom. |
| target_language  | String    | Yes      | None    | Language code for dubbing | Simplified Chinese zh-cn, Traditional Chinese zh-tw, English en, French fr, German de, Japanese ja, Korean ko, Russian ru, Spanish es, Thai th, Italian it, Portuguese pt, Vietnamese vi, Arabic ar, Turkish tr, Hindi hi, Hungarian hu, Ukrainian uk, Indonesian id, Malay ms, Kazakh kk, Czech cs, Polish pl, Dutch nl, Swedish sv |
| voice_rate       | String    | No       | None    | Speed up `+number%`, Slow down `-number%` | Speech rate adjustment value. |
| volume           | String    | No       | None    | Increase volume `+number%`, Decrease volume `-number%` | Volume change value (only effective for edge-tts dubbing channel). |
| pitch            | String    | No       | None    | Raise pitch `+numberHz`, Lower pitch `-numberHz` | Pitch change value (only effective for edge-tts dubbing channel). |
| out_ext          | String    | No       | wav     | mp3\|wav\|flac\|aac | Output dubbing file type. |
| voice_autorate   | Boolean   | No       | False   | True\|False      | Whether to automatically increase speech rate. |

**tts_type 0-11 Corresponds to:**

- 0=Edge-TTS
- 1=CosyVoice
- 2=ChatTTS
- 3=302.AI
- 4=FishTTS
- 5=Azure-TTS"
- 6=GPT-SoVITS
- 7=clone-voice
- 8=OpenAI TTS
- 9=Elevenlabs.io
- 10=Google TTS
- 11=Custom TTS API

#### Response Data Type
JSON format

#### Response Example
On success:
```json
{
    "code": 0,
    "msg": "ok",
    "task_id": "task_id"
}
```

On failure:
```json
{
    "code": 1,
    "msg": "error_message"
}
```

#### Request Example
```python
import requests
res=requests.post("http://127.0.0.1:9011/tts", json={
    "name": "C:/users/c1/videos/zh0.srt",
    "voice_role": "zh-CN-YunjianNeural",
    "target_language_code": "zh-cn",
    "voice_rate": "+0%",
    "volume": "+0%",
    "pitch": "+0Hz",
    "tts_type": "0",
    "out_ext": "mp3",
    "voice_autorate": True,
})
print(res.json())
```

----

### `/translate_srt` - Subtitle Translation Interface

### Request Method POST

#### Request Data Type
`Content-Type: application/json`

#### Request Parameters

| Parameter Name    | Data Type | Required | Default | Optional Values | Description |
| ----------------- | --------- | -------- | ------- | --------------- | ----------- |
| name              | String    | Yes      | None    | None            | Absolute path to the SRT subtitle file requiring translation OR valid SRT subtitle format content. |
| translate_type    | Integer   | Yes      | None    | 0-14            | 0-14 represent translation channels, details below. |
| target_language   | String    | Yes      | None    | -               | Simplified Chinese zh-cn, Traditional Chinese zh-tw, English en, French fr, German de, Japanese ja, Korean ko, Russian ru, Spanish es, Thai th, Italian it, Portuguese pt, Vietnamese vi, Arabic ar, Turkish tr, Hindi hi, Hungarian hu, Ukrainian uk, Indonesian id, Malay ms, Kazakh kk, Czech cs, Polish pl, Dutch nl, Swedish sv |
| source_code       | String    | No       | None    | -               | Simplified Chinese zh-cn, Traditional Chinese zh-tw, English en, French fr, German de, Japanese ja, Korean ko, Russian ru, Spanish es, Thai th, Italian it, Portuguese pt, Vietnamese vi, Arabic ar, Turkish tr, Hindi hi, Hungarian hu, Ukrainian uk, Indonesian id, Malay ms, Kazakh kk, Czech cs, Polish pl, Dutch nl, Swedish sv |

**translate_type Translation Channels 0-14**

- 0=Google Translate
- 1=Microsoft Translator
- 2=302.AI
- 3=Baidu Translate
- 4=DeepL
- 5=DeepLx
- 6=Offline Translation OTT
- 7=Tencent Translate
- 8=OpenAI ChatGPT
- 9=Local Large Language Models & Compatible AI
- 10=ByteDance Volcano Engine
- 11=AzureAI GPT
- 12=Gemini
- 13=Custom Translation API
- 14=FreeGoogle Translate

#### Response Data Type
JSON format

#### Response Example
On success:
```json
{
    "code": 0,
    "msg": "ok",
    "task_id": "task_id"
}
```

On failure:
```json
{
    "code": 1,
    "msg": "error_message"
}
```

#### Request Example
```python
import requests
res=requests.post("http://127.0.0.1:9011/translate_srt", json={
    "name": "C:/users/c1/videos/zh0.srt",
    "target_language": "en",
    "translate_type": 0
})
print(res.json())
```

----

### `/recogn` - Speech Recognition, Audio/Video to Subtitle Interface

### Request Method POST

#### Request Data Type
`Content-Type: application/json`

#### Request Parameters

| Parameter Name   | Data Type | Required | Default | Optional Values | Description |
| ---------------- | --------- | -------- | ------- | --------------- | ----------- |
| name             | String    | Yes      | None    | None            | Absolute path to the audio or video file requiring recognition. |
| recogn_type      | Integer   | Yes      | None    | 0-6             | Speech recognition mode. 0=faster-whisper local model, 1=openai-whisper local model, 2=Google recognition API, 3=zh_recogn Chinese recognition, 4=Doubao model recognition, 5=Custom recognition API, 6=OpenAI recognition API. |
| model_name       | String    | Yes      | None    | -               | Model name must be provided when selecting faster-whisper/openai-whisper mode. |
| detect_language  | String    | Yes      | None    | -               | Chinese zh, English en, French fr, German de, Japanese ja, Korean ko, Russian ru, Spanish es, Thai th, Italian it, Portuguese pt, Vietnamese vi, Arabic ar, Turkish tr, Hindi hi, Hungarian hu, Ukrainian uk, Indonesian id, Malay ms, Kazakh kk, Czech cs, Polish pl, Dutch nl, Swedish sv |
| split_type       | String    | No       | all     | all\|avg        | Segmentation type. all=recognize as a whole, avg=equal segmentation. |
| is_cuda          | Boolean   | No       | False   | True\|False     | Whether to enable CUDA acceleration. |

#### Response Data Type
JSON format

#### Response Example
On success:
```json
{
    "code": 0,
    "msg": "ok",
    "task_id": "task_id"
}
```

On failure:
```json
{
    "code": 1,
    "msg": "error_message"
}
```

#### Request Example
```python
import requests
res=requests.post("http://127.0.0.1:9011/recogn", json={
    "name": "C:/Users/c1/Videos/10ass.mp4",
    "recogn_type": 0,
    "split_type": "overall",
    "model_name": "tiny",
    "is_cuda": False,
    "detect_language": "zh",
})
print(res.json())
```

----

### `/trans_video` - Complete Video Translation Interface

### Request Method POST

#### Request Data Type:
`Content-Type: application/json`

#### Request Parameters

| Parameter Name   | Data Type | Required | Default | Optional Values | Description |
| ---------------- | --------- | -------- | ------- | --------------- | ----------- |
| name             | String    | Yes      | None    | None            | Absolute path to the audio or video file requiring translation. |
| recogn_type      | Integer   | Yes      | None    | 0-6             | Speech recognition mode. 0=faster-whisper local model, 1=openai-whisper local model, 2=Google recognition API, 3=zh_recogn Chinese recognition, 4=Doubao model recognition, 5=Custom recognition API, 6=OpenAI recognition API. |
| model_name       | String    | Yes      | None    | -               | Model name must be provided when selecting faster-whisper/openai-whisper mode. |
| translate_type   | Integer   | Yes      | None    | 0-14            | Translation channel, see below. |
| target_language  | String    | Yes      | None    | -               | Target language for translation. Simplified Chinese zh-cn, Traditional Chinese zh-tw, English en, French fr, German de, Japanese ja, Korean ko, Russian ru, Spanish es, Thai th, Italian it, Portuguese pt, Vietnamese vi, Arabic ar, Turkish tr, Hindi hi, Hungarian hu, Ukrainian uk, Indonesian id, Malay ms, Kazakh kk, Czech cs, Polish pl, Dutch nl, Swedish sv |
| source_language  | String    | Yes      | None    | -               | Spoken language in the audio. Simplified Chinese zh-cn, Traditional Chinese zh-tw, English en, French fr, German de, Japanese ja, Korean ko, Russian ru, Spanish es, Thai th, Italian it, Portuguese pt, Vietnamese vi, Arabic ar, Turkish tr, Hindi hi, Hungarian hu, Ukrainian uk, Indonesian id, Malay ms, Kazakh kk, Czech cs, Polish pl, Dutch nl, Swedish sv |
| tts_type         | Integer   | Yes      | None    | 0-11            | Dubbing channel, see below. |
| voice_role       | String    | Yes      | None    | -               | Character name corresponding to the dubbing channel. Role names for edge-tts/azure-tts/302.ai (azure model) vary based on the selected target language. See details at the bottom. |
| voice_rate       | String    | No       | None    | Speed up `+number%`, Slow down `-number%` | Speech rate adjustment value. |
| volume           | String    | No       | None    | Increase volume `+number%`, Decrease volume `-number%` | Volume change value (only effective for edge-tts dubbing channel). |
| pitch            | String    | No       | None    | Raise pitch `+numberHz`, Lower pitch `-numberHz` | Pitch change value (only effective for edge-tts dubbing channel). |
| out_ext          | String    | No       | wav     | mp3\|wav\|flac\|aac | Output dubbing file type. |
| voice_autorate   | Boolean   | No       | False   | True\|False      | Whether to automatically increase speech rate. |
| subtitle_type    | Integer   | No       | 0       | 0-4             | Subtitle embedding type. 0=No embedded subtitles, 1=Embed hard subtitles, 2=Embed soft subtitles, 3=Embed dual hard subtitles, 4=Embed dual soft subtitles. |
| append_video     | Boolean   | No       | False   | True\|False      | Whether to extend the end of the video. |

**translate_type Translation Channels 0-14**

- 0=Google Translate
- 1=Microsoft Translator
- 2=302.AI
- 3=Baidu Translate
- 4=DeepL
- 5=DeepLx
- 6=Offline Translation OTT
- 7=Tencent Translate
- 8=OpenAI ChatGPT
- 9=Local Large Language Models & Compatible AI
- 10=ByteDance Volcano Engine
- 11=AzureAI GPT
- 12=Gemini
- 13=Custom Translation API
- 14=FreeGoogle Translate

**tts_type Dubbing Channels 0-11 Correspond to:**

- 0=Edge-TTS
- 1=CosyVoice
- 2=ChatTTS
- 3=302.AI
- 4=FishTTS
- 5=Azure-TTS"
- 6=GPT-SoVITS
- 7=clone-voice
- 8=OpenAI TTS
- 9=Elevenlabs.io
- 10=Google TTS
- 11=Custom TTS API

#### Response Data Type
JSON format

#### Response Example
On success:
```json
{
    "code": 0,
    "msg": "ok",
    "task_id": "task_id"
}
```

On failure:
```json
{
    "code": 1,
    "msg": "error_message"
}
```

#### Request Example
```python
import requests
res=requests.post("http://127.0.0.1:9011/trans_video", json={
    "name": "C:/Users/c1/Videos/10ass.mp4",
    "recogn_type": 0,
    "split_type": "overall",
    "model_name": "tiny",
    "detect_language": "zh",
    "translate_type": 0,
    "source_language": "zh-cn",
    "target_language": "en",
    "tts_type": 0,
    "voice_role": "zh-CN-YunjianNeural",
    "voice_rate": "+0%",
    "volume": "+0%",
    "pitch": "+0Hz",
    "voice_autorate": True,
    "video_autorate": True,
    "is_separate": False,
    "back_audio": "",
    "subtitle_type": 1,
    "append_video": False,
    "is_cuda": False,
})
print(res.json())
```

----

### `/task_status` - Get Task Progress Interface

### Request Method POST GET

#### Request Parameters

| Parameter Name | Data Type | Required | Description |
| -------------- | --------- | -------- | ----------- |
| task_id        | String    | Yes      | Task ID. |

#### Response Data Type
JSON format

#### Response Example
When in progress:
```json
{
    "code": -1,
    "msg": "正在合成声音"
}
```

On success:
```json
{
    "code": 0,
    "msg": "ok",
    "data": {
        "absolute_path": ["/data/1.srt", "/data/1.mp4"],
        "url": ["http://127.0.0.1:9011/task_id/1.srt"]
    }
}
```

On failure:
```json
{
    "code": 1,
    "msg": "不存在该任务"
}
```

#### Request Example
```python
import requests
res=requests.get("http://127.0.0.1:9011/task_status?task_id=06c238d250f0b51248563c405f1d7294")
print(res.json())
```

---

## Translation Channel Number Mapping translate_type 0-14

- 0=Google Translate
- 1=Microsoft Translator
- 2=302.AI
- 3=Baidu Translate
- 4=DeepL
- 5=DeepLx
- 6=Offline Translation OTT
- 7=Tencent Translate
- 8=OpenAI ChatGPT
- 9=Local Large Language Models & Compatible AI
- 10=ByteDance Volcano Engine
- 11=AzureAI GPT
- 12=Gemini
- 13=Custom Translation API
- 14=FreeGoogle Translate

## Dubbing Channel (tts_type) 0-11 Corresponding Names
- 0=Edge-TTS
- 1=CosyVoice
- 2=ChatTTS
- 3=302.AI
- 4=FishTTS
- 5=Azure-TTS"
- 6=GPT-SoVITS
- 7=clone-voice
- 8=OpenAI TTS
- 9=Elevenlabs.io
- 10=Google TTS
- 11=Custom TTS API


## edge-tts Language Code and Role Name Mapping

```
{
  "ar": [
    "No",
    "ar-DZ-AminaNeural",
    "ar-DZ-IsmaelNeural",
    "ar-BH-AliNeural",
    "ar-BH-LailaNeural",
    "ar-EG-SalmaNeural",
    "ar-EG-ShakirNeural",
    "ar-IQ-BasselNeural",
    "ar-IQ-RanaNeural",
    "ar-JO-SanaNeural",
    "ar-JO-TaimNeural",
    "ar-KW-FahedNeural",
    "ar-KW-NouraNeural",
    "ar-LB-LaylaNeural",
    "ar-LB-RamiNeural",
    "ar-LY-ImanNeural",
    "ar-LY-OmarNeural",
    "ar-MA-JamalNeural",
    "ar-MA-MounaNeural",
    "ar-OM-AbdullahNeural",
    "ar-OM-AyshaNeural",
    "ar-QA-AmalNeural",
    "ar-QA-MoazNeural",
    "ar-SA-HamedNeural",
    "ar-SA-ZariyahNeural",
    "ar-SY-AmanyNeural",
    "ar-SY-LaithNeural",
    "ar-TN-HediNeural",
    "ar-TN-ReemNeural",
    "ar-AE-FatimaNeural",
    "ar-AE-HamdanNeural",
    "ar-YE-MaryamNeural",
    "ar-YE-SalehNeural"
  ],
  zh": [
    "No",
    "zh-HK-HiuGaaiNeural",
    "zh-HK-HiuMaanNeural",
    "zh-HK-WanLungNeural",
    "zh-CN-XiaoxiaoNeural",
    "zh-CN-XiaoyiNeural",
    "zh-CN-YunjianNeural",
    "zh-CN-YunxiNeural",
    "zh-CN-YunxiaNeural",
    "zh-CN-YunyangNeural",
    "zh-CN-liaoning-XiaobeiNeural",
    "zh-TW-HsiaoChenNeural",
    "zh-TW-YunJheNeural",
    "zh-TW-HsiaoYuNeural",
    "zh-CN-shaanxi-XiaoniNeural"
  ],
  "cs": [
    "No",
    "cs-CZ-AntoninNeural",
    "cs-CZ-VlastaNeural"
  ],
  "nl": [
    "No",
    "nl-BE-ArnaudNeural",
    "nl-BE-DenaNeural",
    "nl-NL-ColetteNeural",
    "nl-NL-FennaNeural",
    "nl-NL-MaartenNeural"
  ],
  "en": [
    "No",
    "en-AU-NatashaNeural",
    "en-AU-WilliamNeural",
    "en-CA-ClaraNeural",
    "en-CA-LiamNeural",
    "en-HK-SamNeural",
    "en-HK-YanNeural",
    "en-IN-NeerjaExpressiveNeural",
    "en-IN-NeerjaNeural",
    "en-IN-PrabhatNeural",
    "en-IE-ConnorNeural",
    "en-IE-EmilyNeural",
    "en-KE-AsiliaNeural",
    "en-KE-ChilembaNeural",
    "en-NZ-MitchellNeural",
    "en-NZ-MollyNeural",
    "en-NG-AbeoNeural",
    "en-NG-EzinneNeural",
    "en-PH-JamesNeural",
    "en-US-AvaNeural",
    "en-US-AndrewNeural",
    "en-US-EmmaNeural",
    "en-US-BrianNeural",
    "en-PH-RosaNeural",
    "en-SG-LunaNeural",
    "en-SG-WayneNeural",
    "en-ZA-LeahNeural",
    "en-ZA-LukeNeural",
    "en-TZ-ElimuNeural",
    "en-TZ-ImaniNeural",
    "en-GB-LibbyNeural",
    "en-GB-MaisieNeural",
    "en-GB-RyanNeural",
    "en-GB-SoniaNeural",
    "en-GB-ThomasNeural",
    "en-US-AnaNeural",
    "en-US-AriaNeural",
    "en-US-ChristopherNeural",
    "en-US-EricNeural",
    "en-US-GuyNeural",
    "en-US-JennyNeural",
    "en-US-MichelleNeural",
    "en-US-RogerNeural",
    "en-US-SteffanNeural"
  ],
  "fr": [
    "No",
    "fr-BE-CharlineNeural",
    "fr-BE-GerardNeural",
    "fr-CA-ThierryNeural",
    "fr-CA-AntoineNeural",
    "fr-CA-JeanNeural",
    "fr-CA-SylvieNeural",
    "fr-FR-VivienneMultilingualNeural",
    "fr-FR-RemyMultilingualNeural",
    "fr-FR-DeniseNeural",
    "fr-FR-EloiseNeural",
    "fr-FR-HenriNeural",
    "fr-CH-ArianeNeural",
    "fr-CH-FabriceNeural"
  ],
  "de": [
    "No",
    "de-AT-IngridNeural",
    "de-AT-JonasNeural",
    "de-DE-SeraphinaMultilingualNeural",
    "de-DE-FlorianMultilingualNeural",
    "de-DE-AmalaNeural",
    "de-DE-ConradNeural",
    "de-DE-KatjaNeural",
    "de-DE-KillianNeural",
    "de-CH-JanNeural",
    "de-CH-LeniNeural"
  ],
  "hi": [
    "No",
    "hi-IN-MadhurNeural",
    "hi-IN-SwaraNeural"
  ],
  "hu": [
    "No",
    "hu-HU-NoemiNeural",
    "hu-HU-TamasNeural"
  ],
  "id": [
    "No",
    "id-ID-ArdiNeural",
    "id-ID-GadisNeural"
  ],
  "it": [
    "No",
    "it-IT-GiuseppeNeural",
    "it-IT-DiegoNeural",
    "it-IT-ElsaNeural",
    "it-IT-IsabellaNeural"
  ],
  "ja": [
    "No",
    "ja-JP-KeitaNeural",
    "ja-JP-NanamiNeural"
  ],
  "kk": [
    "No",
    "kk-KZ-AigulNeural",
    "kk-KZ-DauletNeural"
  ],
  "ko": [
    "No",
    "ko-KR-HyunsuNeural",
    "ko-KR-InJoonNeural",
    "ko-KR-SunHiNeural"
  ],
  "ms": [
    "No",
    "ms-MY-OsmanNeural",
    "ms-MY-YasminNeural"
  ],
  "pl": [
    "No",
    "pl-PL-MarekNeural",
    "pl-PL-ZofiaNeural"
  ],
  "pt": [
    "No",
    "pt-BR-ThalitaNeural",
    "pt-BR-AntonioNeural",
    "pt-BR-FranciscaNeural",
    "pt-PT-DuarteNeural",
    "pt-PT-RaquelNeural"
  ],
  "ru": [
    "No",
    "ru-RU-DmitryNeural",
    "ru-RU-SvetlanaNeural"
  ],
  "es": [
    "No",
    "es-AR-ElenaNeural",
    "es-AR-TomasNeural",
    "es-BO-MarceloNeural",
    "es-BO-SofiaNeural",
    "es-CL-CatalinaNeural",
    "es-CL-LorenzoNeural",
    "es-ES-XimenaNeural",
    "es-CO-GonzaloNeural",
    "es-CO-SalomeNeural",
    "es-CR-JuanNeural",
    "es-CR-MariaNeural",
    "es-CU-BelkysNeural",
    "es-CU-ManuelNeural",
    "es-DO-EmilioNeural",
    "es-DO-RamonaNeural",
    "es-EC-AndreaNeural",
    "es-EC-LuisNeural",
    "es-SV-LorenaNeural",
    "es-SV-RodrigoNeural",
    "es-GQ-JavierNeural",
    "es-GQ-TeresaNeural",
    "es-GT-AndresNeural",
    "es-GT-MartaNeural",
    "es-HN-CarlosNeural",
    "es-HN-KarlaNeural",
    "es-MX-DaliaNeural",
    "es-MX-JorgeNeural",
    "es-NI-FedericoNeural",
    "es-NI-YolandaNeural",
    "es-PA-MargaritaNeural",
    "es-PA-RobertoNeural",
    "es-PY-MarioNeural",
    "es-PY-TaniaNeural",
    "es-PE-AlexNeural",
    "es-PE-CamilaNeural",
    "es-PR-KarinaNeural",
    "es-PR-VictorNeural",
    "es-ES-AlvaroNeural",
    "es-ES-ElviraNeural",
    "es-US-AlonsoNeural",
    "es-US-PalomaNeural",
    "es-UY-MateoNeural",
    "es-UY-ValentinaNeural",
    "es-VE-PaolaNeural",
    "es-VE-SebastianNeural"
  ],
  "sv": [
    "No",
    "sv-SE-MattiasNeural",
    "sv-SE-SofieNeural"
  ],
  "th": [
    "No",
    "th-TH-NiwatNeural",
    "th-TH-PremwadeeNeural"
  ],
  "tr": [
    "No",
    "tr-TR-AhmetNeural",
    "tr-TR-EmelNeural"
  ],
  "uk": [
    "No",
    "uk-UA-OstapNeural",
    "uk-UA-PolinaNeural"
  ],
  "vi": [
    "No",
    "vi-VN-HoaiMyNeural",
    "vi-VN-NamMinhNeural"
  ]
}
```

## Azure-tts and 302.ai (when selecting azure model) Language Code and Role Name Mapping
```
{
  "ar": [
    "No",
    "ar-AE-FatimaNeural",
    "ar-AE-HamdanNeural",
    "ar-BH-LailaNeural",
    "ar-BH-AliNeural",
    "ar-DZ-AminaNeural",
    "ar-DZ-IsmaelNeural",
    "ar-EG-SalmaNeural",
    "ar-EG-ShakirNeural",
    "ar-IQ-RanaNeural",
    "ar-IQ-BasselNeural",
    "ar-JO-SanaNeural",
    "ar-JO-TaimNeural",
    "ar-KW-NouraNeural",
    "ar-KW-FahedNeural",
    "ar-LB-LaylaNeural",
    "ar-LB-RamiNeural",
    "ar-LY-ImanNeural",
    "ar-LY-OmarNeural",
    "ar-MA-MounaNeural",
    "ar-MA-JamalNeural",
    "ar-OM-AyshaNeural",
    "ar-OM-AbdullahNeural",
    "ar-QA-AmalNeural",
    "ar-QA-MoazNeural",
    "ar-SA-ZariyahNeural",
    "ar-SA-HamedNeural",
    "ar-SY-AmanyNeural",
    "ar-SY-LaithNeural",
    "ar-TN-ReemNeural",
    "ar-TN-HediNeural",
    "ar-YE-MaryamNeural",
    "ar-YE-SalehNeural"
  ],

  "cs": [
    "No",
    "cs-CZ-VlastaNeural",
    "cs-CZ-AntoninNeural"
  ],

  "de": [
    "No",
    "de-AT-IngridNeural",
    "de-AT-JonasNeural",
    "de-CH-LeniNeural",
    "de-CH-JanNeural",
    "de-DE-KatjaNeural",
    "de-DE-ConradNeural",
    "de-DE-AmalaNeural",
    "de-DE-BerndNeural",
    "de-DE-ChristophNeural",
    "de-DE-ElkeNeural",
    "de-DE-GiselaNeural",
    "de-DE-KasperNeural",
    "de-DE-KillianNeural",
    "de-DE-KlarissaNeural",
    "de-DE-KlausNeural",
    "de-DE-LouisaNeural",
    "de-DE-MajaNeural",
    "de-DE-RalfNeural",
    "de-DE-TanjaNeural",
    "de-DE-FlorianMultilingualNeural",
    "de-DE-SeraphinaMultilingualNeural"
  ],

  "en": [
    "No",
    "en-AU-NatashaNeural",
    "en-AU-WilliamNeural",
    "en-AU-AnnetteNeural",
    "en-AU-CarlyNeural",
    "en-AU-DarrenNeural",
    "en-AU-DuncanNeural",
    "en-AU-ElsieNeural",
    "en-AU-FreyaNeural",
    "en-AU-JoanneNeural",
    "en-AU-KenNeural",
    "en-AU-KimNeural",
    "en-AU-NeilNeural",
    "en-AU-TimNeural",
    "en-AU-TinaNeural",
    "en-CA-ClaraNeural",
    "en-CA-LiamNeural",
    "en-GB-SoniaNeural",
    "en-GB-RyanNeural",
    "en-GB-LibbyNeural",
    "en-GB-AbbiNeural",
    "en-GB-AlfieNeural",
    "en-GB-BellaNeural",
    "en-GB-ElliotNeural",
    "en-GB-EthanNeural",
    "en-GB-HollieNeural",
    "en-GB-MaisieNeural",
    "en-GB-NoahNeural",
    "en-GB-OliverNeural",
    "en-GB-OliviaNeural",
    "en-GB-ThomasNeural",
    "en-HK-YanNeural",
    "en-HK-SamNeural",
    "en-IE-EmilyNeural",
    "en-IE-ConnorNeural",
    "en-IN-NeerjaNeural",
    "en-IN-PrabhatNeural",
    "en-KE-AsiliaNeural",
    "en-KE-ChilembaNeural",
    "en-NG-EzinneNeural",
    "en-NG-AbeoNeural",
    "en-NZ-MollyNeural",
    "en-NZ-MitchellNeural",
    "en-PH-RosaNeural",
    "en-PH-JamesNeural",
    "en-SG-LunaNeural",
    "en-SG-WayneNeural",
    "en-TZ-ImaniNeural",
    "en-TZ-ElimuNeural",
    "en-US-AvaNeural",
    "en-US-AndrewNeural",
    "en-US-EmmaNeural",
    "en-US-BrianNeural",
    "en-US-JennyNeural",
    "en-US-GuyNeural",
    "en-US-AriaNeural",
    "en-US-DavisNeural",
    "en-US-JaneNeural",
    "en-US-JasonNeural",
    "en-US-SaraNeural",
    "en-US-TonyNeural",
    "en-US-NancyNeural",
    "en-US-AmberNeural",
    "en-US-AnaNeural",
    "en-US-AshleyNeural",
    "en-US-BrandonNeural",
    "en-US-ChristopherNeural",
    "en-US-CoraNeural",
    "en-US-ElizabethNeural",
    "en-US-EricNeural",
    "en-US-JacobNeural",
    "en-US-JennyMultilingualNeural",
    "en-US-MichelleNeural",
    "en-US-MonicaNeural",
    "en-US-RogerNeural",
    "en-US-RyanMultilingualNeural",
    "en-US-SteffanNeural",
    "en-US-AIGenerate1Neural",
    "en-US-AIGenerate2Neural",
    "en-US-AndrewMultilingualNeural",
    "en-US-AvaMultilingualNeural",
    "en-US-BlueNeural",
    "en-US-BrianMultilingualNeural",
    "en-US-EmmaMultilingualNeural",
    "en-US-AlloyMultilingualNeural",
    "en-US-EchoMultilingualNeural",
    "en-US-FableMultilingualNeural",
    "en-US-OnyxMultilingualNeural",
    "en-US-NovaMultilingualNeural",
    "en-US-ShimmerMultilingualNeural",
    "en-US-AlloyMultilingualNeuralHD",