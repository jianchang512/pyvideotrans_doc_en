---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "pyVideoTrans"
  text: "Translation of videos / Speech recognition & synthesis"  
  tagline: One-click translation video from one language to another
  actions:
    - theme: brand
      text: Download
      link: /downpackage
    - theme: alt
      text: Documentation
      link: /getstart
    - theme: alt
      text: Question & Ask
      link: https://bbs.pyvideotrans.com

features:
  - icon: 🎬
    title: Fully Automated Video Translation
    details: One-click pipeline Speech Recognition → Subtitle Translation → AI Dubbing → Video Compositing. Automatically generates a new video with subtitles and dubbing in the target language.
  - icon: 🧬
    title: Standalone STT / TTS Tools
    details: Includes batch speech-to-text, batch subtitle dubbing, and batch SRT subtitle translation features.
  - icon: 🎙️
    title: Multiple AI Model Support
    details: Integrates 30+ services including Faster-Whisper, F5-TTS, Qwen3-ASR, Edge-TTS, etc. Supports both local offline and online APIs — mix and match freely.
  - icon: 🌐
    title: Desktop, Browser & CLI Modes
    details: Desktop GUI + WebUI + CLI, suitable for local use, remote access, server deployment, Docker containerization, and more.
  - icon: 🛠️
    title: No Minimum Hardware Requirements
    details: Runs with or without an NVIDIA GPU — laptops and desktops both work. CUDA acceleration supported when an NVIDIA GPU is available.
  - icon: 💰
    title: Free & Open-Source, Long-Term Maintenance
    details: Fully open-source (GPL-V3), no feature restrictions, no login or registration required. Maintained since October 2023.
---

### Software Interface

![](https://pvtr2.pyvideotrans.com/1785390634543_1.png)

![](https://pvtr2.pyvideotrans.com/1785395316051_image.png)

![](https://pvtr2.pyvideotrans.com/1785395249587_image.png)

![](https://pvtr2.pyvideotrans.com/1785390640444_4.png)



### Demo

*Chinese-to-English demo (Left: Original / Right: Translated)*

<div class="videowrap">
<video loading="lazy" src="https://pvtr2.pyvideotrans.com/480zh.mp4" controls></video>
<video loading="lazy" src="https://pvtr2.pyvideotrans.com/480en.mp4" controls></video>
</div>

---

:::details Q: Is this software free, or does it require a subscription?
A: This software is completely free and open-source. There are no fees, logins, or subscriptions required. You can use it right out of the box—either by building it from source or by downloading the pre-built Windows release.
:::

:::details Q: Are there any restrictions on usage, video length, or features?
A: The software itself imposes no limitations whatsoever. It supports multiple backends, including local models, free APIs, and paid cloud APIs. The first two options (local models and free APIs) are 100% free to use. If you opt for paid APIs (like DeepSeek or Gemini), you will need to top up your balance on their respective platforms, generate an API key, and enter it into the software. Any associated costs are billed directly by the respective providers; this software simply acts as a technical integration tool.
:::

:::details Q: Can I upload the translated videos to platforms like YouTube? What about copyright issues?
A: Absolutely—where you publish your content is entirely up to you. However, whether the original video content is copyrighted or permits redistribution/repurposing is strictly a matter between you and the copyright holder; the software is not involved in and cannot verify this. Regarding commercial use of local models or third-party APIs, please refer to their respective open-source licenses and Terms of Service.
:::


:::details Q: If everything is free, how do you make a profit?
A: This is a personal open-source passion project—there is no business model or monetization plan. As you can see, we only run a few Google Ads and include sponsorship links on the documentation site to help offset server hosting costs and API token expenses used for testing. Donations are always welcome; your support goes a long way in helping maintain the project over time.
[Donate](/about)
:::
