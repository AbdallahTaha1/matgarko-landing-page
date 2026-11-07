import { CompetitorPage } from "@/components/CompetitorPage";
import { ABROAD_PER_ORDER_USD, ABROAD_PRO_MONTHLY_USD, countryBySlug, localMoney, usd } from "@/data/countries";

const saudi = countryBySlug("ar-sa")!;

/**
 * Matgarko against Salla for a merchant in Saudi Arabia. Salla's prices are from its help centre
 * (browser subscription, article updated August 2026), reviewed 7 November 2026.
 */
export function SaudiVsSallaPage() {
  const perOrder = `${usd(ABROAD_PER_ORDER_USD)} (حوالي ${localMoney(saudi, ABROAD_PER_ORDER_USD)})`;
  const pro = `${usd(ABROAD_PRO_MONTHLY_USD)} شهرياً (حوالي ${localMoney(saudi, ABROAD_PRO_MONTHLY_USD)})`;
  return (
    <CompetitorPage
      competitorName="Salla"
      competitorNameAr="سلة"
      badge="متجركو أم سلة في السعودية"
      h1="متجركو أم سلة؟ مقارنة للتاجر في السعودية"
      lead="سلة أكبر منصة متاجر في السعودية، بمتجر تطبيقات ضخم ودفع إلكتروني مدمج. متجركو أبسط وأرخص لمن يبيع بالإعلانات والدفع عند الاستلام، ولا تأخذ على الطلب الوهمي شيئاً."
      competitorSummary="سلة منصة سعودية تعرض باقة بيسك مجانية، وباقة بلس بـ99 ريالاً شهرياً، وباقة برو بـ299 ريالاً شهرياً عند الاشتراك من المتصفح (الأسعار أعلى من تطبيق الجوال)، ولا تأخذ عمولة على المبيعات، وتطبق بوابات الدفع رسومها الخاصة. بحسب مركز مساعدة سلة، روجع في 7 نوفمبر 2026."
      matgarkoAdvantages={[
        `بدون اشتراك شهري: ${perOrder} على الطلب`,
        "الطلب الوهمي الذي يكشفه الدرع ثم تلغيه لا يُحتسب",
        `باقة احترافي ${pro}، أقل من نصف سعر برو في سلة`,
        "درع الطلبات الوهمية و«رفض الاستلام» ونسبة التسليم الحقيقية",
        "بكسل ميتا وConversions API وGoogle Analytics مدمجة",
        "دعم بالعربي على واتساب",
      ]}
      comparisonRows={[
        { feature: "بدون اشتراك شهري", matgarko: `${perOrder} على الطلب`, competitor: "باقة بيسك مجانية", highlight: true },
        { feature: "الباقة المدفوعة", matgarko: pro, competitor: "بلس 99 ريال · برو 299 ريال شهرياً", highlight: true },
        { feature: "عمولة على المبيعات", matgarko: "لا، رسوم ثابتة على الطلب في البداية", competitor: "لا", highlight: false },
        { feature: "درع الطلبات الوهمية", matgarko: true, competitor: "راجع تطبيقات سلة" , highlight: true },
        { feature: "الدفع عند الاستلام", matgarko: true, competitor: true },
        { feature: "دفع إلكتروني مدمج (مدى، Apple Pay)", matgarko: false, competitor: true },
        { feature: "ربط شركات الشحن", matgarko: "أسعار توصيل لكل منطقة، بدون ربط مباشر", competitor: "ربط مع شركات شحن" },
        { feature: "متجر تطبيقات", matgarko: false, competitor: "متجر تطبيقات كبير" },
        { feature: "بكسل ميتا وConversions API", matgarko: true, competitor: true },
        { feature: "دومين خاص", matgarko: true, competitor: true },
        { feature: "دعم بالعربي", matgarko: "واتساب", competitor: true },
      ]}
      faqs={[
        {
          q: "أيهما أرخص للتاجر في السعودية، متجركو أم سلة؟",
          a: `يعتمد على عدد طلباتك. باقة بيسك في سلة مجانية، وبداية متجركو ${perOrder} على الطلب بدون اشتراك. للمتاجر الأكبر: احترافي متجركو ${pro} مقابل 99 ريالاً لبلس و299 ريالاً لبرو في سلة. ومتجركو لا تحتسب الطلب الوهمي الذي يكشفه الدرع ثم تلغيه.`,
        },
        {
          q: "متى تكون سلة أنسب؟",
          a: "إذا كنت تحتاج دفعاً إلكترونياً مدمجاً مثل مدى وApple Pay، أو ربطاً مباشراً مع شركات الشحن، أو تطبيقات كثيرة من متجر التطبيقات، فسلة أنسب لك اليوم.",
        },
        {
          q: "متى يكون متجركو أنسب؟",
          a: "إذا كنت تبيع بالإعلانات والدفع عند الاستلام وتعاني من الطلبات الوهمية، وتريد متجراً جاهزاً بسرعة وتكلفة قليلة تبدأ من الطلب الأول، وتتابع كل شيء من تطبيق على الهاتف.",
        },
        {
          q: "هل أقدر أنقل منتجاتي من سلة إلى متجركو؟",
          a: "نعم، بملف Excel: رتّب منتجاتك على قالب الاستيراد (الاسم والسعر والقسم والكمية والوصف) وارفع حتى 500 منتج في الملف من لوحة التحكم على الويب، ثم أضف الصور والمقاسات والألوان.",
        },
      ]}
      homePath="/ar-sa"
      comparePath="/compare"
      pricingPath="/ar-sa/pricing"
      signupUrl="/ar-sa/register"
    />
  );
}
