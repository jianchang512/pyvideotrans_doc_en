---
title: A Simple Prompt Can Make Large Language Models Better at "Free Translation"
date: 2025-04-01 23:04:18
description: Unlock a new approach for LLM translation! Say goodbye to stiff, literal translations. By using a simple prompt to "rewrite" the source text, you can guide the model to produce more fluent and natural free translations, significantly improving quality. Learn how a clever change in task description can free the model from the constraints of the source text, allowing it to express ideas naturally in the target language. This method is particularly effective for multilingual content translation. Simple to use and remarkably effective, it's a new powerful tool to enhance AI translation capabilities.

---

![](https://pvtr2.pyvideotrans.com/1743496135266_image.png)

In the past, I went to great lengths to get better translations from large language models. I tried various methods. Initially, it was literal translation followed by free translation, which later evolved into literal translation, reflection, and then free translation. The results did improve, but the process became increasingly complex.

Now that models are getting smarter, I started to think it might not be necessary to make things so complicated. Instead, I wanted to try "returning to basics" and find a simpler, more efficient prompting method.

I realized that sometimes translation results feel stiff precisely because the task itself is defined as "translation." When it's a "translation," the model follows the literal meaning faithfully, trying hard to preserve the original format and structure, which often leads to results that feel rigid and awkward.

This reminds me of learning English in school. When the teacher asked us to translate English into Chinese, we would usually follow the English words and sentence structure very closely. But if the teacher said "rewrite this in Chinese" instead of "translate," it felt much freer—we just needed to grasp the meaning of the English and express it naturally in Chinese, often with much better results.

So, recently, I tried asking the large language model not to rigidly "translate" but to "rewrite" in the target language for translation tasks. The results were indeed different! The translation was no longer confined by the source language's grammar but was expressed in a more natural and fluent way.

For example, in yesterday's OpenAI announcement about "Stargate," the last sentence was:
>
>“We want to connect with firms across the built data center infrastructure landscape, from power and land to construction to equipment, and everything in between.”
>

If translated literally, it might be:
“我们希望与整个数据中心基础设施领域的企业建立联系，从电力和土地到建设再到设备，以及这其中的所有环节。”

But if we "rewrite it in Chinese," it becomes much more idiomatic:
“我们希望跟数据中心基础设施相关的企业合作，涵盖电力、土地、建筑、设备等方方面面。”

As for how to do it? The prompt is actually super simple:
>“请尊重原意，保持原有格式不变，用简体中文重写下面的内容：”  
>Or the English version:  
>"Please respect the original meaning, maintain the original format, and rewrite the following content in Simplified Chinese:"

It works the same for translating into other languages—just change the target language in the prompt!

> @宝玉