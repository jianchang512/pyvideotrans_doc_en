---
title: Effortlessly Execute Shell Commands in Python From Beginner to Advanced (Windows and Linux Edition)
date: 2025-04-08 15:33:00
description: This article provides a detailed explanation of Python's subprocess module and its core function, subprocess.run, for calling Shell commands from Python. By analyzing common parameters such as args, shell, capture_output, stdout, stderr, text, encoding, errors, input, and check, along with specific examples for Linux and Windows platforms, it covers core scenarios including running simple/complex commands, capturing output/errors, exception handling, calling external programs (e.g., FFmpeg), and inputting data. It emphasizes the differences between shell=True and False, the combination of capture_output and check, and the logging output characteristics of FFmpeg. Finally, it summarizes recommended option combinations for different scenarios, helping readers fully master the subprocess module and improve the flexibility and robustness of command-line calls.
---

# Effortlessly Execute Shell Commands in Python: From Beginner to Advanced (Windows and Linux Edition)

## Let's Talk About Why I Wrote This

If you know a bit about Python 3, you might be aware that `subprocess` is a great tool for running Shell commands. It allows Python to call system commands and is very powerful.

However, it has many options and complex details—pipes, input/output, error handling, encoding issues—which often leave people confused. Many times, we just copy a piece of code that works without understanding why it's written that way or when we should use a different approach.

Today, after revisiting the official documentation, I've relearned `subprocess` thoroughly, aiming to master it comprehensively and understand how to use it and flexibly combine options in various scenarios!

---

## What is `subprocess`, and Why Use It?

`subprocess` is a Python module used to run system commands. For example:
- Running `ls -l` to list directories on Linux;
- Running `dir` to view files on Windows.

Why not use Shell scripts? Python code is clearer, easier to maintain, and can include logical processing. `subprocess.run` (introduced in Python 3.5) is the most convenient function, and today we'll focus on explaining it thoroughly.

---

## Overview of Common Parameters for `subprocess.run`

`subprocess.run` has many parameters. Let's introduce them first, then dive into usage scenarios. This way, you'll get an overall impression and understand what each option does.

| Parameter Name     | Purpose                                      | Common Values                          | Notes                                  |
|--------------------|----------------------------------------------|----------------------------------------|----------------------------------------|
| `args`             | Command to run                               | List (e.g., `["ls", "-l"]`) or string (e.g., `"ls -l"`) | Use list for no Shell, string for `shell=True` |
| `shell`            | Whether to execute via Shell                 | `True` / `False` (default)            | `True` is less efficient; required for Windows built-in commands |
| `capture_output`   | Whether to capture stdout and stderr         | `True` / `False` (default)            | Equivalent to `stdout=PIPE, stderr=PIPE` |
| `stdout`           | Destination for standard output              | `PIPE` / `None` / `STDOUT` / file object | `PIPE` captures, `None` displays to terminal |
| `stderr`           | Destination for error output                 | `PIPE` / `None` / `STDOUT` / file object | `STDOUT` merges into stdout           |
| `text`             | Whether to return strings directly           | `True` / `False` (default)            | `True` requires `encoding`, avoids decoding |
| `encoding`         | Output encoding                              | `"utf-8"` / `"gbk"` etc.              | Recommended `"utf-8"`, note system encoding on Windows |
| `errors`           | Decoding error handling                      | `"strict"` / `"ignore"` / `"replace"` | Only effective when `text=True`       |
| `input`            | Input data for the command                   | String (e.g., `"data"`)               | Use string when `text=True`, otherwise bytes |
| `check`            | Check return code, raise exception on failure | `True` / `False` (default)            | Raises `CalledProcessError`           |

**Return Object** (`cp` or exception `e`):
- `cp.returncode`: Return code (0 for success, non-zero for failure).
- `cp.stdout`: Standard output.
- `cp.stderr`: Error output (or logs, e.g., from FFmpeg).
- `e.stdout` / `e.stderr`: Output and error when an exception occurs.

---

## Core Scenarios and Usage: From Simple to Complex

Let's use these parameters to look at common usage scenarios step by step.

