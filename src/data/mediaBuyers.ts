import type { CountryCode } from "@/lib/phone";

/**
 * The choices on matgarko.com/media-buyers, by the keys the server keeps. Keep them in step with
 * MediaBuyerChoices in new_matgarko (src/Matgarko.WebHost/Partners/MediaBuyerAccounts.cs).
 */
export type Choice = { key: string; label: string };

/**
 * The merchants' page of media buyers inside the dashboard is not open yet. Until it is, the pages
 * say a complete profile «هيظهر» there, not that it «ظاهر». Set this once the page ships.
 */
export const DIRECTORY_OPEN = false;

export const platforms: Choice[] = [
  { key: "meta", label: "ميتا (فيسبوك وإنستجرام)" },
  { key: "tiktok", label: "تيك توك" },
  { key: "google", label: "جوجل" },
  { key: "snapchat", label: "سناب شات" },
];

export const specialties: Choice[] = [
  { key: "fashion", label: "ملابس وأحذية" },
  { key: "beauty", label: "تجميل وعناية" },
  { key: "food", label: "أكل ومشروبات" },
  { key: "electronics", label: "إلكترونيات وإكسسوارات" },
  { key: "kids", label: "أطفال وألعاب" },
  { key: "home", label: "منزل وديكور" },
  { key: "health", label: "صحة ومكملات" },
  { key: "single_product", label: "منتج واحد بالدفع عند الاستلام" },
  { key: "local_business", label: "بيزنس محلي ومطاعم" },
  { key: "services", label: "خدمات وكورسات" },
  { key: "other", label: "مجالات تانية" },
];

export const currencies = ["EGP", "SAR", "AED", "KWD", "QAR", "BHD", "OMR", "JOD", "USD"] as const;
export type Currency = (typeof currencies)[number];

const currencyByCountry: Partial<Record<CountryCode, Currency>> = {
  EG: "EGP", SA: "SAR", AE: "AED", KW: "KWD", QA: "QAR", BH: "BHD", OM: "OMR", JO: "JOD",
};

export const currencyNames: Record<Currency, string> = {
  EGP: "ج.م", SAR: "ر.س", AED: "د.إ", KWD: "د.ك", QAR: "ر.ق", BHD: "د.ب", OMR: "ر.ع", JOD: "د.أ", USD: "$",
};

export const currencyFor = (country: string): Currency => currencyByCountry[country as CountryCode] ?? "USD";

/** The four ways a media buyer charges; one or more may be on, each with its own number. */
export type PricingKey = "monthlyFee" | "adSpendPercent" | "salesPercent" | "perOrderFee";
export const pricingMethods: { key: PricingKey; label: string; hint: string; percent: boolean; max: number }[] = [
  { key: "monthlyFee", label: "مبلغ شهري ثابت", hint: "مبلغ واحد كل شهر، مهما كانت المبيعات.", percent: false, max: 10_000_000 },
  { key: "adSpendPercent", label: "نسبة من ميزانية الإعلانات", hint: "الشائع من 10% لـ 15% من اللي التاجر بيصرفه على الإعلانات.", percent: true, max: 100 },
  { key: "salesPercent", label: "نسبة من مبيعات الطلبات اللي اتسلّمت", hint: "الشائع من 3% لـ 5%. بتتحسب على اللي اتسلّم بس.", percent: true, max: 100 },
  { key: "perOrderFee", label: "مبلغ على كل طلب اتسلّم", hint: "مناسب للتاجر الصغير: بيدفع لما يبيع.", percent: false, max: 100_000 },
];

/** Services a buyer can add with one tap, then edit; the price is theirs to set. */
export const serviceSuggestions: { title: string; description: string; free?: boolean }[] = [
  { title: "مراجعة متجرك مجانًا", description: "أراجع متجرك وأقولك إيه اللي ناقصه قبل ما تعلن.", free: true },
  { title: "ربط البيكسل", description: "أربط بيكسل ميتا أو تيك توك وأتأكد إن الأحداث بتوصل." },
  { title: "إعلانك الأول", description: "ربط البيكسل، وحملة واحدة، و3 إعلانات، ومتابعة أسبوع." },
  { title: "تصميم 5 إعلانات", description: "5 تصميمات جاهزة لإعلانات منتجاتك." },
];

/** What is still missing from a profile, in the words the dashboard shows. */
export const missingLabels: Record<string, string> = {
  photo: "صورتك",
  city: "البلد والمدينة",
  headline: "سطر التعريف",
  platforms: "المنصات",
  specialties: "المجالات",
  pricing: "طريقة حساب واحدة أو خدمة",
};

export const mediaBuyerFaq = [
  {
    question: "التسجيل بفلوس؟",
    answer: "لأ. الحساب والظهور للتجار ببلاش، ومتجركو مش بتاخد نسبة من اتفاقك مع التاجر. الاتفاق والفلوس بينك وبين التاجر مباشرة.",
  },
  {
    question: "محتاج موافقة عشان أظهر؟",
    answer: "لأ. أول ما تأكد رقمك وتكمّل بروفايلك (صورتك، ومكانك، وسطر عنك، ومجالاتك، وطريقة حسابك) بيبقى جاهز يظهر. متجركو بتأكد رقم الواتساب بس، وباقي البيانات مسؤوليتك. والبروفايل اللي بياناته مش حقيقية أو عليه شكاوى بنخفيه.",
  },
  {
    question: "التاجر هيوصلني إزاي؟",
    answer: "التاجر بيشوف بروفايلك وأسعارك وخدماتك، ولو مناسب بيكلّمك على واتساب من موبايله. صفحة الميديا باير جوه لوحة تحكم متجركو بتفتح قريب، واللي بروفايله مكتمل هيظهر فيها من أول يوم.",
  },
  {
    question: "أكتب أسعاري إزاي؟",
    answer: "تختار طريقة أو أكتر: مبلغ شهري ثابت، أو نسبة من ميزانية الإعلانات، أو نسبة من مبيعات الطلبات اللي اتسلّمت، أو مبلغ على كل طلب اتسلّم. وتقدر تضيف خدمات بسعرك، زي «مراجعة متجرك مجانًا» أو «إعلانك الأول».",
  },
  {
    question: "إيه اللي في متجركو يفيدني كميديا باير؟",
    answer: "بيكسل ميتا مع Conversions API وبيكسل تيك توك جاهزين، وكل أوردر مكتوب عليه جه من أنهي إعلان أو لينك، وحاجب الأوردرات الوهمية ببلاش. ولعملائك اللي بيعملوا أوردرات كتير فيه باقة احترافي بـ2,000 ج.م في الشهر من غير رسوم على الأوردر.",
  },
];
