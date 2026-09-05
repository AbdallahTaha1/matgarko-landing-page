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
  popular: boolean;
  name: Localized;
  tagline: Localized;
  features: LocalizedList;
  cta: Localized;
};

export const SIGNUP_URL = "https://signup.matgarko.com/signup";

/** Average order value (EGP) used for every cost example on the site. */
export const AVERAGE_ORDER_VALUE = 700;

export const plans: Plan[] = [
  {
    id: "free",
    monthly: 0,
    commission: 2,
    popular: false,
    name: { ar: "مجاني", en: "Free" },
    tagline: { ar: "ابدأ بدون أي رسوم شهرية", en: "Start with no monthly fee" },
    features: {
      ar: ["متجر جاهز برابط على متجركو", "حتى 50 منتج", "إدارة المنتجات والطلبات", "الدفع عند الاستلام", "دعم عبر واتساب"],
      en: ["Ready store on a Matgarko link", "Up to 50 products", "Product and order management", "Cash on delivery", "WhatsApp support"],
    },
    cta: { ar: "ابدأ مجاناً", en: "Start free" },
  },
  {
    id: "growth",
    monthly: 499,
    commission: 0.5,
    popular: true,
    name: { ar: "نمو", en: "Growth" },
    tagline: { ar: "للمتجر اللي بدأ يستقبل طلبات", en: "For stores receiving orders" },
    features: {
      ar: ["منتجات غير محدودة", "دومين خاص بمتجرك", "كوبونات وخصومات", "تقارير أساسية", "أولوية في الدعم"],
      en: ["Unlimited products", "Custom domain", "Coupons and discounts", "Basic reports", "Priority support"],
    },
    cta: { ar: "اختر باقة النمو", en: "Choose Growth" },
  },
  {
    id: "pro",
    monthly: 1499,
    commission: 0,
    popular: false,
    name: { ar: "احترافي", en: "Pro" },
    tagline: { ar: "للمتاجر الكبيرة بدون عمولة", en: "For high-volume stores" },
    features: {
      ar: ["كل مزايا باقة النمو", "بدون عمولة نهائياً", "تقارير متقدمة", "مستخدمون متعددون للفريق", "دعم مباشر بأولوية"],
      en: ["Everything in Growth", "Zero commission", "Advanced reports", "Multiple team users", "Direct priority support"],
    },
    cta: { ar: "ابدأ احترافي", en: "Go Pro" },
  },
];

export function getPlan(id: PlanId) {
  return plans.find((plan) => plan.id === id) as Plan;
}

export function formatEgp(value: number, language: AppLanguage) {
  const amount = Math.round(value).toLocaleString("en-US");
  return language === "ar" ? `${amount} ج.م` : `${amount} EGP`;
}

export function formatCommission(plan: Plan) {
  return `${plan.commission}%`;
}

/** Short price label such as "499 ج.م + 0.5%" or "0 EGP + 2%". */
export function planPriceLabel(plan: Plan, language: AppLanguage) {
  return `${formatEgp(plan.monthly, language)} + ${formatCommission(plan)}`;
}

/** Total monthly cost of a plan for a given number of orders. */
export function monthlyCost(plan: Plan, orders: number, averageOrderValue = AVERAGE_ORDER_VALUE) {
  return plan.monthly + (orders * averageOrderValue * plan.commission) / 100;
}

/** Number of monthly orders at which `upgrade` becomes cheaper than `current`. */
export function breakevenOrders(current: Plan, upgrade: Plan, averageOrderValue = AVERAGE_ORDER_VALUE) {
  const commissionGap = ((current.commission - upgrade.commission) / 100) * averageOrderValue;
  if (commissionGap <= 0) return Infinity;
  return Math.ceil((upgrade.monthly - current.monthly) / commissionGap);
}

export const FREE_TO_GROWTH_ORDERS = breakevenOrders(getPlan("free"), getPlan("growth"));
export const GROWTH_TO_PRO_ORDERS = breakevenOrders(getPlan("growth"), getPlan("pro"));

