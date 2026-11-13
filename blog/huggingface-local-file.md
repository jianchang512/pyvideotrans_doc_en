---
title: Cannot find an appropriate cached snapshot folder error? One article to completely solve Hugging Face download difficulties
date: 2025-07-01 14:33:00
description: One article to completely solve Hugging Face download difficulties Cannot find an appropriate cached snapshot folder for the specified revision on the local disk and outgoing traffic has been disabled. To enable repo look-ups and downloads online
---


# Cannot find an appropriate cached snapshot folder error? One article to completely solve Hugging Face download difficulties

As an AI developer, when you eagerly write `from_pretrained`, the last thing you want to see is a line of glaring red error text. And the following error is one that many friends using Hugging Face have likely encountered:

```
err[msg]=Cannot find an appropriate cached snapshot folder for the specified revision on the local disk and outgoing traffic has been disabled. To enable repo look-ups and downloads online, pass 'local_files_only=False' as input.
```

Don't worry, this is usually not a major problem. But it often marks the beginning of a "chain of problems," especially for developers located in mainland China. This article will guide you to thoroughly understand and solve this error from its root cause, and provide best practices tailored for the network environment in China, allowing you and your team to bid farewell to model download frustrations.

## Step 1: Interpret and solve the `local_files_only` error

This error message is actually very straightforward. We can break it down into two parts to understand:

1.  **“Cannot find an appropriate cached snapshot folder... on the local disk”**: The program could not find the model files it needs in your computer's local cache directory.
2.  **“and outgoing traffic has been disabled”**: At the same time, the code's setting (`local_files_only=True`) has disabled its ability to go online to download these files from the Hugging Face Hub.

**In simple terms, it means: "I can't find what I need locally, but you won't let me go online to get it, so I have to throw an error."**

### How to solve it?

The error message itself provides the answer: **Allow the program to download from the internet.**

You just need to explicitly set the parameter `local_files_only=False` in the function that loads the model or tokenizer.

**Example of problematic code:**
```python
from transformers import AutoModel

# This setting disables network downloads; if there's no local cache, it will error.
model = AutoModel.from_pretrained("google-bert/bert-base-cased", local_files_only=True)
```

**Corrected code after fixing:**
```python
from transformers import AutoModel

# Set to False, allowing the program to automatically download from the internet when a local cache is not found.
model = AutoModel.from_pretrained("google-bert/bert-base-cased", local_files_only=False)
```
> **Note**: In many newer versions of the `transformers` library, the default value for `local_files_only` is already `False`. If you encounter this error, it means your code or environment has explicitly set it to `True`.

After solving this problem, you might breathe a sigh of relief and run the code again. But soon, a new issue may follow—the program gets stuck on `Downloading`... and eventually ends with a `Connection Timeout`.

## Step 2: Solving network challenges in China—timeouts and connection failures

This is because Hugging Face's servers are located abroad, and due to well-known reasons, they cannot be accessed directly from mainland China.

Fortunately, we have very mature and simple solutions. **Using a domestic mirror source is highly recommended.**

### Best Solution: Use a domestic mirror (hf-mirror.com)

The community-driven mirror `hf-mirror.com` is currently the most recommended, stable, and reliable Hugging Face mirror. You don't need to modify any Python code; just set one environment variable.

The `huggingface_hub` library will automatically recognize this environment variable named `HF_ENDPOINT` and redirect all download requests to this domestic mirror address, enabling fast and stable downloads.

**How to set it up:**

**Before** running your Python program, execute the following command in your terminal:

*   **Linux / macOS users:**
    ```bash
    export HF_ENDPOINT=https://hf-mirror.com
    ```

*   **Windows (CMD) users:**
    ```cmd
    set HF_ENDPOINT=https://hf-mirror.com
    ```

*   **Windows (PowerShell) users:**
    ```powershell
    $env:HF_ENDPOINT = "https://hf-mirror.com"
    ```
* **Setting within Python code:**
  ```python
  import os
  os.environ['HF_ENDPOINT']='https://hf-mirror.com'
  ```

After setting this up, you can run your previous Python script normally, and the download speed will improve dramatically.

### Alternative Solution: Set up a network proxy

If you already have a stable and reliable tool for accessing the internet, you can also solve the problem by setting proxy environment variables. Assuming your proxy is on the local machine `127.0.0.1` and the port is `7890`:

*   **Linux / macOS:**
    ```bash
    export HTTP_PROXY=http://127.0.0.1:7890
    export HTTPS_PROXY=http://127.0.0.1:7890
    ```
*   **Windows (CMD):**
    ```cmd
    set HTTP_PROXY=http://127.0.0.1:7890
    set HTTPS_PROXY=http://127.0.0.1:7890
    ```

Although this method works, for solving Hugging Face download issues specifically, **using the mirror source (HF_ENDPOINT) is a more recommended, stable, and focused solution.**

## One-stop solution

Next time you encounter the `Cannot find an appropriate cached snapshot folder` error, or any network-related Hugging Face download issues, please follow these two steps to solve them once and for all:

1.  **Check your code**: Ensure you have not mistakenly set `local_files_only=True` in the `from_pretrained` function. If internet access is needed, remove that parameter or set it to `local_files_only=False`.

2.  **Configure your environment (Essential for users in China)**: Set the environment variable `HF_ENDPOINT` in your terminal or system.
    ```bash
    export HF_ENDPOINT=https://hf-mirror.com
    ```