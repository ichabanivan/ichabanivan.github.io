import { readFile } from 'node:fs/promises';

const DEFAULT_PAGE = new URL('../dist/index.html', import.meta.url);
const page = process.argv[2] ?? DEFAULT_PAGE;
const SITE_ORIGIN = 'https://ichabanivan.github.io';
const BLOCKS_AUTOMATED_REQUESTS = ['www.linkedin.com'];
const REQUEST_TIMEOUT_MS = 30_000;
const ATTEMPTS = 3;
const RETRY_DELAY_MS = 5_000;
const PDF_TYPE = 'application/pdf';
const expectsPdf = (url) => /format=pdf|\.pdf$/.test(url);
const BROWSER_HEADERS = {
  'user-agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8',
  'accept-language': 'en',
};

const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function externalLinks(html) {
  const links = new Set();
  for (const [, href] of html.matchAll(/<a\s[^>]*?href="(https?:\/\/[^"]+)"/g)) {
    const url = new URL(href.replaceAll('&amp;', '&'));
    if (url.origin === SITE_ORIGIN || BLOCKS_AUTOMATED_REQUESTS.includes(url.hostname)) continue;
    links.add(url.href);
  }
  return [...links];
}

async function requestStatus(url) {
  const response = await fetch(url, {
    headers: BROWSER_HEADERS,
    redirect: 'follow',
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  await response.body?.cancel();
  if (!response.ok) return `HTTP ${response.status}`;
  const contentType = response.headers.get('content-type') ?? 'no content type';
  if (expectsPdf(url) && !contentType.startsWith(PDF_TYPE))
    return `expected a PDF, got ${contentType}`;
  return null;
}

async function check(url) {
  let problem = null;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    try {
      problem = await requestStatus(url);
    } catch (error) {
      problem = error.cause?.code ?? error.message;
    }
    if (!problem) return null;
    if (attempt < ATTEMPTS) await pause(RETRY_DELAY_MS);
  }
  return problem;
}

const links = externalLinks(await readFile(page, 'utf8'));
if (!links.length) throw new Error('No external links found in the built page');

const results = await Promise.all(links.map(async (url) => ({ url, problem: await check(url) })));
for (const { url, problem } of results)
  console.log(`${problem ? 'FAIL' : 'ok  '} ${url}${problem ? ` (${problem})` : ''}`);

const broken = results.filter(({ problem }) => problem);
if (broken.length) {
  console.error(`\n${broken.length} of ${results.length} external links are broken.`);
  process.exitCode = 1;
}
