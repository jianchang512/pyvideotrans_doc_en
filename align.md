---
title: Why Do Audio, Subtitles, and Video Fall Out of Sync?
date: 2024-01-22 14:33:00
description: When translating between different languages, sentence length and pronunciation duration usually change. For example, translating from Chinese to English results in different sentence lengths, and the time taken to speak the Chinese sentence versus the English sentence is generally different.
---
## Why Do Audio, Subtitles, and Video Fall Out of Sync?

When translating between different languages, sentence length and pronunciation duration usually change. For example, translating from Chinese to English results in different sentence lengths, and the time taken to speak the Chinese sentence versus the English sentence is generally different.

Chinese: `有多远滚多远`

English: `Get out of here as far as you can!`

Chinese: `滚远点`

Japanese: `ここから出て行け。`

The original Chinese audio in the video might take 2 seconds. After translation and dubbing into English, the duration could become 4 seconds. This inevitably leads to a loss of synchronization.

## How to Synchronize Them (Focusing Only on Sync, Not Quality)

As mentioned above, the duration changes from 2s before translation to 4s after. If the only goal is synchronization, regardless of speech speed or video playback rate, you can simply speed up the audio by 2x. This reduces the 4s duration to 2s, achieving sync. Alternatively, slowing down the video to extend the original 2s segment to 4s also achieves alignment.

**Specific Steps for Audio Speed-up Synchronization:**

1. In the software interface, select "Auto Audio Speed-up" and deselect "Video Auto Slow-down".
![image-20240902003425516](https://pvtr2.pyvideotrans.com/images/image-20240902003425516.png)
2. Open the menu Tools > Options, and set the Maximum Audio Speed-up Factor to `100`.

This achieves synchronization, but the drawback is obvious: speech speed becomes erratic.

**Steps for Video Slow-down Synchronization:**

1. Deselect "Auto Audio Speed-up" in the software interface and select "Auto Video Slow-down".
![image-20240902003436797](https://pvtr2.pyvideotrans.com/images/image-20240902003436797.png)
2. Open the menu Tools > Options, and set the Maximum Video Slow-down Factor to 20.

This also achieves synchronization. Speech speed remains constant, but the video slows down, resulting in similarly erratic video playback.

If you only want basic synchronization and don't care about the quality, you can use either of these two methods.

## Better, Acceptable Synchronization Methods

Clearly, the synchronization methods above are not practical. Audio that is too fast or video that is too slow is difficult to accept and provides a poor experience. For better results, you can enable both "Auto Audio Speed-up" and "Auto Video Slow-down" simultaneously.

**Specific Steps:**

0. When selecting the faster or openai mode, try to use a medium or larger model and choose "Full Recognition".
![image-20240902004236786](https://pvtr2.pyvideotrans.com/images/image-20240902004236786.png)

1. In the software interface, select both "Auto Audio Speed-up" and "Auto Video Slow-down". Also, set a small overall speed-up value, such as 10%.
![image-20240902003457505](https://pvtr2.pyvideotrans.com/images/image-20240902003457505.png)

2. Open the menu Tools > Options, and set the Maximum Audio Speed-up Factor to 1.8. This means the maximum speech speed is increased to 1.8 times normal. You can manually change this to 2, 1.5, or any value greater than 1.
![image-20240902003537160](https://pvtr2.pyvideotrans.com/images/image-20240902003537160.png)

3. Open the menu Tools > Options, and set the Maximum Video Speed-up Factor to 2 (which means slowing down to 0.05x normal speed). You can change this to 3, 5, or any value greater than 1.

4. After steps 1-3, synchronization might still not be perfect because maximum limits are set. When these limits are reached before perfect sync, the process may stop and continue. You can further adjust the subtitle and video-related options in the menu Tools > Options.

## Is There a Perfect Synchronization Method?

Apart from manual intervention—such as refining translations, adding transitional scenes, etc.—no programmatically automated perfect method has been found yet.

Simultaneously ensuring the following goals through automated processes for videos of any length, with any language translation and dubbing, seems like an impossible task at present:
*   Acceptable range for audio speed-up.
*   Acceptable range for video slow-down.
*   Lip-sync accuracy (matching mouth movements with speech start/end times).

Apart from manual adjustment, there is no perfect method.