import { expect } from '@playwright/test';
import { test } from './page';

test('navigates to a section from the header', async ({ page, isMobile }) => {
  await page.goto('/');
  const toggle = page.locator('[data-nav-toggle]');
  const skillsLink = page.locator('header nav a[href="#skills"]');
  const main = page.locator('main');

  if (isMobile) {
    await expect(skillsLink).toBeHidden();
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(main).toHaveAttribute('inert', '');

    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
    await expect(main).not.toHaveAttribute('inert', '');

    await toggle.click();
  } else {
    await expect(toggle).toBeHidden();
  }

  await skillsLink.click();
  await expect(page).toHaveURL(/#skills$/);
  await expect(page.locator('#skills-title')).toBeInViewport();
  if (isMobile) await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
