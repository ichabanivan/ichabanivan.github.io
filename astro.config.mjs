import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const withoutClientRenderer = (integration) => ({
  ...integration,
  hooks: {
    ...integration.hooks,
    'astro:config:setup': (options) =>
      integration.hooks['astro:config:setup']({
        ...options,
        addRenderer: ({ clientEntrypoint: _, ...renderer }) => options.addRenderer(renderer),
      }),
  },
});

export default defineConfig({
  site: 'https://ichabanivan.github.io',
  trailingSlash: 'always',
  compressHTML: false,
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap(), withoutClientRenderer(react())],
  vite: { plugins: [vanillaExtractPlugin()] },
});
