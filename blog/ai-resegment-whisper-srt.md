---
title: Whisper's Sentence Segmentation Not Good Enough? Use AI LLMs to Re-segment for Perfect Subtitles
date: 2025-07-13 14:33:00
description: OpenAI's Whisper model is undoubtedly revolutionary in the field of speech recognition, capable of converting audio to text with astonishing accuracy. However, for long videos or complex dialogues, its automatic sentence segmentation and punctuation features can sometimes be unsatisfactory, often generating large blocks of text that are difficult to read.
---


# Whisper's Sentence Segmentation Not Good Enough? Use AI LLMs and Structured Data to Craft Perfect Subtitles

OpenAI's Whisper model is undoubtedly revolutionary in the field of speech recognition, capable of converting audio to text with astonishing accuracy. However, for long videos or complex dialogues, its automatic sentence segmentation and punctuation features can sometimes be unsatisfactory, often generating large blocks of text that are difficult to read.

This article provides you with an ultimate solution: **combine Whisper's word-level timestamp capability with the powerful comprehension of Large Language Models (LLMs) to build a fully automated subtitle processing pipeline that intelligently segments sentences, optimizes text, and outputs structured data.**

I will detail the entire process from recognition and data preparation to interacting with the AI, focusing on analyzing key problems encountered in practice and their solutions.

## Step 1: Get the "Raw Material" from Whisper — Word-Level Timestamps

To enable the LLM to precisely assign start and end times to new sentences, I must first obtain the timing information for each word or character from Whisper. This requires enabling a specific parameter.

When using Whisper for transcription, be sure to set the `word_timestamps` parameter to `True`. Taking the Python `openai-whisper` library as an example:

```python
import whisper

model = whisper.load_model("base")
# Enable the word_timestamps option
result = model.transcribe("audio.mp3", word_timestamps=True)
```

The `result` will contain a `segments` list, and each segment contains a `words` list. The data I need is right here. Next, I assemble this data into a clean JSON list specifically designed for the LLM.

```python
word_level_timestamps = []
for segment in result['segments']:
    for word_info in segment['words']:
        word_level_timestamps.append({
            'word': word_info['word'],
            'start': word_info['start'],
            'end': word_info['end']
        })

# The final data structure:
# [
#   {"word": " 五", "start": 1.95, "end": 2.17},
#   {"word": "老", "start": 2.17, "end": 2.33},
#   ...
# ]
```
This list is the "raw material" I feed to the LLM.

### Step 2: Intelligent Chunking — Bypassing Token Limits

The word list transcribed from an hour-long video can be enormous, and sending it directly to the LLM would exceed its token limit (Context Window). Therefore, chunking is essential.

A simple and effective method is to set a threshold, for example, **500 words per chunk**.

```python
def create_chunks(data, chunk_size=500):
    chunks = []
    for i in range(0, len(data), chunk_size):
        chunks.append(data[i:i + chunk_size])
    return chunks

word_chunks = create_chunks(word_level_timestamps, 500)
```
**Advanced Technique**: To avoid cutting off in the middle of a sentence, a better chunking strategy is to look for the largest gap between words (the time difference from `end` to the next `start`) near the `chunk_size` threshold to make the split. This improves the contextual integrity for the LLM when processing each chunk.

## Step 3: Designing the "Soul" — Crafting High-Quality LLM Prompts

The prompt is the soul of the entire process, directly determining the quality and stability of the output. An excellent prompt should include the following elements:

1.  **Clear Role and Objective**: Clearly inform the LLM of its identity (e.g., "AI Subtitle Processing Engine") and its sole task.
2.  **Detailed Processing Steps**: Describe step-by-step what it needs to do, including language identification, intelligent segmentation, text correction, adding punctuation, etc.
3.  **Extremely Strict Output Format Definition**: Use tables, code blocks, etc., to precisely define the output JSON structure, key names, value types, and emphasize what is "required" and "forbidden".
4.  **Provide Examples**: Give 1-2 complete examples including input and expected output. This greatly helps the model understand the task, especially when dealing with special cases (like correcting typos, removing filler words).
5.  **Built-in Final Checklist**: Have the model perform a self-check at the end of the prompt. This is a powerful psychological cue that effectively improves adherence to the output format.

The final optimized prompt I arrived at today is a model example that follows all the above principles. (*See the specific prompt at the bottom.*)

## Step 4: Avoiding "Traps" — Common Issues and Solutions with Structured Calls

This is the stage most prone to errors in practice.

