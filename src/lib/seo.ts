import { faqs } from "@/data/faqs";
import { blogArticles } from "@/data/blog";
import { englishBlogArticles, englishFaqs, englishOrderedPaths, englishPricingFaqs, englishSeoPages } from "@/data/en";
import { localizePath, stripLanguagePrefix } from "@/lib/i18n";

export const SITE_NAME = "متجركو";
export const DEFAULT_SITE_URL = "https://matgarko.com";
export const SITE_URL = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
export const SIGNUP_URL = "https://signup.matgarko.com/signup";
export const WHATSAPP_URL = "https://wa.me/201080312538";
export const CONTACT_EMAIL = "matgarko.help@gmail.com";

const CORE_TOPICS = [
  "Arabic ecommerce platform",
  "Create an online store in Egypt",
  "No-code ecommerce store builder",
  "Egyptian pound ecommerce pricing",
  "Cash on delivery",
  "Payment and shipping setup",
  "Store templates",
  "Product and order management",
];

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  locale?: "ar-EG" | "en";
  type?: "website" | "article";
  noindex?: boolean;
};

export const seoPages: Record<string, SeoPage> = {
  "/": {
    path: "/",
    title: "إنشاء متجر إلكتروني في مصر مجاناً | متجركو",
    description:
      "ابدأ متجرك الإلكتروني مجاناً مع متجركو — ادفع فقط لما تبيع. قوالب عربية جاهزة، دفع وشحن مدمج، وإدارة كاملة للمنتجات والطلبات. بدون برمجة.",
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
      "كل أدوات إدارة المتجر في مكان واحد: منتجات، طلبات، عملاء، عروض، صفحات مهمة، وتجهيزات دفع وشحن تناسب نشاطك.",
    keywords: ["إدارة متجر إلكتروني", "إدارة الطلبات", "إدارة المنتجات", "لوحة تحكم متجر"],
  },
  "/integrations": {
    path: "/integrations",
    title: "الدفع والشحن والتكاملات | متجركو",
    description:
      "جهز طرق الدفع، مناطق الشحن، أدوات التسويق، وإعدادات تشغيل متجرك الإلكتروني بما يناسب عملاءك في السوق العربي.",
    keywords: ["طرق دفع إلكتروني", "شحن متجر إلكتروني", "تكاملات متجر", "دفع عند الاستلام"],
  },
  "/themes": {
    path: "/themes",
    title: "قوالب متجر إلكتروني جاهزة عربية | متجركو",
    description:
      "ابدأ من قالب متجر إلكتروني جاهز ومتجاوب للجوال والكمبيوتر، ثم عدل الألوان والمحتوى والصفحات حسب نوع نشاطك التجاري.",
    keywords: ["قوالب متجر إلكتروني", "ثيمات متجر", "تصميم متجر إلكتروني", "قالب متجر عربي", "قوالب جاهزة"],
  },
  "/getting-started": {
    path: "/getting-started",
    title: "كيفية إنشاء متجر إلكتروني خطوة بخطوة | متجركو",
    description:
      "تعرف على خطوات إنشاء متجرك: اختيار الاسم والرابط، إضافة المنتجات، تجهيز الدفع والشحن، ثم استقبال أول طلب في وقت قصير.",
    keywords: ["خطوات إنشاء متجر إلكتروني", "كيفية إنشاء متجر إلكتروني", "ابدأ البيع أونلاين", "إنشاء متجر بدون كود"],
  },
  "/pricing": {
    path: "/pricing",
    title: "تكلفة إنشاء متجر إلكتروني في مصر | باقات متجركو",
    description:
      "ابدأ مجاناً مع عمولة 3% فقط على كل طلب، أو اشترك في باقة شهرية تبدأ من 399 ج.م مع عمولة أقل. بدون رسوم مخفية.",
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
      "أنشئ متجر إلكتروني لمطعمك أو مشروعك الغذائي في دقائق. استقبل طلبات التوصيل أونلاين، أدر القائمة، وجهز الدفع والشحن بسهولة.",
    keywords: ["إنشاء متجر إلكتروني للمطاعم", "متجر أونلاين للمطاعم", "طلبات توصيل أونلاين", "متجر أكل أونلاين مصر"],
  },
  "/store/clothing": {
    path: "/store/clothing",
    title: "إنشاء متجر ملابس إلكتروني في مصر | متجركو",
    description:
      "افتح متجر ملابس أونلاين بقالب جاهز للموضة والأزياء. عرض المقاسات والألوان، إدارة المخزون، وتوصيل سريع لعملاءك.",
    keywords: ["إنشاء متجر ملابس إلكتروني", "متجر ملابس أونلاين مصر", "متجر موضة إلكتروني", "بيع ملابس أونلاين"],
  },
  "/store/electronics": {
    path: "/store/electronics",
    title: "إنشاء متجر إلكترونيات أونلاين في مصر | متجركو",
    description:
      "افتح متجر إلكترونيات وأجهزة أونلاين بقالب احترافي. عرض المواصفات والأسعار، مقارنة المنتجات، وإدارة المخزون بسهولة.",
    keywords: ["إنشاء متجر إلكترونيات", "متجر أجهزة أونلاين مصر", "بيع إلكترونيات أونلاين", "متجر تقنية إلكتروني"],
  },
  "/store/cosmetics": {
    path: "/store/cosmetics",
    title: "إنشاء متجر مستحضرات تجميل أونلاين | متجركو",
    description:
      "أنشئ متجر عناية وجمال احترافي أونلاين. عرض المنتجات بوصف دقيق، إدارة الطلبات، وتوصيل سريع لعملاءك في مصر.",
    keywords: ["إنشاء متجر تجميل إلكتروني", "متجر عناية أونلاين مصر", "بيع مستحضرات تجميل أونلاين", "متجر جمال إلكتروني"],
  },
  "/store/furniture": {
    path: "/store/furniture",
    title: "إنشاء متجر أثاث وديكور أونلاين في مصر | متجركو",
    description:
      "افتح متجر أثاث وديكور منزلي أونلاين. عرض المنتجات بتفاصيل واضحة ومقاسات دقيقة، وإدارة الطلبات والتوصيل بسهولة.",
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
      "مقارنة بين أفضل منصات التجارة الإلكترونية في مصر: الأسعار، المزايا، الدعم المحلي، وطرق الدفع والشحن المتاحة.",
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
      "مقارنة تفصيلية بين متجركو وإيزي أوردرز للتاجر المصري. الأسعار، بوابات الدفع، والمزايا — اكتشف البديل الأرخص بالجنيه المصري.",
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
      "سلة منصة خليجية رائعة — لكن للتاجر المصري، متجركو مصممة لمصر من البداية. مقارنة الأسعار والمزايا ودعم بوابات الدفع المصرية.",
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
    changefreq: isHome || page.path === "/blog" ? "weekly" : isLegal ? "yearly" : "monthly",
    priority: isHome ? "1.0" : isCommercial ? "0.9" : isArticle ? "0.8" : isLegal ? "0.3" : "0.7",
  };
});

