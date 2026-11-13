---
title: GPU Utilization Too Low
date: 2024-01-22 14:33:00
description: The software works by recognizing text from the audio in a video, translating that text into a target language, synthesizing voiceover in the target language, and then merging the text, voiceover, and video into a new video. Only the **speech-to-text stage is heavily GPU-intensive**, while other stages use little to no GPU.
---
## GPU Utilization Too Low

**How the software works:**

It recognizes text from the audio in a video, translates that text into a target language, synthesizes voiceover in the target language, and then merges the text, voiceover, and video into a new video. Only the **speech-to-text stage is heavily GPU-intensive**, while other stages use little to no GPU.

![](https://pvtr2.pyvideotrans.com/images/3a51359d1cfc73ce74c5f1d23e11adc6.jpg)

#### **GPU vs CPU: Principles and Differences**

Think of training a large AI model like moving bricks.

![](https://img.pyvideotrans.com/file/1741155092260_image.png)

The CPU is like an "all-rounder" — a single person who can handle many tasks: computation, logic, management, no matter how complex, they excel at everything. However, it has a small number of cores, typically only a few dozen at most.
No matter how fast it moves bricks, it can only move a few, or at most a few dozen, at a time. It works hard but is not very efficient.

The GPU, on the other hand, has a staggering number of cores — often thousands or even tens of thousands. Although each core can only move one brick at a time, there are so many of them! With thousands of "helpers" working together, the bricks are moved in no time.

The core task of AI training and inference is "matrix operations" — essentially, a massive number of calculations (like addition, subtraction, multiplication, and division) performed on arrays of numbers. It's like moving a huge pile of red bricks, a simple task that requires no complex thinking, just manual labor.

The GPU's "massive parallel processing" capability is perfectly suited for this. It can handle thousands or tens of thousands of small tasks simultaneously, making it dozens or even hundreds of times faster than a CPU.

The CPU? It's better suited for sequential, complex tasks, like playing a single-player game or writing a document. For AI's massive pile of "bricks," the CPU can only move a few or a few dozen at a time. Even if it works itself to exhaustion, it can't keep up with the GPU.

---