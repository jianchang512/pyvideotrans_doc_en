---
title: FFmpeg Audio and Video Formats Explained Savoring Media Like a Gourmet
date: 2025-03-27 14:33:00
description: An in-depth analysis of FFmpeg audio and video formats and parameters, h
---

# FFmpeg Audio and Video Formats Explained: Savoring Media Like a Gourmet

> Tip: If FFmpeg is already installed on your computer, you can use it directly from the command line. If not installed, you can download a pre-compiled FFmpeg toolkit. For example, in the Windows pre-packaged FFmpeg directory of pyVideoTrans, the `ffmpeg.exe` file is already included. You can navigate to that folder, type `cmd` in the address bar and press Enter, which allows you to execute `ffmpeg` commands. For example, typing `ffmpeg -h` displays FFmpeg's help information.

Additionally, for convenience, you can add FFmpeg's installation directory to your system's environment variables. The specific method is: Right-click "This PC," select "Properties," then click "Advanced system settings." In the "System Properties" window, click the "Environment Variables" button. In the "System variables" section, find the variable named "Path," select it, and click "Edit." In the pop-up window, click "New," then browse to FFmpeg's installation directory and add it. This way, you can open a CMD or PowerShell window anywhere and directly execute `ffmpeg` commands, including the examples below.

## 1. Video Formats: The "Lingua Franca" and "Local Dialects" of the Video World

Video formats are like different languages; they all convey video information, but their encoding and compression methods vary. Choosing the right video format is like choosing the right language for communication, allowing you to better express your ideas.

1.  **MP4 (.mp4): The "Mandarin" of the Video World, King of Compatibility**

    *   **Characteristics:** The MP4 format is currently the most widely used and compatible video format, supported by almost all devices and platforms. Like Mandarin, it works everywhere. Therefore, MP4 is the preferred format for video sharing.
    *   **Encoding:** Common video codecs for MP4 are H.264 (AVC) and H.265 (HEVC). H.264 has a long history and excellent compatibility; H.265 is a more advanced codec that can compress files to a smaller size while maintaining the same quality.
    *   **FFmpeg Usage:**

        *   **Convert other video formats to H.264 encoded MP4:**

            ```bash
            ffmpeg -i input.avi -c:v libx264 output.mp4
            ```

        *   **Convert other video formats to H.265 encoded MP4:**

            ```bash
            ffmpeg -i input.avi -c:v libx265 output.mp4
            ```

            *   `-c:v`: This parameter specifies the video encoder. `libx264` is the H.264 encoder, `libx265` is the H.265 encoder. FFmpeg supports many encoders; choose the appropriate one for your needs.
            *   `-preset slow`: This parameter controls encoding speed and quality. Slower encoding typically yields better quality. `slow` is a balanced choice. Other options range from `ultrafast` (fastest, lower quality) to `veryslow` (slowest, best quality). `medium` and `slow` are commonly used.
            *   `-crf 23`: This parameter controls video quality. Its value typically ranges from 18-28. Lower values mean better quality but larger file size. This is crucial when using `libx264` and `libx265` encoders to balance quality and file size.

    *   **Use Cases:** Online video, mobile devices, general storage. MP4 is suitable for almost any scenario requiring video, whether uploading to video platforms or watching on phones.

2.  **AVI (.avi): The Classic "Dialect," Historic but Somewhat Outdated**

    *   **Characteristics:** AVI is a historic video format with relatively low compression efficiency, often resulting in larger file sizes. Like photos from an old camera, classic but potentially less sharp than modern ones.
    *   **Encoding:** AVI can contain various video codecs like DivX, Xvid. It's a container that can hold different encodings.
    *   **FFmpeg Usage:**

        *   **Convert to other formats:** Due to lower compression efficiency, AVI is often converted to more modern formats like MP4.

            ```bash
            ffmpeg -i input.avi -c:v libx264 output.mp4
            ```

        *   **Repair AVI files:** Sometimes AVI files may be corrupt; FFmpeg can attempt repairs.

            ```bash
            ffmpeg -i input.avi -c copy -copyts output.avi
            ```

            *   `-c copy`: This parameter copies video and audio streams directly without re-encoding. It's very fast. Useful when only the container is damaged, but the encoding itself is fine.

