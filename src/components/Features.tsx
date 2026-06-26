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
    <section id="features" className="bg-[#f6fbf8] py-24" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-kicker mb-6">
            <Store className="w-4 h-4 text-primary" />
            <span>كل ما تحتاجه للبيع أونلاين</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-950 mb-6 font-heading tracking-tighter-heading">
            أدوات تخلي متجرك جاهز للبيع
          </h2>
          <p className="text-lg font-medium leading-8 text-gray-600">
            من إضافة المنتج حتى متابعة الطلب، كل جزء في الصفحة مصمم ليخدم
            التحويل والثقة بدل ما يكون مجرد شكل جميل.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.colSpan} group relative min-h-[250px] overflow-hidden rounded-lg border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${feature.border}`}
            >
              <div className="absolute right-0 top-0 h-1 w-full bg-gradient-to-l from-emerald-500 via-teal-400 to-lime-300 opacity-80"></div>

              <div className="relative z-10 flex h-full flex-col">
                <div>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-gray-50 border border-gray-100 shadow-sm transition-transform group-hover:-rotate-3 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-black text-gray-950 mb-3 font-heading">
                    {feature.title}
                  </h3>
                  <p className="font-medium text-gray-600 leading-8">
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
