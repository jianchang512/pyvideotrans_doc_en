---
title: Bypassing Edge-TTS Errors by Deploying to Cloudflare
date: 2024-01-22 14:33:00
description: You can bypass the restrictions by deploying to Cloudflare and also get free server and bandwidth resources from Cloudflare.
---

Most people involved in voiceover know that Microsoft's Edge-TTS is a powerful, free, and easy-to-use text-to-speech tool. Its only drawback is the increasingly strict rate limiting for users in China. However, this can be bypassed by deploying to Cloudflare, and you can also get free server and bandwidth resources from Cloudflare.

First, let's see the result. After completion, you will have a voiceover API endpoint and a web-based voiceover interface.

![image.png](https://pvtr2.pyvideotrans.com/img/20241228183550-0.webp)

This is the web interface.

```js
const requestBody = {
          "model": "tts-1",
          "input": 'This is the text to be synthesized into speech.',
          "voice": 'zh-CN-XiaoxiaoNeural',
          "response_format": "mp3",
          "speed": 1.0
        };

const response = await fetch('Your URL after deploying to Cloudflare', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer Your deployed key, can be any value`,
            },
            body: JSON.stringify(requestBody),
});
```
This is the JavaScript function for calling the API, which is also compatible with the OpenAI TTS interface.

Next, let's talk about how to deploy it to Cloudflare.

## Log in to Cloudflare and Create a Worker

> URL: https://dash.cloudflare.com/ (How to log in and register is omitted)

After logging in, click `Workers and Pages` on the left to open the creation page.

![image.png](https://pvtr2.pyvideotrans.com/img/20241228183551-1.webp)

Click `Create Worker`.

![image.png](https://pvtr2.pyvideotrans.com/img/20241228183552-2.webp)

Then, in the input box that appears, fill in an English name as the prefix for the free subdomain provided by Cloudflare.

![image.png](https://pvtr2.pyvideotrans.com/img/20241228183552-3.webp)

After clicking `Deploy` in the bottom right corner, on the new page that appears, click `Edit code` to enter the core stage. Copy the code.

![image.png](https://pvtr2.pyvideotrans.com/img/20241228183552-4.webp)

Then delete all the code inside and replace it with the code below.

![image.png](https://pvtr2.pyvideotrans.com/img/20241228183553-5.webp)

```
// Custom API key to prevent abuse
const API_KEY = '';
const encoder = new TextEncoder();
let expiredAt = null;
let endpoint = null;
let clientId = "";


const TOKEN_REFRESH_BEFORE_EXPIRY = 3 * 60;  
let tokenInfo = {
    endpoint: null,
    token: null,
    expiredAt: null
};

addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    if (request.method === "OPTIONS") {
        return handleOptions(request);
    }
    
  
    const authHeader = request.headers.get("authorization") || request.headers.get("x-api-key");
    const apiKey = authHeader?.startsWith("Bearer ") 
        ? authHeader.slice(7) 
        : null;

    // Only validate if API_KEY is set              
    if (API_KEY && apiKey !== API_KEY) {
        return new Response(JSON.stringify({
            error: {
                message: "Invalid API key. Use 'Authorization: Bearer your-api-key' header",
                type: "invalid_request_error",
                param: null,
                code: "invalid_api_key"
            }
        }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
                ...makeCORSHeaders()
            }
        });
    }

    const requestUrl = new URL(request.url);
    const path = requestUrl.pathname;
    
    if (path === "/v1/audio/speech") {
        try {
            const requestBody = await request.json();
            const { 
                model = "tts-1",
                input,
                voice = "zh-CN-XiaoxiaoNeural",
                response_format = "mp3",
                speed = '1.0',
                volume='0',
                pitch = '0', // Add pitch parameter, default value is 0
                style = "general" // Add style parameter, default value is general
            } = requestBody;

            let rate = parseInt(String( (parseFloat(speed)-1.0)*100) );
            let numVolume = parseInt( String(parseFloat(volume)*100) );
            let numPitch = parseInt(pitch); 
            const response = await getVoice(
                input, 
                voice, 
                rate>=0?`+${rate}%`:`${rate}%`,
                numPitch>=0?`+${numPitch}Hz`:`${numPitch}Hz`,
                numVolume>=0?`+${numVolume}%`:`${numVolume}%`,
                style,
                "audio-24khz-48kbitrate-mono-mp3"
            );

            return response;

        } catch (error) {
            console.error("Error:", error);
            return new Response(JSON.stringify({
                error: {
                    message: error.message,
                    type: "api_error",
                    param: null,
                    code: "edge_tts_error"
                }
            }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                    ...makeCORSHeaders()
                }
            });
        }
    }

    // Default return 404
    return new Response("Not Found", { status: 404 });
}

