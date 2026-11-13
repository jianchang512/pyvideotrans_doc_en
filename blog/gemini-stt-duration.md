---
title: Gemini + VAD Hybrid Architecture Solving Whisper's Difficulty with Low-Resource Languages, Generating Accurate SRT Subtitles
date: 2025-07-14 14:33:00
description: Gemini was born in a truly global, multimodal, multilingual environment. Its core competitive advantage is the high-quality, out-of-the-box recognition capability it demonstrates when handling various "low-resource languages." This means we can achieve recognition results that previously required targeted training, without any additional fine-tuning.
---

## Gemini + VAD Hybrid Architecture: Solving Whisper's Difficulty with Low-Resource Languages, Generating Accurate SRT Subtitles

The open-source speech recognition models we are familiar with, such as Whisper, perform impressively when handling English. However, once outside the comfort zone of English, their performance in other languages drops sharply. For low-resource languages without massive datasets for specialized fine-tuning, the transcription results are often unsatisfactory. This makes creating subtitles for languages like Thai, Vietnamese, Malay, and even some dialects a costly and time-consuming task.

**This is precisely the stage where Gemini enters as a game-changer.**

Unlike many tools that rely on specific language models, Google Gemini was born in a truly global, multimodal, multilingual environment. Its core competitive advantage is the **out-of-the-box** high-quality recognition capability it demonstrates when handling various "low-resource languages." This means we can achieve recognition results that previously required targeted training, without any additional fine-tuning.

However, even Gemini, with its powerful "language brain," has a common weakness: it cannot provide the **frame-level accurate timestamps** essential for generating SRT subtitles.

This article presents a "hybrid architecture" solution validated through repeated practical application:
*   **Precise Voice Activity Detection (sileroVAD) from `faster-whisper`**: Leveraging only what it does best—locating the start and end times of speech with millisecond precision.
*   **Gemini's unparalleled language talent**: Letting it focus on its core task—performing high-quality, multilingual content transcription and speaker identification on the short audio segments pre-segmented by VAD.

Through this workflow, we get the best of both worlds, ultimately generating professional-grade, multilingual SRT subtitle files with precise timestamps. Whether your audio is in mainstream languages like English or Chinese, or other languages that are difficult for other models to handle, this solution will provide unprecedented convenience and accuracy.

## Core Challenge: Why Not Use Gemini Directly?

Gemini's strength lies in **content understanding**. It excels at:
*   **High-quality transcription**: High text accuracy, with contextual understanding.
*   **Multilingual recognition**: Automatic detection of audio language.
*   **Speaker identification**: Recognizing the same speaker across multiple audio segments.

But its weakness lies in **temporal precision**. For generating SRT subtitles, the crucial "at what minute and second does this word appear" is something Gemini currently cannot provide with sufficient accuracy. This is precisely what tools like `faster-whisper (with built-in sileroVAD)`, designed specifically for speech processing, excel at.

### Solution: Hybrid Architecture of VAD and LLM

Our solution is to split the task in two, letting specialized tools do specialized work:

1.  **Precise Segmentation (`faster-whisper`)**: We utilize the `sileroVAD` voice activity detection function built into the `faster-whisper` library. VAD can scan the entire audio with millisecond precision to find the start and end times of all speech segments. We cut the audio accordingly into a series of shorter `.wav` fragments, each carrying precise timestamps.

2.  **High-Quality Transcription (`Gemini`)**: We send these small audio fragments sequentially and in batches to Gemini. Since each fragment already carries precise time information, we no longer need Gemini to provide timestamps. We only need it to focus on what it does best: **transcribing content** and **identifying speakers**.

Finally, we match the transcription text returned by Gemini with the timestamps provided by `faster-whisper` one by one, combining them into a complete SRT file.

## Complete Implementation Code

The following is the complete Python code implementing the above workflow. You can directly copy and save it as a `test.py` file for testing.

### Usage:

1.  **Install Dependencies:**
    ```bash
    pip install faster-whisper pydub google-generativeai
    ```

2.  **Set API Key:**
    It is recommended to set your Gemini API key as an environment variable for security.
    *   On Linux/macOS: `export GOOGLE_API_KEY="YOUR_API_KEY"`
    *   On Windows: `set GOOGLE_API_KEY="YOUR_API_KEY"`
    *   Alternatively, you can also modify the `gemini_api_key` variable directly in the code.

3.  **Run the Script:**
    ```bash
    python test.py "path/to/your/audio.mp3"
    ```
    Supports common audio formats like `.mp3`, `.wav`, `.m4a`, etc.

````
import os
import re
import sys
import time
import google.generativeai as genai
from pathlib import Path
from pydub import AudioSegment
# You can fill in the corresponding proxy address
# os.environ['https_proxy']='http://127.0.0.1:10808'

