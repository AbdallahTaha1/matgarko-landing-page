import type { AppLanguage } from "@/lib/i18n";

type Localized = Record<AppLanguage, string>;

export type ShowcaseStore = {
  name: Localized;
  category: Localized;
  url: string;
  /** Resized copy of the store's logo in public/stores; stores without one show their initial. */
  logo?: string;
};

/** Live merchant stores shown on the home page. */
export const showcaseStores: ShowcaseStore[] = [
  {
    name: { ar: "مكتبة أحمد حلمي", en: "Ahmed Helmi Stationery" },
    category: { ar: "أدوات مكتبية ومدرسية", en: "Stationery and school supplies" },
    url: "https://www.ahmedhelmistore.com/",
    logo: "/stores/ahmedhelmi.webp",
  },
  {
    name: { ar: "Pionka", en: "Pionka" },
    category: { ar: "إكسسوارات شعر", en: "Hair accessories" },
    url: "https://pionkaword.matgarko.com/",
    logo: "/stores/pionka.webp",
  },
  {
    name: { ar: "Football Zone Store", en: "Football Zone Store" },
    category: { ar: "تيشرتات كرة قدم", en: "Football jerseys" },
    url: "https://footballzonestore.matgarko.com/",
    logo: "/stores/footballzone.webp",
  },
  {
    name: { ar: "Cute Kids", en: "Cute Kids" },
    category: { ar: "ملابس أطفال", en: "Baby clothing" },
    url: "https://cute-kids.matgarko.com/",
    logo: "/stores/cute-kids.webp",
  },
  {
    name: { ar: "يا بلاش", en: "Ya Balash" },
    category: { ar: "ملابس ومستلزمات منزل", en: "Clothing and home goods" },
    url: "https://yabalash.online/",
    logo: "/stores/yabalash.webp",
  },
  {
    name: { ar: "HOOR STORE", en: "HOOR STORE" },
    category: { ar: "أدوات مطبخ ومنزل", en: "Kitchen and homeware" },
    url: "https://hoory.matgarko.com/",
    logo: "/stores/hoor.webp",
  },
  {
    name: { ar: "BARIQ", en: "BARIQ" },
    category: { ar: "عطور", en: "Perfumes" },
    url: "https://bariq.matgarko.com/",
    logo: "/stores/bariq.webp",
  },
  {
    name: { ar: "Almasa Store", en: "Almasa Store" },
    category: { ar: "عناية شخصية وتجميل", en: "Personal care and beauty" },
    url: "https://masaabdo.matgarko.com/",
  },
];
