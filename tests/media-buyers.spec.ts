import { expect, test, type Page } from '@playwright/test';

// matgarko.com/media-buyers: the account, the sign-in and the buyer's dashboard, with the signup API
// answered here so nothing reaches the server. Phone first: most people open the link from a Facebook group.
const shots = process.env.MEDIA_BUYERS_SHOTS;
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');

type Sent = { path: string; body: Record<string, unknown> | null; session?: string; token?: string };

function emptyProfile() {
  return {
    name: 'أحمد سمير', phone: '+201012345678', isAgency: false, agencyName: null, photoUrl: null as string | null,
    country: 'EG', city: null as string | null, headline: null as string | null, platforms: [] as string[], specialties: [] as string[],
    currency: 'EGP', monthlyFee: null as number | null, adSpendPercent: null as number | null, salesPercent: null as number | null, perOrderFee: null as number | null,
    howIWork: null, bestResult: null, idealClient: null, yearsExperience: null, facebookUrl: null, linkedInUrl: null, portfolioUrl: null,
    isAvailable: true, services: [] as { title: string; description?: string | null; price?: number | null }[], workPhotos: [] as { id: number; url: string }[],
    percent: 20, missing: ['photo', 'city', 'headline', 'platforms', 'specialties', 'pricing'], hidden: false, hiddenReason: null as string | null, visible: false,
  };
}

/** Answers the media buyer API the way the server does, keeping one profile between calls. */
async function mockApi(page: Page, profile = emptyProfile()) {
  const sent: Sent[] = [];
  let verifyCalls = 0;
  const complete = () => {
    const missing: string[] = [];
    if (!profile.photoUrl) missing.push('photo');
    if (!profile.city) missing.push('city');
    if (!profile.headline) missing.push('headline');
    if (profile.platforms.length === 0) missing.push('platforms');
    if (profile.specialties.length === 0) missing.push('specialties');
    if (profile.monthlyFee == null && profile.salesPercent == null && profile.adSpendPercent == null && profile.perOrderFee == null && profile.services.length === 0) missing.push('pricing');
    profile.missing = missing;
    profile.percent = 10 + (6 - missing.length) * 10;
    profile.visible = missing.length === 0 && profile.isAvailable && !profile.hidden;
  };
  await page.route('**/api/signup/v1/media-buyers**', async route => {
    const request = route.request();
    const path = new URL(request.url()).pathname.replace('/api/signup/v1/media-buyers', '');
    const headers = request.headers();
    const multipart = (headers['content-type'] || '').startsWith('multipart/');
    sent.push({ path, body: request.method() === 'POST' && !multipart ? request.postDataJSON() : null, session: headers['x-media-buyer-session'], token: headers['x-signup-token'] });
    const json = (status: number, body: unknown) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
    const signedIn = headers['x-media-buyer-session'] === 'session-1';
    if (path === '' || path === '/password/forgot') return json(202, { token: '6f9619ff-8b86-4011-b42d-00c04fc964ff', state: 'verification', retryAfterSeconds: 60 });
    if (path === '/verify') {
      verifyCalls++;
      return verifyCalls === 1 ? json(400, { code: 'InvalidCode' }) : json(200, { session: 'session-1', profile });
    }
    if (path === '/password/reset') return json(200, { session: 'session-1', profile });
    if (path === '/login') return request.postDataJSON().password === 'A-safe-password-1' ? json(200, { session: 'session-1', profile }) : json(401, { code: 'InvalidLogin' });
    if (path === '/logout') return json(200, { signedOut: true });
    if (!signedIn) return json(401, { code: 'SignedOut' });
    if (path === '/me' && request.method() === 'POST') {
      Object.assign(profile, request.postDataJSON());
      complete();
      return json(200, { profile });
    }
    if (path === '/me/photo') { profile.photoUrl = `data:image/png;base64,${png.toString('base64')}`; complete(); return json(200, { profile }); }
    if (path === '/me/work-photos') { profile.workPhotos.push({ id: profile.workPhotos.length + 1, url: `data:image/png;base64,${png.toString('base64')}` }); return json(200, { profile }); }
    return json(200, { profile });
  });
  return { sent, profile };
}

async function quiet(page: Page) {
  await page.addInitScript(() => { try { localStorage.setItem('matgarko-consent', 'declined'); } catch { /* Optional storage. */ } });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  return errors;
}

const noSidewaysScroll = async (page: Page) =>
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);

