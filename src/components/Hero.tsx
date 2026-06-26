import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  CreditCard,
  Package,
  ShoppingBag,
  Store,
  Truck,
  Users,
} from "lucide-react";

const SIGNUP_URL = "https://signup.matgarko.com/signup";

const capabilities = [
  "متجر إلكتروني",
  "رابط خاص بمتجرك",
  "لوحة تحكم سهلة",
  "طلبات وفواتير",
  "مخزون ومنتجات",
  "دفع وشحن",
  "تقارير",
];

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <div className="container px-4 mx-auto md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-right"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/10">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              منصة إنشاء متجر إلكتروني في مصر
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight tracking-tighter-heading">
              أنشئ متجر إلكتروني{" "}
              <span className="relative inline-block">
                <span className="text-primary">بدون برمجة</span>
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
              مع متجركو تقدر تبدأ البيع أونلاين في دقائق: متجر عربي باسمك،
              قوالب جاهزة، منتجات وطلبات وعملاء من لوحة واحدة، وباقات شهرية
              تبدأ من 50 جنيه بس.
            </p>
            <p className="text-base text-gray-500 mb-8 leading-relaxed max-w-xl">
              اعرض منتجاتك واستقبل طلباتك فورًا، وجرب المنصة من غير مخاطرة.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white h-16 px-10 text-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1"
              >
                <a href={SIGNUP_URL}>أنشئ متجرك الآن</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-16 px-10 text-xl border-gray-200 hover:bg-gray-50 text-gray-700 gap-2 group"
              >
                <Link to="/getting-started">
                  اعرف طريقة البدء{" "}
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              {capabilities.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-sm text-gray-600 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm">
              <p className="text-sm text-gray-500 mb-4 font-medium">
                مناسب لمن يريد إطلاق متجره بسرعة بدون انتظار تجهيز يدوي
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["تسجيل سريع", "رابط متجر فوري", "إدارة سهلة", "باقات شهرية"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-center gap-2 rounded-xl bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="lg:w-1/2 perspective-1000 hidden lg:block" dir="rtl">
            <div className="relative w-full max-w-[600px] mx-auto transform-3d rotate-y-12 shadow-3d rounded-2xl bg-white border border-gray-100/50 opacity-0 animate-fade-in-up">
              <div className="bg-gray-900 rounded-2xl overflow-hidden p-4 border border-gray-800 h-[430px] flex gap-4">
                <div className="w-16 flex flex-col items-center gap-6 py-4 border-l border-gray-800">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <ShoppingBag size={18} />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500">
                    <BarChart3 size={18} />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500">
                    <Users size={18} />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500">
                    <Package size={18} />
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                  <div className="h-10 flex justify-between items-center border-b border-gray-800 pb-2">
                    <h3 className="text-white font-bold text-sm">لوحة متجر العميل</h3>
                    <div className="text-[10px] text-gray-400 bg-gray-800 rounded px-2 py-1">
                      store.matgarko.com
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700">
                      <Store className="w-4 h-4 text-primary mb-2" />
                      <span className="text-[10px] text-gray-400 block mb-1">المتجر</span>
                      <span className="text-sm font-bold text-white block">جاهز</span>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700">
                      <Truck className="w-4 h-4 text-emerald-400 mb-2" />
                      <span className="text-[10px] text-gray-400 block mb-1">الشحن</span>
                      <span className="text-sm font-bold text-white block">مفعل</span>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700">
                      <CreditCard className="w-4 h-4 text-cyan-400 mb-2" />
                      <span className="text-[10px] text-gray-400 block mb-1">الدفع</span>
                      <span className="text-sm font-bold text-white block">قيد الإعداد</span>
                    </div>
                  </div>

                  <div className="flex-1 bg-gray-800/30 rounded-xl border border-gray-700 p-4 relative overflow-hidden">
                    <span className="text-[10px] text-gray-400 mb-2 block">
                      رحلة العميل الذاتية
                    </span>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {[
                        "اختيار الرابط",
                        "إنشاء الحساب",
                        "بيانات المتجر",
                        "إضافة المنتجات",
                        "طرق الدفع",
                        "طرق الشحن",
                        "القالب",
                        "أول طلب",
                      ].map((item) => (
                        <div
                          key={item}
                          className="bg-gray-900/70 rounded-lg px-3 py-2 text-xs text-gray-300 border border-gray-700"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute -right-6 top-20 bg-white p-3 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 z-20 translate-z-10 opacity-0 animate-slide-in-right">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CreditCard size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">تم إنشاء المتجر</p>
                      <p className="text-[10px] text-gray-500">جاهز لإضافة المنتجات</p>
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
