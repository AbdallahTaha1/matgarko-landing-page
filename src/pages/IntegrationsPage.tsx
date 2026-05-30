import { CreditCard, Megaphone, Plug, Settings, Truck, Zap } from "lucide-react";

const groups = [
  {
    icon: <CreditCard className="h-6 w-6 text-blue-600" />,
    title: "الدفع",
    description: "نساعدك في تجهيز طرق الدفع المناسبة لنشاطك وعملائك في بلدك.",
    items: ["بطاقات بنكية", "دفع عند الاستلام", "محافظ إلكترونية", "تحويل بنكي", "دفع يدوي", "مزود دفع حسب التعاقد"],
  },
  {
    icon: <Truck className="h-6 w-6 text-orange-600" />,
    title: "الشحن",
    description: "اضبط مناطق الشحن، تكاليف التوصيل، حالات الشحنة، وخيارات الاستلام أو التسليم.",
    items: ["شحن حسب الوزن", "سعر ثابت", "نقاط استلام", "شركات شحن", "توصيل داخلي", "مناطق شحن"],
  },
  {
    icon: <Megaphone className="h-6 w-6 text-purple-600" />,
    title: "التسويق",
    description: "أدوات تساعدك على تنشيط المبيعات وزيادة رجوع العملاء للشراء.",
    items: ["كوبونات", "خصومات", "قسائم هدايا", "نشرات بريدية", "تنبيهات", "حملات موسمية"],
  },
  {
    icon: <Zap className="h-6 w-6 text-green-600" />,
    title: "تشغيل وتخصيص",
    description: "للشركات التي تحتاج إعدادات أو ربطاً خاصاً مع أنظمة العمل الحالية.",
    items: ["إعدادات المتجر", "صلاحيات", "تقارير", "رسائل", "تكاملات خاصة", "دعم ذاتي"],
  },
];

export function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-white py-24" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Plug className="w-4 h-4" />
            تكاملات عملية للتشغيل
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            اربط متجرك بما يحتاجه نشاطك
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            متجركو تركز على ما يهم صاحب المتجر:
            الدفع، الشحن، التسويق، والتشغيل اليومي داخل السوق العربي.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {groups.map((group) => (
            <div key={group.title} className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white p-3 rounded-xl shadow-sm">{group.icon}</div>
                <h2 className="text-2xl font-bold">{group.title}</h2>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">{group.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {group.items.map((name) => (
                  <div
                    key={name}
                    className="bg-white p-4 rounded-xl shadow-sm text-center font-bold text-gray-600 hover:text-primary hover:shadow-md transition-all flex items-center justify-center min-h-20"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary/5 border border-primary/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
          <Settings className="w-10 h-10 text-primary shrink-0" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">التكامل حسب التعاقد والباقة</h2>
            <p className="text-gray-600 leading-relaxed">
              بعض طرق الدفع أو الشحن تحتاج حساباً تجارياً أو تعاقداً خارجياً.
              فريق متجركو يوضح لك المطلوب ويجهز الإعدادات المناسبة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
