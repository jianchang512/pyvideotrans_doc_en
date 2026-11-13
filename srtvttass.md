---
title: srt / vtt / ass subtitle formats
date: 2024-01-22 14:33:00
description: SRT (SubRip Subtitle), VTT (WebVTT), and ASS (Advanced SubStation Alpha) are three very common subtitle formats. The following details each subtitle format, its properties, and settings.
---

# srt / vtt / ass subtitle formats

SRT (SubRip Subtitle), VTT (WebVTT), and ASS (Advanced SubStation Alpha) are three very common subtitle formats. The following details each subtitle format, its properties, and settings.

## **SRT Subtitle Format**

SRT is a simple and widely used subtitle format with the file extension `.srt`. It is especially popular in video players and subtitle editors. Its basic structure includes subtitle number, timestamp, and subtitle text. Subtitle properties (such as color, font) cannot be defined directly through SRT; they usually rely on the player's default settings or external style files for control.

### **SRT Format Structure**

Each subtitle block in an SRT file is arranged in the following format:

1. **Subtitle Number** (increments line by line)
2. **Timestamp** (shows start and end time, precise to milliseconds)
3. **Subtitle Content** (can contain multiple lines of text)
4. An empty line (used to separate subtitle blocks)

### **SRT Example**

```plaintext
1
00:00:01,000 --> 00:00:04,000
Hello there, my friend!

2
00:00:05,000 --> 00:00:08,000
The weather is nice today, don't you think?
```

### **Detailed Explanation**

- **Subtitle Number**: Each subtitle block has a unique number, incrementing sequentially. Numbering starts from 1 and must be an integer.
  - Example: `1`

- **Timestamp**: The format is `HH:MM:SS,mmm`, where `HH` is hours, `MM` is minutes, `SS` is seconds, and `mmm` is milliseconds. The timestamp consists of two times separated by `-->` with a space on each side, indicating the start and end time of the subtitle.
  - Example: `00:00:01,000 --> 00:00:04,000`

- **Subtitle Content**: The subtitle text can contain one or more lines, displayed on the video. SRT does not support formatted text, such as color, font size, etc. These must be defined through player settings or additional style files.
  - Example:
    `Hello there, my friend!`

### **SRT Format Limitations**
- **Does not support text formatting**: Cannot directly set color, font, etc.; requires the player or other tools for style adjustments.

---

## **VTT Subtitle Format**

WebVTT (Web Video Text Tracks) is a subtitle format for HTML5 video elements, designed specifically for web video. It is more powerful than the SRT format, supporting styles, notes, multiple languages, positioning information, and other properties. The subtitle file format extension is `.vtt`. However, it cannot be directly embedded into a video; it must be referenced within the HTML `<video>` element.

### **VTT Format Structure**

VTT files are similar to SRT but with more features. A VTT file begins with `WEBVTT` followed by an empty line, and uses a `.` (dot) instead of a `,` (comma) to separate seconds and milliseconds.

### **VTT Example**

```plaintext
WEBVTT

1
00:00:01.000 --> 00:00:04.000
Hello there, <b>friends!</b>

2
00:00:05.000 --> 00:00:08.000
The rain today is <i>very, very heavy</i>.
```

### **Detailed Explanation**

- **WEBVTT Declaration**: All VTT files must start with `WEBVTT` to declare their file format.
  - Example: `WEBVTT`

- **Subtitle Number**: Subtitle numbers are optional, unlike in the SRT format where they are required. Their purpose is to distinguish the order of each subtitle segment, but they can be omitted in VTT.

- **Timestamp**: The format is `HH:MM:SS.mmm`, where `HH` is hours, `MM` is minutes, `SS` is seconds, and `mmm` is milliseconds. A `.` (dot) is used to separate seconds and milliseconds, not a `,`. The timestamp consists of two times separated by `-->`, also with a space on each side.
  - Example: `00:00:01.000 --> 00:00:04.000`

- **Subtitle Content**: Subtitle text can contain HTML tags for text formatting, such as bold (`<b>`), italic (`<i>`), underline (`<u>`), etc.
  - Example:
    ```plaintext
    Hello there, <b>friends!</b>
    ```

### **Other Features Supported by VTT**

1. **Styles (CSS)**:
   - VTT supports text style adjustments via CSS, such as color, font size, position, etc. Styles can be defined in HTML via `<style>` tags or external CSS files.
   - Example:
     ```plaintext
     <c.red>Hello there, friends!</c>
     ```
     Defining `.red { color: red; }` in HTML will display `Hello, world!` in red.

