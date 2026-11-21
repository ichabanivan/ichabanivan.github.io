import type { APIRoute } from 'astro';
import { buildLlmsText } from '../lib/llms-text';

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('llms.txt needs the `site` option in astro.config.mjs');
  const siteUrl = new URL(import.meta.env.BASE_URL, site).href;
  return new Response(buildLlmsText(siteUrl), {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
};
