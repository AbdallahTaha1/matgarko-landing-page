import type { AppLanguage } from "@/lib/i18n";

export type PlanId = "free" | "pro";

type Localized = Record<AppLanguage, string>;
type LocalizedList = Record<AppLanguage, string[]>;

export type Plan = {
  id: PlanId;
  /** Monthly fee in EGP. */
  monthly: number;
  /** Fixed fee in EGP for each billable order, whatever its value. 0 means no per-order fee. */
  perOrderFee: number;
  /** The plan most new stores should start on; it gets the highlighted card. */
  popular: boolean;
  name: Localized;
  tagline: Localized;
  features: LocalizedList;
  cta: Localized;
};

export const SIGNUP_URL = "/register";

const storeFeatures: LocalizedList = {
  ar: ["إدارة المنتجات والمخزون والطلبات", "كوبونات وخصومات للعملاء", "تحديد مناطق وأسعار الشحن", "دعم عبر واتساب"],
  en: ["Product, stock and order management", "Customer coupons and discounts", "Delivery areas and shipping rates", "WhatsApp support"],
};

/** What every plan includes, for layouts that list it once instead of per plan. */
export const includedInEveryPlan: LocalizedList = {
  ar: ["متجر جاهز برابط على متجركو", ...storeFeatures.ar],
  en: ["Ready store on a Matgarko link", ...storeFeatures.en],
};

