import { faqs } from "@/data/faqs";
import { positioning } from "@/data/positioning";
import { blogArticles } from "@/data/blog";
import { learnGuides } from "@/data/learn";
import { englishBlogArticles, englishFaqs, englishOrderedPaths, englishSeoPages } from "@/data/en";
import { billableOrdersRule, formatEgp, perOrderFeeLabel, plans, pricingFaqs, pricingSummary } from "@/data/pricing";
import { localizePath, stripLanguagePrefix } from "@/lib/i18n";
import { answers } from "@/data/answers";
import {
  ABROAD_PER_ORDER_USD,
  ABROAD_PRO_MONTHLY_USD,
  type Country,
  countries,
  countryFromPath,
  countryPath,
  localMoney,
  stripCountryPrefix,
} from "@/data/countries";
import { countryFaqs } from "@/pages/country/countryContent";

export const SITE_NAME = "متجركو";
export const DEFAULT_SITE_URL = "https://matgarko.com";
export const SITE_URL = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
export const SIGNUP_URL = "/register";
export const WHATSAPP_URL = "https://wa.me/201080312538";
export const CONTACT_EMAIL = "support@matgarko.com";

const CORE_TOPICS = [
  "Mobile-first ecommerce for solo merchants",
  "Manage an online store from a phone in Arabic",
  "Arabic ecommerce platform",
  "Create an online store in Egypt",
  "No-code ecommerce store builder",
  "Egyptian pound ecommerce pricing",
  "Cash on delivery",
  "Delivery area pricing",
  "Store design with ready colour palettes",
  "Product and order management",
];

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  /** "ar-EG" (the main site), "en", or a country version's tag such as "ar-SA". */
  locale?: string;
  type?: "website" | "article";
  noindex?: boolean;
};

