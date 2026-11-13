---
title: Speech Recognition Channels
description: An overview of all available Speech Recognition (ASR) channels
---

# Speech Recognition Channels

Speech recognition (ASR) is the first step in video translation. It converts the spoken audio or video into subtitle files with timestamps. pyVideoTrans supports 15+ recognition channels.

> If you are not sure what language is spoken in the video, you can use the `Speech-To-Text` feature in the left panel. Set the spoken language to `Auto Detect` and choose a recognition channel with broad language support, such as `faster-whisper/openai-whisper/Omnilingual/Dolphin`.

---

## Local Offline Recognition

Works completely offline without an internet connection. Models are downloaded automatically upon first use.

| Channel | Description | GPU Acceleration | Recommendation |
|------|------|---------|--------|
| [faster-whisper(Built-in)](/faster) | Fast speed and high quality, supports all built-in languages | ✅ | ⭐⭐⭐ **Default Recommendation** |
| [openai-whisper(Built-in)](/openaiwhisper) | High accuracy, slightly slower, supports all built-in languages | ✅ | ⭐⭐⭐ |
| [Qwen-ASR(Built-in)](/qwenasrlocal) | Excellent for Chinese, supports most built-in languages | ✅ | ⭐⭐⭐  |
| `Whisper.cpp(Win Built-in)` | Built into Windows for direct use; requires separate manual deployment on macOS and Linux | ✅ | ⭐⭐⭐|
| [FunASR(Built-in)](/funasr) | Excellent for Chinese, with multiple models available | ✅ | ⭐⭐⭐  |
| Firered Chinese(Built-in) | Only supports Chinese and 20 Chinese dialects | X | ⭐⭐ |
| Dolphin(Built-in) | Supports 40+ Asian languages and 20 Chinese dialects | X | ⭐⭐ |
| Omnilingual ASR(Built-in) | Supports all built-in languages and 1,600+ more | X | ⭐⭐ |
| Nemotron-3.5-asr-0.6(Built-in) | English,japanese,ko,vietnamese,eg. 40 | ✅ | ⭐⭐ |
| [Huggingface_ASR(Built-in)](/huggingface) | Multiple language models available to choose from | ✅ | ⭐⭐ |
| Moss-Diarize(Built-in) | Supports 50+ languages; can separate speakers for audio under 90 minutes. Files over 90 minutes require a separate speaker model | ✅ | ⭐⭐ |
| [Faster-Whisper-XXL.exe](/xxl) | A standalone Windows package of faster-whisper. **Requires manual download** and specifying the .exe path | ✅ | ⭐⭐ |
| [Aduio.cpp](/audiocpp) | Use audio.cpp, support qwen-asr/fun-asr-nano/parakeet-tdt/nemotron-3.5/vibevoice-asr | ✅ | ⭐⭐ |


> Because models are quite large and network environments vary, automatic downloads might sometimes fail. If a download fails, [click here to view model download links and manual setup instructions](/aboutmodels).

### Model Selection Guide for faster-whisper / openai-whisper

| Model | Speed | Accuracy | VRAM Required |
|------|------|--------|---------|
| tiny | Fastest | Low | ~1GB |
| base | Fast | Low-Medium | ~1GB |
| small | Medium | Medium | ~2GB |
| medium | Slow | High | ~5GB |
| large-v3 | Slowest | Highest | ~8GB |
| large-v3-turbo | Fast | High | ~6GB |

**Recommendation**: `large-v3-turbo` offers the best balance between speed and quality.

---

## Online Recognition

