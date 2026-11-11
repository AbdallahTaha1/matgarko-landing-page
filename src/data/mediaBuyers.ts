import type { CountryCode } from "@/lib/phone";

/**
 * The choices on matgarko.com/media-buyers, by the keys the server keeps. Keep them in step with
 * MediaBuyerChoices in new_matgarko (src/Matgarko.WebHost/Partners/MediaBuyerApplications.cs).
 */
export type Choice = { key: string; label: string };

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
  { key: "home", label: "منزل وديكور" },
  { key: "health", label: "صحة ومكملات" },
  { key: "kids", label: "أطفال وألعاب" },
  { key: "single_product", label: "منتج واحد بالدفع عند الاستلام" },
  { key: "local_business", label: "بيزنس محلي ومطاعم" },
  { key: "services", label: "خدمات وكورسات" },
  { key: "other", label: "مجالات تانية" },
];

export const services: Choice[] = [
  { key: "ads", label: "إدارة الإعلانات" },
  { key: "creative", label: "تصميم وفيديو" },
  { key: "pages", label: "إدارة الصفحات والرد" },
  { key: "store_setup", label: "تجهيز المتجر" },
];

export const pricingModels: Choice[] = [
  { key: "fixed", label: "مبلغ ثابت شهريًا" },
  { key: "percentage", label: "نسبة من الإعلانات أو المبيعات" },
  { key: "per_order", label: "مبلغ على كل أوردر" },
  { key: "mixed", label: "ثابت + نسبة" },
];

/** The countries ads are usually run for; the form's full list comes from phoneCountries. */
export const adCountries: CountryCode[] = ["EG", "SA", "AE", "KW", "QA", "BH", "OM", "JO", "IQ", "LY", "MA", "DZ", "TN"];

export const currencies = ["EGP", "SAR", "AED", "KWD", "QAR", "BHD", "OMR", "JOD", "USD"] as const;

const currencyByCountry: Partial<Record<CountryCode, (typeof currencies)[number]>> = {
  EG: "EGP", SA: "SAR", AE: "AED", KW: "KWD", QA: "QAR", BH: "BHD", OM: "OMR", JO: "JOD",
};

export const currencyNames: Record<(typeof currencies)[number], string> = {
  EGP: "ج.م", SAR: "ر.س", AED: "د.إ", KWD: "د.ك", QAR: "ر.ق", BHD: "د.ب", OMR: "ر.ع", JOD: "د.أ", USD: "$",
};

export const currencyFor = (country: CountryCode) => currencyByCountry[country] ?? "USD";

export const mediaBuyerFaq = [
  {
    question: "التقديم بفلوس؟",
    answer: "لأ. التقديم والظهور للتجار ببلاش، ومتجركو مش بتاخد نسبة من اتفاقك مع التاجر. الاتفاق والفلوس بينك وبين التاجر مباشرة.",
  },
  {
    question: "بتراجعوا الطلب إزاي؟",
    answer: "بنقرا خبرتك وسابقة أعمالك، وممكن نكلمك على واتساب نسألك عن شغلك. لو اتقبلت بنبعتلك رسالة على نفس الرقم. ولو الطلب ما اتقبلش بنقولك السبب، وتقدر تقدّم تاني بعد 30 يوم.",
  },
  {
    question: "التاجر هيوصلني إزاي؟",
    answer: "التاجر بيشوف الميديا باير المقبولين جوه لوحة تحكم متجره، ويختار حسب المجال والمنصة والميزانية. لما يطلبك بيوصلك رقمه واللي محتاجه، ورقمك ما بيظهرش غير للتاجر اللي طلبك.",
  },
  {
    question: "لازم يكون عندي عملاء على متجركو؟",
    answer: "لأ، لكن لو عندك عملاء شغالين على متجركو اكتب روابط متاجرهم في الفورم، ده بيسرّع المراجعة. ولو عميلك محتاج متجر، يقدر يفتحه ببلاش من matgarko.com/register ويبدأ بـ20 أوردر ببلاش.",
  },
  {
    question: "إيه اللي في متجركو يفيدني كميديا باير؟",
    answer: "بيكسل ميتا مع Conversions API وبيكسل تيك توك جاهزين، وكل أوردر مكتوب عليه جه من أنهي إعلان أو لينك، وحاجب الأوردرات الوهمية ببلاش. ولعملائك اللي بيعملوا أوردرات كتير فيه باقة احترافي بـ2,000 ج.م في الشهر من غير رسوم على الأوردر.",
  },
];
