import { expect, test } from '@playwright/test';

test.describe('Basic Test', () => {
  test('Home Page', async ({ page }) => {
    await page.goto('/');

    const headText = page.locator('h1=Chan Ka Tsun');

    expect(headText).toBeDefined();
  });

  test.describe('Headbar', () => {
    test('Navigation', async ({ page }) => {
      await page.goto('/');
      await page.getByRole('link', { name: 'About' }).click();
      await expect(page).toHaveURL('/about');
    });
  });

  test('Spotlight', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Spotlight' }).click();
    await page.getByPlaceholder('Search Here').click();
    await page.getByPlaceholder('Search Here').fill('about');
    await page.getByRole('button', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');
  });

  test.describe('Footer', () => {
    test('Text', async ({ page }) => {
      await page.goto('/');
      const headText = page.locator('text=ckt1031');
      expect(headText).toBeDefined();
    });

    test('Social Icons', async ({ page }) => {
      await page.goto('/');
      const [page3] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('footer:has-text("About Me•Techs© 2022 • ckt1031")').getByRole('link').nth(1).click(),
      ]);
      await expect(page3).toHaveURL('https://github.com/cktsun1031');
    });

    test('Navigation', async ({ page }) => {
      await page.goto('/');
      await page.getByRole('link', { name: 'Techs' }).click();
      await expect(page).toHaveURL('/technology');
    });
  });
});
