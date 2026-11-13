---
title: FFmpeg Video Slow Motion My Study Notes and Practical Tips
date: 2025-04-11 00:33:00
description: This article delves into how to use FFmpeg to achieve video slow motion and answers the core question Does using setpts to slow down change the FPS? It introduces the method of extending video duration based on the setpts filter and emphasizes that this method typically keeps the output file's marked FPS consistent with the input, achieving the effect of slow motion without changing the marked FPS. It also explains in detail how to use the atempo filter to handle audio synchronization. For the scenario of creating slow-motion videos from image sequences, it clarifies the crucial roles of the input and output -r parameters. The article also provides practical tips for balancing processing speed and output quality. This serves as a clear and practical guide for users who need to adjust video playback speed with FFmpeg, especially those who wish to maintain the original FPS marking.

---


# FFmpeg Video Slow Motion: My Study Notes and Practical Tips

Hello everyone who works with videos!

Have you ever encountered a situation where you wanted to use FFmpeg to slow down a video's playback speed, say by half, to see details more clearly or to follow along with something? Or perhaps, you have a series of sequentially taken images and want to combine them into a video, but hope it plays back slowly instead of flashing by?

I've been pondering these questions recently and found that FFmpeg has several key points to consider, especially when setting speed and handling image sequences. I looked through some discussions on Reddit (like these two: [how to make a video slow down](https://www.reddit.com/r/ffmpeg/comments/1iqphgy/how_to_make_a_video_recorded_at_1x_speed_into_a/) and [creating video from images](https://www.reddit.com/r/ffmpeg/comments/1jizg4f/how_to_create_a_video_from_images_with_ffmpeg/)), combined with my own practice, and compiled these notes.

This note doesn't talk about fancy "slow-motion effects"; it's about **how to use FFmpeg to genuinely slow down video playback speed**. We'll also specifically explore a common question: **When using `setpts` to slow down, does the video's frame rate (FPS) change? And how to only extend playback time without changing the (file-marked) FPS?** Finally, we'll also discuss **when generating videos from images, how to correctly set that sometimes confusing frame rate (`-r`) parameter**. Don't worry, we'll cover basic, practical methods applicable to Windows, Linux, and macOS, hoping to help you with similar needs.

Let's see how to make FFmpeg obediently "slow down"!

---

## Behind Video Slow Motion: How is Time Stretched?

Making a video play in slow motion essentially means extending the display time of each frame, increasing the total duration of the video to achieve a slower playback speed. FFmpeg primarily achieves this by adjusting two things:

1.  **Presentation Timestamp (PTS)**: Simply put, it tells the player at which point in the video this frame should be displayed.
2.  **Frame Rate (Frame Rate)**: How many frames per second the video contains.

From reading discussions, I found the main sticking points are:

*   How to accurately control the slow-motion multiplier?
*   **After using `setpts` to slow down, will the output video's FPS change?**
*   How to handle audio to keep it synchronized when the video slows down?
*   What's the key difference between input and output frame rate (`-r`) settings when creating videos from images?
*   Are there pitfalls when using FFmpeg on different operating systems?

Let's address these issues one by one.

---

## Method 1: Slowing Down an Existing Video (Basic Operation, Including FPS Clarification)

To slow down the playback speed of an existing video file, the most direct method is to use the `setpts` filter (via the `-vf` parameter). For example, to make the video play at half its original speed:

```bash
ffmpeg -i input.mp4 -vf "setpts=2.0*PTS" output.mp4
```

*   **Explanation**: `-vf "setpts=2.0*PTS"` is key. It tells FFmpeg to multiply the original display timestamp (PTS) of each frame by 2. This way, content that originally took 1 second to play now takes 2 seconds, naturally reducing the playback speed to half. **It directly acts on timestamps, stretching the time interval between frames.**

*   **So, will the FPS change? How to only extend playback time without changing FPS?**
    *   **Great question!** `setpts` itself modifies timestamps; it does not directly change the FPS metadata recorded in the video stream (e.g., 30fps).
    *   **Typically (Default Behavior)**: When you use only `setpts` and **do not** use `-r` on the output side to force a new frame rate, FFmpeg often **keeps the output video file's FPS marking consistent with the input video**.
    *   **The result is**: You get a video file with **doubled duration**, containing the **same total number of frames as the original video**, and the file info shows the **same FPS as before** (e.g., still 30fps).
    *   **Therefore, the command `ffmpeg -i input.mp4 -vf "setpts=2.0*PTS" output.mp4` itself (in most cases) already achieves your goal: extends playback time while keeping the file's marked FPS unchanged.** It achieves the slow-motion effect by making each frame display longer, not by changing the video's frame rate standard.
    *   **An important note**: Although the file's marked FPS doesn't change, because the total duration increases while the total frame count remains the same, the actual number of *new frames* seen per second during playback is indeed reduced. This might make it feel less smooth than the original speed (but this is precisely the desired effect of slow motion).