async function handleOptions(request) {
    return new Response(null, {
        status: 204,
        headers: {
            ...makeCORSHeaders(),
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
            "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers") || "Authorization"
        }
    });
}

async function getVoice(text, voiceName = "zh-CN-XiaoxiaoNeural", rate = '+0%', pitch = '+0Hz', volume='+0%',style = "general", outputFormat = "audio-24khz-48kbitrate-mono-mp3") {
    try {
        const maxChunkSize = 2000;  
        const chunks = text.trim().split("\n");


        // Get audio for each segment
        //const audioChunks = await Promise.all(chunks.map(chunk => getAudioChunk(chunk, voiceName, rate, pitch, volume,style, outputFormat)));
        let audioChunks=[]
        while(chunks.length>0){
            try{
                let audio_chunk= await getAudioChunk(chunks.shift(), voiceName, rate, pitch, volume,style, outputFormat)
                audioChunks.push(audio_chunk)

            }catch(e){
                return new Response(JSON.stringify({
                    error: {
                        message: String(e),
                        type: "api_error",
                        param: `${voiceName}, ${rate}, ${pitch}, ${volume},${style}, ${outputFormat}`,
                        code: "edge_tts_error"
                    }
                }), {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json",
                        ...makeCORSHeaders()
                    }
                });

            }
        }
       

        // Concatenate audio segments
        const concatenatedAudio = new Blob(audioChunks, { type: 'audio/mpeg' });
        const response = new Response(concatenatedAudio, {
            headers: {
                "Content-Type": "audio/mpeg",
                ...makeCORSHeaders()
            }
        });

        
        return response;

    } catch (error) {
        console.error("Speech synthesis failed:", error);
        return new Response(JSON.stringify({
            error: {
                message: error,
                type: "api_error",
                param: null,
                code: "edge_tts_error "+voiceName
            }
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                ...makeCORSHeaders()
            }
        });
    }
}