export const seoPages: Record<string, SeoPage> = {
  "/download": {
    path: "/download",
    title: "تحميل تطبيق متجركو لأندرويد | إدارة متجرك من الموبايل",
    description: "حمّل تطبيق متجركو لأندرويد من Google Play لإدارة الطلبات والمنتجات والمخزون من موبايلك، أو ادخل لوحة متجرك من المتصفح.",
    keywords: ["تحميل متجركو", "تطبيق إدارة المتجر", "متجركو أندرويد"],
  },
  "/": {
    path: "/",
    title: "إنشاء وإدارة متجر إلكتروني من الموبايل في مصر | متجركو",
    description:
      "ابدأ متجرك الإلكتروني مجاناً وادِر شغلك من موبايلك مع متجركو. منصة عربية للتاجر الصغير في مصر، بدون خبرة تقنية، بـ 3 ج.م بس على الطلب والطلبات الوهمية ببلاش.",
    keywords: [
      "إنشاء متجر إلكتروني",
      "متجر إلكتروني مصر",
      "منصة تجارة إلكترونية",
      "متجركو",
      "بيع أونلاين",
      "متجر بدون برمجة",
      "ابدأ مجاناً متجر إلكتروني",
    ],
  },
  "/solutions": {
    path: "/solutions",
    title: "حلول إدارة المتجر الإلكتروني | متجركو",
    description:
      "كل أدوات إدارة المتجر في مكان واحد: منتجات واستيراد Excel، طلبات، عملاء، عروض، بكسل ميتا، إحصائيات المبيعات والأرباح، وتصميم صفحتك الرئيسية.",
    keywords: ["إدارة متجر إلكتروني", "إدارة الطلبات", "إدارة المنتجات", "لوحة تحكم متجر", "إحصائيات المتجر", "استيراد منتجات من Excel"],
  },
  "/integrations": {
    path: "/integrations",
    title: "الدفع عند الاستلام والتوصيل وبكسل ميتا | متجركو",
    description:
      "استقبل طلبات الدفع عند الاستلام، حدد سعر التوصيل لكل منطقة، واربط Meta Pixel وConversions API وGoogle Analytics وواتساب بمتجرك.",
    keywords: ["دفع عند الاستلام", "أسعار التوصيل", "مناطق الشحن", "بكسل فيسبوك للمتجر", "Conversions API", "Google Analytics للمتجر"],
  },
  "/themes": {
    path: "/themes",
    title: "تصميم متجر إلكتروني جاهز للموبايل | متجركو",
    description:
      "بدل ما تختار من قوالب كتير: شكل واحد سريع ومجرب على الموبايل، بألوان جاهزة حسب نشاطك ولوجو متجرك وخطه وصورك.",
    keywords: ["تصميم متجر إلكتروني", "شكل متجر إلكتروني", "ألوان المتجر", "متجر إلكتروني للموبايل", "قوالب متجر إلكتروني"],
  },
  "/getting-started": {
    path: "/getting-started",
    title: "كيفية إنشاء متجر إلكتروني خطوة بخطوة | متجركو",
    description:
      "تعرف على خطوات إنشاء متجرك: اختيار الاسم والرابط، إضافة المنتجات، تحديد تكلفة التوصيل، ثم استقبال أول طلب في وقت قصير.",
    keywords: ["خطوات إنشاء متجر إلكتروني", "كيفية إنشاء متجر إلكتروني", "ابدأ البيع أونلاين", "إنشاء متجر بدون كود"],
  },
  "/pricing": {
    path: "/pricing",
    title: "تكلفة إنشاء متجر إلكتروني في مصر | باقات متجركو",
    description:
      pricingSummary("ar"),
    keywords: [
      "تكلفة إنشاء متجر إلكتروني في مصر",
      "أسعار متجر إلكتروني",
      "باقات متجر إلكتروني",
      "متجر إلكتروني مجاني",
      "عمولة متجر إلكتروني",
    ],
  },
  "/about": {
    path: "/about",
    title: "عن متجركو | منصة إنشاء متجر إلكتروني عربية",
    description:
      "متجركو منصة عربية تساعد التجار في مصر على إنشاء متجر إلكتروني بسرعة وبتكلفة مناسبة بدون شركة برمجة.",
    keywords: ["عن متجركو", "منصة متجر إلكتروني عربية", "متجر إلكتروني للتجار"],
  },
  "/contact": {
    path: "/contact",
    title: "تواصل مع متجركو | واتساب ودعم إنشاء المتجر",
    description:
      "تواصل مع فريق متجركو عبر واتساب أو البريد الإلكتروني للاستفسار عن الباقات، البدء مجاناً، وخطوات إنشاء المتجر.",
    keywords: ["تواصل متجركو", "دعم متجر إلكتروني", "واتساب متجركو"],
  },
  "/login": {
    path: "/login",
    title: "الدخول لمتجرك ولوحة التحكم | متجركو",
    description: "افتح لوحة تحكم متجرك الحالي، انسخ رابط متجرك، أو اطلب المساعدة لو نسيت الرابط.",
    keywords: ["تسجيل دخول متجركو", "رابط متجري", "لوحة تحكم متجركو"],
    noindex: true,
  },
  "/register": {
    path: "/register",
    title: "إنشاء حساب متجر إلكتروني | متجركو",
    description:
      "ابدأ إنشاء متجرك الإلكتروني على متجركو باختيار اسم المتجر والرابط ثم إكمال بيانات الحساب.",
    keywords: ["تسجيل متجر إلكتروني", "إنشاء حساب متجر", "ابدأ متجر إلكتروني"],
    noindex: true,
  },
  "/terms": {
    path: "/terms",
    title: "الشروط والأحكام | متجركو",
    description:
      "تعرف على شروط استخدام منصة متجركو ومسؤوليات تشغيل متجرك الإلكتروني والاشتراكات والمحتوى.",
    keywords: ["شروط متجركو", "شروط استخدام متجر إلكتروني"],
  },
  "/privacy": {
    path: "/privacy",
    title: "سياسة الخصوصية | متجركو",
    description:
      "تعرف على كيفية تعامل متجركو مع بيانات حسابك ومتجرك وطرق استخدامها لتشغيل الخدمة وتحسينها.",
    keywords: ["سياسة الخصوصية متجركو", "خصوصية متجر إلكتروني"],
  },
  // Industry landing pages
  "/store/restaurants": {
    path: "/store/restaurants",
    title: "إنشاء متجر إلكتروني للمطاعم في مصر | متجركو",
    description:
      "أنشئ متجر إلكتروني لمطعمك أو مشروعك الغذائي في دقائق. اعرض القائمة بالصور والأسعار واستقبل طلبات عملائك أونلاين.",
    keywords: ["إنشاء متجر إلكتروني للمطاعم", "متجر أونلاين للمطاعم", "طلبات توصيل أونلاين", "متجر أكل أونلاين مصر"],
  },
  "/store/clothing": {
    path: "/store/clothing",
    title: "إنشاء متجر ملابس إلكتروني في مصر | متجركو",
    description:
      "افتح متجر ملابس أونلاين بشكل جاهز وألوان تناسب الموضة والأزياء. عرض المقاسات والألوان، إدارة المخزون، ومتابعة طلبات عملائك.",
    keywords: ["إنشاء متجر ملابس إلكتروني", "متجر ملابس أونلاين مصر", "متجر موضة إلكتروني", "بيع ملابس أونلاين"],
  },
  "/store/electronics": {
    path: "/store/electronics",
    title: "إنشاء متجر إلكترونيات أونلاين في مصر | متجركو",
    description:
      "افتح متجر إلكترونيات وأجهزة أونلاين بشكل جاهز ومجرب على الموبايل. عرض المواصفات والأسعار، مقارنة المنتجات، وإدارة المخزون بسهولة.",
    keywords: ["إنشاء متجر إلكترونيات", "متجر أجهزة أونلاين مصر", "بيع إلكترونيات أونلاين", "متجر تقنية إلكتروني"],
  },
  "/store/cosmetics": {
    path: "/store/cosmetics",
    title: "إنشاء متجر مستحضرات تجميل أونلاين | متجركو",
    description:
      "أنشئ متجر عناية وجمال احترافي أونلاين. عرض المنتجات بوصف دقيق وإدارة طلبات عملائك في مصر.",
    keywords: ["إنشاء متجر تجميل إلكتروني", "متجر عناية أونلاين مصر", "بيع مستحضرات تجميل أونلاين", "متجر جمال إلكتروني"],
  },
  "/store/furniture": {
    path: "/store/furniture",
    title: "إنشاء متجر أثاث وديكور أونلاين في مصر | متجركو",
    description:
      "افتح متجر أثاث وديكور منزلي أونلاين. عرض المنتجات بتفاصيل واضحة ومقاسات دقيقة، وإدارة الطلبات بسهولة.",
    keywords: ["إنشاء متجر أثاث إلكتروني", "متجر ديكور أونلاين مصر", "بيع أثاث أونلاين", "متجر منزل إلكتروني"],
  },
  // Blog
  "/blog": {
    path: "/blog",
    title: "مدونة متجركو | دليلك لإنشاء وإدارة متجرك الإلكتروني",
    description:
      "مقالات ودليل عملي لمساعدتك في إنشاء متجرك الإلكتروني، اختيار المنصة، تكلفة البدء، واستراتيجيات النمو في السوق المصري.",
    keywords: ["مدونة متجركو", "دليل التجارة الإلكترونية مصر", "كيفية إنشاء متجر إلكتروني", "نصائح التجارة الإلكترونية"],
    type: "website",
  },
  "/blog/how-to-create-online-store-egypt": {
    path: "/blog/how-to-create-online-store-egypt",
    title: "كيفية إنشاء متجر إلكتروني في مصر خطوة بخطوة 2026 | متجركو",
    description:
      "دليل كامل خطوة بخطوة لإنشاء متجر إلكتروني في مصر: من اختيار المنتج وتسجيل المتجر حتى استقبال أول طلب وإعداد التوصيل.",
    keywords: ["كيفية إنشاء متجر إلكتروني في مصر", "خطوات إنشاء متجر إلكتروني", "دليل متجر إلكتروني مصر 2026"],
    type: "article",
  },
  "/blog/cost-of-online-store-egypt-2026": {
    path: "/blog/cost-of-online-store-egypt-2026",
    title: "تكلفة إنشاء متجر إلكتروني في مصر 2026 — حساب دقيق | متجركو",
    description:
      "كم تكلف إنشاء متجر إلكتروني في مصر؟ مقارنة كاملة بين المنصات المدفوعة، العمولة، الاشتراك الشهري، والتكاليف الخفية.",
    keywords: ["تكلفة إنشاء متجر إلكتروني في مصر", "سعر متجر إلكتروني مصر", "كم يكلف المتجر الإلكتروني 2026"],
    type: "article",
  },
  "/blog/best-ecommerce-platform-egypt": {
    path: "/blog/best-ecommerce-platform-egypt",
    title: "أفضل منصة لإنشاء متجر إلكتروني في مصر 2026 | مقارنة شاملة",
    description:
      "مقارنة بين منصات التجارة الإلكترونية في مصر: الأسعار، إدارة المنتجات والطلبات، سهولة الاستخدام، والدعم المحلي.",
    keywords: ["أفضل منصة إنشاء متجر إلكتروني مصر", "مقارنة منصات التجارة الإلكترونية", "أفضل موقع لبيع أونلاين مصر"],
    type: "article",
  },
  "/blog/free-online-store-pros-cons": {
    path: "/blog/free-online-store-pros-cons",
    title: "إنشاء متجر إلكتروني مجاني — المميزات والقيود | متجركو",
    description:
      "هل المتجر الإلكتروني المجاني مناسب لتجارتك؟ مقارنة بين المجاني والمدفوع وما الذي تحتاجه فعلاً لتبدأ البيع أونلاين.",
    keywords: ["إنشاء متجر إلكتروني مجاني", "متجر إلكتروني مجاني مصر", "الفرق بين المجاني والمدفوع في المتجر الإلكتروني"],
    type: "article",
  },
  // Compare / competitor pages
  "/compare": {
    path: "/compare",
    title: "مقارنة منصات التجارة الإلكترونية في مصر 2026 | متجركو",
    description:
      "قارن متجركو مع إيزي أوردرز، سلة، شوبيفاي، وووكومرس. أسعار، مزايا، وعيوب كل منصة للتاجر المصري — اتخذ قرارك بمعلومات حقيقية.",
    keywords: ["مقارنة منصات التجارة الإلكترونية مصر", "أفضل منصة متجر إلكتروني مصر", "إيزي أوردرز سلة شوبيفاي مقارنة"],
  },
  "/compare/easyorders": {
    path: "/compare/easyorders",
    title: "متجركو vs إيزي أوردرز — مقارنة 2026 | بديل إيزي أوردرز",
    description:
      "مقارنة بين متجركو وإيزي أوردرز للتاجر المصري من حيث الأسعار وإدارة المنتجات والطلبات وسهولة الاستخدام.",
    keywords: ["بديل إيزي أوردرز", "متجركو vs إيزي أوردرز", "إيزي أوردرز مقارنة", "easyorders بديل", "افضل بديل easyorders مصر"],
  },
  "/compare/shopify": {
    path: "/compare/shopify",
    title: "بديل شوبيفاي في مصر — ابدأ بالجنيه المصري | متجركو vs شوبيفاي",
    description:
      "لماذا يبحث التجار المصريون عن بديل لشوبيفاي؟ مقارنة الأسعار والمزايا واكتشف منصة تجارة إلكترونية مصرية بأسعار بالجنيه بدون دولار.",
    keywords: ["بديل شوبيفاي في مصر", "شوبيفاي بالعربي مصر", "متجركو vs شوبيفاي", "shopify alternative egypt", "منصة بديل شوبيفاي"],
  },
  "/compare/salla": {
    path: "/compare/salla",
    title: "بديل سلة في مصر — منصة مصرية 100% | متجركو vs سلة",
    description:
      "قارن متجركو وسلة من حيث الأسعار والمزايا وسهولة الاستخدام، واختار المنصة المناسبة لمتجرك.",
    keywords: ["بديل سلة في مصر", "سلة مصر مقارنة", "متجركو vs سلة", "منصة مثل سلة في مصر", "بديل منصة سلة"],
  },
  "/compare/woocommerce": {
    path: "/compare/woocommerce",
    title: "بديل ووكومرس في مصر — بدون سيرفر أو برمجة | متجركو",
    description:
      "ووكومرس مجاني لكن يحتاج سيرفر ومطوراً. متجركو تمنحك متجراً كاملاً في 5 دقائق بدون تعقيدات تقنية وبأسعار بالجنيه المصري.",
    keywords: ["بديل ووكومرس في مصر", "ووكومرس مقارنة", "متجركو vs ووكومرس", "woocommerce alternative egypt", "بديل WooCommerce"],
  },
};

