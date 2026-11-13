---
title: Fixing FunASR Deployment Two Key Patches for Offline Loading and GUI Integration
date: 2025-06-21 01:33:00
description: Fixing FunASR Deployment Two Key Patches for Offline Loading and GUI Integration
---

In today's AI application development, high-quality Automatic Speech Recognition (ASR) technology is a core competitive advantage for many products. Especially for Chinese language scenarios, the FunASR project, open-sourced by Alibaba's DAMO Academy, delivers outstanding performance.

**FunASR** is not a single model but a comprehensive foundational speech recognition toolkit. It integrates powerful features such as speech recognition (paraformer-zh/sensevoicesmall) and Voice Activity Detection (VAD).

When using models like `paraformer-zh` and `sensevoicesmall`, you rely on the `funasr` and `modelscope` libraries. While the models themselves are powerful, I encountered a particularly tricky and misleading issue when deploying in offline environments or scenarios requiring stable deployment.

## The Core Problem: Why Does the `local_files_only` Parameter "Fail" in Offline Deployment?

To achieve true offline usage, we naturally think of using the official `local_files_only=True` parameter. Its intended purpose is to tell the program, "Use only the locally cached model, do not attempt to access the network."

However, in practice, even when setting all conceivable "offline" parameters as shown below, the program still attempts to connect to the server in a network-less environment, ultimately leading to failure.

```python
# The ideal way to call
AutoModel(
    model=model_name,
    # ... other model parameters ...
    hub='ms',
    local_files_only=True, # Hoping this parameter would work
    disable_update=True,
)
```

What's more frustrating is that regardless of network timeouts, download failures, or other I/O issues, `funasr` ultimately throws only a generic error: `paraformer-zh is not registered`. This message provides no help in diagnosing the actual root cause—the attempted network connection.

####   Digging Deeper: The Broken Parameter Chain

By tracing the source code, we quickly found the issue. The problem lies not with `modelscope` but with the calling layer in `funasr`. When `funasr` calls `modelscope`'s download function `snapshot_download`, it fails to pass down the crucial `local_files_only` parameter.

 **Evidence Here**: `site-packages/funasr/download/download_model_from_hub.py` (around line 232)

```python
    # funasr's calling code - note the parameter list lacks local_files_only
    model_cache_dir = snapshot_download(
                model, revision=model_revision, user_agent={Invoke.KEY: key, ThirdParty.KEY: "funasr"}
            )
```

The parameter gets "lost" halfway. Without it, the underlying offline logic in `modelscope` cannot be triggered, causing it to proceed with its default behavior of checking for model updates, which fails in an offline environment.

####   The Solution: Bypass the Upstream, Target the Downstream

Since modifying the upstream parameter-passing chain is cumbersome, we can adopt a more direct strategy: modify `modelscope`'s download logic to make it "smarter" and actively prefer the local cache.

**Our Goal: Regardless of how the upstream calls, if a local model cache exists, force its use and skip any network checks.**

**File to Modify**: `site-packages/modelscope/hub/snapshot_download.py`

Inside the `_snapshot_download` function, find the line with `if local_files_only:`. Insert the following patch code **directly above** this conditional block:

```python
    # ... Beginning of the _snapshot_download function ...

    # ==================== Force Use Local Cache Patch ====================
    # First, check if model files already exist in the local cache (typically more than 1 file)
    if len(cache.cached_files) > 1:
        # If found, print an optional message and return the local path directly, aborting all subsequent operations.
        print("Found local model cache, using it directly. To re-download, delete the model folder.")
        return cache.get_root_location()
    else:
        # If no local cache exists, to prevent download failure when upstream incorrectly passes local_files_only=True,
        # force it to False here to ensure the download process can continue.
        local_files_only = False
    # ======================================================================

    # Original conditional logic
    if local_files_only:
        if len(cache.cached_files) == 0:
            raise ValueError(
                'Cannot find the requested files in the cached path and outgoing'
                ' traffic has been disabled. To enable look-ups and downloads'
                " online, set 'local_files_only' to False.")
```
This modification permanently solves the problem. It grants `modelscope` the ability to prioritize local cache, perfectly meeting the needs of offline deployment.

## In Passing: Resolving Conflicts with GUI Libraries like PySide6

When integrating FunASR into a PySide6 GUI application, you might encounter another issue: the model fails to load due to a conflict between `modelscope`'s lazy loading mechanism and PySide6's internal self-inspection behavior.

A simple solution is to modify the `site-packages/modelscope/utils/import_utils.py` file. Add two lines at the beginning of the `__getattr__` method in the `LazyImportModule` class. This makes it directly state "no such attribute" when "interrogated," thus avoiding the triggering issue.

```python
# site-packages/modelscope/utils/import_utils.py
class LazyImportModule(ModuleType):
    def __getattr__(self, name: str) -> Any:
        # ===== Patch =====
        if name == '__wrapped__':
            raise AttributeError
        # =================
        # ... original code ...
```

> For a detailed background and analysis of this issue, you can refer to my other article (link below), which won't be repeated here.
> https://pyvideotrans.com/blog/paraformer-zh-is-not-registered

I hope these two targeted modifications help you successfully deploy FunASR into any required environment.