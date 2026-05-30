import { KeyRound, MapPin, Plug, Store } from "lucide-react";

const pillars = [
  {
    icon: <KeyRound className="w-8 h-8 text-primary" />,
    title: "ابدأ بدون تعقيد",
    text: "سجل حسابك، اختر رابط متجرك، وابدأ تجهيز المنتجات والبيانات من لوحة تحكم واضحة.",
  },
  {
    icon: <Store className="w-8 h-8 text-purple-600" />,
    title: "متجر خاص باسمك",
    text: "متجرك يكون له رابط خاص وبيانات منظمة، فتقدر تدير المنتجات والطلبات والعملاء في مكان واحد.",
  },
  {
    icon: <MapPin className="w-8 h-8 text-pink-600" />,
    title: "مناسبة للسوق المصري",
    text: "أسعار شهرية بسيطة وتجربة عربية تساعدك تبدأ البيع أونلاين بدون تكلفة كبيرة أو انتظار طويل.",
  },
];

export function WhyEcommerce() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden" dir="rtl">
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-heading tracking-tighter-heading">
            لماذا تختار متجركو؟
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            لأنك تحتاج طريقة سهلة ومناسبة التكلفة لبدء البيع أونلاين، بدون
            شركة برمجة وبدون شهور انتظار.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-shadow border border-gray-100"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-50 flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                {pillar.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{pillar.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 inline-flex items-center justify-center w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600">
            <Plug className="w-4 h-4 text-primary" />
            من التسجيل إلى أول طلب بخطوات بسيطة
          </div>
        </div>
      </div>
    </section>
  );
}
