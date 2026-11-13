---
title: Solving Gemini CLI Login Authorization Failure Installation and Troubleshooting Guide
date: 2025-06-26 22:40:00
description: Solving Gemini CLI Login Authorization Failure Installation and Troubleshooting Guide, no sandbox wait auth.. console auto-exit error
---


# Solving Gemini CLI Login Authorization Failure: Installation and Troubleshooting Guide

![](https://pvtr2.pyvideotrans.com/1750947099497_image.png)

Due to network environment restrictions, Google services (including the newly launched Gemini CLI) cannot be directly accessed within China. When using a VPN, login authorization failures or connection timeouts are common issues.

> This article combines my practical experience to detail the complete process of resolving Gemini CLI login authorization failures. It also provides a concise introduction, installation, and usage guide for readers unfamiliar with the tool, helping you get started quickly.

## 1. Introduction to the Gemini CLI Tool

### What is Gemini CLI?
Gemini CLI is an official command-line interface (CLI) tool from Google, similar to `Claude Code`. It allows users to interact directly with the Gemini AI model in the terminal, supporting various functions such as asking questions, assisting with programming, and editing files.

### Tool Advantages
1.  **High Free Quota**: For non-heavy users, its free quota is generally sufficient for daily development and learning needs.
2.  **Powerful Context Understanding**: Supports long conversations and retains context well, ensuring coherent interactions.
3.  **Cross-Platform Compatibility**: Works perfectly on Windows, macOS, and Linux systems, offering great flexibility.
4.  **Strong Community & Debugging Support**: While official documentation is limited, the tool's built-in debug mode (e.g., the `-d` option) effectively helps locate and resolve issues.

### How to Install Gemini CLI?
**1. Prerequisites**
- **Node.js Environment**: Ensure your computer has Node.js installed (recommended v20.x or higher).
- **Network Environment**: Requires access to Google services, typically needing a configured proxy or VPN.

**2. Installation Steps**
- Open a terminal (Windows users can use CMD or PowerShell, macOS/Linux users use Terminal).
- Execute the following command to install Gemini CLI globally:
  ```bash
  npm install -g @google/gemini-cli
  ```
- Verify the installation was successful:
  ```bash
  gemini --version
  ```
  If the terminal returns a version number, the installation was successful.

### Basic Usage
- **Start Interactive Mode**:
  ```bash
  gemini
  ```
  After starting, you will enter an interactive interface where you can directly input questions or commands.

- **Common Options**:
  - `-d` or `--debug`: Enables debug mode, outputting detailed connection and error information. This is a powerful tool for troubleshooting.
  - `--verbose`: Outputs more log information.

- **Exit**: In interactive mode, press the `Esc` key or type `exit` to quit.

## 2. Complete Record of Solving Login Authorization Failure

### Problem Symptoms
When I first used the `gemini` command, I encountered the following issues:
1.  After running `gemini`, the terminal displayed `Waiting for auth... (Press ESC to cancel)` and automatically opened a browser to the Google login page.
2.  After successfully logging in and authorizing in the browser, the page redirected to `localhost:11101`, but the `gemini` process in the terminal automatically exited without any error message.

![](https://pvtr2.pyvideotrans.com/1750947030770_image.png)

To investigate the cause, I used debug mode `gemini -d`, which finally pinpointed the specific error message:

![](https://pvtr2.pyvideotrans.com/1750947064476_image.png)

The error log showed `AggregateError [ETIMEDOUT]`, clearly indicating a timeout when connecting to the Google server (IP address `216.239.32.223`).

### Problem Analysis
Based on the error message and my network environment, the root cause is clear:
1.  **Network Access Restrictions**: Google services are not directly accessible from my region.
2.  **Missing Proxy Settings**: Although I had a system proxy enabled, Gemini CLI does not read system proxy settings by default. This caused it to still attempt a direct connection to Google servers, ultimately failing due to timeout.
3.  **Unstable VPN Connection**: In some cases, even with a proxy set, an unstable VPN connection can cause timeouts during the authentication process.

### Solution Steps

**Step 1: Ensure VPN Stability**
- Check if your proxy or VPN tool is working correctly. It's recommended to switch to a high-quality server node.
- If your proxy tool uses a whitelist or rule mode, ensure Google-related domains (e.g., `*.google.com`) or IP address ranges are included in the proxy scope.

**Step 2: Set Proxy for the Terminal**
This is the most crucial step. You need to set the `https_proxy` environment variable for the current terminal session to direct Gemini CLI's network requests to your local proxy port.

- **Windows (CMD)**:
  ```bash
  set https_proxy=http://127.0.0.1:10808
  ```

- **Windows (PowerShell)**:
  ```bash
  $env:https_proxy="http://127.0.0.1:10808"
  ```
  
- **macOS / Linux (Bash/Zsh)**:
  ```bash
  export https_proxy=http://127.0.0.1:10808
  ```

**Note**: Replace `10808` with the actual HTTP proxy port used by your proxy software.

![](https://pvtr2.pyvideotrans.com/1750946861063_image.png)

**Step 3: Re-run and Verify**
After setting the proxy, run the `gemini` command again. This time, the authorization process should complete successfully, and you will enter the interactive interface.

![](https://pvtr2.pyvideotrans.com/1750946887875_image.png)

### Summary of Experience
- **Prioritize Network Issues**: In restricted network environments, when encountering connection timeouts, first check the stability of your proxy or VPN.
- **Terminal Proxy is Key**: Command-line tools often require manually setting the `https_proxy` environment variable to access the network through a proxy.
- **Make Good Use of Debug Mode**: `gemini -d` is the best helper for solving connection and authentication problems, providing detailed error logs.
- **Use the `ping` Command for Testing**: You can use commands like `ping 216.239.32.223` to directly test network connectivity to the target server.