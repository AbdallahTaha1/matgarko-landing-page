import { expect, test } from '@playwright/test';
import { phoneCountries, signupPhoneNumber, type CountryCode } from '../src/lib/phone';

test('all offered Arab countries have valid mobile examples and international formatting', () => {
  const examples: Record<string, string> = {
    EG: '+201112345678', SA: '+966501234567', AE: '+971501234567', JO: '+962791234567',
    KW: '+96550012345', QA: '+97433123456', BH: '+97336001234', OM: '+96892123456',
    PS: '+970599123456', LB: '+96171123456', IQ: '+9647912345678', SY: '+963944567890',
    YE: '+967712345678', SD: '+249912345678', LY: '+218912345678', TN: '+21620123456',
    DZ: '+213551234567', MA: '+212612345678', MR: '+22222123456', SO: '+252612345678',
    DJ: '+25377123456', KM: '+2693212345',
  };
  expect(phoneCountries).toHaveLength(22);
  for (const country of phoneCountries) expect(signupPhoneNumber(examples[country.code], country.code)).toBe(examples[country.code]);
});

test('phone parsing accepts local and Arabic digits but rejects mismatches, landlines, extensions and junk', () => {
  for (const value of ['01012345678', '+20 10 1234 5678', '٠١٠١٢٣٤٥٦٧٨', '۰۱۰۱۲۳۴۵۶۷۸']) expect(signupPhoneNumber(value, 'EG')).toBe('+201012345678');
  for (const [value, country] of [['123', 'EG'], ['+966501234567', 'EG'], ['+20223456789', 'EG'], ['+966501234567 ext 1', 'SA'], ['call +966501234567', 'SA']]) {
    expect(signupPhoneNumber(value, country as CountryCode)).toBeUndefined();
  }
});