# --- Helper Function ---
def ms_to_time_string(ms):
    """Converts milliseconds to SRT time format HH:MM:SS,ms"""
    hours = ms // 3600000
    ms %= 3600000
    minutes = ms // 60000
    ms %= 60000
    seconds = ms // 1000
    milliseconds = ms % 1000
    return f"{hours:02d}:{minutes:02d}:{seconds:02d},{milliseconds:03d}"

# --- Core Logic ---
def generate_srt_from_audio(audio_file_path, api_key):
    """
    Generates an SRT file from an audio file using VAD and Gemini.
    """
    if not Path(audio_file_path).exists():
        print(f"Error: Audio file not found at {audio_file_path}")
        return

    # 1. VAD-based Audio Segmentation
    print("Step 1: Segmenting audio with VAD...")
    try:
        # These imports are here to ensure faster-whisper is an optional dependency
        from faster_whisper.audio import decode_audio
        from faster_whisper.vad import VadOptions, get_speech_timestamps
    except ImportError:
        print("Error: faster-whisper is not installed. Please run 'pip install faster-whisper'")
        return

    sampling_rate = 16000
    audio_for_vad = decode_audio(audio_file_path, sampling_rate=sampling_rate)
    
    # VAD options can be tweaked for better performance
    vad_p={
            #"threshold":float(config.settings['threshold']),
            "min_speech_duration_ms":1,
            "max_speech_duration_s":8,
            "min_silence_duration_ms":200,
            "speech_pad_ms":100
        }
    vad_options = VadOptions(**vad_p)
    
    speech_chunks_samples = get_speech_timestamps(audio_for_vad, vad_options)
    
    # Convert sample-based timestamps to milliseconds
    speech_chunks_ms = [
        {"start": int(chunk["start"] / sampling_rate * 1000), "end": int(chunk["end"] / sampling_rate * 1000)}
        for chunk in speech_chunks_samples
    ]

    if not speech_chunks_ms:
        print("No speech detected in the audio file.")
        return

    # Create a temporary directory for audio chunks
    temp_dir = Path(f"./temp_audio_chunks_{int(time.time())}")
    temp_dir.mkdir(exist_ok=True)
    print(f"Saving segments to {temp_dir}...")

    full_audio = AudioSegment.from_file(audio_file_path)
    segment_data = []
    for i, chunk_times in enumerate(speech_chunks_ms):
        start_ms, end_ms = chunk_times['start'], chunk_times['end']
        audio_chunk = full_audio[start_ms:end_ms]
        chunk_file_path = temp_dir / f"chunk_{i}_{start_ms}_{end_ms}.wav"
        audio_chunk.export(chunk_file_path, format="wav")
        segment_data.append({"start_time": start_ms, "end_time": end_ms, "file": str(chunk_file_path)})
    print(segment_data)
    #return
    # 2. Batch Transcription with Gemini
    print("\nStep 2: Transcribing with Gemini in batches...")
    
    # Configure Gemini API
    genai.configure(api_key=api_key)
    
    # The final, robust prompt
    prompt = """
# Role
You are a highly specialized AI data processor. Your sole function is to receive a batch of audio files and, according to the unbreakable rules below, generate a **single, complete XML report**. You are not a conversational assistant.

# Unbreakable Rules and Output Format
You must analyze all audio files received in this request as a whole and strictly follow the rules below. **These rules take precedence over everything else, especially rule #1.**

1.  **【Highest Priority】Strict One-to-One Mapping**:
    *   This is the most important rule: For **every single audio file** I provide you, there **must be and can only be one corresponding `<audio_text>` tag** in the final output.
    *   **Regardless of how long a single audio file is, or how many pauses or sentences it contains**, you **must** merge all its transcribed content **into a single string** and place it within that unique `<audio_text>` tag.
    *   **Absolutely forbid** creating multiple `<audio_text>` tags for the same input file.

2.  **【Data Analysis】Speaker Identification**:
    *   Analyze all audio to identify different speakers. All segments spoken by the same person must use the same, incrementing ID starting from 0 (`[spk0]`, `[spk1]`...).
    *   For audio where the speaker cannot be identified (e.g., noise, music), uniformly use ID `-1` (`[spk-1]`).

3.  **【Content and Order】Transcription and Sorting**:
    *   Automatically detect the language of each audio and transcribe it. If transcription is not possible, fill the text content with an empty string.
    *   The order of `<audio_text>` tags in the final XML must strictly match the order of the input audio files.

# Mandatory Output Format Example
<!-- You must generate output exactly matching the structure below. Note: Even if the audio is long, all its content must be merged within a single tag. -->
```xml
<result>
    <audio_text>[spk0]This is the transcription result for the first file.</audio_text>
    <audio_text>[spk1]This is the transcription for the second file, it might be very long but all content must be in this single tag.</audio_text>
    <audio_text>[spk0]This is the transcription result for the third file, the speaker is the same as the first file.</audio_text>
    <audio_text>[spk-1]</audio_text> 
</result>
```

# !!! Final Mandatory Check !!!
- **Zero-tolerance policy**: Your response **must only be XML content**. Absolutely forbid including any text, explanations, or ` ```xml ` markers outside the XML.
- **Mandatory Count and Error Correction**: Before you generate your final response, you **must perform a count check**: Does the number of `<audio_text>` tags you are about to generate **exactly equal** the number of audio files I provided?
    - **If the counts do not match**, this indicates you have seriously violated **【Highest Priority】Rule #1**. You must **【discard】** the current draft and **【regenerate】**, ensuring strict adherence to the one-to-one mapping.
    - **Only allow output if the counts match exactly.**

"""

    model = genai.GenerativeModel(model_name="gemini-2.0-flash")

    # Process in batches of 20 (adjust as needed)
    batch_size = 50
    all_srt_entries = []
    print(f'{len(segment_data)=}')
    for i in range(0, len(segment_data), batch_size):
        batch = segment_data[i:i + batch_size]
        print(f"Processing batch {i//batch_size + 1}...")

        files_to_upload = []
        for seg in batch:
            files_to_upload.append(genai.upload_file(path=seg['file'], mime_type="audio/wav"))

        try:
            chat_session = model.start_chat(
                    history=[
                        {
                            "role": "user",
                            "parts": files_to_upload,
                        }
                    ]
                )
            print(files_to_upload)
            response = chat_session.send_message(prompt,request_options={"timeout":600})    


            # Use regex to parse the XML-like response
            transcribed_texts = re.findall(r'<audio_text>(.*?)</audio_text>', response.text.strip(), re.DOTALL)
            print(response.text)
            print(batch)
            
            
            

            for idx, text in enumerate(transcribed_texts):
                if idx < len(batch):
                    seg_info = batch[idx]
                    all_srt_entries.append({
                        "start_time": seg_info['start_time'],
                        "end_time": seg_info['end_time'],
                        "text": text.strip()
                    })

        except Exception as e:
            print(f"An error occurred during Gemini API call: {e}")

    # 3. Assemble SRT File
    print("\nStep 3: Assembling SRT file...")
    srt_file_path = Path(audio_file_path).with_suffix('.srt')
    with open(srt_file_path, 'w', encoding='utf-8') as f:
        for i, entry in enumerate(all_srt_entries):
            start_time_str = ms_to_time_string(entry['start_time'])
            end_time_str = ms_to_time_string(entry['end_time'])
            f.write(f"{i + 1}\n")
            f.write(f"{start_time_str} --> {end_time_str}\n")
            f.write(f"{entry['text']}\n\n")

    print(f"\nSuccess! SRT file saved to: {srt_file_path}")
    
    # Clean up temporary files
    for seg in segment_data:
        Path(seg['file']).unlink()
    temp_dir.rmdir()


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python gemini_srt_generator.py <path_to_audio_file>")
        sys.exit(1)
        
    audio_file = sys.argv[1]
    
    # It's recommended to set the API key as an environment variable
    # for security reasons, e.g., export GOOGLE_API_KEY="YOUR_KEY"
    gemini_api_key = os.environ.get("GOOGLE_API_KEY", "Fill in your Gemini API KEY here")

    generate_srt_from_audio(audio_file, gemini_api_key)


