import { Banknote, ClipboardList, Truck } from "lucide-react";

const groups = [
  {
    icon: <Banknote className="h-6 w-6 text-current" />,
    title: "الدفع",
    description: "العميل يطلب من متجرك ويدفع وقت استلام الطلب.",
    items: ["الدفع عند الاستلام", "متاح في كل الباقات"],
  },
  {
    icon: <Truck className="h-6 w-6 text-current" />,
    title: "الشحن",
    description: "حدد مناطق الشحن وسعر التوصيل لكل منطقة، عشان العميل يعرف التكلفة قبل تأكيد الطلب.",
    items: ["مناطق الشحن", "أسعار التوصيل"],
  },
];

export function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-white text-right" dir="rtl">
      <section className="page-hero">
        <div className="container mx-auto px-4 text-center md:px-6">
          <div className="section-kicker mb-5">
            <Truck className="w-4 h-4" />
            الدفع والشحن
          </div>
          <h1 className="page-title mb-5">
            رتّب تفاصيل الدفع والتوصيل
          </h1>
          <p className="page-lead">
            استقبل طلبات الدفع عند الاستلام، وحدد تكلفة التوصيل بوضوح لعملائك.
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <ClipboardList className="w-10 h-10 text-emerald-300 shrink-0" />
          <div>
            <h2 className="text-2xl font-black text-white mb-2 font-heading">من الطلب إلى التسليم</h2>
            <p className="text-gray-300 leading-relaxed">
              راجع بيانات الطلب وتواصل مع العميل للتأكيد، ثم جهّز المنتجات للتسليم.
              وضّح للعميل تكلفة التوصيل والموعد المتوقع لاستلام طلبه.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