// Get single audio data
async function getAudioChunk(text, voiceName, rate, pitch,volume, style, outputFormat='audio-24khz-48kbitrate-mono-mp3') {
    const endpoint = await getEndpoint();
    const url = `https://${endpoint.r}.tts.speech.microsoft.com/cognitiveservices/v1`;
    let m=text.match(/\[(\d+)\]\s*?$/);
    let slien=0;
    if(m&&m.length==2){
      slien=parseInt(m[1]);
      text=text.replace(m[0],'')

    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": endpoint.t,
            "Content-Type": "application/ssml+xml",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0",
            "X-Microsoft-OutputFormat": outputFormat
        },
        body: getSsml(text, voiceName, rate,pitch,volume, style,slien)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Edge TTS API error: ${response.status} ${errorText}`);
    }

    return response.blob();

}

function getSsml(text, voiceName, rate, pitch,volume,style,slien=0) {
   let slien_str='';
   if(slien>0){
    slien_str=`<break time="${slien}ms" />`
   }
    return `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" version="1.0" xml:lang="zh-CN"> 
                <voice name="${voiceName}"> 
                    <mstts:express-as style="${style}"  styledegree="2.0" role="default" > 
                        <prosody rate="${rate}" pitch="${pitch}" volume="${volume}">${text}</prosody> 
                    </mstts:express-as> 
                    ${slien_str}
                </voice> 
            </speak>`;

}

async function getEndpoint() {
    const now = Date.now() / 1000;
    
    if (tokenInfo.token && tokenInfo.expiredAt && now < tokenInfo.expiredAt - TOKEN_REFRESH_BEFORE_EXPIRY) {
        return tokenInfo.endpoint;
    }

    // Get new token
    const endpointUrl = "https://dev.microsofttranslator.com/apps/endpoint?api-version=1.0";
    const clientId = crypto.randomUUID().replace(/-/g, "");
    
    try {
        const response = await fetch(endpointUrl, {
            method: "POST",
            headers: {
                "Accept-Language": "zh-Hans",
                "X-ClientVersion": "4.0.530a 5fe1dc6c",
                "X-UserId": "0f04d16a175c411e",
                "X-HomeGeographicRegion": "zh-Hans-CN",
                "X-ClientTraceId": clientId,
                "X-MT-Signature": await sign(endpointUrl),
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0",
                "Content-Type": "application/json; charset=utf-8",
                "Content-Length": "0",
                "Accept-Encoding": "gzip"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to get endpoint: ${response.status}`);
        }

        const data = await response.json();
        const jwt = data.t.split(".")[1];
        const decodedJwt = JSON.parse(atob(jwt));
        
        tokenInfo = {
            endpoint: data,
            token: data.t,
            expiredAt: decodedJwt.exp
        };

        return data;

    } catch (error) {
        console.error("Failed to get endpoint:", error);
        // If there is a cached token, try to use it even if expired
        if (tokenInfo.token) {
            console.log("Using expired cached token");
            return tokenInfo.endpoint;
        }
        throw error;
    }
}

function addCORSHeaders(response) {
    const newHeaders = new Headers(response.headers);
    for (const [key, value] of Object.entries(makeCORSHeaders())) {
        newHeaders.set(key, value);
    }
    return new Response(response.body, { ...response, headers: newHeaders });
}

function makeCORSHeaders() {
    return {
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, x-api-key",
        "Access-Control-Max-Age": "86400"  
    };
}

async function hmacSha256(key, data) {
    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        key,
        { name: "HMAC", hash: { name: "SHA-256" } },
        false,
        ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(data));
    return new Uint8Array(signature);
}

