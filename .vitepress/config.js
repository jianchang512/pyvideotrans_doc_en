import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitepress'

export default defineConfig({
	
	ignoreDeadLinks: true,
	cleanUrls:true,
    sitemap: {
		hostname: 'https://en.pyvideotrans.com',
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
  head: [
  	['meta', {name:'google-adsense-account', content:'ca-pub-3406672479111316'} ], 
  	['meta', {name:'keywords', content:'pyVideoTrans,pyVideoTrans website,pyVideoTrans documents,pyVideoTrans download,pyVideoTrans github'} ], 
    ['link', { rel: 'stylesheet', href: '/styles/custom.css?v=10'}],
	
	[
	  'script',
	  {
	    async:"",
		crossorigin:"anonymous",
		src:"/trans.js?v=20260126-1",
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
	]
  ], 


  title: "pyVideoTrans Official - Open Source Free Video Translation & Dubbing Software pyvideotrans.com pyvideotrans github github.com/jianchang512/pyvideotrans",
  description: "pyVideoTrans Video Translation Software: An open-source software that translates video audio and subtitles from one language to another. It is a free, open-source, and easy-to-use video translation and dubbing tool. pyVideoTrans official site: pyvideotrans.com, github.com/jianchang512/pyvideotrans. This software works by recognizing spoken voices in the video for translation and processing, independent of existing subtitles. As long as there is human speech in the video, it can be processed, regardless of whether the video contains subtitles.",
  lastUpdated:true,
  markdown: {
    image:{
			lazyLoading: true
		},
    theme: "one-dark-pro",
    lineNumbers: true, // Show line numbers
  },
  themeConfig: {
	logo:"https://pvtr2.pyvideotrans.com/images/logo.png",
	siteTitle:"pyVideoTrans",
	editLink: {
      pattern: 'https://github.com/jianchang512/pyvideotrans_doc_en/edit/main/:path'
    },
	outlineTitle: 'Title', // Outline Title
	outline: 'deep', // Outline display level: number: show specific level | [number, number]: show level range | 'deep': show all | false: do not show
    nav: [
				  { text: 'Home', link: '/' },
				  { text: 'Docs', link: '/getstart' },
				  { text: 'Download', link:'/downpackage'},
				  { text: 'Q&A', link:'https://bbs.pyvideotrans.com'},
				  { text: 'Donate', link:'/about'},
				  { text: '中文', link:'https://pyvideotrans.com'},
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
        text: 'Basic Usage',
		collapsed: false,
        items: [
          { text: 'Download for Windows', link: '/downpackage' },
          { text: 'Installation for MacOS/Linux', link: '/deply' },

          { text: 'User Guide', link: '/getstart' },		  		  		 
		  
		  { text: 'Single Video Precision Editing', link: '/danshipin' },	
			
		  { text: 'ASR Channel Guide & Intro', link: '/yuyinshibiequdao' },	
		  { text: 'Translation Channel Guide & Intro', link: '/fanyiqudao' },
		  { text: 'Dubbing Channel Guide & Intro', link: '/peiyinqudao' },
		  
		  
		  { text: 'Recommended Settings', link: '/bester' },
		  { text: 'Voice Cloning', link: '/multi-role-dubbing' },       
          { text: 'Short Video Optimization', link: '/duanshipin' },          
		  { text: "Import Local Subtitles or Vocals", link: "/localsrt" },
		  
		  { text: 'Advanced Options', link: '/adv' },		  
		  
		  
		  
		  { text: 'FAQ', link: '/faq' }
		  		  
        ]
      },
	  
	  {
        text: 'ASR Channels',
		collapsed: true,
        items: [
		  { text: 'ASR Channel Guide & Intro', link: '/yuyinshibiequdao' },
		  { text: 'faster-whisper Local', link: '/faster' },
		  { text: 'openai-whisper Local Mode', link: '/openaiwhisper' },
          { text: 'Alibaba FunASR Chinese', link: '/funasr' },         
          { text: 'ByteDance ASR Model Speed Ver', link: '/zijierecognmodel' },
          { text: 'OpenAI ASR API', link: '/openairecogn' },
          { text: 'Elevenlabs.io ASR', link: '/elevenlabsrecogn' },
          { text: 'Parakeet-tdt ASR', link: '/parakeet' },
          { text: 'Alibaba Bailian Qwen3-ASR', link: '/qwen-mt' },
          { text: 'Deepgram.com ASR API', link: '/deepgram' },
          { text: 'faster-whisper-xxl.exe ASR', link: '/xxl' },
		  { text: 'Whisper.cpp ASR',link:'/whisper-cli'},
		  { text: "Whisperx-api ASR",link:"/whisperx-api"},
          { text: 'Zhipu AI GLM-ASR', link: '/zhipu-ai' },
          { text: 'STT ASR API', link: '/stt' },
          { text: 'Custom ASR API', link: '/recognapi' },
		  
		  
  		  { text: "Select faster/openai Model",link:"/selectmodel"},
        ]
      },
	  
	  {
		text:"Translation Channels",
		collapsed: true,
		items:[
			{ text: 'Translation Channel Guide & Intro', link: '/fanyiqudao' },

			{ text: 'Microsoft Translate', link: '/microsoft' },
			{ text: 'Google Translate', link: '/googletranslate' },
			{ text: 'M2M100 Translate', link: '/m2m100' },
			{ text: 'Baidu Translate', link: '/baidu' },          
			{ text: 'Tencent Translate', link: '/tencent' },          
			{ text: 'Alibaba Machine Translation', link: '/alibaba-machine-translation' },          
			{ text: 'DeepL Translate', link: '/deepl' },
			{ text: 'DeepLX Translate', link: '/deeplx' },
			{ text: 'ByteDance Volcano Model Translate', link: '/zijiehuoshan' },          
			{ text: '302.AI Translate', link: '/302ai' },
			{ text: 'ChatGPT Translate', link: '/openai' },          
			{ text: 'Gemini Translate', link: '/gemini-recognition' },          
			{ text: 'ClaudeAI Translate', link: '/claude' },          
			{ text: 'LibreTranslate Translate', link: '/libretranslate' },          
			{ text: 'AzureGPT Translate', link: '/azure' },          
			{ text: 'Zhipu AI', link: '/zhipu-ai' },
			{ text: 'DeepSeek', link: '/deepseek-ai' },
			{ text: 'Alibaba Bailian API', link: '/qwen-mt' },
			{ text: 'SiliconFlow AI', link: '/siliconflow-ai' },
			{ text: 'OpenRouter.ai', link: '/openrouter-ai' },
			{ text: 'Custom Translation API', link: '/transapi' },
			{ text: 'Compatible AI/Local Model Translate', link: '/localllm' },
		]
	  },
	  {
		text:"Dubbing Channels",
		collapsed: true,
		items:[			
			{ text: 'Dubbing Channel Guide & Intro', link: '/peiyinqudao' },
			{ text: 'edge-TTS', link: '/edgetts' },
			{ text: 'VITS/Piper-TTS Channel', link: '/vitspiper' },
			{ text: 'CosyVoice', link: '/cosyvoice' },
			{ text: 'ChatTTS', link: '/chattts' },
			{ text: '302.AI Dubbing Integration', link: '/302ai' },
			{ text: 'FishTTS', link: '/fishtts' },
			{ text: 'F5/Spark/index/voxpcm/Dia-TTS', link: '/f5tts' },
			{ text: 'Gemini-TTS', link: '/gemini-tts' },
			{ text: 'ChatterBox-TTS', link: '/chatterbox' },
			{ text: 'Kokoro-TTS', link: '/kokorotts' },
			{ text: 'Azure TTS', link: '/azuretts' },
			{ text: 'GPT-SoVITS', link: '/gptsovits' },
			{ text: 'OpenAi-TTS', link: '/openaitts' },
			{ text: 'Qwen3-TTS', link: '/qwen-tts' },
			{ text: 'Elevenlabs.io', link: '/elevenlabstts' },
			{ text: 'Zhipu AI GLM-TTS', link: '/zhipu-ai' },
			{ text: 'Integrate Minimax Dubbing', link: '/minimaxi' },
			{ text: 'Custom TTS-API', link: '/ttsapi' },
			{ text: 'ByteDance TTS Model 2.0', link: '/doubao2tts' },
			{ text: 'Original Voice Cloning/Multi-Role Dubbing', link: '/multi-role-dubbing' },
			
		]
	  },
	  
	  
	  
	   {
        text: 'Optimization Tips',
		collapsed: true,
        items: [
			{ text: 'Edit Prompts', link: '/prompt' },		  
		  { text: 'Sync Subtitles, Audio, and Video', link: '/subtitle-sound-alignment' },
			{ text: "Use Existing Local SRT Files",link:"/localsrt"},
			{ text: 'Align Subtitles, Audio, and Video', link: '/subtitle-sound-alignment' },
			{ text: "Optimize ASR Accuracy and Segmentation",link:"/youhua"},
			
			{ text: 'Modify AI Translation Prompts', link: '/prompt' },
			{ text: 'Improve AI Subtitle Translation Quality', link: '/aitranslate' }
        ]
      },

	  	  
	 
	  
	  
	  {
		text:"FAQ",
		collapsed: false,
		items:[
		  { text: 'Add new language', link: '/newlanguage' },
		{ text: 'Command Line (CLI)', link: '/cli' },
		  { text: 'WebUI', link: '/webui' },
		  
        { text: 'Common Issues and Solutions', link: '/faq' },
		{ text: 'How to Handle Errors', link: '/reporterror' },
		{ text: 'Speaker Identification', link: '/shuohuaren' }, // Speaker Identification
		{ text: 'Configuring CUDA and cuDNN on Windows', link: '/gpu' },
		{ text: 'FunASR and pyside conflict during source deployment (paraformer-zh is not registered)', link: '/blog/paraformer-zh-is-not-registered' },
		{ text: 'Why Audio is Messy After Using Reference Audio', link: '/aittserror' },
		{ text: "edge-TTS Dubbing Error",link:"/edgetts-error"},
		{ text: 'Optimizing Local LLM Integration', link: '/llmbetter' },		
		{ text: 'How to Align Subtitles, Audio, and Video', link: '/subtitle-sound-alignment' },
 	    {text:"Common Network Connection Errors",link:"/httpconnecterror"},
  	    { text: 'Gemini Security Restriction Prompt', link: '/gemini-safe' } 
		]
	  },
	  
	  
	 
		{
		text:"Related Tool Integration Packages",
		collapsed: true,
		items:[
			{ text: 'Install CUDA 12.6 and cuDNN 9.8 on Windows', link: '/blog/cudacudnninstall' },
			{ text: 'How to Install Miniconda and Config AI Env on Windows 10', link: '/blog/installconda' },
			{ text: 'Master Python Projects with uv: Install to Run', link: '/blog/uv' },
			{ text: 'Install Visual Studio Community Free to Fix pip Errors', link: '/blog/visualstudiocomm' },
			{ text: 'NVIDIA RTX 5090 GPU Acceleration Not Working? Solutions Here', link: '/blog/5090s' },
		]
	  },
	   {
		text:"About This Project",
		collapsed: true,
		items:[
			{ text: 'Disclaimer', link: '/law' },
			{ text: 'About Us', link: '/guanyu' },
			{ text: 'Contact Us', link: '/lianxi' },
			{ text: 'Privacy Policy', link: '/yinsizhengce' },
			{ text: 'Terms of Use', link: '/xieyi' },
			{ text: 'Donation', link:'/about'},
			{ text: 'Support', link:'/support'},
			{ text: 'Blog', link:'/bloglist'},
		]
	  }
	 ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jianchang512' }
    ],
	footer: {
				 message: '<a target="_self"  href="/guanyu">About Us</a> | <a target="_self"  href="/lianxi">Contact Us</a> | <a target="_self"  href="/yinsizhengce">Privacy Policy</a> | <a target="_self"  href="/xieyi">Terms of Use</a> | <a  target="_self" href="/law">Disclaimer</a> | <a target="_self"  href="/support">Support</a> | <a  target="_self" href="https://github.com/jianchang512/pyvideotrans">GitHub:pyVideoTrans</a>',
      copyright: 'Copyright © 2019-present pyvideotrans.com'
				}
  }


})
