import { expect, test, type Page } from '@playwright/test';
const token = '02c9185d-4208-4a64-804f-f38f0c0de641';
async function mockSignup(page: Page, consent: 'accepted' | 'declined' | 'unknown' = 'accepted') {
  await page.addInitScript(value => { if (!localStorage.getItem('matgarko-consent')) localStorage.setItem('matgarko-consent', value); }, consent);
  await page.route('https://www.googletagmanager.com/**', route => route.fulfill({ contentType: 'text/javascript', body: '' }));
  const state = { submissions: [] as Record<string, unknown>[], verified: false, ready: false, enabled: true, networkFailure: false, emailTaken: false, phoneTaken: false, contactNetworkFailure: false };
  await page.route('**/api/signup/v1/**', async route => {
    const url = new URL(route.request().url());
    const action = url.pathname.split('/').pop();
    if (action === 'config') return route.fulfill({ json: { enabled: state.enabled, baseDomain: 'matgarko.com' } });
    if (action === 'check-subdomain') {
      if (state.networkFailure) return route.abort();
      return route.fulfill({ json: { available: true, code: 'Ok' } });
    }
    if (action === 'check-email' || action === 'check-phone') {
      expect(route.request().method()).toBe('POST');
      expect(url.search).toBe('');
      if (state.contactNetworkFailure) return route.abort();
      const taken = action === 'check-email' ? state.emailTaken : state.phoneTaken;
      return route.fulfill({ json: { available: !taken, code: taken ? action === 'check-email' ? 'EmailTaken' : 'PhoneTaken' : 'Ok' } });
    }
    if (action === 'registrations') {
      state.submissions.push(route.request().postDataJSON());
      return route.fulfill({ status: 202, json: { token, state: 'verification', retryAfterSeconds: 60, emailDeliveryFailed: false } });
    }
    expect(route.request().headers()['x-signup-token']).toBe(token);
    expect(url.search).toBe('');
    if (action === 'verify') {
      if (route.request().postDataJSON().code !== '123456') return route.fulfill({ status: 400, json: { code: 'CodeIncorrect' } });
      state.verified = true;
    }
    return route.fulfill({ json: state.ready ? { state: 'ready', conversionId: 'registration-101', adminUrl: 'https://testshop.matgarko.com/admin', storeUrl: 'https://testshop.matgarko.com' } : { state: state.verified ? 'provisioning' : 'verification', retryAfterSeconds: 60 } });
  });
  return state;
}
async function enterDetails(page: Page) {
  await page.getByLabel('Store name', { exact: true }).fill('Test shop');
  await page.getByLabel(/^Store address/).fill('testshop');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByLabel('Email', { exact: true }).fill('owner@example.com');
  await page.getByLabel('Mobile number', { exact: true }).fill('01012345678');
  await page.getByLabel('Password', { exact: true }).fill('A-safe-password-123');
  await page.getByLabel('Confirm password', { exact: true }).fill('A-safe-password-123');
  await page.locator('input[name="acceptTerms"]').check();
}
async function events(page: Page) {
  return page.evaluate(() => (window.dataLayer || []).map(item => Array.from(item as unknown[])).filter(item => item[0] === 'event'));
}
test('verified signup stays on the landing domain, preserves sources, and converts once when ready', async ({ page }) => {
  const state = await mockSignup(page);
  await page.goto('/en?utm_source=google&utm_medium=cpc&utm_campaign=launch&gclid=click-123');
  await page.getByRole('link', { name: 'Create your store free' }).first().click();
  await expect(page).toHaveURL(/\/en\/register$/);
  await enterDetails(page);
  await page.getByLabel('How did you hear about us?').selectOption('friend');
  await page.getByRole('button', { name: 'Send verification code', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Verify your email' })).toBeVisible();
  expect(state.submissions).toHaveLength(1);
  expect(state.submissions[0]).toMatchObject({ discoverySource: 'friend', acquisition: { first: { source: 'google', medium: 'cpc', campaign: 'launch' }, last: { source: 'google' } } });
  await expect(page.getByRole('button', { name: /Resend code/ })).toBeDisabled();
  await page.getByLabel('Verification code', { exact: true }).fill('000000');
  await page.getByRole('button', { name: 'Verify and create store' }).click();
  await expect(page.getByRole('alert')).toContainText('incorrect');
  expect((await events(page)).filter(event => event[1] === 'sign_up')).toHaveLength(0);
  await page.getByLabel('Verification code', { exact: true }).fill('123456');
  await page.getByRole('button', { name: 'Verify and create store' }).click();
  await expect(page.getByRole('heading', { name: 'Preparing your store' })).toBeVisible();
  expect((await events(page)).filter(event => event[1] === 'sign_up')).toHaveLength(0);
  state.ready = true;
  await expect(page.getByRole('heading', { name: 'Your store is ready!' })).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole('link', { name: 'Open your dashboard' })).toHaveAttribute('href', 'https://testshop.matgarko.com/admin');
  await expect(page).toHaveURL(/\/en\/register$/);
  const measured = await events(page);
  expect(measured.filter(event => event[1] === 'sign_up')).toHaveLength(1);
  expect(measured.filter(event => event[1] === 'conversion')).toHaveLength(1);
  expect(JSON.stringify(measured)).not.toMatch(/owner@example|A-safe-password|02c9185d|01012345678|123456"/);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Your store is ready!' })).toBeVisible();
  expect((await events(page)).filter(event => ['sign_up', 'conversion'].includes(String(event[1])))).toHaveLength(0);
  expect(state.submissions).toHaveLength(1);
});
test('signup works without analytics consent or the optional discovery answer', async ({ page }) => {
  const state = await mockSignup(page, 'declined');
  await page.goto('/en/register');
  await enterDetails(page);
  await page.getByRole('button', { name: 'Send verification code', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Verify your email' })).toBeVisible();
  expect(state.submissions[0].acquisition).toBeUndefined();
  expect(state.submissions[0].discoverySource).toBeUndefined();
  state.ready = true;
  await page.getByLabel('Verification code', { exact: true }).fill('123456');
  await page.getByRole('button', { name: 'Verify and create store' }).click();
  await expect(page.getByRole('heading', { name: 'Your store is ready!' })).toBeVisible();
  expect(await events(page)).toHaveLength(0);
  expect(await page.locator('script[src*="googletagmanager"]').count()).toBe(0);
});
test('address lookup failure blocks continuation and recovers after editing', async ({ page }) => {
  const state = await mockSignup(page);
  state.networkFailure = true;
  await page.goto('/en/register');
  await page.getByLabel('Store name', { exact: true }).fill('Shop');
  await page.getByLabel(/^Store address/).fill('testshop');
  await expect(page.getByRole('status')).toContainText('Unable to connect');
  await expect(page.getByRole('button', { name: 'Continue', exact: true })).toBeDisabled();
  state.networkFailure = false;
  await page.getByLabel(/^Store address/).fill('anotherstore');
  await expect(page.getByRole('button', { name: 'Continue', exact: true })).toBeEnabled();
  await page.getByLabel(/^Store address/).fill('a');
  await expect(page.getByRole('button', { name: 'Continue', exact: true })).toBeDisabled();
});
test('closed registration cannot be submitted', async ({ page }) => {
  const state = await mockSignup(page); state.enabled = false;
  await page.goto('/en/register');
  await expect(page.getByRole('alert')).toContainText('temporarily closed');
  await expect(page.getByRole('button', { name: 'Continue', exact: true })).toBeDisabled();
});

test('live contact checks reject taken and invalid values and recheck edits before submission', async ({ page }) => {
  const state = await mockSignup(page, 'declined');
  state.emailTaken = true; state.phoneTaken = true;
  await page.goto('/en/register');
  await enterDetails(page);
  const submit = page.getByRole('button', { name: 'Send verification code', exact: true });
  await expect(page.locator('#email-status')).toContainText('already registered');
  await expect(page.locator('#phone-status')).toContainText('already registered');
  await expect(submit).toBeDisabled();
  state.emailTaken = false; state.phoneTaken = false;
  await page.getByLabel('Email', { exact: true }).fill('new@example.com');
  await page.getByLabel('Mobile number', { exact: true }).fill('01112345678');
  await expect(page.locator('#email-status')).toContainText('available for signup');
  await expect(page.locator('#phone-status')).toContainText('available for signup');
  await expect(submit).toBeEnabled();
  await page.getByLabel('Email', { exact: true }).fill('invalid');
  await expect(submit).toBeDisabled();
  await expect(page.locator('#email-status')).toContainText('Check your email');
  await page.getByLabel('Mobile number', { exact: true }).fill('123');
  await expect(page.locator('#phone-status')).toContainText('11-digit');
  expect(state.submissions).toHaveLength(0);
});

test('failed contact checks can be retried without changing the entered details', async ({ page }) => {
  const state = await mockSignup(page, 'declined'); state.contactNetworkFailure = true;
  await page.goto('/en/register');
  await enterDetails(page);
  await expect(page.locator('#email-status')).toContainText('Unable to connect');
  await expect(page.locator('#phone-status')).toContainText('Unable to connect');
  await expect(page.getByRole('button', { name: 'Send verification code', exact: true })).toBeDisabled();
  state.contactNetworkFailure = false;
  await page.getByRole('button', { name: 'Check again', exact: true }).first().click();
  await expect(page.locator('#email-status')).toContainText('available for signup');
  await page.getByRole('button', { name: 'Check again', exact: true }).click();
  await expect(page.locator('#phone-status')).toContainText('available for signup');
  await expect(page.getByRole('button', { name: 'Send verification code', exact: true })).toBeEnabled();
  expect(state.submissions).toHaveLength(0);
});
test('page views are not duplicated and secret query parameters are omitted', async ({ page }) => {
  await mockSignup(page);
  await page.goto('/en?utm_source=chatgpt&email=private@example.com&token=secret');
  await expect.poll(async () => (await events(page)).filter(event => event[1] === 'page_view').length).toBe(1);
  await page.getByRole('navigation').getByRole('link', { name: 'Pricing', exact: true }).click();
  await expect.poll(async () => (await events(page)).filter(event => event[1] === 'page_view').length).toBe(2);
  expect(JSON.stringify(await events(page))).not.toMatch(/private@example|secret/);
});

test('consent after navigation preserves the original campaign without private query parameters', async ({ page }) => {
  await mockSignup(page, 'unknown');
  await page.goto('/en?utm_source=google&utm_medium=cpc&utm_campaign=launch&gclid=click-123&token=secret');
  expect(await events(page)).toHaveLength(0);
  await page.getByRole('navigation').getByRole('link', { name: 'Pricing', exact: true }).click();
  await page.getByRole('button', { name: 'Allow', exact: true }).click();
  await expect.poll(async () => (await events(page)).filter(event => event[1] === 'page_view').length).toBe(1);
  const view = (await events(page)).find(event => event[1] === 'page_view')![2] as { page_location: string };
  const location = new URL(view.page_location);
  expect(location.pathname).toBe('/en/pricing');
  expect(location.searchParams.get('utm_campaign')).toBe('launch');
  expect(location.searchParams.get('gclid')).toBe('click-123');
  expect(location.searchParams.has('token')).toBe(false);
});

test('Arabic mobile registration displays optional discovery choices without horizontal overflow', async ({ page }) => {
  await mockSignup(page, 'declined');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/register');
  await page.getByLabel('اسم المتجر', { exact: true }).fill('متجر تجريبي');
  await page.getByLabel(/^رابط المتجر/).fill('testshop');
  await page.getByRole('button', { name: 'التالي', exact: true }).click();
  const discovery = page.getByLabel(/^عرفتنا منين؟/);
  await expect(discovery).toBeVisible();
  await expect(discovery).not.toHaveAttribute('required', '');
  await discovery.selectOption('ai');
  await expect(discovery).toHaveValue('ai');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
