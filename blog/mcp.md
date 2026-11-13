---
title: What is MCP, What is it Used For, and How to Use It?
date: 2025-04-02 00:25:14
description: This article provides a detailed introduction to the "Model Context Protocol" (MCP) proposed by Anthropic, a standardized communication protocol designed to enhance the efficiency and security of AI model interactions with external data and tools. The article first distinguishes between two easily confused "MCP" concepts in the AI field, clearly focusing on Anthropic's Model Context Protocol. It then delves into the pain points of AI interactions and how MCP addresses these issues through structured JSON communication, explaining its core roles (system, user, assistant, tool_use, tool_result). Furthermore, the article introduces the MCP ecosystem, including MCP servers (emphasizing the importance of FastMCP), the MCP SDK, and MCP connectors, and explains how they work together. Finally, the article summarizes the core advantages of MCP, the latest industry developments, and provides a beginner's example of quickly building a weather query MCP server and client based on FastMCP, highlighting the advantages of FastMCP in simplifying development.

---



### A Complete Guide to MCP in AI: Focusing on Anthropic's "Model Context Protocol" and Its Ecosystem

The AI world is evolving rapidly, and "MCP" is a term that can easily cause confusion. Let's first clarify the boundaries:

- **MCP Concept 1 (Multi-Agent Collaboration)**: Sometimes refers to "Multi-Agent Collaboration Platform," such as AutoGen, which enables multiple AIs to work together. Very cool, but not the focus today.
- **MCP Concept 2 (Anthropic Protocol)**: This is the official standard introduced by Anthropic (the developer of Claude), called the "Model Context Protocol" (MCP). It aims to enable efficient and secure interaction between AI models (like Claude) and external data and tools.

**Focus of this article**: We focus on Anthropic's MCP, helping you understand what it is, why it's important, and how to develop quickly using `MCP`!

---

### First Stop: Why Do We Need MCP? The "Pain Points" of AI Interaction

Imagine you're using Claude for a task. When the task gets complex, things can go wrong:

- **Confusing Instructions**: Background, steps, and limitations get mixed up, and the AI can't grasp the key points.
- **Lost Context**: In long conversations, the AI forgets your initial requirements.
- **Unreliable Tool Calls**: Wanting the AI to check the weather or read a file, it either can't use the tool or uses it incorrectly.
- **Security Risks**: Malicious inputs (Prompt Injection) can cause the AI to make mistakes.

MCP is a **standardized communication protocol**, like a "universal language" between AI and the external world. Its goal is to make information structured, processes smooth, and interactions secure and reliable.

---

### Second Stop: The Core of MCP: Structured Communication

MCP uses JSON format to divide information into clear parts, each with its own role (Role). The core roles defined by the official documentation include:

- **system**: Global settings, e.g., "You are a weather assistant capable of checking real-time weather."
- **user**: User input, e.g., "What's the weather like in Beijing?"
- **assistant**: AI response, which may contain tool calls (tool_use).
- **tool_use**: Instruction to call a tool, e.g., `{ "name": "get_weather", "input": { "city": "Beijing" } }`.
- **tool_result**: Result returned by the tool, e.g., `{ "result": "Sunny, 25°C" }`.

**Example**: MCP interaction for checking a GitHub commit:

```json
[
  { "role": "system", "content": "You are my programming assistant with access to GitHub." },
  { "role": "user", "content": "Check my latest GitHub commit." },
  { "role": "assistant", "content": "Calling tool", "tool_use": { "name": "github_latest_commit", "input": { "username": "yourname" } } },
  { "role": "tool_result", "content": { "commit_message": "Fix bug #123", "date": "2025-03-31" } },
  { "role": "assistant", "content": "Latest commit: Fix bug #123, 2025-03-31." }
]
```

**Summary**: MCP transforms messy inputs into standardized "forms," making AI processing more efficient.

---

### Third Stop: The MCP Ecosystem: Protocol + Tools

MCP is more than just a protocol; it includes supporting tools. The three core components are:

#### 1. MCP Server (MCP Server)
- **What it is**: A server-side component that adheres to the MCP protocol, acting as a "relay station." It receives and processes MCP requests, connecting AI models to external resources.
- **Functions**:
  - Parses MCP-formatted requests and passes them to the model or tools.
  - Returns standardized MCP responses.
  - Supports custom tools and data access.
