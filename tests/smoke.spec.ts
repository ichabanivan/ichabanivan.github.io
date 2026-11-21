import { expect } from '@playwright/test';
import {
  animatedElements,
  collectProblems,
  expectAllShownWithoutScrolling,
  expectShown,
  test,
} from './page';

const SECTION_IDS = [
  'top',
  'about',
  'experience',
  'skills',
  'education',
  'certifications',
  'additional',
  'contact',
];

test('reveals every animated element as it scrolls into view, without errors', async ({ page }) => {
  test.slow();
  const problems = collectProblems(page);
  await page.goto('/');

  const elements = await animatedElements(page);
  await expect(elements[elements.length - 1]).toHaveCSS('opacity', '0');

  for (const element of elements) {
    await element.evaluate((node) => {
      node.scrollIntoView({ block: 'center', behavior: 'instant' });
    });
    await expectShown(element);
  }

  for (const id of SECTION_IDS) await expect(page.locator(`section#${id}`)).toBeVisible();
  expect(problems).toEqual([]);
});

test.describe('with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('shows all content without animation', async ({ page }) => {
    await page.goto('/');
    await expectAllShownWithoutScrolling(page);
  });
});

test.describe('with JavaScript disabled', () => {
  test.use({ javaScriptEnabled: false });

  test('shows all content', async ({ page }) => {
    await page.goto('/');
    await expectAllShownWithoutScrolling(page);
    await expect(page.locator('[data-nav-toggle]')).toBeHidden();
  });
});

test('shows all content when the page script fails to load', async ({ page }) => {
  await page.route('**/_astro/*.js', (route) => route.abort());
  await page.goto('/');
  await expectAllShownWithoutScrolling(page);
});
