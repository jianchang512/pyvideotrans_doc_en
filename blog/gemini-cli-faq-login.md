---
title: The Complete Guide to Gemini CLI Say Goodbye to Claude Code, Solve Network and Login Issues
date: 2025-06-28 15:40:00
description: This article serves as a comprehensive guide to help you fully understand `gemini-cli`, focusing on solving network, login, and configuration problems that Chinese users may encounter during installation and use. Compared to Anthropic's Claude Code, `gemini-cli` might be the better choice for you.
---

Recently, Google launched its open-source AI terminal agent tool—`gemini-cli`. This tool brings the powerful Gemini 2.5 Pro model directly to developers' command lines.

This article serves as a comprehensive guide to help you fully understand `gemini-cli`, focusing on solving network, login, and configuration problems that Chinese users may encounter during installation and use.

## Gemini CLI vs. Claude Code: Why is it More Suitable for Chinese Users?

Before `gemini-cli` appeared, Claude Code was the go-to AI assistant in the terminal for many developers. However, for Chinese users, the experience with Claude Code has always had some hard-to-ignore obstacles.

The emergence of `gemini-cli` has fundamentally changed this situation. It not only matches Claude Code in features and performance but even shows significant advantages in several key areas:

*   **More Friendly to Chinese Users**: The most crucial point is that due to the extremely anti-China stance of the CEO of Claude's parent company, Claude Code imposes many restrictions on network access and account registration for the China region. Especially when using Chinese for conversation, there is a high risk of account suspension, sometimes even immediately after registration and payment.
*   **Free and Generous Pro Model Access**: By logging in with a Google personal account, users get free access to a generous daily quota of up to 1000 requests to the Gemini 2.5 Pro model. In contrast, Claude Code's high-performance models usually require a paid subscription.

For Chinese developers seeking efficiency, stability, and freedom from regional restrictions, `gemini-cli` is undoubtedly the more attractive choice right now.

## Installation and Startup

Before starting, please ensure your computer has `Node.js` installed (version v20+ is recommended).

You can quickly start it using the `npx` command without global installation, which is also the officially recommended way to test:
```bash
npx https://github.com/google-gemini/gemini-cli
```
Alternatively, you can choose to install it globally:
```bash
npm install -g @google/gemini-cli

gemini
```
On first startup, `gemini-cli` will guide you to choose a theme color and authentication method. **Choose to log in with a Google account, not an API key.** The reason is explained later.

## Core "Troubleshooting" Guide: Solving Common Errors and Issues

The following section compiles the most common issues users encounter when using `gemini-cli` and provides detailed, verified solutions.

### Issue 1: Login Failure or Interruption Due to Network Problems

**Symptoms**: After running the `gemini` command, it gets stuck on `Waiting for auth...` for a long time, or the terminal automatically exits without any prompt after completing Google authorization in the browser. Using debug mode (`gemini -d`) might show `ETIMEDOUT` (connection timeout) errors.

**Root Cause**: This is a typical network problem. Due to well-known reasons, direct access to Google services fails. `gemini-cli` does not read the system's global proxy settings by default and needs to have a proxy configured separately for its terminal session.

**Solutions**:

1.  **Enable TUN Mode in Your Proxy Tool**: This is one of the most direct and effective methods. TUN mode can take over the system's network traffic, ensuring terminal network requests also go through the proxy. Many Chinese users have shared that enabling this mode resolved their login issues.

2.  **Set a Temporary Proxy in the Terminal**: If your proxy tool doesn't support TUN mode, or you don't want to enable a global proxy, you can set environment variables for the current session in the terminal.

    *   **Windows (PowerShell)**:
        ```PowerShell
        $env:HTTP_PROXY="http://127.0.0.1:port"
        $env:HTTPS_PROXY="http://127.0.0.1:port"
        ```
        *Replace "port" with the actual HTTP proxy port of your proxy software.*

    *   **macOS / Linux (Bash/Zsh)**:
        ```bash
        export HTTPS_PROXY="http://127.0.0.1:port"
        ```

    After setting this up, run `gemini` again in the same terminal window to proceed with the login authorization normally.

### Issue 2: Google Login Errors (Workspace Account or Missing Project Configuration)

**Symptoms**:
*   **Error A (Workspace)**: `Failed to login. Ensure your Google account is not a Workspace account...`
*   **Error B (Missing Environment Variable)**: `GOOGLE_CLOUD_PROJECT environment variable not found.`

**Root Cause**: These two errors are often related. When logging in with a Google account (whether personal or Workspace), `gemini-cli` needs to associate a Google Cloud project for quota management and API calls.

**Solutions**:

1.  **Log in to Google Cloud Console and Create a Project**:
    *   Visit the [Google Cloud Console](https://console.cloud.google.com/).
    *   If you don't have any projects, the system usually automatically creates one named `My First Project` for you. You can also create a new project yourself.

2.  **Get the Project ID and Set the Environment Variable**:
    *   In the project selector at the top of the console, find your project and copy its **ID** (usually a string containing letters and numbers).
    *   Set the `GOOGLE_CLOUD_PROJECT` environment variable in the terminal.
        *   **Windows (PowerShell)**:
            ```PowerShell
            $env:GOOGLE_CLOUD_PROJECT="your-project-id"
            ```
        *   **macOS / Linux (Bash/Zsh)**:
            ```bash
            export GOOGLE_CLOUD_PROJECT="your-project-id"
            ```

3.  **Enable the Relevant API Service**: This is a crucial step; otherwise, you will encounter permission denied (403) errors.
    *   In the Google Cloud Console search bar, search for "Gemini".
    *   Find and enable the **Gemini for Google Cloud API** (it might also be called **Cloud AI Companion API**). Some tutorials recommend enabling all three related APIs found in the search to be safe.

4.  **Log in Again**:
    *   After completing the above steps, restart `gemini-cli`.
    *   If you encounter the Workspace account error, you can try entering the `/auth` command in `gemini-cli` and manually selecting the "Login with Google Workspace" option to log in.

## Key Tips and "Major Pitfall" Reminders

**Authentication Method Determines Available Models and Costs**:

This is a very critical distinction!
*   **Google Account Login**: This is the correct way to get **free** access to the `Gemini 2.5 Pro` model and the generous daily quota of 1000 requests.
*   **API Key Login**: Using an API Key generated from Google AI Studio will likely downgrade you to the `Gemini 2.5 Flash` model, or cause errors due to lack of Pro permissions. Furthermore, calls using an API Key are **paid** and more prone to 429 (rate limit exceeded) errors.

**Conclusion**: For the vast majority of users, be sure to choose the **Google Account Login** method.

## Practical Tips to Enhance Your Experience

Mastering the following common commands can greatly improve your `gemini-cli` experience:

*   **Session Management**: Save the current conversation anytime to avoid losing progress, especially when the network is unstable.
    *   `/chat save [label]`: Save the current session with a specified label.
    *   `/chat list`: List all saved sessions.
    *   `/chat resume [label]`: Resume a specified session.

*   **Context Management (Memory Function)**:
    *   **GEMINI.md File**: Create a `GEMINI.md` file in your project root directory or in the `~/.gemini/` directory in your user home folder. You can write custom instructions, code style guidelines, project background, etc., in it. `gemini-cli` will automatically load this information as long-term memory during each interaction.
    *   `/memory add [context content]`: Add a piece of content to the current session's memory.
    *   `/memory show`: View the currently loaded memory content.
    *   `/memory refresh`: Reload context from the `GEMINI.md` file.

*   **Statistics**:
    *   `/stats`: View your API call statistics to understand quota usage.