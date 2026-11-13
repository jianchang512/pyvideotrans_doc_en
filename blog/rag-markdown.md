---
title: Practical Notes Translating Massive Product Data into an AI-Friendly Markdown Knowledge Base
date: 2025-04-18 10:07:57
description: This article documents the author's practical experience in converting a complex database containing over 8,000 products and 3 million models into a Markdown knowledge base understandable by AI. The author experimented with two approaches "one product per file" and "multiple products per file," and delved into the principles of Embedding and Chunking during AI document processing. The final, detailed solution leverages Markdown heading hierarchies to structure content, ensuring each information chunk contains contextual information. Key implementation details covered include data "translation," handling related information queries, field formatting, content simplification, and automation script development, providing valuable practical reference for building similar data knowledge bases.
---

# Practical Notes: Translating Massive Product Data into an AI-Friendly Markdown Knowledge Base

Recently, I've been tinkering with a project: how to transform our company's complex industrial product data into "food" that AI can "digest," with the ultimate goal of creating an intelligent customer service or product Q&A bot.

The data at hand consists mainly of two tables: one is `product`, storing basic information for **over 8,000 products**; the other is `prosn`, recording **various specific models** under each product, totaling about 3 million models. Each model comes with price, weight, part numbers, and a bunch of attribute parameters.

The core requirement is: no matter what model a user asks about, the AI needs to **quickly and accurately** retrieve the relevant information.

After some research, using **Markdown files** as the AI's "textbook" (i.e., knowledge base) seemed quite promising. Why? Markdown format is simple, easy for us humans to read, and relatively straightforward for AI to process. But the question arose: how do we elegantly and reliably convert the data from these two database tables into well-structured, AI-friendly Markdown?

I definitely hit a few bumps along the way, but I also figured out some useful approaches. Here's a share of my tinkering process and the final solution.

### Initial Idea: Simple and Direct, One Product Per .md File?

Intuitively, the clearest approach would be to create a separate Markdown file for each product (a row in the `product` table). The filename could be something like `ProductID_ProductName.md`, making it clear at a glance.

The internal file structure was also planned, looking roughly like this:

```markdown
# Product: XXX Sensor (ID: 123)
**Series Number:** ABC-1000
**Category:** Pressure Sensor
**Brand:** Dali Brand
... (Product introduction, details, image links, etc.) ...

---
## Model List for This Product
---
### Model: ABC-1001
*   **Part Number:** ABC-1001
*   **Price:** ¥500
*   **Weight:** 0.2kg
*   **Attributes:**
    *   Range: 0-10 Bar
    *   Output: 4-20mA
... (Other detailed info for this model) ...
---
### Model: ABC-1002
... (Same structure, listing the next model) ...
```

Looks pretty neat, right? Clear structure, logical organization.

### The Problem Emerges: 8000+ Files to the Face, Who Can Handle That?!

But reality is harsh—there are over 8,000 products! If we really went with this plan, the folder would instantly be flooded with 8,000+ `.md` files. Imagine managing that mess; it would be a disaster scene for finding, updating, and maintaining. This path was clearly unworkable.

### A Different Approach: Bundle Them Up! Can We Put Multiple Products in One File?

What about "consolidating the parts into a whole," packing information for multiple products into a single Markdown file? For example, merging every 10, 20, or even 50 products into one file. This way, the number of files plummets (e.g., with 50 products per file, 8000 / 50 ≈ 160 files), which becomes much more manageable!

This idea felt much more promising! But new questions immediately followed: **With so much content crammed into one file, how will the AI know which information belongs to which product? Could information from different models get mixed up and confuse the AI?**

This meant we had to set much higher requirements for the **internal structure design** of the Markdown files—we needed a very clear, consistent way to separate content.

### The Crucial "Aha!" Moment: Don't Forget How AI "Reads" Documents! (Embedding & Chunking)

Right here, I suddenly remembered a core step in AI document processing: **Embedding**. Simply put, AI doesn't read Markdown word by word like humans do. It typically first **chunks** the document, breaking it down into meaningful text segments (Chunks), then converts each segment into a string of numbers (a vector). Only then can it perform similarity calculations to achieve information retrieval and Q&A.

This realization was a wake-up call:

