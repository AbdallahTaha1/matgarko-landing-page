import { Button } from "@/components/ui/button";
import { Check, KeyRound, Layers, MapPin, Shield, Store, Users, Zap } from "lucide-react";

const SIGNUP_URL = "https://signup.matgarko.com/signup";

const values = [
  {
    icon: <KeyRound className="w-7 h-7 text-current" />,
    title: "تبدأ بنفسك",
    description:
      "اختر اسم متجرك ورابطه، ثم ابدأ إعداد المنتجات والبيانات من لوحة إدارة سهلة بدون انتظار أو خطوات معقدة.",
  },
  {
    icon: <Layers className="w-7 h-7 text-current" />,
    title: "متجر منظم باسمك",
    description:
      "كل تاجر يحصل على متجر خاص به ورابط واضح وبيانات منظمة للمنتجات والطلبات والعملاء.",
  },
  {
    icon: <MapPin className="w-7 h-7 text-current" />,
    title: "مناسب للسوق المصري",
    description:
      "الأسعار واللغة وطريقة الاستخدام مصممة لتناسب التاجر الذي يريد دخول البيع أونلاين بتكلفة بسيطة.",
  },
  {
    icon: <Shield className="w-7 h-7 text-current" />,
    title: "تجربة واضحة للتاجر",
    description:
      "نركز على الأساسيات التي يحتاجها التاجر: عرض المنتجات، استقبال الطلبات، وتنظيم البيع من مكان واحد.",
  },
];

export const AboutPage = () => {
  return (
    <div className="bg-white text-right" dir="rtl">
      <section className="page-hero">
        <div className="container px-4 mx-auto relative z-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <div className="section-kicker mb-5">
                <Users className="w-4 h-4" />
                <span>عن متجركو</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-gray-950 mb-5 font-heading max-w-3xl leading-tight">
                متجركو يساعدك تبدأ بيع أونلاين بسهولة
              </h1>

              <p className="text-base md:text-lg font-medium text-gray-700 max-w-2xl leading-8">
                متجركو منصة عربية تساعد التجار وأصحاب المشاريع في مصر على إنشاء
                متجر إلكتروني بسرعة وبتكلفة شهرية مناسبة، بدون شركة برمجة أو انتظار طويل.
              </p>
            </div>

            <div className="premium-card p-6">
              <div className="icon-tile mb-5 h-12 w-12">
                <Store className="h-6 w-6" />
              </div>
              <h2 className="mb-4 text-xl font-black text-gray-950 font-heading">
                ابدأ بتكلفة بسيطة
              </h2>
              <div className="grid gap-3">
                {["بداية من 50 ج", "شهر مجاني", "تجربة عربية سهلة"].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                    <span className="text-sm font-bold text-gray-700">{item}</span>
                    <Check className="h-4 w-4 text-emerald-700" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 bg-gray-950 text-white shadow-xl">
            <div className="grid gap-8 p-8 md:grid-cols-[220px_1fr] md:p-10">
              <div className="flex items-center justify-center rounded-lg bg-white/10 p-8 shadow-sm">
                <Zap className="w-14 h-14 text-emerald-300" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-heading">
                  مهمتنا
                </h2>
                <p className="text-lg text-gray-300 leading-8">
                  نريد أن يكون إنشاء متجر إلكتروني خطوة سهلة وممكنة لأي تاجر:
                  يبدأ بسعر مناسب، يضيف منتجاته، وينظم طلباته من لوحة واحدة واضحة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-950 mb-5 font-heading">
              ماذا نقدم للتاجر؟
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              نركز على ما يحتاجه التاجر في البداية: متجر جاهز، إدارة بسيطة،
              أسعار مناسبة، وتجربة عربية واضحة للعميل وصاحب المتجر.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="premium-card group p-7"
              >
                <div className="mb-5 transform group-hover:scale-110 transition-transform">
                  <div className="icon-tile w-12 h-12 transition-transform group-hover:scale-110">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-black text-gray-950 mb-3 font-heading">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto overflow-hidden rounded-lg bg-gray-950 text-white shadow-xl">
            <div className="grid gap-0 md:grid-cols-[280px_1fr]">
              <div className="flex items-center justify-center bg-primary p-10">
                <div className="flex h-28 w-28 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20">
                  <Store className="h-14 w-14 text-white" />
                </div>
              </div>
              <div className="p-8 text-right md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading">
                  هدفنا أن تبدأ بدون مخاطرة كبيرة
                </h2>
                <p className="text-gray-300 leading-relaxed mb-7 max-w-2xl">
                  بدل ما تدفع مبلغ كبير من البداية أو تنتظر تنفيذ طويل، تقدر
                  تبدأ مع متجركو بسرعة، تجرب البيع أونلاين، وتطور متجرك مع
                  نمو تجارتك.
                </p>
                <div className="mb-7 flex flex-wrap gap-3">
                  {["تسجيل سريع", "رابط خاص بمتجرك", "لوحة إدارة سهلة"].map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-100"
                    >
                      <Check className="h-4 w-4 text-primary" />
                      {item}
                    </span>
                  ))}
                </div>
                <Button asChild size="lg" className="bg-emerald-500 text-gray-950 font-extrabold hover:bg-emerald-400">
                  <a href={SIGNUP_URL}>ابدأ متجرك الآن</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
