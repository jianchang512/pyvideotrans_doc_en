---
title: Creating a Worker in Cloudflare to Reverse Proxy the Google Translate API
date: 2024-01-22 14:33:00
description: Use your own domain and Cloudflare's Worker service to reverse proxy the Google Translate API, allowing you to use the Google Translate API without needing a VPN.
---
> Use your own domain and Cloudflare's Worker service to reverse proxy the Google Translate API, allowing you to use the Google Translate API without needing a VPN.

## Creating a Worker in Cloudflare to Reverse Proxy the API

Here are the detailed steps:

1. **Open the Cloudflare Console**: Visit https://dash.cloudflare.com/

2. **Create a Worker**:
   
   After logging in, select "Workers" from the left panel, then click "Create" to create a new Worker service.

   ![](https://pvtr2.pyvideotrans.com/images/428a26fc7fba2849daf9671ceb3f6882.jpg)

3. **Name your Worker**, then click Save.

   ![](https://pvtr2.pyvideotrans.com/images/38580f55d1044a40b0d3f3d9ffbca8d0.jpg)
   **After saving, continue by clicking "Done" in the bottom right corner.**

![](https://pvtr2.pyvideotrans.com/images/550732eaacaae0eed501062db8c40dcd.jpg)
   

4. **Edit the Code**:

   After completing the above steps, click "Edit code" in the top right to enter the code editor. Delete the default code, replace it with the following code, and then click the "Deploy" button in the top right to deploy.
   
   > This code already parses the translation result and will directly return the assembled result text.
   > 
   > A successful response will look similar to:
   > 
   > {code:0,msg:"ok",text:"Here is the translated text result."}
   > 
   > A failure response:
   > {code:1,msg:"Reason for failure"}

   ![](https://pvtr2.pyvideotrans.com/images/dd482a349bcde786c98227a611b9bc6f.jpg)

```
   
export default {
  async fetch(request, env, ctx) {
    let url = new URL(request.url);
    if(url.pathname.startsWith('/')){
      url.hostname="translate.googleapis.com"; 
      let new_request = new Request(url, request)
      let response=await fetch(new_request)
      if(response.status!==200){
        return new Response(JSON.stringify({code:1,msg:response.text}), {
          status: 200, 
          headers: {
            'content-type': 'application/json',
          },
        });
      }


      let jsonData = await response.json();
      let str=jsonData[0].map(it=>{
        return it[0]
      })

      let data={code:0,msg:"ok",text:str.join('')}

      return new Response(JSON.stringify(data), {
        status: 200, 
        headers: {
          'content-type': 'application/json', 
        },
      });
    }
    return await env.ASSETS.fetch(request);
  },
};

```

5. **Get the Route URL Address**:

   After successful deployment, click "Back" on the left, then click "Settings" -> "Triggers".
   ![](https://pvtr2.pyvideotrans.com/images/3ad225424ebd3fd84e4a5de6b5b47e86.jpg)
   
   ![](https://pvtr2.pyvideotrans.com/images/33dd79a23f12924d9f14c89db9c769ed.jpg)

   Click "Add custom domain" at the top to bind your own domain. It is highly recommended to do this because the `workers.dev` domain is blocked in China and cannot be used directly. By binding a custom domain, you can avoid the need for a VPN.


## Using it in Video Translation Software

Open the top-left settings menu -> Custom Translation API, fill in your API address and key (any value is fine), then test it.


> ![](https://pvtr2.pyvideotrans.com/images/4bcff733fdcd14be3b9f56ffa3d1541d.jpg)

If there are no issues, select "TransAPI" in the translation channel list, and you can happily use the Google Translate API for free.

> ![](https://pvtr2.pyvideotrans.com/images/8eb685c9a5cd1ccfeb049cf7f83eb1f2.jpg)