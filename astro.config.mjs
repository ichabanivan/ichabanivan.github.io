import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// React only renders at build time; without a client entrypoint Astro neither bundles
// react-dom for the browser nor allows a `client:*` directive on a React component.
const serverOnly = (integration) => ({
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
  integrations: [sitemap(), serverOnly(react())],
  vite: { plugins: [vanillaExtractPlugin()] },
});
