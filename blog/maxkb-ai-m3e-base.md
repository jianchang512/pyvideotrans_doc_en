---
title: MaxKB Beginner's Step-by-Step Guide From Zero to One, Build Your Own AI Knowledge Base Assistant
date: 2025-06-27 18:40:00
description: Install MaxKB, Configure Nginx Reverse Proxy, Use Custom Embedding Model, m3e-base, Create Knowledge Base and Golden Rules, Create Advanced Applications
---

**MaxKB Beginner's Step-by-Step Guide: From Zero to One, Build Your Own AI Knowledge Base Assistant**

Have you ever dreamed of having an AI chatbot that only answers questions about your specific domain? A smart customer service agent that can answer product questions for your clients 24/7 or provide internal document queries for your company employees? MaxKB is exactly that—a powerful, open-source tool that can help you easily realize this idea.

This article is an extremely detailed guide for beginners. It will walk you through the installation and configuration of MaxKB, delve into how to create and optimize your knowledge base, and finally provide a detailed breakdown of its most powerful "Advanced Applications" feature, enabling you to truly master this powerful tool.

## 1. Installing MaxKB: Three Steps, Even Beginners Can Do It

For newcomers, configuring a server environment is often the first hurdle. Don't worry, we'll use the Pagoda Panel (BT Panel) to simplify everything.

