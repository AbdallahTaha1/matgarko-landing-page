import { CreditCard, Megaphone, Plug, Settings, Truck, Zap } from "lucide-react";

const groups = [
  {
    icon: <CreditCard className="h-6 w-6 text-current" />,
    title: "الدفع",
    description: "نساعدك في تجهيز طرق الدفع المناسبة لنشاطك وعملائك في بلدك.",
    items: ["بطاقات بنكية", "دفع عند الاستلام", "محافظ إلكترونية", "تحويل بنكي", "دفع يدوي", "مزود دفع حسب التعاقد"],
  },
  {
    icon: <Truck className="h-6 w-6 text-current" />,
    title: "الشحن",
    description: "اضبط مناطق الشحن، تكاليف التوصيل، حالات الشحنة، وخيارات الاستلام أو التسليم.",
    items: ["شحن حسب الوزن", "سعر ثابت", "نقاط استلام", "شركات شحن", "توصيل داخلي", "مناطق شحن"],
  },
  {
    icon: <Megaphone className="h-6 w-6 text-current" />,
    title: "التسويق",
    description: "أدوات تساعدك على تنشيط المبيعات وزيادة رجوع العملاء للشراء.",
    items: ["كوبونات", "خصومات", "قسائم هدايا", "نشرات بريدية", "تنبيهات", "حملات موسمية"],
  },
  {
    icon: <Zap className="h-6 w-6 text-current" />,
    title: "تشغيل وتخصيص",
    description: "للشركات التي تحتاج إعدادات أو ربطاً خاصاً مع أنظمة العمل الحالية.",
    items: ["إعدادات المتجر", "صلاحيات", "تقارير", "رسائل", "تكاملات خاصة", "دعم ذاتي"],
  },
];

export function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-white text-right" dir="rtl">
      <section className="page-hero">
        <div className="container mx-auto px-4 text-center md:px-6">
          <div className="section-kicker mb-5">
            <Plug className="w-4 h-4" />
            تكاملات عملية للتشغيل
          </div>
          <h1 className="page-title mb-5">
            اربط متجرك بما يحتاجه نشاطك
          </h1>
          <p className="page-lead">
            متجركو تركز على ما يهم صاحب المتجر:
            الدفع، الشحن، التسويق، والتشغيل اليومي داخل السوق العربي.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group) => (
            <div key={group.title} className="premium-card p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-tile h-12 w-12">{group.icon}</div>
                <h2 className="text-xl font-black text-gray-950 font-heading">{group.title}</h2>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">{group.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {group.items.map((name) => (
                  <div
                    key={name}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center font-bold text-gray-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 transition-all flex items-center justify-center min-h-20"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-950 border border-gray-800 rounded-lg p-8 flex flex-col md:flex-row items-center gap-6 text-white shadow-xl">
          <Settings className="w-10 h-10 text-emerald-300 shrink-0" />
          <div>
            <h2 className="text-2xl font-black text-white mb-2 font-heading">التكامل حسب التعاقد والباقة</h2>
            <p className="text-gray-300 leading-relaxed">
              بعض طرق الدفع أو الشحن تحتاج حساباً تجارياً أو تعاقداً خارجياً.
              فريق متجركو يوضح لك المطلوب ويجهز الإعدادات المناسبة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
