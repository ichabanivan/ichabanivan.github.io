import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('sitemap.xml needs the `site` option in astro.config.mjs');
  const siteUrl = new URL(import.meta.env.BASE_URL, site).href;
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
  </url>
</urlset>
`;
  return new Response(sitemap, {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
};
