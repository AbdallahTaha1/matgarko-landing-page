import { BookOpen, Quote } from "lucide-react";

const highlights = [
  {
    title: "لو لسه بتبدأ",
    content:
      "تقدر تبدأ بميزانية بسيطة، تجرب المنصة، وتجهز منتجاتك خطوة بخطوة بدون مخاطرة كبيرة.",
  },
  {
    title: "لو عندك منتجات جاهزة",
    content:
      "اعرض منتجاتك في متجر منظم، واستقبل طلبات العملاء بدل الاعتماد فقط على الرسائل والتعليقات.",
  },
  {
    title: "لو عايز تنظم تجارتك",
    content:
      "تابع الطلبات والعملاء والمنتجات من مكان واحد، وخلي البيع أونلاين أوضح لك ولعملائك.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" dir="rtl">
      <div className="container px-4 mx-auto md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="section-kicker mb-6">
            <BookOpen className="w-4 h-4" />
            مناسب لمين؟
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-950 mb-6 font-heading tracking-tighter-heading">
            مصمم للتاجر اللي عايز يتحرك بسرعة
          </h2>
          <p className="mx-auto max-w-3xl text-lg font-medium leading-8 text-gray-600">
            سواء بتبدأ أول متجر أو عندك بيع بالفعل، متجركو يساعدك تنتقل
            لتجربة أونلاين أبسط وأكثر تنظيمًا.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="bg-gray-50 rounded-lg p-8 border border-gray-200 relative group hover:bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 left-6" />
              <h3 className="text-2xl font-black text-gray-950 font-heading mb-4">
                {item.title}
              </h3>
              <p className="font-medium text-gray-600 leading-8 relative z-10">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
