import { KeyRound, MapPin, Plug, Store } from "lucide-react";

const pillars = [
  {
    icon: <KeyRound className="w-8 h-8 text-emerald-700" />,
    title: "ابدأ بدون تعقيد",
    text: "سجل حسابك، اختر رابط متجرك، وابدأ تجهيز المنتجات والبيانات من لوحة تحكم واضحة.",
  },
  {
    icon: <Store className="w-8 h-8 text-emerald-700" />,
    title: "متجر خاص باسمك",
    text: "متجرك يكون له رابط خاص وبيانات منظمة، فتقدر تدير المنتجات والطلبات والعملاء في مكان واحد.",
  },
  {
    icon: <MapPin className="w-8 h-8 text-emerald-700" />,
    title: "مناسبة للسوق المصري",
    text: "أسعار شهرية بسيطة وتجربة عربية تساعدك تبدأ البيع أونلاين بدون تكلفة كبيرة أو انتظار طويل.",
  },
];

export function WhyEcommerce() {
  return (
    <section className="relative overflow-hidden bg-white py-24" dir="rtl">
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="section-kicker mb-6">
            <Store className="h-4 w-4" />
            لماذا متجركو؟
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-950 mb-6 font-heading tracking-tighter-heading">
            بداية أسرع من البرمجة التقليدية
          </h2>
          <p className="text-lg font-medium leading-8 text-gray-600 max-w-2xl mx-auto">
            لأنك تحتاج طريقة سهلة ومناسبة التكلفة لبدء البيع أونلاين، بدون
            شركة برمجة وبدون شهور انتظار.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group rounded-lg border border-gray-200 bg-gray-50 p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-white flex items-center justify-center shadow-sm transition-transform group-hover:-rotate-3 group-hover:scale-110">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-black text-gray-950 mb-4 font-heading">
                {pillar.title}
              </h3>
              <p className="font-medium text-gray-600 leading-8">{pillar.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 inline-flex items-center justify-center w-full">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 font-bold">
            <Plug className="w-4 h-4 text-emerald-700" />
            من التسجيل إلى أول طلب بخطوات بسيطة
          </div>
        </div>
      </div>
    </section>
  );
}