- **Implementation Methods**:
  - Anthropic provides pre-built servers (e.g., for Google Drive, Slack).
  - Developers can use `FastMCP` (Python SDK) to quickly build their own.
- **Key Point**: It is the core hub of MCP. The official recommendation is to implement it using `FastMCP` because it simplifies tool definition and server setup.

#### 2. MCP SDK (Software Development Kit)
- **What it is**: A "toolbox" for developers, supporting languages like Python and TypeScript.
- **Function**: Provides convenient APIs, such as `FastMCP`, allowing you to easily build and send MCP requests.
- **Example**: Using `FastMCP` to define a tool automatically generates the JSON Schema.

#### 3. MCP Connector (MCP Connector)
- **What it is**: An "adapter" that connects non-MCP systems.
- **Function**: Translates requests and results from external tools (e.g., databases) into MCP format.
- **Example**: The community provides connectors for Postgres, Puppeteer, etc.

**Workflow**:
1. Use the SDK (including `FastMCP`) to write an application and send requests.
2. The MCP server receives the request and calls the model or tools.
3. The result is returned to the application.

---

### Fourth Stop: The Benefits of MCP and Latest Developments

#### Core Advantages
- **Reliability**: Structured communication reduces misunderstandings.
- **Tool Integration**: Seamlessly calls external resources.
- **Security**: Reduces injection risks.
- **Scalability**: Standard protocol supports cross-system collaboration.

#### Latest Developments (As of April 2025)
- **Industry Support**: OpenAI, Microsoft, and Google have joined. MCP may become the "HTTP for AI."
- **Ecosystem Expansion**: Anthropic released a roadmap in January 2025 supporting remote connections.
- **Active Community**: The `modelcontextprotocol` repository on GitHub has thousands of contributors.

---

### Fifth Stop: How Can Beginners Get Started Quickly with MCP Development?

Want to use MCP? Here is a beginner's guide based on `FastMCP`.

#### Preparations
1. **Environment**: Python 3.10+.
2. **Install SDK**:
   ```bash
   pip install "mcp[cli]" httpx
   ```
3. **Tools**: Obtain a Weather API Key (e.g., from `weatherapi.com`).

#### Developing an MCP Server with FastMCP
Goal: Build a weather query server.

1. **Code Example** (`weather_server.py`):
   ```python
   from mcp.server.fastmcp import FastMCP
   import httpx

   # Initialize FastMCP server
   mcp = FastMCP("weather_server")

   # Define weather tool
   @mcp.tool()
   async def get_weather(city: str) -> str:
       """Get real-time weather for a specified city"""
       async with httpx.AsyncClient() as client:
           url = f"http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q={city}"
           response = await client.get(url)
           data = response.json()
           return f"{city} weather: {data['current']['condition']['text']}, {data['current']['temp_c']}°C"

   # Run the server
   if __name__ == "__main__":
       mcp.run()
   ```
   - **Explanation**:
     - `FastMCP` is the officially recommended high-level framework that automatically handles tool registration and JSON Schema generation.
     - The `@mcp.tool()` decorator defines a tool, simplifying development.

2. **Start the Server**:
   ```bash
   python weather_server.py
   ```

#### Testing with a Client
1. **Client Code** (`client.py`):
   ```python
   from mcp import MCPClient

   client = MCPClient(server_url="http://localhost:8000")
   client.add_message(role="system", content="You are a weather assistant.")
   client.add_message(role="user", content="What's the weather like in Beijing?")
   client.add_tool("get_weather")
   response = client.send()
   print(response["content"])  # Output: Beijing weather: Sunny, 25°C
   ```

2. **Run**:
   - First, run the server: `python weather_server.py`
   - Then, run the client: `python client.py`



---


- **What is MCP**: Anthropic's standardized protocol that enhances the efficiency of AI interactions with the external world.
- **How it works**: Structured JSON communication, paired with tools like `FastMCP`.
- **Why it's important**: It may become the future standard for AI development.
- **Take action now**: Use `FastMCP` to get a server running in 10 minutes!

**Why use FastMCP**: Official examples heavily use `FastMCP` because it encapsulates underlying details and is suitable for rapid development. Compared to manual FastAPI implementations, `FastMCP` is closer to the official style and simpler.



### References

[MCP Official Documentation](https://modelcontextprotocol.io)
[GitHub MCP](https://github.com/modelcontextprotocol)