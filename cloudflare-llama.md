---
title: Deploy 70b Large Models Online with Cloudflare's Workers AI
date: 2024-01-22 14:33:00
description: You can deploy large models like 70b online using Cloudflare's Workers AI and access them via the public internet. Its API is compatible with OpenAI, meaning you can use it just like OpenAI's API.
---
Want to experience the power of large models but struggle with insufficient local computer performance? Typically, we deploy models locally using tools like `ollama`, but limited by computer resources, we often can only run smaller-scale models like 1.5b (1.5 billion), 7b (7 billion), or 14b (14 billion). Deploying a large model with 70 billion parameters is a significant challenge for local hardware.

Now, you can deploy large models like 70b online using Cloudflare's Workers AI and access them via the public internet. Its API is compatible with OpenAI, meaning you can use it just like OpenAI's API. The only drawback is the limited daily free quota, with charges for usage beyond that. If you're interested, give it a try!

## Preparation: Log in to Cloudflare and Bind a Domain

> If you don't have your own domain, Cloudflare provides a free account domain. However, please note that this free domain might not be directly accessible from within China; you may need to use some "magic" to access it.

First, open the Cloudflare website (https://dash.cloudflare.com) and log in to your account.

## Step 1: Create a Workers AI

1.  **Find Workers AI:** In the left navigation bar of the Cloudflare dashboard, find "AI" -> "Workers AI", then click "Create from Worker template".

    ![image.png](https://pvtr2.pyvideotrans.com/img/20250108142459-0.webp)

2.  **Create Worker:** Next, click "Create Worker".

    ![image.png](https://pvtr2.pyvideotrans.com/img/20250108142500-1.webp)

3.  **Enter Worker Name:** Enter a string consisting of English letters. This string will serve as your Worker's default account domain.

![image.png](https://pvtr2.pyvideotrans.com/img/20250108142500-2.webp)

![image.png](https://pvtr2.pyvideotrans.com/img/20250108142501-3.webp)

4.  **Deploy:** Click the "Deploy" button in the bottom right corner to complete the Worker creation.

## Step 2: Modify Code to Deploy the Llama 3.3 70b Large Model

1. **Enter Code Editor:** After deployment, you'll see an interface as shown below. Click "Edit code".

   ![image.png](https://pvtr2.pyvideotrans.com/img/20250108142501-4.webp)

2.  **Clear Code:** Delete all the preset code in the editor.

    ![image.png](https://pvtr2.pyvideotrans.com/img/20250108142502-5.webp)

3.  **Paste Code:** Copy and paste the following code into the code editor:

    > Here we are using the `llama-3.3-70b-instruct-fp8-fast` model, which has 70 billion parameters.
    >
    > You can also find other models to replace it on the [Cloudflare Models page](https://developers.cloudflare.com/workers-ai/models/), such as the Deepseek open-source model. However, currently `llama-3.3-70b-instruct-fp8-fast` is one of the largest and most effective models.
![image.png](https://pvtr2.pyvideotrans.com/img/20250108142502-6.webp)

    ```javascript
    const API_KEY='123456';
    export default {
      async fetch(request, env) {

        let url = new URL(request.url);
        const path = url.pathname;

        const authHeader = request.headers.get("authorization") || request.headers.get("x-api-key");
        const apiKey = authHeader?.startsWith("Bearer ")  ? authHeader.slice(7)  : null;
                            
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
              }
          });
        }

        if (path === "/v1/chat/completions") {
          const requestBody = await request.json();
           // messages - chat style input
		  const {message}=requestBody
		  let chat = {
			messages: message
		  };
          let response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', requestBody);
        
          let resdata={
            choices:[{"message":{"content":response.response}}]
          }    
          return Response.json(resdata);
        }  
       
      }
    };
    ```
4.  **Deploy Code:** After pasting the code, click the "Deploy" button.

![image.png](https://pvtr2.pyvideotrans.com/img/20250108142503-7.webp)

## Step 3: Bind a Custom Domain

1.  **Return to Settings:** Click the back button on the left to return to the Worker management page, then find "Settings" -> "Domains and routes".

![image.png](https://pvtr2.pyvideotrans.com/img/20250108142503-8.webp)

2.  **Add Custom Domain:** Click "Add domain", then select "Custom domain" and enter the subdomain you have already bound to Cloudflare.

![image.png](https://pvtr2.pyvideotrans.com/img/20250108142504-9.webp)

## Step 4: Use in OpenAI-Compatible Tools

After adding the custom domain, you can use this large model in any tool compatible with the OpenAI API.

*   **API Key:** This is the `API_KEY` you set in the code, defaulting to `123456`.
*   **API Address:** `https://your-custom-domain/v1`

Thanks to Cloudflare's powerful GPU resources, the experience will be very smooth.

## Notes

*   **Free Quota:** Cloudflare Workers AI provides 10k free tokens per day. Usage beyond this will incur charges.
*  **Pricing Details:** You can view detailed pricing information on the Cloudflare official pricing page (https://developers.cloudflare.com/workers-ai/platform/pricing/).

![image.png](https://pvtr2.pyvideotrans.com/img/20250108142504-10.webp)