3.  **MKV (.mkv): The Powerful "Universal Container," All-Encompassing**

    *   **Characteristics:** MKV is a highly flexible video format that can hold multiple video, audio, and subtitle tracks. Like a powerful "shipping container," it packs various elements together, earning it the name "universal container."
    *   **Encoding:** MKV supports various video codecs (e.g., H.264, H.265) and audio codecs (e.g., AAC, MP3). It's highly inclusive, supporting almost all common encodings.
    *   **FFmpeg Usage:**

        *   **Extract video or audio from an MKV file:**

            ```bash
            ffmpeg -i input.mkv -c:v copy -an video.mp4   # Extract video
            ffmpeg -i input.mkv -c:a copy -vn audio.aac   # Extract audio
            ```

            *   `-an`: This parameter removes audio.
            *   `-vn`: This parameter removes video.

        *   **Merge video and audio into an MKV file:**

            ```bash
            ffmpeg -i video.mp4 -i audio.aac -c copy output.mkv
            ```

4.  **MOV (.mov): Apple's "Official Language," The High-Quality Choice**

    *   **Characteristics:** MOV is a video format developed by Apple, commonly used with QuickTime Player and macOS. MOV typically offers high video quality. Like Apple products, known for refinement and high quality.
    *   **Encoding:** The common video codec for MOV is H.264.
    *   **FFmpeg Usage:**

        *   **Convert to/from other formats:** Similar to MP4, MOV can be easily converted.

            ```bash
            ffmpeg -i input.mov -c:v libx264 output.mp4
            ```

5.  **WebM (.webm): The Internet's "Lingua Franca," Open Source and Free**

    *   **Characteristics:** WebM is an open-source, free video format designed for web video, suitable for playback in HTML5 pages. It allows video playback on the web without any plugins.
    *   **Encoding:** Common WebM video codecs are VP8 and VP9. VP9 offers higher compression and is the recommended codec for WebM.
    *   **FFmpeg Usage:**

        *   **Convert other video formats to VP9 encoded WebM:**

            ```bash
            ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 output.webm
            ```

            *   `-b:v 0`: This parameter enables variable bitrate (VBR) encoding based on quality. It automatically adjusts the bitrate according to video complexity, minimizing file size while maintaining quality. The `-crf` parameter also applies here.

## 2. Audio Formats: Let Your Ears Enjoy "Heavenly Music," Choose the Best Sound

Audio formats determine sound quality, file size, and compatibility. Like choosing different audio equipment, different formats offer different listening experiences.

1.  **MP3 (.mp3): The "Mandarin" of Audio, Playable Everywhere**

    *   **Characteristics:** MP3 is a highly compressed, small-sized, widely compatible audio format supported by almost all devices. Like the "Mandarin" of audio, it plays anywhere. However, MP3 loses some audio quality.
    *   **FFmpeg Usage:**

        *   **Convert other audio formats to MP3:**

            ```bash
            ffmpeg -i input.wav -c:a libmp3lame -q:a 4 output.mp3
            ```

            *   `-c:a`: This parameter specifies the audio encoder. `libmp3lame` is a common MP3 encoder.
            *   `-q:a`: This parameter specifies audio quality, ranging from 0-9. Lower values mean higher quality but larger file size. It controls MP3 compression.

2.  **AAC (.aac): The Upgraded MP3, Better Quality, Smaller Size**

    *   **Characteristics:** AAC offers better sound quality and higher compression than MP3. It's the common audio codec for MP4 video. Like high-definition photos, richer in detail and color.
    *   **FFmpeg Usage:**

        *   **Convert other audio formats to AAC:**

            ```bash
            ffmpeg -i input.wav -c:a aac -b:a 128k output.aac
            ```

            *   `-b:a`: This parameter specifies the audio bitrate. 128kbps is a common choice. Higher bitrate means better quality but larger file size.

