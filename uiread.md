---
title: Function and Meaning of Each Option on the Main Interface
date: 2024-01-22 14:33:00
description: Function and Meaning of Each Option on the Main Interface
---
## Function and Meaning of Each Option on the Main Interface

![](https://pvtr2.pyvideotrans.com/images/pyvideotrans.png)

As shown in the image above, the function of each option is as follows:

1.  **Select Video**: Choose the original video to be translated. The video must contain clear human speech without excessive background noise; otherwise, the recognition results may be inaccurate. Please note: videos without speech are not acceptable, regardless of whether they have subtitles or not, because the software works by recognizing human speech to generate subtitles. You can hold down the Ctrl key to select multiple videos at once, but the spoken language must be the same in all selected videos.
2.  **Translation Channel**: FreeGoogle and Microsoft can be used directly without a proxy or configuration. Other translation channels either require a proxy (e.g., Google) or need configuration (e.g., Baidu Translate, Tencent Translate). If unsure, it is recommended to choose Microsoft or FreeGoogle.
3.  **Source Language**: Select the language spoken by humans in the video. For example, if the speech in the video is in English, you must select English here.
4.  **Target Language**: Select the language you want to translate the video into. For example, if you want the video to have Chinese audio and embedded Chinese subtitles, select Simplified Chinese here.
5.  **Network Proxy Address**: If using services like Google or Gemini that are inaccessible from within China, you must fill in the proxy address. For example, if you are using a V2Ray client, enter `http://127.0.0.1:10809`. If you are unfamiliar with proxies, do not fill this in arbitrarily and avoid using services inaccessible from China.
6.  **Voiceover Channel**: edgeTTS is free, requires no configuration, and can be used directly. Other voiceover channels require configuration or installation. If unsure, it is recommended to choose edgeTTS.
7.  **Voice Role**: Select the voice role/speaker. Different roles have different voice characteristics. You must select the target language first before choosing a role.
8.  **Faster Mode**: The mode used for recognizing human speech in the video. If unsure, keep the default faster mode.
9.  **Tiny**: The model used for recognizing human speech in the video. The tiny model for faster mode is included by default. It is recommended to choose the medium or larger model for higher accuracy. If you select faster mode or openai mode, you need to download additional models to the `models` folder in the software directory. Only the tiny model for faster mode is included by default. Download other models from: https://github.com/jianchang512/stt/releases/tag/0.0
    If you are unsure and just want to try it out simply, select tiny here. It can be used directly without downloading.
10. **Overall Recognition**: Keep the default setting. No need to change.
11. **Embed Subtitles**: The method for embedding subtitles into the video. Soft subtitles require player support to be displayed and will not show in web browsers. Hard subtitles are displayed everywhere, including in web browsers.
12. **Extend Video End**: The voiceover duration might exceed the original video length. Selecting this option extends the last 10ms of the video until the voiceover ends. It is recommended to select this.
13. **Auto-Speed Up Voiceover**: The voiceover duration might be longer than the original speech. Selecting this forces an increase in speech speed to match, up to a maximum acceleration rate that can be modified in Menu -> Tools/Advanced Settings -> Advanced Settings.
14. **Auto-Slow Down Video**: Selecting this slows down the video to align it with the audio and subtitles. The slowdown rate can also be controlled in the Advanced Settings menu.
15. **Keep Background Audio**: Selecting this preserves the original background audio in the video, such as background music. If selected, processing will be slower, especially for larger videos.
16. **CUDA Acceleration**: Available on Windows and Linux machines with an NVIDIA GPU to accelerate processing. Requires a CUDA environment installed on the machine. Installation tutorial: https://pyvideotrans.com/gpu.html
17. **Clean Generated Files**: If processing the same video repeatedly, select this to delete previously generated files before regenerating them.
18. **Shutdown After Completion**: Choose whether to shut down the computer after the task finishes.
19. **Start Processing**: Click to begin execution after all settings are configured.
20. **Import Subtitles**: If you want to use existing local subtitle files, click to import them. After import, they will be used directly, bypassing the speech recognition step.
21. **Overall Voiceover Speed**: For example, 10 means the speed is increased by 10% from normal; -10 means decreased by 10%.
22. **Volume +**: Increase or decrease the volume relative to the normal level. Only effective for edgeTTS.
23. **Pitch +**: Increase or decrease the pitch relative to the normal level. Only effective for edgeTTS.