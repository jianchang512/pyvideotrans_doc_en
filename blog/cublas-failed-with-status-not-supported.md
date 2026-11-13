---
title: How to Fix CUBLAS_STATUS_NOT_SUPPORTED Error for faster-whisper Acceleration on 50-Series GPUs
date: 2025-08-06 14:33:00
description: cuBLAS failed with status CUBLAS_STATUS_NOT_SUPPORTED, process cuBLAS failed with status CUBLAS_STATUS_NOT_SUPPORTED
---

When using tools based on CTranslate2, such as faster-whisper or pyVideotrans, you might encounter an error similar to the following on 50-series GPUs:
```
cuBLAS failed with status CUBLAS_STATUS_NOT_SUPPORTED

err[msg]=_process:cuBLAS failed with status
CUBLAS_STATUS_NOT_SUPPORTED
```

![](https://pvtr2.pyvideotrans.com/1754467355571_image.png)

The reason for this error is a change in the underlying architecture of 50-series GPUs. CTranslate2's default compute type is `auto`, which automatically selects the `int8_float16` data type. This data type cannot be computed on 50-series GPUs. Currently, you can try to resolve this by manually specifying the compute type.

1.  In the command line, you can specify `--compute_type='float16'`.
2.  In the pyVideoTrans software, you can restore functionality by opening **Menu -> Tools -> Advanced Options -> faster/openai Speech Recognition Settings -> CUDA Data Type -> select float16**, then save the settings and restart the software.

![](https://pvtr2.pyvideotrans.com/1754467318216_image.png)