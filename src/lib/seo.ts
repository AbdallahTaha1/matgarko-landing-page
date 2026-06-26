import { faqs } from "@/data/faqs";

export const SITE_NAME = "متجركو";
export const DEFAULT_SITE_URL = "https://matgarko.com";
export const SITE_URL = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
export const SIGNUP_URL = "https://signup.matgarko.com/signup";
export const WHATSAPP_URL = "https://wa.me/201080312538";
export const CONTACT_EMAIL = "matgarko.help@gmail.com";

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  type?: "website" | "article";
};

export const seoPages: Record<string, SeoPage> = {
  "/": {
    path: "/",
    title: "متجركو | إنشاء متجر إلكتروني في مصر بدون برمجة",
    description:
      "أنشئ متجر إلكتروني عربي في دقائق مع متجركو. أضف منتجاتك، استقبل الطلبات، وجهز الدفع والشحن بباقات شهرية مناسبة للسوق المصري.",
    keywords: [
      "إنشاء متجر إلكتروني",
      "متجر إلكتروني مصر",
      "منصة تجارة إلكترونية",
      "متجركو",
      "بيع أونلاين",
      "متجر بدون برمجة",
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
    title: "قوالب متجر إلكتروني جاهزة | متجركو",
    description:
      "ابدأ من قالب متجر إلكتروني جاهز ومتجاوب، ثم عدل الألوان والمحتوى والصفحات حسب نوع نشاطك التجاري.",
    keywords: ["قوالب متجر إلكتروني", "ثيمات متجر", "تصميم متجر إلكتروني", "قالب متجر عربي"],
  },
  "/getting-started": {
    path: "/getting-started",
    title: "خطوات إنشاء متجر إلكتروني | متجركو",
    description:
      "تعرف على خطوات إنشاء متجرك: اختيار الاسم والرابط، إضافة المنتجات، تجهيز الدفع والشحن، ثم استقبال أول طلب.",
    keywords: ["خطوات إنشاء متجر إلكتروني", "ابدأ البيع أونلاين", "إنشاء متجر بدون كود"],
  },
  "/pricing": {
    path: "/pricing",
    title: "أسعار إنشاء متجر إلكتروني | باقات متجركو",
    description:
      "باقات شهرية بالجنيه المصري تبدأ من 50 جنيه، مع شهر مجاني لفترة محدودة وخيارات تناسب بداية المتجر ونموه.",
    keywords: ["أسعار متجر إلكتروني", "باقات متجر إلكتروني", "متجر إلكتروني بسعر شهري"],
  },
  "/about": {
    path: "/about",
    title: "عن متجركو | منصة إنشاء متجر إلكتروني عربية",
    description:
      "متجركو منصة عربية تساعد التجار في مصر على إنشاء متجر إلكتروني بسرعة وبتكلفة شهرية مناسبة بدون شركة برمجة.",
    keywords: ["عن متجركو", "منصة متجر إلكتروني عربية", "متجر إلكتروني للتجار"],
  },
  "/contact": {
    path: "/contact",
    title: "تواصل مع متجركو | واتساب ودعم إنشاء المتجر",
    description:
      "تواصل مع فريق متجركو عبر واتساب أو البريد الإلكتروني للاستفسار عن الباقات، الشهر المجاني، وخطوات إنشاء المتجر.",
    keywords: ["تواصل متجركو", "دعم متجر إلكتروني", "واتساب متجركو"],
  },
  "/register": {
    path: "/register",
    title: "إنشاء حساب متجر إلكتروني | متجركو",
    description:
      "ابدأ إنشاء متجرك الإلكتروني على متجركو باختيار اسم المتجر والرابط ثم إكمال بيانات الحساب.",
    keywords: ["تسجيل متجر إلكتروني", "إنشاء حساب متجر", "ابدأ متجر إلكتروني"],
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
};

export const orderedSeoPages = [
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
];

export function canonicalUrl(path: string) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function socialImageUrl() {
  return `${SITE_URL}/og-image.svg`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    email: CONTACT_EMAIL,
    sameAs: ["https://www.facebook.com/matgarko2/"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+20-108-031-2538",
        areaServed: "EG",
        availableLanguage: ["Arabic"],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "ar-EG",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function softwareSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    inLanguage: "ar-EG",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EGP",
      lowPrice: "50",
      highPrice: "1299",
      offerCount: "3",
      url: canonicalUrl("/pricing"),
    },
    featureList: [
      "إنشاء متجر إلكتروني",
      "إدارة المنتجات والطلبات",
      "قوالب متجر قابلة للتعديل",
      "تجهيز الدفع والشحن",
      "إدارة العملاء والعروض",
    ],
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
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
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: SITE_NAME,
      item: canonicalUrl("/"),
    },
  ];

  if (page.path !== "/") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: page.title.split("|")[0].trim(),
      item: canonicalUrl(page.path),
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}
