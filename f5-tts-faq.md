---
title: F5-TTS API Call Common Errors
date: 2024-01-22 14:33:00
description: After deploying the F5-TTS project from source code, you may encounter some errors when calling the API. Common errors are listed below.
---

After deploying the F5-TTS project from source code, you may encounter some errors when calling the API. Common errors are listed below.

1. Error: `Could not fetch config for http://127.0.0.1:7860/`

Answer: Possible reasons are as follows:
- F5-TTS is not started.
- The port number is incorrect.
- The port is occupied by another program. AI project interfaces often use Gradio, and the default port is usually 7860.
- You need to disable `share`. Use the startup command `f5-tts_infer-gradio --api`, removing `--share`.
- Upgrade the `gradio_client` on the calling end to the latest version by executing `pip install --upgrade gradio_client`.

2. Error: `{detail:not found}`

Answer: Possible reasons:
- The `gradio_client` version on the calling end is too old. Please update it with `pip install --upgrade gradio_client`.
- The port number is incorrect, or the port belongs to another project.

3. Frequent occurrence of errors like this:
```
    raise ConnectTimeout(e, request=request)
requests.exceptions.ConnectTimeout: (MaxRetryError("HTTPSConnectionPool(host='huggingface.co', port=443): Max retries exceeded with url: /SWivid/F5-TTS/resolve/main/F5TTS_v1_Base/vocab.txt (Caused by ConnectTimeoutError(<urllib3.connection.HTTPSConnection object at 0x000002174796DF60>, 'Connection to huggingface.co timed out. (connect timeout=10)'))"), '(Request ID: 0458b571-90ab-4edd-ae59-b93bd603cdd0)')
```
This is a network issue. Please use a VPN (scientific internet access) and ensure you have a stable connection.