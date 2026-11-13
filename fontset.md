---
title: Setting Subtitle Font
date: 2024-01-22 14:33:00
description: Soft subtitles cannot adjust font and size. Only when selecting hard subtitle embedding can you set the font, adjust size, subtitle position, and subtitle color.
---
## Setting Subtitle Font, Size, and Position

Soft subtitles cannot adjust font and size. Only when selecting hard subtitle embedding can you set the font, adjust size, subtitle position, and subtitle color.

First, upgrade to version 1.76+.

## Setting the Font

1. In the software interface, select "Hard Subtitle Embedding".
2. Determine the display name of the font. Note that this is not the font file name, but the font's own name, such as "Heiti" (Black), "Fangzheng Shuti" (Fangzheng Shu Style), etc. If you don't know the name, you can double-click to open the font file and view the font name displayed inside. Alternatively, create a Word document and find the font name in the font list.

Then open **Menu -> Tools/Options -> Advanced Options**, find `Hard Subtitle Font Name`, and change `Heiti` to your font name.

**You must ensure the font display name is filled in correctly; otherwise, subtitles may not display, show garbled text, or display in the default font style.**

## Setting the Text Size

1. Open **Menu -> Tools/Options -> Advanced Options**, find `Hard Subtitle Font Pixels`, and change `16` to your desired font size. By default, it displays at 16 pixels.

## Setting the Subtitle Position

Subtitles are displayed at the bottom of the video by default. If you want the display position to be higher, open **Menu -> Tools/Options -> Advanced Options**, find `Hard Subtitle Move Up Distance`, and change `0` to the distance you want the subtitles to move up.

For example, if your video height is 500px and you want subtitles to display 400px from the bottom, set it to `400`.

If you want to display them at the very top, set it to `480`. Why 480 and not 500?

Because the distance is calculated from the bottom of the subtitle. If it's 500, the subtitle will actually be displayed outside the video. The maximum height can only be (video height - 20), meaning you need to leave room for the text display height.

## Setting Subtitle Color (Default is White)

Open **Menu -> Tools/Advanced Settings -> Advanced Settings**, find `Hard Subtitle Text Color`, and change it to your desired color.

Note the 6 characters after `&H`. Each pair of letters represents BGR color, i.e., 2 digits for Blue / 2 digits for Green / 2 digits for Red. This is the reverse of the common RGB color order.

For example: White = &HFFFFFF, Black = &H000000, Blue = &HFF0000, Green = &H00FF00, Red = &H0000FF.

## Setting Subtitle Text Border Color (Default is Black, rules same as above)

`Hard Subtitle Text Border Color`