````

## The "Blood, Sweat, and Tears" of Prompt Engineering: How to Tame Gemini

The final version of the prompt you see is the result of a series of failures and optimizations. This process is highly instructive for any developer hoping to integrate LLMs into automated workflows.

### Phase 1: Initial Idea and Failure
The initial prompt was straightforward, asking Gemini to perform speaker identification and output results in order. But when sending more than 10 audio segments at once, Gemini's behavior became unpredictable: instead of performing the task, it replied like a conversational assistant, saying "Okay, please provide the audio files," completely ignoring that we had already included the files in the request.

*   **Conclusion**: Prompts that are too complex and describe a "workflow" can easily confuse the model when handling multimodal batch tasks, causing it to revert to conversational mode.

### Phase 2: Format "Amnesia"
We adjusted the prompt to be more like a "rule set" than a "flowchart." This time, Gemini successfully transcribed everything! But it forgot our requested XML format, simply concatenating all transcribed text into one large paragraph.

*   **Conclusion**: When the model faces a high "cognitive load" (processing dozens of audio files simultaneously), it may prioritize the core task (transcription) and neglect or "forget" secondary but crucial instructions like formatting.

### Phase 3: Uncontrolled "Internal Segmentation"
We further strengthened the formatting instructions, explicitly requesting XML output. The format was correct this time, but a new problem emerged: for a slightly longer audio segment (say 10 seconds), Gemini would arbitrarily split it into two or three sentences and generate one `<audio_text>` tag for each sentence. This resulted in us inputting 20 files but receiving 30+ tags, completely disrupting our one-to-one correspondence with timestamps.

