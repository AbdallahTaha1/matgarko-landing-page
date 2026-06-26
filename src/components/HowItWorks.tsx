import { PackagePlus, Settings, Store } from "lucide-react";

const steps = [
  {
    icon: <Settings className="w-8 h-8 text-white" />,
    title: "1. سجل واختر اسم متجرك",
    description:
      "اكتب اسم المتجر، اختر الرابط المناسب، وأنشئ حسابك في خطوات بسيطة.",
    color: "bg-primary",
  },
  {
    icon: <PackagePlus className="w-8 h-8 text-white" />,
    title: "2. أضف منتجاتك وبياناتك",
    description:
      "أضف الشعار، بيانات التواصل، الأقسام، المنتجات، الأسعار، وسياسات البيع من لوحة الإدارة.",
    color: "bg-purple-600",
  },
  {
    icon: <Store className="w-8 h-8 text-white" />,
    title: "3. ابدأ البيع واستقبل الطلبات",
    description:
      "اضبط الدفع والشحن، اختر شكل المتجر، ثم ابدأ استقبال الطلبات ومتابعتها بنفسك.",
    color: "bg-pink-600",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[#f6fbf8] py-24" dir="rtl">
      <div className="container px-4 mx-auto md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-kicker mb-6">
            <Settings className="h-4 w-4" />
            رحلة بسيطة
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-950 mb-6 font-heading tracking-tighter-heading">
            ابدأ متجرك في 3 خطوات واضحة
          </h2>
          <p className="text-lg font-medium leading-8 text-gray-600">
            خطوات واضحة من التسجيل إلى عرض المنتجات واستقبال أول طلب، بدون
            خبرة تقنية أو انتظار طويل.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-emerald-100 -z-10 transform -translate-y-1/2"></div>

          {steps.map((step) => (
            <div
              key={step.title}
              className="relative flex flex-col items-center text-center group rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              <div
                className={`w-20 h-20 rounded-lg ${step.color} shadow-lg flex items-center justify-center mb-8 transform rotate-3 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-black font-heading mb-4 text-gray-950">
                {step.title}
              </h3>
              <p className="font-medium text-gray-600 leading-8 max-w-sm mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