3.  **WAV (.wav): Preserving the "Original Flavor," Quality First**

    *   **Characteristics:** WAV is a lossless format that retains all audio information, offering the best quality. Like an unprocessed raw photo, it keeps all details but results in the largest file size.
    *   **FFmpeg Usage:**

        *   **Convert to/from other formats:** WAV is often used as high-quality source audio for conversion.

            ```bash
            ffmpeg -i input.mp3 output.wav
            ```

4.  **FLAC (.flac): The Master of Lossless Compression, Balancing Size and Quality**

    *   **Characteristics:** FLAC is a lossless compression format that maintains quality while reducing file size. It's the preferred choice for audiophiles. Like a losslessly compressed photo, it retains all details while reducing size.
    *   **FFmpeg Usage:**

        *   **Convert other audio formats to FLAC:**

            ```bash
            ffmpeg -i input.wav -c:a flac output.flac
            ```

5.  **OGG (.ogg): The Open-Source "Rising Star," Ideal for Web Streaming**

    *   **Characteristics:** OGG is an open-source, free audio format with good quality, suitable for web streaming. It can be used without any licensing fees. Like open-source software, free and powerful. The common OGG codec is Vorbis.
    *   **FFmpeg Usage:**

        *   **Convert other audio formats to OGG using Vorbis encoding:**

            ```bash
            ffmpeg -i input.wav -c:a libvorbis -q:a 5 output.ogg
            ```

## 3. Common FFmpeg Parameters: Simplifying Complexity, Mastering Core Media Processing

FFmpeg's power lies in its flexibility, controlled by various parameters. Mastering these lets you cook up delicious media dishes like a skilled chef.

*   `-i input.xxx`: Specifies the input file. `input.xxx` is the path to your media file.
*   `output.xxx`: Specifies the output file. `output.xxx` is the path for the processed file.
*   `-c:v`: Specifies the video encoder. E.g., `libx264`, `libx265`, `libvpx-vp9`. Choosing the right encoder controls compression efficiency and compatibility.
*   `-c:a`: Specifies the audio encoder. E.g., `libmp3lame`, `aac`, `libvorbis`. Choosing the right encoder controls audio quality and file size.
*   `-b:v`: Specifies the video bitrate. E.g., `2000k` (2000kbps), `5M` (5Mbps). Higher bitrate means better quality but larger file size.
*   `-b:a`: Specifies the audio bitrate. E.g., `128k` (128kbps), `192k` (192kbps). Higher bitrate means better quality but larger file size.
*   `-r`: Specifies the frame rate (frames per second). Controls video smoothness. Typically, movies use 24fps, TV shows 30fps.
*   `-s`: Specifies the resolution. E.g., `1280x720` (720p), `640x480` (480p). Higher resolution means clearer video.
*   `-ss`: Specifies the start time. E.g., `00:00:10` means start processing from the 10th second. Used for clipping video segments.
*   `-t`: Specifies the duration. E.g., `00:00:05` means a duration of 5 seconds. Used for clipping video segments.
*   `-vn`: Disables video. Processes only audio.
*   `-an`: Disables audio. Processes only video.
*   `-filter:v`: Adds video filters. E.g., `scale=640:480` changes resolution. FFmpeg offers rich filters for various video processing.
*   `-filter:a`: Adds audio filters. For audio processing like volume adjustment, noise reduction.
*   `-threads`: Specifies the number of threads to improve encoding speed. Multi-threading utilizes CPU performance for faster encoding.

## 4. `-c copy`: The Magic of Stream Copying, Experience "Instant Transfer" Speed

*   **`-c copy`:** This parameter copies the original video or audio streams directly without any re-encoding. Like copying a file, it's very fast and loses no quality. However, note that using `-c copy` requires specific conditions.

**When can you use `-c copy`? It's like a puzzle; pieces must match in shape and size to fit.**

The core of `-c copy` is "copying," so it only works when input and output formats are **compatible** and you **do not need to change the encoding**. Specifically:

1.  **Changing the container format, but keeping the internal encoding the same:** Like changing the box, but the contents remain the same.

    *   Example: Extracting the video stream from `input.mp4` to `output.mkv`. If the video in `input.mp4` is already H.264, and you just want to put the H.264 video into an MKV container, you can use `-c copy`.
    *   Another example: Converting an MP4 file to a TS file only changes the container format.

        ```bash
        ffmpeg -i input.mp4 -c copy output.ts
        ```

