import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Clock3,
  CreditCard,
  Globe2,
  LayoutTemplate,
  Package,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  Users,
} from "lucide-react";

const SIGNUP_URL = "https://signup.matgarko.com/signup";

const capabilities = [
  "متجر إلكتروني",
  "قوالب جاهزة",
  "لوحة تحكم سهلة",
  "طلبات وفواتير",
  "دفع وشحن",
  "عروض وخصومات",
  "صفحات ثقة",
];

const launchSteps = [
  "اختيار اسم المتجر",
  "إضافة المنتجات",
  "تجهيز الدفع والشحن",
  "استقبال أول طلب",
];

export function Hero() {
  return (
    <section className="hero-band noise-grid relative overflow-hidden pb-20 pt-32" dir="rtl">
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div className="text-right">
            <div className="section-kicker mb-7">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
              </span>
              منصة إنشاء متجر إلكتروني في مصر
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.08] text-gray-950 font-heading md:text-7xl">
              أنشئ متجر إلكتروني
              <span className="mt-2 block text-conversion-gradient">
                جاهز للبيع في دقائق
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-xl font-medium leading-9 text-gray-700">
              متجركو يحول فكرتك إلى متجر عربي واضح: قوالب جاهزة، صفحة منتج،
              طلبات، عملاء، دفع وشحن، وتجربة شراء منظمة من أول زيارة.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="relative h-16 overflow-hidden bg-gray-950 px-9 text-lg font-extrabold text-white shadow-2xl shadow-emerald-900/20 transition-all hover:-translate-y-1 hover:bg-emerald-700"
              >
                <a href={SIGNUP_URL}>
                  <span className="absolute inset-y-0 right-0 w-24 bg-white/20 blur-xl animate-shine-sweep" />
                  <span className="relative">أنشئ متجرك الآن</span>
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-16 border-2 border-gray-200 bg-white px-9 text-lg font-extrabold text-gray-900 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50"
              >
                <Link to="/getting-started" className="gap-2">
                  اعرف طريقة البدء
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {capabilities.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {[
                { icon: <Clock3 className="h-5 w-5" />, title: "إطلاق سريع", text: "ابدأ بدون انتظار طويل" },
                { icon: <ShieldCheck className="h-5 w-5" />, title: "ثقة العميل", text: "صفحات وسياسات واضحة" },
                { icon: <Globe2 className="h-5 w-5" />, title: "رابط خاص", text: "شارك متجرك بسهولة" },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
                    {item.icon}
                  </div>
                  <h2 className="text-sm font-extrabold text-gray-950">{item.title}</h2>
                  <p className="mt-1 text-xs font-medium text-gray-500">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[620px]">
            <div className="absolute -right-4 top-8 z-20 hidden rounded-lg border border-emerald-100 bg-white px-4 py-3 shadow-xl animate-float-panel sm:flex sm:items-center sm:gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-gray-950">تم إنشاء المتجر</p>
                <p className="text-xs font-medium text-gray-500">جاهز لإضافة المنتجات</p>
              </div>
            </div>

            <div className="absolute -left-3 bottom-16 z-20 hidden rounded-lg border border-gray-200 bg-gray-950 px-4 py-3 text-white shadow-xl animate-float-panel sm:block">
              <p className="text-xs font-medium text-gray-400">طلبات اليوم</p>
              <p className="mt-1 text-2xl font-black">+38</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-2xl shadow-emerald-900/10">
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
                  <div>
                    <p className="text-xs font-bold text-emerald-700">لوحة متجركو</p>
                    <h2 className="mt-1 text-xl font-black text-gray-950">متجر العطور</h2>
                  </div>
                  <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-700">
                    مباشر
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: <Store className="h-4 w-4" />, label: "المتجر", value: "جاهز" },
                    { icon: <Truck className="h-4 w-4" />, label: "الشحن", value: "مفعل" },
                    { icon: <CreditCard className="h-4 w-4" />, label: "الدفع", value: "قيد الإعداد" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border border-gray-200 bg-white p-4">
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                        {item.icon}
                      </div>
                      <span className="block text-xs font-bold text-gray-500">{item.label}</span>
                      <span className="mt-1 block text-sm font-black text-gray-950">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.82fr]">
                  <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-black text-gray-950">رحلة الإطلاق</h3>
                      <Sparkles className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="space-y-3">
                      {launchSteps.map((step, index) => (
                        <div key={step} className="flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-950 text-xs font-black text-white">
                            {index + 1}
                          </span>
                          <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className="h-full rounded-full bg-emerald-500"
                              style={{ width: `${95 - index * 15}%` }}
                            />
                          </div>
                          <span className="w-28 text-xs font-bold text-gray-600">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-gray-950 p-4 text-white">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-black">أدوات البيع</h3>
                      <BarChart3 className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: <ShoppingBag className="h-4 w-4" />, text: "منتجات" },
                        { icon: <Package className="h-4 w-4" />, text: "طلبات" },
                        { icon: <Users className="h-4 w-4" />, text: "عملاء" },
                        { icon: <LayoutTemplate className="h-4 w-4" />, text: "قوالب" },
                      ].map((tool) => (
                        <div key={tool.text} className="rounded-md bg-white/10 p-3">
                          <div className="mb-2 text-emerald-300">{tool.icon}</div>
                          <span className="text-xs font-bold text-gray-100">{tool.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
