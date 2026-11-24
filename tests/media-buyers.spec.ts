import { expect, test, type Page } from '@playwright/test';

// matgarko.com/media-buyers: the application and its WhatsApp code, with the signup API answered here
// so nothing reaches the server. Phone first: most people open the link from a Facebook group.
const shots = process.env.MEDIA_BUYERS_SHOTS;

async function mockApi(page: Page) {
  const sent: { url: string; body: Record<string, unknown> }[] = [];
  let verifyCalls = 0;
  await page.route('**/api/signup/v1/media-buyers**', async route => {
    const url = route.request().url();
    sent.push({ url, body: route.request().postDataJSON() });
    if (url.endsWith('/media-buyers')) {
      return route.fulfill({ status: 202, contentType: 'application/json', body: JSON.stringify({ token: '6f9619ff-8b86-4011-b42d-00c04fc964ff', state: 'verification', retryAfterSeconds: 60 }) });
    }
    if (url.endsWith('/verify')) {
      verifyCalls++;
      return verifyCalls === 1
        ? route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ code: 'InvalidCode' }) })
        : route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ state: 'pending' }) });
    }
    return route.fulfill({ status: 429, contentType: 'application/json', body: JSON.stringify({ code: 'ResendTooSoon', retryAfterSeconds: 42 }) });
  });
  return sent;
}

for (const [name, viewport] of [['phone', { width: 375, height: 812 }], ['desktop', { width: 1366, height: 900 }]] as const) {
  test(`a media buyer applies and confirms the WhatsApp code (${name})`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.addInitScript(() => { try { localStorage.setItem('matgarko-consent', 'declined'); } catch { /* Optional storage. */ } });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const sent = await mockApi(page);

    await page.goto('/media-buyers?utm_source=fb_groups&utm_campaign=g1');
    await expect(page.getByRole('heading', { level: 1, name: 'اشتغل مع تجار متجركو' })).toBeVisible();
    // The hidden bot field must not widen this right-to-left page.
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    if (shots) await page.screenshot({ path: `${shots}/${name}-1-top.png` });

    await page.getByRole('link', { name: 'قدّم دلوقتي' }).click();
    // Sending it empty names the first field and puts the cursor in it.
    await page.getByRole('button', { name: 'ابعت كود التأكيد على واتساب' }).click();
    await expect(page.getByRole('alert')).toHaveText('راجع: الاسم.');
    await expect(page.locator('#mb-name')).toBeFocused();

    await page.locator('#mb-name').fill('أحمد سمير');
    await expect(page.getByRole('alert')).toHaveCount(0);
    await page.locator('#mb-phone').fill('01012345678');
    await page.locator('#mb-city').fill('القاهرة');
    await page.locator('#mb-worksIn').getByText('السعودية', { exact: true }).click();
    await page.locator('#mb-yearsExperience').fill('4');
    await page.locator('#mb-platforms').getByText('تيك توك', { exact: true }).click();
    await page.locator('#mb-specialties').getByText('ملابس وأحذية', { exact: true }).click();
    await page.locator('#mb-minMonthlyBudget').fill('10000');
    await page.locator('#mb-pricingModel').selectOption('fixed');
    await page.locator('#mb-bio').fill('بشتغل على متاجر الدفع عند الاستلام من 4 سنين، أغلبها ملابس ومنتج واحد.');
    await page.locator('#work-0-field').fill('براند ملابس');
    await page.locator('#work-0-work').fill('حملات ميتا وتيك توك للبيع عند الاستلام');
    await page.locator('#work-0-result').fill('1,200 أوردر في الشهر');
    await page.locator('#acceptTerms').check();
    // The budget box keeps its width beside the currency.
    const budget = await page.locator('#mb-minMonthlyBudget').boundingBox();
    expect(budget!.width).toBeGreaterThan(150);
    if (shots) await page.locator('#apply').screenshot({ path: `${shots}/${name}-2-form.png` });

    await page.getByRole('button', { name: 'ابعت كود التأكيد على واتساب' }).click();
    await expect(page.locator('#code')).toBeVisible();
    const apply = sent[0].body;
    expect(apply).toMatchObject({
      name: 'أحمد سمير', phone: '+201012345678', country: 'EG', city: 'القاهرة', worksIn: ['EG', 'SA'], yearsExperience: 4,
      platforms: ['tiktok'], specialties: ['fashion'], services: ['ads'], minMonthlyBudget: 10000, budgetCurrency: 'EGP',
      pricingModel: 'fixed', acceptTerms: true, source: { source: 'fb_groups', campaign: 'g1' },
    });
    expect(apply.website).toBeUndefined();

    await page.locator('#code').fill('123456');
    await page.getByRole('button', { name: 'تأكيد وإرسال الطلب' }).click();
    await expect(page.getByRole('alert')).toHaveText('الكود مش صحيح. راجعه وجرّب تاني.');
    await page.getByRole('button', { name: 'تأكيد وإرسال الطلب' }).click();
    await expect(page.getByText('شكرًا! طلبك عندنا')).toBeVisible();
    if (shots) await page.locator('#apply').screenshot({ path: `${shots}/${name}-3-done.png` });
    expect(errors).toEqual([]);
  });
}