### Scenario 1: Run Simple Commands and Capture Output

#### Linux: Run `echo`
```python
import subprocess

cp = subprocess.run(
    args=["echo", "hello world"],
    capture_output=True,    # Capture stdout and stderr
    text=True,              # Return strings directly
    encoding="utf-8"        # UTF-8 encoding
)
print(cp.stdout)  # Output: hello world
```

#### Windows: Run `dir`
```python
import subprocess

cp = subprocess.run(
    args="dir",
    shell=True,             # Windows built-in commands need Shell
    capture_output=True,
    text=True,
    encoding="utf-8"
)
print(cp.stdout)  # Output: Directory list
```

**Key Points**:
- `capture_output=True` simplifies capturing.
- Use list for Linux, `shell=True` for Windows built-in commands.

#### When to Use?
- Run simple commands and want the result.

---

### Scenario 2: Run Complex Commands (with Pipes `|`)

#### Linux: Run `ls -l | grep file`
```python
import subprocess

cp = subprocess.run(
    args="ls -l | grep file",
    shell=True,
    capture_output=True,
    text=True,
    encoding="utf-8"
)
print(cp.stdout)  # Output: Filtered file list
```

#### Windows: Run `dir | find "txt"`
```python
import subprocess

cp = subprocess.run(
    args='dir | find "txt"',
    shell=True,
    capture_output=True,
    text=True,
    encoding="utf-8"
)
print(cp.stdout)  # Output: Lines containing "txt"
```

**Key Points**:
- `shell=True` supports pipes.

#### When to Use?
- Combine commands to filter output.

---

### Scenario 3: Capture Output and Errors Separately

#### Linux: Run `ls` on a Non-existent File
```python
import subprocess

cp = subprocess.run(
    args=["ls", "nope"],
    stdout=subprocess.PIPE,  # Capture output separately
    stderr=subprocess.PIPE,  # Capture error separately
    text=True,
    encoding="utf-8"
)
print(f"Output: {cp.stdout}")
print(f"Error: {cp.stderr}")  # Output: ls: cannot access 'nope'
```

#### Windows: Run `dir` on a Non-existent File
```python
import subprocess

cp = subprocess.run(
    args="dir nope",
    shell=True,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True,
    encoding="utf-8"
)
print(f"Output: {cp.stdout}")
print(f"Error: {cp.stderr}")  # Output: File not found
```

**Key Points**:
- `stdout=PIPE, stderr=PIPE` captures separately.

#### When to Use?
- Distinguish between output and errors.

---

### Scenario 4: Check Results and Handle Exceptions

#### Linux: Check Return Code vs. Raise Exception
```python
import subprocess

# Method 1: Check return code
cp = subprocess.run(
    args=["ls", "nope"],
    capture_output=True,
    text=True,
    encoding="utf-8"
)
if cp.returncode != 0:
    print(f"Failed! Return code: {cp.returncode}")
    print(f"Error: {cp.stderr}")

# Method 2: Use check=True
try:
    cp = subprocess.run(
        args=["ls", "nope"],
        capture_output=True,
        text=True,
        encoding="utf-8",
        check=True
    )
except subprocess.CalledProcessError as e:
    print(f"Failed! Return code: {e.returncode}")
    print(f"Output: {e.stdout}")
    print(f"Error: {e.stderr}")
```

#### Windows: Similar Handling
```python
import subprocess

try:
    cp = subprocess.run(
        args="dir nope",
        shell=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
        check=True
    )
except subprocess.CalledProcessError as e:
    print(f"Failed! Return code: {e.returncode}")
    print(f"Output: {e.stdout}")
    print(f"Error: {e.stderr}")
```

**Key Points**:
- `capture_output=True` only captures.
- `check=True` raises an exception on failure.

#### When to Use?
- Ensure command success.

---

### Scenario 5: Call External Programs (e.g., FFmpeg)
> Important Note: FFmpeg's normal logs are in stderr, not stdout.

#### Transcode a Video File
Use FFmpeg to convert `input.mp4` to `output.mp3`:

```python
import subprocess

cp = subprocess.run(
    args=["ffmpeg", "-i", "input.mp4", "output.mp3", "-y"],
    capture_output=True,
    text=True,
    encoding="utf-8"
)
if cp.returncode == 0:
    print("Transcoding successful!")
    print(f"Logs: {cp.stderr}")  # FFmpeg normal logs are in stderr
else:
    print(f"Transcoding failed! Return code: {cp.returncode}")
    print(f"Output: {cp.stdout}")
    print(f"Error details: {cp.stderr}")

# Or use check=True
try:
    cp = subprocess.run(
        args=["ffmpeg", "-i", "input.mp4", "output.mp3", "-y"],
        capture_output=True,
        text=True,
        encoding="utf-8",
        check=True
    )
    print("Transcoding successful!")
    print(f"Logs: {cp.stderr}")  # FFmpeg normal logs are in stderr
except subprocess.CalledProcessError as e:
    print(f"Transcoding failed! Return code: {e.returncode}")
    print(f"Output: {e.stdout}")
    print(f"Error details: {e.stderr}")
```

**Key Points**:
- Use a list to call external programs.
- FFmpeg's normal logs are in `stderr`, failure messages are also in `stderr`, `stdout` is usually empty.
- With `check=True`, successful logs use `cp.stderr`, failure details use `e.stderr`.

#### When to Use?
- Handle audio/video, file conversion.

---

### Scenario 6: Input Data to a Command

```python
import subprocess

data = "line1\nline2 py\nline3"
cp = subprocess.run(
    args=["grep", "py"],
    input=data,
    capture_output=True,
    text=True,
    encoding="utf-8"
)
print(cp.stdout)  # Output: line2 py
```

**Key Points**:
- `input` passes data to the command.

#### When to Use?
- Process program-generated data.

---

## Detailed Explanation of Option Combinations

### 1. `shell=True` or `False`?
- **`False`**: Efficient and secure, use a list.
- **`True`**: Supports complex commands, use a string.

---

### 2. `capture_output=True` vs `check=True`
- **`capture_output=True`**: Captures output and errors, doesn't care about the result.
- **`check=True`**: Checks return code, raises exception on failure.
- **Combination**:
  ```python
  cp = subprocess.run(["ls", "nope"], capture_output=True, check=True, text=True, encoding="utf-8")
  ```

---

### 3. `stdout` and `stderr`
- **`PIPE`**: Capture to the program.
- **`None`**: Display to terminal.
- **`STDOUT`** (only for `stderr`): Merge into stdout.
- **File**: Write to a file.

---

### 4. `text=True`
- **Purpose**: Returns strings, requires `encoding`.
- **Without it**: Returns bytes, requires manual decoding.

---

### 5. `encoding` and `errors`
- **`encoding="utf-8"`**: Recommended.
- **`errors`**: Use `replace` to prevent garbled characters.

---

## Common Questions

1. **Why always use `shell=True` on Windows?**
   - Built-in commands depend on `cmd.exe`.

2. **What to do if FFmpeg output is in stderr?**
   - Use `capture_output=True`, both normal and error logs are in `cp.stderr` or `e.stderr`.

3. **What if encoding is messed up?**
   - Use `text=True, encoding="utf-8", errors="replace"`.

---

## How to Use in Different Scenarios?

| Scenario          | Usage                                   | Option Combination                     |
|-------------------|-----------------------------------------|----------------------------------------|
| Simple commands   | `["cmd", "arg"]`                       | `capture_output=True, text=True`      |
| Complex commands  | `"cmd1 | cmd2"`                      | `shell=True, capture_output=True`     |
| Capture separately| `["cmd", "arg"]`                       | `stdout=PIPE, stderr=PIPE`            |
| Check results     | Add `check=True`                       | `capture_output=True`                 |
| External tools    | `["ffmpeg", "-i", "in", "out"]`        | `capture_output=True, check=True`     |
| Input data        | Use `input`                            | `text=True, encoding="utf-8"`         |

**Core Tips**:
- Use `capture_output=True` to simplify capturing.
- `text=True` is convenient, `check=True` is strict.
- Note `stderr` for tools like FFmpeg.