// Learning center: Arabic only, one page per dashboard guide.
seoPages["/learn"] = {
  path: "/learn",
  title: "مركز التعلّم | شروحات إدارة متجرك خطوة بخطوة | متجركو",
  description:
    "شروحات قصيرة بالصور من لوحة تحكم متجركو: إضافة المنتجات، متابعة الطلبات، ضبط الشحن، كوبونات الخصم، البيكسل، وتصميم المتجر.",
  keywords: ["مركز تعلم متجركو", "شرح لوحة تحكم المتجر", "إدارة متجر إلكتروني", "شرح إضافة منتج", "شرح الشحن والطلبات"],
  type: "website",
};
for (const guide of learnGuides) {
  seoPages[`/learn/${guide.slug}`] = {
    path: `/learn/${guide.slug}`,
    title: `${guide.title} | مركز التعلّم | متجركو`,
    description: guide.description,
    keywords: [...guide.keywords, "شرح متجركو", "مركز التعلم"],
    type: "article",
  };
}

// Country versions (since 2026-11-07): home, pricing, cash on delivery and signup per Gulf country.
function countrySeoPages(country: Country): SeoPage[] {
  const fee = localMoney(country, ABROAD_PER_ORDER_USD);
  const base = { locale: country.locale, type: "website" as const };
  return [
    {
      ...base,
      path: countryPath(country, ""),
      title: `إنشاء متجر إلكتروني ${country.inName} بالدفع عند الاستلام | متجركو`,
      description: `أنشئ متجرك الإلكتروني ${country.inName} بدون اشتراك شهري: ${ABROAD_PER_ORDER_USD}$ (حوالي ${fee}) على الطلب، والطلبات الوهمية لا تُحتسب. دفع عند الاستلام، أسعار ب${country.currencyName}، ودعم بالعربي.`,
      keywords: [`إنشاء متجر إلكتروني ${country.inName}`, `منصة متاجر ${country.inName}`, `متجر دفع عند الاستلام ${country.inName}`, `بديل سلة ${country.inName}`, "متجركو", `ecommerce platform ${country.englishName}`],
    },
    {
      ...base,
      path: countryPath(country, "/pricing"),
      title: `أسعار متجركو ${country.inName}: ${ABROAD_PER_ORDER_USD}$ على الطلب | متجركو`,
      description: `باقة البداية ${ABROAD_PER_ORDER_USD}$ (حوالي ${fee}) على كل طلب بدون اشتراك، وباقة احترافي ${ABROAD_PRO_MONTHLY_USD}$ شهرياً (حوالي ${localMoney(country, ABROAD_PRO_MONTHLY_USD)}) بدون رسوم على الطلب. الطلبات الوهمية مجاناً.`,
      keywords: [`أسعار متجر إلكتروني ${country.inName}`, `تكلفة متجر إلكتروني ${country.inName}`, "متجركو الأسعار"],
    },
    {
      ...base,
      path: countryPath(country, "/cod"),
      title: `الدفع عند الاستلام والطلبات الوهمية ${country.inName} | متجركو`,
      description: `درع الطلبات الوهمية في متجركو ${country.inName}: تنبيه للأرقام المكررة والطلبات الكثيرة ومن رفض الاستلام، وحظر الأرقام، ونسبة التسليم الحقيقية. والطلب الوهمي لا يُحتسب.`,
      keywords: [`الطلبات الوهمية ${country.inName}`, `الدفع عند الاستلام ${country.inName}`, "درع الطلبات الوهمية", "تقليل الطلبات الوهمية"],
    },
    {
      ...base,
      path: countryPath(country, "/register"),
      title: `أنشئ متجرك ${country.inName} مجاناً | متجركو`,
      description: `سجّل متجرك ${country.inName} في دقائق: اختر اسم المتجر ورابطه، والأسعار ب${country.currencyName}. بدون اشتراك شهري.`,
      keywords: [`فتح متجر إلكتروني ${country.inName}`, "تسجيل متجركو"],
      noindex: true,
    },
  ];
}
for (const country of countries) for (const page of countrySeoPages(country)) seoPages[page.path] = page;

