import { ABROAD_PER_ORDER_USD, ABROAD_PRO_MONTHLY_USD, type Country, localMoney } from "@/data/countries";

/** Orders a month from which Pro costs less than Starter outside Egypt. */
export const ABROAD_PRO_BREAKEVEN = Math.round(ABROAD_PRO_MONTHLY_USD / ABROAD_PER_ORDER_USD);

export function perOrderText(country: Country) {
  return `${ABROAD_PER_ORDER_USD} دولار (حوالي ${localMoney(country, ABROAD_PER_ORDER_USD)})`;
}

export function proText(country: Country) {
  return `${ABROAD_PRO_MONTHLY_USD} دولاراً شهرياً (حوالي ${localMoney(country, ABROAD_PRO_MONTHLY_USD)})`;
}

export type CountryFaq = { question: string; answer: string };

/** What the store tools do, as built today (no claim beyond what ships). */
export function countryFeatures(country: Country) {
  return [
    {
      title: "الدفع عند الاستلام",
      text: `عميلك يطلب من المتجر ويدفع عند التوصيل، والأسعار تظهر ب${country.currencyName} لأن المتجر مسجّل ${country.inName}.`,
    },
    {
      title: "درع الطلبات الوهمية",
      text: "كل طلب يُفحص لحظة إنشائه: رقم مكرر له طلب مفتوح، أو طلبات كثيرة من نفس الرقم أو الاتصال، أو رقم رفض صاحبه الاستلام من قبل. والأرقام التي تحظرها لا تستطيع الطلب.",
    },
    {
      title: "مناطق وأسعار التوصيل",
      text: `حدد سعر التوصيل لكل منطقة، مثل ${country.cities.slice(0, 3).join(" و")}، ومن يوصّل إليها.`,
    },
    {
      title: "بكسل ميتا وتتبع الإعلانات",
      text: "اربط بكسل ميتا مع واجهة التحويلات (Conversions API) وتحليلات جوجل من لوحة التحكم، واعرف أي إعلان جلب الطلب.",
    },
    {
      title: "الطلبات التي لم تكتمل",
      text: "اطّلع على العملاء الذين بدأوا الطلب ولم يكملوه، وراسلهم على واتساب بضغطة، وحوّل المحادثة إلى طلب.",
    },
    {
      title: "تطبيق أندرويد للتاجر",
      text: "تابع الطلبات وغيّر حالتها وأضف المنتجات من هاتفك، واطّلع على أرقام متجرك أينما كنت.",
    },
  ];
}

export function countryFaqs(country: Country): CountryFaq[] {
  return [
    {
      question: `هل متجركو متاحة ${country.inName}؟`,
      answer: `نعم. اختر «${country.name}» في «بلد المتجر» عند التسجيل، فيعرض متجرك الأسعار ب${country.currencyName} ويقرأ أرقام موبايل عملائك ${country.inName}.`,
    },
    {
      question: `كم تكلفة متجركو ${country.inName}؟`,
      answer: `باقة البداية بدون اشتراك شهري، و${perOrderText(country)} على كل طلب. باقة احترافي ${proText(country)} بدون رسوم على الطلب، وتكون أوفر من ${ABROAD_PRO_BREAKEVEN} طلب شهرياً. الفاتورة شهرية بالدولار.`,
    },
    {
      question: "هل تُحتسب الطلبات الوهمية؟",
      answer: "لا. الطلب الذي يعلّم عليه درع الطلبات الوهمية لحظة إنشائه (رقم مكرر أو طلبات كثيرة من نفس الرقم) ثم تلغيه لا يُحتسب. والطلبات التي تسجلها بنفسك من واتساب أو الهاتف لا تُحتسب أيضاً. أما الطلب العادي فيُحتسب حتى لو أُلغي أو رُفض استلامه.",
    },
    {
      question: "هل أحتاج شركة أو سجل تجاري لأبدأ؟",
      answer: "متجركو لا تطلب سجلاً تجارياً لفتح المتجر. راجع ما تطلبه أنظمة بلدك من التجار الذين يبيعون أونلاين.",
    },
    {
      question: "هل أقدر أستخدم دومين خاص بي؟",
      answer: "نعم. أضف دومينك من لوحة التحكم واضبط إعدادات الـDNS كما تظهر لك، ثم يتفعّل. وحتى ذلك يعمل متجرك على رابط من متجركو.",
    },
    {
      question: "هل الدعم بالعربي؟",
      answer: "نعم، الدعم بالعربي على واتساب، ولوحة التحكم والتطبيق بالعربي بالكامل.",
    },
  ];
}
