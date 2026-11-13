---
title: Solution to the `incompatible constructor arguments ctranslate2` Error After Upgrading Code
date: 2025-08-02 12:33:00
description: init() incompatible constructor arguments. The following argument types are supported  ctranslate2._ext. This is an issue that occurs when using the pyvideotrans software, typically after installing from source code and pulling the latest code from GitHub.

---

```
__init__(): incompatible constructor arguments. The following argument types are supported: 1. ctranslate2._ext.Whisper

```
![](https://pvtr2.pyvideotrans.com/1754147943486_image.png)


This is an issue that occurs when using the pyvideotrans software, typically after installing from source code and pulling the latest code from GitHub.

## Problem Analysis

The error message is:
`__init__(): incompatible constructor arguments. The following argument types are supported: 1. ctranslate2._ext.Whisper`

**Interpretation:**
Simply put, the code is incompatible with a certain version of the `ctranslate2` library.

**Most Common Causes:**

1.  **Version Mismatch**: The code uses the latest `faster-whisper` code, which is inconsistent with the version actually installed in your environment. Related dependencies need to be updated.
2.  **Outdated or Incomplete Model Files**: The corresponding model in the `models` folder needs to be deleted.

---

## Solutions

Please try the following steps one by one. Usually, the first or second step will solve the problem.

### Solution 1: Update Core Dependencies

This is the most likely solution. Navigate to the project directory, activate the virtual environment you created during installation, and then execute the following command:

**Update `faster-whisper`**

`pip install --upgrade faster-whisper `     or  `pip3 install --upgrade faster-whisper `


**Recommendation**: After updating, **completely close the program, then restart it**, and try again.

### Solution 2: Delete Old Models and Let the Program Re-download

If the problem persists after updating the library, the model files themselves might be the issue.

1.  In the `models` folder under the program's root directory, delete the model or model folder you are using.
2.  Restart the program and select that model. The program will automatically re-download and convert the model, ensuring the format is compatible with your currently installed latest library.

### Solution 3: Check the CUDA Environment (If Solutions 1 & 2 Don't Work)

1.  **Try unchecking "Enable CUDA?"** and run in CPU mode. If this works, the issue lies with the GPU-related part.
2.  If you confirm it's a GPU issue, ensure your NVIDIA driver and CUDA Toolkit versions are compatible with the versions supported by `ctranslate2`. Usually, updating `ctranslate2` (as in Solution 1) will install a version that supports your current CUDA environment.

### Solution 4: Reinstall

If none of the above methods work, your environment configuration might be very messy. The most thorough solution is:

`pip install --force-reinstall  -r requirements.txt`