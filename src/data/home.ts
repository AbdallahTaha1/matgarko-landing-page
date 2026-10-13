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
  stores: {
    title: string;
    lead: string;
    opensNewTab: string;
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
    included: string;
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
  };
};

export const homeContent: Record<AppLanguage, HomeContent> = {
  ar: {
    hero: {
      kicker: "منصة إنشاء متجر إلكتروني في مصر",
      titleLine1: "اعمل متجرك",
      titleLine2: "وادِر شغلك كله من موبايلك",
      lead: "أضف منتجاتك، استقبل طلباتك، وتابع مبيعاتك في لوحة واحدة بالعربي، بدون خبرة تقنية أو فريق عمل.",
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
    stores: {
      title: "متاجر حقيقية شغالة على متجركو",
      lead: "افتح أي متجر وشوف بنفسك شكل المتجر اللي هتطلع بيه.",
      opensNewTab: "(يفتح في تبويب جديد)",
    },
    features: {
      kicker: "كل اللي محتاجه",
      title: "أدوات بسيطة تخلي متجرك يبيع",
      lead: "بتدير شغلك لوحدك؟ دي الأدوات اللي هتستخدمها كل يوم.",
      items: [
        { title: "المنتجات والمخزون", text: "ارفع الصور والأسعار ونظّم الأقسام في دقائق." },
        { title: "الطلبات", text: "كل طلب جديد بحالته وبيانات العميل في مكان واحد." },
        { title: "الدفع والشحن", text: "استقبل الطلبات بالدفع عند الاستلام، وحدد سعر التوصيل لكل منطقة." },
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
        { title: "استقبل أول طلب", text: "شارك رابط متجرك مع عملائك وابدأ متابعة الطلبات." },
      ],
      cta: "اعرف الخطوات بالتفصيل",
    },
    pricing: {
      kicker: "الأسعار",
      title: "ابدأ مجاناً، وادفع لما تبيع",
      lead: "نفس أدوات المتجر في كل الباقات. الفرق في الاشتراك والعمولة، وكل الأسعار بالجنيه المصري.",
      monthly: "شهرياً",
      commission: "عمولة على الطلب",
      noCommission: "بدون عمولة",
      popular: "عمولة أقل",
      included: "كل الباقات تشمل",
      compare: "قارن الباقات بالتفصيل",
      note: "العمولة على الطلبات المكتملة حسب باقتك.",
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
    },
  },
  en: {
    hero: {
      kicker: "Online store builder for Egypt",
      titleLine1: "Create an online store",
      titleLine2: "and run it from your phone",
      lead: "Add products, take orders, and track sales in one Arabic dashboard, with no technical experience or team.",
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
    stores: {
      title: "Real stores running on Matgarko",
      lead: "Open any of them to see the kind of store you will launch.",
      opensNewTab: "(opens in a new tab)",
    },
    features: {
      kicker: "Everything you need",
      title: "Simple tools that make your store sell",
      lead: "Running your business on your own? These are the tools you'll use every day.",
      items: [
        { title: "Products and stock", text: "Upload photos, set prices, and organize categories in minutes." },
        { title: "Orders", text: "Every new order with its status and customer details in one place." },
        { title: "Payment and shipping", text: "Accept cash-on-delivery orders and set delivery prices for each area." },
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
        { title: "Receive your first order", text: "Share your store link with customers and start managing orders." },
      ],
      cta: "See the full guide",
    },
    pricing: {
      kicker: "Pricing",
      title: "Start free, pay when you sell",
      lead: "The same store tools on every plan. Choose your monthly fee and commission, all in EGP.",
      monthly: "per month",
      commission: "commission per order",
      noCommission: "no commission",
      popular: "Lower commission",
      included: "Every plan includes",
      compare: "Compare plans in detail",
      note: "Commission applies to completed orders according to your plan.",
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
    },
  },
};