2. **Positioning Information**:
   - VTT supports setting specific positions for subtitles through properties like `position`, `line`, etc.
   - Example:
     ```plaintext
     00:00:01.000 --> 00:00:04.000 position:90% line:10%
     ```

3. **Notes**:
   - VTT supports adding notes in the file, starting with `NOTE`.
   - Example:
     ```plaintext
     NOTE This is a note and will not be displayed.
     ```

4. **Multi-language Support**:
   - VTT can support multi-language subtitles through metadata or HTML5's `<track>` tag.

### **Advantages of the VTT Format**
- **Text Formatting**: Supports HTML tags for simple text formatting, such as bold, italic, etc.
- **Styles and Positioning**: Allows setting subtitle styles and positions via CSS.
- **Notes and Metadata**: Supports adding note information without affecting subtitle display.
- **Web Compatibility**: Designed for HTML5 video, suitable for web environments.

---

## **Comparison of SRT and VTT**

| Feature                     | SRT                                  | VTT                                  |
|-----------------------------|--------------------------------------|--------------------------------------|
| File Header                 | None                                 | `WEBVTT` followed by an empty line   |
| Timestamp Format            | `HH:MM:SS,mmm`, comma separates seconds and milliseconds | `HH:MM:SS.mmm`, dot separates seconds and milliseconds |
| Supports Text Formatting    | No                                   | Supports HTML tags, e.g., `<b>`, `<i>` |
| Subtitle Number             | Required                             | Optional                             |
| Style and Position Support  | Relies on player or external style files | Built-in CSS style support, supports positioning info |
| Notes                       | Not supported                        | Supports `NOTE` notes                |
| Supported Advanced Features | Basic subtitle functions only        | Supports karaoke, notes, styles, etc. |
| Use Case                   | Local video files, simple subtitle display | HTML5 video, web subtitles, complex subtitle display |
| Can be embedded in video?   | Can be embedded in video files       | Cannot be embedded in video; can only be used within webpage `<video>` elements |

> The VTT (WebVTT) subtitle format cannot be directly embedded into MP4 files, but VTT files can be associated with MP4 videos using HTML5's `<track>` tag. When playing the MP4 in a browser, these associated subtitles can be displayed normally.

### Using VTT Subtitles to Play MP4 in a Browser

In HTML5, you can load an MP4 video via the `<video>` element and associate VTT subtitles with it using the `<track>` element.

HTML Example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>
<body>
    <video controls width="600">
        <source src="video.mp4" type="video/mp4">
        <track src="subtitles.vtt" kind="subtitles" srclang="zh" label="Simplified Chinese">
        Your browser does not support the video tag.
    </video>