async function base64ToBytes(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function bytesToBase64(bytes) {
    return btoa(String.fromCharCode.apply(null, bytes));
}

function uuid() {
    return crypto.randomUUID().replace(/-/g, "");
}

async function sign(urlStr) {
    const url = urlStr.split("://")[1];
    const encodedUrl = encodeURIComponent(url);
    const uuidStr = uuid();
    const formattedDate = dateFormat();
    const bytesToSign = `MSTranslatorAndroidApp${encodedUrl}${formattedDate}${uuidStr}`.toLowerCase();
    const decode = await base64ToBytes("oik6PdDdMnOXemTbwvMn9de/h9lFnfBaCWbGMMZqqoSaQaqUOqjVGm5NqsmjcBI1x+sS9ugjB55HEJWRiFXYFw==");
    const signData = await hmacSha256(decode, bytesToSign);
    const signBase64 = await bytesToBase64(signData);
    return `MSTranslatorAndroidApp::${signBase64}::${formattedDate}::${uuidStr}`;
}

function dateFormat() {
    const formattedDate = (new Date()).toUTCString().replace(/GMT/, "").trim() + " GMT";
    return formattedDate.toLowerCase();
}

// Add request timeout control
async function fetchWithTimeout(url, options, timeout = 30000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}
```

**It's especially important to note the first two lines of code, which set the API key to prevent abuse by others.**

```
// This is the API key, used to verify access permissions.
const API_KEY = '';
```

## Bind Your Own Domain

The default bound domain is `https://[the-prefix-you-filled-in].[your-account-name].workers.dev/`

Unfortunately, this domain is blocked in China. To use it without a VPN, you need to bind your own domain.

1. If you haven't added your own domain to Cloudflare before, click `Add Site` in the top right corner, then `Add an existing site`, and enter your domain.

![image.png](https://pvtr2.pyvideotrans.com/img/20241228183553-6.webp)

2. If you have already added a domain to Cloudflare, click the name on the left to return to the management interface, then add a custom domain.

![image.png](https://pvtr2.pyvideotrans.com/img/20241228183554-7.webp)

Click `Settings` -> `Domains and Routes` -> `Add`.

![image.png](https://pvtr2.pyvideotrans.com/img/20241228183554-8.webp)

Click `Custom Domain`, then fill in a subdomain of the domain you have already added to Cloudflare. For example, if my domain `pyvideotrans.com` is already added to Cloudflare, I can fill in `ttsapi.pyvideotrans.com` here.

![image.png](https://pvtr2.pyvideotrans.com/img/20241228183555-9.webp)

As shown below, the addition is complete.

![image.png](https://pvtr2.pyvideotrans.com/img/20241228183555-10.webp)

This area shows the custom domain you added.

![image.png](https://pvtr2.pyvideotrans.com/img/20241228183555-11.webp)

## Using It in Video Translation Software

> Please upgrade the software to v3.40 to use this feature. Upgrade download address: https://pyvideotrans.com/downpackage

Open the menu, go to `TTS Settings` -> `OpenAI TTS`. Change the endpoint address to `https://[replace-with-your-custom-domain]/v1`, fill in your API_KEY in the "SK" field. In the voice list, fill in the voices you want to use, separated by English commas.

![image.png](https://pvtr2.pyvideotrans.com/img/20241221155638-19.webp)

## Available Voices

The following is a list of available voices. Please note that the text language and the voice must match.

![image.png](https://pvtr2.pyvideotrans.com/img/20241221155639-20.webp)

```
Chinese Voices:
    zh-HK-HiuGaaiNeural
    zh-HK-HiuMaanNeural
    zh-HK-WanLungNeural
    zh-CN-XiaoxiaoNeural
    zh-CN-XiaoyiNeural
    zh-CN-YunjianNeural
    zh-CN-YunxiNeural
    zh-CN-YunxiaNeural
    zh-CN-YunyangNeural
    zh-CN-liaoning-XiaobeiNeural
    zh-TW-HsiaoChenNeural
    zh-TW-YunJheNeural
    zh-TW-HsiaoYuNeural
    zh-CN-shaanxi-XiaoniNeural

English Voices:
    en-AU-NatashaNeural
    en-AU-WilliamNeural
    en-CA-ClaraNeural
    en-CA-LiamNeural
    en-HK-SamNeural
    en-HK-YanNeural
    en-IN-NeerjaExpressiveNeural
    en-IN-NeerjaNeural
    en-IN-PrabhatNeural
    en-IE-ConnorNeural
    en-IE-EmilyNeural
    en-KE-AsiliaNeural
    en-KE-ChilembaNeural
    en-NZ-MitchellNeural
    en-NZ-MollyNeural
    en-NG-AbeoNeural
    en-NG-EzinneNeural
    en-PH-JamesNeural
    en-PH-RosaNeural
    en-SG-LunaNeural
    en-SG-WayneNeural
    en-ZA-LeahNeural
    en-ZA-LukeNeural
    en-TZ-ElimuNeural
    en-TZ-ImaniNeural
    en-GB-LibbyNeural
    en-GB-MaisieNeural
    en-GB-RyanNeural
    en-GB-SoniaNeural
    en-GB-ThomasNeural
    en-US-AvaMultilingualNeural
    en-US-AndrewMultilingualNeural
    en-US-EmmaMultilingualNeural
    en-US-BrianMultilingualNeural
    en-US-AvaNeural
    en-US-AndrewNeural
    en-US-EmmaNeural
    en-US-BrianNeural
    en-US-AnaNeural
    en-US-AriaNeural
    en-US-ChristopherNeural
    en-US-EricNeural
    en-US-GuyNeural
    en-US-JennyNeural
    en-US-MichelleNeural
    en-US-RogerNeural
    en-US-SteffanNeural

Japanese Voices:
    ja-JP-KeitaNeural
    ja-JP-NanamiNeural

Korean Voices:
    ko-KR-HyunsuNeural
    ko-KR-InJoonNeural
    ko-KR-SunHiNeural

French Voices:
    fr-BE-CharlineNeural
    fr-BE-GerardNeural
    fr-CA-ThierryNeural
    fr-CA-AntoineNeural
    fr-CA-JeanNeural
    fr-CA-SylvieNeural
    fr-FR-VivienneMultilingualNeural
    fr-FR-RemyMultilingualNeural
    fr-FR-DeniseNeural
    fr-FR-EloiseNeural
    fr-FR-HenriNeural
    fr-CH-ArianeNeural
    fr-CH-FabriceNeural

German Voices:
    de-AT-IngridNeural
    de-AT-JonasNeural
    de-DE-SeraphinaMultilingualNeural
    de-DE-FlorianMultilingualNeural
    de-DE-AmalaNeural
    de-DE-ConradNeural
    de-DE-KatjaNeural
    de-DE-KillianNeural
    de-CH-JanNeural
    de-CH-LeniNeural

Spanish Voices:
    es-AR-ElenaNeural
    es-AR-TomasNeural
    es-BO-MarceloNeural
    es-BO-SofiaNeural
    es-CL-CatalinaNeural
    es-CL-LorenzoNeural
    es-ES-XimenaNeural
    es-CO-GonzaloNeural
    es-CO-SalomeNeural
    es-CR-JuanNeural
    es-CR-MariaNeural
    es-CU-BelkysNeural
    es-CU-ManuelNeural
    es-DO-EmilioNeural
    es-DO-RamonaNeural
    es-EC-AndreaNeural
    es-EC-LuisNeural
    es-SV-LorenaNeural
    es-SV-RodrigoNeural
    es-GQ-JavierNeural
    es-GQ-TeresaNeural
    es-GT-AndresNeural
    es-GT-MartaNeural
    es-HN-CarlosNeural
    es-HN-KarlaNeural
    es-MX-DaliaNeural
    es-MX-JorgeNeural
    es-NI-FedericoNeural
    es-NI-YolandaNeural
    es-PA-MargaritaNeural
    es-PA-RobertoNeural
    es-PY-MarioNeural
    es-PY-TaniaNeural
    es-PE-AlexNeural
    es-PE-CamilaNeural
    es-PR-KarinaNeural
    es-PR-VictorNeural
    es-ES-AlvaroNeural
    es-ES-ElviraNeural
    es-US-AlonsoNeural
    es-US-PalomaNeural
    es-UY-MateoNeural
    es-UY-ValentinaNeural
    es-VE-PaolaNeural
    es-VE-SebastianNeural

Arabic Voices:
    ar-DZ-AminaNeural
    ar-DZ-IsmaelNeural
    ar-BH-AliNeural
    ar-BH-LailaNeural
    ar-EG-SalmaNeural
    ar-EG-ShakirNeural
    ar-IQ-BasselNeural
    ar-IQ-RanaNeural
    ar-JO-SanaNeural
    ar-JO-TaimNeural
    ar-KW-FahedNeural
    ar-KW-NouraNeural
    ar-LB-LaylaNeural
    ar-LB-RamiNeural
    ar-LY-ImanNeural
    ar-LY-OmarNeural
    ar-MA-JamalNeural
    ar-MA-MounaNeural
    ar-OM-AbdullahNeural
    ar-OM-AyshaNeural
    ar-QA-AmalNeural
    ar-QA-MoazNeural
    ar-SA-HamedNeural
    ar-SA-ZariyahNeural
    ar-SY-AmanyNeural
    ar-SY-LaithNeural
    ar-TN-HediNeural
    ar-TN-ReemNeural
    ar-AE-FatimaNeural
    ar-AE-HamdanNeural
    ar-YE-MaryamNeural
    ar-YE-SalehNeural
 
 
Bengali Voices:
    bn-BD-NabanitaNeural
    bn-BD-PradeepNeural
    bn-IN-BashkarNeural
    bn-IN-TanishaaNeural

Czech Voices
    cs-CZ-AntoninNeural
    cs-CZ-VlastaNeural

Dutch Voices:
    nl-BE-ArnaudNeural
    nl-BE-DenaNeural
    nl-NL-ColetteNeural
    nl-NL-FennaNeural
    nl-NL-MaartenNeural

Hebrew Voices:
    he-IL-AvriNeural
    he-IL-HilaNeural

Hindi Voices:
    hi-IN-MadhurNeural
    hi-IN-SwaraNeural

Hungarian Voices:
    hu-HU-NoemiNeural
    hu-HU-TamasNeural

Indonesian Voices:
    id-ID-ArdiNeural
    id-ID-GadisNeural

Italian Voices:
    it-IT-GiuseppeNeural
    it-IT-DiegoNeural
    it-IT-ElsaNeural
    it-IT-IsabellaNeural

Kazakh Voices:
    kk-KZ-AigulNeural
    kk-KZ-DauletNeural
    
Malay Voices:
    ms-MY-OsmanNeural
    ms-MY-YasminNeural

Polish Voices:
    pl-PL-MarekNeural
    pl-PL-ZofiaNeural

Portuguese Voices:
    pt-BR-ThalitaNeural
    pt-BR-AntonioNeural
    pt-BR-FranciscaNeural
    pt-PT-DuarteNeural
    pt-PT-RaquelNeural

Russian Voices:
    ru-RU-DmitryNeural
    ru-RU-SvetlanaNeural

Swahili Voices:
    sw-KE-RafikiNeural
    sw-KE-ZuriNeural
    sw-TZ-DaudiNeural
    sw-TZ-RehemaNeural

Thai Voices:
    th-TH-NiwatNeural
    th-TH-PremwadeeNeural

Turkish Voices:
    tr-TR-AhmetNeural
    tr-TR-EmelNeural

Ukrainian Voices:
    uk-UA-OstapNeural
    uk-UA-PolinaNeural

Vietnamese Voices:
    vi-VN-HoaiMyNeural
    vi-VN-NamMinhNeural

```

## Testing with OpenAI SDK

This interface is compatible with OpenAI, so you can test it directly using the OpenAI SDK, as shown in the following Python code.

```
import logging
from openai import OpenAI
import json
import httpx

api_key = 'adgas213423235saeg'  # Replace with your actual API key
base_url = 'https://xxx.xxx.com/v1' # Replace with your custom domain, default add /v1


client = OpenAI(
    api_key=api_key,
    base_url=base_url
)



data = {
    'model': 'tts-1',
    'input': 'Hello, dear friends',
    'voice': 'zh-CN-YunjianNeural',
    'response_format': 'mp3',
    'speed': 1.0,
}


try:
    response = client.audio.speech.create(
       **data
    )
    with open('./test_openai.mp3', 'wb') as f:
        f.write(response.content)
    print("MP3 file saved successfully to test_openai.mp3")

except Exception as e:
    print(f"An error occurred: {e}")

```

## Building the Web Interface

> Now that we have the API, how do we build the web page?

Open the project at https://github.com/pyvideotrans/tts-pyvideotrans2
Download and extract it, then place the three files `index.html`, `output.css`, and `vue.js` in a server directory. Access index.html to use it.

![image.png](https://pvtr2.pyvideotrans.com/img/20241228183556-12.webp)

**Note: In index.html, search for `https://ttsapi.pyvideotrans.com` and replace it with your custom domain deployed on Cloudflare, otherwise it won't work.**

## References

1. [edge-tts-openai-cf-worker](https://github.com/linshenkx/edge-tts-openai-cf-worker)
2. [edge-tts](https://github.com/rany2/edge-tts/)