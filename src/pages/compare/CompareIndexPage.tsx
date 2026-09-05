import { Link } from "react-router-dom";
import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SIGNUP_URL = "https://signup.matgarko.com/signup";

const comparisons = [
  {
    href: "/compare/easyorders",
    name: "إيزي أوردرز",
    nameEn: "EasyOrders",
    flag: "🇪🇬",
    badge: "المنافس المحلي",
    badgeColor: "bg-blue-100 text-blue-700",
    headline: "باقة النمو بـ 499 ج.م بدلاً من 50 دولاراً",
    points: ["أسعار بالجنيه المصري", "لا تأثر بسعر الصرف", "نفس بوابات الدفع المصرية"],
  },
  {
    href: "/compare/salla",
    name: "سلة",
    nameEn: "Salla",
    flag: "🇸🇦",
    badge: "منصة خليجية",
    badgeColor: "bg-green-100 text-green-700",
    headline: "مصممة لمصر — ليس للسعودية",
    points: ["بوابات الدفع المصرية جاهزة", "شركات الشحن المصرية مدمجة", "أسعار بالجنيه لا الريال"],
  },
  {
    href: "/compare/shopify",
    name: "شوبيفاي",
    nameEn: "Shopify",
    flag: "🌍",
    badge: "منصة عالمية",
    badgeColor: "bg-purple-100 text-purple-700",
    headline: "ادفع 499 ج.م بدلاً من $29+ شهرياً",
    points: ["بدون رسوم دولار", "فودافون كاش وفوري مدمج", "بدون رسوم معاملات إضافية"],
  },
  {
    href: "/compare/woocommerce",
    name: "ووكومرس",
    nameEn: "WooCommerce",
    flag: "⚙️",
    badge: "مفتوح المصدر",
    badgeColor: "bg-orange-100 text-orange-700",
    headline: "ابدأ في 5 دقائق — بدون سيرفر أو مطور",
    points: ["لا استضافة مطلوبة", "لا صيانة تقنية", "بوابات الدفع جاهزة مباشرة"],
  },
];

export function CompareIndexPage() {
  return (
    <div className="bg-white text-right" dir="rtl">
      {/* Hero */}
      <section className="page-hero">
        <div className="container px-4 mx-auto text-center">
          <div className="section-kicker mb-5">
            <Zap className="w-4 h-4" />
            مقارنة المنصات
          </div>
          <h1 className="page-title mb-5">
            متجركو مقابل منصات إنشاء المتاجر الأخرى في مصر
          </h1>
          <p className="page-lead">
            هل تفكر في إيزي أوردرز، سلة، شوبيفاي، أو ووكومرس؟ قارن بين الأسعار والمزايا واتخذ
            قرارك المبني على معلومات حقيقية.
          </p>
        </div>
      </section>

      {/* Comparison Cards */}
      <section className="py-16 container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {comparisons.map((comp) => (
            <Link
              key={comp.href}
              to={comp.href}
              className="premium-card p-7 group block hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{comp.flag}</span>
                    <h2 className="text-xl font-black text-gray-950 font-heading group-hover:text-emerald-700 transition-colors">
                      متجركو vs {comp.name}
                    </h2>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${comp.badgeColor}`}>
                    {comp.badge}
                  </span>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:text-emerald-600 transition-colors shrink-0 mt-1" />
              </div>

              <p className="text-emerald-700 font-bold mb-4 text-sm">{comp.headline}</p>

              <ul className="space-y-2">
                {comp.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-emerald-700 font-bold group-hover:underline">
                  اقرأ المقارنة الكاملة ←
                </span>
                <span className="text-xs text-gray-400">{comp.nameEn}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Matgarko Summary */}
      <section className="py-16 bg-gray-950 text-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-black mb-4 font-heading">لماذا التجار المصريون يختارون متجركو؟</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            في السوق المصري، التفاصيل مهمة — العملة، طرق الدفع المحلية، شركات الشحن، والدعم الذي يفهمك.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {[
              { stat: "0 ج.م", label: "للبدء — لا رسوم شهرية", sub: "فقط 2% على كل طلب" },
              { stat: "499 ج.م", label: "باقة النمو الشهرية", sub: "بدلاً من 50 دولاراً في المنافسين" },
              { stat: "5 دقائق", label: "لإطلاق متجرك الأول", sub: "بدون برمجة أو سيرفر" },
            ].map((item) => (
              <div key={item.stat} className="bg-gray-900 rounded-xl p-6">
                <div className="text-3xl font-black text-emerald-400 number-font mb-1">{item.stat}</div>
                <div className="text-white font-bold text-sm mb-1">{item.label}</div>
                <div className="text-gray-500 text-xs">{item.sub}</div>
              </div>
            ))}
          </div>
          <Button asChild className="bg-emerald-500 text-gray-950 font-extrabold hover:bg-emerald-400 h-12 px-10">
            <a href={SIGNUP_URL}>ابدأ مجاناً الآن ←</a>
          </Button>
        </div>
      </section>

      {/* SEO Text Block */}
      <section className="py-16 container px-4 mx-auto max-w-3xl">
        <h2 className="text-xl font-black text-gray-950 mb-6 font-heading">أفضل منصة لإنشاء متجر إلكتروني في مصر 2026</h2>
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p>
            يبحث كثير من التجار المصريين عن مقارنة بين منصات التجارة الإلكترونية المتاحة في السوق المصري.
            أبرز المنافسين هم <strong>إيزي أوردرز (EasyOrders)</strong> المنصة المصرية المتخصصة في صفحات الهبوط وإدارة الطلبات،
            و<strong>سلة (Salla)</strong> المنصة العربية الرائدة في السوق الخليجي،
            و<strong>شوبيفاي (Shopify)</strong> العملاق العالمي بأسعاره الدولارية،
            و<strong>ووكومرس (WooCommerce)</strong> الحل المفتوح المصدر الذي يحتاج خبرة تقنية.
          </p>
          <p>
            <strong>متجركو</strong> تقدم الحل الأمثل للتاجر المصري الذي يريد البدء بدون مخاطرة: ابدأ مجاناً بعمولة 2% فقط على كل طلب،
            وانتقل لباقة النمو (499 ج.م + 0.5%) عندما تنمو مبيعاتك أو الباقة الاحترافية (1,499 ج.م بدون أي عمولة).
            جميع الأسعار بالجنيه المصري — بدون تقلبات الدولار.
          </p>
        </div>
        <Link
          to="/blog/best-ecommerce-platform-egypt"
          className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-emerald-700 hover:text-emerald-800"
        >
          <ArrowLeft className="w-4 h-4" />
          اقرأ المقارنة التفصيلية لأفضل منصات التجارة الإلكترونية في مصر
        </Link>
      </section>
    </div>
  );
}