</body>
</html>
```

**HTML Element Explanation**
- `<video>`: Used to embed video files. The `controls` attribute allows users to control video playback (play/pause, etc.).
- `<source>`: Defines the path and type of the video file, using MP4 here.
- `<track>`: Defines the subtitle file. The `src` attribute points to the path of the VTT file, `kind="subtitles"` indicates it is a subtitle, `srclang` specifies the subtitle language (`zh` for Chinese), and `label` gives the subtitle track a descriptive label.

Place the HTML file and the related **video and subtitle files in the same directory**. Then, open the HTML file (e.g., `index.html`) in a browser. You will see the video player, and when you click play, subtitles will automatically appear (if the player supports it and the user has subtitles enabled).

> Most modern browsers and video players support subtitle switching. You can select different subtitles (if multiple tracks exist) via the subtitle button in the video control bar.

### VTT Subtitle Notes

- **Browser Compatibility**: Almost all modern browsers (e.g., Chrome, Firefox, Edge) support the `<video>` element and WebVTT subtitles. As long as the VTT file and MP4 file are correctly associated, subtitles should be displayed when playing the video in a browser.

- **Cannot be Directly Embedded in MP4 Files**: VTT subtitle files cannot be directly embedded into MP4 files like SRT or other subtitle formats. MP4 files themselves do not contain VTT subtitle tracks. External subtitle files must be used and associated via the HTML5 `<track>` tag.

- **VTT Subtitle Styling**: In browsers, WebVTT subtitles can be styled to some extent via CSS. If customizing subtitle appearance is needed, further modifications can be made using JavaScript and CSS.

----

## **ASS Subtitle Format**

**ASS (Advanced SubStation Alpha)** is a feature-rich subtitle format widely used for anime, karaoke subtitles, and other scenarios requiring complex subtitle effects. It supports rich style controls, including font, color, position, shadow, outline, and more.

Below is an example of an ASS subtitle.

```
[Script Info]
; Script generated by FFmpeg/Lavc60.27.100
ScriptType: v4.00+
PlayResX: 384
PlayResY: 288
ScaledBorderAndShadow: yes
YCbCr Matrix: None

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,SimHei,16,&hffffff,&HFFFFFF,&h000000,&H0,0,0,0,0,100,100,0,0,1,1,0,2,10,10,10,1
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:01.95,0:00:04.93,Default,,0,0,0,,This is an ancient galaxy,
Dialogue: 0,0:00:05.42,0:00:08.92,Default,,0,0,0,,We have been observing it for several years,
Dialogue: 0,0:00:09.38,0:00:13.32,Default,,0,0,0,,The Webb telescope recently sent back many previously undiscovered photos.
```

### **ASS Subtitle Structure**

A standard ASS subtitle file contains multiple sections:

1. **[Script Info]**: Basic information about the script, such as title, original subtitle author, etc.
2. **[V4+ Styles]**: Subtitle style definitions; each style can be referenced by different subtitle lines.
3. **[Events]**: Actual subtitle events, defining the appearance time, disappearance time, and specific content of subtitles.

---

### 1. **[Script Info] Section**

This section contains metadata for the subtitle file, defining some basic information.

```ini
[Script Info]
Title: Subtitle Title
date: 2024-01-22 14:33:00
description:
Original Script: Subtitle Author
ScriptType: v4.00+
PlayDepth: 0
PlayResX: 1920
PlayResY: 1080
ScaledBorderAndShadow: yes
YCbCr Matrix: None
```

- `Title`: The title of the subtitle file.
- `Original Script`: Information about the original subtitle author.
- `ScriptType`: Defines the script version, usually `v4.00+`.
- `PlayResX` and `PlayResY`: Define the video resolution, indicating the display effect of subtitles at that resolution.
- `PlayDepth`: The color depth of the video, generally 0.
- `ScaledBorderAndShadow`: Specifies whether to scale the subtitle's outline and shadow according to the screen resolution. `yes` means yes, `no` means no scaling.
- `YCbCr Matrix`: Specifies the YCbCr matrix used for color conversion. In video processing and subtitle rendering, YCbCr is a color space commonly used for video encoding and decoding. This setting may affect subtitle display under different color spaces.

---

### 2. **[V4+ Styles] Section**

This section defines subtitle styles. Each style can control font, color, shadow, etc., through fields. The format is as follows:

```ini
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Arial,20,&H00FFFFFF,&H0000FFFF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,1,0,2,10,10,20,1
```

#### Field Explanations:

1. **Name**: The name of the style, used for reference.
   - Example: `Default`, meaning this is the default style.

2. **Fontname**: Font name.
   - Example: `Arial`, subtitles will use the Arial font.

3. **Fontsize**: Font size.
   - Example: `20`, font size is 20.

4. **PrimaryColour**: Primary subtitle color, representing the main color of the subtitle (usually the displayed text color).
   - Example: `&H00FFFFFF`, white font. The color value format is `&HAABBGGRR`, where `AA` is transparency.

5. **SecondaryColour**: Secondary subtitle color, typically used for karaoke subtitle transition colors.
   - Example: `&H0000FFFF`, blue.

6. **OutlineColour**: Outline color.
   - Example: `&H00000000`, black outline.

7. **BackColour**: Background color, typically used when `BorderStyle=3` (subtitles with a background box).
   - Example: `&H00000000`, black background.

8. **Bold**: Bold setting.
   - Example: `-1` means bold, `0` means not bold.

9. **Italic**: Italic setting.
   - Example: `0` means not italic, `-1` means italic.

10. **Underline**: Underline setting.
    - Example: `0` means no underline.

11. **StrikeOut**: Strikethrough setting.
    - Example: `0` means no strikethrough.

12. **ScaleX**: Horizontal scaling ratio, 100 means normal scale.
    - Example: `100`, meaning no scaling.

13. **ScaleY**: Vertical scaling ratio.
    - Example: `100`, meaning no scaling.

14. **Spacing**: Character spacing.
    - Example: `0`, meaning no extra spacing.

15. **Angle**: Subtitle rotation angle.
    - Example: `0`, meaning no rotation.

16. **BorderStyle**: Border style, defining whether the subtitle has an outline or background box.
    - Example: `1` means has outline but no background box, `3` means has background box.

17. **Outline**: Outline thickness.
    - Example: `1`, meaning outline thickness is 1.

18. **Shadow**: Shadow depth.
    - Example: `0`, meaning no shadow.

19. **Alignment**: Subtitle alignment, using numbers 1-9 to define different alignment positions.
    - Example: `2`, meaning center-bottom alignment.

    Alignment Explanation:
    - 1: Bottom-left
    - 2: Bottom-center
    - 3: Bottom-right
    - 4: Middle-left
    - 5: Center
    - 6: Middle-right
    - 7: Top-left
    - 8: Top-center
    - 9: Top-right

20. **MarginL, MarginR, MarginV**: Left, right, and vertical margins, in pixels.
    - Example: `10, 10, 20`, meaning left and right margins are 10 pixels, vertical margin is 20 pixels.

21. **Encoding**: Encoding format, `1` means ANSI encoding, `0` means default encoding.

---

### 3. **[Events] Section**

This section defines actual subtitle events, including timestamps, subtitle content, and the style used.

```ini
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:01.00,0:00:05.00,Default,,0,0,0,,This is the first subtitle line
Dialogue: 0,0:00:06.00,0:00:10.00,Default,,0,0,0,,This is the second subtitle line
```

#### Field Explanations:

1. **Layer**: Layer, controls the stacking order of subtitles; higher numbers are on top.
   - Example: `0`, meaning default layer.

2. **Start**: Subtitle start time, format `hours:minutes:seconds.milliseconds`.
   - Example: `0:00:01.00`, meaning subtitle starts at 1 second.

3. **End**: Subtitle end time.
   - Example: `0:00:05.00`, meaning subtitle ends at 5 seconds.

4. **Style**: The name of the subtitle style used, referencing a style defined in [V4+ Styles].
   - Example: `Default`, uses the style named Default.

5. **Name**: Optional field, typically used for character name annotation.

6. **MarginL, MarginR, MarginV**: Left, right, and vertical margins for the subtitle, overriding values defined in the style.

7. **Effect**: Subtitle effects, typically used for karaoke subtitles, etc.

8. **Text**: The actual content of the subtitle. ASS format control codes can be used for line breaks, special styles, positioning, etc.

---

### Example Subtitle Event

```ini
Dialogue: 0,0:00:01.00,0:00:05.00,Default,,0,0,0,,{\pos(960,540)}This is the first subtitle line
```

- `{\pos(960,540)}`: Controls the subtitle to display at a specific screen position (horizontal 960 pixels, vertical 540 pixels).
- `This is the first subtitle line`: The actual displayed subtitle text.

---

### Color Settings in ASS

Taking `&HAABBGGRR` as an example, `&HAABBGGRR` is a hexadecimal format used to represent a color, including the color's transparency and the color value itself. This format is used to define subtitle color properties, such as `PrimaryColour`, `OutlineColour`, and `BackColour`.

The meanings are as follows:

- **`AA`**: Transparency (Alpha channel), representing the color's transparency.
- **`BB`**: Blue component.
- **`GG`**: Green component.
- **`RR`**: Red component.

The specific byte order is: Alpha (transparency) - Blue - Green - Red.

> If you do not want to use transparency, you can simply ignore the value in the **AA** position, e.g., `&HBBGGRR` is sufficient.

### Transparency and Color Values

- **Fully Transparent**: The color is completely transparent, i.e., invisible. The representation is `&H00BBGGRR`, where the `AA` part is `00` (fully transparent).

  **Example**:
  ```plaintext
  &H00FFFFFF
  ```
  - Here, `&H00FFFFFF` represents fully transparent white. Transparency is `00` (fully transparent), color is `FFFFFF` (white).

- **Fully Opaque**: The color is completely opaque, i.e., the color appears most solid. The representation is `&HFFBBGGRR`, where the `AA` part is `FF` (fully opaque).

  **Example**:
  ```plaintext
  &HFF000000
  ```
  - Here, `&HFF000000` represents fully opaque black. Transparency is `FF` (fully opaque), color is `000000` (black).

### Actual Color Examples

1. **Fully Transparent Red**:
   ```plaintext
   &H00FF0000
   ```
   - Transparency `00` (fully transparent), color `FF0000` (red).

2. **Fully Opaque Green**:
   ```plaintext
   &HFF00FF00
   ```
   - Transparency `FF` (fully opaque), color `00FF00` (green).

Summary:
- The `AA` part in `&HAABBGGRR` controls transparency, while the `BB`, `GG`, `RR` parts control the color.
- **Fully Transparent**: Transparency `00`, e.g., `&H00FF0000` represents fully transparent red.
- **Fully Opaque**: Transparency `FF`, e.g., `&HFFFF0000` represents fully opaque red.