import { expect, test as base, type Locator, type Page } from '@playwright/test';

const ANALYTICS_EXCLUDE_KEY = 'analytics_exclude';
const ANIMATED = '[data-reveal], [data-split], [data-skill-row]';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript((key) => {
      localStorage.setItem(key, '1');
    }, ANALYTICS_EXCLUDE_KEY);
    await use(page);
  },
});

export function collectProblems(page: Page): string[] {
  const problems: string[] = [];
  page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(`console: ${message.text()}`);
  });
  page.on('requestfailed', (request) => problems.push(`requestfailed: ${request.url()}`));
  return problems;
}

export async function animatedElements(page: Page): Promise<Locator[]> {
  const elements = await page.locator(ANIMATED).all();
  expect(elements.length).toBeGreaterThan(0);
  return elements;
}

export async function expectShown(element: Locator): Promise<void> {
  await expect(element).toHaveCSS('opacity', '1');
}

export async function expectAllShownWithoutScrolling(page: Page): Promise<void> {
  for (const element of await animatedElements(page)) await expectShown(element);
}
