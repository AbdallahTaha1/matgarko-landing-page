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

export const indexableSeoPages = Object.values(seoPages).filter((p) => !p.noindex);

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
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: "متجركو مصر — منصة إنشاء المتاجر الإلكترونية",
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
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+20-108-031-2538",
        email: CONTACT_EMAIL,
        areaServed: "EG",
        availableLanguage: ["Arabic"],
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

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "ar-EG",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
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
    "@id": `${SITE_URL}/#software`,
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    inLanguage: "ar-EG",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    offers: [
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
    ],
    featureList: [
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
