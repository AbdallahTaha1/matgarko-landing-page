import type { AppLanguage } from "@/lib/i18n";

/** The day the home page's facts were last checked against the product; shown on the page and in its structured data. */
export const HOME_UPDATED = "2026-11-17";

export type HomeContent = {
  hero: {
    kicker: string;
    titleLine1: string;
    /** Second line: plain words, then the words that get the orange swash. */
    titleLine2: string;
    titleMark: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    trust: string[];
    /** What the store can do, as a sliding row of chips under the buttons. */
    chips: string[];
    mock: {
      dashboard: string;
      greeting: string;
      waiting: string;
      stats: Array<{ label: string; value: string }>;
      ordersTitle: string;
      orders: Array<{ name: string; place: string; amount: string; action?: string; done?: string }>;
      toast: { title: string; text: string };
      caption: string;
      storeAlt: string;
    };
  };
  stores: {
    title: string;
    lead: string;
    opensNewTab: string;
  };
  /** «ما هي متجركو؟»: the page's plain definition, written to be quoted on its own. */
  whatIs: {
    kicker: string;
    title: string;
    text: string;
    audience: string;
    cards: Array<{ title: string; text: string }>;
    factsTitle: string;
    facts: Array<{ label: string; value: string }>;
    updated: string;
  };
  features: {
    kicker: string;
    title: string;
    lead: string;
    items: Array<{ title: string; text: string }>;
    more: string;
  };
  templates: {
    kicker: string;
    title: string;
    lead: string;
    items: Array<{ key: string; name: string; kind: string }>;
    alt: (name: string, kind: string) => string;
    aiTitle: string;
    aiText: string;
    aiBadge: string;
    note: string;
    more: string;
  };
  steps: {
    kicker: string;
    title: string;
    lead: string;
    items: Array<{ title: string; text: string }>;
    cta: string;
  };
  pricing: {
    kicker: string;
    title: string;
    lead: string;
    monthly: string;
    perOrder: string;
    noPerOrderFee: string;
    fakeFree: string;
    welcome: string;
    popular: string;
    included: string;
    compare: string;
    note: string;
  };
  /** The fake-order shield, shown as an order list with warning chips. */
  shield: {
    kicker: string;
    title: string;
    lead: string;
    points: string[];
    orders: Array<{ number: string; place: string; amount: string; flag?: string; tone?: "warn" | "danger" }>;
    listTitle: string;
    free: string;
  };
  /** Matgarko against EasyOrders, the rival merchants compare with. */
  versus: {
    kicker: string;
    title: string;
    lead: string;
    us: string;
    them: string;
    rows: Array<{ label: string; us: string; them: string }>;
    note: string;
    link: string;
  };
  faq: {
    kicker: string;
    title: string;
    lead: string;
    more: string;
    all: string;
  };
  cta: {
    title: string;
    lead: string;
    linkLabel: string;
    primary: string;
    secondary: string;
  };
  /** The bar that stays at the bottom of a phone's screen once the hero has scrolled away. */
  sticky: {
    text: string;
    cta: string;
  };
};

