import { expect, test } from '@playwright/test';

test.describe('Matgarko Arabic ecommerce SaaS landing site', () => {
  test('homepage presents the store creation offer and SEO metadata', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('إنشاء متجر إلكتروني في مصر مجاناً | متجركو');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /ابدأ متجرك الإلكتروني مجاناً/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://matgarko.com/');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://matgarko.com/og-image.png');
    await expect(page.getByRole('heading', { level: 1, name: /أنشئ متجر إلكتروني/ })).toBeVisible();
    await expect(page.getByText('منصة إنشاء متجر إلكتروني في مصر')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'ابدأ متجرك في 3 خطوات' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'ابدأ مجاناً، وادفع لما تبيع' })).toBeVisible();
    await expect(page.getByText('499 ج.م').first()).toBeVisible();
    await expect(page.getByText('1,499 ج.م').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'أسئلة شائعة' })).toBeVisible();
  });

  test('homepage is usable on a mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1, name: /أنشئ متجر إلكتروني/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /أنشئ متجرك مجاناً/ }).first()).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasHorizontalOverflow).toBe(false);

    await page.getByRole('button', { name: 'فتح القائمة' }).click();
    await expect(page.getByRole('navigation', { name: 'القائمة الرئيسية' }).getByRole('link', { name: 'الأسعار' })).toBeVisible();
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
    await expect(page.getByRole('heading', { level: 1, name: 'ابدأ مجاناً، وادفع 2% فقط لما تبيع' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'نمو', exact: true })).toBeVisible();
    await expect(page.getByText('+ 0.5% عمولة على كل طلب مكتمل')).toBeVisible();
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
    const redirects = await request.get('/_redirects');
    await expect(redirects).toBeOK();
    await expect(await redirects.text()).toContain('/* /index.html 200');

    const robots = await request.get('/robots.txt');
    await expect(robots).toBeOK();
    const robotsText = await robots.text();
    await expect(robotsText).toContain('Sitemap: https://matgarko.com/sitemap.xml');
    await expect(robotsText).not.toContain('Disallow: /register');

    const sitemap = await request.get('/sitemap.xml');
    await expect(sitemap).toBeOK();
    const sitemapText = await sitemap.text();
    await expect(sitemapText).toContain('<loc>https://matgarko.com/themes</loc>');
    await expect(sitemapText).toContain('<loc>https://matgarko.com/en/pricing</loc>');
    await expect(sitemapText).toContain('<loc>https://matgarko.com/en/blog/how-to-create-online-store-egypt</loc>');
    await expect(sitemapText).not.toContain('<loc>https://matgarko.com/register</loc>');
    await expect(sitemapText).not.toContain('<loc>https://matgarko.com/en/register</loc>');

    const llms = await request.get('/llms.txt');
    await expect(llms).toBeOK();
    const llmsText = await llms.text();
    await expect(llmsText).toContain('# Matgarko');
    await expect(llmsText).toContain('## Best Pages For AI Answers');
    await expect(llmsText).toContain('https://matgarko.com/pricing');
    await expect(llmsText).toContain('Languages: Arabic (Egypt) and English');
    await expect(llmsText).toContain('499 EGP + 0.5%');
    await expect(llmsText).toContain('https://matgarko.com/en/blog/how-to-create-online-store-egypt');

    const llmsFull = await request.get('/llms-full.txt');
    await expect(llmsFull).toBeOK();
    const llmsFullText = await llmsFull.text();
    await expect(llmsFullText).toContain('## Citation Preference');
    await expect(llmsFullText).toContain('Pro: 1,499 EGP/month with 0% commission');

    const ogImage = await request.get('/og-image.png');
    await expect(ogImage).toBeOK();
    expect(ogImage.headers()['content-type']).toContain('image/png');

    const indexNowKey = await request.get('/43d1ff6a773e42bb8740f69cc3a723b6.txt');
    await expect(indexNowKey).toBeOK();
    await expect((await indexNowKey.text()).trim()).toBe('43d1ff6a773e42bb8740f69cc3a723b6');
  });

  test('structured data reflects the current pricing and does not advertise non-indexable pages', async ({ page }) => {
    await page.goto('/');

    const routeSchema = await page.locator('#matgarko-route-schema').textContent();
    const navigationSchema = await page.locator('#matgarko-site-navigation').textContent();

    await expect(page.locator('link[rel="alternate"][href="/llms.txt"]')).toHaveAttribute('type', 'text/markdown');
    await expect(page.locator('link[rel="alternate"][href="/llms-full.txt"]')).toHaveAttribute('type', 'text/markdown');
    expect(routeSchema).toContain('"@type":"Service"');
    expect(routeSchema).toContain('https://matgarko.com/#ecommerce-service');
    expect(routeSchema).toContain('https://matgarko.com/#webpage');
    expect(routeSchema).toContain('"@type":"FAQPage"');
    expect(routeSchema).toContain('"price":"499"');
    expect(routeSchema).toContain('"price":"1499"');
    expect(routeSchema).not.toContain('"price":"399"');
    expect(routeSchema).not.toContain('SearchAction');
    expect(routeSchema).not.toContain('search_term_string');
    expect(navigationSchema).not.toContain('https://matgarko.com/register');
    expect(navigationSchema).not.toContain('https://matgarko.com/en/register');
  });

  test('blog articles expose article structured data', async ({ page }) => {
    await page.goto('/blog/how-to-create-online-store-egypt');

    const routeSchema = await page.locator('#matgarko-route-schema').textContent();

    expect(routeSchema).toContain('"@type":"Article"');
    expect(routeSchema).toContain('https://matgarko.com/blog/how-to-create-online-store-egypt#article');
  });

  test('english homepage exposes LTR content and hreflang SEO metadata', async ({ page }) => {
    await page.goto('/en');

    await expect(page).toHaveTitle('Ecommerce platform for MENA merchants | Matgarko');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://matgarko.com/en');
    await expect(page.locator('link[rel="alternate"][hreflang="ar-EG"]')).toHaveAttribute('href', 'https://matgarko.com/');
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', 'https://matgarko.com/en');
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute('href', 'https://matgarko.com/');
    await expect(page.getByRole('heading', { level: 1, name: /Create an online store/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Start free, pay when you sell' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', '/en/pricing');
    await expect(page.getByRole('link', { name: 'العربية' }).first()).toHaveAttribute('href', '/');
  });

  test('english route family is crawlable with localized content', async ({ page }) => {
    await page.goto('/en/pricing');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://matgarko.com/en/pricing');
    await expect(page.getByRole('heading', { level: 1, name: 'Start free, pay 2% only when you sell' })).toBeVisible();
    await expect(page.getByText('499 EGP').first()).toBeVisible();
    await expect(page.getByText('1,499 EGP').first()).toBeVisible();

    await page.goto('/en/store/restaurants');
    await expect(page.getByRole('heading', { name: /Online store builder for restaurants/ })).toBeVisible();

    await page.goto('/en/compare/shopify');
    await expect(page.getByRole('heading', { name: 'Shopify alternative for Egypt and MENA merchants' })).toBeVisible();

    await page.goto('/en/blog/how-to-create-online-store-egypt');
    await expect(page.getByRole('heading', { name: 'How to create an online store in Egypt in 2026' })).toBeVisible();
    const routeSchema = await page.locator('#matgarko-route-schema').textContent();
    expect(routeSchema).toContain('"@type":"Article"');
    expect(routeSchema).toContain('"inLanguage":"en"');
    expect(routeSchema).toContain('https://matgarko.com/en/blog/how-to-create-online-store-egypt#article');
  });
});
