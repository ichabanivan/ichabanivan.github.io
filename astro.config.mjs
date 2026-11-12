import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const afterPaint = {
  name: 'after-paint',
  hooks: {
    'astro:config:setup': ({ addClientDirective }) => {
      addClientDirective({
        name: 'afterpaint',
        entrypoint: fileURLToPath(new URL('./src/lib/after-paint-directive.ts', import.meta.url)),
      });
    },
  },
};

export default defineConfig({
  site: 'https://ichabanivan.github.io',
  trailingSlash: 'always',
  compressHTML: false,
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap(), react(), afterPaint],
  vite: { plugins: [vanillaExtractPlugin()] },
});
