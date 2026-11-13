---
title: How to Check if FFmpeg Supports a Specific Codec and Hardware Acceleration
date: 2025-07-09 14:33:00
description: Which audio and video formats can FFmpeg handle, does FFmpeg support a specific codec and hardware acceleration, and can our computer hardware (like a GPU) be used to accelerate video processing.
---



## How to Use FFmpeg to View Supported Codecs and Hardware Acceleration

When using FFmpeg to process videos, we often need to know exactly which encoding formats it supports and whether our computer hardware (like a GPU) can be used to accelerate video processing. Using hardware acceleration can significantly speed up video processing. This article teaches you the most direct way to check this information.

## 1. View All Supported Codecs

The easiest way to find out which audio and video formats your FFmpeg can handle is to have it list them itself.

### **1. View All Codecs**

Open your command line terminal (CMD or PowerShell on Windows, Terminal on macOS or Linux) and enter the following command:

```bash
ffmpeg -codecs
```

After execution, you will see a long list. Each line has a similar format; the key is understanding the letters at the beginning:

```
Codecs:
 D..... = Decoding supported
 .E.... = Encoding supported
 ..V... = Video
 ..A... = Audio
 ..S... = Subtitle
 ...I.. = Intra frame-only
 ....L. = Lossy compression
 .....S = Lossless compression
 -------
 D.V.L. h264                 H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10
 DEV.LS h264_amf              AMD AMF H.264 Encoder (codec h264)
 DEV.L. h264_nvenc            NVIDIA NVENC H.264 encoder (codec h264)
 D.A.L. aac                   AAC (Advanced Audio Coding)
```

**How to read this list?**

*   **The letters in the first column** are the most important. For example, `D.V.L.` indicates it's a codec that supports **D**ecoding, is a **V**ideo codec, and uses **L**ossy compression.
*   If both `D` and `E` are present, it means the format can both decode (read) and encode (generate).
*   **The second column is the codec name**, such as `h264`, `h264_nvenc`, `aac`. In FFmpeg commands, we use these names to specify codecs.
*   **The third column is the description**, helping you understand what it is.

### **2. View Only Encoders or Decoders**

If the list is too long, you can also view only the part you're interested in.

*   **View only supported encoders:**
    ```bash
    ffmpeg -encoders
    ```

*   **View only supported decoders:**
    ```bash
    ffmpeg -decoders
    ```
This makes finding things easier.

## 2. Check Hardware Acceleration Support

Hardware acceleration generally involves two levels: first, whether FFmpeg itself supports a specific hardware acceleration technology, and second, whether there are corresponding codecs that can utilize this technology.

### **Step 1: Check Which Hardware Acceleration Technologies FFmpeg Supports**

This command tells you which hardware acceleration features were included when your installed version of FFmpeg was compiled.

```bash
ffmpeg -hwaccels
```

You might see output like this:

```
Hardware acceleration methods:
vaapi
qsv
cuda
cuvid
d3d11va
videotoolbox

```

These names correspond to different technologies and vendors:

*   `cuda`, `cuvid`, `nvenc`: Primarily for **NVIDIA** GPUs. `nvenc` mainly handles encoding, `cuvid` mainly handles decoding.
*   `qsv`: **Intel** integrated graphics Quick Sync Video technology.
*   `vaapi`, `vdpau`: Commonly used video acceleration interfaces on **Linux** systems, potentially used by both Intel and AMD GPUs.
*   `d3d11va`, `dxva2`: **Windows** system-specific, DirectX-based acceleration technologies, mainly for decoding.
*   `videotoolbox`: **macOS** system-specific.
*   `amf`: For **AMD** GPUs.

**If this list is empty, it means your FFmpeg version does not support any hardware acceleration.**

### **Step 2: Find Codecs Corresponding to Hardware Technologies**

Knowing which technology is supported, we can look for specific codecs that can utilize it. These codecs usually have a special suffix, like `_nvenc` (NVIDIA encoding), `_qsv` (Intel encoding), `_cuvid` (NVIDIA decoding).

We can use `grep` (Linux/macOS) or `findstr` (Windows) to quickly filter.

**If you have an NVIDIA GPU:**

*   Find hardware encoders:
    ```bash
    # Linux or macOS
    ffmpeg -encoders | grep nvenc
    # Windows
    ffmpeg -encoders | findstr "nvenc"
	
	# Output similar to:
	V....D av1_nvenc            NVIDIA NVENC av1 encoder (codec av1)
	V....D h264_nvenc           NVIDIA NVENC H.264 encoder (codec h264)
	V....D hevc_nvenc           NVIDIA NVENC hevc encoder (codec hevc)
	
    ```
	
	