| Channel | Description |
|------|------|
| [Alibaba Cloud Bailian Qwen3-ASR](/qwen-mt) | Requires activating the Alibaba Cloud Bailian service |
| Xiaomi | The mimo-v2.5-asr model works great for Chinese and mixed Chinese-English. [Requires activating the Xiaomi AI platform, topping up, and getting an API key](https://platform.xiaomimimo.com/console/api-keys). Enter it under `Menu -> Translation Settings -> Xiaomi AI` |
| [ByteDance Speech Recognition Large Model Express Edition](/zijierecognmodel) | Outstanding performance on Chinese |
| [Elevenlabs.io Speech Recognition](/elevenlabsrecogn) | Free accounts have strict rate limits and are barely usable |
| [Deepgram.com](/deepgram) | Requires registering for an API Key |
| [Gemini AI](/gemini-recognition) | Strong at recognizing low-resource/minority languages; requires proxy/VPN access in restricted regions |
| [302.AI](/302ai) | Apply on 302.ai |
| [OpenAI Speech Recognition API](/openairecogn) | Excellent quality, requires an OpenAI API key (SK key) |

---

## Advanced & Custom

| Channel | Description |
|------|------|
| [Parakeet-tdt(LocalAPI)](/parakeet) | Requires separate manual deployment |
| [WhisperX(LocalAPI)](/whisperx) | Requires separate manual deployment |
| [STT(LocalAPI)](/stt) | Requires separate manual deployment |
| [Whisper.NET](/whisper_net_setup) | Supports AMD GPU acceleration. Requires source code installation and downloading the required DLL files according to the guide |
| [Custom Speech Recognition API](/openairecogn) | Allows you to connect your own custom speech recognition API endpoint |

---

## Available Models for Huggingface_ASR(Built-in)

| Model | Supported Languages |
|------|---------|
| nvidia/parakeet-tdt-0.6b-v3 | en,bg,hr,cs,da,nl,et,fi,fr,de,el,hu,it,lv,lt,mt,pl,pt,ro,sk,sl,es,sv,ru,uk |
| nvidia/nemotron-3.5-asr-streaming-0.6b | [en,bg,hr,cs,ko,ja,vi,.eg 40](https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b#supported-languages) |
| reazon-research/japanese-wav2vec2-large-rs35kh | Japanese |
| kotoba-tech/kotoba-whisper-v2.0 | Japanese |
| biodatlab/whisper-th-large-v3 | Thai |
| vinai/Phowhisper-large | Vietnamese |
| anke01/whisper-small-uyghur | Uyghur |
| openai/whisper-large-v3 | All languages |
| zai-org/GLM-ASR-Nano-2512 | Zhipu AI model, excellent for Mandarin and Cantonese |
| Audio8/ARK-ASR-0.6B/3B | Chinese, English, German, Japanese, French, Korean, Spanish, Polish, Italian, Romanian, Hungarian, Czech, Dutch |
| ibm-granite/granite-speech-4.1-2b | English, French, German, Spanish, Portuguese, Japanese |
|nguyenvulebinh/wav2vec2-base-vietnamese-250h|vietnamese|
|sakares/wav2vec2-large-xlsr-thai-demo|thai|
|SiangLao/xlsr-53-lao-asr|lao|
|chuuhtetnaing/whisper-large-v3-myanmar|myanmar|
|1morecupofhottea/whisper-turbo-khmer-v9|khmer|
|anke01/whisper-small-uyghur|uyghur|
|kingabzpro/whisper-large-v3-turbo-urdu|urdu|
|vasista22/whisper-tamil-small|tamil|
|theainerd/Wav2Vec2-large-xlsr-hindi|hindi|
|cautroi/whisper-large-v3-id|Indonesia|
|Khalsuu/filipino-wav2vec2-l-xls-r-300m-official|Filipino|
|navai-uz/whisper-medium-uzbek|uzbek|
|jonatasgrosman/wav2vec2-large-xlsr-53-persian|persian|
|Ghost3454/translynx-pakistani-punjabi-whisper-small|pakistani|
|turkmedstt/whisper-large-v3-turkish-general|turkish|
|anton-l/wav2vec2-large-xlsr-53-mongolian|mongolian|
|HNO333333/w2v-bert-2.0-Tibetan-Amdo|Tibetan|


---