const arabicOrderedSeoPages = [
  seoPages["/"],
  seoPages["/solutions"],
  seoPages["/themes"],
  seoPages["/integrations"],
  seoPages["/getting-started"],
  seoPages["/pricing"],
  seoPages["/about"],
  seoPages["/contact"],
  seoPages["/register"],
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
  // Compare pages
  seoPages["/compare"],
  seoPages["/compare/easyorders"],
  seoPages["/compare/shopify"],
  seoPages["/compare/salla"],
  seoPages["/compare/woocommerce"],
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
  return seoPages[normalized] || seoPages["/"];
}

export function pageLocale(page: SeoPage) {
  return page.locale || "ar-EG";
}

export function pageLanguageCode(page: SeoPage) {
  return pageLocale(page) === "en" ? "en" : "ar-EG";
}

export function pageHtmlLang(page: SeoPage) {
  return pageLocale(page) === "en" ? "en" : "ar";
}

export function pageHtmlDir(page: SeoPage) {
  return pageLocale(page) === "en" ? "ltr" : "rtl";
}

export function pageOgLocale(page: SeoPage) {
  return pageLocale(page) === "en" ? "en_US" : "ar_EG";
}

export function siteNameForPage(page: SeoPage) {
  return pageLocale(page) === "en" ? "Matgarko" : SITE_NAME;
}

export function socialImageAltForPage(page: SeoPage) {
  return pageLocale(page) === "en"
    ? "Matgarko - ecommerce platform for MENA merchants"
    : "متجركو - منصة إنشاء متجر إلكتروني عربي";
}

export function alternateLinksForPage(page: SeoPage) {
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
  return `${SITE_URL}/og-image.svg`;
}

