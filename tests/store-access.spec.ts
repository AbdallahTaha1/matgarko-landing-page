import { expect, test } from '@playwright/test';

const token = '02c9185d-4208-4a64-804f-f38f0c0de641';
const adminUrl = 'https://testshop.matgarko.com/admin';
const storeUrl = 'https://testshop.matgarko.com/';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('matgarko-consent', 'declined'));
  await page.route('https://www.googletagmanager.com/**', route => route.abort());
  await page.route('https://connect.facebook.net/**', route => route.abort());
  await page.route('**/api/signup/v1/config', route => route.fulfill({ json: { enabled: true, baseDomain: 'matgarko.com' } }));
  await page.route(adminUrl, route => route.fulfill({ contentType: 'text/html', body: '<h1>Store dashboard</h1>' }));
});

test('Arabic and English headers expose store access with the mobile menu closed', async ({ page }, testInfo) => {
  for (const width of [320, 375, 1024, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const en of [false, true]) {
      await page.goto(en ? '/en' : '/');
      const header = page.locator('header');
      await header.getByRole('link', { name: en ? 'My store' : 'ادخل متجرك', exact: true }).filter({ visible: true }).click();
      await expect(page).toHaveURL(en ? /\/en\/login$/ : /\/login$/);
      await expect(page.getByRole('heading', { level: 1, name: en ? 'Access your store' : 'ادخل متجرك' })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const overlaps = await header.evaluate(element => {
        const children = Array.from(element.firstElementChild!.children).filter(child => child.getBoundingClientRect().width > 0);
        return children.some((child, i) => children.slice(i + 1).some(other => {
          const a = child.getBoundingClientRect(), b = other.getBoundingClientRect();
          return Math.min(a.right, b.right) > Math.max(a.left, b.left);
        }));
      });
      expect(overlaps).toBe(false);
      if (!en && width === 375) await page.screenshot({ path: testInfo.outputPath('store-access-mobile.png'), fullPage: true });
    }
  }
});

test('forgotten-link help is useful on a fresh browser without a saved store', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'متجرك المحفوظ' })).toHaveCount(0);
  await page.getByText('مش فاكر رابط متجرك؟', { exact: true }).click();
  await expect(page.getByText(/تم تفعيل متجرك/)).toBeVisible();
  await expect(page.getByRole('link', { name: 'ساعدني أوصل لمتجري' })).toHaveAttribute('href', /^https:\/\/wa\.me\/201080312538\?text=/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

for (const address of ['testshop', ' TestShop.matgarko.com ', 'https://testshop.matgarko.com/', adminUrl]) {
  test(`opens and remembers a platform address: ${address}`, async ({ page }) => {
    await page.goto('/en/login');
    await page.getByLabel('Store link or address name').fill(address);
    await page.getByRole('button', { name: 'Go to dashboard' }).click();
    await expect(page).toHaveURL(adminUrl);
    await page.goto('/en/login');
    await expect(page.getByRole('heading', { name: 'Your saved store' })).toBeVisible();
    await expect(page.getByRole('link', { name: storeUrl, exact: true })).toHaveAttribute('href', storeUrl);
    await expect(page.getByRole('link', { name: 'Open your dashboard' })).toHaveAttribute('href', adminUrl);
  });
}

test('saved store is reusable across pages and removable without registering again', async ({ page, context }, testInfo) => {
  await page.goto('/en');
  await page.evaluate(value => localStorage.setItem('matgarko-last-store', value), storeUrl);
  await page.reload();
  await expect(page.getByRole('link', { name: 'Open your dashboard' })).toHaveAttribute('href', adminUrl);
  await expect(page.getByRole('link', { name: 'Manage your store', exact: true })).toHaveAttribute('href', adminUrl);
  await expect(page.locator('header').getByRole('link', { name: 'Dashboard', exact: true })).toHaveAttribute('href', adminUrl);
  await page.goto('/en/register');
  await expect(page.getByRole('link', { name: 'Open your dashboard' })).toHaveAttribute('href', adminUrl);
  await page.getByRole('link', { name: 'Store access options' }).click();
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.getByRole('button', { name: 'Copy store link' }).click();
  await expect(page.getByRole('status')).toContainText('Store link copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(storeUrl);
  await page.goto('/login');
  await page.screenshot({ path: testInfo.outputPath('store-access-desktop.png'), fullPage: true });
  await page.getByRole('button', { name: 'امسح الرابط المحفوظ' }).click();
  await expect(page.getByRole('heading', { name: 'متجرك المحفوظ' })).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('matgarko-last-store'))).toBeNull();
});

test('unsafe addresses and poisoned saved links never become dashboard links', async ({ page }) => {
  await page.goto('/en/login');
  const invalid = ['https://evil.example', 'testshop.matgarko.com.evil.example', 'https://testshop.matgarko.com@evil.example', 'https://owner:secret@testshop.matgarko.com', 'https://testshop.matgarko.com/?token=secret', 'https://testshop.matgarko.com/#secret', 'https://testshop.matgarko.com/go', 'javascript:alert(1)', 'signup', 'downloads', 'nested.testshop.matgarko.com', 'https://testshop.matgarko.com\\@evil.example'];
  for (const address of invalid) {
    await page.getByLabel('Store link or address name').fill(address);
    await page.getByRole('button', { name: 'Go to dashboard' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page).toHaveURL(/\/en\/login$/);
    expect(await page.evaluate(() => localStorage.getItem('matgarko-last-store'))).toBeNull();
  }
  await page.evaluate(() => localStorage.setItem('matgarko-last-store', 'https://evil.example'));
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Your saved store' })).toHaveCount(0);
  await expect(page.locator('a[href*="evil.example"]')).toHaveCount(0);
});

test('restored ready signup opens the dashboard even when local storage is blocked', async ({ page }) => {
  await page.addInitScript(value => {
    sessionStorage.setItem('matgarko-pending-signup', value);
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked'); } });
  }, token);
  await page.route('**/api/signup/v1/status', route => route.fulfill({ json: { state: 'ready', adminUrl, storeUrl } }));
  await page.goto('/register');
  await expect(page.getByRole('heading', { name: 'متجرك جاهز!' })).toBeVisible();
  await expect(page).toHaveURL(adminUrl);
});

for (const status of [
  { state: 'verification' }, { state: 'provisioning' }, { state: 'unavailable' },
  { state: 'ready' }, { state: 'ready', adminUrl: 'https://evil.example/admin' },
  { state: 'ready', adminUrl: 'https://owner:secret@testshop.matgarko.com/admin' },
  { state: 'ready', adminUrl, storeUrl: 'https://different.matgarko.com/' },
]) {
  test(`does not redirect or remember an incomplete or unsafe status: ${JSON.stringify(status)}`, async ({ page }) => {
    await page.addInitScript(value => sessionStorage.setItem('matgarko-pending-signup', value), token);
    await page.route('**/api/signup/v1/status', route => route.fulfill({ json: status }));
    await page.clock.install();
    await page.goto('/en/register');
    await expect(page.getByRole(status.state === 'ready' || status.state === 'unavailable' ? 'alert' : 'heading', status.state === 'verification' ? { name: 'Verify your email' } : status.state === 'provisioning' ? { name: 'Preparing your store' } : {})).toBeVisible();
    await page.clock.runFor(2000);
    await expect(page).toHaveURL(/\/en\/register$/);
    expect(await page.evaluate(() => localStorage.getItem('matgarko-last-store'))).toBeNull();
  });
}
