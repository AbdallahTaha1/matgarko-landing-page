import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, BadgePercent, TrendingUp, ShieldCheck } from "lucide-react";
import { useState } from "react";

const SIGNUP_URL = "https://signup.matgarko.com/signup";

const plans = [
  {
    id: "free",
    icon: <BadgePercent className="h-6 w-6" />,
    name: "مجاني",
    subtitle: "ابدأ بدون مخاطرة",
    monthlyFee: "0 ج.م",
    commission: "3%",
    commissionLabel: "عمولة على كل طلب",
    description: "ابدأ تجارتك بدون أي رسوم شهرية — ادفع فقط عند البيع.",
    features: [
      "متجر إلكتروني جاهز فوراً",
      "حتى 50 منتج",
      "رابط متجر على متجركو",
      "إدارة المنتجات والطلبات",
      "دفع عند الاستلام مدمج",
      "دعم عبر واتساب",
    ],
    notIncluded: ["دومين خاص", "كوبونات وعروض", "تقارير تفصيلية"],
    cta: "ابدأ مجاناً الآن",
    href: SIGNUP_URL,
    popular: false,
    color: "border-gray-200",
    badgeColor: "",
  },
  {
    id: "growth",
    icon: <TrendingUp className="h-6 w-6" />,
    name: "نمو",
    subtitle: "للمتجر النشط",
    monthlyFee: "399 ج.م",
    commission: "1%",
    commissionLabel: "عمولة على كل طلب",
    description: "للتاجر الذي بدأ يستقبل طلبات ويريد أدوات أكثر بتكلفة أقل.",
    features: [
      "منتجات غير محدودة",
      "دومين خاص بمتجرك",
      "إدارة العملاء والطلبات",
      "كوبونات وخصومات",
      "تقارير أساسية للمتجر",
      "أولوية في الدعم",
    ],
    notIncluded: ["تقارير متقدمة", "مستخدمي فريق"],
    cta: "اختر باقة النمو",
    href: SIGNUP_URL,
    popular: true,
    color: "border-emerald-400",
    badgeColor: "bg-emerald-600",
  },
  {
    id: "pro",
    icon: <ShieldCheck className="h-6 w-6" />,
    name: "احترافي",
    subtitle: "للمتاجر الكبيرة",
    monthlyFee: "999 ج.م",
    commission: "0%",
    commissionLabel: "بدون أي عمولة",
    description: "للمتاجر النشطة التي تريد أقصى مرونة وصفر عمولات.",
    features: [
      "كل مزايا باقة النمو",
      "بدون عمولة على المبيعات",
      "تقارير تشغيل متقدمة",
      "مستخدمو فريق متعددون",
      "إعدادات أكثر مرونة",
      "دعم أولوية مباشر",
    ],
    notIncluded: [],
    cta: "ابدأ احترافي",
    href: SIGNUP_URL,
    popular: false,
    color: "border-gray-800",
    badgeColor: "",
  },
];

const pricingFaqs = [
  {
    q: "كيف تُحسب العمولة على الباقة المجانية؟",
    a: "العمولة 3% تُخصم تلقائياً من قيمة كل طلب مكتمل. مثلاً: لو الطلب بـ 500 ج.م، تحصل على 485 ج.م صافي.",
  },
  {
    q: "متى يستحق الترقية من المجاني للنمو؟",
    a: "لما تتجاوز 33 طلب شهرياً بمتوسط قيمة 700 ج.م، ستوفر مع باقة النمو. حساب بسيط: عمولة 3% على 33 × 700 = 693 ج.م، بينما النمو تكلفه 399 + 1% = 629 ج.م.",
  },
  {
    q: "هل يوجد رسوم إضافية على بوابات الدفع؟",
    a: "رسوم بوابات الدفع (فوري، فيزا، ميزة) تفرضها شركات الدفع مباشرة وهي منفصلة عن اشتراك متجركو. تتراوح عادة بين 1-3% حسب البوابة.",
  },
  {
    q: "ماذا يحدث لو أردت إلغاء الاشتراك؟",
    a: "يمكنك إلغاء الاشتراك في أي وقت دون التزامات. متجرك يبقى على الباقة المجانية (مع 3% عمولة) ويمكنك مواصلة البيع.",
  },
  {
    q: "هل الدومين الخاص مشمول في السعر؟",
    a: "ربط الدومين الخاص مشمول في باقتي النمو والاحترافي، لكن تكلفة الدومين نفسه (حوالي 200-500 ج.م سنوياً) تدفعها لدى مزود الدومين مباشرة.",
  },
  {
    q: "هل الأسعار تشمل ضريبة القيمة المضافة؟",
    a: "الأسعار المعروضة هي الأسعار النهائية دون ضريبة قيمة مضافة إضافية حالياً. سيتم الإفصاح عن أي تغيير مسبقاً.",
  },
];

