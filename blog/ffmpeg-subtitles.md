---
title: Soft Subtitles vs. Hard Subtitles A Complete Guide Through Two FFmpeg Commands!
date: 2025-05-11 14:33:00
description: When using video translation software like pyVideoTrans, you face the choice between "embedding soft subtitles" or "embedding hard subtitles." What's the difference? What are their pros and cons? And how are they implemented using the FFmpeg tool? This guide will explain everything in the simplest way possible!
---

## Soft Subtitles vs. Hard Subtitles: A Complete Guide Through Two FFmpeg Commands!

When using video translation software like pyVideoTrans, you face the choice between "embedding soft subtitles" or "embedding hard subtitles." What's the difference? What are their pros and cons? And how are they implemented using the FFmpeg tool?

![Choosing subtitle embedding method in video translation software](https://pvtr2.pyvideotrans.com/1746950633333_image.png)

Don't worry, this guide will explain everything in the simplest way possible!

### Two Ways to Embed Subtitles: Soft vs. Hard

Think of subtitles as a "text coat" for your video. This coat can be worn in two ways:

1.  **Soft Subtitles:** Like a jacket you can put on or take off anytime. The subtitle data is stored separately from the video frames but packaged within the same video file (like MP4 or MKV). When watching, the viewer can freely choose to show or hide the subtitles, and even switch between different languages if multiple subtitle tracks are available.
2.  **Hard Subtitles:** Also known as "burned-in" subtitles. This is like having the text pattern directly printed onto the clothes, becoming one with the fabric. The pixel information of the subtitles is directly "drawn" onto every frame of the video, becoming part of the video image itself. Once created, the subtitles are permanently displayed and cannot be turned off or changed.

### FFmpeg in Action: Let's Do It!

FFmpeg is an incredibly powerful open-source multimedia processing tool. We can use it to add both types of subtitles to a video. Let's look at two specific command examples, assuming we have a video file `1.mp4` and a subtitle file (in SRT or ASS format).

#### Scenario 1: Embedding Soft Subtitles (Viewer-Controllable, Recommended for `.srt` subtitles)

If you want viewers to control subtitle visibility or if you offer subtitles in multiple languages, soft subtitles are your best choice.

**FFmpeg Command:**

```bash
ffmpeg -i 1.mp4 -i 1.srt -c:v copy -c:s mov_text -metadata:s:s:0 language=chn -movflags +faststart out_soft_subs.mp4
```

**Command Breakdown, Explained Step by Step:**

*   `ffmpeg`: The boss arrives, telling the computer we're using FFmpeg.
*   `-i 1.mp4`: The first input file, our original video.
*   `-i 1.srt`: The second input file, our SRT format subtitle file. (SRT is a common plain-text subtitle format)
*   `-c:v copy`: `-c:v` refers to the video codec. `copy` means "copy directly," without re-encoding the video. The benefit is super-fast speed and zero loss in video quality!
*   `-c:s mov_text`: `-c:s` refers to the subtitle codec. `mov_text` is a text subtitle format supported by MP4 files. We convert the SRT subtitles into this format and embed them into the MP4.
*   `-metadata:s:s:0 language=chn`: This adds an "ID card" to the subtitle track.
    *   `-metadata`: Set metadata.
    *   `:s:s:0`: `s` stands for stream. The first `s` indicates a subtitle stream, and `0` indicates the first subtitle stream (if multiple are embedded, there would be `1`, `2`...).
    *   `language=chn`: Tells the player this subtitle is in Chinese ("chn" is the ISO code for Chinese). This allows the player to correctly display "Chinese" in the subtitle selection list.
*   `-movflags +faststart`: A small optimization for MP4 files. It moves some important "index information" to the beginning of the file, allowing the video to start playing faster over the network, improving user experience.
*   `out_soft_subs.mp4`: The output filename. Our processed video with soft subtitles will have this name.

**What does this command do?**

It takes the video frames from `1.mp4` unchanged, converts the `1.srt` subtitle file into `mov_text` format, and packs it into the final `out_soft_subs.mp4` file as an independent subtitle track.

**Summary of Soft Subtitle Characteristics:**

*   **Pros:**
    *   Viewers can freely show/hide subtitles or switch languages.
    *   Fast processing, lossless video quality (because video is `copy`).
    *   Convenient file management; video and subtitles are in one file.
*   **Cons:**
    *   **Compatibility Issues:** While most modern players (VLC, PotPlayer, mobile players) support it well, on some older devices or specific playback environments (especially web browsers using the `<video>` tag directly), subtitles might not display or require manual user setup.
    *   **Limited Styling:** SRT subtitles have simple styling; the final display depends more on the player's rendering capabilities.

#### Scenario 2: Embedding Hard Subtitles (Subtitles "Welded" onto the Video, Recommended for `.ass` subtitles to preserve styling)

If you want subtitles to always be visible, or if your subtitle file (e.g., ASS format) contains many cool styles (fonts, colors, positions, animations) you don't want to lose, then hard subtitles are your choice.

**FFmpeg Command:**

```bash
ffmpeg -i 1.mp4 -c:v libx264 -vf subtitles=1.ass -movflags +faststart out_hard_subs.mp4
```

**Command Breakdown:**

*   `ffmpeg -i 1.mp4`: Same as above, specifies the input video.
*   `-c:v libx264`: `-c:v` is still the video codec. But this time we use `libx264`. This is a very popular, high-quality H.264 video encoder. **Note: It's no longer `copy`, meaning the video will be re-encoded!**
*   `-vf subtitles=1.ass`: This is the core!
    *   `-vf`: Means we want to use a video filter.
    *   `subtitles=1.ass`: `subtitles` is the filter name. It reads the `1.ass` subtitle file (ASS format supports rich styling) and "draws" the subtitle content onto every frame of the video.
*   `-movflags +faststart`: Same optimization for network playback.
*   `out_hard_subs.mp4`: The output filename for the video with hard subtitles.

**What does this command do?**

It reads the video from `1.mp4`, then uses the `subtitles` filter to render and overlay the content (including all styles) from the `1.ass` subtitle file onto the video frames. Finally, it re-encodes this new video stream with the burned-in subtitles using the `libx264` encoder and saves it as `out_hard_subs.mp4`.

**Summary of Hard Subtitle Characteristics:**

*   **Pros:**
    *   **Excellent Compatibility:** As long as the player can play the video, the subtitles will definitely show. No need to worry about player support. Especially suitable for direct web playback or playback on simple devices.
    *   **Perfect Style Retention:** If you use advanced subtitle formats like ASS, hard subtitles perfectly preserve all fonts, colors, positions, dynamic effects, etc. What you see is what you get!
*   **Cons:**
    *   **Subtitles Cannot Be Turned Off or Changed:** Subtitles are part of the image; viewers cannot turn them off.
    *   **Video Requires Re-encoding:** This means:
        *   **Slower Processing:** Takes more time compared to direct `copy`.
        *   **Potential Quality Loss:** Re-encoding always causes some quality loss unless you set a very high bitrate (which increases file size).
    *   **Difficult to Modify:** Once burned in, changing subtitle content or style is very troublesome, essentially requiring re-creation.

### Soft Subtitles vs. Hard Subtitles: How to Choose?

Understanding their differences and pros/cons makes the choice clear:

*   **Prioritize flexibility and lossless quality, and your target audience uses modern players?** -> **Choose Soft Subtitles.**
    *   Example: Creating tutorial videos where users can choose to turn on/off Chinese/English subtitles; sharing a movie with friends who use players like VLC.
    *   When pyvideotrans users choose to embed "soft subtitles," it operates similarly to the first command.

*   **Prioritize ultimate compatibility, want subtitles guaranteed to show in any situation, or have very important/complex subtitle styling?** -> **Choose Hard Subtitles.**
    *   Example: Making promotional videos that need to play on various devices (including old TVs, projectors); videos with special subtitle layouts and animations; or simply ensuring everyone sees subtitles regardless of their player settings.
    *   When pyvideotrans users choose to embed "hard subtitles," it operates similarly to the second command.

**A Small Addition: About External Subtitles**

There's another common form: **External Subtitles**. This means the subtitle file (e.g., `movie.srt`) and the video file (e.g., `movie.mp4`) are separate files, placed in the same folder. Players automatically load or allow manual loading.

*   **Pros:** Super easy to edit subtitles (can edit SRT with Notepad), good compatibility.
*   **Cons:** Easy to forget the subtitle file when sharing, or mismatched filenames can prevent loading. Managing multiple subtitle files is also cumbersome.

The "embedded soft subtitles" we discussed today solve the distribution inconvenience of external subtitles by packaging them into the video file.

### Summary

Through this guide, you should now have a clearer understanding of the principles and methods for handling soft and hard subtitles with FFmpeg:

| Feature              | Embedded Soft Subtitles                                 | Hard Subtitles (Burned-in)                     |
| :------------------- | :------------------------------------------------------ | :--------------------------------------------- |
| **Core Command**     | `-c:v copy` (no video re-encode), `-c:s mov_text` (embed) | `-c:v libx264` (video re-encode), `-vf subtitles` (burn) |
| **Viewer Control**   | Can turn on/off, switch                                 | Cannot turn off, fixed display                 |
| **Video Quality**    | Lossless (due to `copy`)                                | Potentially lossy (due to re-encoding)         |
| **Processing Speed** | Fast                                                    | Slow                                           |
| **Style Retention**  | Depends on player, simple styles                        | Perfect retention (especially with ASS)        |
| **Compatibility**    | Good, but may fail in some environments                 | Excellent, subtitles show if video plays       |

In tools like pyvideotrans, understanding the difference between these two subtitle types helps you make the best choice based on your needs, presenting your video work to the audience in the most suitable way.