---
title: Solving VitePress Blog Pagination My Journey of Pitfalls and Implementation
date: 2025-04-09 18:33:00
description: This article shares the author's practical process of solving the problem of a lengthy sidebar and lack of pagination when using VitePress to build a personal blog with many articles. The author analyzes the advantages of choosing VitePress (familiarity, suitability for documentation + blog hybrid, fast deployment) and points out the default sidebar's inadequacy for a large number of blog posts. When seeking AI assistance, the author fell into a pitfall with the wrong solution provided by a connected AI (Grok-3), and ultimately, guided by a non-connected AI (Gemini 2.5 Pro), successfully implemented homepage article pagination using VitePress 1.x's core feature `createContentLoader`. It details the steps of using `createContentLoader` to load and process Markdown data at build time (extracting frontmatter, generating excerpts, sorting), how to create a Vue component to display paginated data, and solved the "pitfall" of needing to provide a `theme/index.js` theme entry file after creating the `.vitepress/theme` directory. Finally, it summarizes the key points, lessons learned from pitfalls, and views on AI-assisted programming, emphasizing the importance of standardizing frontmatter, paying attention to file paths, and the understanding that AI is an assistant, not an all-powerful "deity".
---

# Solving VitePress Blog Pagination: My Journey of Pitfalls and Implementation

Why did I choose VitePress to build my personal website and blog in the first place? It wasn't a spur-of-the-moment decision; I mainly had my eye on a few things:

1.  **Familiar and Easy to Use:** I've used VitePress to write technical documentation before, so I'm quite familiar with its configuration, Markdown syntax, Vue component support, and that blazing-fast HMR (Hot Module Replacement). Using familiar tools naturally saves time and effort.
2.  **Blog Posts and Tutorials:** My website isn't just scattered blog posts; I also want to systematically include tutorial series (like Python basics, how to use FFmpeg). VitePress's file-based routing and flexible sidebar are naturally suited for this "documentation + blog" hybrid model, offering more flexibility than some pure blog systems.
3.  **Fast Deployment and Performance:** VitePress is quite simple to install and deploy. Based on Vite, the build speed is incredibly fast, and the resulting static website performance is excellent—exactly what I wanted.

However, as I used it more and wrote more blog posts, a problem emerged. VitePress's default sidebar seems more tailored for well-structured documentation. Faced with a large number of blog posts sorted by date, it struggles—no pagination. With too many articles, the sidebar becomes endlessly long, which would be exhausting for readers. Not acceptable! I needed a solution. So, I wondered if I could leverage VitePress's own features to create a dynamically loaded, time-sorted, paginated list of latest articles on the homepage (`index.md`).

## Seeking AI Help: Almost Led Astray

These days, when encountering technical challenges, who doesn't want to ask AI first? At the time, I thought VitePress 1.6.3 was relatively new, so I needed an AI that could access the latest information. I tried Grok-3, which claims to fetch the latest info, thinking it could directly generate usable code or reliable ideas for me.

The result? Communicating with Grok-3 was a "disaster"! I clearly told it my requirements, directory structure, and VitePress version, but the solutions it provided were always full of errors:

*   It either confused the APIs of VitePress 0.x and 1.x.
*   It suggested I reinstall vitepress 1.6.0, or implement it via a custom theme, or even directly modify the JavaScript code in the default theme files under `node_modules` to solve a bunch of plugin startup issues.
*   The code snippets it gave often had import errors, incorrect API calls, or illogical flow, always resulting in startup errors. Even when it finally started, the functionality wasn't implemented, leaving the homepage blank.
*   Back-and-forth communication and modifications yielded little improvement, and I eventually hit its usage frequency limit, being told to wait an hour before using it again. It was a real headache.

This ordeal made me realize that even if an AI claims to be connected to the internet, its depth of understanding and accuracy regarding specific frameworks (especially those still evolving rapidly) should be questioned. Relying too heavily on it might just waste effort going down the wrong path.

Out of options, I tried Gemini 2.5 Pro exp. Hey, communicating with Gemini turned out to be much smoother! After describing my requirements, it quickly provided a solution based on VitePress 1.6.x's core feature `createContentLoader`. I only encountered one minor issue regarding theme resolution (`@theme/index`). I pasted the error message, and Gemini immediately pointed out the problem (missing custom theme entry file) and told me the correct fix (create a `theme/index.js` that extends the default theme).

