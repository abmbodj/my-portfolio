// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
const mode = process.argv.includes("dev") ? "development" : "production";
const env = loadEnv(mode, process.cwd(), '');

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  build: {
    inlineStylesheets: 'always'
  },
  vite: {
    plugins: [tailwindcss()],
  },
  site: process.env.SITE_URL || env.SITE_URL || 'https://my-portfolio.pmbodj49.workers.dev',
  base: process.env.BASE_PATH || env.BASE_PATH || '/',
  integrations: [
    sitemap({
      filter: (page) => !/\/dev-tools(?:\/|$)/.test(new URL(page).pathname),
    }),
  ],
});
