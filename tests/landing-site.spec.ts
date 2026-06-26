import { expect, test } from '@playwright/test';

test.describe('Matgarko Arabic ecommerce SaaS landing site', () => {
  test('homepage presents the store creation offer and SEO metadata', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('متجركو | إنشاء متجر إلكتروني في مصر بدون برمجة');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /أنشئ متجر إلكتروني عربي/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://matgarko.com/');
    await expect(page.getByRole('heading', { name: /أنشئ متجر إلكتروني/ })).toBeVisible();
    await expect(page.getByText('منصة إنشاء متجر إلكتروني في مصر')).toBeVisible();
    await expect(page.getByText('جاهز للتسويق والبيع')).toBeVisible();
    await expect(page.getByText('أسئلة شائعة')).toBeVisible();
  });

  test('commercial navigation pages load with current positioning', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('navigation').getByRole('link', { name: 'الحلول' }).click();
    await page.waitForURL('**/solutions');
    await expect(page.getByRole('heading', { name: 'كل ما تحتاجه لإدارة متجرك من مكان واحد' })).toBeVisible();

    await page.getByRole('navigation').getByRole('link', { name: 'القوالب' }).click();
    await page.waitForURL('**/themes');
    await expect(page.getByRole('heading', { name: 'اختر شكل المتجر المناسب لنشاطك' })).toBeVisible();

    await page.getByRole('navigation').getByRole('link', { name: 'الدفع والشحن' }).click();
    await page.waitForURL('**/integrations');
    await expect(page.getByRole('heading', { name: 'اربط متجرك بما يحتاجه نشاطك' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'الدفع' })).toBeVisible();

    await page.getByRole('navigation').getByRole('link', { name: 'خطوات البدء' }).click();
    await page.waitForURL('**/getting-started');
    await expect(page.getByRole('heading', { name: /من إنشاء المتجر إلى أول طلب/ })).toBeVisible();

    await page.getByRole('navigation').getByRole('link', { name: 'الأسعار' }).click();
    await page.waitForURL('**/pricing');
    await expect(page.getByRole('heading', { name: 'باقات شهرية تناسب بداية متجرك ونموه' })).toBeVisible();
  });

  test('trust and support pages are crawlable', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: 'متجركو يساعدك تبدأ بيع أونلاين بسهولة' })).toBeVisible();
    await expect(page.getByText('مناسب للسوق المصري')).toBeVisible();

    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: 'نحن هنا لمساعدتك' })).toBeVisible();
    await expect(page.getByRole('link', { name: /واتساب \+20 108 031 2538/ })).toBeVisible();
  });

  test('registration page supports the signup journey', async ({ page }) => {
    await page.goto('/register');

    await expect(page.getByRole('heading', { name: 'أنشئ متجرك الآن' })).toBeVisible();
    await expect(page.locator('input[name="storeName"]')).toBeVisible();
    await expect(page.locator('input[name="subdomain"]')).toBeVisible();
  });

  test('crawl files are available from public assets', async ({ request }) => {
    const robots = await request.get('/robots.txt');
    await expect(robots).toBeOK();
    await expect(await robots.text()).toContain('Sitemap: https://matgarko.com/sitemap.xml');

    const sitemap = await request.get('/sitemap.xml');
    await expect(sitemap).toBeOK();
    await expect(await sitemap.text()).toContain('<loc>https://matgarko.com/themes</loc>');
  });
});