1.  **Chunking Strategy is Critical!** If done poorly—for example, splitting a complete model's information in half across two Chunks, or having one Chunk contain partial information from two unrelated models—the AI can easily get "lost" or "mix things up" when answering questions.
2.  **The Markdown structure we design must serve this "chunking" process!** The goal is to make it easy and accurate for chunking tools to split the document according to our intent (ideally, each model's information being an independent, complete Chunk).

Further research revealed that many RAG (Retrieval-Augmented Generation) framework chunking tools support **splitting documents based on Markdown heading levels (`#`, `##`, `###`, `####`, etc.)**. This was perfect timing! We could cleverly use heading hierarchies to organize content structure and guide the AI to "segment sentences" correctly.

### Final Solution: Clever Use of Heading Hierarchies to Build Structured "AI Food"

Combining the ideas of "multiple products per file" and "using heading hierarchies to aid chunking," the finalized solution is as follows:

1.  **File Organization Strategy:** Merge every N products (e.g., 10 or 20; N can be adjusted based on later testing) into one `.md` file. Filenames can be standardized, like `products_group_001.md`, `products_group_002.md`, etc.
2.  **Internal File Structure (The Core of the Core!):**
    *   Use the top-level heading `#` to mark **the start of each new product**. Example: `# Product: 2-Position 3-Port Manual Valve (ID: 270)`. This is the most important separator between different products.
    *   Use the secondary heading `##` to organize **different information areas within a product**. For example: `## Product Overview`, `## Product Image Links`, `## Model List - 2-Position 3-Port Manual Valve`. This makes the information within a product more organized.
    *   Use the next-level heading `###` to mark **each specific model**. This is key to ensuring the AI can accurately locate and answer model-related questions! Example: `### Model: 3L110-06 (Belongs to Product: 2-Position 3-Port Manual Valve, ID: 270)`.
        *   **Pay close attention, this is important!** In the model's `###` heading, or immediately at the beginning of the following content, **you must, absolutely, definitely explicitly write the product information this model belongs to (e.g., product name, product ID)!** The purpose is to provide sufficient context for each Chunk that might be split out. Otherwise, if the AI gets a model's Chunk alone, it might not know "Who am I? Where do I come from?" (which product this model belongs to).
    *   If a model's information is particularly complex with many fields, consider using `####` headings for further subdivision, e.g., `#### Detailed Parameters`, `#### Price & Inventory`. This allows for smaller, more focused Chunks.

**Therefore, the final Markdown file structure looks roughly like this (based on the earlier example):**

```markdown
# Product: 2-Position 3-Port Manual Valve (ID: 270)

## Product Overview
*   **Series Number:** 3L
*   **Category:** Manual Valve
*   **Brand:** AirTAC
... (Other basic product info)

## Product Image Links
*   /path/to/image1.jpg
*   /path/to/image2.jpg

## Model List - 2-Position 3-Port Manual Valve

### Model: 3L110-06 (Belongs to Product: 2-Position 3-Port Manual Valve, ID: 270)
*   **Internal ID (prosn.id):** 270
*   **Model Number (Bianhao):** 3L110-06
*   **Belonging Product Info:** 2-Position 3-Port Manual Valve (Product ID: 270)  <-- **Look! Contextual info is here, very important!**
*   **Price (Price):** 27.00
*   **Port Size:** PT1/8
*   **Status:** In Stock
... (Other model attributes, parameters, etc.)

### Model: 3L210-06 (Belongs to Product: 2-Position 3-Port Manual Valve, ID: 270)
*   **Internal ID (prosn.id):** 271
*   **Model Number (Bianhao):** 3L210-06
*   **Belonging Product Info:** 2-Position 3-Port Manual Valve (Product ID: 270)
*   **Price (Price):** 32.00
*   **Port Size:** PT1/8
*   **Status:** Pre-sale (Lead Time: Within 3 days)
...

--- 


# Product: High-Speed Cylinder (ID: 271)

## Product Overview
... (Same structure as above) ...

## Model List - High-Speed Cylinder

### Model: HGC-20-100 (Belongs to Product: High-Speed Cylinder, ID: 271)
*   **Internal ID (prosn.id):** 350
*   **Model Number (Bianhao):** HGC-20-100
*   **Belonging Product Info:** High-Speed Cylinder (Product ID: 271)
*   **Price (Price):** 150.00
*   **Bore Diameter:** 20mm
*   **Stroke:** 100mm
...

```

### Some "Pitfalls" and Considerations in Practice:

*   **Data "Translation" is a Must:** Codes stored in the database like `status` (e.g., 0, 1, 2), `huoqi` (e.g., 1, 2, 3, 4 representing different days), `pricetype` (e.g., 1 for real price, 2 for negotiable) must be converted into text understandable by both humans and AI (e.g., "Discontinued," "Lead time within 3 days," "Real Price") when generating Markdown.
*   **Retrieve All Related Information:** Don't just put `category_id` or `pinpai_id` in the Markdown. Query the related category and brand tables beforehand to get the corresponding names (e.g., "Pressure Sensor," "Dali Brand") and include them to provide richer context.
*   **Format Special Fields:** For text in fields like `shuxing` that are "one attribute per line, attribute name=value," write a script to parse and convert them into Markdown unordered list format. Similarly, multiple image paths separated by commas in the `pic` field are best processed into a list.
*   **Keep Content Focused and Concise:** Not all database fields are useful for Q&A. Fields like `seo_title`, `seo_keywords`, `views`, `buys`, mainly used for website operations or statistics, offer little help for AI answering user questions about the product itself. Consider excluding them from the Markdown export to keep the knowledge base "purer."
*   **Multi-language Support:** If your product information needs to support English, you can add English content below the corresponding Chinese information block, for example, using fields with `_en` suffixes from the database, following the same Markdown structure.
*   **Consistency! Consistency! Consistency!** Important things said three times! All products, all models must strictly follow **the exact same** heading hierarchy and format specifications. Any arbitrary changes or format inconsistencies could cause the automatic chunking tool to "crash," producing messy Chunks.
*   **Automation Scripts are Essential:** With this volume of data, manual conversion is impossible. You must write a script (in Python, PHP, Node.js, or any language you're good at). The core logic of the script is roughly:
    1.  Connect to the database.
    2.  Set a counter `count` and a file handle `file_handler`, deciding on N products per file.
    3.  Loop through product records in the `venshop_product` table.
    4.  For each product, query all model records under it from the `venshop_prosn` table based on `product_id`.
    5.  Assemble the current product's basic info and all its models' detailed information into a properly formatted string according to the carefully designed Markdown structure above.
    6.  Remember to prefix each product's information with a level-1 heading like `# Product Name (ID: xxx)`.
    7.  Prefix each model's information with a level-3 heading like `### Model: Model Name (Belongs to Product: Product Name, ID: xxx)`, ensuring it includes the crucial contextual information.
    8.  Write the assembled string to the currently open file `file_handler`.
    9.  Increment the product counter `count`. If `count` reaches N, close the current file, open a new Markdown file (e.g., increment the filename number), and reset `count` to 0.
    10. After processing all products, ensure the last file is closed.

### Summary of Key Lessons Learned:

1.  **Think from the End Goal:** Always remember that these Markdown files are ultimately for AI "consumption," especially needing to pass through Embedding and Chunking smoothly. Design the structure with downstream processing in mind.
2.  **Structure is King:** Clear, uniform, and logical Markdown heading hierarchies are the lifeline to ensure the AI can correctly "segment sentences" (chunk).
3.  **Don't Lose Context:** Every information fragment (especially fine-grained ones like models) must contain contextual information that identifies its origin (which product it belongs to), preventing the creation of "orphan" Chunks.
4.  **Automation is a Must-Have:** With any significant data volume, forget manual processing. Write scripts diligently for guaranteed efficiency and accuracy.
5.  **Test-Driven Development (TDD... sorta):** After generating a portion of the Markdown files, don't rush to run the full batch. First, run a sample file through your Embedding pipeline (including the chunking step) and check if the resulting Chunks meet expectations. If they don't, quickly adjust the Markdown generation logic and structure until satisfied, then proceed with large-scale generation.

Finally, I've sorted out the process and thoughts from this tinkering project. I hope this record of "stepping into pitfalls" can offer some inspiration or reference to friends currently or about to tackle similar data conversion challenges. In practice, the Markdown files generated using this method are not only relatively easy to manage but also allow the AI to better understand and utilize the structured information within, which I believe will significantly help improve the accuracy of subsequent Q&A systems.

---