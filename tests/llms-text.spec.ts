import { expect } from '@playwright/test';
import { test } from './page';

test('serves llms.txt as Markdown that starts with a top-level heading', async ({ request }) => {
  const response = await request.get('/llms.txt');
  expect(response.status()).toBe(200);
  const text = await response.text();
  expect(text).toMatch(/^# \S/);
  expect(text).toContain('\n## Pages\n');
});
