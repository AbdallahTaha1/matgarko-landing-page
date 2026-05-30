import { Button } from "@/components/ui/button";
import {
  BadgePercent,
  Boxes,
  CreditCard,
  FileText,
  PackageCheck,
  ShieldCheck,
  Store,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const SIGNUP_URL = "https://signup.matgarko.com/signup";

const solutionBlocks = [
  {
    icon: <Boxes className="w-7 h-7" />,
    title: "إدارة المنتجات",
    text: "أضف المنتجات والصور والأسعار والأقسام، وتابع المخزون من لوحة واحدة سهلة.",
  },
  {
    icon: <PackageCheck className="w-7 h-7" />,
    title: "متابعة الطلبات",
    text: "اعرف كل طلب جديد، بيانات العميل، حالة الدفع، وخطوات التجهيز والشحن.",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "تنظيم العملاء",
    text: "احتفظ ببيانات العملاء وطلباتهم، وارجع لها بسهولة عند المتابعة أو الدعم.",
  },
  {
    icon: <BadgePercent className="w-7 h-7" />,
    title: "العروض والخصومات",
    text: "جهز كوبونات وعروض موسمية تساعدك تزود المبيعات وتشجع العملاء يرجعوا تاني.",
  },
];

export const SolutionsPage = () => {
  return (
    <div className="bg-white" dir="rtl">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-white pt-28 pb-16">
        <div className="container px-4 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>حلول عملية للبيع أونلاين</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
            كل ما تحتاجه لإدارة متجرك من مكان واحد
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            متجركو يساعدك تعرض منتجاتك، تستقبل الطلبات، وتتابع العملاء والدفع
            والشحن من لوحة عربية بسيطة، بدون تكلفة كبيرة أو تعقيد تقني.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 px-8">
              <a href={SIGNUP_URL}>أنشئ متجرك</a>
            </Button>
            <Button asChild size="lg" className="border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
              <Link to="/pricing">راجع الباقات</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto rounded-3xl border border-gray-100 bg-white p-8 shadow-xl md:p-10">
            <div className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
                  من أول منتج لأول طلب
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  الفكرة بسيطة: تنشئ متجرك، تضيف منتجاتك، ثم تبدأ استقبال
                  الطلبات ومتابعتها من لوحة واضحة. كل شيء مرتب ليخدم التاجر في
                  يومه العادي.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["منتجات", "طلبات", "عملاء", "شحن ودفع"].map((item) => (
                    <span key={item} className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: <Store className="h-5 w-5" />, title: "متجر جاهز" },
                  { icon: <CreditCard className="h-5 w-5" />, title: "طرق دفع" },
                  { icon: <Truck className="h-5 w-5" />, title: "خيارات شحن" },
                  { icon: <FileText className="h-5 w-5" />, title: "صفحات مهمة" },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl bg-gray-50 p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
              ماذا تدير من لوحة التحكم؟
            </h2>
            <p className="text-lg text-gray-600">
              بعد التسجيل، تقدر تضبط أساسيات متجرك وتتابع البيع من لوحة عربية
              واضحة وسهلة الاستخدام.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {solutionBlocks.map((block) => (
              <div key={block.title} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  {block.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-heading">
                  {block.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            مناسب للتاجر الذي يريد بداية سهلة
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            سواء بتبيع على السوشيال ميديا أو لسه بتبدأ، متجركو يساعدك تنقل
            تجارتك لتجربة أونلاين أكثر تنظيمًا ووضوحًا للعملاء.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "تسجيل سريع", desc: "ابدأ متجرك بدون خطوات طويلة أو إعداد يدوي." },
              { title: "رابط خاص", desc: "استخدم رابط واضح لمتجرك تشاركه مع العملاء." },
              { title: "إدارة يومية", desc: "منتجات وطلبات وعملاء وعروض من مكان واحد." },
            ].map((card) => (
              <div key={card.title} className="p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all bg-white">
                <FileText className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="inline-flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full font-medium mt-12">
            <Zap className="w-4 h-4" />
            <span>ابدأ بتكلفة بسيطة وطور متجرك مع الوقت</span>
          </div>
        </div>
      </section>
    </div>
  );
};