This back-and-forth really highlighted the difference in capabilities between different AI models when dealing with specific framework issues. Gemini's understanding of VitePress 1.x was clearly more accurate, and the solution it provided was more aligned with the framework's best practices.

## Light at the End of the Tunnel: `createContentLoader` Saves the Day

The key to finally solving this was a "magic tool" built into VitePress 1.x—`createContentLoader`. It allows us to load and process Markdown files during the build process, then bundle the processed data for direct use by frontend Vue components.

How to do it? Follow these steps:

1.  **Load Data (`.vitepress/theme/posts.data.js`)**: This is the core! Create a `posts.data.js` file and use `createContentLoader` to do the work:

    ```javascript
    // .vitepress/theme/posts.data.js
    import { createContentLoader } from 'vitepress'
    import matter from 'gray-matter' // This library parses frontmatter and content

    // The specific implementation of the createExcerpt function is omitted here; it's mainly responsible for extracting plain text excerpts.
    function createExcerpt(content, maxLength) {
        // ... Logic to strip Markdown/HTML tags and truncate ...
        // Simple example: remove tags, take first maxLength characters
        const plainText = content.replace(/<[^>]*>/g, '').replace(/#+\s/g, '');
        return plainText.slice(0, maxLength) + (plainText.length > maxLength ? '...' : '');
    }

    export default createContentLoader('**/*.md', { // Match all Markdown files
      includeSrc: true, // Need to load source file content to extract excerpts
      ignore: ['index.md', '**/node_modules/**', '.vitepress/**'], // Exclude non-article files
      transform(rawData) {
        return rawData
          // Filter out md files with incomplete frontmatter or non-target content
          .filter(({ frontmatter, src }) => frontmatter && frontmatter.date && frontmatter.title && src)
          .map(({ url, frontmatter, src }) => {
            // Use gray-matter to separate frontmatter and pure Markdown content
            const { content } = matter(src);
            return {
              title: frontmatter.title,
              url,
              // Ensure date is a Date object for easy sorting
              date: new Date(frontmatter.date),
              // Call our function to generate an excerpt
              excerpt: createExcerpt(content, 200),
            }
          })
          // Sort in descending date order, newest first
          .sort((a, b) => b.date.getTime() - a.date.getTime());
      }
    })
    ```

    *   `'**/*.md'`: Tells VitePress to scan all Markdown files in all directories.
    *   `ignore`: Excludes files like the homepage, `node_modules`, `.vitepress` directory that shouldn't be treated as articles.
    *   `includeSrc: true`: This is crucial. Must be set to `true` to get the raw Markdown content for generating excerpts.
    *   The `transform` function is where the magic happens:
        *   First `filter` to ensure articles have the necessary `frontmatter` fields `title` and `date`.
        *   Then `map` processes each qualifying file: uses `gray-matter` to separate `frontmatter` and `content`, then calls the `createExcerpt` function to generate an excerpt (you need to write this function; the logic is to strip Markdown/HTML tags and take the first 200 characters).
        *   Finally returns an array of objects containing `title`, `url`, `date`, `excerpt`.
        *   Don't forget `sort`, descending by `date`, so the newest articles come first.

