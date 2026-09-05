import type { AppLanguage } from "@/lib/i18n";

export type HomeContent = {
  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    trust: string[];
    mock: {
      storeName: string;
      storeTag: string;
      banner: string;
      products: Array<{ name: string; price: string }>;
      checkout: string;
      order: { title: string; place: string; amount: string; method: string };
      sales: { label: string; value: string; delta: string };
    };
  };
  trustBar: {
    title: string;
    items: string[];
  };
  features: {
    kicker: string;
    title: string;
    lead: string;
    items: Array<{ title: string; text: string }>;
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
    commission: string;
    noCommission: string;
    popular: string;
    compare: string;
    note: string;
  };
  faq: {
    kicker: string;
    title: string;
    lead: string;
    more: string;
  };
  cta: {
    title: string;
    lead: string;
    primary: string;
    secondary: string;
    stats: Array<{ value: string; label: string }>;
  };
};

export const homeContent: Record<AppLanguage, HomeContent> = {
  ar: {
    hero: {
      kicker: "منصة إنشاء متجر إلكتروني في مصر",
      titleLine1: "أنشئ متجر إلكتروني",
      titleLine2: "وابدأ البيع في دقائق",
      lead: "متجرك جاهز بالجنيه المصري: منتجات وطلبات ودفع عند الاستلام وشحن لكل المحافظات، من لوحة واحدة وبدون برمجة.",
      primaryCta: "أنشئ متجرك مجاناً",
      secondaryCta: "شوف الأسعار",
      trust: ["بدون بطاقة ائتمان", "ابدأ بـ 0 ج.م", "2% فقط لما تبيع"],
      mock: {
        storeName: "متجر نور",
        storeTag: "عطور وعناية",
        banner: "خصم 15% على كل العطور",
        products: [
          { name: "عطر عود ملكي", price: "650 ج.م" },
          { name: "مسك أبيض", price: "320 ج.م" },
          { name: "زيت أرجان", price: "210 ج.م" },
          { name: "بخور فاخر", price: "180 ج.م" },
        ],
        checkout: "اطلب الآن · الدفع عند الاستلام",
        order: { title: "طلب جديد #1042", place: "المعادي، القاهرة", amount: "640 ج.م", method: "دفع عند الاستلام" },
        sales: { label: "مبيعات اليوم", value: "4,820 ج.م", delta: "+18%" },
      },
    },
    trustBar: {
      title: "طرق دفع يعرفها العميل المصري",
      items: ["الدفع عند الاستلام", "فوري", "ميزة", "فيزا وماستركارد", "المحافظ الإلكترونية"],
    },
    features: {
      kicker: "كل اللي محتاجه",
      title: "أدوات بسيطة تخلي متجرك يبيع",
      lead: "من إضافة المنتج لحد تسليم الطلب، كل حاجة في لوحة واحدة بالعربي.",
      items: [
        { title: "المنتجات والمخزون", text: "ارفع الصور والأسعار ونظّم الأقسام في دقائق." },
        { title: "الطلبات", text: "كل طلب جديد بحالته وبيانات العميل في مكان واحد." },
        { title: "الدفع والشحن", text: "دفع عند الاستلام ومحافظ إلكترونية، وسعر توصيل لكل محافظة." },
        { title: "العروض والكوبونات", text: "خصومات وعروض موسمية تخلي العميل يرجع تاني." },
      ],
    },
    steps: {
      kicker: "طريقة البدء",
      title: "ابدأ متجرك في 3 خطوات",
      lead: "بدون خبرة تقنية وبدون انتظار.",
      items: [
        { title: "سجّل واختار اسم متجرك", text: "حساب ورابط خاص بيك في دقيقة." },
        { title: "أضف منتجاتك", text: "صور وأسعار وأقسام من لوحة التحكم." },
        { title: "استقبل أول طلب", text: "فعّل الدفع والشحن وشارك الرابط مع عملائك." },
      ],
      cta: "اعرف الخطوات بالتفصيل",
    },
    pricing: {
      kicker: "الأسعار",
      title: "ابدأ مجاناً، وادفع لما تبيع",
      lead: "أسعار بالجنيه المصري، بدون رسوم مخفية.",
      monthly: "شهرياً",
      commission: "عمولة على الطلب",
      noCommission: "بدون عمولة",
      popular: "الأكثر اختياراً",
      compare: "قارن الباقات بالتفصيل",
      note: "رسوم بوابات الدفع منفصلة وتُحصّلها شركة الدفع مباشرة.",
    },
    faq: {
      kicker: "أسئلة شائعة",
      title: "أسئلة شائعة",
      lead: "إجابات سريعة قبل ما تبدأ.",
      more: "عندك سؤال تاني؟ كلمنا على واتساب",
    },
    cta: {
      title: "جاهز تبدأ البيع أونلاين؟",
      lead: "أنشئ متجرك النهارده وابدأ استقبال الطلبات من عملائك في مصر.",
      primary: "أنشئ متجرك مجاناً",
      secondary: "كلمنا على واتساب",
      stats: [
        { value: "0 ج.م", label: "للبدء" },
        { value: "2%", label: "فقط لما تبيع" },
        { value: "دقائق", label: "لإطلاق متجرك" },
      ],
    },
  },
  en: {
    hero: {
      kicker: "Online store builder for Egypt",
      titleLine1: "Create an online store",
      titleLine2: "and start selling in minutes",
      lead: "Products, orders, cash on delivery, and shipping to every governorate. Priced in EGP, no coding needed.",
      primaryCta: "Create your store free",
      secondaryCta: "See pricing",
      trust: ["No credit card", "Start at 0 EGP", "2% only when you sell"],
      mock: {
        storeName: "Nour Store",
        storeTag: "Perfume and care",
        banner: "15% off all perfumes",
        products: [
          { name: "Royal Oud", price: "650 EGP" },
          { name: "White Musk", price: "320 EGP" },
          { name: "Argan Oil", price: "210 EGP" },
          { name: "Premium Incense", price: "180 EGP" },
        ],
        checkout: "Order now · Cash on delivery",
        order: { title: "New order #1042", place: "Maadi, Cairo", amount: "640 EGP", method: "Cash on delivery" },
        sales: { label: "Today's sales", value: "4,820 EGP", delta: "+18%" },
      },
    },
    trustBar: {
      title: "Payment methods Egyptian shoppers trust",
      items: ["Cash on delivery", "Fawry", "Meeza", "Visa and Mastercard", "Mobile wallets"],
    },
    features: {
      kicker: "Everything you need",
      title: "Simple tools that make your store sell",
      lead: "From adding a product to delivering the order, everything lives in one dashboard.",
      items: [
        { title: "Products and stock", text: "Upload photos, set prices, and organize categories in minutes." },
        { title: "Orders", text: "Every new order with its status and customer details in one place." },
        { title: "Payment and shipping", text: "Cash on delivery, mobile wallets, and delivery pricing per governorate." },
        { title: "Offers and coupons", text: "Discounts and seasonal offers that bring customers back." },
      ],
    },
    steps: {
      kicker: "How it works",
      title: "Launch your store in 3 steps",
      lead: "No technical experience and no waiting.",
      items: [
        { title: "Sign up and pick a store name", text: "Your account and store link in a minute." },
        { title: "Add your products", text: "Photos, prices, and categories from the dashboard." },
        { title: "Receive your first order", text: "Enable payment and shipping, then share your link." },
      ],
      cta: "See the full guide",
    },
    pricing: {
      kicker: "Pricing",
      title: "Start free, pay when you sell",
      lead: "Prices in EGP with no hidden fees.",
      monthly: "per month",
      commission: "commission per order",
      noCommission: "no commission",
      popular: "Most popular",
      compare: "Compare plans in detail",
      note: "Payment gateway fees are separate and charged by the payment provider.",
    },
    faq: {
      kicker: "FAQ",
      title: "Frequently asked questions",
      lead: "Quick answers before you start.",
      more: "Have another question? Message us on WhatsApp",
    },
    cta: {
      title: "Ready to start selling online?",
      lead: "Create your store today and start receiving orders from customers in Egypt.",
      primary: "Create your store free",
      secondary: "Message us on WhatsApp",
      stats: [
        { value: "0 EGP", label: "to start" },
        { value: "2%", label: "only when you sell" },
        { value: "Minutes", label: "to launch your store" },
      ],
    },
  },
};
