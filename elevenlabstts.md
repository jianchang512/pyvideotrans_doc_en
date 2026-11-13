---
title: ElevenLabs Voice Synthesis
date: 2024-01-22 14:33:00
description: ElevenLabs is an AI voice platform (with free tier) offering cutting-edge voice synthesis, multi-language support, voice cloning, and real-time voice generation
---

## ElevenLabs Voice Channel

**What is it?**

ElevenLabs is a leading AI voice synthesis platform that delivers extremely realistic and expressive AI voices. It supports multi-language synthesis, voice cloning, and custom voice creation. It's widely regarded as one of the top AI voice services available.

**Advantages:**
- Free tier available
- Industry-leading voice quality
- Voice cloning support
- Multi-language support
- Custom voice creation

## Registration

### Step 1: Visit the Website

Open your browser and go to [ElevenLabs](https://elevenlabs.io/)

![ElevenLabs homepage](https://pvtr2.pyvideotrans.com/img/20241129170353-0.webp)

### Step 2: Create an Account

1. Click **LOG IN** or **GO TO APP** in the upper right corner
2. If you already have an account or a Google/GitHub account, log in directly
3. Otherwise, click **Sign up** below to register

![Registration page](https://pvtr2.pyvideotrans.com/img/20241129170354-1.webp)

![Fill in registration info](https://pvtr2.pyvideotrans.com/img/20241129170354-2.webp)

## Get Your API Key

### Step 1: Go to the API Keys Page

After registering and logging in, visit: https://elevenlabs.io/app/settings/api-keys

![API Keys page](https://pvtr2.pyvideotrans.com/img/20241129170355-3.webp)

### Step 2: Create and Copy the Key

1. The system will automatically create an API Key
2. **Copy and save it immediately** — the key is only shown once and won't be displayed again

![Copy API Key](https://pvtr2.pyvideotrans.com/img/20241129170355-4.webp)

## Using It in pyVideoTrans

### Step 1: Enter Your API Key

1. Open pyVideoTrans
2. Go to **Menu → TTS Settings → Elevenlabs.io**
3. Paste the API Key you copied earlier
4. Click the **Test** button
5. If it says OK, click **Save**

![Enter API Key](https://pvtr2.pyvideotrans.com/img/20241129170356-5.webp)

### Step 2: Select a Voice

1. Return to the main interface
2. Select `Elevenlabs.io` from the **Voice Channel** dropdown
3. Choose a voice from the **Voice** dropdown

![Select a voice](https://pvtr2.pyvideotrans.com/img/20241129170356-6.webp)

> **Note**: Free accounts have rate limits. To avoid errors, adjust the concurrency and pause duration between dubbing requests.

![Adjust concurrency settings](https://pvtr2.pyvideotrans.com/img/20241129170357-7.webp)

## Choose a Voice

ElevenLabs has thousands of voices. About a dozen are available for free by default, and you can also create your own.

### Adding Voices

1. Visit [Voice Lab](https://elevenlabs.io/app/voice-lab)
2. Browse available voices
3. Click **+Add** to add one to your voice list

> **Note**: Free accounts can add up to 3 custom voices

![Add voices](https://pvtr2.pyvideotrans.com/img/20241129170357-8.webp)

### Updating the Voice List

After adding or removing voices, update the voice list in pyVideoTrans:

1. Go to **Menu → TTS Settings → Elevenlabs.io**
2. Click **Test and Update Voices**
3. Wait for it to complete, then save if no errors
4. On the main interface, if the current voice channel isn't `Elevenlabs.io`, switch to it; if it already is, switch to another channel first, then switch back

## Creating Custom Voices

If you don't find a voice you like, you can generate a new custom one:

![Create custom voice](https://pvtr2.pyvideotrans.com/img/20241129170357-9.webp)

1. Click the create button to open the custom voice dialog
2. In the upper box, describe the voice characteristics you want
3. In the lower box, enter sample text for preview

![Fill in custom voice info](https://pvtr2.pyvideotrans.com/img/20241129170358-10.webp)

## Voice Cloning

In the Voice dropdown, select **clone** to use the original video's voice for dubbing.

> **Important**: Voice cloning requires an ElevenLabs **paid subscription**. Do not use it without one — it will fail.

To upgrade: https://elevenlabs.io/app/subscription

You can also try the feature for free on their website (by uploading a video), but results will have a watermark.

URL: https://elevenlabs.io/app/dubbing

![Voice cloning](https://pvtr2.pyvideotrans.com/img/20241129170358-11.webp)

![Clone preview](https://pvtr2.pyvideotrans.com/img/20241129170359-12.webp)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Test failed | Check that your API Key is correct and your account is active |
| Rate limit error | Reduce concurrency and increase the pause between requests |
| Can't find a desired voice | Add more voices in Voice Lab |
| Clone feature unavailable | Requires a paid subscription |
