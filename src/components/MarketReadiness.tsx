import { Button } from "@/components/ui/button";
import {
  BadgePercent,
  BarChart3,
  CheckCircle2,
  CreditCard,
  LayoutTemplate,
  Megaphone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

const SIGNUP_URL = "https://signup.matgarko.com/signup";

const readinessCards = [
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "دفع يناسب عميلك",
    text: "جهز الدفع عند الاستلام، المحافظ، التحويل، أو طرق الدفع التي تناسب تعاقدك وباقتك.",
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: "شحن واضح من البداية",
    text: "حدد مناطق الشحن وتكلفة التوصيل وحالات الطلب حتى يعرف العميل ماذا يحدث بعد الشراء.",
  },
  {
    icon: <LayoutTemplate className="h-6 w-6" />,
    title: "قوالب وصفحات جاهزة",
    text: "ابدأ بقالب مناسب لنشاطك وعدل الأقسام والصفحات المهمة بدل البدء من صفحة فارغة.",
  },
  {
    icon: <Megaphone className="h-6 w-6" />,
    title: "عروض تساعدك تبيع",
    text: "استخدم كوبونات وخصومات وعروض موسمية لتحويل المتابعين إلى طلبات فعلية.",
  },
];

const conversionPoints = [
  "متجر عربي متجاوب للموبايل",
  "رابط خاص تشاركه مع العملاء",
  "صفحات ثقة وسياسات واضحة",
  "لوحة واحدة للمنتجات والطلبات",
  "إعدادات دفع وشحن قابلة للتطوير",
  "باقات شهرية تبدأ بتكلفة بسيطة",
];

export function MarketReadiness() {
  return (
    <section className="bg-white py-24" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-28">
            <div className="section-kicker mb-6">
              <ShieldCheck className="h-4 w-4" />
              جاهز للتسويق والبيع
            </div>
            <h2 className="mb-6 max-w-2xl text-3xl font-black leading-tight text-gray-950 font-heading md:text-5xl">
              متجر واضح، سريع، ومجهز لتحويل الزائر إلى طلب
            </h2>
            <p className="mb-8 text-lg font-medium leading-8 text-gray-600">
              متجركو يركز على العناصر التي يبحث عنها التاجر والعميل: شكل واضح،
              صفحات ثقة، طرق دفع وشحن، وعروض تجعل تجربة الشراء أسهل من الرسائل
              والتعليقات العشوائية.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {conversionPoints.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm font-bold text-gray-800">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-gray-950 text-white hover:bg-emerald-700">
                <a href={SIGNUP_URL}>ابدأ متجرك الآن</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/themes">شاهد القوالب</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {readinessCards.map((card) => (
              <article
                key={card.title}
                className="group rounded-lg border border-gray-200 bg-gray-50 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:bg-white hover:shadow-2xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-white text-primary shadow-sm transition-transform group-hover:-rotate-3 group-hover:scale-110">
                  {card.icon}
                </div>
                <h3 className="mb-3 text-xl font-black text-gray-950 font-heading">{card.title}</h3>
                <p className="font-medium leading-8 text-gray-600">{card.text}</p>
              </article>
            ))}

            <article className="rounded-lg border border-gray-900 bg-gray-950 p-7 text-white shadow-2xl shadow-gray-950/20 sm:col-span-2">
              <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-center">
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-emerald-300">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-2xl font-black font-heading">صفحة واضحة لمحركات البحث والعملاء</h3>
                  <p className="font-medium leading-8 text-gray-300">
                    المحتوى المنظم حول السعر، طريقة البدء، الدفع، الشحن،
                    القوالب، والأسئلة الشائعة يساعد Google والعملاء يفهموا
                    ماذا تقدم بسرعة.
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-5 ring-1 ring-white/10">
                  {[
                    ["نية البحث", "إنشاء متجر إلكتروني"],
                    ["مرحلة القرار", "أسعار وخطوات واضحة"],
                    ["عامل الثقة", "دفع وشحن وسياسات"],
                    ["عامل التحويل", "CTA متكرر بدون إزعاج"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
                      <span className="text-sm text-gray-400">{label}</span>
                      <span className="text-sm font-extrabold text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="rounded-lg border border-emerald-200 bg-[#effdf6] p-7 sm:col-span-2">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-bold text-primary">
                    <BadgePercent className="h-4 w-4" />
                    ميزة تنافسية مهمة
                  </div>
                  <h3 className="mb-2 text-2xl font-black text-gray-950 font-heading">
                    ابدأ بسعر بسيط ثم طور المتجر مع نمو الطلبات
                  </h3>
                  <p className="font-medium leading-8 text-gray-600">
                    هذا يعالج أكبر اعتراض عند التجار الجدد: تكلفة إنشاء متجر
                    إلكتروني كامل قبل اختبار السوق.
                  </p>
                </div>
                <Button asChild className="shrink-0 bg-gray-950 text-white hover:bg-emerald-700">
                  <Link to="/pricing">راجع الأسعار</Link>
                </Button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