export const plans: Plan[] = [
  {
    id: "free",
    monthly: 0,
    perOrderFee: 3,
    popular: true,
    name: { ar: "البداية", en: "Starter" },
    tagline: { ar: "ابدأ بدون أي رسوم شهرية", en: "Start with no monthly fee" },
    features: {
      ar: ["متجر جاهز برابط على متجركو", ...storeFeatures.ar],
      en: ["Ready store on a Matgarko link", ...storeFeatures.en],
    },
    cta: { ar: "ابدأ مجاناً", en: "Start free" },
  },
  {
    id: "pro",
    monthly: 2000,
    perOrderFee: 0,
    popular: false,
    name: { ar: "احترافي", en: "Pro" },
    tagline: { ar: "للمتاجر الكبيرة بدون رسوم على الطلب", en: "For high-volume stores" },
    features: {
      ar: ["كل مزايا باقة البداية", ...storeFeatures.ar],
      en: ["Everything in Starter", ...storeFeatures.en],
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

/** Per-order fee label such as "3 ج.م على الطلب" or "3 EGP per order". */
export function perOrderFeeLabel(plan: Plan, language: AppLanguage) {
  return language === "ar" ? `${formatEgp(plan.perOrderFee, language)} على الطلب` : `${formatEgp(plan.perOrderFee, language)} per order`;
}

/** Short price label such as "2,000 ج.م" or "0 EGP + 3 EGP per order". */
export function planPriceLabel(plan: Plan, language: AppLanguage) {
  return plan.perOrderFee > 0 ? `${formatEgp(plan.monthly, language)} + ${perOrderFeeLabel(plan, language)}` : formatEgp(plan.monthly, language);
}

/** Monthly total for a number of billable orders (fake orders and hand-recorded orders are not billable). */
export function monthlyCost(plan: Plan, orders: number) {
  return plan.monthly + Math.max(0, orders) * plan.perOrderFee;
}

/** Monthly order count at which both plans cost the same; Infinity when `upgrade` never catches up. */
export function tieOrders(current: Plan, upgrade: Plan) {
  const feeGap = current.perOrderFee - upgrade.perOrderFee;
  if (feeGap <= 0) return Infinity;
  return Math.max(0, (upgrade.monthly - current.monthly) / feeGap);
}

/** First monthly order count at which `upgrade` is cheaper than `current`. */
export function breakevenOrders(current: Plan, upgrade: Plan) {
  const tie = tieOrders(current, upgrade);
  return Number.isFinite(tie) ? Math.floor(tie) + 1 : Infinity;
}

const free = getPlan("free");
const pro = getPlan("pro");

/** Pro is cheaper than Starter above this many orders a month (2,000 ÷ 3 ≈ 666.7, so from the 667th order). */
export const PRO_CHEAPER_ABOVE_ORDERS = Math.floor(tieOrders(free, pro));

export const FREE_TO_PRO_ORDERS = breakevenOrders(free, pro);

/** "666", for copy that quotes the break-even point. */
export const PRO_CHEAPER_ABOVE_LABEL = PRO_CHEAPER_ABOVE_ORDERS.toLocaleString("en-US");

export const costTableOrders = [50, 100, 250, 500, 1000, 2000];

export const costTable = costTableOrders.map((orders) => ({
  orders,
  costs: plans.map((plan) => ({ id: plan.id, cost: monthlyCost(plan, orders) })),
}));

/** Plain description of which orders are billed, shared by the pricing page, FAQs and AI context. */
export const billableOrdersRule: Record<AppLanguage, string> = {
  ar: "بنحسب كل طلب يتعمل في متجرك، ما عدا حاجتين ببلاش: الطلب الوهمي، يعني الطلب اللي درع الطلبات الوهمية علّم عليه وقت ما اتعمل (مكرر أو طلبات كتير من نفس الرقم) وبعدين اتلغى، والطلبات اللي بتسجلها بنفسك من واتساب أو التليفون من «طلب جديد».",
  en: "Every order placed in your store is billed, with two exceptions that stay free: fake orders, meaning orders the fake-order shield flagged when they were placed (a duplicate, or many orders from the same number) and that were then canceled, and orders you record yourself from WhatsApp or phone calls with «New order».",
};

export const pricingFaqs: Record<AppLanguage, Array<{ question: string; answer: string }>> = {
  ar: [
    {
      question: "إزاي بتتحسب رسوم الطلب؟",
      answer: `في البداية بتدفع ${perOrderFeeLabel(free, "ar")} ثابتة، مهما كانت قيمة الطلب أو عدد المنتجات فيه، ومفيش نسبة من مبيعاتك. ${billableOrdersRule.ar} أي طلب تاني بيتحسب، حتى لو اتلغى أو رجع بعد كده.`,
    },
    {
      question: "هل أدفع أثناء تجهيز المتجر أو قبل أول طلب؟",
      answer: "باقة البداية بدون اشتراك شهري وبدون مدة تجريبية تنتهي. جهّز متجرك وابدأ البيع؛ لو مفيش طلبات، مفيش رسوم. الاشتراك الشهري يخص باقة احترافي فقط.",
    },
    {
      question: "هل تختلف أدوات المتجر بين الباقات؟",
      answer: "نفس أدوات إدارة المنتجات والمخزون والطلبات والكوبونات وإعدادات الشحن متاحة في الباقتين، مع الدفع عند الاستلام والدعم عبر واتساب. الاختلاف في الاشتراك الشهري ورسوم الطلب.",
    },
    {
      question: "كيف أسدد رسوم متجركو؟",
      answer: "تظهر الرسوم في فاتورة داخل لوحة التحكم. تسدد باتباع تعليمات التحويل الموجودة في الفاتورة، ثم تبلغ عن السداد لمراجعته.",
    },
    {
      question: "متى أنتقل من البداية إلى احترافي؟",
      answer: `احترافي بـ ${formatEgp(pro.monthly, "ar")} شهرياً بدون رسوم على الطلب، فيبقى أوفر من البداية لو طلباتك أكتر من ${PRO_CHEAPER_ABOVE_LABEL} طلب في الشهر (${formatEgp(pro.monthly, "ar")} ÷ ${formatEgp(free.perOrderFee, "ar")}).`,
    },
    {
      question: "هل أقدر ألغي الاشتراك في أي وقت؟",
      answer: `تواصل معنا لتغيير الباقة. يمكنك العودة إلى البداية بدون اشتراك شهري، بـ ${perOrderFeeLabel(free, "ar")}. الفواتير التي صدرت بالفعل تظل بمبالغها المسجلة.`,
    },
    {
      question: "هل الأسعار تشمل ضريبة القيمة المضافة؟",
      answer: "الأسعار المعروضة بالجنيه المصري وهي الأسعار النهائية حالياً. أي تغيير سيتم الإعلان عنه مسبقاً.",
    },
  ],
  en: [
    {
      question: "How is the per-order fee charged?",
      answer: `Starter charges a flat ${perOrderFeeLabel(free, "en")}, whatever the order's value or item count, and never a percentage of your sales. ${billableOrdersRule.en} Any other order is billed, even if it is later canceled or returned.`,
    },
    {
      question: "Do I pay while setting up or before my first order?",
      answer: "Starter has no monthly subscription and no expiring trial. Prepare your store and start selling: no orders means no fees. The monthly subscription applies only to Pro.",
    },
    {
      question: "Do store tools differ between plans?",
      answer: "Both plans include the same product, stock, order, coupon and shipping tools, cash on delivery and WhatsApp support. Plans differ in their monthly subscription and per-order fee.",
    },
    {
      question: "How do I pay Matgarko fees?",
      answer: "Fees appear on an invoice in your dashboard. Follow its transfer instructions, then report your payment for review.",
    },
    {
      question: "When should I move from Starter to Pro?",
      answer: `Pro is ${formatEgp(pro.monthly, "en")} a month with no per-order fee, so it is cheaper than Starter above ${PRO_CHEAPER_ABOVE_LABEL} orders a month (${formatEgp(pro.monthly, "en")} ÷ ${formatEgp(free.perOrderFee, "en")}).`,
    },
    {
      question: "Can I cancel at any time?",
      answer: `Contact us to change plans. You can return to Starter with no monthly fee and ${perOrderFeeLabel(free, "en")}. Previously issued invoices keep their recorded amounts.`,
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
    return `البداية بدون اشتراك شهري: ${perOrderFeeLabel(free, "ar")}، والطلبات الوهمية ببلاش. الاحترافي ${formatEgp(pro.monthly, "ar")} شهرياً بدون رسوم على الطلب.`;
  }

  return `Starter has no monthly fee: a flat ${perOrderFeeLabel(free, "en")}, and fake orders are free. Pro is ${formatEgp(pro.monthly, "en")} per month with no per-order fee.`;
}