*   Find hardware decoders:
    ```bash
    # Linux or macOS
    ffmpeg -decoders | grep cuvid
    # Windows
    ffmpeg -decoders | findstr "cuvid"
	
	# Output similar to:
	
	 V..... av1_cuvid            Nvidia CUVID AV1 decoder (codec av1)
	 V..... h264_cuvid           Nvidia CUVID H264 decoder (codec h264)
	 V..... hevc_cuvid           Nvidia CUVID HEVC decoder (codec hevc)
	 V..... mjpeg_cuvid          Nvidia CUVID MJPEG decoder (codec mjpeg)
	 V..... mpeg1_cuvid          Nvidia CUVID MPEG1VIDEO decoder (codec mpeg
	 V..... mpeg2_cuvid          Nvidia CUVID MPEG2VIDEO decoder (codec mpeg
	 V..... mpeg4_cuvid          Nvidia CUVID MPEG4 decoder (codec mpeg4)
	 V..... vc1_cuvid            Nvidia CUVID VC1 decoder (codec vc1)
	 V..... vp8_cuvid            Nvidia CUVID VP8 decoder (codec vp8)
	 V..... vp9_cuvid            Nvidia CUVID VP9 decoder (codec vp9)
    ```

**If you have Intel integrated graphics:**

*   Find QSV-related codecs:
    ```bash
    # Linux or macOS
    ffmpeg -codecs | grep qsv
    # Windows
    ffmpeg -codecs | findstr "qsv"
	
	# Output similar to:
	 DEV.L. av1                  Alliance for Open Media AV1 (decoders: libdav1d libaom-av1 av1 av1_cuvid av1_qsv) (encod
	: libaom-av1 librav1e libsvtav1 av1_nvenc av1_qsv av1_amf av1_vaapi)
	 DEV.LS h264                 H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10 (decoders: h264 h264_qsv h264_cuvid) (encoders
	ibx264 libx264rgb h264_amf h264_mf h264_nvenc h264_qsv h264_vaapi h264_vulkan)
	 DEV.L. hevc                 H.265 / HEVC (High Efficiency Video Coding) (decoders: hevc hevc_qsv hevc_cuvid) (encode
	 libx265 hevc_amf hevc_d3d12va hevc_mf hevc_nvenc hevc_qsv hevc_vaapi hevc_vulkan)
	 DEVIL. mjpeg                Motion JPEG (decoders: mjpeg mjpeg_cuvid mjpeg_qsv) (encoders: mjpeg mjpeg_qsv mjpeg_vaa

	 DEV.L. mpeg2video           MPEG-2 video (decoders: mpeg2video mpegvideo mpeg2_qsv mpeg2_cuvid) (encoders: mpeg2vide
	peg2_qsv mpeg2_vaapi)
	 D.V.L. vc1                  SMPTE VC-1 (decoders: vc1 vc1_qsv vc1_cuvid)
	 DEV.L. vp8                  On2 VP8 (decoders: vp8 libvpx vp8_cuvid vp8_qsv) (encoders: libvpx vp8_vaapi)
	 DEV.L. vp9                  Google VP9 (decoders: vp9 libvpx-vp9 vp9_cuvid vp9_qsv) (encoders: libvpx-vp9 vp9_vaapi
	_qsv)
	 DEV.L. vvc                  H.266 / VVC (Versatile Video Coding) (decoders: vvc vvc_qsv) (encoders: libvvenc)
    ```

**If you are on macOS:**

*   Find VideoToolbox-related codecs:
    ```bash
    # macOS
    ffmpeg -codecs | grep videotoolbox
    ```

## 3. Comprehensive Example: A Complete Check Process

Let's say you have an NVIDIA GPU and want to convert a video from HEVC (H.265) format to H.264 format using hardware acceleration.

### **1. Check if HEVC can be hardware-decoded:**

Run `ffmpeg -decoders | grep cuvid`. If you see `hevc_cuvid` in the results, it's supported.

```
V..... hevc_cuvid           Nvidia CUVID HEVC decoder (codec hevc)
```

### **2. Check if H.264 can be hardware-encoded:**

Run `ffmpeg -encoders | grep nvenc`. If you see `h264_nvenc` in the results, it's supported.

```
V..... h264_nvenc           NVIDIA NVENC H.264 encoder (codec h264)
```

### **3. Use Hardware Acceleration**

Since the checks show support, you can confidently use them in your FFmpeg command. A typical command would look like this:

```bash
# -hwaccel cuvid               # Globally enable cuvid hardware decoding acceleration
# -c:v hevc_cuvid              # Specify the hevc_cuvid decoder for the input video
# -c:v h264_nvenc              # Specify the h264_nvenc encoder for the output video
# -c:a copy                    # Copy audio stream directly, no re-encoding

ffmpeg -hwaccel cuvid -c:v hevc_cuvid -i input.mkv -c:v h264_nvenc -c:a copy output.mp4
```

Using these simple commands, you can get a comprehensive understanding of your FFmpeg's capabilities on your computer and write more efficient video processing commands.