export const costTableOrders = [10, 25, 50, 100, 200, 300];

export const costTable = costTableOrders.map((orders) => ({
  orders,
  costs: plans.map((plan) => ({ id: plan.id, cost: Math.round(monthlyCost(plan, orders)) })),
}));

const free = getPlan("free");
const growth = getPlan("growth");
const pro = getPlan("pro");

export const pricingFaqs: Record<AppLanguage, Array<{ question: string; answer: string }>> = {
  ar: [
    {
      question: "كيف تُحسب العمولة في الباقة المجانية؟",
      answer: `تُخصم ${formatCommission(free)} فقط من قيمة كل طلب مكتمل. مثال: طلب بـ 500 ج.م يصلك منه 490 ج.م، ولا تدفع شيئاً على الطلبات الملغاة.`,
    },
    {
      question: "متى أنتقل من المجاني إلى باقة النمو؟",
      answer: `عند حوالي ${FREE_TO_GROWTH_ORDERS} طلب شهرياً بمتوسط ${AVERAGE_ORDER_VALUE} ج.م للطلب، تصبح باقة النمو (${planPriceLabel(growth, "ar")}) أوفر من عمولة ${formatCommission(free)}. الباقة الاحترافية تبدأ توفر لك بعد حوالي ${GROWTH_TO_PRO_ORDERS} طلب شهرياً.`,
    },
    {
      question: "هل هناك رسوم إضافية على بوابات الدفع؟",
      answer: "رسوم بوابات الدفع (فوري، ميزة، فيزا) تفرضها شركات الدفع مباشرة وهي منفصلة عن اشتراك متجركو، وتتراوح عادة بين 1% و3%. الدفع عند الاستلام بدون رسوم من جهتنا.",
    },
    {
      question: "هل أقدر ألغي الاشتراك في أي وقت؟",
      answer: `نعم، بدون أي التزام. متجرك يرجع للباقة المجانية بعمولة ${formatCommission(free)} وتكمل البيع بشكل طبيعي.`,
    },
    {
      question: "هل الأسعار تشمل ضريبة القيمة المضافة؟",
      answer: "الأسعار المعروضة بالجنيه المصري وهي الأسعار النهائية حالياً. أي تغيير سيتم الإعلان عنه مسبقاً.",
    },
  ],
  en: [
    {
      question: "How is the free plan commission calculated?",
      answer: `Only ${formatCommission(free)} of each completed order. Example: on a 500 EGP order you receive 490 EGP, and cancelled orders cost nothing.`,
    },
    {
      question: "When should I move from Free to Growth?",
      answer: `At around ${FREE_TO_GROWTH_ORDERS} orders per month with a ${AVERAGE_ORDER_VALUE} EGP average order, Growth (${planPriceLabel(growth, "en")}) becomes cheaper than the ${formatCommission(free)} commission. Pro (${formatEgp(pro.monthly, "en")}, 0%) starts saving money at roughly ${GROWTH_TO_PRO_ORDERS} orders per month.`,
    },
    {
      question: "Are payment gateway fees included?",
      answer: "No. Gateway fees (Fawry, Meeza, Visa) are charged by the payment provider, usually 1% to 3%, and are separate from Matgarko plans. Cash on delivery has no Matgarko fee.",
    },
    {
      question: "Can I cancel at any time?",
      answer: `Yes, with no commitment. Your store returns to the Free plan with ${formatCommission(free)} commission and keeps selling.`,
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
    return `ابدأ مجاناً بعمولة ${formatCommission(free)} فقط على الطلب، أو باقة النمو ${planPriceLabel(growth, "ar")}، أو الاحترافي ${formatEgp(pro.monthly, "ar")} بدون عمولة.`;
  }

  return `Free plan with ${formatCommission(free)} commission, Growth plan at ${planPriceLabel(growth, "en")} per month, Pro plan at ${formatEgp(pro.monthly, "en")} per month with 0% commission.`;
}