seoPages["/ar-sa/compare/salla"] = {
  path: "/ar-sa/compare/salla",
  locale: "ar-SA",
  type: "website",
  title: "متجركو أم سلة؟ مقارنة الأسعار والمزايا للتاجر في السعودية | متجركو",
  description: `مقارنة صريحة بين متجركو وسلة في السعودية: بيسك مجانية وبلس 99 ريالاً وبرو 299 ريالاً في سلة، مقابل ${ABROAD_PER_ORDER_USD}$ على الطلب أو ${ABROAD_PRO_MONTHLY_USD}$ شهرياً في متجركو، ودرع للطلبات الوهمية.`,
  keywords: ["بديل سلة", "متجركو أم سلة", "مقارنة سلة", "أسعار سلة", "منصة متاجر السعودية"],
};

seoPages["/answers"] = {
  path: "/answers",
  type: "website",
  title: "متجركو في أسئلة وإجابات: الأسعار والدول والطلبات الوهمية | متجركو",
  description: "إجابات مباشرة: كم تكلفة متجركو، هل هي متاحة في السعودية والخليج، ما بديل إيزي أوردرز، وكيف تقلل الطلبات الوهمية في متجر الدفع عند الاستلام.",
  keywords: ["متجركو", "تكلفة متجر إلكتروني", "بديل إيزي أوردرز", "منصة متاجر الخليج", "الطلبات الوهمية"],
};

Object.assign(
  seoPages,
  Object.fromEntries(
    Object.entries(englishSeoPages).map(([path, page]) => [
      path,
      {
        ...page,
        path,
        locale: "en" as const,
      },
    ]),
  ),
);

export const indexableSeoPages = Object.values(seoPages).filter((p) => !p.noindex);

export const sitemapPages = indexableSeoPages.map((page) => {
  const isHome = page.path === "/";
  const isLegal = page.path === "/terms" || page.path === "/privacy";
  const isArticle = page.type === "article";
  const isCommercial =
    page.path === "/pricing" ||
    page.path === "/themes" ||
    page.path === "/solutions" ||
    page.path === "/integrations" ||
    page.path.startsWith("/compare");

  return {
    ...page,
    changefreq: isHome || page.path === "/blog" || page.path === "/learn" ? "weekly" : isLegal ? "yearly" : "monthly",
    priority: isHome ? "1.0" : isCommercial ? "0.9" : isArticle ? "0.8" : isLegal ? "0.3" : "0.7",
  };
});

