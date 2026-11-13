---
title: ChatTTS Frequently Asked Questions
date: 2024-01-22 14:33:00
description: ChatTTS Frequently Asked Questions
---

ChatTTS has gone viral, but its documentation is vague, especially regarding tone, prosody, and specific speaker control. After repeated testing and troubleshooting, I've finally gained some understanding, which I'm documenting below.

> UI interface open-source code address: https://github.com/jianchang512/chattts-ui
>
> ![](https://pvtr2.pyvideotrans.com/images/49c0cea156fee169155c6a79794e8bf8.jpg)

## Usable Control Symbols in Text

Control symbols can be inserted into the original text to be synthesized. Currently, two types can be controlled: **laughter** and **pause**.

**[laugh] represents laughter**

**[uv_break] represents a pause**

Example text:

```
text="Hello there[uv_break]friends, I heard today is a good day, isn't[uv_break]it[laugh]?"
```

During actual synthesis, `[laugh]` will be replaced by laughter, and a pause will be inserted at `[uv_break]`.

The intensity of laughter and pauses can be controlled by passing prompts in the `params_refine_text` parameter.

**laugh_(0-2) optional values:** laugh_0 laugh_1 laugh_2  Laughter becomes stronger/or?

**break_(0-7) optional values:** break_0 break_1 break_2 break_3 break_4 break_5 break_6 break_7  Pauses become increasingly more noticeable/or?.

Code example:

```

chat.infer([text],params_refine_text={"prompt":'[oral_2][laugh_0][break_6]'})
chat.infer([text],params_refine_text={"prompt":'[oral_2][laugh_2][break_4]'})

```
> However, actual testing found that the difference between [break_0] and [break_7] is not obvious, and the same applies to [laugh_0] and [laugh_2].


## Skipping the Refine Text Stage

During actual synthesis, the text is reorganized (refined) and control symbols are inserted. For example, the sample text above will ultimately be refined to:

``` 你 好 啊 [uv_break] 啊 [uv_break] 嗯 [uv_break] 朋 友 们 ， 听 说 今 天 是 个 好 日 子 ， 难 道 [uv_break] 嗯 [uv_break] 不 是 吗 [laugh] ？ [uv_break] ```

As you can see, the control symbols are not exactly as originally annotated. The actual synthesis effect may include unwanted pauses, noise, laughter, etc. So, how can we force synthesis according to the original text?

Set the `skip_refine_text` parameter to `True` to skip the refine text stage.

`chat.infer([text],skip_refine_text=True,params_refine_text={"prompt":'[oral_2][laugh_0][break_6]'})`


## Fixing the Speaker's Voice Timbre

By default, each synthesis randomly uses a different voice timbre, which is very unfriendly, and there is no specific explanation for voice selection.

To simply fix the speaker's role, first, manually set a random seed. Different seeds will produce different voice timbres.

`torch.manual_seed(2222)`

Then, obtain a random speaker.

`rand_spk = chat.sample_random_speaker()`

Pass it via the `params_infer_code` parameter.

`chat.infer([text], use_decoder=True,params_infer_code={'spk_emb': rand_spk})`

Based on testing, seeds `2222, 7869, 6653` produce male voices, and seeds `3333, 4099, 5099` produce female voices. For more roles, you can test by adjusting different seed numbers yourself.


## Speech Rate Control

Control the speech rate by setting `prompt` in the `params_infer_code` parameter of `chat.infer`.

`chat.infer([text], use_decoder=True,params_infer_code={'spk_emb': rand_spk,'prompt':'[speed_5]'})`

The optional range for speed values is not listed. The default in the source code is `speed_5`, but testing `speed_0` and `speed_7` did not reveal significant differences.


## WebUI Interface and Integrated Package

Open-source and download address: https://github.com/jianchang512/chatTTS-ui

After extracting the integrated package, double-click `app.exe`.

For source code deployment, follow the repository instructions.


## UI Interface Preview


![](https://pvtr2.pyvideotrans.com/images/8e44269a0200b8b43b4b216e1b741355.jpg)



![](https://pvtr2.pyvideotrans.com/images/3679419484e41a4a440349f06bb95002.jpg)