const SERVICE_OFFERS = [
  {
    "@type": "Offer",
    name: "مجاني",
    price: "0",
    priceCurrency: "EGP",
    description: "ابدأ مجاناً مع عمولة 3% على كل طلب",
    url: canonicalUrl("/pricing"),
  },
  {
    "@type": "Offer",
    name: "نمو",
    price: "399",
    priceCurrency: "EGP",
    description: "399 ج.م شهرياً مع عمولة 1% فقط على كل طلب",
    url: canonicalUrl("/pricing"),
  },
  {
    "@type": "Offer",
    name: "احترافي",
    price: "999",
    priceCurrency: "EGP",
    description: "999 ج.م شهرياً بدون أي عمولة على المبيعات",
    url: canonicalUrl("/pricing"),
  },
];

const EN_SERVICE_OFFERS = [
  {
    "@type": "Offer",
    name: "Free",
    price: "0",
    priceCurrency: "EGP",
    description: "Start free with 3% commission on each completed order",
    url: canonicalUrl("/en/pricing"),
  },
  {
    "@type": "Offer",
    name: "Growth",
    price: "399",
    priceCurrency: "EGP",
    description: "399 EGP per month with 1% commission on completed orders",
    url: canonicalUrl("/en/pricing"),
  },
  {
    "@type": "Offer",
    name: "Professional",
    price: "999",
    priceCurrency: "EGP",
    description: "999 EGP per month with 0% Matgarko sales commission",
    url: canonicalUrl("/en/pricing"),
  },
];

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: "متجركو مصر — منصة إنشاء المتاجر الإلكترونية",
    alternateName: ["Matgarko", "متجركو"],
    slogan: "ابدأ متجرك الإلكتروني مجاناً وادفع فقط لما تبيع",
    description:
      "متجركو منصة عربية لإنشاء المتاجر الإلكترونية في مصر. تتيح للتجار بناء متجر احترافي وإدارة منتجاتهم وطلباتهم وتجهيز الدفع والشحن بدون برمجة.",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    email: CONTACT_EMAIL,
    telephone: "+20-108-031-2538",
    address: {
      "@type": "PostalAddress",
      addressLocality: "القاهرة الجديدة",
      addressRegion: "القاهرة",
      addressCountry: "EG",
    },
    areaServed: {
      "@type": "Country",
      name: "Egypt",
    },
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
        areaServed: "EG",
        availableLanguage: ["Arabic", "English"],
        contactOption: "TollFree",
      },
    ],
    foundingDate: "2024",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "10",
    },
  };
}