const arabicOrderedSeoPages = [
  seoPages["/download"],
  seoPages["/"],
  seoPages["/solutions"],
  seoPages["/themes"],
  seoPages["/integrations"],
  seoPages["/getting-started"],
  seoPages["/pricing"],
  seoPages["/about"],
  seoPages["/contact"],
  seoPages["/register"],
  seoPages["/login"],
  seoPages["/terms"],
  seoPages["/privacy"],
  seoPages["/store/restaurants"],
  seoPages["/store/clothing"],
  seoPages["/store/electronics"],
  seoPages["/store/cosmetics"],
  seoPages["/store/furniture"],
  seoPages["/blog"],
  seoPages["/blog/how-to-create-online-store-egypt"],
  seoPages["/blog/cost-of-online-store-egypt-2026"],
  seoPages["/blog/best-ecommerce-platform-egypt"],
  seoPages["/blog/free-online-store-pros-cons"],
  seoPages["/learn"],
  ...learnGuides.map((guide) => seoPages[`/learn/${guide.slug}`]),
  // Compare pages
  seoPages["/compare"],
  seoPages["/compare/easyorders"],
  seoPages["/compare/shopify"],
  seoPages["/compare/salla"],
  seoPages["/compare/woocommerce"],
  seoPages["/answers"],
  // Country versions
  ...countries.flatMap((country) => countrySeoPages(country).map((page) => seoPages[page.path])),
  seoPages["/ar-sa/compare/salla"],
];

const englishOrderedSeoPages = englishOrderedPaths
  .map((path) => seoPages[path])
  .filter((page): page is SeoPage => Boolean(page));

export const orderedSeoPages = [...arabicOrderedSeoPages, ...englishOrderedSeoPages];

export function canonicalUrl(path: string) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function getSeoPage(pathname: string) {
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (seoPages[normalized]) return seoPages[normalized];
  const isEnglish = normalized === "/en" || normalized.startsWith("/en/");
  return {
    path: isEnglish ? "/en/404" : "/404",
    title: isEnglish ? "Page not found | Matgarko" : "الصفحة غير موجودة | متجركو",
    description: isEnglish ? "This page is unavailable. Explore Matgarko's features, pricing, and guides." : "هذه الصفحة غير متاحة. اكتشف حلول متجركو والأسعار وخطوات إنشاء متجرك.",
    keywords: [],
    locale: isEnglish ? "en" : "ar-EG",
    noindex: true,
  } satisfies SeoPage;
}

export function pageLocale(page: SeoPage) {
  return page.locale || "ar-EG";
}

export function pageLanguageCode(page: SeoPage) {
  return pageLocale(page);
}

export function pageHtmlLang(page: SeoPage) {
  const locale = pageLocale(page);
  // The main Arabic site keeps lang="ar"; a country version names its country (ar-SA).
  return locale === "en" ? "en" : locale === "ar-EG" ? "ar" : locale;
}

export function pageHtmlDir(page: SeoPage) {
  return pageLocale(page) === "en" ? "ltr" : "rtl";
}

export function pageOgLocale(page: SeoPage) {
  const locale = pageLocale(page);
  return locale === "en" ? "en_US" : locale.replace("-", "_");
}

export function siteNameForPage(page: SeoPage) {
  return pageLocale(page) === "en" ? "Matgarko" : SITE_NAME;
}

export function socialImageAltForPage(page: SeoPage) {
  return pageLocale(page) === "en"
    ? "Matgarko - ecommerce platform for MENA merchants"
    : "متجركو - منصة إنشاء متجر إلكتروني عربي";
}

/** The main-site page a country version's page matches ("/ar-sa/pricing" → "/pricing"). */
const COUNTRY_TO_MAIN: Record<string, string> = { "": "/", "/pricing": "/pricing", "/register": "/register" };

function countryAlternates(countryPage: string) {
  return countries
    .map((country) => ({ hreflang: country.locale, href: canonicalUrl(countryPath(country, countryPage)) }))
    .filter((link) => seoPages[new URL(link.href).pathname]);
}

export function alternateLinksForPage(page: SeoPage) {
  // Country versions: the same page in every country, plus Egypt and English where they exist.
  const country = countryFromPath(page.path);
  const countryPage = country ? stripCountryPrefix(page.path) : Object.entries(COUNTRY_TO_MAIN).find(([, main]) => main === stripLanguagePrefix(page.path))?.[0];
  if (countryPage !== undefined && (country || COUNTRY_TO_MAIN[countryPage])) {
    const main = COUNTRY_TO_MAIN[countryPage];
    const others = countryAlternates(countryPage);
    if (country && !others.length) return [];
    const mainLinks = main && seoPages[main]
      ? [
          { hreflang: "ar-EG", href: canonicalUrl(main) },
          ...(seoPages[localizePath(main, "en")] ? [{ hreflang: "en", href: canonicalUrl(localizePath(main, "en")) }] : []),
        ]
      : [];
    if (!mainLinks.length && others.length < 2) return [];
    return [...mainLinks, ...others, { hreflang: "x-default", href: mainLinks[0]?.href ?? others[0].href }];
  }

  const basePath = stripLanguagePrefix(page.path);
  const arabicPath = localizePath(basePath, "ar");
  const englishPath = localizePath(basePath, "en");

  if (!seoPages[arabicPath] || !seoPages[englishPath]) {
    return [];
  }

  return [
    { hreflang: "ar-EG", href: canonicalUrl(arabicPath) },
    { hreflang: "en", href: canonicalUrl(englishPath) },
    { hreflang: "x-default", href: canonicalUrl(arabicPath) },
  ];
}

export function socialImageUrl() {
  return `${SITE_URL}/og-image.png`;
}

function offerDescription(plan: (typeof plans)[number], language: "ar" | "en") {
  if (language === "ar") {
    return plan.perOrderFee === 0
      ? `${formatEgp(plan.monthly, "ar")} شهرياً بدون رسوم على الطلب`
      : `${plan.monthly === 0 ? "ابدأ بدون اشتراك شهري" : `${formatEgp(plan.monthly, "ar")} شهرياً`} مع ${perOrderFeeLabel(plan, "ar")}، والطلبات الوهمية ببلاش`;
  }

  return plan.perOrderFee === 0
    ? `${formatEgp(plan.monthly, "en")} per month with no per-order fee`
    : `${plan.monthly === 0 ? "Start free" : `${formatEgp(plan.monthly, "en")} per month`} with a flat ${perOrderFeeLabel(plan, "en")}. Fake orders are free.`;
}

