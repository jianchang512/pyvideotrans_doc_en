---
title: Two Errors I Encountered When Installing Python Packages and How to Fix Them - No module named docopt, gbk codec can't decode
date: 2025-07-27 18:33:00
description: Easily transcribe audio/video of Eastern languages (dialects and minority languages) into subtitles - Dolphin Integration Package
---



## Two Errors I Encountered When Installing Python Packages and How to Fix Them

Recently, while configuring an NVIDIA open-source project called Parakeet, I needed to install quite a few Python dependency packages. The process wasn't overly complex, but I ran into two interesting errors along the way. The issues themselves aren't difficult, but if you encounter them for the first time, you might get stuck for a while.

Here, I'm sharing my troubleshooting process, hoping it helps friends facing similar problems.

## The First Problem: `ModuleNotFoundError: No module named 'docopt'`

When I ran `pip install -r requirements.txt`, the installation process stopped on a package called `docopt`. The error message was clear:

```
ModuleNotFoundError: No module named 'docopt'
```

The strange thing was, I was trying to install `docopt`, but it told me the `docopt` module couldn't be found.

After carefully looking at the full error log, I found the problem was in the package's `setup.py` installation script. This script was trying to `import docopt` *before* performing the installation. This created a "chicken or the egg" problem: I wanted to install it, but its installation script required it to already be installed.

This is actually an issue with how this particular package was packaged, not a fault of pip.

The solution is simple. Since it needs a `docopt` module file to proceed, we just give it one manually.

1.  Search directly in your browser for `docopt.py`.
2.  In the search results, you can usually find the source code for this file on GitHub or other code hosting platforms.
3.  Download this `docopt.py` file and place it directly in the root directory of my Parakeet project.
4.  Then, go back to the command line and re-run the previous `pip install` command.

This time, when the installation script needed the `docopt` module, it found the `docopt.py` file in the current directory. Problem solved, installation continued.

## The Second Problem: `UnicodeDecodeError: 'gbk' codec can't decode...`

After solving the first problem, I continued the installation. Unexpectedly, I soon encountered the second hurdle. This time it was while installing the `indic_numtowords` package.

The error message was like this:

```
UnicodeDecodeError: 'gbk' codec can't decode byte 0xae in position 268: illegal multibyte sequence
```

This is a very typical encoding error.

The reason for the problem is that on Windows systems, the default text encoding is GBK. The installation script for the `indic_numtowords` package was reading a file (like `README.md`) without specifying which encoding to use. Therefore, the system defaulted to using GBK to read it. However, this file was likely saved using UTF-8 encoding.

This is like asking someone who only understands Chinese to read an English article; they'll encounter unrecognized characters and naturally run into an error.

To solve this, we need to tell Python to uniformly use UTF-8 encoding for reading and writing files during this installation.

The method is straightforward: set a temporary environment variable before executing the installation command.

1.  Open your command-line tool (CMD or PowerShell).
2.  Enter the following command and press Enter. This command is only effective in the current window and will be gone when you close it, so it's safe.

    **If you are using CMD:**
    ```shell
    set PYTHONUTF8=1
    ```

    **If you are using PowerShell:**
    ```shell
    $env:PYTHONUTF8=1
    ```

3.  **In the same window**, re-run `pip install indic_numtowords`.

After execution, the installation went through smoothly. Because Python, under the instruction of this environment variable, used the correct UTF-8 encoding to read the files, and no more garbled characters or errors appeared.

Both of these problems are not directly related to the `pip` tool itself, but rather to how the packages being installed are written. I hope my experience can save you some time troubleshooting.