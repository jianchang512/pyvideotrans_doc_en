---
title: Why Are the Recognized Subtitles of Uneven Length and Messy?
date: 2024-01-22 14:33:00
description: During the video translation process, the subtitles automatically generated in the speech recognition stage are often unsatisfactory. Sometimes the subtitles are too long, almost filling the screen; other times only two or three characters are displayed, appearing fragmented. Why does this happen?
---

## Why Are the Recognized Subtitles of Uneven Length and Messy - How to Optimize and Adjust?

During the video translation process, the subtitles automatically generated in the speech recognition stage are often unsatisfactory. Sometimes the subtitles are too long, almost filling the screen; other times only two or three characters are displayed, appearing fragmented. Why does this happen?

## Speech Recognition Segmentation Criteria

**Speech Recognition:**

When converting human speech sounds into text subtitles, sentences are typically segmented based on **silence intervals**. Generally, the duration of a silent segment is set between 200 milliseconds and 500 milliseconds. Assuming it is set to 250 milliseconds, when a silence lasting 250 milliseconds is detected, the program considers it the endpoint of a sentence. At this point, a subtitle is generated from the previous endpoint to here.

**Factors Affecting Subtitle Quality**

1. **Speaking Speed**

If the speech in the audio is very fast, with almost no pauses or pauses shorter than 250 milliseconds, the resulting subtitles will be very long, potentially lasting ten seconds or even several tens of seconds, which will fill the screen when embedded in the video.

![Image](https://pvtr2.pyvideotrans.com/img/zimu01.webp)

2. **Irregular Pauses:**

Conversely, if there are unintended pauses in the speech, for example, several pauses within what should be a continuous sentence, the resulting subtitles will be very fragmented, possibly displaying only a few words per subtitle.

![Image](https://pvtr2.pyvideotrans.com/img/zimu02.webp)

3. **Background Noise**

Background noise or music can also interfere with the detection of silence intervals, leading to inaccurate recognition.

4. **Pronunciation Clarity:** This is obvious; unclear pronunciation makes it difficult even for humans to understand.

## How to Address These Issues?

1. Reduce Background Noise:

If there is significant background noise, you can separate the human voice from the background sound before recognition, removing interfering sounds to improve recognition results.

2. Use Large Speech Recognition Models:

If computer performance allows, try to use large models for recognition, such as `large-v2` or `large-v3-turbo`.

3. Adjust the Silence Segment Duration:

The software defaults to setting the silence segment to 200 milliseconds. You can adjust this value based on the specific audio/video content. If the speech in the video you want to recognize is fast, you can reduce it to 100 milliseconds; if there are many pauses, you can increase it to 300 or 500 milliseconds. To set this, open the menu Tools/Options, then select Advanced Options, and modify the Minimum Silence Segment value in the faster/openai speech recognition adjustment section.

![Image](https://pvtr2.pyvideotrans.com/img/zimu03.webp)

4. Set the Maximum Subtitle Duration:

You can set a maximum duration for subtitles. Subtitles exceeding this duration will be forcibly segmented. This setting is also in the Advanced Options.

![Image](https://pvtr2.pyvideotrans.com/img/zimu04.webp)

As shown in the image, subtitles longer than 10 seconds will be re-segmented.

5. Set the Maximum Number of Characters per Line:

You can set an upper limit for the number of characters per subtitle line. Subtitles exceeding this character count will automatically wrap or be segmented.

![Image](https://pvtr2.pyvideotrans.com/img/zimu05.webp)

6. Enable LLM Re-segmentation Function: After enabling this option, combined with the settings mentioned in points 4 and 5 above, the program will automatically re-segment the subtitles.

After applying the above settings 3, 4, 5, and 6, the program will first generate subtitles based on silence intervals. When encountering overly long subtitles or too many characters, the program will re-segment them to split the subtitles.