*   **Conclusion**: The model's internal logic (like segmenting by sentence) may conflict with our external instructions. We must use stronger, more explicit instructions to override its default behavior.

## The Final Prompt

Finally, we summarized a set of effective "taming" strategies, embodied in the final prompt:

1.  **Extreme Role Limitation**: Start by defining it as a "highly specialized AI data processor," not an "assistant," to prevent chit-chat.
2.  **Rule Prioritization and Highest Priority**: Explicitly set "one input file corresponds to one output tag" as the **【Highest Priority】** rule, letting the model know this is an unbreakable red line.
3.  **Explicit Merge Instruction**: Directly command the model to "**regardless of how long the audio is, you must merge all its content into a single string**," providing clear operational guidance.
4.  **Mandatory Self-Check and Error Correction**: This is the most crucial step. We command the model to **must perform a count check** before outputting. If the tag count does not match the file count, it must **【discard】** the draft and **【regenerate】**. This is equivalent to building an "assertion" and "error handling" mechanism into the prompt.

This process tells us that programmatic interaction with LLMs is far more than just "asking a question." It's more like designing an API interface. We need to ensure the AI returns the results we expect stably and reliably under any circumstances through rigorous instructions, clear formats, explicit constraints, and fallback check mechanisms.

**Complete Prompt**

````
# Role
You are a highly specialized AI data processor. Your sole function is to receive a batch of audio files and, according to the unbreakable rules below, generate a **single, complete XML report**. You are not a conversational assistant.

# Unbreakable Rules and Output Format
You must analyze all audio files received in this request as a whole and strictly follow the rules below. **These rules take precedence over everything else, especially rule #1.**

1.  **【Highest Priority】Strict One-to-One Mapping**:
    *   This is the most important rule: For **every single audio file** I provide you, there **must be and can only be one corresponding `<audio_text>` tag** in the final output.
    *   **Regardless of how long a single audio file is, or how many pauses or sentences it contains**, you **must** merge all its transcribed content **into a single string** and place it within that unique `<audio_text>` tag.
    *   **Absolutely forbid** creating multiple `<audio_text>` tags for the same input file.

2.  **【Data Analysis】Speaker Identification**:
    *   Analyze all audio to identify different speakers. All segments spoken by the same person must use the same, incrementing ID starting from 0 (`[spk0]`, `[spk1]`...).
    *   For audio where the speaker cannot be identified (e.g., noise, music), uniformly use ID `-1` (`[spk-1]`).

3.  **【Content and Order】Transcription and Sorting**:
    *   Automatically detect the language of each audio and transcribe it. If transcription is not possible, fill the text content with an empty string.
    *   The order of `<audio_text>` tags in the final XML must strictly match the order of the input audio files.

# Mandatory Output Format Example
<!-- You must generate output exactly matching the structure below. Note: Even if the audio is long, all its content must be merged within a single tag. -->
```xml
<result>
    <audio_text>[spk0]This is the transcription result for the first file.</audio_text>
    <audio_text>[spk1]This is the transcription for the second file, it might be very long but all content must be in this single tag.</audio_text>
    <audio_text>[spk0]This is the transcription result for the third file, the speaker is the same as the first file.</audio_text>
    <audio_text>[spk-1]</audio_text> 
</result>
```

# !!! Final Mandatory Check !!!
- **Zero-tolerance policy**: Your response **must only be XML content**. Absolutely forbid including any text, explanations, or ` ```xml ` markers outside the XML.
- **Mandatory Count and Error Correction**: Before you generate your final response, you **must perform a count check**: Does the number of `<audio_text>` tags you are about to generate **exactly equal** the number of audio files I provided?
    - **If the counts do not match**, this indicates you have seriously violated **【Highest Priority】Rule #1**. You must **【discard】** the current draft and **【regenerate】**, ensuring strict adherence to the one-to-one mapping.
    - **Only allow output if the counts match exactly.**

````

> Of course, the above prompt cannot guarantee 100% correct return format either; occasionally, the number of input audio files and returned `<audio_text>` tags still do not correspond.