#### Trap 1: Mixing Instructions and Data

**Problem Description**: Beginners often concatenate lengthy prompt instructions and massive JSON data into one huge string, then send it as a single message to the LLM.

**Symptom**: The LLM returns an error, complaining that "the input format does not meet requirements," because it sees a complex text mixing natural language and JSON, not the pure JSON data it was told to process.
```
{  "error": "The input provided does not conform to the expected format for processing. Please ensure the input is a valid JSON list of dictionaries, each containing \'word\', \'start\', and \'end\' keys."}'
```

**Solution**: **Strictly separate instructions and data**. Utilize the OpenAI API's `messages` structure: place your prompt in a message with `role: 'system'`, and place the pure JSON data string to be processed in a message with `role: 'user'`.

```python
messages = [
    {"role": "system", "content": "Your complete prompt..."},
    {"role": "user", "content": 'Pure JSON data string...'} # e.g., json.dumps(chunk)
]
```

#### Trap 2: Conflict Between `json_object` Mode and Prompt Instructions

**Problem Description**: To ensure 100% return of valid JSON, I use the `response_format={"type": "json_object"}` parameter. But this parameter forces the model to return a **JSON object** (wrapped in `{}`). If in the prompt, you instruct the model to directly return a **JSON list** (wrapped in `[]`), a command conflict arises.

```
response = model.chat.completions.create(
                    model=config.params['chatgpt_model'],
                    timeout=7200,
                    max_tokens= max(int(config.params.get('chatgpt_max_token')) if config.params.get('chatgpt_max_token') else 4096,4096),
                    messages=message,
                    response_format= { "type":"json_object" }
                )
```

**Wrong Prompt**

```
## Output the result in **json** format (crucial and must be followed)

You **must** return the result in the form of a valid json list. Each element in the output list **must and can only** contain the following three keys:
```

**Symptom**: Even after separating instructions and data, the LLM may still report an error because it cannot simultaneously satisfy the contradictory requirements of "return an object" and "return a list".

**Solution**: **Align the prompt instructions with the API constraints**. Modify your prompt to require the model to return a **JSON object containing the subtitle list**.

*   **Wrong approach**: Require direct output of `[{...}, {...}]`
*   **Correct approach**: Require output of `{"subtitles": [{...}, {...}]}`

This way, the API requirement (return an object) and the prompt instruction (return an object containing a `subtitles` key) are perfectly unified. Correspondingly, when parsing the result in code, an extra extraction step is needed: `result_object['subtitles']`.

## Step 5: Integration and Finishing Touches — Other Considerations

1.  **Complete Process**: In your code, you need to iterate through all chunks, call the LLM to process each chunk, then concatenate the subtitle lists returned from each chunk to form the final complete subtitle file.

2.  **Error Handling and Retry**: Network requests may fail, and the LLM may occasionally return non-compliant JSON. Wrapping the API call in a `try-except` block and adding a retry mechanism (e.g., using the `tenacity` library) is key to ensuring program stability.

3.  **Cost and Model Selection**: Models like `GPT-4o` or `deepseek-chat` perform better in following complex instructions and formatting output.

4.  **Final Proofreading**: Although the LLM can handle 99% of the work, after concatenating all results, you can write simple scripts for a final check, e.g., checking if any subtitle duration exceeds 6 seconds, or if the start/end times of two subtitles overlap.

### Summary

By combining Whisper's precise recognition capability with the LLM's deep comprehension and generation ability, I can build a highly automated, production-level subtitle optimization pipeline. The keys to success are:

-   **High-Quality Data Input**: Obtain accurate word-level timestamps from Whisper.
-   **Smart Engineering Processing**: Avoid API limits through chunking.
-   **Precise, Unambiguous Instructions**: Write a watertight system prompt.
-   **Deep Understanding of API Features**: Avoid common pitfalls like the `json_object` mode.



---
**Appendix: Final Version of the System Prompt**

````
# Role and Final Goal

You are a top-tier AI Subtitle Processing Engine. Your **sole goal** is to convert the **word-level** timestamp data (containing the `'word'` key) in the user input (user message) into **sentence-level**, intelligently segmented, and text-optimized subtitle lists, and return the result in a **JSON object** format containing the subtitle list.

---

## Core Processing Flow

