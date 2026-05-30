import {
  BadgePercent,
  Boxes,
  FileText,
  PackageCheck,
  Store,
  Truck,
  Users,
} from "lucide-react";

const features = [
  {
    icon: <Boxes className="h-6 w-6 text-blue-500" />,
    title: "أضف منتجاتك بسهولة",
    description:
      "ارفع صور المنتجات، اكتب الأسعار والوصف، ونظم الأقسام والمخزون من لوحة واحدة واضحة.",
    bg: "bg-blue-500/10",
    border: "hover:border-blue-500/50",
    colSpan: "xl:col-span-4",
  },
  {
    icon: <PackageCheck className="h-6 w-6 text-emerald-500" />,
    title: "تابع الطلبات من مكان واحد",
    description:
      "اعرف كل طلب جديد، حالته، بيانات العميل، وطريقة الدفع أو الشحن بدون تشتت.",
    bg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/50",
    colSpan: "xl:col-span-4",
  },
  {
    icon: <Users className="h-6 w-6 text-purple-500" />,
    title: "بيانات عملائك منظمة",
    description:
      "احتفظ ببيانات العملاء وطلباتهم في لوحة سهلة تساعدك تتابع البيع وتخدمهم أسرع.",
    bg: "bg-purple-500/10",
    border: "hover:border-purple-500/50",
    colSpan: "xl:col-span-2",
  },
  {
    icon: <BadgePercent className="h-6 w-6 text-orange-500" />,
    title: "عروض تساعدك تبيع أكتر",
    description:
      "جهز كوبونات وخصومات وعروض موسمية تشجع العملاء على الشراء والرجوع مرة تانية.",
    bg: "bg-orange-500/10",
    border: "hover:border-orange-500/50",
    colSpan: "xl:col-span-2",
  },
  {
    icon: <Truck className="h-6 w-6 text-pink-500" />,
    title: "دفع وشحن مناسبين لنشاطك",
    description:
      "رتب طرق الدفع والشحن التي تناسب منتجاتك وعملاءك، وخلي تجربة الشراء أوضح وأسهل.",
    bg: "bg-pink-500/10",
    border: "hover:border-pink-500/50",
    colSpan: "xl:col-span-2",
  },
  {
    icon: <FileText className="h-6 w-6 text-cyan-500" />,
    title: "صفحات تزيد ثقة العميل",
    description:
      "أضف صفحات عن المتجر، سياسة الاستبدال، الشحن، وأي معلومات مهمة تطمئن العميل قبل الشراء.",
    bg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/50",
    colSpan: "xl:col-span-2",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50/50" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-medium mb-6 shadow-sm">
            <Store className="w-4 h-4 text-primary" />
            <span>كل ما تحتاجه للبيع أونلاين</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-heading tracking-tighter-heading">
            أدوات بسيطة لإدارة متجرك
          </h2>
          <p className="text-lg text-gray-600">
            متجركو يساعدك تعرض منتجاتك، تستقبل الطلبات، وتتابع عملاءك من
            لوحة واحدة سهلة ومناسبة لبداية مشروعك أونلاين.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.colSpan} relative min-h-[240px] overflow-hidden rounded-2xl p-7 bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${feature.border}`}
            >
              <div
                className={`absolute top-0 right-0 h-28 w-28 ${feature.bg} rounded-bl-full -mr-8 -mt-8 opacity-60 group-hover:scale-125 transition-transform duration-500`}
              ></div>

              <div className="relative z-10 flex h-full flex-col">
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-gray-100 shadow-sm group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 font-heading">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
