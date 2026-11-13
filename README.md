# pyVideoTrans Document

- [pyVideoTrans reposity](https://github.com/jianchang512/pyvideotrans)
- [pyVideoTrans document website](https://en.pyvideotrans.com)


---

**pyVideoTrans** is dedicated to seamlessly converting videos from one language to another, offering a complete workflow that includes speech recognition, subtitle translation, multi-role dubbing, and audio-video synchronization. It supports both local offline deployment and a wide variety of mainstream online APIs.


<img width="1730" height="957" alt="image" src="https://github.com/user-attachments/assets/25d78661-8b73-4f34-a3e5-205c7daba99b" />

---

##  Core Features

- **Fully Automatic Video Translation**: One-click workflow: Speech Recognition (ASR) → Subtitle Translation → Speech Synthesis (TTS) → Video Synthesis.
- **Audio Transcription / Subtitle Generation**: Batch convert audio/video to SRT subtitles, supporting **Speaker Diarization** to distinguish between different roles.
- **️Multi-Role AI Dubbing**: Assign different AI dubbing voices to different speakers.
- **Voice Cloning**: Integrates models like **F5-TTS, CosyVoice, GPT-SoVITS** for zero-shot voice cloning.
- **Powerful Model Support**:
  - **ASR**: Faster-Whisper (Local), OpenAI Whisper, Alibaba Qwen, ByteDance Volcano, Azure, Google, etc.
  - **LLM Translation**: DeepSeek, ChatGPT, Claude, Gemini, MiniMax, Ollama (Local), Alibaba Bailian, etc.
  - **TTS**: Edge-TTS (Free), OpenAI, Azure, Minimaxi, ChatTTS, ChatterBox, etc.
- **️Interactive Editing**: Supports pausing and manual proofreading at each stage (recognition, translation, dubbing) to ensure accuracy.
- **️Utility Toolkit**: Includes auxiliary tools such as vocal separation, video/subtitle merging, audio-video alignment, and transcript matching.
- **Command Line Interface (CLI)**: Supports headless operation, convenient for server deployment or batch processing.
- **Web Interface (WebUI)**: Browser-based interface for remote access or internal network deployment.



##  Acknowledgements 

- [vitepress](https://vitepress.dev/)