1.  **Receive Input**: You will receive a JSON-formatted list as user input. Each element in the list contains `'word'`, `'start'`, `'end'`.
2.  **Identify Language**: Automatically determine the primary language of the input text (e.g., Chinese, English, Japanese, Spanish, etc.) and invoke the corresponding language knowledge base. **Process only one language per task**.
3.  **Intelligent Segmentation and Merging**:
    *   **Principle**: Perform sentence segmentation with the highest priority given to **semantic coherence and grammatical naturalness**.
    *   **Duration**: The ideal duration for each subtitle is 1-3 seconds, **absolutely must not exceed 6 seconds**.
    *   **Merging**: Merge multiple word/character dictionaries belonging to the same sentence into one.
4.  **Text Correction and Enhancement**:
    *   During the text merging process, perform deep proofreading and optimization on the **entire sentence**.
    *   **Correction**: Automatically correct spelling errors, grammatical errors, and common usage errors specific to the language.
    *   **Optimization**: Remove unnecessary filler words, adjust word order to make the expression more fluent and idiomatic, but never change the original meaning.
    *   **Punctuation**: Intelligently add or correct punctuation marks at segmentation points and within sentences according to the norms of the identified language.
5.  **Generate Output**: Return the result according to the **strictly defined output format** below.

---

## Output json Format Result (Crucial and Must Be Followed)

You **must** return the result in a valid **JSON object** format. This object **must** contain a key named `'subtitles'`, whose value is a subtitle list. Each element in the list **must and can only** contain the following three keys:

| Output Key (Key) | Type (Type)  | Description                                                                                                           |
| :------------- | :----------- | :------------------------------------------------------------------------------------------------------------- |
| `'start'`      | `float`      | **Must exist**. Taken from the `start` time of the **first word/character** in this sentence.                                                              |
| `'end'`        | `float`      | **Must exist**. Taken from the `end` time of the **last word/character** in this sentence.                                                              |
| `'text'`       | `str`        | **Must exist**. The **complete subtitle text** after merging, correcting, optimizing, and adding punctuation. **【This is the most important key; absolutely must not use 'word' or any other name.】** |

**Strictly Forbidden**: The output dictionary **should not** contain a `'word'` key. The content of the input `'word'` keys, after processing, is uniformly stored in the `'text'` key.

---

## Examples: Demonstrating Core Processing Principles (Applicable to All Languages)

**Important Note**: The following examples are intended to clarify the **processing logic and output format** you need to follow. These principles are universal; you must apply them to **any language** you identify in the user input, not just the languages in the examples.

### Principle Demonstration 1
#### User Input
```
[
    {'word': 'so', 'start': 0.5, 'end': 0.7},
    {'word': 'uh', 'start': 0.9, 'end': 1.0},
    {'word': 'whatis', 'start': 1.2, 'end': 1.6},
    {'word': 'your', 'start': 1.7, 'end': 1.9},
    {'word': 'plan', 'start': 2.0, 'end': 2.4}
]
```
#### Your JSON Output
```json
{
    "subtitles": [
        {
            "start": 0.5,
            "end": 2.4,
            "text": "So, what is your plan?"
        }
    ]
}
```

### Principle Demonstration 2
#### User Input
```
[
    {'word': '这', 'start': 2.1, 'end': 2.2},
    {'word': '里是', 'start': 2.3, 'end': 2.6},
    {'word': '机', 'start': 2.8, 'end': 2.9},
    {'word': '场吗', 'start': 3.0, 'end': 3.5},
    {'word': '以经', 'start': 4.2, 'end': 4.5},
    {'word': '很晚', 'start': 4.6, 'end': 5.0}
]
```
#### Your JSON Output
```json
{
    "subtitles": [
        {
            "start": 2.1,
            "end": 3.5,
            "text": "这里是机场吗？"
        },
        {
            "start": 4.2,
            "end": 5.0,
            "text": "已经很晚了。"
        }
    ]
}
```

---

## Final Check Before Execution

Before you generate your final answer, please perform one last internal check to ensure your output is **100%** compliant with the following rules:

1.  **Is the final output a valid json object `{...}`?** -> (Yes/No)
2.  **Does this JSON object contain a key named `'subtitles'`?** -> (Yes/No)
3.  **Is the value of `'subtitles'` a list `[...]`, and is every element in this list a valid JSON object `{...}`?** -> (Yes/No)
4.  **Does each dictionary in the list contain only the three keys `'start'`, `'end'`, `'text'`?** -> (Yes/No)
5.  **Most critical point: Is the key name `'text'`, not `'word'`?** -> (Yes/No)

**Only generate your final output if the answer to all the above questions is "Yes".**

````