import { expect, test } from '@playwright/test';
import {
  FREE_TO_PRO_ORDERS,
  STARTER_CAP_ORDER_VALUE,
  breakevenOrders,
  capReachedAt,
  formatEgp,
  getPlan,
  monthlyCost,
  orderCommission,
  plans,
} from '../src/data/pricing';

test('commissions preserve piastres and cap each whole order', () => {
  const starter = getPlan('free');
  const pro = getPlan('pro');
  expect(plans.map(plan => plan.id)).toEqual(['free', 'pro']);
  expect([100, 250, 499, 500, 1000, 3000].map(value => orderCommission(starter, value))).toEqual([1, 2.5, 4.99, 5, 5, 5]);
  expect(orderCommission(pro, 3000)).toBe(0);
  expect([200, 3000].reduce((sum, value) => sum + orderCommission(starter, value), 0)).toBe(7);
  expect(STARTER_CAP_ORDER_VALUE).toBe(500);
  expect(capReachedAt(pro)).toBeUndefined();
  expect(monthlyCost(starter, 100, 700)).toBe(500);
  expect(monthlyCost(starter, 10, 3000)).toBe(50);
  expect(formatEgp(2.5, 'ar')).toBe('2.5 ج.م');
});

test('Pro first saves money at the order count the page quotes', () => {
  const starter = getPlan('free');
  const pro = getPlan('pro');
  expect(breakevenOrders(starter, pro, 700)).toBe(300);
  expect(breakevenOrders(starter, pro, 3000)).toBe(300);
  expect(FREE_TO_PRO_ORDERS).toBe(300);
  expect(monthlyCost(starter, 299, 700)).toBeLessThan(monthlyCost(pro, 299, 700));
  expect(monthlyCost(starter, 300, 700)).toBeGreaterThan(monthlyCost(pro, 300, 700));
  // Smaller orders stay under the cap, so Starter stays cheaper for longer.
  expect(breakevenOrders(starter, pro, 250)).toBe(600);
});

for (const language of ['ar', 'en'] as const) {
  test(`${language} pricing shows two plans, the cap, a working calculator and no layout overflow on mobile`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => localStorage.setItem('matgarko-consent', 'declined'));
    await page.goto(language === 'ar' ? '/pricing' : '/en/pricing');

    const cards = page.locator('article');
    await expect(cards).toHaveCount(2);
    await expect(cards.nth(0)).toContainText(language === 'ar' ? 'بحد أقصى 5 ج.م للطلب الواحد' : 'Capped at 5 EGP per order');
    await expect(cards.nth(1)).toContainText(language === 'ar' ? 'بدون عمولة' : 'No commission');
    await expect(cards.nth(1)).toContainText('1,499');
    for (const card of await cards.all()) await expect(card).toContainText(language === 'ar' ? 'دعم عبر واتساب' : 'WhatsApp support');
    await expect(page.locator('main')).not.toContainText(/Growth|باقة النمو|باقة نمو|50 products|50 منتج|تقارير متقدمة|Advanced reports|أولوية في الدعم|Priority support/);

    // Orders at or above the cap all pay the same fee.
    const capped = page.locator('li', { hasText: '2,500' }).first();
    await expect(capped).toContainText(language === 'ar' ? 'السقف' : 'Cap');
    await expect(capped).toContainText('5');

    // Defaults: 100 orders of 700 EGP. Starter 500, Pro 1,499, so Starter saves 999.
    const calculator = page.locator('h3', { hasText: language === 'ar' ? 'احسب تكلفتك' : 'Work out your cost' }).locator('xpath=ancestor::div[contains(@class,"rounded-2xl")][1]');
    await expect(calculator).toContainText(language === 'ar' ? 'باقة البداية أوفر لك بـ 999 ج.م' : 'Starter saves you 999 EGP');
    await calculator.getByLabel(language === 'ar' ? 'عدد الطلبات المكتملة في الشهر' : 'Completed orders per month').fill('400');
    await expect(calculator).toContainText(language === 'ar' ? 'باقة احترافي توفر عليك 501 ج.م' : 'Pro saves you 501 EGP');

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/pricing-${language}-mobile.png`, fullPage: true });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.screenshot({ path: `test-results/pricing-${language}-desktop.png`, fullPage: true });
  });
}
