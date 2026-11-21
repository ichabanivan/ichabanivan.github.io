import { expect } from '@playwright/test';
import { test } from './page';

test('opens, steps through and closes documents with the keyboard', async ({ page }) => {
  await page.goto('/');
  const documentLinks = page.locator('a[data-lightbox]');
  const documentCount = await documentLinks.count();
  expect(documentCount).toBeGreaterThan(1);

  const firstLink = documentLinks.first();
  const dialog = page.locator('[data-lightbox-dialog]');
  const image = dialog.locator('[data-lightbox-image]');
  const counter = dialog.locator('[data-lightbox-counter]');

  await firstLink.focus();
  await page.keyboard.press('Enter');
  await expect(dialog).toBeVisible();
  await expect(image).toHaveAttribute(
    'src',
    await firstLink.evaluate((link: HTMLAnchorElement) => link.href),
  );
  await expect(counter).toHaveText(`Document 1 of ${documentCount}.`);

  await page.keyboard.press('ArrowRight');
  await expect(counter).toHaveText(`Document 2 of ${documentCount}.`);
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await expect(counter).toHaveText(`Document ${documentCount} of ${documentCount}.`);

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(firstLink).toBeFocused();
});
