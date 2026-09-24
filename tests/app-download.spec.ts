import { test, expect } from '@playwright/test';
import { parseReleases, RELEASE_URL, PLAY_URL } from '../src/lib/appReleases';

const website = { versionCode: 11, versionName: '1.8.0', minSdk: 24,
  downloadUrl: 'https://downloads.matgarko.com/android/releases/1.8.0-11.apk', sizeBytes: 63300000, sha256: 'a'.repeat(64) };
const manifest = { schemaVersion: 1, packageName: 'com.matgarko.merchant', website,
  play: { versionCode: 10, versionName: '1.7.0', minSdk: 24, storeUrl: PLAY_URL } };

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('matgarko-consent', 'declined'));
  await page.route('https://www.googletagmanager.com/**', route => route.abort());
});

test('strict release contract rejects unsafe links, wrong identity and invalid versions', () => {
  expect(parseReleases(manifest).website?.versionCode).toBe(11);
  for (const invalid of [
    { ...manifest, schemaVersion: 2 }, { ...manifest, packageName: 'wrong.app' },
    { ...manifest, website: undefined },
    { ...manifest, website: { ...website, versionCode: -1 } },
    { ...manifest, website: { ...website, downloadUrl: 'javascript:alert(1)' } },
    { ...manifest, website: { ...website, downloadUrl: `${website.downloadUrl}?redirect=evil` } },
    { ...manifest, website: { ...website, sha256: 'bad' } },
    { ...manifest, website: { ...website, sizeBytes: 536870913 } },
  ]) expect(() => parseReleases(invalid)).toThrow();
});

test('Arabic mobile download uses independent channels and collapsed instructions', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.route(RELEASE_URL, route => route.fulfill({ json: manifest }));
  await page.goto('/download');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('حمّل تطبيق متجركو');
  await expect(page.getByRole('link', { name: 'تحميل مباشر لأندرويد (APK)' })).toHaveAttribute('href', website.downloadUrl);
  await expect(page.getByRole('link', { name: 'تحميل من Google Play' })).toHaveAttribute('href', PLAY_URL);
  await expect(page.getByText('حمّل الملف وافتحه من التنزيلات.')).not.toBeVisible();
  await page.getByText('إزاي أثبّت التطبيق؟').click();
  await expect(page.getByText('حمّل الملف وافتحه من التنزيلات.')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.screenshot({ path: 'test-results/download-ar-mobile.png', fullPage: true });
});

test('English website release does not advertise an unpublished Play channel', async ({ page }) => {
  await page.route(RELEASE_URL, route => route.fulfill({ json: { ...manifest, play: null } }));
  await page.goto('/en/download');
  await expect(page.getByRole('link', { name: 'Download for Android (APK)' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get it on Google Play' })).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('empty manifest keeps browser fallback without any download buttons', async ({ page }) => {
  await page.route(RELEASE_URL, route => route.fulfill({ json: { ...manifest, play: null, website: null } }));
  await page.goto('/download');
  await expect(page.getByText('تحميل التطبيق قيد التجهيز.', { exact: false })).toBeVisible();
  await expect(page.getByRole('link', { name: 'تحميل مباشر لأندرويد (APK)' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'فتح لوحة المتجر' })).toBeVisible();
});

test('network failure stays useful and a retry recovers', async ({ page }) => {
  let calls = 0;
  let offline = true;
  await page.route(RELEASE_URL, route => { calls++; return offline ? route.abort() : route.fulfill({ json: manifest }); });
  await page.goto('/download');
  await expect(page.getByRole('button', { name: 'فتح لوحة المتجر' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'إعادة المحاولة' })).toBeVisible();
  const beforeRetry = calls;
  offline = false;
  await page.getByRole('button', { name: 'إعادة المحاولة' }).click();
  await expect(page.getByRole('link', { name: 'تحميل مباشر لأندرويد (APK)' })).toBeVisible();
  expect(calls).toBe(beforeRetry + 1);
});

test('invalid metadata never exposes a download URL', async ({ page }) => {
  await page.route(RELEASE_URL, route => route.fulfill({ json: { ...manifest, website: { ...website, downloadUrl: 'https://evil.example/app.apk' } } }));
  await page.goto('/download');
  await expect(page.getByRole('button', { name: 'إعادة المحاولة' })).toBeVisible();
  await expect(page.locator('a[href*="evil.example"]')).toHaveCount(0);
});

test('browser fallback validates platform address and opens the correct admin', async ({ page }) => {
  await page.route(RELEASE_URL, route => route.fulfill({ json: { ...manifest, play: null, website: null } }));
  await page.goto('/download');
  for (const value of ['https://evil.example', 'https://test.matgarko.com@evil.example', 'javascript:alert(1)', 'downloads']) {
    await page.getByLabel('رابط المتجر').fill(value);
    await page.getByRole('button', { name: 'فتح لوحة المتجر' }).click();
    await expect(page.getByLabel('رابط المتجر')).toHaveAttribute('aria-invalid', 'true');
    await expect(page).toHaveURL(/\/download$/);
  }
  await page.route('https://test.matgarko.com/admin', route => route.fulfill({ body: '<h1>Store admin</h1>' }));
  await page.getByLabel('رابط المتجر').fill('test.matgarko.com');
  await page.getByRole('button', { name: 'فتح لوحة المتجر' }).click();
  await expect(page).toHaveURL('https://test.matgarko.com/admin');
});
