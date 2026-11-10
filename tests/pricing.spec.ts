import { expect, test } from '@playwright/test';
import {
  FREE_TO_PRO_ORDERS,
  PRO_CHEAPER_ABOVE_ORDERS,
  breakevenOrders,
  formatEgp,
  getPlan,
  monthlyCost,
  plans,
} from '../src/data/pricing';

test('Starter charges a flat fee per order and Pro none', () => {
  const starter = getPlan('free');
  const pro = getPlan('pro');
  expect(plans.map(plan => plan.id)).toEqual(['free', 'pro']);
  expect(starter.monthly).toBe(0);
  expect(starter.perOrderFee).toBe(3);
  expect(pro.monthly).toBe(2000);
  expect(pro.perOrderFee).toBe(0);
  expect(monthlyCost(starter, 0)).toBe(0);
  expect(monthlyCost(starter, 100)).toBe(300);
  expect(monthlyCost(pro, 100)).toBe(2000);
  expect(monthlyCost(pro, 5000)).toBe(2000);
  expect(formatEgp(2.5, 'ar')).toBe('2.5 ج.م');
  expect(formatEgp(2000, 'en')).toBe('2,000 EGP');
});

test('Pro is cheaper than Starter from the 667th order a month', () => {
  const starter = getPlan('free');
  const pro = getPlan('pro');
  expect(PRO_CHEAPER_ABOVE_ORDERS).toBe(666);
  expect(breakevenOrders(starter, pro)).toBe(667);
  expect(FREE_TO_PRO_ORDERS).toBe(667);
  expect(monthlyCost(starter, 666)).toBeLessThan(monthlyCost(pro, 666));
  expect(monthlyCost(starter, 667)).toBeGreaterThan(monthlyCost(pro, 667));
});

for (const language of ['ar', 'en'] as const) {
  test(`${language} pricing shows two plans, the per-order fee, a working calculator and no layout overflow on mobile`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => localStorage.setItem('matgarko-consent', 'declined'));
    await page.goto(language === 'ar' ? '/pricing' : '/en/pricing');

    const main = page.locator('main');
    const cards = page.locator('article');
    await expect(cards).toHaveCount(2);
    await expect(cards.nth(0)).toContainText(language === 'ar' ? '3 ج.م' : '3 EGP');
    await expect(cards.nth(0)).toContainText(language === 'ar' ? 'الطلب الوهمي ببلاش' : 'Fake orders are free');
    await expect(cards.nth(1)).toContainText(language === 'ar' ? 'بدون رسوم' : 'No fee');
    await expect(cards.nth(1)).toContainText('2,000');
    for (const card of await cards.all()) await expect(card).toContainText(language === 'ar' ? 'دعم عبر واتساب' : 'WhatsApp support');
    await expect(main).not.toContainText(/Growth|باقة النمو|باقة نمو|50 products|50 منتج|تقارير متقدمة|Advanced reports|أولوية في الدعم|Priority support/);
    // No trace of the old percentage pricing.
    await expect(main).not.toContainText(/1%|1,499|5 ج\.م للطلب|5 EGP per order|بحد أقصى|Capped at|مكتمل|completed order|عمولة|commission/i);

    // Fake orders and hand-recorded orders are free.
    await expect(main).toContainText(language === 'ar' ? 'درع الطلبات الوهمية' : 'fake-order shield');
    await expect(main).toContainText(language === 'ar' ? '«طلب جديد»' : '«New order»');

    // Defaults: 100 orders. Starter 300, Pro 2,000, so Starter saves 1,700.
    const calculator = page.locator('h3', { hasText: language === 'ar' ? 'احسب تكلفتك' : 'Work out your cost' }).locator('xpath=ancestor::div[contains(@class,"rounded-2xl")][1]');
    await expect(calculator).toContainText(language === 'ar' ? 'باقة البداية أوفر لك بـ 1,700 ج.م' : 'Starter saves you 1,700 EGP');
    await expect(calculator.getByRole('slider')).toHaveCount(1);
    const orders = calculator.getByLabel(language === 'ar' ? 'عدد الطلبات في الشهر' : 'Orders per month');
    await orders.fill('1000');
    await expect(calculator).toContainText(language === 'ar' ? 'باقة احترافي توفر عليك 1,000 ج.م' : 'Pro saves you 1,000 EGP');
    await orders.fill('1500');
    await expect(calculator).toContainText(language === 'ar' ? 'باقة احترافي توفر عليك 2,500 ج.م' : 'Pro saves you 2,500 EGP');

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/pricing-${language}-mobile.png`, fullPage: true });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.screenshot({ path: `test-results/pricing-${language}-desktop.png`, fullPage: true });
  });
}
