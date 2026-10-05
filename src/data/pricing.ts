import type { AppLanguage } from "@/lib/i18n";

export type PlanId = "free" | "growth" | "pro";

type Localized = Record<AppLanguage, string>;
type LocalizedList = Record<AppLanguage, string[]>;

export type Plan = {
  id: PlanId;
  /** Monthly fee in EGP. */
  monthly: number;
  /** Commission percentage on each completed order. */
  commission: number;
  /** Maximum commission in EGP per completed order, not per month. */
  commissionCap: number;
  popular: boolean;
  name: Localized;
  tagline: Localized;
  features: LocalizedList;
  cta: Localized;
};

export const SIGNUP_URL = "/register";

/** Each order in the monthly comparison is assumed to have this value. */
export const AVERAGE_ORDER_VALUE = 700;

const storeFeatures: LocalizedList = {
  ar: ["إدارة المنتجات والمخزون والطلبات", "كوبونات وخصومات للعملاء", "تحديد مناطق وأسعار الشحن", "دعم عبر واتساب"],
  en: ["Product, stock and order management", "Customer coupons and discounts", "Delivery areas and shipping rates", "WhatsApp support"],
};

export const plans: Plan[] = [
  {
    id: "free",
    monthly: 0,
    commission: 2,
    commissionCap: 10,
    popular: false,
    name: { ar: "البداية", en: "Starter" },
    tagline: { ar: "ابدأ بدون أي رسوم شهرية", en: "Start with no monthly fee" },
    features: {
      ar: ["متجر جاهز برابط على متجركو", ...storeFeatures.ar],
      en: ["Ready store on a Matgarko link", ...storeFeatures.en],
    },
    cta: { ar: "ابدأ مجاناً", en: "Start free" },
  },
  {
    id: "growth",
    monthly: 499,
    commission: 0.5,
    commissionCap: 2.5,
    popular: true,
    name: { ar: "نمو", en: "Growth" },
    tagline: { ar: "اشتراك شهري وعمولة أقل لكل طلب", en: "Monthly subscription, lower order fees" },
    features: {
      ar: ["كل مزايا باقة البداية", ...storeFeatures.ar],
      en: ["Everything in Starter", ...storeFeatures.en],
    },
    cta: { ar: "اختر باقة النمو", en: "Choose Growth" },
  },
  {
    id: "pro",
    monthly: 1499,
    commission: 0,
    commissionCap: 0,
    popular: false,
    name: { ar: "احترافي", en: "Pro" },
    tagline: { ar: "للمتاجر الكبيرة بدون عمولة", en: "For high-volume stores" },
    features: {
      ar: ["كل مزايا باقة النمو", ...storeFeatures.ar],
      en: ["Everything in Growth", ...storeFeatures.en],
    },
    cta: { ar: "ابدأ احترافي", en: "Go Pro" },
  },
];

export function getPlan(id: PlanId) {
  return plans.find((plan) => plan.id === id) as Plan;
}

export function formatEgp(value: number, language: AppLanguage) {
  const amount = value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return language === "ar" ? `${amount} ج.م` : `${amount} EGP`;
}

export function formatCommission(plan: Plan) {
  return `${plan.commission}%`;
}

export function commissionCapLabel(plan: Plan, language: AppLanguage) {
  return language === "ar"
    ? `بحد أقصى ${formatEgp(plan.commissionCap, language)} للطلب الواحد`
    : `Capped at ${formatEgp(plan.commissionCap, language)} per order`;
}

/** Apply the cap to one order's merchandise value after discounts, excluding shipping and tax. */
export function orderCommission(plan: Plan, orderValue: number) {
  return Math.round((Math.min(Math.max(0, orderValue) * plan.commission / 100, plan.commissionCap) + Number.EPSILON) * 100) / 100;
}

/** Short price label such as "499 ج.م + 0.5%" or "0 EGP + 2%". */
export function planPriceLabel(plan: Plan, language: AppLanguage) {
  return `${formatEgp(plan.monthly, language)} + ${formatCommission(plan)}`;
}

/** Example total for orders of identical value; real invoices sum each order's capped fee. */
export function monthlyCost(plan: Plan, orders: number, averageOrderValue = AVERAGE_ORDER_VALUE) {
  return plan.monthly + orders * orderCommission(plan, averageOrderValue);
}

/** Number of monthly orders at which `upgrade` becomes cheaper than `current`. */
export function breakevenOrders(current: Plan, upgrade: Plan, averageOrderValue = AVERAGE_ORDER_VALUE) {
  const commissionGap = orderCommission(current, averageOrderValue) - orderCommission(upgrade, averageOrderValue);
  if (commissionGap <= 0) return Infinity;
  return Math.max(0, Math.floor((upgrade.monthly - current.monthly) / commissionGap) + 1);
}

export const FREE_TO_GROWTH_ORDERS = breakevenOrders(getPlan("free"), getPlan("growth"));
export const GROWTH_TO_PRO_ORDERS = breakevenOrders(getPlan("growth"), getPlan("pro"));

export const costTableOrders = [10, 25, 50, 100, 200, 300];

export const costTable = costTableOrders.map((orders) => ({
  orders,
  costs: plans.map((plan) => ({ id: plan.id, cost: monthlyCost(plan, orders) })),
}));

const free = getPlan("free");
const growth = getPlan("growth");
const pro = getPlan("pro");