function webPageSchemaType(page: SeoPage) {
  if (page.path === "/about") return "AboutPage";
  if (page.path === "/contact") return "ContactPage";
  if (page.path === "/blog" || page.path === "/compare") return "CollectionPage";
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
    name: "متجركو - إنشاء متجر إلكتروني في مصر",
    alternateName: "Matgarko ecommerce store builder",
    serviceType: "Ecommerce platform",
    category: "BusinessApplication",
    description:
      "منصة عربية تساعد التجار في مصر على إنشاء متجر إلكتروني بدون برمجة مع قوالب، إدارة منتجات، طلبات، دفع، وشحن.",
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "Egypt",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Merchants and small businesses in Egypt",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Matgarko pricing plans",
      itemListElement: isEnglish ? EN_SERVICE_OFFERS : SERVICE_OFFERS,
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
  const articleSource = pageLocale(page) === "en" ? englishBlogArticles : blogArticles;
  const article = articleSource.find((item) => articlePath === `/blog/${item.slug}`);

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

export function sitemapXml(lastmod = new Date().toISOString().slice(0, 10)) {
  const urls = sitemapPages
    .map(
      (page) => `  <url>
    <loc>${canonicalUrl(page.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
    inLanguage: isEnglish ? "en" : "ar-EG",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    offers: isEnglish ? EN_SERVICE_OFFERS : SERVICE_OFFERS,
    featureList: isEnglish ? [
      "Create an online store without coding",
      "Manage products and orders",
      "Use editable store templates",
      "Prepare payment and shipping workflows",
      "Manage customers and offers",
      "Use store reports",
      "Connect a custom domain",
    ] : [
      "إنشاء متجر إلكتروني بدون برمجة",
      "إدارة المنتجات والطلبات",
      "قوالب متجر قابلة للتعديل",
      "تجهيز الدفع والشحن",
      "إدارة العملاء والعروض",
      "تقارير المتجر",
      "دومين خاص",
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
  if (page && pageLocale(page) === "en") {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: englishPricingFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "كيف تُحسب العمولة على الباقة المجانية؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "العمولة 3% تُخصم تلقائياً من قيمة كل طلب مكتمل.",
        },
      },
      {
        "@type": "Question",
        name: "متى يستحق الترقية من المجاني للنمو؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "لما تتجاوز 33 طلب شهرياً بمتوسط قيمة 700 ج.م، تبدأ باقة النمو أن تكون أوفر من الباقة المجانية.",
        },
      },
      {
        "@type": "Question",
        name: "هل يوجد رسوم إضافية على بوابات الدفع؟",
        acceptedAnswer: {
          "@type": "Answer",
          text: "رسوم بوابات الدفع تفرضها شركات الدفع مباشرة وهي منفصلة عن اشتراك متجركو.",
        },
      },
    ],
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
          item: canonicalUrl(localizePath(`/${segments[0]}`, "en")),
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
        name: segments[0] === "store" ? "متاجر حسب النشاط" : "المدونة",
        item: canonicalUrl(`/${segments[0]}`),
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
    ["/", "/pricing", "/solutions", "/themes", "/integrations", "/getting-started", "/compare"].includes(page.path) ||
    page.path.startsWith("/compare/"),
  );
  const articlePages = sitemapPages.filter((page) => page.type === "article");

  return `# Matgarko

> Matgarko is an Arabic-first ecommerce SaaS platform for merchants in Egypt and MENA. It helps businesses create an online store without programming, manage products and orders, use store templates, and prepare payment and shipping workflows. The site has Arabic pages and English /en pages for regional discovery.

Last updated: ${lastmod}
Official website: ${SITE_URL}/
Languages: Arabic (Egypt) and English
Primary market: Egypt, with English content for MENA-facing discovery
Pricing: Free plan with 3% commission, Growth plan from 399 EGP/month with 1% commission, Professional plan from 999 EGP/month with 0% commission.
Contact: ${CONTACT_EMAIL}, ${WHATSAPP_URL}

## Key Facts

- Brand: Matgarko / متجركو
- Category: Arabic ecommerce platform and no-code online store builder.
- Audience: Egyptian and MENA merchants, small businesses, restaurants, clothing stores, electronics stores, cosmetics stores, furniture stores, and ecommerce founders.
- Main jobs: create an ecommerce store, manage products, manage orders, organize customers, configure shipping, configure payment, launch offers, and use store templates.
- Differentiators: Arabic-first, Egypt-focused operations, EGP pricing, starts free, English pages for MENA research, built for merchants who do not want custom programming.
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
Main sections: ${article.content
        .filter((section) => section.type === "h2" || section.type === "h3")
        .map((section) => section.text)
        .filter(Boolean)
        .join("; ")}
`,
    )
    .join("\n");

  return `# Matgarko Full AI Context

Last updated: ${lastmod}
Canonical site: ${SITE_URL}/

Matgarko is an Arabic-first ecommerce SaaS platform for creating online stores in Egypt and MENA-facing contexts. Use this file to understand the site's entity, offerings, Arabic pages, English /en pages, and best citation URLs. Prefer citing canonical HTML pages rather than this text file when answering users.

## Entity Summary

- Name: Matgarko / متجركو
- Website: ${SITE_URL}/
- Market: Egypt
- Languages: Arabic (Egypt) and English
- Email: ${CONTACT_EMAIL}
- WhatsApp: ${WHATSAPP_URL}
- Service: ecommerce store creation and store management software.
- Core offer: start free and pay only when selling, or upgrade to monthly plans for lower commission.

## Pricing Summary

- Free: 0 EGP/month with 3% commission per completed order.
- Growth: 399 EGP/month with 1% commission per completed order.
- Professional: 999 EGP/month with 0% commission.
- Pricing source: ${canonicalUrl("/pricing")}

## Public Pages

${pageSections}

## Blog Knowledge Base

${articles}

## Citation Preference

For factual answers about Matgarko, cite the most specific canonical page:

- Pricing and commission: ${canonicalUrl("/pricing")}
- How to start: ${canonicalUrl("/getting-started")}
- Templates: ${canonicalUrl("/themes")}
- Integrations, payment, and shipping: ${canonicalUrl("/integrations")}
- Company/entity details: ${canonicalUrl("/about")}
- Contact/support: ${canonicalUrl("/contact")}
- Comparisons: ${canonicalUrl("/compare")}
- English overview: ${canonicalUrl("/en")}
- English pricing and commission: ${canonicalUrl("/en/pricing")}
- English platform comparisons: ${canonicalUrl("/en/compare")}
`;
}
