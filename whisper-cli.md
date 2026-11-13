---
title: Whisper_CPP Speech Recognition Service Integration
date: 2026-01-22 14:33:00
description: Whisper_CPP speech recognition integration guide
---

# Whisper_CPP Speech Recognition Integration

Whisper_CPP is a **C++ high-performance implementation** of the OpenAI Whisper model. Compared to the native Python implementation, it offers faster inference and lower memory usage.

## Supported Models

Whisper_CPP uses GGML format model files (`.bin` extension). Supported models:

| Model File | Parameters | VRAM | Quality | Recommended For |
|------------|-----------|------|---------|-----------------|
| ggml-tiny.bin | 39M | ~1GB | Fair | Quick testing |
| ggml-base.bin | 74M | ~1GB | Good | Everyday simple use |
| ggml-small.bin | 244M | ~2GB | Good | Multi-language recognition |
| ggml-medium.bin | 769M | ~5GB | Very good | High-accuracy recognition |
| ggml-large-v1.bin | 1550M | ~10GB | Good | Large model v1 |
| ggml-large-v2.bin | 1550M | ~10GB | Very good | Large model v2 |
| ggml-large-v3.bin | 1550M | ~10GB | Best | Highest accuracy |
| ggml-large-v3-turbo.bin | 1550M | ~10GB | Balanced speed/quality | **Recommended** |

### Windows

Since v4.08, the Windows version will auto-download the pre-compiled GPU version on first use and extract it to `app_dir/whisper-cpp/`.

To use a different version, open https://github.com/ggml-org/whisper.cpp/releases/tag/v1.9.1, download an archive labeled `Win32` or `x64`, extract it, and copy all files from `Releases/` to `app_dir/whisper-cpp/`.

### macOS or Linux

For these systems, download the corresponding pre-compiled package for your OS. Copy the extracted binaries and dependencies to `app_dir/whisper-cpp/`, and grant executable permission to the `whisper-cli` file.

If no pre-compiled package exists, compile locally according to the repository documentation, then copy the build artifacts and shared libraries (`.so` etc.) to `app_dir/whisper-cpp/`. Ensure the `whisper-cli` executable exists.

## Downloading Model Files

Models are auto-downloaded when needed from:

- **Primary source (outside China)**: [https://huggingface.co/ggerganov/whisper.cpp/tree/main](https://huggingface.co/ggerganov/whisper.cpp/tree/main)
- **Mirror (China)**: [https://hf-mirror.com/ggerganov/whisper.cpp/tree/main](https://hf-mirror.com/ggerganov/whisper.cpp/tree/main)

Place the `.bin` file in `app_dir/models/`.

## Additional Custom Parameters

Create a `pyvideotrans.txt` text file in the pyVideoTrans root directory (same folder as sp.exe) to add custom parameters.

## FAQ

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| whisper-cli.exe won't start | Missing VC++ runtime | Install Microsoft Visual C++ Redistributable |
| Model file not found | Model not downloaded or wrong path | Place `.bin` file in `models/` |
| GPU acceleration not working | CUDA/Vulkan not configured | Install matching CUDA Toolkit version or update GPU driver |
| Very slow recognition | Using CPU version | Download the CUDA-accelerated version and configure correctly |
| Poor recognition results | Model too small or wrong language | Use a larger model, verify language setting |
| Chinese path errors | Path contains Chinese characters | Extract pyVideoTrans to a path without Chinese characters |
