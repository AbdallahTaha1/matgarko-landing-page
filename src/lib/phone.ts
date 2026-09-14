import { getCountryCallingCode, parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js/mobile';

export type { CountryCode };
export const phoneCountries = ([
  ['EG', 'مصر', 'Egypt'], ['SA', 'السعودية', 'Saudi Arabia'], ['AE', 'الإمارات', 'United Arab Emirates'],
  ['KW', 'الكويت', 'Kuwait'], ['QA', 'قطر', 'Qatar'], ['BH', 'البحرين', 'Bahrain'], ['OM', 'عُمان', 'Oman'],
  ['JO', 'الأردن', 'Jordan'], ['PS', 'فلسطين', 'Palestine'], ['LB', 'لبنان', 'Lebanon'], ['IQ', 'العراق', 'Iraq'],
  ['SY', 'سوريا', 'Syria'], ['YE', 'اليمن', 'Yemen'], ['SD', 'السودان', 'Sudan'], ['LY', 'ليبيا', 'Libya'],
  ['TN', 'تونس', 'Tunisia'], ['DZ', 'الجزائر', 'Algeria'], ['MA', 'المغرب', 'Morocco'],
  ['MR', 'موريتانيا', 'Mauritania'], ['SO', 'الصومال', 'Somalia'], ['DJ', 'جيبوتي', 'Djibouti'], ['KM', 'جزر القمر', 'Comoros'],
] as [CountryCode, string, string][]).map(([code, ar, en]) => ({ code, ar, en, callingCode: getCountryCallingCode(code) }));

export function normalizePhoneInput(value: string) {
  return value.replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 0x660))
    .replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 0x6f0)).trim().replace(/^00/, '+');
}

export function parseSignupPhone(value: string, country?: CountryCode) {
  const normalized = normalizePhoneInput(value);
  if (!normalized || normalized.length > 32 || !/^[+\d\s().-]+$/.test(normalized)) return undefined;
  return parsePhoneNumberFromString(normalized, { defaultCountry: country, extract: false });
}

export function signupPhoneNumber(value: string, country: CountryCode) {
  const phone = parseSignupPhone(value, country);
  if (!phone || phone.country !== country || !phone.isValid() || !['MOBILE', 'FIXED_LINE_OR_MOBILE'].includes(phone.getType() || '')) return undefined;
  return phone.number;
}
