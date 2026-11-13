---
title: Whisper.NET Speech Recognition Service Setup Guide
date: 2026-01-21 08:33:00
description: Whisper.NET is a speech recognition engine that enables AMD GPU acceleration via Vulkan (no NVIDIA CUDA required).
---

This feature and documentation were contributed by [GitHub phoenixlyq](https://github.com/phoenixlyq).

> **Pre-installation:**
>
> [Download .NET Runtime (choose latest .NET 8 or .NET 9)](https://dotnet.microsoft.com/download/dotnet)
>
> [VC++ Redistributable (Microsoft official)](https://aka.ms/vs/17/release/vc_redist.x64.exe)
>
> After installing both, **restart your computer** before running the software.

**Note: The Windows pre-packaged version does NOT include the dependencies for this service. To use it, deploy from source and follow the instructions below.**
**Complex environment issues may arise. If errors persist after following the instructions, consider switching to faster-whisper.**

## What is This?

Whisper.NET is a speech recognition engine that enables AMD GPU acceleration via Vulkan (no NVIDIA CUDA required).

## Use Case

Designed for **Windows + AMD GPU** users.

**Background**: The latest version of Whisper.cpp no longer provides AMD GPU support on Windows, meaning Windows + AMD GPU users can only use CPU for speech recognition — very slow. After consulting with AI, we chose the Whisper.NET approach.

**Tested Environment**: Currently tested on **Windows 11 23H2 + RX 6650 XT**. Other environments may require testing. Feedback is welcome.

---

## Step 1: Download DLL Files

### Required Files

**Managed DLLs** (place in `deps/` folder):

> Open the download page, click "Download package" in the right sidebar to download a `.nupkg` file. Rename the extension to `.zip` and extract. Find the DLL files in the extracted folder or `lib/` subfolder (netstandard2.0 / netstandard8.0 / netstandard462). Copy them to `deps/` in the sp.exe/sp.py folder (create `deps` if needed).

| File | Version | Download Link |
|------|---------|---------------|
| Whisper.net.dll | 1.9.0 | [Download](https://www.nuget.org/packages/Whisper.net/1.9.0) |
| Microsoft.Extensions.AI.Abstractions.dll | 10.0.0 | [Download](https://www.nuget.org/packages/Microsoft.Extensions.AI.Abstractions/10.0.0) |
| Microsoft.Bcl.AsyncInterfaces.dll | 10.0.0 | [Download](https://www.nuget.org/packages/Microsoft.Bcl.AsyncInterfaces/10.0.0) |
| System.Memory.dll | 4.6.3 | [Download](https://www.nuget.org/packages/System.Memory/4.6.3) |
| System.Buffers.dll | 4.6.1 | [Download](https://www.nuget.org/packages/System.Buffers/4.6.1) |
| System.Runtime.CompilerServices.Unsafe.dll | 6.1.2 | [Download](https://www.nuget.org/packages/System.Runtime.CompilerServices.Unsafe/6.1.2) |
| System.Numerics.Vectors.dll | 4.6.1 | [Download](https://www.nuget.org/packages/System.Numerics.Vectors/4.6.1) |

**Native DLLs** (place in `deps/native/` folder):

Open [Whisper.net.Runtime.Vulkan 1.9.0](https://www.nuget.org/packages/Whisper.net.Runtime.Vulkan/1.9.0), click "Download package", rename `.nupkg` to `.zip`, extract, and copy **all DLL files** from `build/win-x64/` to `deps/native/`.

The NuGet package contains these files (all required, rename aliases after copying):

| File | Size | Purpose |
|------|------|---------|
| whisper.dll | 473KB | Speech recognition core |
| libwhisper.dll | 473KB | Copy and rename whisper.dll → libwhisper.dll (alias, required) |
| ggml-whisper.dll | 66KB | Compute library |
| libggml-whisper.dll | 66KB | Rename ggml-whisper.dll → libggml-whisper.dll (alias) |
| ggml-base-whisper.dll | 528KB | Base library (required dependency) |
| libggml-base-whisper.dll | 528KB | Rename ggml-base-whisper.dll → libggml-base-whisper.dll (alias) |
| ggml-cpu-whisper.dll | 590KB | CPU backend |
| libggml-cpu-whisper.dll | 590KB | Rename ggml-cpu-whisper.dll → libggml-cpu-whisper.dll (alias) |
| ggml-vulkan-whisper.dll | 45MB | GPU acceleration (Vulkan) |
| libggml-vulkan-whisper.dll | 45MB | Rename ggml-vulkan-whisper.dll → libggml-vulkan-whisper.dll (alias) |

---

## Step 2: Download Speech Model

Download `.bin` format model files from [ggerganov/whisper.cpp models](https://huggingface.co/ggerganov/whisper.cpp/tree/main) and place them in the `models/` folder.

Recommended: `ggml-large-v3-turbo.bin` (good quality, fast)

---

## Step 3: Verify File Structure

Ensure your directory structure looks like this:

```
pyvideotrans/
├─ models/
│  └─ ggml-large-v3-turbo.bin    ← Speech model
└─ deps/
   ├─ Whisper.net.dll            ← Managed DLLs (7 files)
   ├─ Microsoft.Extensions.AI.Abstractions.dll
   ├─ Microsoft.Bcl.AsyncInterfaces.dll
   ├─ System.Memory.dll
   ├─ System.Buffers.dll
   ├─ System.Runtime.CompilerServices.Unsafe.dll
   ├─ System.Numerics.Vectors.dll
   └─ native/                     ← All DLLs from build/win-x64/
      ├─ whisper.dll
      ├─ libwhisper.dll
      ├─ ggml-whisper.dll
      ├─ libggml-whisper.dll
      ├─ ggml-base-whisper.dll
      ├─ libggml-base-whisper.dll
      ├─ ggml-cpu-whisper.dll
      ├─ libggml-cpu-whisper.dll
      ├─ ggml-vulkan-whisper.dll
      └─ libggml-vulkan-whisper.dll
```

---

## Step 4: Start Using

0. Deploy from source, run `uv sync --all-extras`. If already installed, run `uv sync --extra dotnet` to install the `pythonnet` module.
1. Run `uv run sp.py` to open the software.
2. Select **"Whisper.NET"** from the speech recognition dropdown.
3. Choose your downloaded model file.
4. Click Start.

---

## Troubleshooting

### "Native Library not found" or error code `0x8007007E`

- Check that `deps/native/` folder contains all 10 DLL files.
- Verify file names are correct.

### GPU acceleration not working

- Update your graphics driver.
- AMD GPUs require Vulkan support (RX 400 series or newer).
- NVIDIA GPUs require GTX 600 series or newer.

### pythonnet initialization failed

- Install [.NET Runtime](https://dotnet.microsoft.com/download/dotnet) (choose the latest .NET 8 or .NET 9).

### Check if your GPU supports Vulkan

Open command line and run:
```
vulkaninfo
```
If it displays your GPU information, Vulkan is supported.

---

# Whisper.NET Setup Guide

## What is this?

Whisper.NET is a speech recognition engine that uses Vulkan acceleration for AMD GPUs (no NVIDIA CUDA required).

## Use Case

Designed for **Windows + AMD GPU** users.

**Background**: The latest Whisper.cpp version no longer provides AMD GPU support on Windows, so Windows + AMD GPU users can only use CPU for speech recognition, which is very slow. After consulting and discussing with AI, I chose the Whisper.NET approach and implemented it with AI assistance.

**Tested Environment**: Currently only tested on **Windows 11 23H2 + RX 6650 XT**. Other environments may need further testing. Feedback is welcome.

---

## Step 1: Download DLL Files

### Required Files

**Managed DLLs** (place in `deps/` folder):

| File | Version | Download Link |
|------|---------|---------------|
| Whisper.net.dll | 1.9.0 | [Download](https://www.nuget.org/packages/Whisper.net/1.9.0) |
| Microsoft.Extensions.AI.Abstractions.dll | 10.0.0 | [Download](https://www.nuget.org/packages/Microsoft.Extensions.AI.Abstractions/10.0.0) |
| Microsoft.Bcl.AsyncInterfaces.dll | 10.0.0 | [Download](https://www.nuget.org/packages/Microsoft.Bcl.AsyncInterfaces/10.0.0) |
| System.Memory.dll | 4.6.3 | [Download](https://www.nuget.org/packages/System.Memory/4.6.3) |
| System.Buffers.dll | 4.6.1 | [Download](https://www.nuget.org/packages/System.Buffers/4.6.1) |
| System.Runtime.CompilerServices.Unsafe.dll | 6.1.2 | [Download](https://www.nuget.org/packages/System.Runtime.CompilerServices.Unsafe/6.1.2) |
| System.Numerics.Vectors.dll | 4.6.1 | [Download](https://www.nuget.org/packages/System.Numerics.Vectors/4.6.1) |

**Native DLLs** (place in `deps/native/` folder):

Download from [Whisper.net.Runtime.Vulkan 1.9.0](https://www.nuget.org/packages/Whisper.net.Runtime.Vulkan/1.9.0), extract and copy **all DLL files** from `build/win-x64/` to `deps/native/`.

The NuGet package contains these files (all required):

| File | Size | Purpose |
|------|------|---------|
| whisper.dll | 473KB | Speech recognition core |
| libwhisper.dll | 473KB | Alias for whisper.dll (required) |
| ggml-whisper.dll | 66KB | Compute library |
| libggml-whisper.dll | 66KB | Alias for ggml-whisper.dll |
| ggml-base-whisper.dll | 528KB | Base library (required dependency) |
| libggml-base-whisper.dll | 528KB | Alias for ggml-base-whisper.dll |
| ggml-cpu-whisper.dll | 590KB | CPU backend |
| libggml-cpu-whisper.dll | 590KB | Alias for ggml-cpu-whisper.dll |
| ggml-vulkan-whisper.dll | 45MB | GPU acceleration (Vulkan) |
| libggml-vulkan-whisper.dll | 45MB | Alias for ggml-vulkan-whisper.dll |

### How to download from NuGet?

1. Click the download link above to open the NuGet page.
2. Click **"Download package"** to download the `.nupkg` file.
3. Rename the `.nupkg` extension to `.zip` and open with any archive tool.
4. Find the DLL files inside:
   - Managed DLLs are in `lib/netstandard2.0/` folder.
   - Native DLLs are in `build/win-x64/` folder.

---

## Step 2: Download Speech Model

Download `.bin` format model files from [ggerganov/whisper.cpp models](https://github.com/ggerganov/whisper.cpp/tree/master/models) and place them in the `models/` folder.

Recommended: `ggml-large-v3-turbo.bin` (good quality, fast)

---

## Step 3: Verify File Structure

Make sure your directory structure looks like this:

```
pyvideotrans/
├─ models/
│  └─ ggml-large-v3-turbo.bin    ← Speech model
└─ deps/
   ├─ Whisper.net.dll            ← Managed DLLs (7 files)
   ├─ Microsoft.Extensions.AI.Abstractions.dll
   ├─ Microsoft.Bcl.AsyncInterfaces.dll
   ├─ System.Memory.dll
   ├─ System.Buffers.dll
   ├─ System.Runtime.CompilerServices.Unsafe.dll
   ├─ System.Numerics.Vectors.dll
   └─ native/                     ← Copy all DLLs from build/win-x64/ here
      ├─ whisper.dll
      ├─ libwhisper.dll
      ├─ ggml-whisper.dll
      ├─ libggml-whisper.dll
      ├─ ggml-base-whisper.dll
      ├─ libggml-base-whisper.dll
      ├─ ggml-cpu-whisper.dll
      ├─ libggml-cpu-whisper.dll
      ├─ ggml-vulkan-whisper.dll
      └─ libggml-vulkan-whisper.dll
```

---

## Step 4: Start Using

1. Open pyVideoTrans.
2. Select **"Whisper.NET"** from the speech recognition dropdown.
3. Choose your downloaded model file.
4. Click Start.

---

## Troubleshooting

### "Native Library not found" or error code `0x8007007E`

- Check if `deps/native/` folder contains all 10 DLL files.
- Verify file names are correct.

### GPU acceleration not working

- Update your graphics driver.
- AMD GPUs require Vulkan support (RX 400 series or newer).
- NVIDIA GPUs require GTX 600 series or newer.

### pythonnet initialization failed

- Install [.NET Runtime](https://dotnet.microsoft.com/download/dotnet) (choose the latest .NET 8 or .NET 9).

### Check if your GPU supports Vulkan

Open command line and run:
```
vulkaninfo
```
If it displays your GPU information, Vulkan is supported.