function serviceOffers(language: "ar" | "en") {
  return plans.map((plan) => ({
    "@type": "Offer",
    name: plan.name[language],
    price: String(plan.monthly),
    priceCurrency: "EGP",
    description: offerDescription(plan, language),
    url: canonicalUrl(language === "en" ? "/en/pricing" : "/pricing"),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(plan.monthly),
      priceCurrency: "EGP",
      unitCode: "MON",
      billingIncrement: 1,
    },
  }));
}

/** Egypt and the Gulf countries that have their own version of the site. */
const AREA_SERVED = [
  { "@type": "Country", name: "Egypt" },
  ...countries.map((country) => ({ "@type": "Country", name: country.englishName })),
];

/** Prices for a store outside Egypt, billed in US dollars. */
export function abroadOffers(country: Country) {
  const url = canonicalUrl(countryPath(country, "/pricing"));
  return [
    {
      "@type": "Offer",
      name: "البداية",
      price: "0",
      priceCurrency: "USD",
      description: `بدون اشتراك شهري، ${ABROAD_PER_ORDER_USD}$ على كل طلب (حوالي ${localMoney(country, ABROAD_PER_ORDER_USD)})، والطلبات الوهمية لا تُحتسب`,
      url,
      priceSpecification: { "@type": "UnitPriceSpecification", price: String(ABROAD_PER_ORDER_USD), priceCurrency: "USD", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: "order" } },
      eligibleRegion: { "@type": "Country", name: country.englishName },
    },
    {
      "@type": "Offer",
      name: "احترافي",
      price: String(ABROAD_PRO_MONTHLY_USD),
      priceCurrency: "USD",
      description: `${ABROAD_PRO_MONTHLY_USD}$ شهرياً بدون رسوم على الطلب`,
      url,
      priceSpecification: { "@type": "UnitPriceSpecification", price: String(ABROAD_PRO_MONTHLY_USD), priceCurrency: "USD", unitCode: "MON", billingIncrement: 1 },
      eligibleRegion: { "@type": "Country", name: country.englishName },
    },
  ];
}

/** A FAQPage schema for any list of questions. */
export function questionsSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function countryQuestionsSchema(page: SeoPage) {
  const country = countryFromPath(page.path);
  if (page.path === "/answers") return questionsSchema(answers);
  if (country && stripCountryPrefix(page.path) === "") return questionsSchema(countryFaqs(country));
  return null;
}

function offersForPage(page: SeoPage | undefined, isEnglish: boolean) {
  const country = page ? countryFromPath(page.path) : undefined;
  if (country) return abroadOffers(country);
  return isEnglish ? EN_SERVICE_OFFERS : SERVICE_OFFERS;
}

const SERVICE_OFFERS = serviceOffers("ar");
const EN_SERVICE_OFFERS = serviceOffers("en");

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ["Matgarko", "متجركو"],
    slogan: "اعمل متجرك وادِر شغلك كله من موبايلك",
    description: positioning.ar.description,
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    image: `${SITE_URL}/og-image.png`,
    email: CONTACT_EMAIL,
    telephone: "+20-108-031-2538",
    address: {
      "@type": "PostalAddress",
      addressLocality: "القاهرة الجديدة",
      addressRegion: "القاهرة",
      addressCountry: "EG",
    },
    areaServed: AREA_SERVED,
    sameAs: [
      "https://www.facebook.com/matgarko2/",
      "https://wa.me/201080312538",
    ],
    knowsAbout: CORE_TOPICS,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+20-108-031-2538",
        email: CONTACT_EMAIL,
        areaServed: ["EG", ...countries.map((country) => country.code)],
        availableLanguage: ["Arabic", "English"],
      },
    ],
  };
}

function webPageSchemaType(page: SeoPage) {
  const basePath = stripLanguagePrefix(page.path);
  if (basePath === "/about") return "AboutPage";
  if (basePath === "/contact") return "ContactPage";
  if (basePath === "/blog" || basePath === "/compare" || basePath === "/learn") return "CollectionPage";
  return "WebPage";
}

export function webPageSchema(page: SeoPage) {
  const schema = {
    "@context": "https://schema.org",
    "@type": webPageSchemaType(page),
    "@id": `${canonicalUrl(page.path)}#webpage`,
    url: canonicalUrl(page.path),
    name: page.title,
    description: page.description,
    inLanguage: pageLanguageCode(page),
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: socialImageUrl(),
      width: 1200,
      height: 630,
    },
    about: CORE_TOPICS.map((name) => ({
      "@type": "Thing",
      name,
    })),
  };

  if (page.type === "article") {
    return {
      ...schema,
      mainEntity: {
        "@id": `${canonicalUrl(page.path)}#article`,
      },
    };
  }

  return schema;
}

export function websiteSchema(page?: SeoPage) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: page ? siteNameForPage(page) : SITE_NAME,
    url: SITE_URL,
    inLanguage: page ? pageLanguageCode(page) : "ar-EG",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function serviceSchema(page?: SeoPage) {
  const isEnglish = page ? pageLocale(page) === "en" : false;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#ecommerce-service`,
    name: "متجركو - إنشاء متجر إلكتروني في مصر والخليج",
    alternateName: "Matgarko ecommerce store builder",
    serviceType: "Ecommerce platform",
    category: "BusinessApplication",
    description: positioning[isEnglish ? "en" : "ar"].description,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: AREA_SERVED,
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Solo merchants and small businesses in Egypt and the Arab world",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Matgarko pricing plans",
      itemListElement: offersForPage(page, isEnglish),
    },
    termsOfService: canonicalUrl(isEnglish ? "/en/terms" : "/terms"),
    url: SITE_URL,
  };
}

