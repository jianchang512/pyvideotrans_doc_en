// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      // 代理 Google 翻译的请求
      'https://translate.google.com': {
        target: 'https://translate.google.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/https:\/\/translate\.google\.com/, ''),
      },
    },
  },
});