2.  **Extracting video or audio streams:** Like cutting a piece from a large cake, just taking a part without changing its shape.

    *   Extracting audio from a video file without changing its encoding (e.g., both are AAC).
    *   Example: Extracting H.264 encoded video from `input.mkv` to `output.mp4`, and the `output.mp4` container format also supports H.264 encoding well.

        ```bash
        ffmpeg -i input.mkv -c:v copy -an output.mp4   # Extract video
        ffmpeg -i input.mkv -c:a copy -vn output.aac   # Extract audio
        ```

3.  **Repairing files:** Like fixing a damaged box; the contents are fine, just need repackaging. (Sometimes file corruption is only at the container level)

    ```bash
    ffmpeg -i input.avi -c copy -copyts output.avi
    ```

    The `-copyts` parameter copies timestamps, helping fix timeline issues. Timestamps are like a video's "diary," recording the playback time of each frame.

**When can you NOT use `-c copy`? Like trying to fit a square peg into a round hole; it just won't work.**

1.  **Need to change the encoding:** Like translating from one language to another; conversion is necessary.

    *   Example: Converting H.264 encoded video to H.265.
    *   Converting MP3 audio to AAC audio.

2.  **Changing parameters like resolution, frame rate:** Like resizing a photo; reprocessing is required.

    *   Any modification to video or audio content means you cannot use `-c copy`; you must specify the appropriate encoder and parameters.

3.  **Input and output formats are incompatible:** Like trying to plug different types of plugs together; an adapter is needed.

    *   Although rare, some formats may not directly copy stream data between each other.

**Common usage combinations for `-c copy`:**

*   **Video:**
    *   `MP4` <-> `MOV` (if both are H.264 encoded) Like using the same language for free communication.
    *   `MKV` <-> `MP4/MOV/AVI` (extracting or packaging, encoding unchanged) Like putting different things into or out of the same container.
    *   `TS` (MPEG Transport Stream) <-> `MP4/MKV` (encoding unchanged, often used for live stream processing) TS is common for live streaming and can be easily converted.

*   **Audio:**
    *   `AAC` <-> `MP4/MOV/MKV` (extracting or packaging)
    *   `MP3` <-> `MP4/MOV/MKV` (extracting or packaging)
    *   `WAV` -> `WAV` (repairing)

**Examples:**

*   **Correct use of `-c copy`:**

    ```bash
    # Extract H.264 video from MKV to MP4
    ffmpeg -i input.mkv -c:v copy -an output.mp4

    # Package AAC audio into an MP4 container
    ffmpeg -i input.aac -vn -c:a copy output.mp4
    ```

*   **Incorrect use of `-c copy`:**

    ```bash
    # Wrong! Trying to convert H.264 to H.265; cannot use copy
    ffmpeg -i input.mp4 -c:v libx265 output.mp4 -c copy #Error, should not add -c copy
    ```

## 5. Practical Exercises: Common FFmpeg Tasks to Elevate Your Media Processing Skills

1.  **Video Format Conversion:** Convert video from one format to another, like translating a language for broader understanding.

    ```bash
    ffmpeg -i input.mov -c:v libx264 -c:a aac output.mp4
    ```

2.  **Video Trimming:** Extract a highlight clip from a video, like editing a movie to emphasize the best parts.

    ```bash
    ffmpeg -i input.mp4 -ss 00:00:10 -t 00:00:05 -c copy output.mp4
    ```

3.  **Extract Audio:** Extract audio from a video, like extracting an instrumental track from a song for remixing.

    ```bash
    ffmpeg -i input.mp4 -vn -c:a copy output.aac
    ```

4.  **Merge Video and Audio:** Combine video and audio into one file, like mixing food and rice for easy consumption.

    ```bash
    ffmpeg -i video.mp4 -i audio.aac -c copy output.mkv
    ```

5.  **Adjust Video Resolution:** Change the video frame size, like resizing a photo for different devices and platforms.

    ```bash
    ffmpeg -i input.mp4 -vf scale=640:480 output.mp4
    ```

    *   `-vf` is equivalent to `-filter:v`