export function articleSchema(page: SeoPage) {
  if (page.type !== "article") {
    return null;
  }

  const articlePath = stripLanguagePrefix(page.path);
  const articleSource = pageLocale(page) === "en" ? englishBlogArticles : [...blogArticles, ...learnGuides];
  const article = articleSource.find((item) => articlePath === `/blog/${item.slug}` || articlePath === `/learn/${item.slug}`);

  if (!article) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonicalUrl(page.path)}#article`,
    mainEntityOfPage: canonicalUrl(page.path),
    headline: article.title,
    description: article.description,
    image: socialImageUrl(),
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    inLanguage: pageLanguageCode(page),
    author: {
      "@type": "Organization",
      name: siteNameForPage(page),
      url: SITE_URL,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function sitemapXml() {
  const urls = sitemapPages
    .map(
      (page) => `  <url>
    <loc>${canonicalUrl(page.path)}</loc>
${alternateLinksForPage(page).map((link) => `    <xhtml:link rel="alternate" hreflang="${link.hreflang}" href="${link.href}" />`).join("\n")}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

export function softwareSchema(page?: SeoPage) {
  const isEnglish = page ? pageLocale(page) === "en" : false;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: isEnglish ? "Matgarko" : SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    inLanguage: page ? pageLocale(page) : "ar-EG",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    offers: offersForPage(page, isEnglish),
    featureList: isEnglish ? [
      "Create an online store without coding",
      "Manage products and orders",
      "One ready store look with colour palettes by business type and a home page builder",
      "Accept cash-on-delivery orders",
      "Order now button on product pages",
      "Set delivery prices by area",
      "Manage customers and discount coupons",
      "Meta Pixel, Conversions API, and Google Analytics",
      "Store statistics with profit and visit sources",
      "Import products from Excel",
      "Connect your own domain yourself in minutes, on every plan",
    ] : [
      "إنشاء متجر إلكتروني بدون برمجة",
      "إدارة المنتجات والطلبات",
      "شكل متجر جاهز بألوان حسب نشاطك ومنشئ للصفحة الرئيسية",
      "استقبال طلبات الدفع عند الاستلام",
      "زر «اطلب الآن» في صفحة المنتج",
      "تحديد سعر التوصيل لكل منطقة",
      "إدارة العملاء وكوبونات الخصم",
      "Meta Pixel وConversions API وGoogle Analytics",
      "إحصائيات المتجر بالأرباح ومصادر الزيارات",
      "استيراد المنتجات من Excel",
      "اربط دومينك الخاص بنفسك في دقائق، على كل الباقات",
    ],
  };
}

export function faqSchema(page?: SeoPage) {
  const faqSource = page && pageLocale(page) === "en" ? englishFaqs : faqs;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSource.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function pricingFaqSchema(page?: SeoPage) {
  const language = page && pageLocale(page) === "en" ? "en" : "ar";

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingFaqs[language].map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(page: SeoPage) {
  if (pageLocale(page) === "en") {
    const basePath = stripLanguagePrefix(page.path);
    const sectionLabels: Record<string, string> = { store: "Store types", blog: "Blog", compare: "Comparisons" };
    const items = [
      {
        "@type": "ListItem",
        position: 1,
        name: siteNameForPage(page),
        item: canonicalUrl("/en"),
      },
    ];

    if (basePath !== "/") {
      const segments = basePath.split("/").filter(Boolean);

      if (segments.length > 1) {
        items.push({
          "@type": "ListItem",
          position: 2,
          name: sectionLabels[segments[0]] || cleanTitle(page.title),
          item: canonicalUrl(localizePath(segments[0] === "store" ? "/solutions" : `/${segments[0]}`, "en")),
        });
        items.push({
          "@type": "ListItem",
          position: 3,
          name: cleanTitle(page.title),
          item: canonicalUrl(page.path),
        });
      } else {
        items.push({
          "@type": "ListItem",
          position: 2,
          name: cleanTitle(page.title),
          item: canonicalUrl(page.path),
        });
      }
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items,
    };
  }

  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: SITE_NAME,
      item: canonicalUrl("/"),
    },
  ];

  if (page.path !== "/") {
    // Handle nested paths like /store/restaurants or /blog/slug
    const segments = page.path.split("/").filter(Boolean);
    if (segments.length > 1) {
      items.push({
        "@type": "ListItem",
        position: 2,
        name: segments[0] === "store" ? "متاجر حسب النشاط" : segments[0] === "compare" ? "المقارنات" : segments[0] === "learn" ? "مركز التعلّم" : "المدونة",
        item: canonicalUrl(segments[0] === "store" ? "/solutions" : `/${segments[0]}`),
      });
      items.push({
        "@type": "ListItem",
        position: 3,
        name: page.title.split("|")[0].trim(),
        item: canonicalUrl(page.path),
      });
    } else {
      items.push({
        "@type": "ListItem",
        position: 2,
        name: page.title.split("|")[0].trim(),
        item: canonicalUrl(page.path),
      });
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

function cleanTitle(title: string) {
  return title.split("|")[0].split("—")[0].trim();
}

function markdownPageList(pages = sitemapPages) {
  return pages
    .map((page) => `- [${cleanTitle(page.title)}](${canonicalUrl(page.path)}): ${page.description}`)
    .join("\n");
}

export function llmsTxt(lastmod = new Date().toISOString().slice(0, 10)) {
  const commercialPages = sitemapPages.filter((page) =>
    ["/", "/pricing", "/solutions", "/themes", "/integrations", "/getting-started", "/compare", "/answers"].includes(stripLanguagePrefix(page.path)) ||
    (countryFromPath(page.path) !== undefined && !page.path.endsWith("/register")) ||
    stripLanguagePrefix(page.path).startsWith("/compare/"),
  );
  const articlePages = sitemapPages.filter((page) => page.type === "article");

  return `# Matgarko

> ${positioning.en.description}

Last updated: ${lastmod}
Official website: ${SITE_URL}/
Languages: Arabic and English
Markets: Egypt (main site), Saudi Arabia, United Arab Emirates, Kuwait, Qatar, Oman and Bahrain (country versions), and stores in every other Arab country
Pricing in Egypt: ${pricingSummary("en")}
Pricing outside Egypt (billed in US dollars): Starter $${ABROAD_PER_ORDER_USD} per order with no monthly fee; Pro $${ABROAD_PRO_MONTHLY_USD} per month with no per-order fee. Fake orders flagged by the fake-order shield and then canceled are not billed, nor are orders the merchant records by hand.
Mobile app availability: ${positioning.en.appNotice}
Contact: ${CONTACT_EMAIL}, ${WHATSAPP_URL}

## Key Facts

- Brand: Matgarko / متجركو
- Category: Arabic ecommerce platform and no-code online store builder.
- Audience: solo merchants and small businesses in Egypt and the Arab world, including restaurants, clothing, electronics, cosmetics, and furniture stores.
- Main jobs: create an ecommerce store, manage products and cash-on-delivery orders, organize customers, set delivery prices, launch offers, and style one ready mobile-first store look with their own colours (palettes grouped by business type), logo, font, and photos.
- Differentiators: a flat fee per order with fake orders free, a fake-order shield for cash on delivery, Meta Pixel with Conversions API, an Android app for merchants, Arabic-first, and no technical experience required.
- Compared with EasyOrders: 3 EGP per order versus $0.04 (about 2.24 EGP), but EasyOrders charges every order including canceled and fake ones while Matgarko does not bill shield-flagged fake orders; Pro 2,000 EGP versus $100 (about 5,600 EGP) a month.
- Compared with Salla in Saudi Arabia: Salla has a free Basic plan, Plus at 99 SAR and Pro at 299 SAR a month, built-in online payments and a large app store; Matgarko is simpler and cheaper for cash-on-delivery sellers ($${ABROAD_PRO_MONTHLY_USD}, about 131 SAR, for Pro) and does not bill fake orders.

## Country Versions

${countries.map((country) => `- ${country.englishName}: ${canonicalUrl(countryPath(country, ""))} (pricing ${canonicalUrl(countryPath(country, "/pricing"))}; about ${localMoney(country, ABROAD_PER_ORDER_USD)} per order)`).join("\n")}

## Direct Answers

${answers.map((item) => `### ${item.question}\n\n${item.answer}`).join("\n\n")}
- Not a marketplace: Matgarko provides software for merchants to create their own stores.

## Best Pages For AI Answers

${markdownPageList(commercialPages)}

## Guides And Comparisons

${markdownPageList(articlePages)}

## Machine-Readable Files

- [Sitemap](${SITE_URL}/sitemap.xml): indexable public pages.
- [Full LLM Context](${SITE_URL}/llms-full.txt): expanded page-by-page context for AI retrieval.
`;
}

export function llmsFullTxt(lastmod = new Date().toISOString().slice(0, 10)) {
  const pageSections = sitemapPages
    .map(
      (page) => `## ${cleanTitle(page.title)}

URL: ${canonicalUrl(page.path)}
Type: ${page.type === "article" ? "Guide article" : "Landing page"}
Description: ${page.description}
Keywords: ${page.keywords.join(", ")}
`,
    )
    .join("\n");

  const articles = [
    ...blogArticles.map((article) => ({ article, language: "Arabic (Egypt)", path: `/blog/${article.slug}` })),
    ...englishBlogArticles.map((article) => ({ article, language: "English", path: `/en/blog/${article.slug}` })),
  ]
    .map(
      ({ article, language, path }) => `## Blog Article: ${article.title}

URL: ${canonicalUrl(path)}
Language: ${language}
Category: ${article.category}
Published: ${article.publishDate}
Reading time: ${article.readingTime}
Summary: ${article.description}
${article.content.map((section) => {
  if (section.type === "h2") return `### ${section.text}`;
  if (section.type === "h3") return `#### ${section.text}`;
  if (section.items) return section.items.map((item, index) => `${section.type === "ol" ? `${index + 1}.` : "-"} ${item}`).join("\n");
  return section.text || "";
}).join("\n\n")}
`,
    )
    .join("\n");

  return `# Matgarko Full AI Context

Last updated: ${lastmod}
Canonical site: ${SITE_URL}/

${positioning.en.description} This file contains product information, public guide text, and canonical page URLs.

Mobile app availability: ${positioning.en.appNotice}

## Entity Summary

- Name: Matgarko / متجركو
- Website: ${SITE_URL}/
- Markets: Egypt, Saudi Arabia, United Arab Emirates, Kuwait, Qatar, Oman, Bahrain and the rest of the Arab world
- Languages: Arabic and English
- Pricing outside Egypt: $${ABROAD_PER_ORDER_USD} per order, or Pro $${ABROAD_PRO_MONTHLY_USD} a month
- Email: ${CONTACT_EMAIL}
- WhatsApp: ${WHATSAPP_URL}
- Service: ecommerce store creation and store management software.
- Core offer: start free and pay a flat fee per order, or upgrade to Pro for no per-order fee.

## Pricing Summary

${plans.map((plan) => `- ${plan.name.en}: ${formatEgp(plan.monthly, "en")}/month ${plan.perOrderFee > 0 ? `+ ${perOrderFeeLabel(plan, "en")}` : "with no per-order fee"}.`).join("\n")}
- Billable orders: ${billableOrdersRule.en}
- Pricing source: ${canonicalUrl("/pricing")}

## Frequently Asked Questions

${[...faqs, ...englishFaqs].map((faq) => `### ${faq.question}\n\n${faq.answer}`).join("\n\n")}

## Public Pages

${pageSections}

## Blog Knowledge Base

${articles}

## Citation Preference

For factual answers about Matgarko, cite the most specific canonical page:

- Pricing: ${canonicalUrl("/pricing")}
- How to start: ${canonicalUrl("/getting-started")}
- Store design: ${canonicalUrl("/themes")}
- Cash on delivery and delivery prices: ${canonicalUrl("/integrations")}
- Company/entity details: ${canonicalUrl("/about")}
- Contact/support: ${canonicalUrl("/contact")}
- Comparisons: ${canonicalUrl("/compare")}
- English overview: ${canonicalUrl("/en")}
- English pricing: ${canonicalUrl("/en/pricing")}
- English platform comparisons: ${canonicalUrl("/en/compare")}
`;
}
