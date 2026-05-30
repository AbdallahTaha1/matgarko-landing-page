import { Button } from "@/components/ui/button";
import { Check, ClipboardList, CreditCard, PackagePlus, Store, Truck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const SIGNUP_URL = "https://signup.matgarko.com/signup";

const steps = [
  {
    icon: <Store className="h-6 w-6" />,
    title: "اختر اسم المتجر",
    desc: "اكتب اسم متجرك واختر الرابط المناسب لعلامتك التجارية.",
  },
  {
    icon: <PackagePlus className="h-6 w-6" />,
    title: "أضف المنتجات",
    desc: "ارفع الصور، الأسعار، الوصف، والأقسام التي يحتاجها العميل.",
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "جهز الدفع",
    desc: "حدد طرق الدفع المناسبة لطبيعة نشاطك وطريقة تحصيل الطلبات.",
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: "رتب الشحن",
    desc: "أضف مناطق الشحن أو طريقة التوصيل التي تناسب عملاءك.",
  },
];

export const DevelopersPage = () => {
  return (
    <div className="bg-white" dir="rtl">
      <section className="relative overflow-hidden bg-gray-900 py-24 text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/20 px-3 py-1 text-sm font-medium text-primary-foreground">
                <ClipboardList className="h-4 w-4" />
                <span>خطوات البدء</span>
              </div>
              <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight font-heading md:text-6xl">
                من إنشاء المتجر إلى أول طلب بخطوات واضحة
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-300">
                هذه الصفحة توضح رحلة التاجر داخل متجركو: تبدأ بالتسجيل، تضيف
                منتجاتك، تضبط الدفع والشحن، ثم تبدأ استقبال الطلبات من لوحة سهلة.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                  <a href={SIGNUP_URL}>ابدأ متجرك الآن</a>
                </Button>
                <Button asChild size="lg" className="border border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                  <Link to="/pricing">راجع الباقات</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">ملخص الرحلة</span>
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-3">
                {["تسجيل سريع", "إضافة المنتجات", "تجهيز الدفع والشحن", "استقبال أول طلب"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-gray-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 font-heading md:text-5xl">
              ماذا تفعل داخل متجرك؟
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              الخطوات مصممة لتكون بسيطة وواضحة، حتى لو كانت أول مرة تنشئ متجرًا
              إلكترونيًا.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <article key={step.title} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 font-heading">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-gray-600">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl rounded-3xl border border-primary/10 bg-primary/5 p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-gray-900 font-heading">
                  جاهز تبدأ؟
                </h2>
                <p className="leading-relaxed text-gray-600">
                  بعد إنشاء الحساب، ستجد لوحة تساعدك على إكمال بيانات المتجر
                  وإضافة المنتجات وتجهيز البيع خطوة بخطوة.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {["لا تحتاج خبرة تقنية", "كل شيء من لوحة واحدة", "تقدر تبدأ بسعر بسيط", "تطور متجرك لاحقًا"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-white p-4">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