for (const [name, viewport] of [['phone', { width: 375, height: 812 }], ['desktop', { width: 1366, height: 900 }]] as const) {
  test(`a media buyer signs up, confirms the code, and completes the profile (${name})`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors = await quiet(page);
    const { sent } = await mockApi(page);

    await page.goto('/media-buyers?utm_source=fb_groups&utm_campaign=g1');
    await expect(page.getByRole('heading', { level: 1, name: 'اشتغل مع تجار متجركو' })).toBeVisible();
    // The hidden bot field must not widen this right-to-left page.
    await noSidewaysScroll(page);
    if (shots) await page.screenshot({ path: `${shots}/${name}-1-top.png` });

    await page.getByRole('link', { name: 'اعمل حسابك' }).click();
    // Sending it empty names the first field and puts the cursor in it.
    await page.getByRole('button', { name: 'ابعت كود التأكيد على واتساب' }).click();
    await expect(page.getByRole('alert')).toHaveText('اكتب اسمك.');
    await expect(page.locator('#mb-name')).toBeFocused();
    await page.locator('#mb-name').fill('أحمد سمير');
    await expect(page.getByRole('alert')).toHaveCount(0);
    await page.locator('#mb-phone').fill('01012345678');
    await page.locator('#mb-password').fill('short');
    await page.getByRole('button', { name: 'ابعت كود التأكيد على واتساب' }).click();
    await expect(page.getByRole('alert')).toContainText('8 حروف');
    await page.locator('#mb-password').fill('A-safe-password-1');
    if (shots) await page.locator('#signup').screenshot({ path: `${shots}/${name}-2-signup.png` });
    await page.getByRole('button', { name: 'ابعت كود التأكيد على واتساب' }).click();

    await expect(page.locator('#code')).toBeVisible();
    expect(sent[0].body).toMatchObject({ name: 'أحمد سمير', phone: '+201012345678', password: 'A-safe-password-1', source: { source: 'fb_groups', campaign: 'g1' } });
    expect(sent[0].body!.website).toBeUndefined();
    await page.locator('#code').fill('123456');
    await page.getByRole('button', { name: 'تأكيد', exact: true }).click();
    await expect(page.getByRole('alert')).toHaveText('الكود مش صحيح. راجعه وجرّب تاني.');
    await page.getByRole('button', { name: 'تأكيد', exact: true }).click();

    // The right code opens the dashboard, signed in.
    await expect(page).toHaveURL(/\/media-buyers\/dashboard/);
    await expect(page.getByRole('heading', { level: 1, name: 'لوحة الميديا باير' })).toBeVisible();
    await expect(page.getByText('بروفايلك لسه مش جاهز يظهر للتجار.')).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('matgarko-media-buyer-session'))).toBe('session-1');
    await noSidewaysScroll(page);

    await page.locator('#mb-photo').setInputFiles({ name: 'me.png', mimeType: 'image/png', buffer: png });
    await expect(page.getByRole('img', { name: 'صورتك' })).toBeVisible();
    await page.locator('#mb-headline').fill('ميديا باير لمتاجر الملابس، 4 سنين على ميتا وتيك توك');
    await page.locator('#mb-city').fill('القاهرة');
    await page.locator('#mb-platforms').getByText('تيك توك', { exact: true }).click();
    await page.locator('#mb-specialties').getByText('ملابس وأحذية', { exact: true }).click();
    // A way of charging that is ticked needs its number.
    await page.getByRole('checkbox', { name: /نسبة من مبيعات الطلبات اللي اتسلّمت/ }).check();
    await page.getByRole('button', { name: /^احفظ/ }).click();
    await expect(page.getByRole('alert')).toContainText('نسبة من مبيعات الطلبات اللي اتسلّمت');
    await page.locator('#mb-salesPercent').fill('3.5');
    await page.getByRole('checkbox', { name: /مبلغ شهري ثابت/ }).check();
    await page.locator('#mb-monthlyFee').fill('5000');
    // A suggested service is added with one tap; a free one needs no price.
    await page.getByRole('button', { name: '+ مراجعة متجرك مجانًا' }).click();
    await page.getByRole('button', { name: '+ إعلانك الأول' }).click();
    await page.locator('#service-1-price').fill('1500');
    await page.locator('#mb-howIWork').fill('بعمل الإعلانات والتصميم بنفسي، وببعت تقرير كل أسبوع.');
    await expect(page.getByText('فيه تعديلات لسه ما اتحفظتش.')).toBeVisible();
    if (shots) await page.screenshot({ path: `${shots}/${name}-3-dashboard.png`, fullPage: true });
    await page.getByRole('button', { name: 'احفظ التعديلات' }).click();

    await expect(page.getByText('بروفايلك مكتمل.')).toBeVisible();
    await expect(page.getByText('اتحفظ.')).toBeVisible();
    const save = sent.filter(call => call.path === '/me' && call.body).at(-1)!;
    expect(save.session).toBe('session-1');
    expect(save.body).toMatchObject({
      name: 'أحمد سمير', country: 'EG', city: 'القاهرة', platforms: ['tiktok'], specialties: ['fashion'], currency: 'EGP',
      monthlyFee: 5000, salesPercent: 3.5, adSpendPercent: null, perOrderFee: null, isAvailable: true,
      services: [{ title: 'مراجعة متجرك مجانًا', price: null }, { title: 'إعلانك الأول', price: 1500 }],
    });
    if (shots) await page.screenshot({ path: `${shots}/${name}-4-complete.png` });
    await noSidewaysScroll(page);
    expect(errors).toEqual([]);
  });
}

