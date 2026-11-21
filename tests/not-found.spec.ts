import { expect } from '@playwright/test';
import { test } from './page';

test('serves the not found page for an unknown address and links home', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');

  await page.getByRole('link', { name: 'Go to the home page' }).click();
  await expect(page).toHaveURL('/');
  await expect(page.locator('section#top')).toBeVisible();
});

test('reports an unknown address to analytics', async ({ page }) => {
  const analyticsMessages: string[] = [];
  page.on('console', (message) => {
    if (message.text().startsWith('[analytics]')) analyticsMessages.push(message.text());
  });

  await page.goto('/this-page-does-not-exist/?ga_debug=1');
  await expect
    .poll(() => analyticsMessages.find((text) => text.includes('page_not_found')))
    .toContain('/this-page-does-not-exist/');
});