export const pricingFaqs: Record<AppLanguage, Array<{ question: string; answer: string }>> = {
  ar: [
    {
      question: "كيف تُحسب العمولة وسقفها؟",
      answer: `في البداية: ${formatCommission(free)} ${commissionCapLabel(free, "ar")}. وفي نمو: ${formatCommission(growth)} ${commissionCapLabel(growth, "ar")}. تُحسب العمولة على إجمالي منتجات الطلب المكتمل بعد الخصم، قبل الشحن والضرائب. السقف للطلب كله، مهما كان عدد المنتجات، وليس سقفاً شهرياً. الطلبات الملغاة والمستردة قبل إصدار الفاتورة لا تُحتسب؛ تواصل معنا لمراجعة استرداد بعد إصدارها.`,
    },
    {
      question: "هل أدفع أثناء تجهيز المتجر أو قبل أول طلب؟",
      answer: "باقة البداية بدون اشتراك شهري وبدون مدة تجريبية تنتهي. جهّز متجرك وابدأ البيع؛ لو مفيش طلبات مكتملة، مفيش عمولة. الاشتراك الشهري يخص باقتي نمو واحترافي فقط.",
    },
    {
      question: "هل تختلف أدوات المتجر بين الباقات؟",
      answer: "نفس أدوات إدارة المنتجات والمخزون والطلبات والكوبونات وإعدادات الشحن متاحة في كل الباقات، مع الدفع عند الاستلام والدعم عبر واتساب. الاختلاف في الاشتراك الشهري ونسبة العمولة وسقفها.",
    },
    {
      question: "كيف أسدد رسوم متجركو؟",
      answer: "تظهر الرسوم في فاتورة داخل لوحة التحكم. تسدد باتباع تعليمات التحويل الموجودة في الفاتورة، ثم تبلغ عن السداد لمراجعته.",
    },
    {
      question: "متى أنتقل من البداية إلى باقة النمو؟",
      answer: `لو قيمة كل طلب ${AVERAGE_ORDER_VALUE} ج.م، تصبح نمو أوفر من البداية من ${FREE_TO_GROWTH_ORDERS} طلب مكتمل شهرياً، والاحترافي أوفر من نمو من ${GROWTH_TO_PRO_ORDERS} طلب. العدد يختلف حسب قيمة كل طلب لأن سقف العمولة يُطبق عليه منفرداً.`,
    },
    {
      question: "هل أقدر ألغي الاشتراك في أي وقت؟",
      answer: `تواصل معنا لتغيير الباقة. يمكنك العودة إلى البداية بدون اشتراك شهري، بعمولة ${formatCommission(free)} ${commissionCapLabel(free, "ar")}. الفواتير التي صدرت بالفعل تظل بمبالغها المسجلة.`,
    },
    {
      question: "هل الأسعار تشمل ضريبة القيمة المضافة؟",
      answer: "الأسعار المعروضة بالجنيه المصري وهي الأسعار النهائية حالياً. أي تغيير سيتم الإعلان عنه مسبقاً.",
    },
  ],
  en: [
    {
      question: "How is commission capped?",
      answer: `Starter charges ${formatCommission(free)}, capped at ${formatEgp(free.commissionCap, "en")} per completed order. Growth charges ${formatCommission(growth)}, capped at ${formatEgp(growth.commissionCap, "en")} per completed order. The base is the order's merchandise value after discounts, excluding shipping and tax. The cap applies once to the whole order, regardless of item count, not to the month. Orders cancelled or refunded before invoicing are excluded; contact us to review a refund after an invoice has been issued.`,
    },
    {
      question: "Do I pay while setting up or before my first order?",
      answer: "Starter has no monthly subscription and no expiring trial. Prepare your store and start selling: no completed orders means no commission. Monthly subscriptions apply only to Growth and Pro.",
    },
    {
      question: "Do store tools differ between plans?",
      answer: "Every plan includes the same product, stock, order, coupon and shipping tools, cash on delivery and WhatsApp support. Plans differ in their monthly subscription, commission rate and per-order cap.",
    },
    {
      question: "How do I pay Matgarko fees?",
      answer: "Fees appear on an invoice in your dashboard. Follow its transfer instructions, then report your payment for review.",
    },
    {
      question: "When should I move from Starter to Growth?",
      answer: `If each completed order is worth ${AVERAGE_ORDER_VALUE} EGP, Growth becomes cheaper than Starter at ${FREE_TO_GROWTH_ORDERS} monthly orders, and Pro becomes cheaper than Growth at ${GROWTH_TO_PRO_ORDERS}. These thresholds depend on individual order values because each order is capped separately.`,
    },
    {
      question: "Can I cancel at any time?",
      answer: `Contact us to change plans. You can return to Starter with no monthly fee and ${formatCommission(free)} commission, capped at ${formatEgp(free.commissionCap, "en")} per order. Previously issued invoices keep their recorded amounts.`,
    },
    {
      question: "Do prices include VAT?",
      answer: "Prices are shown in EGP and are the final prices today. Any change will be announced in advance.",
    },
  ],
};

/** One-line pricing summary reused in meta descriptions and AI context files. */
export function pricingSummary(language: AppLanguage) {
  if (language === "ar") {
    return `البداية بدون اشتراك شهري: ${formatCommission(free)} ${commissionCapLabel(free, "ar")}. نمو ${planPriceLabel(growth, "ar")} ${commissionCapLabel(growth, "ar")}، والاحترافي ${formatEgp(pro.monthly, "ar")} شهرياً بدون عمولة. العمولة على الطلبات المكتملة.`;
  }

  return `Starter has no monthly fee: ${formatCommission(free)} commission capped at ${formatEgp(free.commissionCap, "en")} per completed order. Growth is ${planPriceLabel(growth, "en")} per month, capped at ${formatEgp(growth.commissionCap, "en")} per completed order. Pro is ${formatEgp(pro.monthly, "en")} per month with 0% commission.`;
}