1.  **Prepare the Docker Environment**
    Log in to your Pagoda Panel, find and click `docker` in the left-hand menu. If it's your first time using it, the system will prompt you to install Docker. This is a fully automated process; you just need to click confirm, then make a cup of tea and wait for it to finish.
    ![](https://pvtr2.pyvideotrans.com/1751013345862_image.png)

2.  **Execute the Installation Command**
    Once the Docker environment is ready, click `Terminal` on the left panel. This will open a command input window. Copy the following command, paste it in, and press Enter.
    ![](https://pvtr2.pyvideotrans.com/1751014677233_image.png)

    ```bash
    docker run -d --name=maxkb --restart=always -p 8080:8080 -v ~/.maxkb:/var/lib/postgresql/data -v ~/.python-packages:/opt/maxkb/app/sandbox/python-packages registry.fit2cloud.com/maxkb/maxkb
    ```
    > **What does this command do?**
    > *   `docker run`: This tells Docker to run a new container.
    > *   `-d`: Runs the container in the background (detached mode).
    > *   `--name=maxkb`: Names your container `maxkb` for easy management.
    > *   `--restart=always`: Ensures the container automatically restarts even if the server reboots.
    > *   `-p 8080:8080`: Maps the server's port 8080 to the container's port 8080, allowing us to access MaxKB.
    > *   `-v ...`: This is the most crucial step. It saves the container's data (like the database and Python packages) to your server's local storage, ensuring your data isn't lost even if the container is deleted.

3.  **Verify the Installation**
    Wait for the command to finish executing. Go back to the `docker` management interface in the Pagoda Panel and click `Container List`. If you see a container named `maxkb` with a status of "Running," congratulations! MaxKB has been successfully installed and started!
    ![](https://pvtr2.pyvideotrans.com/1751014815015_image.png)

## 2. Configuring Nginx Reverse Proxy: Professional Access

By default, you need to access MaxKB via an address like `http://your-server-ip:8080`, which is neither easy to remember nor professional. Let's configure it so you can access it via your own domain name (e.g., `ai.xxx.com`).

1.  **Create a Site**
    In the `Websites` section of the Pagoda Panel, click `Add Site`. Create a static site, fill in your prepared domain name (e.g., `ai.xxx.com`), and the root directory will be automatically generated (e.g., `/www/wwwroot/ai.xxx.com`). Just create it.
    ![](https://pvtr2.pyvideotrans.com/1751009027305_image.png)
    After successful creation, enter the root directory of this website (`/www/wwwroot/ai.xxx.com`) and manually create an empty folder named `ui` inside.

2.  **Modify the Nginx Configuration File**
    Go back to the website list, click `Settings` next to the site you just created, and switch to the `Configuration File` tab. Find the line `root /www/wwwroot/ai.xxx.com;` and paste the following pre-prepared configuration code directly below it:
    ```nginx
    # CORS settings
    add_header Access-Control-Allow-Origin '*' always;
    add_header Access-Control-Allow-Methods 'GET,POST,OPTIONS' always;
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,Access-Token,Token,formhash,shebei,token' always;
    # Handle OPTIONS preflight requests
    if ($request_method = 'OPTIONS') {
        return 204;
    }

    # Rule 1: Prioritize serving static UI resources, fallback to proxy if not found
    location ^~ /ui/ {
        add_header Cache-Control "public, max-age=2592000, immutable";
        proxy_hide_header Content-Disposition;
        try_files $uri $uri/ @backend_proxy;
    }

    # Rule 2: Catch all other API requests
    location / {
      # Directly jump to the named location for proxying
      try_files $uri @backend_proxy;
    }

    location @backend_proxy {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Real-Port $remote_port;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header REMOTE-HOST $remote_addr;

        proxy_connect_timeout 60s;
        proxy_send_timeout 600s;
        proxy_read_timeout 600s;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }
    ```
    After pasting, click Save.

3.  **Add Docker Volume Mount (Crucial Step)**
    The purpose of this step is to allow Nginx to directly access the frontend interface files inside the MaxKB container, achieving static-dynamic separation, which can significantly speed up page loading.
    *   Go to Pagoda Panel `docker` -> `Containers` -> find the `maxkb` container -> click `Manage` -> `Edit Container`.
    *   Click `More settings, click to view`, find the `Mount/Mapping` section.
    *   Click `Local Directory`, add a new mapping rule:
        *   **Local Directory**: Enter `/www/wwwroot/ai.xxx.com/ui` (the `ui` folder you created in step 1)
        *   **Container Directory**: Enter `/opt/maxkb/app/ui/dist/ui` (This is the fixed path for UI files inside the MaxKB container. Copy and paste it directly.)
    ![](https://pvtr2.pyvideotrans.com/1751006184817_image.png)
    ![](https://pvtr2.pyvideotrans.com/1751009925757_image.png)
    *   Scroll to the bottom of the page and click Save. The container will automatically restart to apply the new settings.
    ![](https://pvtr2.pyvideotrans.com/1751006240751_image.png)

    All set! Now, open your browser, enter your domain `http://ai.xxx.com/ui`, and you should see the MaxKB login interface.

## 3. Using a Custom Embedding Model: m3e-base

**What is an embedding model?** Simply put, it's like a "translator" that converts our text (like your documents and user questions) into a mathematical language (vectors) that computers can understand. Only with accurate "translation" can the computer accurately find the most relevant content in your knowledge base.

Although MaxKB comes with a built-in embedding model, we can switch to a model that performs better with Chinese, such as `m3e-base`.

1.  **Download the Model Files**:
    Visit the Hugging Face model page https://huggingface.co/moka-ai/m3e-base/tree/main and download all the files you see on the page to your computer.
    ![](https://pvtr2.pyvideotrans.com/1751007491488_image.png)
2.  **Create and Upload the Model on the Server**:
    *   In the Pagoda Panel `File` manager, go to the root `/` directory, then create the directories `/opt/maxkb/model` in sequence.
    ![](https://pvtr2.pyvideotrans.com/1751006733254_image.png)
    *   (Optional but recommended) Go back to the terminal and execute the command `cd /opt/maxkb && docker cp maxkb:/opt/maxkb/model .` to copy the default model from the container as a backup.
    ![](https://pvtr2.pyvideotrans.com/1751006855659_image.png)
    ![](https://pvtr2.pyvideotrans.com/1751005751830_image.png)
    *   Inside the `/opt/maxkb/model` directory, create a new folder with the hierarchy `models--moka-ai--m3e-base`. Then, upload all the `m3e-base` model files you downloaded in step 1 into this newly created `m3e-base` folder.
    ![](https://pvtr2.pyvideotrans.com/1751005800984_image.png)

> If you find downloading models one by one too troublesome, you can directly use a script.
> Ensure your server has Python 3.8+ and git installed, then execute the following commands in order:
> ```
> git clone https://github.com/LetheSec/HuggingFace-Download-Accelerator.git
> cd  HuggingFace-Download-Accelerator
> python3  hf_download.py --model moka-ai/m3e-base --save_dir  m3e-base
> # After downloading, copy the `models--moka-ai--m3e-base` folder to the `/opt/maxkb/models` directory
> ```
>
> *If your machine has higher configuration, you can also use the m3e-small model for better results. Just replace all instances of `base` in the above example with `small`.*

3.  **Mount the Model Directory to the Container**:
    Similar to the previous step, edit the `maxkb` container again and add a new volume mapping:
    *   **Local Directory**: `/opt/maxkb/model`
    *   **Container Directory**: `/opt/maxkb/model`
    ![](https://pvtr2.pyvideotrans.com/1751006184817_image.png)
    ![](https://pvtr2.pyvideotrans.com/1751006208580_image.png)
    Save and wait for the container to restart.
    ![](https://pvtr2.pyvideotrans.com/1751006240751_image.png)

4.  **Add the New Model in the MaxKB Backend**:
    Log in to MaxKB, go to `System Settings` -> `Model Settings` -> `Add Model`, select `Local Model`.
    ![](https://pvtr2.pyvideotrans.com/1751006394396_image.png)
    *   **Model Name**: Can be anything, e.g., `m3e`.
    *   **Model Type**: Must select `Embedding Model`.
    *   **Base Model** and **Model Directory**: Both should be filled with the absolute path to your uploaded model: `/opt/maxkb/model/models--moka-ai--m3e-base`. **To avoid errors, it is recommended to copy and paste this path directly.**
    Click Save. If there are no errors, it means the addition was successful! If there is an error, 99% of the time it's because the path you entered doesn't match the actual path on the server. Please double-check carefully.
    ![](https://pvtr2.pyvideotrans.com/1751006676618_image.png)
    Success looks like this:
    ![](https://pvtr2.pyvideotrans.com/1751006718795_image.png)

## 4. Adding the DeepSeek Large Language Model

If the embedding model is the "librarian" that helps you find materials, then the Large Language Model (LLM) is the "expert" that reads the materials and formulates a response. Here we'll add a highly cost-effective DeepSeek model.

In `Model Settings`, click `Add Model`, select `DeepSeek`. Fill in a custom name (e.g., `deepseek-chat`), select the model `deepseek-chat`, and then enter the API Key obtained from the DeepSeek official website.
![](https://pvtr2.pyvideotrans.com/1751011424720_image.png)

## 5. Creating a Knowledge Base and Important Notes

This is the core part. The quality of your knowledge base directly determines the "IQ" of your AI assistant.

1.  **Choose the Correct Embedding Model When Creating**: Click `Knowledge Base` -> `New Knowledge Base`. On the creation interface, the most important step is the selection of the `Embedding Model`. Please choose the `m3e` model we just added. Once a knowledge base is created and documents are imported, changing the model later means deleting all documents and starting over, which is very time-consuming and labor-intensive!
    ![](https://pvtr2.pyvideotrans.com/1751010526685_image.png)

2.  **Knowledge Base Upload Rules**:
    *   **Rule 1: Small files, upload in batches.** Although the system may allow uploading very large files, unless your server is a supercomputer, always manually split large documents (e.g., files over 20MB) into multiple smaller files. Also, it's best to control the number of files uploaded at once to 5 or fewer. Otherwise, the next step of preview might fail, preventing import.
    *   **Rule 2: Ignore "false failures," check the real progress.** When you upload a slightly larger file and start the import, the frontend page might show a red `Failed` prompt due to a timeout. **Don't panic! This is often an illusion!** The backend vectorization task is likely still running diligently. You can ignore this prompt and go directly to the file list page of the knowledge base, which will show the real processing progress. Of course, the best strategy is to follow Rule 1 to avoid this issue from the start.
    ![](https://pvtr2.pyvideotrans.com/1751010100005_image.png)
    ![](https://pvtr2.pyvideotrans.com/1751010317647_image.png)
    ![](https://pvtr2.pyvideotrans.com/1751010402997_image.png)
    ![](https://pvtr2.pyvideotrans.com/1751010449839_image.png)
    *   **Rule 3: Enable "Hybrid Search."** In the knowledge base settings, it is strongly recommended to enable "Hybrid Search." It uses both semantic (understanding like a human) and keyword (like traditional search) methods to find information, greatly increasing the probability of finding the correct answer.

## 6. Creating Advanced Applications: Giving Your AI a "Brain"

Advanced Applications are the essence of MaxKB. They allow you to design AI workflows like building blocks.
![](https://pvtr2.pyvideotrans.com/1751011336461_image.png)
After entering the edit interface, you will see a flowchart canvas.
![](https://pvtr2.pyvideotrans.com/1751011515206_image.png)
> **Golden Rules of Operation**:
> 1.  For any changes made to the canvas, you **must** click the **`Save`** button in the top right corner.
> 2.  After saving, you **must** click **`Publish`** for your changes to take effect in the chat window.

### **Core Concepts: Nodes and Variables**

*   **Nodes**: Each block on the canvas is a "node," representing a function, such as "Start," "Knowledge Base Search." Each node has a Chinese name in its top-left corner, which we can modify.
*   **Variables**: Nodes pass information between each other using "variables." The variable format is fixed: `\{\{NodeName.OutputVariableName\}\}`.
    *   **Example**: `\{\{Start.question\}\}` means: find the node named `Start` and get the value of its output variable named `question`. In the default flow, this value is the user's input question. Similarly, `\{\{KnowledgeBaseSearch.data\}\}` gets the knowledge snippets found by the `KnowledgeBaseSearch` node.

### **Detailed Explanation of the Default Flow**

1.  **Start**: This is the starting point. The user inputs a sentence, and this node packages it into a variable named `question`.
2.  **Knowledge Base Search**: This is the "librarian." Its "Search Query" field needs to be filled with `\{\{Start.question\}\}`, telling it to search the knowledge base based on the user's question. The found materials are packaged into the `data` variable.
3.  **Judgment Node**: This is the "traffic controller." It directs the flow based on conditions. For example, it can judge whether `KnowledgeBaseSearch.data` is empty. If materials are found, it takes the IF branch; if not, it takes the ELSE branch.
4.  **AI Dialogue**: This is the "expert." Its most important setting is the **Prompt**, which is the instruction given to the AI.

**An Excellent Prompt Template**:
```
You are a professional customer service representative for XX Company. Please answer the user's [question] strictly based on the following [Known Information]. It is forbidden to use any of your own knowledge or fabricate information. If there is no answer in the [Known Information], reply: "Sorry, I couldn't find relevant information about your question at the moment."

[Known Information]:
\{\{KnowledgeBaseSearch.data\}\}

[Question]:
\{\{Start.question\}\}
```
This template clearly tells the AI its role, information source, basis for answering, and the standard reply when no answer is found.

### **Leveling Up: Using the "Function" Component**

What if you want to automatically add a timestamp to every AI response? The "Function" node can help!

**Practical Example: Adding a Timestamp to AI Responses**

1.  **Add a Node**: After the "AI Dialogue" node, drag a "Function" node from the right-side component list onto the canvas and connect them with a line.
2.  **Write the Code**: Click on the "Function" node to configure it. In the code editor, paste the following Python code:

    ```python
    import datetime

    # This is the fixed function entry point. 'ai_answer' is the input parameter name we defined.
    def process(ai_answer: str) -> dict:
        # Get the AI's original answer
        # The variable name 'ai_answer' can be customized, but must match the input parameter setting below.

        # Get current Beijing time and format it
        beijing_time = datetime.datetime.utcnow() + datetime.timedelta(hours=8)
        time_str = beijing_time.strftime("%Y-%m-%d %H:%M:%S")

        # Concatenate the original answer with the timestamp into new text
        final_response = f"{ai_answer}\n\n---\n*This answer was generated by AI at {time_str}*"

        # Return the processed result as a dictionary
        # "response_with_timestamp" will become the output variable name for this function node
        return {"response_with_timestamp": final_response}
    ```

3.  **Configure Input Parameters**: In the "Input Parameters" section of the function node, click "Add." For the parameter name, enter `ai_answer` (must match the code). For the parameter value, enter `\{\{AIDialogue.answer\}\}`. This step tells the function where its input data comes from.
4.  **Use the Function Output**: After this function executes, it produces a new variable named `response_with_timestamp`. Now, in the final "End" node of the flow, change the value of its `answer` field from the original `\{\{AIDialogue.answer\}\}` to `\{\{Function.response_with_timestamp\}\}`.

> For more functions, check the MaxKB official forum: https://bbs.fit2cloud.com/t/topic/11004
> For more Advanced Applications ideas, refer to this forum post: https://bbs.fit2cloud.com/t/topic/7753

Through the steps above, you have successfully customized and processed the AI's output! This is the power of MaxKB. By freely combining these nodes, you can create intelligent applications that meet various complex needs.