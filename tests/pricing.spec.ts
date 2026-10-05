import { expect, test } from '@playwright/test';
import { breakevenOrders, formatEgp, getPlan, monthlyCost, orderCommission } from '../src/data/pricing';

test('commissions preserve piastres and cap each whole order', () => {
  const starter = getPlan('free');
  const growth = getPlan('growth');
  expect([200, 500, 700, 1000, 3000].map(value => orderCommission(starter, value))).toEqual([4, 10, 10, 10, 10]);
  expect([200, 500, 700, 1000, 3000].map(value => orderCommission(growth, value))).toEqual([1, 2.5, 2.5, 2.5, 2.5]);
  expect(orderCommission(getPlan('pro'), 3000)).toBe(0);
  expect([200, 3000].reduce((sum, value) => sum + orderCommission(starter, value), 0)).toBe(14);
  expect(monthlyCost(growth, 10, 3000)).toBe(524);
  expect(monthlyCost(starter, 100, 700)).toBe(1000);
  expect(monthlyCost(growth, 100, 700)).toBe(749);
  expect(formatEgp(2.5, 'ar')).toBe('2.5 ج.م');
  expect(breakevenOrders(starter, growth, 700)).toBe(67);
  expect(breakevenOrders(starter, growth, 3000)).toBe(67);
  // At exactly 400 orders Growth and Pro tie; Pro first saves money at 401.
  expect(monthlyCost(growth, 400, 700)).toBe(monthlyCost(getPlan('pro'), 400, 700));
  expect(breakevenOrders(growth, getPlan('pro'), 3000)).toBe(401);
});

for (const language of ['ar', 'en'] as const) {
  test(`${language} pricing shows caps, real shared features and exact order examples on mobile`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => localStorage.setItem('matgarko-consent', 'declined'));
    await page.goto(language === 'ar' ? '/pricing' : '/en/pricing');
    const cards = page.locator('article');
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0)).toContainText(language === 'ar' ? 'بحد أقصى 10 ج.م للطلب الواحد' : 'Capped at 10 EGP per order');
    await expect(cards.nth(1)).toContainText(language === 'ar' ? 'بحد أقصى 2.5 ج.م للطلب الواحد' : 'Capped at 2.5 EGP per order');
    for (const card of await cards.all()) await expect(card).toContainText(language === 'ar' ? 'دعم عبر واتساب' : 'WhatsApp support');
    await expect(page.locator('main')).not.toContainText(/50 products|50 منتج|تقارير متقدمة|Advanced reports|أولوية في الدعم|Priority support/);
    const examples = page.getByRole('table').first();
    await expect(examples.getByRole('row').filter({ hasText: '500' }).getByRole('cell').nth(1)).toContainText('2.5');
    const capped = examples.getByRole('row').filter({ hasText: '2,000' });
    await expect(capped.getByRole('cell').nth(0)).toContainText('10');
    await expect(capped.getByRole('cell').nth(1)).toContainText('2.5');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/pricing-${language}-mobile.png`, fullPage: true });
    await cards.first().locator('..').screenshot({ path: `test-results/pricing-${language}-cards-mobile.png` });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.screenshot({ path: `test-results/pricing-${language}-desktop.png` });
  });
}
