import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitepress'

export default defineConfig({
	
	ignoreDeadLinks: true,
	cleanUrls:true,
    sitemap: {
		hostname: 'https://pyvideotrans.com',
		lastmodDateOnly:true,
		transformItems: (items) => {
		  // 添加新选项或修改/过滤现有选项
		  items=items.map(it=>{
			it['changefreq']='daily'
			return it
		  })
		  
		  return items
		}
	},
	locales: {
		root: {
		  label: '简体中文',
		  lang: 'zh',
		  link:'/',
		},
		en: {
		  label: 'English',
		  lang: 'en',
		  link:'/en/',
			title: "pyVideoTrans-Open Source Video Translation Tool -pyvideotrans.com github.com/jianchang512/pyvideotrans",
  description: "pyVideoTrans: is an open-source software that translates videos from one language to another in terms of pronunciation and subtitles,pyvideotrans.com,github.com/jianchang512/pyvideotrans",
			themeConfig:{
				nav: [
				  { text: 'Home', link: '/en' },
				  { text: 'Guide', link: '/en/getstart' },
				  { text: 'Download', link:'/en/downpackage'},
				  { text: 'BBS', link:'/en/bbs'},
				  { text: 'Support', link:'/en/support'}
				],
				footer: {
				  message: '<a target="_self" href="/en/guanyu">About</a> | <a target="_self"  href="/en/lianxi">Contact</a> | <a href="/en/yinsizhengce" target="_self" >Privacy Policy</a> | <a target="_self"  href="/en/xieyi">Terms of Use</a> | <a target="_self"  href="/en/law">Disclaimer</a> |  <a target="_self"  href="https://github.com/jianchang512/pyvideotrans">GitHub:pyVideoTrans</a>',
				  copyright: 'Copyright © 2019-present pvt9.com'
				},
				sidebar: [
      {
        "text": "Getting Started",
		"collapsed": false,
        "items": [
          { "text": "Quick Start", "link":"/en/getstart" },
          { "text": "Download", "link":"/en/downpackage" },
		  
		  { "text": "Speech Recognition Services Guide", "link":"/en/yuyinshibiequdao" },
		  { "text": "Translation Services Guide", "link":"/en/fanyiqudao" },
		  { "text": "Dubbing (TTS) Services Guide", "link":"/en/peiyinqudao" },

          { "text": "Deploy from Source on macOS", "link":"/en/mac" },     
          { "text": "Deploy from Source on Linux", "link":"/en/linux" },          
          { "text": "Deploy from Source on Windows", "link":"/en/deply" },

		  { "text": "Architecture and Principles", "link":"/en/yuanli" },
		  { "text": "Advanced Options", "link":"/en/adv" },
		  { "text": "Optimal Video Translation Settings", "link":"/en/bester" },
		  { "text": "Clone Voice", "link":"/en/multi-role-dubbing" },

		  { "text": "FAQ & Troubleshooting", "link":"/en/faq" },
		  { "text": "Handling Errors", "link":"/en/reporterror" }		  
        ]
      },
	  
	  {
        "text": "Speech Recognition",
		"collapsed": true,
        "items": [
		  { "text": "Introduction to Speech Recognition Services", "link":"/en/yuyinshibiequdao" },
		  { "text": "Local faster-whisper", "link":"/en/faster" },
		  { "text": "Fixing faster-whisper Model Download Errors", "link":"/en/faster-whisper-download-error" },
		  { "text": "Local openai-whisper Mode", "link":"/en/openaiwhisper" },
          { "text": "Alibaba FunASR (Chinese)", "link":"/en/funasr" },         
          { "text": "Google Speech-to-Text", "link":"/en/googlespeech" }, 
          { "text": "ByteDance Volcengine Subtitles", "link":"/en/doubao" },
          { "text": "OpenAI Speech to Text API", "link":"/en/openairecogn" },
          { "text": "Elevenlabs.io Speech to Text", "link":"/en/elevenlabsrecogn" },
          { "text": "Parakeet-TDT Speech Recognition", "link":"/en/parakeet" },
          { "text": "Gemini Recognition", "link":"/en/gemini-recognition" },
          { "text": "Alibaba Qwen3-ASR", "link":"/en/qwen-mt" },
          { "text": "Deepgram.com API", "link":"/en/deepgram" },
          { "text": "faster-whisper-xxl.exe", "link":"/en/xxl" },
          { "text": "Custom Recognition API", "link":"/en/recognapi" },
          { "text": "STT API", "link":"/en/stt" },
		  
		  { "text": "Speaker Diarization", "link":"/en/shuohuaren" },
		  { "text": "Re-segmenting Transcripts", "link":"/en/blog/rephrase-llm" },
		  { "text": "Full vs. Segmented Recognition", "link":"/en/splitmode" },
  		  { "text": "Choosing a faster/openai Model", "link":"/en/selectmodel"},
          { "text": "Using Gladia for Recognition", "link":"/en/gladia" },		  
		  { "text": "Adding Hugging Face Models", "link":"/en/blog/huggingface" }
        ]
      },
	  
	  {
		"text":"Translation",
		"collapsed": true,
		"items":[
			{ "text": "Introduction to Translation Services", "link":"/en/fanyiqudao" },

			{ "text": "Microsoft Translator", "link":"/en/microsoft" },
			{ "text": "Google Translate", "link":"/en/googletranslate" },
			{ "text": "Baidu Translate", "link":"/en/baidu" },          
			{ "text": "Tencent Translate", "link":"/en/tencent" },          
			{ "text": "Alibaba Machine Translation", "link":"/en/alibaba-machine-translation" },          
			{ "text": "DeepL", "link":"/en/deepl" },
			{ "text": "DeepLX", "link":"/en/deeplx" },
			{ "text": "ByteDance Volcengine Translate", "link":"/en/zijiehuoshan" },          
			{ "text": "302.AI Translate", "link":"/en/302ai" },
			{ "text": "ChatGPT", "link":"/en/openai" },          
			{ "text": "Gemini", "link":"/en/gemini-recognition" },          
			{ "text": "Claude", "link":"/en/claude" },          
			{ "text": "LibreTranslate", "link":"/en/libretranslate" },          
			{ "text": "Azure OpenAI", "link":"/en/azure" },          
			{ "text": "MyMemory API", "link":"/en/mymemory" },
			{ "text": "Zhipu AI", "link":"/en/zhipu-ai" },
			{ "text": "DeepSeek", "link":"/en/deepseek-ai" },
			{ "text": "Alibaba Bailian API", "link":"/en/qwen-mt" },
			{ "text": "SiliconFlow", "link":"/en/siliconflow-ai" },
			{ "text": "OpenRouter.ai", "link":"/en/openrouter-ai" },
			{ "text": "OTT", "link":"/en/ott" },
			{ "text": "Custom Translation API", "link":"/en/transapi" },
			{ "text": "Local & AI Model Integration", "link":"/en/localllm" },
			{ "text": "Local/Domestic AI Integration", "link":"/en/localllm" },
			{ "text": "Using GroqCloud", "link":"/en/groq"}
		]
	  },
	  {
		"text":"Dubbing (TTS)",
		"collapsed": true,
		"items":[			
			{ "text": "Introduction to Dubbing (TTS) Services", "link":"/en/peiyinqudao" },
			{ "text": "Microsoft Edge TTS", "link":"/en/edgetts" },
			{ "text": "CosyVoice", "link":"/en/cosyvoice" },
			{ "text": "ChatTTS", "link":"/en/chattts" },
			{ "text": "302.AI TTS", "link":"/en/302ai" },
			{ "text": "Fish-TTS", "link":"/en/fishtts" },
			{ "text": "F5/Spark/index/Dia-TTS", "link":"/en/f5tts" },
			{ "text": "Gemini TTS", "link":"/en/gemini-tts" },
			{ "text": "ChatterBox-TTS", "link":"/en/chatterbox" },
			{ "text": "Kokoro-TTS", "link":"/en/kokorotts" },
			{ "text": "Azure TTS", "link":"/en/azuretts" },
			{ "text": "GPT-SoVITS", "link":"/en/gptsovits" },
			{ "text": "OpenAI TTS", "link":"/en/openaitts" },
			{ "text": "Qwen3-TTS", "link":"/en/qwen-tts" },
			{ "text": "Elevenlabs.io", "link":"/en/elevenlabstts" },
			{ "text": "Minimaxi TTS Integration", "link":"/en/minimaxi" },
			{ "text": "Custom TTS API", "link":"/en/ttsapi" },
			{ "text": "ByteDance Volcengine TTS", "link":"/en/volcenginetts" },
			{ "text": "Voice Cloning & Multi-Role Dubbing", "link":"/en/multi-role-dubbing" },
			{ "text": "Multi-Role Dubbing for Subtitles", "link":"/en/multi-role-dubbing" }
		]
	  },
	  
	   {
        "text": "Subtitle & Translation Tips",
		"collapsed": true,
        "items": [
			{ "text": "Improving Recognition Accuracy and Segmentation", "link":"/en/youhua"},
			{ "text": "Fine-tuning VAD for Better Accuracy", "link":"/en/vad"},
			
			{ "text": "Handling Blank Lines or Prompts in Translation", "link":"/en/faq17" },
			
			{ "text": "Using Local SRT Files", "link":"/en/localsrt"},
			{ "text": "Translating Subtitles with Local LLMs", "link":"/en/_posts/llmbetter" },

			{ "text": "Customizing Translation Prompts", "link":"/en/prompt" },
			{ "text": "Improving AI Translation Quality", "link":"/en/aitranslate" }
        ]
      },

	  {
		"text":"FAQ",
		"collapsed": true,
		"items":[
		{ "text": "Configuring CUDA & cuDNN on Windows", "link":"/en/gpu" },
        { "text": "Common Issues & Solutions", "link":"/en/faq" },
		{ "text": "Handling Blank Lines or Prompts in Translation", "link":"/en/faq17" },
		{ "text": "Best Practices for Service Combinations", "link":"/en/qudao" },
		{ "text": "Fixing faster-whisper Model Download Errors", "link":"/en/819" },
		{ "text": "Fix: FunASR & PySide Conflict (paraformer-zh)", "link":"/en/blog/paraformer-zh-is-not-registered" },
		{ "text": "Why is synthesized audio messy with reference audio?", "link":"/en/aittserror" },
		{ "text": "edge-TTS Dubbing Errors", "link":"/en/edgetts-error"},
		{ "text": "Optimizing Local LLM Integration", "link":"/en/llmbetter" },		
		{ "text": "Aligning Subtitles, Audio, and Video", "link":"/en/subtitle-sound-alignment" },
 	    { "text": "Common Network Errors", "link":"/en/httpconnecterror"},
  	    { "text": "Gemini Safety Restrictions", "link":"/en/gemini-safe" } 
		]
	  },
	  	{
        "text": "Batch Processing",
		"collapsed": true,
        "items": [
			{ "text": "Batch Merge Video & Subtitles", "link":"/en/videoandsrt" },
		  { "text": "Audio/Video Transcription & Conversion", "link":"/en/speech2text" },
		  { "text": "Batch Subtitle Translation", "link":"/en/translate-srt" },
		  
		  { "text": "Batch Merge Video & Subtitles", "link":"/en/videoandsrt" },
		  { "text": "Batch Merge Video & Audio", "link":"/en/videoandaudio" },
		  { "text": "Batch Add Watermarks", "link":"/en/shuiyin" }		  
		
		]
	  },
	 
		{
		"text":"Tool Packages",
		"collapsed": true,
		"items":[
			{ "text": "VoxCPM-0.5B Voice Cloning Package", "link":"/en/voxpcm-0.5b" },
			{ "text": "Parakeet Windows Package", "link":"/en/blog/parakeet-win" },
			{ "text": "Index-TTS 1.5 Windows Package", "link":"/en/blog/index-tts-windows" },
			{ "text": "Index-TTS 2 Windows Package", "link":"/en/blog/index-tts2-windows-package" },
			{ "text": "CosyVoice2 Windows Package", "link":"/en/cosyvoice-win" },
			{ "text": "Dolphin Package", "link":"/en/blog/dolphin-win" },
			{ "text": "FireRed-TTS2 Package", "link":"/en/blog/fireredtts2" },
			{ "text": "FireRedASR Package", "link":"/en/fireredasr" },
			{ "text": "Creating an F5-TTS Windows Package", "link":"/en/blog/zhizuozhenghebao" },
			{ "text": "Installing spark-tts (Beginner's Guide)", "link":"/en/blog/spark-tts" },
			{ "text": "MegaTTS3 Voice Cloning", "link":"/en/blog/megatts3-windows" },
			{ "text": "Installing Python 3.10 on Windows", "link":"/en/_posts/pythoninstall"},
			{ "text": "Installing CUDA 12.6 & cuDNN 9.8 on Windows", "link":"/en/blog/cudacudnninstall" },
			{ "text": "Installing Miniconda & AI Environment on Windows 10", "link":"/en/blog/installconda" },
			{ "text": "Managing Python Projects with `uv`", "link":"/en/blog/uv" },
			{ "text": "Fixing pip errors with Visual Studio Community", "link":"/en/blog/visualstudiocomm" },
			{ "text": "Fixing RTX 5090 GPU Acceleration Issues", "link":"/en/blog/5090s" }
		]
	  },
	  
	   {
		"text":"Online Tools",
		"collapsed": true,
		"items":[
			{
				"text":"Online Subtitle Translator",
				"link":"/en/srtonline/index.html"
			},
			{
				"text":"Online Text-to-Speech",
				"link":"/en/ttsonline/index.html"
			},
			{
				"text":"Online Speech Recognition",
				"link":"https://stt.pyvideotrans.com"
			},
			
			{
				"text":"Audio Editor",
				"link":"https://audio.pyvideotrans.com"
			},
			{
				"text":"Subtitle Editor",
				"link":"https://srteditor.pyvideotrans.com"
			},
			{
				"text":"Video Tools",
				"link":"https://tool.pyvideotrans.com"
			},		
			{
				"text":"Transcribe to SRT with Gemini",
				"link":"https://pyvideotrans.com/gemini"
			},		
			{
				"text":"Extract Hardcoded Subtitles with AI",
				"link":"https://pyvideotrans.com/aiocr"
			},	
			{
				"text":"Voice Bridge",
				"link":"https://pyvideotrans.com/voice-bridge.html"
			},			
			
			{
				"text":"Other Online Tools",
				"link":"https://web.pyvideotrans.com"
			}
		]
	  },
	   {
		"text":"About",
		"collapsed": true,
		"items":[
			{ "text": "Disclaimer", "link":"/en/law" },
			{ "text": "About Us", "link":"/en/guanyu" },
			{ "text": "Contact Us", "link":"/en/lianxi" },
			{ "text": "Privacy Policy", "link":"/en/yinsizhengce" },
			{ "text": "Terms of Service", "link":"/en/xieyi" },
			{ "text": "Donate", "link":"/en/about"},
			{ "text": "Support", "link":"/en/support"},
			{ "text": "Blog", "link":"/en/bloglist"}
		]
	  }
]
				
			}
		},
	},
  head: [
  	['meta', {name:'google-adsense-account', content:'ca-pub-3406672479111316'} ], 
    ['link', { rel: 'stylesheet', href: '/styles/custom.css?v=1'}],
	
	[
	  'script',
	  {
	    async:"",
		crossorigin:"anonymous",
		src:"/trans.js?v=3",
	  }
	],
	[
		'script',
		{
			async:"",
			crossorigin:"anonymous",
			src:"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3406672479111316"
		}
	], 
	[
		'script',
		{
			async:"",
			src:"https://fundingchoicesmessages.google.com/i/pub-3406672479111316?ers=1"
		}
	], 
	
	[
		'script',
		{
			async:"",
			crossorigin:"anonymous",
			src:"https://www.googletagmanager.com/gtag/js?id=G-REESJ8DJBE"
		}
	],
	[
		'script',
		{
			async:"",
			crossorigin:"anonymous",	src:"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3406672479111316"
		}
	],
	[
	  'script',
	  {
		crossorigin:"anonymous",
		src:"/listen.js?v=90",
	  }
	],
	
  ], 

  title: "pyVideoTrans官网-开源免费视频翻译配音软件 pyvideotrans.com pyvideotrans github github.com/jianchang512/pyvideotrans",
  description: "pyVideoTrans视频翻译软件：是一款将视频从一种语言翻译到另一种语言发音和字幕的开源软件,是开源免费使用简单的视频翻译配音软件，pyVideoTrans官网，pyvideotrans.com ,github.com/jianchang512/pyvideotrans 本软件通过识别视频中的说话声音来进行翻译和处理，与视频中原有的字幕无关。只要视频里有人类说话的声音，就可以进行处理，无论视频是否包含字幕。",
  lastUpdated:true,
  markdown: {
    image:{
			lazyLoading: true
		},
    theme: "one-dark-pro",
    lineNumbers: true, // 显示代码行数
  },
  themeConfig: {
	logo:"https://pvtr2.pyvideotrans.com/images/logo.png",
	siteTitle:"pyVideoTrans",
	outlineTitle: 'Title', // 大纲标题
	outline: 'deep', // 大纲显示层级：number：只显示 | [number, number]：指定层级范围显示 | 	'deep'：全部显示 | false：不显示
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/getstart' },
      { text: '下载', link:'/downpackage'},
      { text: '问答', link:'/bbs'},
      { text: '技术支持', link:'/support'},
      { text: '捐助', link:'/donate'}
    ],
	search: {
		provider: 'local',
		options: {
			appId: "WTORNCA1LD",
			apiKey: "d877f2feafb115eb526d349a521be0d0",
			indexName: "pyvideotrans"
		}
    },

    sidebar: [
      {
        text: '基础使用',
		collapsed: false,
        items: [
          { text: '使用入门', link: '/getstart' },
          { text: '下载软件', link: '/downpackage' },
		  
		  { text: '语音识别渠道说明', link: '/yuyinshibiequdao' },
		  { text: '翻译渠道说明', link: '/fanyiqudao' },
		  { text: '配音渠道说明', link: '/peiyinqudao' },

          { text: 'MacOS源码部署', link: '/mac' },     
          { text: 'Linux源码部署', link: '/linux' },          
          { text: 'Windows源码部署', link: '/deply' },

		  { text: '技术架构与实现原理', link: '/yuanli' },
		  { text: '高级选项参数说明', link: '/adv' },
		  { text: '视频翻译最佳配置', link: '/bester' },
		  { text: '音色克隆/多角色配音', link: '/multi-role-dubbing' },

		  { text: 'FAQ常见问题与解决', link: '/faq' },
		  { text: '遇到报错如何处理', link: '/reporterror' }		  
        ]
      },
	  
	  {
        text: '语音识别渠道',
		collapsed: true,
        items: [
		  { text: '语音识别渠道说明与介绍', link: '/yuyinshibiequdao' },
		  { text: 'faster-whisper本地', link: '/faster' },
		  { text: 'faster模型下载失败解决办法', link: '/faster-whisper-download-error' },
		  { text: 'openai-whisper本地模式', link: '/openaiwhisper' },
          { text: '阿里FunASR中文识别', link: '/funasr' },         
          { text: 'GoogleSpeech语音识别', link: '/googlespeech' }, 
          { text: '字节火山字幕生成', link: '/doubao' },
          { text: 'OpenAI语音识别API', link: '/openairecogn' },
          { text: 'Elevenlabs.io语音识别', link: '/elevenlabsrecogn' },
          { text: 'Parakeet-tdt语音识别', link: '/parakeet' },
          { text: 'Gemini大模型识别', link: '/gemini-recognition' },
          { text: '阿里百联Qwen3-ASR语音识别', link: '/qwen-mt' },
          { text: 'Deepgram.com语音识别api', link: '/deepgram' },
          { text: 'faster-whisper-xxl.exe语音识别', link: '/xxl' },
          { text: '自定义语音识别API', link: '/recognapi' },
          { text: 'STT语音识别API', link: '/stt' },
		  
		  { text: '说话人识别', link: '/shuohuaren' }, // 说话人识别
		  { text: '对转录识别结果重新断句', link: '/blog/rephrase-llm' },
		  { text: '整体识别/均等分割的区别', link: '/splitmode' },
  		  { text: "faster/openai选择模型",link:"/selectmodel"},
          { text: '使用Gladia进行语音识别', link: '/gladia' },		  
		  { text: '添加huggingface模型', link: '/blog/huggingface' }
        ]
      },
	  
	  {
		text:"翻译渠道",
		collapsed: true,
		items:[
			{ text: '翻译渠道说明与介绍', link: '/fanyiqudao' },

			{ text: 'Microsoft翻译', link: '/microsoft' },
			{ text: 'Google翻译', link: '/googletranslate' },
			{ text: '百度翻译', link: '/baidu' },          
			{ text: '腾讯翻译', link: '/tencent' },          
			{ text: '阿里巴巴机器翻译', link: '/alibaba-machine-translation' },          
			{ text: 'DeepL翻译', link: '/deepl' },
			{ text: 'DeepLX翻译', link: '/deeplx' },
			{ text: '字节火山大模型翻译', link: '/zijiehuoshan' },          
			{ text: '302.AI翻译', link: '/302ai' },
			{ text: 'ChatGPT翻译', link: '/openai' },          
			{ text: 'Gemini翻译', link: '/gemini-recognition' },          
			{ text: 'ClaudeAI翻译', link: '/claude' },          
			{ text: 'LibreTranslate翻译', link: '/libretranslate' },          
			{ text: 'AzureGPT翻译', link: '/azure' },          
			{ text: 'MyMemoryAPI', link: '/mymemory' },
			{ text: '智谱AI', link: '/zhipu-ai' },
			{ text: 'DeepSeek', link: '/deepseek-ai' },
			{ text: '阿里百炼API', link: '/qwen-mt' },
			{ text: '硅基流动', link: '/siliconflow-ai' },
			{ text: 'OpenRouter.ai', link: '/openrouter-ai' },
			{ text: 'OTT', link: '/ott' },
			{ text: '自定义翻译api', link: '/transapi' },
			{ text: '兼容AI/本地模型翻译', link: '/localllm' },
			{ text: '本地大模型/国产AI接入', link: '/localllm' },
			{ text: "对接使用GroqCloud",link:"/groq"},
		]
	  },
	  {
		text:"配音渠道",
		collapsed: true,
		items:[			
			{ text: '配音渠道说明与介绍', link: '/peiyinqudao' },
			{ text: 'edge-TTS', link: '/edgetts' },
			{ text: 'CosyVoice', link: '/cosyvoice' },
			{ text: 'ChatTTS', link: '/chattts' },
			{ text: '302.AI接入配音', link: '/302ai' },
			{ text: 'FishTTS', link: '/fishtts' },
			{ text: 'F5/Spark/index/Dia-TTS', link: '/f5tts' },
			{ text: 'Gemini-TTS', link: '/gemini-tts' },
			{ text: 'ChatterBox-TTS', link: '/chatterbox' },
			{ text: 'Kokoro-TTS', link: '/kokorotts' },
			{ text: 'Azure TTS', link: '/azuretts' },
			{ text: 'GPT-SoVITS', link: '/gptsovits' },
			{ text: 'OpenAi-TTS', link: '/openaitts' },
			{ text: 'Qwen3-TTS', link: '/qwen-tts' },
			{ text: 'Elevenlabs.io', link: '/elevenlabstts' },
			{ text: '接入Minimaxi配音', link: '/minimaxi' },
			{ text: '自定义TTS-API', link: '/ttsapi' },
			{ text: '字节火山语音合成', link: '/volcenginetts' },
			{ text: '原音色克隆/多角色配音', link: '/multi-role-dubbing' },
			{ text: '字幕多角色配音', link: '/multi-role-dubbing' }, // 多角色配音
			
		]
	  },
	  
	  
	  
	   {
        text: '字幕生成和翻译技巧',
		collapsed: true,
        items: [
			{ text: "优化语音识别精度和断句效果",link:"/youhua"},
			{ text: "调节VAD更精确控制语音识别结果",link:"/vad"},
			
			{ text: '翻译结果有空白行或输出了提示词', link: '/faq17' },
			
			{ text: "使用本地已有的SRT字幕文件",link:"/localsrt"},
			{ text: '使用本地大模型翻译字幕', link: '/_posts/llmbetter' },

			{ text: '修改AI渠道翻译提示词', link: '/prompt' },
			{ text: '提高AI渠道翻译字幕的质量', link: '/aitranslate' },



			
        ]
      },

	  	  
	 
	  
	  
	  {
		text:"常见问题",
		collapsed: true,
		items:[
		{ text: 'Windos上配置CUDA和cuDNN', link: '/gpu' },
        { text: '各种常见问题与解决方法', link: '/faq' },
		{ text: '翻译结果有空白行或输出了提示词', link: '/faq17' },
		{ text: '各种渠道与组合最佳实践', link: '/qudao' },
		{ text: 'faster下载模型失败解决办法', link: '/819' },
		{ text: '源码部署时FunASR和pyside冲突解决(paraformer-zh is not registered)', link: '/blog/paraformer-zh-is-not-registered' },
		{ text: '使用参考音频后合成声音后乱糟糟是怎么回事', link: '/aittserror' },
		{ text: "edge-TTS配音出错",link:"/edgetts-error"},
		{ text: '优化本地大模型接入', link: '/llmbetter' },		
		{ text: '如何将字幕声音画面对齐', link: '/subtitle-sound-alignment' },
 	    {text:"常见网络连接错误",link:"/httpconnecterror"},
  	    { text: 'Gemini提示安全限制', link: '/gemini-safe' } 
		]
	  },
	  	{
        text: '批量功能',
		collapsed: true,
        items: [
			{ text: '批量视频字幕合并', link: '/videoandsrt' },
		  { text: '音频视频转字幕/字幕合成语音/格式转换', link: '/speech2text' },
		  { text: '批量字幕翻译', link: '/translate-srt' },
		  
		  { text: '批量视频和字幕合并', link: '/videoandsrt' },
		  { text: '批量视频和音频合并', link: '/videoandaudio' },
		  { text: '批量视频添加水印', link: '/shuiyin' },		  
		
		]
	  },
	 
		{
		text:"相关工具整合包",
		collapsed: true,
		items:[
			{ text: 'VoxCPM-0.5B 音色克隆一键整合包', link: '/voxpcm-0.5b' },
			{ text: 'Parakeet 整合包win版', link: '/blog/parakeet-win' },
			{ text: 'Index-TTS1.5整合包win版', link: '/blog/index-tts-windows' },
			{ text: 'Index-TTS2 整合包win版', link: '/blog/index-tts2-windows-package' },
			{ text: 'CosyVoice2 整合包win版', link: '/cosyvoice-win' },
			{ text: 'Dolphin整合包', link: '/blog/dolphin-win' },
			{ text: '小红书FireRed-TTS2一键整合包', link: '/blog/fireredtts2' },
			{ text: '小红书FireRedASR整合包', link: '/fireredasr' },
			{ text: '从零开始制作 F5-TTS Windows 整合包', link: '/blog/zhizuozhenghebao' },
			{ text: '安装spark-tts:小白适用零基础版', link: '/blog/spark-tts' },
			{ text: '语音克隆 MegaTTS3', link: '/blog/megatts3-windows' },
			{ text: 'window上安装python3.10', link: '/_posts/pythoninstall'},
			{ text: 'windows上安装CUDA12.6和cuDNN9.8', link: '/blog/cudacudnninstall' },
			{ text: '如何在 Windows 10 上安装 Miniconda 并配置 AI 软件环境', link: '/blog/installconda' },
			{ text: '用 uv 轻松玩转 Python 项目：从安装到运行，一步到位', link: '/blog/uv' },
			{ text: '安装 Visual Studio Community 免费版,解决pip安装失败问题', link: '/blog/visualstudiocomm' },
			{ text: '英伟达 RTX 5090 装机后无法使用 GPU 加速？别急，这里有解决办法', link: '/blog/5090s' },
		]
	  },
	  
	   {
		text:"在线资源",
		collapsed: true,
		items:[
			{
				text:"在线字幕翻译",
				link:"/srtonline/index.html"
			},
			{
				text:"在线文字配音",
				link:"/ttsonline/index.html"
			},
			{
				text:"在线语音识别",
				link:"https://stt.pyvideotrans.com"
			},
			
			{
				text:"音频编辑",
				link:"https://audio.pyvideotrans.com"
			},
			{
				text:"字幕编辑",
				link:"https://srteditor.pyvideotrans.com"
			},
			{
				text:"视频处理",
				link:"https://tool.pyvideotrans.com"
			},		
			{
				text:"Gemini转写音视频为SRT",
				link:"https://pyvideotrans.com/gemini"
			},		
			{
				text:"AI提取硬字幕为SRT",
				link:"https://pyvideotrans.com/aiocr"
			},	
			{
				text:"麦时语",
				link:"https://pyvideotrans.com/voice-bridge.html"
			},			
			
			{
				text:"其他在线工具",
				link:"https://web.pyvideotrans.com"
			}
		]
	  },
	   {
		text:"关于本项目",
		collapsed: true,
		items:[
			{ text: '免责声明', link: '/law' },
			{ text: '关于我们', link: '/guanyu' },
			{ text: '联系我们', link: '/lianxi' },
			{ text: '隐私政策', link: '/yinsizhengce' },
			{ text: '使用协议', link: '/xieyi' },
			{ text: '小额捐赠', link:'/about'},
			{ text: '技术支持', link:'/support'},
			{ text: '博客', link:'/bloglist'},
		]
	  }
	  
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jianchang512' }
    ],
	footer: {
      message: '<a target="_self"  href="/guanyu">关于我们</a> | <a target="_self"  href="/lianxi">联系我们</a> | <a target="_self"  href="/yinsizhengce">隐私政策</a> | <a target="_self"  href="/xieyi">使用协议</a> | <a  target="_self" href="/law">免责声明</a> | <a target="_self"  href="/support">技术支持</a> | <a  target="_self" href="https://github.com/jianchang512/pyvideotrans">GitHub:pyVideoTrans</a>',
      copyright: 'Copyright © 2019-present pyvideotrans.com pvt9.com'
    }
  }
})