export const homeContent: Record<AppLanguage, HomeContent> = {
  ar: {
    hero: {
      kicker: "منصة إنشاء متجر إلكتروني في مصر",
      titleLine1: "افتح متجرك الإلكتروني",
      titleLine2: "مجاناً وأول",
      titleMark: "20 طلب علينا",
      lead: "افتح متجر باسمك في دقايق، استقبل الطلبات بالدفع عند الاستلام أو أونلاين، وتابع كل حاجة من لوحة تحكم بالعربي. من غير مبرمج.",
      primaryCta: "أنشئ متجرك مجاناً",
      secondaryCta: "شوف الأسعار",
      trust: ["بدون اشتراك شهري", "3 ج.م بس على الطلب", "الطلبات الوهمية ببلاش"],
      chips: [
        "الدفع عند الاستلام",
        "بطاقات عبر Paymob وKashier",
        "تحويل إنستاباي أو محفظة",
        "درع الطلبات الوهمية",
        "Meta Pixel وConversions API",
        "بكسل TikTok",
        "كتالوج Meta وTikTok وGoogle",
        "ستة قوالب جاهزة",
        "«صمّم متجري» بالذكاء الاصطناعي",
        "كوبونات وعروض كمية",
        "طلبات لم تكتمل",
        "صفحة إعلان لكل منتج",
        "أسعار شحن لكل محافظة",
        "دومين خاص",
        "استيراد من Excel",
        "تطبيق أندرويد",
      ],
      mock: {
        dashboard: "لوحة التحكم",
        greeting: "صباح الخير",
        waiting: "عندك 3 طلبات جديدة مستنية تأكيدك.",
        stats: [
          { label: "مبيعات اليوم", value: "4,820 ج.م" },
          { label: "طلبات اليوم", value: "12 طلب" },
        ],
        ordersTitle: "أحدث الطلبات",
        orders: [
          { name: "سيروم فيتامين سي", place: "المعادي", amount: "640 ج.م", action: "تأكيد الطلب" },
          { name: "طقم عناية بالبشرة", place: "طنطا", amount: "1,150 ج.م", action: "تسليم للمندوب" },
          { name: "عطر ورد", place: "الإسكندرية", amount: "480 ج.م", done: "اتسلّم" },
        ],
        toast: { title: "طلب جديد", text: "640 ج.م · الدفع عند الاستلام" },
        caption: "بيانات توضيحية لمتجر تجريبي.",
        storeAlt: "شكل متجر على متجركو من الموبايل بقالب «ناعم»",
      },
    },
    stores: {
      title: "متاجر حقيقية شغالة على متجركو",
      lead: "أكتر من 300 متجر اتفتح على متجركو. افتح أي واحد وشوف بنفسك شكل المتجر اللي هتطلع بيه.",
      opensNewTab: "(يفتح في تبويب جديد)",
    },
    whatIs: {
      kicker: "تعرّف على متجركو",
      title: "ما هي متجركو؟",
      text: "متجركو منصة مصرية لإنشاء المتاجر الإلكترونية بدون برمجة. بتفتح متجر باسمك في دقايق، وتضيف منتجاتك، وتستقبل الطلبات وتتابعها من لوحة تحكم بالعربي أو من تطبيق أندرويد.",
      audience: "لكل تاجر بيبيع على فيسبوك أو إنستجرام أو تيك توك أو واتساب، وعاوز متجر حقيقي من غير مبرمج ولا اشتراك شهري.",
      cards: [
        { title: "متجر باسمك", text: "بشعارك وألوانك على رابط من متجركو، أو على دومينك الخاص في كل الباقات." },
        { title: "فلوسك بتوصلك إنت", text: "الدفع عند الاستلام، وتحويل إنستاباي أو محفظة، والبطاقات عبر حسابك في Paymob أو Kashier. متجركو ما بياخدش نسبة من مبيعاتك." },
        { title: "الشحن بطريقتك", text: "متجركو ما بيوصّلش الطلبات. إنت بتشحن مع شركتك أو مندوبك، وبتحدد سعر التوصيل لكل محافظة ومنطقة." },
        { title: "بتدفع لما تبيع", text: "بدون اشتراك شهري: 3 ج.م ثابتة على الطلب، وأول 20 طلب علينا، والطلب الوهمي ببلاش." },
      ],
      factsTitle: "متجركو في سطور",
      facts: [
        { label: "النوع", value: "منصة إنشاء متاجر إلكترونية بدون برمجة" },
        { label: "السعر في مصر", value: "0 ج.م شهرياً + 3 ج.م على الطلب، أو 2,000 ج.م شهرياً بدون رسوم على الطلب" },
        { label: "طرق الدفع في المتجر", value: "الدفع عند الاستلام، تحويل إنستاباي أو محفظة، وبطاقات عبر Paymob أو Kashier" },
        { label: "الشحن", value: "مع شركة الشحن أو المندوب اللي التاجر يختاره، بسعر لكل محافظة ومنطقة" },
        { label: "إدارة المتجر", value: "لوحة تحكم من المتصفح وتطبيق أندرويد على Google Play" },
        { label: "اللغة والدعم", value: "عربي وإنجليزي، والدعم بالعربي على واتساب" },
      ],
      updated: "آخر تحديث: نوفمبر 2026",
    },
    features: {
      kicker: "كل اللي محتاجه",
      title: "أدوات بسيطة تخلي متجرك يبيع",
      lead: "بتدير شغلك لوحدك؟ دي الأدوات اللي هتستخدمها كل يوم.",
      items: [
        { title: "المنتجات والمخزون", text: "ارفع الصور والأسعار والمقاسات والألوان، وصورة لكل لون، أو استورد لحد 500 منتج من ملف Excel." },
        { title: "الطلبات", text: "كل طلب بحالته وزر خطوته الجاية، مع اتصال وواتساب بالعميل، فاتورة PDF، وتصدير الطلبات لملف Excel." },
        { title: "الدفع", text: "الدفع عند الاستلام، وتحويل إنستاباي أو محفظة بصورة التحويل، والبطاقات عبر حسابك في Paymob أو Kashier." },
        { title: "الشحن", text: "جمّع المحافظات في مناطق توصيل بسعر لكل منطقة، وشريط «باقي كذا على الشحن المجاني» في السلة." },
        { title: "العروض والكوبونات", text: "كوبونات خصم، عروض كمية زي «اشتري 2 ووفّر 10%»، وأسعار قبل وبعد الخصم بمواعيد." },
        { title: "إعلانات فيسبوك وتيك توك", text: "بكسل ميتا مع Conversions API، بكسل تيك توك، تحليلات جوجل، وكتالوج منتجات لـMeta وTikTok وGoogle." },
        { title: "صفحة إعلان و«اطلب الآن»", text: "لكل منتج صفحة إعلان فيها المنتج ونموذج الطلب بس، والمتجر خفيف بيفتح في متصفح فيسبوك وتيك توك حتى على الموبايلات القديمة." },
        { title: "طلبات لم تكتمل", text: "اللي كتب رقمه ومشي بيظهرلك، تكلمه على واتساب برسالة جاهزة وتحوّله لطلب." },
        { title: "الإحصائيات والأرباح", text: "مبيعاتك وأرباحك بعد التكلفة، مصدر كل طلب وكل زيارة، ونسبة التسليم الفعلية." },
      ],
      more: "كل الحلول بالتفصيل",
    },
    templates: {
      kicker: "تصميم المتجر",
      title: "ستة قوالب جاهزة، وغيّر الشكل وقت ما تحب",
      lead: "اختار قالب وشوف متجرك بيه قبل ما تستخدمه. منتجاتك وكلامك بيفضلوا زي ما هما.",
      items: [
        { key: "soft", name: "ناعم", kind: "عناية وتجميل" },
        { key: "elegant", name: "أنيق", kind: "ملابس" },
        { key: "bold", name: "قوي", kind: "إلكترونيات" },
        { key: "natural", name: "طبيعي", kind: "منتجات طبيعية" },
        { key: "market", name: "سوق", kind: "خضار وبقالة" },
        { key: "classic", name: "كلاسيك", kind: "بيت وديكور" },
      ],
      alt: (name, kind) => `قالب «${name}» لمتجر ${kind} على متجركو، من الموبايل`,
      aiTitle: "«صمّم متجري»",
      aiText: "اكتب إنت بتبيع إيه والشكل اللي تحبه، ويقترحلك شكل كامل لمتجرك تشوفه قبل ما تستخدمه.",
      aiBadge: "بالذكاء الاصطناعي",
      note: "الصور من متاجر تجريبية بكل قالب.",
      more: "اعرف أكتر عن تصميم المتجر",
    },
    steps: {
      kicker: "طريقة البدء",
      title: "ابدأ متجرك في 3 خطوات",
      lead: "بدون خبرة تقنية وبدون انتظار.",
      items: [
        { title: "سجّل واختار اسم متجرك", text: "حساب ورابط خاص بيك في دقيقة." },
        { title: "أضف منتجاتك", text: "صور وأسعار وأقسام من لوحة التحكم." },
        { title: "استقبل أول طلب", text: "شارك رابط متجرك مع عملائك وابدأ متابعة الطلبات." },
      ],
      cta: "اعرف الخطوات بالتفصيل",
    },
    pricing: {
      kicker: "الأسعار",
      title: "ابدأ مجاناً، وادفع لما تبيع",
      lead: "نفس أدوات المتجر في كل الباقات. الفرق في الاشتراك ورسوم الطلب، وكل الأسعار بالجنيه المصري.",
      monthly: "شهرياً",
      perOrder: "على الطلب",
      noPerOrderFee: "بدون رسوم على الطلب",
      fakeFree: "والطلبات الوهمية ببلاش",
      welcome: "أول 20 طلب علينا",
      popular: "الأنسب للبداية",
      included: "كل الباقات تشمل",
      compare: "قارن الباقات بالتفصيل",
      note: "سعر ثابت على الطلب مهما كانت قيمته، والطلبات الوهمية وطلبات واتساب اللي بتسجلها بنفسك ببلاش.",
    },
    shield: {
      kicker: "درع الطلبات الوهمية",
      title: "اعرف الطلب الوهمي قبل ما تشحنه",
      lead: "كل طلب بيتفحص لحظة ما يتعمل، وبيظهرلك تنبيه جنبه قبل ما تأكده. والطلب الوهمي اللي تلغيه مش بتدفع عليه حاجة.",
      points: [
        "«رقم مكرر»: نفس الرقم له طلب تاني مفتوح في آخر 24 ساعة.",
        "«طلبات كتير»: 3 طلبات من نفس الرقم في يوم، أو 6 من نفس الاتصال في ساعة.",
        "«رفض سابقًا»: صاحب الرقم رفض يستلم قبل كده.",
        "احظر أي رقم بضغطة، فمايقدرش يطلب من متجرك تاني.",
      ],
      orders: [
        { number: "#1048", place: "مدينة نصر", amount: "450 ج.م" },
        { number: "#1049", place: "مدينة نصر", amount: "450 ج.م", flag: "رقم مكرر", tone: "warn" },
        { number: "#1050", place: "الجيزة", amount: "780 ج.م", flag: "رفض سابقًا", tone: "danger" },
        { number: "#1051", place: "الإسكندرية", amount: "320 ج.م" },
      ],
      listTitle: "طلبات النهارده",
      free: "الطلب الوهمي اللي اتعلّم عليه واتلغى = 0 ج.م",
    },
    versus: {
      kicker: "قبل ما تختار",
      title: "قارن بنفسك مع إيزي أوردرز",
      lead: "نفس فكرة الدفع على الطلب، بس الطلبات الوهمية ببلاش، والباقة الكبيرة بحوالي تلت سعرهم.",
      us: "متجركو",
      them: "إيزي أوردرز",
      rows: [
        { label: "الطلب الوهمي الملغي", us: "ببلاش", them: "بيتحسب" },
        { label: "باقة بدون رسوم على الطلب", us: "2,000 ج.م شهرياً", them: "100 دولار (حوالي 5,600 ج.م)" },
        { label: "العملة", us: "جنيه مصري", them: "دولار" },
      ],
      note: "أسعار إيزي أوردرز من صفحة أسعارهم في 7 نوفمبر 2026، بسعر 56 ج.م للدولار.",
      link: "المقارنة كاملة",
    },
    faq: {
      kicker: "إجابات قبل ما تبدأ",
      title: "أسئلة شائعة",
      lead: "إجابات سريعة قبل ما تبدأ.",
      more: "عندك سؤال تاني؟ كلمنا على واتساب",
      all: "كل الأسئلة والإجابات",
    },
    cta: {
      title: "رابط متجرك مستنيك",
      lead: "احجزه دلوقتي، وجهّز متجرك وابدأ استقبال الطلبات من عملائك في مصر.",
      linkLabel: "رابط متجرك",
      primary: "أنشئ متجرك مجاناً",
      secondary: "كلمنا على واتساب",
    },
    sticky: {
      text: "بدون اشتراك · أول 20 طلب علينا",
      cta: "أنشئ متجرك",
    },
  },
  en: {
    hero: {
      kicker: "Online store builder for Egypt",
      titleLine1: "Create an online store free",
      titleLine2: "and your first",
      titleMark: "20 orders are on us",
      lead: "Open a store in your name in minutes, take cash-on-delivery or online orders, and follow everything from one dashboard. No developer needed.",
      primaryCta: "Create your store free",
      secondaryCta: "See pricing",
      trust: ["No monthly fee", "Just 3 EGP per order", "Fake orders are free"],
      chips: [
        "Cash on delivery",
        "Cards via Paymob and Kashier",
        "InstaPay or wallet transfer",
        "Fake-order shield",
        "Meta Pixel and Conversions API",
        "TikTok Pixel",
        "Meta, TikTok and Google catalog",
        "Six ready templates",
        "AI store designer",
        "Coupons and quantity offers",
        "Abandoned checkouts",
        "An ad page for every product",
        "Delivery prices by area",
        "Your own domain",
        "Excel import",
        "Android app",
      ],
      mock: {
        dashboard: "Dashboard",
        greeting: "Good morning",
        waiting: "3 new orders are waiting for you.",
        stats: [
          { label: "Today's sales", value: "4,820 EGP" },
          { label: "Today's orders", value: "12 orders" },
        ],
        ordersTitle: "Latest orders",
        orders: [
          { name: "Vitamin C serum", place: "Maadi", amount: "640 EGP", action: "Confirm order" },
          { name: "Skin care set", place: "Tanta", amount: "1,150 EGP", action: "Hand to courier" },
          { name: "Rose perfume", place: "Alexandria", amount: "480 EGP", done: "Delivered" },
        ],
        toast: { title: "New order", text: "640 EGP · Cash on delivery" },
        caption: "Sample data for a demo store.",
        storeAlt: "A Matgarko store on a phone, in the Soft template",
      },
    },
    stores: {
      title: "Real stores running on Matgarko",
      lead: "More than 300 stores have opened on Matgarko. Open any of them to see the kind of store you will launch.",
      opensNewTab: "(opens in a new tab)",
    },
    whatIs: {
      kicker: "Meet Matgarko",
      title: "What is Matgarko?",
      text: "Matgarko is an Egyptian no-code platform for creating online stores. You open a store in your name in minutes, add your products, and take and follow orders from an Arabic dashboard or the Android app.",
      audience: "For any merchant who sells on Facebook, Instagram, TikTok or WhatsApp and wants a real store with no developer and no monthly fee.",
      cards: [
        { title: "A store in your name", text: "With your logo and colours on a Matgarko link, or on your own domain on every plan." },
        { title: "Your money comes to you", text: "Cash on delivery, InstaPay or wallet transfer, and cards through your own Paymob or Kashier account. Matgarko takes no share of your sales." },
        { title: "Ship your way", text: "Matgarko does not deliver orders. You ship with your courier and set the delivery price for each governorate and area." },
        { title: "Pay when you sell", text: "No monthly fee: a flat 3 EGP per order, your first 20 orders on us, and fake orders free." },
      ],
      factsTitle: "Matgarko at a glance",
      facts: [
        { label: "Type", value: "No-code online store builder" },
        { label: "Price in Egypt", value: "0 EGP a month + 3 EGP per order, or 2,000 EGP a month with no per-order fee" },
        { label: "Store payment methods", value: "Cash on delivery, InstaPay or wallet transfer, and cards via Paymob or Kashier" },
        { label: "Shipping", value: "With the courier the merchant chooses, priced per governorate and area" },
        { label: "Store management", value: "Web dashboard and an Android app on Google Play" },
        { label: "Language and support", value: "Arabic and English, with Arabic support on WhatsApp" },
      ],
      updated: "Last updated: November 2026",
    },
    features: {
      kicker: "Everything you need",
      title: "Simple tools that make your store sell",
      lead: "Running your business on your own? These are the tools you'll use every day.",
      items: [
        { title: "Products and stock", text: "Upload photos, prices, sizes and colours, with a photo per colour, or import up to 500 products from an Excel file." },
        { title: "Orders", text: "Every order with its status and next-step button, call and WhatsApp buttons, a PDF invoice, and Excel export." },
        { title: "Payment", text: "Cash on delivery, InstaPay or wallet transfer with a screenshot, and cards through your own Paymob or Kashier account." },
        { title: "Shipping", text: "Group governorates into delivery zones with a price each, and show a free-shipping progress bar in the cart." },
        { title: "Offers and coupons", text: "Discount codes, quantity offers such as buy 2 and save 10%, and scheduled sale prices." },
        { title: "Facebook and TikTok ads", text: "Meta Pixel with the Conversions API, TikTok Pixel, Google Analytics, and a product catalog for Meta, TikTok and Google." },
        { title: "Ad pages and Order now", text: "Every product has an ad page with just the product and the order form, and the light store opens inside Facebook and TikTok browsers, even on older phones." },
        { title: "Abandoned checkouts", text: "See who typed a number and left, message them on WhatsApp with a ready text, and turn them into an order." },
        { title: "Statistics and profit", text: "Sales and profit after cost, the source of every order and visit, and your real delivery rate." },
      ],
      more: "All solutions in detail",
    },
    templates: {
      kicker: "Store design",
      title: "Six ready templates, and change the look whenever you like",
      lead: "Pick a template and preview your store in it before you use it. Your products and words stay as they are.",
      items: [
        { key: "soft", name: "Soft", kind: "Beauty and care" },
        { key: "elegant", name: "Elegant", kind: "Clothing" },
        { key: "bold", name: "Bold", kind: "Electronics" },
        { key: "natural", name: "Natural", kind: "Natural products" },
        { key: "market", name: "Market", kind: "Groceries" },
        { key: "classic", name: "Classic", kind: "Home and decor" },
      ],
      alt: (name, kind) => `The ${name} template for a ${kind.toLowerCase()} store on Matgarko, on a phone`,
      aiTitle: "Design my store",
      aiText: "Write what you sell and the look you like, and it suggests a complete look for your store that you preview before using.",
      aiBadge: "AI",
      note: "Pictures from demo stores, one per template.",
      more: "More about store design",
    },
    steps: {
      kicker: "How it works",
      title: "Launch your store in 3 steps",
      lead: "No technical experience and no waiting.",
      items: [
        { title: "Sign up and pick a store name", text: "Your account and store link in a minute." },
        { title: "Add your products", text: "Photos, prices, and categories from the dashboard." },
        { title: "Receive your first order", text: "Share your store link with customers and start managing orders." },
      ],
      cta: "See the full guide",
    },
    pricing: {
      kicker: "Pricing",
      title: "Start free, pay when you sell",
      lead: "The same store tools on every plan. Choose your monthly fee and per-order fee, all in EGP.",
      monthly: "per month",
      perOrder: "per order",
      noPerOrderFee: "no per-order fee",
      fakeFree: "and fake orders are free",
      welcome: "First 20 orders on us",
      popular: "Best way to start",
      included: "Every plan includes",
      compare: "Compare plans in detail",
      note: "A flat fee per order whatever its value; fake orders and WhatsApp orders you record yourself are free.",
    },
    shield: {
      kicker: "Fake-order shield",
      title: "Spot a fake order before you ship it",
      lead: "Every order is checked the moment it is placed, and a warning shows next to it before you confirm. A fake order you cancel costs you nothing.",
      points: [
        "“Repeated number”: the same number has another open order from the last 24 hours.",
        "“Many orders”: 3 orders from one number in a day, or 6 from one connection in an hour.",
        "“Refused before”: this number refused a delivery before.",
        "Block any number in one tap so it can no longer order from your store.",
      ],
      orders: [
        { number: "#1048", place: "Nasr City", amount: "450 EGP" },
        { number: "#1049", place: "Nasr City", amount: "450 EGP", flag: "Repeated number", tone: "warn" },
        { number: "#1050", place: "Giza", amount: "780 EGP", flag: "Refused before", tone: "danger" },
        { number: "#1051", place: "Alexandria", amount: "320 EGP" },
      ],
      listTitle: "Today's orders",
      free: "A flagged order you cancel = 0 EGP",
    },
    versus: {
      kicker: "Before you choose",
      title: "Compare with EasyOrders yourself",
      lead: "The same pay-per-order idea, but fake orders are free and the big plan costs about a third of theirs.",
      us: "Matgarko",
      them: "EasyOrders",
      rows: [
        { label: "Canceled fake order", us: "Free", them: "Billed" },
        { label: "Plan with no per-order fee", us: "2,000 EGP a month", them: "$100 (about 5,600 EGP)" },
        { label: "Currency", us: "Egyptian pound", them: "US dollar" },
      ],
      note: "EasyOrders prices from their pricing page on 7 November 2026, at 56 EGP to the dollar.",
      link: "Full comparison",
    },
    faq: {
      kicker: "Answers before you start",
      title: "Frequently asked questions",
      lead: "Quick answers before you start.",
      more: "Have another question? Message us on WhatsApp",
      all: "Compare platforms",
    },
    cta: {
      title: "Your store link is waiting",
      lead: "Reserve it now, set up your store, and start receiving orders from customers in Egypt.",
      linkLabel: "Your store link",
      primary: "Create your store free",
      secondary: "Message us on WhatsApp",
    },
    sticky: {
      text: "No monthly fee · first 20 orders on us",
      cta: "Create your store",
    },
  },
};