export const PricingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white text-right" dir="rtl">
      {/* Hero */}
      <section className="page-hero">
        <div className="container px-4 mx-auto text-center">
          <div className="section-kicker mb-5">
            <Crown className="h-4 w-4" />
            باقات واضحة للنمو
          </div>
          <h1 className="page-title mb-5">
            ابدأ مجاناً — ادفع فقط لما تبيع
          </h1>
          <p className="page-lead">
            لا رسوم شهرية في البداية. ابدأ بعمولة 3% على كل طلب، وعندما
            ينمو متجرك انتقل للباقة التي توفّر لك أكثر.
          </p>
        </div>
      </section>

      <div className="container px-4 mx-auto py-16">

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 border-2 transition-all duration-300 hover:-translate-y-1 bg-white ${
                plan.popular
                  ? "border-emerald-400 shadow-2xl shadow-emerald-900/10 z-10"
                  : "border-gray-200 shadow-sm hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                  <Crown className="w-3 h-3 fill-current" /> الأنسب للنمو
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  {plan.icon}
                </div>
                <h3 className="text-xl font-black text-gray-950 font-heading">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.subtitle}</p>
              </div>

              {/* Pricing Display */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black text-gray-950 number-font">{plan.monthlyFee}</span>
                  {plan.monthlyFee !== "0 ج.م" && (
                    <span className="text-gray-500 text-sm">/ شهرياً</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xl font-black number-font ${plan.commission === "0%" ? "text-emerald-700" : "text-gray-800"}`}>
                    {plan.commission}
                  </span>
                  <span className="text-sm text-gray-500">{plan.commissionLabel}</span>
                </div>
              </div>

              <p className="text-gray-500 text-sm mb-6 min-h-12">{plan.description}</p>

              <Button
                asChild
                className={`w-full mb-6 h-12 text-base font-extrabold ${
                  plan.popular
                    ? "bg-gray-950 text-white hover:bg-emerald-700"
                    : plan.id === "free"
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-transparent border-2 border-gray-800 text-gray-800 hover:bg-gray-50"
                }`}
              >
                <a href={plan.href}>{plan.cta}</a>
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-emerald-700" />
                    </div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 opacity-40">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <span className="text-gray-400 text-xs font-bold">—</span>
                    </div>
                    <span className="text-gray-400 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade Calculator */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gray-950 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-xl font-black text-white font-heading">متى تستفيد من الترقية؟</h2>
            </div>
            <p className="text-gray-400 mb-8">
              الجدول التالي يوضح متى تكون كل باقة أوفر بناءً على عدد طلباتك الشهرية (بمتوسط قيمة طلب 700 ج.م)
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="مقارنة تكلفة الباقات حسب عدد الطلبات">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-right py-3 text-gray-400 font-medium">الطلبات / شهر</th>
                    <th className="text-center py-3 text-gray-400 font-medium">مجاني (3%)</th>
                    <th className="text-center py-3 text-emerald-400 font-medium">نمو (399 + 1%)</th>
                    <th className="text-center py-3 text-gray-400 font-medium">احترافي (999 + 0%)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { orders: 10, free: 210, growth: 469, pro: 999 },
                    { orders: 20, free: 420, growth: 539, pro: 999 },
                    { orders: 33, free: 693, growth: 630, pro: 999 },
                    { orders: 50, free: 1050, growth: 749, pro: 999 },
                    { orders: 100, free: 2100, growth: 1099, pro: 999 },
                    { orders: 150, free: 3150, growth: 1449, pro: 999 },
                  ].map((row) => {
                    const best = Math.min(row.free, row.growth, row.pro);
                    return (
                      <tr key={row.orders} className="border-b border-gray-800/50">
                        <td className="py-3 text-white font-bold number-font">{row.orders} طلب</td>
                        <td className={`text-center py-3 number-font ${row.free === best ? "text-emerald-400 font-bold" : "text-gray-400"}`}>
                          {row.free} ج.م
                        </td>
                        <td className={`text-center py-3 number-font ${row.growth === best ? "text-emerald-400 font-bold" : "text-gray-400"}`}>
                          {row.growth} ج.م
                        </td>
                        <td className={`text-center py-3 number-font ${row.pro === best ? "text-emerald-400 font-bold" : "text-gray-400"}`}>
                          {row.pro} ج.م
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs mt-4">* الأرقام المميزة باللون الأخضر هي الأوفر لكل مستوى طلبات. الحساب على أساس متوسط طلب 700 ج.م.</p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-10 text-center bg-emerald-50 rounded-2xl p-8 border border-emerald-100 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-right">
            <h3 className="text-xl font-black text-gray-950 mb-2 font-heading flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-600" /> ابدأ الآن — صفر مخاطرة
            </h3>
            <p className="text-gray-600">
              لا بطاقة ائتمان مطلوبة. سجّل وابدأ ببيع منتجاتك بعمولة 3% فقط على كل طلب.
            </p>
          </div>
          <Button asChild className="bg-emerald-600 text-white font-extrabold hover:bg-emerald-700 h-12 px-8 shrink-0">
            <a href={SIGNUP_URL}>ابدأ مجاناً الآن ←</a>
          </Button>
        </div>

        {/* Pricing FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-gray-950 mb-8 font-heading text-center">أسئلة حول الأسعار</h2>
          <div className="space-y-3">
            {pricingFaqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-right"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-bold text-gray-900 text-sm">{faq.q}</span>
                  <span className="text-emerald-600 mr-4 shrink-0 text-lg" aria-hidden="true">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {/* Always in DOM for crawlability */}
                <div
                  style={{
                    maxHeight: openFaq === i ? "300px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