2.  **Display Component (`.vitepress/theme/components/LatestPosts.vue`)**: Create a Vue component to consume the processed data and implement pagination:

    ```vue
    <script setup>
    import { ref, computed } from 'vue'
    // Import data generated at build time, ensure the path is correct
    import { data as allPosts } from '../posts.data.js'

    const postsPerPage = ref(10); // How many posts per page
    const currentPage = ref(1); // Current page

    // Calculate total pages
    const totalPages = computed(() => Math.ceil(allPosts.length / postsPerPage.value));

    // Calculate which posts should be displayed on the current page
    const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * postsPerPage.value;
      const end = start + postsPerPage.value;
      return allPosts.slice(start, end);
    });

    // Function to change page
    function changePage(newPage) {
      if (newPage >= 1 && newPage <= totalPages.value) {
        currentPage.value = newPage;
      }
    }

    // Format date to look nicer
    function formatDate(date) {
      if (!(date instanceof Date)) date = new Date(date);
      return date.toLocaleDateString(); // Or use a more detailed format
    }
    </script>

    <template>
      <div class="latest-posts">
        <ul>
          <li v-for="post in paginatedPosts" :key="post.url">
            <div class="post-item">
                <a :href="post.url" class="post-title">{{ post.title }}</a>
                <span class="post-date">{{ formatDate(post.date) }}</span>
                <p v-if="post.excerpt" class="post-excerpt">{{ post.excerpt }}</p>
            </div>
          </li>
        </ul>

        <!-- Pagination controls -->
        <div class="pagination">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
            Previous
          </button>
          <span>Page {{ currentPage }} / {{ totalPages }}</span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
            Next
          </button>
        </div>
      </div>
    </template>

    <style scoped>
    /* Add some styles to make the list look nicer */
    .latest-posts ul { list-style: none; padding: 0; }
    .post-item { margin-bottom: 1.5em; border-bottom: 1px solid #eee; padding-bottom: 1em; }
    .post-title { font-size: 1.2em; font-weight: bold; display: block; margin-bottom: 0.3em; }
    .post-date { font-size: 0.9em; color: #888; margin-bottom: 0.5em; display: block;}
    .post-excerpt { font-size: 1em; color: #555; line-height: 1.6; margin-top: 0.5em; }
    .pagination { margin-top: 2em; text-align: center; }
    .pagination button { margin: 0 0.5em; padding: 0.5em 1em; cursor: pointer; }
    .pagination button:disabled { cursor: not-allowed; opacity: 0.5; }
    .pagination span { margin: 0 1em; }
    </style>
    ```

    *   Use `import { data as allPosts } from '../posts.data.js'` to import all processed article data.
    *   Use Vue's `ref` (reactive variables) and `computed` (computed properties) to implement pagination logic; the page updates automatically when data changes.

3.  **Use it on the Homepage (`index.md`)**: In your homepage Markdown file (`index.md`), use this component just like a regular HTML tag:

    ```markdown
    ---
    layout: home # Ensure your layout supports Vue components; the default home layout usually does.
    ---
    <script setup>
    // Import the component we just wrote
    import LatestPosts from './.vitepress/theme/components/LatestPosts.vue'
    </script>

    # My Blog Homepage

    Welcome to my site...

    ## Latest Articles

    <LatestPosts /> <!-- Place the component where you want the list to appear -->

    Other content you want to include...
    ```

4.  **Fix the Theme Error (`.vitepress/theme/index.js`)**: How to solve that annoying `@theme/index` error? It's actually simple. Once you create the `.vitepress/theme` directory (even if just to place `posts.data.js` or components), VitePress needs a theme entry file. You just need to create a `theme/index.js` that simply extends the default theme:

    ```javascript
    // .vitepress/theme/index.js
    import DefaultTheme from 'vitepress/theme'
    // Just like this, export an object that extends the default theme
    export default { ...DefaultTheme }
    ```
    This lets VitePress know how to load the theme, and your custom `posts.data.js` and components will work normally.

## Review and Summary: Pitfalls and Key Takeaways

After all this tinkering, I gained quite a bit and have a few key takeaways:

*   **`createContentLoader` is the Key:** For VitePress 1.x, this is the officially recommended, performant, and convenient way to process content data at build time.
*   **Frontmatter Standardization is Crucial:** The processing logic in `posts.data.js` heavily relies on the `title` and `date` fields in the Markdown file headers. Therefore, when writing articles, this **must** be standardized, especially the `date` format must be correct; otherwise, data processing will fail and the feature won't work.
*   **Don't Mess Up Paths:** When `import`ing other files in `.vue` or `data.js` files, ensure relative paths are correct, or files won't be found.
*   **Trade-offs in Excerpt Generation:** Using regex to strip tags and generate plain text excerpts is a simple and fast method, but it might not be perfect for particularly complex Markdown. However, it's usually sufficient for quick previews.
*   **Beware of the Theme Entry "Pitfall":** Whenever you modify the `.vitepress/theme` directory, even if just adding a file, remember to provide `theme/index.js`, even if it just simply extends the default theme. Otherwise, startup will fail.
*   **AI is a Good Helper, But Don't Treat It as a "Deity":** AI can indeed be helpful, but it cannot completely replace your understanding of the framework. When encountering problems, you still need to learn to consult official documentation and debug yourself. Also, choosing the right AI model is crucial; this time Gemini was much more effective than Grok.

---

Finally, I managed to add the desired paginated article list to my VitePress site's homepage, preserving the structured navigation of a documentation site while also meeting the needs of a blog article stream. Mission accomplished (this blog site itself uses this implementation)!

Although the process had some twists and turns, it deepened my understanding of VitePress and gave me a chance to experience the performance differences of various AI tools in practice. Definitely worth it!