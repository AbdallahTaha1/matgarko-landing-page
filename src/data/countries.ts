import type { CountryCode } from "@/lib/phone";

/**
 * Country versions of the site (since 2026-11-07). Egypt is the site at "/" (ar-EG); each other
 * country gets a few pages under its own prefix, written in plain Arabic for that market, with the
 * dollar prices stores outside Egypt are billed in and their local-currency equivalent.
 */
export type Country = {
  code: CountryCode;
  /** URL prefix, without the leading slash: "ar-sa". */
  slug: string;
  /** BCP 47 tag for hreflang and the page language: "ar-SA". */
  locale: string;
  /** Open Graph locale: "ar_SA". */
  ogLocale: string;
  name: string;
  /** "في السعودية" */
  inName: string;
  /** schema.org country name. */
  englishName: string;
  currencyCode: string;
  /** Short Arabic currency label: "ر.س". */
  currencyLabel: string;
  /** The currency's name for running text: "الريال السعودي". */
  currencyName: string;
  /** Units of the local currency in one US dollar; pegged currencies, Kuwait's dinar is approximate. */
  perDollar: number;
  /** Decimals to show local amounts with. */
  decimals: number;
  cities: string[];
};

/** Billing outside Egypt, in US dollars (backend BillingOptions.AbroadFree / AbroadPro). */
export const ABROAD_PER_ORDER_USD = 0.05;
export const ABROAD_PRO_MONTHLY_USD = 35;

export const countries: Country[] = [
  {
    code: "SA", slug: "ar-sa", locale: "ar-SA", ogLocale: "ar_SA", name: "السعودية", inName: "في السعودية",
    englishName: "Saudi Arabia", currencyCode: "SAR", currencyName: "الريال السعودي", currencyLabel: "ر.س", perDollar: 3.75, decimals: 2,
    cities: ["الرياض", "جدة", "الدمام", "مكة", "المدينة"],
  },
  {
    code: "AE", slug: "ar-ae", locale: "ar-AE", ogLocale: "ar_AE", name: "الإمارات", inName: "في الإمارات",
    englishName: "United Arab Emirates", currencyCode: "AED", currencyName: "الدرهم الإماراتي", currencyLabel: "د.إ", perDollar: 3.6725, decimals: 2,
    cities: ["دبي", "أبوظبي", "الشارقة", "عجمان", "العين"],
  },
  {
    code: "KW", slug: "ar-kw", locale: "ar-KW", ogLocale: "ar_KW", name: "الكويت", inName: "في الكويت",
    englishName: "Kuwait", currencyCode: "KWD", currencyName: "الدينار الكويتي", currencyLabel: "د.ك", perDollar: 0.307, decimals: 3,
    cities: ["مدينة الكويت", "حولي", "الفروانية", "الأحمدي", "الجهراء"],
  },
  {
    code: "QA", slug: "ar-qa", locale: "ar-QA", ogLocale: "ar_QA", name: "قطر", inName: "في قطر",
    englishName: "Qatar", currencyCode: "QAR", currencyName: "الريال القطري", currencyLabel: "ر.ق", perDollar: 3.64, decimals: 2,
    cities: ["الدوحة", "الريان", "الوكرة", "الخور", "أم صلال"],
  },
  {
    code: "OM", slug: "ar-om", locale: "ar-OM", ogLocale: "ar_OM", name: "عُمان", inName: "في عُمان",
    englishName: "Oman", currencyCode: "OMR", currencyName: "الريال العُماني", currencyLabel: "ر.ع", perDollar: 0.3845, decimals: 3,
    cities: ["مسقط", "صلالة", "صحار", "نزوى", "صور"],
  },
  {
    code: "BH", slug: "ar-bh", locale: "ar-BH", ogLocale: "ar_BH", name: "البحرين", inName: "في البحرين",
    englishName: "Bahrain", currencyCode: "BHD", currencyName: "الدينار البحريني", currencyLabel: "د.ب", perDollar: 0.376, decimals: 3,
    cities: ["المنامة", "المحرق", "الرفاع", "مدينة عيسى", "مدينة حمد"],
  },
];

/** Pages each country version has, as paths below its prefix ("" is the country home). */
export const COUNTRY_PAGES = ["", "/pricing", "/cod", "/register"] as const;
export type CountryPage = (typeof COUNTRY_PAGES)[number];

export function countryBySlug(slug: string) {
  return countries.find((country) => country.slug === slug);
}

/** The country version a path belongs to, if any: "/ar-sa/pricing" → Saudi Arabia. */
export function countryFromPath(pathname: string) {
  const match = /^\/(ar-[a-z]{2})(?:\/|$)/.exec(pathname);
  return match ? countryBySlug(match[1]) : undefined;
}

/** The path inside a country version, without its prefix: "/ar-sa/pricing" → "/pricing". */
export function stripCountryPrefix(pathname: string) {
  const country = countryFromPath(pathname);
  if (!country) return pathname;
  const rest = pathname.slice(country.slug.length + 1);
  return rest === "/" ? "" : rest;
}

export function countryPath(country: Country, page: string) {
  return `/${country.slug}${page === "/" ? "" : page}`;
}

/** Whether a page exists in every country version. */
export function isCountryPage(page: string): page is CountryPage {
  return (COUNTRY_PAGES as readonly string[]).includes(page === "/" ? "" : page);
}

export function localMoney(country: Country, usd: number) {
  const value = usd * country.perDollar;
  const amount = value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: country.decimals });
  return `${amount} ${country.currencyLabel}`;
}

export function usd(value: number) {
  return `${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}$`;
}