test('a media buyer signs in with the password, and a forgotten one is reset by a code', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const errors = await quiet(page);
  const { sent } = await mockApi(page);

  // The dashboard is for the signed-in: without a session it opens the sign-in.
  await page.goto('/media-buyers/dashboard');
  await expect(page).toHaveURL(/\/media-buyers\/login/);
  await page.locator('#mb-phone').fill('01012345678');
  await page.locator('#mb-password').fill('wrong-password');
  await page.getByRole('button', { name: 'دخول', exact: true }).click();
  await expect(page.getByRole('alert')).toHaveText('الرقم أو الباسورد مش صح.');
  await page.locator('#mb-password').fill('A-safe-password-1');
  await page.getByRole('button', { name: 'دخول', exact: true }).click();
  await expect(page).toHaveURL(/\/media-buyers\/dashboard/);
  await expect(page.getByRole('heading', { level: 1, name: 'لوحة الميديا باير' })).toBeVisible();

  await page.getByRole('button', { name: 'خروج' }).click();
  await expect(page).toHaveURL(/\/media-buyers\/login/);
  expect(await page.evaluate(() => localStorage.getItem('matgarko-media-buyer-session'))).toBeNull();

  await page.getByRole('button', { name: 'نسيت الباسورد؟' }).click();
  await page.locator('#mb-phone').fill('01012345678');
  await page.getByRole('button', { name: 'ابعت الكود على واتساب' }).click();
  await page.locator('#code').fill('654321');
  await page.locator('#mb-new-password').fill('short');
  await page.getByRole('button', { name: 'احفظ الباسورد وادخل' }).click();
  await expect(page.getByRole('alert')).toContainText('8 حروف');
  await page.locator('#mb-new-password').fill('Another-pass-2');
  await page.getByRole('button', { name: 'احفظ الباسورد وادخل' }).click();
  await expect(page).toHaveURL(/\/media-buyers\/dashboard/);
  const reset = sent.find(call => call.path === '/password/reset')!;
  expect(reset.body).toEqual({ code: '654321', password: 'Another-pass-2' });
  expect(reset.token).toBe('6f9619ff-8b86-4011-b42d-00c04fc964ff');
  expect(errors).toEqual([]);
});

test('a hidden profile says so and why, and a busy one says it is not shown', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await quiet(page);
  const profile = { ...emptyProfile(), photoUrl: `data:image/png;base64,${png.toString('base64')}`, city: 'القاهرة', headline: 'ميديا باير لمتاجر الملابس', platforms: ['meta'], specialties: ['fashion'], monthlyFee: 5000, missing: [], percent: 70, hidden: true, hiddenReason: 'الصورة مش صورة شخصية.' };
  await mockApi(page, profile);
  await page.addInitScript(() => localStorage.setItem('matgarko-media-buyer-session', 'session-1'));
  await page.goto('/media-buyers/dashboard');
  await expect(page.getByText('بروفايلك مخفي عن التجار.')).toBeVisible();
  await expect(page.getByText('الصورة مش صورة شخصية.')).toBeVisible();

  profile.hidden = false;
  await page.reload();
  await expect(page.getByText('بروفايلك مكتمل.')).toBeVisible();
  await page.locator('#mb-isAvailable').uncheck();
  await page.getByRole('button', { name: 'احفظ التعديلات' }).click();
  await expect(page.getByText('إنت معلّم إنك مشغول.')).toBeVisible();
});
