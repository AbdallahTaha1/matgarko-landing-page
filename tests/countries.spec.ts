import { expect, test } from '@playwright/test';
import { aiAssistant } from '../src/lib/attribution';
import { countries, countryFromPath, localMoney, stripCountryPrefix } from '../src/data/countries';

test('country paths map to their country and page', () => {
  expect(countryFromPath('/ar-sa')?.code).toBe('SA');
  expect(countryFromPath('/ar-ae/pricing')?.code).toBe('AE');
  expect(countryFromPath('/pricing')).toBeUndefined();
  expect(countryFromPath('/ar-xx')).toBeUndefined();
  expect(stripCountryPrefix('/ar-sa/pricing')).toBe('/pricing');
  expect(stripCountryPrefix('/ar-sa')).toBe('');
  expect(countries.map(country => country.slug)).toEqual(['ar-sa', 'ar-ae', 'ar-kw', 'ar-qa', 'ar-om', 'ar-bh']);
  expect(localMoney(countries[0], 0.05)).toBe('0.19 ر.س');
  expect(localMoney(countries[0], 35)).toBe('131.25 ر.س');
});

test('visits from AI assistants are their own source, Gemini included', () => {
  expect(aiAssistant('chatgpt.com')).toBe('chatgpt.com');
  expect(aiAssistant('www.perplexity.ai')).toBe('www.perplexity.ai');
  expect(aiAssistant('gemini.google.com')).toBe('gemini.google.com');
  expect(aiAssistant('www.google.com')).toBeUndefined();
  expect(aiAssistant(undefined)).toBeUndefined();
});

test('the Saudi home page shows dollar prices with riyals, stays inside the Saudi version, and fits a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/ar-sa');
  await expect(page.locator('h1')).toContainText('متجر إلكتروني في السعودية');
  await expect(page.locator('h1')).toContainText('0.05$');
  await expect(page.getByText('حوالي 0.19 ر.س').first()).toBeVisible();
  await expect(page.locator('a[href="/ar-sa/register"]:visible').first()).toBeVisible();
  await expect(page.locator('link[hreflang="ar-SA"]')).toHaveAttribute('href', /\/ar-sa$/);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('signing up from a country page preselects that country', async ({ page }) => {
  await page.goto('/ar-ae/register');
  await expect(page.locator('#storeCountry')).toHaveValue('AE');
  await page.goto('/register');
  await expect(page.locator('#storeCountry')).toHaveValue('EG');
});

test('the answers page and the Saudi Salla comparison render one heading each', async ({ page }) => {
  await page.goto('/answers');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'كم تكلفة متجركو؟' })).toBeVisible();
  await page.goto('/ar-sa/compare/salla');
  await expect(page.locator('h1')).toContainText('متجركو أم سلة');
  await expect(page.getByText('99 ريالاً').first()).toBeVisible();
});
