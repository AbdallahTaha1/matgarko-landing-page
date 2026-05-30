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
    <div className="bg-white py-24" dir="rtl">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            باقات شهرية تناسب بداية متجرك ونموه
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            ابدأ بسعر بسيط، جرّب متجرك شهر مجاني، ثم اختر الباقة التي تناسب
            حجم منتجاتك وطلباتك مع نمو تجارتك.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 border ${plan.popular ? "border-primary shadow-2xl bg-white scale-105 z-10" : "border-gray-100 bg-gray-50"}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Crown className="w-3 h-3 fill-current" /> الأنسب للنمو
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-heading">
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
                <span className="text-4xl font-bold text-primary number-font">
                  {plan.price}
                </span>
                <span className="text-gray-500 text-sm">{plan.period}</span>
              </div>

              <Button
                asChild
                className={`w-full mb-8 h-12 text-lg ${plan.variant === "outline" ? "bg-transparent border-2 border-primary text-primary hover:bg-primary/5" : ""}`}
              >
                <a href={plan.href}>{plan.cta}</a>
              </Button>

              <div className="space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-gray-50 rounded-2xl p-8 border border-gray-100 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-right">
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-heading flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" /> ابدأ صغيرًا وطور متجرك لاحقًا
            </h4>
            <p className="text-gray-600">
              لا تحتاج دفع مبلغ كبير من البداية. ابدأ بتجربة بسيطة، أضف منتجاتك،
              واستقبل أول طلباتك، ثم انتقل للباقة المناسبة عندما يكبر متجرك.
            </p>
          </div>
          <Button asChild variant="link" className="text-primary text-lg">
            <a href={SIGNUP_URL}>ابدأ متجرك الآن &larr;</a>
          </Button>
        </div>
      </div>
    </div>
  );
};