*   **Cross-Platform Compatibility**: This command is written the same way on Windows, Linux, and macOS, which is very convenient.

---

## Method 2: Handling Audio Synchronization (Sound Must Slow Down Too)

Slowing down only the visuals is often not enough. If the video has audio, the sound must also slow down; otherwise, it will go out of sync. This requires adding the `atempo` audio filter (via the `-af` parameter):

```bash
ffmpeg -i input.mp4 -vf "setpts=2.0*PTS" -af "atempo=0.5" output.mp4
```

*   **Explanation**: `-af "atempo=0.5"` means reducing the audio playback speed to 0.5 times the original (i.e., half). This keeps the sound and picture synchronized.
    *   **Additional Note**: The speed factor for the `atempo` filter must be between 0.5 and 100.0. To go slower than 0.5x (e.g., 0.25x), you need to use it consecutively, like `-af "atempo=0.5,atempo=0.5"`.
*   **Cross-Platform Compatibility**: This command is also universal across platforms.

---

## Method 3: Creating Slow-Motion Videos from Image Sequences (Key Understanding of `-r`!)

This scenario is also common: You have a series of images (e.g., `img1.jpg`, `img2.jpg`, ...) and want to make them into a video, hoping this video plays back relatively slowly. Command example:

```bash
ffmpeg -r 1 -i img%d.jpg -vf "setpts=2.0*PTS" -r 30 -c:v libx264 -pix_fmt yuv420p output.mp4
```

Understanding the two `-r` parameters here is key:

*   **The first `-r` (input `-r 1`)**:
    *   Defines **how long each input image represents by default when being read**. `-r 1` means each image takes up 1 second (input base frame rate 1fps). 10 images would be 10 seconds of base material duration.
    *   It sets the **time base for the input material**.

*   **The second `-r` (output `-r 30`)**:
    *   Specifies **at what frame rate the final generated video file should play**. `-r 30` means outputting a 30fps video.
    *   It determines the **specification and smoothness of the output video**. FFmpeg will calculate the total number of frames needed based on the total duration after `setpts` adjustment (e.g., 10 images, input `-r 1`, `setpts=2.0` results in a target duration of 20 seconds) and this output frame rate (30fps), which is 20 * 30 = 600 frames. It will fill these 600 frames by **repeating** the original images (because `setpts` only changes timestamps) to ensure the output video meets the 30fps standard.

*   **Working Together**: Input `-r` sets the base duration -> `setpts` adjusts the duration -> Output `-r` sets the final specification and frame filling method.

*   **Cross-Platform Notes**: Windows recommends using `%d` to match numbered sequence filenames; Linux/macOS can use `*` but `%d` is safer.

---

## Method 4: Balancing Processing Speed and Output Quality

Video processing can be time-consuming; parameters can be adjusted for a trade-off:

*   **Increase Speed**: Use `-preset ultrafast` / `fast`, etc.
*   **Control Quality**: Use `-crf` value (e.g., `-crf 20`).

Balanced example:
```bash
ffmpeg -i input.mp4 -vf "setpts=2.0*PTS" -af "atempo=0.5" -c:v libx264 -preset fast -crf 20 -c:a aac output.mp4
```
*   **Hardware Acceleration**: Consider `-c:v h264_nvenc` (Nvidia) or `-c:v h264_videotoolbox` (Apple) for speedup.

---

Alright, this time we've explored in-depth the methods for achieving "slow motion" with FFmpeg and specifically clarified the relationship between `setpts` and FPS. Key takeaways:

1.  **Slowing Down Existing Videos**:
    *   Use `-vf "setpts=N*PTS"` (N>1) to extend video time.
    *   This command **typically keeps the output file's FPS marking consistent with the input** while extending playback time, meeting the need for "slow motion only, without changing (marked) FPS".
    *   Don't forget to use `-af "atempo=1/N"` (note the 0.5x speed limit) to handle audio synchronization.
2.  **Creating Slow-Motion Videos from Image Sequences**:
    *   **Input `-r`** determines the time value of each image.
    *   **Output `-r`** sets the playback frame rate for the final video (recommended 25 or 30).
    *   **`setpts`** is used to further adjust the overall playback speed.
3.  **Cross-Platform**: Core commands are universal; pay attention to filename patterns.
4.  **Efficiency and Quality**: Use `-preset` and `-crf` to adjust.