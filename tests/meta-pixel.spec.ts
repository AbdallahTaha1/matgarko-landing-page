import { expect, test, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('https://www.googletagmanager.com/**', route => route.fulfill({ contentType: 'text/javascript', body: '' }));
  await page.route('https://connect.facebook.net/**', route => route.fulfill({ contentType: 'text/javascript', body: '' }));
  await page.route('https://www.facebook.com/tr**', route => route.abort());
});

async function commands(page: Page) {
  return page.evaluate(() => window.fbq?.queue || []);
}
async function views(page: Page) {
  return (await commands(page)).filter(event => event[0] === 'trackSingle' && event[2] === 'PageView');
}

test('Meta loads only after consent, tracks SPA routes once, and stops after withdrawal', async ({ page }) => {
  await page.goto('/en?utm_source=facebook&fbclid=test-click');
  expect(await commands(page)).toEqual([]);
  expect(await page.locator('script[src*="connect.facebook.net"]').count()).toBe(0);
  await page.getByRole('button', { name: 'Allow', exact: true }).click();
  await expect.poll(() => views(page)).toHaveLength(1);
  expect(await commands(page)).toContainEqual(['set', 'autoConfig', false, '123456789012345']);
  expect((await commands(page)).filter(event => event[0] === 'init')).toEqual([['init', '123456789012345']]);
  await page.getByRole('navigation').getByRole('link', { name: 'Pricing', exact: true }).click();
  await expect.poll(() => views(page)).toHaveLength(2);
  await page.getByRole('button', { name: 'Cookie preferences', exact: true }).click();
  await page.getByRole('button', { name: 'Decline', exact: true }).click();
  expect((await commands(page)).filter(event => event[0] === 'consent').at(-1)).toEqual(['consent', 'revoke']);
  await page.getByRole('navigation').getByRole('link', { name: 'Solutions', exact: true }).click();
  expect(await views(page)).toHaveLength(2);
  await page.getByRole('button', { name: 'Cookie preferences', exact: true }).click();
  await page.getByRole('button', { name: 'Allow', exact: true }).click();
  await expect.poll(() => views(page)).toHaveLength(3);
  expect((await commands(page)).filter(event => event[0] === 'init')).toHaveLength(1);
  expect(await page.locator('script[src*="connect.facebook.net"]').count()).toBe(1);
});

test('URLs containing private parameters or referrers do not load Meta', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('matgarko-consent', 'accepted'));
  await page.goto('/en?token=private&email=owner@example.com');
  await expect(page.getByRole('navigation')).toBeVisible();
  expect(await commands(page)).toEqual([]);
  expect(await page.locator('script[src*="connect.facebook.net"]').count()).toBe(0);
  await page.goto('/en', { referer: 'https://example.com/?token=private' });
  await expect(page.getByRole('navigation')).toBeVisible();
  expect(await commands(page)).toEqual([]);
});

test('a delayed script cannot send after consent is withdrawn', async ({ page }) => {
  let release!: () => void;
  const blocked = new Promise<void>(resolve => { release = resolve; });
  await page.route('https://connect.facebook.net/**', async route => {
    await blocked;
    await route.fulfill({ contentType: 'text/javascript', body: '' });
  });
  await page.goto('/en');
  await page.getByRole('button', { name: 'Allow', exact: true }).click();
  await expect(page.locator('script[src*="connect.facebook.net"]')).toHaveCount(1);
  await page.getByRole('button', { name: 'Cookie preferences', exact: true }).click();
  await page.getByRole('button', { name: 'Decline', exact: true }).click();
  release();
  await page.waitForLoadState('networkidle');
  expect(await views(page)).toHaveLength(0);
});
