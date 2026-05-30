import { test, expect } from '@playwright/test';

test.describe('Matgarko self-service Arabic SaaS landing site', () => {
  test('homepage presents the self-service tenant journey', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await expect(page.getByText('أنشئ متجرك بنفسك')).toBeVisible();
    await expect(page.getByText('وابدأ البيع في السوق العربي')).toBeVisible();
    await expect(page.getByText('Tenant مستقل', { exact: true })).toBeVisible();
    await expect(page.getByText('رحلة إنشاء المتجر بالكامل')).toBeVisible();
    await expect(page.getByText('أسئلة شائعة')).toBeVisible();
  });

  test('main navigation pages load with product positioning', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.getByRole('link', { name: 'الحلول' }).click();
    await page.waitForURL('**/solutions');
    await expect(page.getByText('كل عميل ينشئ متجره المستقل بنفسه')).toBeVisible();
    await expect(page.getByText('حل SaaS ذاتي للسوق المصري والعربي')).toBeVisible();

    await page.getByRole('navigation').getByRole('link', { name: 'رحلة الإعداد' }).click();
    await page.waitForURL('**/developers');
    await expect(page.getByText('رحلة الإعداد الذاتي')).toBeVisible();

    await page.getByRole('navigation').getByRole('link', { name: 'الأسعار' }).click();
    await page.waitForURL('**/pricing');
    await expect(page.getByText('باقات شهرية لمتجر واحد مستقل')).toBeVisible();

    await page.getByRole('navigation').getByRole('link', { name: 'تواصل معنا' }).click();
    await page.waitForURL('**/contact');
    await expect(page.getByText('نحن هنا')).toBeVisible();
  });

  test('themes and integrations are market-facing', async ({ page }) => {
    await page.goto('http://localhost:5173/themes');
    await expect(page.getByText('قوالب جاهزة وقابلة للتعديل')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Market' })).toBeVisible();

    await page.goto('http://localhost:5173/integrations');
    await expect(page.getByText('تكاملات عملية للتشغيل')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'الدفع' })).toBeVisible();
    await expect(page.getByText('مناطق شحن')).toBeVisible();
  });

  test('about page explains the private product model', async ({ page }) => {
    await page.goto('http://localhost:5173/about');

    await expect(page.getByRole('main').getByText('عن شركة متجركو')).toBeVisible();
    await expect(page.getByText('منتج SaaS يساعد العميل على إنشاء متجره بنفسه')).toBeVisible();
    await expect(page.getByText('موجه للسوق المصري والعربي')).toBeVisible();
    await expect(page.getByText('متجر واحد لكل عميل')).toBeVisible();
  });

  test('registration page supports the signup journey', async ({ page }) => {
    await page.goto('http://localhost:5173/register');

    await expect(page.getByText('أنشئ متجرك الآن')).toBeVisible();
    await expect(page.locator('input[name="storeName"]')).toBeVisible();
    await expect(page.locator('input[name="subdomain"]')).toBeVisible();
  });
});
