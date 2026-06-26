import { Button } from "@/components/ui/button";
import { Check, Crown, Zap } from "lucide-react";

const SIGNUP_URL = "https://signup.matgarko.com/signup";

const plans = [
  {
    name: "بداية",
    originalPrice: "100 ج.م",
    price: "50 ج.م",
    period: "/ شهرياً",
    description: "مناسبة لمن يريد تجربة البيع أونلاين بأقل تكلفة وبدون مخاطرة كبيرة.",
    features: [
      "متجر إلكتروني جاهز",
      "حتى 500 منتج",
      "رابط خاص بمتجرك",
      "إدارة المنتجات والطلبات",
      "شهر مجاني لفترة محدودة",
      "عمولة بسيطة على المبيعات",
    ],
    cta: "ابدأ التجربة",
    href: SIGNUP_URL,
    variant: "outline",
    popular: false,
  },
  {
    name: "النمو",
    price: "799 ج.م",
    period: "/ شهرياً",
    description: "للتاجر الذي بدأ يستقبل طلبات ويريد أدوات أكثر لتنظيم البيع والتسويق.",
    features: [
      "منتجات غير محدودة",
      "إدارة العملاء والطلبات",
      "كوبونات وخصومات",
      "إمكانية ربط دومين خاص",
      "تقارير أساسية للمتجر",
      "عمولة أقل على المبيعات",
    ],
    cta: "اختر باقة النمو",
    href: SIGNUP_URL,
    variant: "default",
    popular: true,
  },
  {
    name: "احترافي",
    price: "1,299 ج.م",
    period: "/ شهرياً",
    description: "للمتاجر التي تحتاج مرونة أكبر، دعم أفضل، وتشغيل أكثر احترافية.",
    features: [
      "كل مزايا باقة النمو",
      "تقارير تشغيل أوضح",
      "أولوية في الدعم",
      "إعدادات أكثر مرونة",
      "مناسبة للمتاجر النشطة",
      "بدون عمولة من متجركو",
    ],
    cta: "ابدأ احترافي",
    href: SIGNUP_URL,
    variant: "outline",
    popular: false,
  },
];

export const PricingPage = () => {
  return (
    <div className="bg-white text-right" dir="rtl">
      <section className="page-hero">
        <div className="container px-4 mx-auto text-center">
          <div className="section-kicker mb-5">
            <Crown className="h-4 w-4" />
            باقات واضحة للنمو
          </div>
          <h1 className="page-title mb-5">
            باقات شهرية تناسب بداية متجرك ونموه
          </h1>
          <p className="page-lead">
            ابدأ بسعر بسيط، جرّب متجرك شهر مجاني، ثم اختر الباقة التي تناسب
            حجم منتجاتك وطلباتك مع نمو تجارتك.
          </p>
        </div>
      </section>

      <div className="container px-4 mx-auto py-16">

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg p-8 border transition-all duration-300 hover:-translate-y-1 ${plan.popular ? "border-emerald-400 shadow-2xl shadow-emerald-900/10 bg-white z-10" : "border-gray-200 bg-white shadow-sm hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-950 text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                  <Crown className="w-3 h-3 fill-current" /> الأنسب للنمو
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-black text-gray-950 mb-2 font-heading">
                  {plan.name}
                </h3>
                <p className="text-gray-500 text-sm min-h-16">{plan.description}</p>
              </div>

              <div className="mb-8 flex flex-wrap items-baseline gap-2">
                {"originalPrice" in plan && (
                  <span className="text-lg text-gray-400 line-through number-font">
                    {plan.originalPrice}
                  </span>
                )}
                <span className="text-4xl font-black text-emerald-700 number-font">
                  {plan.price}
                </span>
                <span className="text-gray-500 text-sm">{plan.period}</span>
              </div>

              <Button
                asChild
                className={`w-full mb-8 h-12 text-base font-extrabold ${plan.variant === "outline" ? "bg-transparent border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50" : "bg-gray-950 text-white hover:bg-emerald-700"}`}
              >
                <a href={plan.href}>{plan.cta}</a>
              </Button>

              <div className="space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-emerald-700" />
                    </div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gray-950 rounded-lg p-8 border border-gray-800 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-xl">
          <div className="text-right">
            <h4 className="text-xl font-black text-white mb-2 font-heading flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-300" /> ابدأ صغيرًا وطور متجرك لاحقًا
            </h4>
            <p className="text-gray-300">
              لا تحتاج دفع مبلغ كبير من البداية. ابدأ بتجربة بسيطة، أضف منتجاتك،
              واستقبل أول طلباتك، ثم انتقل للباقة المناسبة عندما يكبر متجرك.
            </p>
          </div>
          <Button asChild className="bg-emerald-500 text-gray-950 font-extrabold hover:bg-emerald-400">
            <a href={SIGNUP_URL}>ابدأ متجرك الآن &larr;</a>
          </Button>
        </div>
      </div>
    </div>
  );
};
