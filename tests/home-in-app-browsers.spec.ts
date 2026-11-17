import { expect, test } from '@playwright/test';

// Most visitors arrive from an ad, inside the Facebook, Instagram or TikTok in-app browser, whose
// screen is shorter than the phone's: the app keeps its own bar above and below the page.
const inAppBrowsers = [
  {
    name: 'Facebook on Android',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-A125F Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.6099.230 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/446.0.0.31.115;]',
    viewport: { width: 360, height: 600 },
  },
  {
    name: 'Instagram on iPhone',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 312.0.0.24.108 (iPhone13,2; iOS 16_6; en_US; en; scale=3.00; 1170x2532; 548339486)',
    viewport: { width: 390, height: 640 },
  },
  {
    name: 'TikTok on Android',
    userAgent: 'Mozilla/5.0 (Linux; Android 11; Redmi Note 8 Build/RKQ1.201004.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/119.0.6045.193 Mobile Safari/537.36 trill_2023305030 JsSdk/1.0 NetType/4G Channel/googleplay AppName/trill app_version/33.5.3 ByteLocale/ar ByteFullLocale/ar Region/EG BytedanceWebview/d8a21c6',
    viewport: { width: 393, height: 620 },
  },
];

for (const browser of inAppBrowsers) {
  test.describe(browser.name, () => {
    test.use({ userAgent: browser.userAgent, viewport: browser.viewport, hasTouch: true, isMobile: true });

    test('the home page shows its offer and signup button on the first screen, with nothing cut off', async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(() => localStorage.setItem('matgarko-consent', 'declined'));
      await page.goto('/');

      await expect(page.getByRole('heading', { level: 1, name: /افتح متجرك الإلكتروني مجاناً وأول 20 طلب علينا/ })).toBeVisible();
      const signup = page.locator('main').getByRole('link', { name: 'أنشئ متجرك مجاناً' }).first();
      await expect(signup).toHaveAttribute('href', '/register');
      const box = await signup.boundingBox();
      expect(box!.y + box!.height).toBeLessThanOrEqual(browser.viewport.height);
      expect(box!.height).toBeGreaterThanOrEqual(48);

      // Every section is on the page and none pushes it sideways.
      for (const heading of ['ما هي متجركو؟', 'أدوات بسيطة تخلي متجرك يبيع', 'اعرف الطلب الوهمي قبل ما تشحنه', 'ستة قوالب جاهزة، وغيّر الشكل وقت ما تحب', 'ابدأ مجاناً، وادفع لما تبيع', 'أسئلة شائعة', 'رابط متجرك مستنيك']) {
        await expect(page.getByRole('heading', { name: heading })).toBeAttached();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);

      // Scrolling brings up the fixed signup bar, and the page's end hides it again.
      await page.evaluate(() => window.scrollTo({ top: 1600, behavior: 'instant' }));
      await expect(page.getByRole('link', { name: 'أنشئ متجرك', exact: true })).toBeVisible();
      await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
      await expect(page.getByRole('link', { name: 'أنشئ متجرك', exact: true })).toHaveCount(0);
      expect(errors).toEqual([]);
    });
  });
}

test('the store link typed on the home page arrives filled in on the signup form', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('matgarko-consent', 'declined'));
  await page.route('**/api/signup/v1/config', route => route.fulfill({ json: { enabled: true, baseDomain: 'matgarko.com' } }));
  await page.route('**/api/signup/v1/subdomain**', route => route.fulfill({ json: { available: true } }));
  await page.goto('/');

  await page.getByLabel('رابط متجرك', { exact: true }).fill('  Nour Store! ');
  await page.getByLabel('رابط متجرك', { exact: true }).press('Enter');
  await page.waitForURL('**/register');
  await expect(page.locator('input[name="subdomain"]')).toHaveValue('nour-store');
  await expect(page.locator('input[name="storeName"]')).toHaveValue('');
  expect(await page.evaluate(() => sessionStorage.getItem('matgarko-signup-link'))).toBeNull();
});

test('the home page states what Matgarko is, with facts a search engine or an AI assistant can quote', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('متجركو منصة مصرية لإنشاء المتاجر الإلكترونية بدون برمجة.', { exact: false })).toBeVisible();
  const facts = page.locator('#what-is dl');
  await expect(facts.getByText('السعر في مصر')).toBeVisible();
  await expect(facts.getByText('الدفع عند الاستلام، تحويل إنستاباي أو محفظة، وبطاقات عبر Paymob أو Kashier')).toBeVisible();
  await expect(page.locator('#what-is time')).toHaveAttribute('datetime', /^\d{4}-\d{2}-\d{2}$/);
  await expect(page.locator('#templates img')).toHaveCount(6);
  for (const image of await page.locator('#templates img').all()) await expect(image).toHaveAttribute('alt', /قالب «.+» لمتجر/);

  const schema = await page.locator('#matgarko-route-schema').textContent();
  expect(schema).toContain('"dateModified"');
  expect(schema).toContain('Paymob');
});
