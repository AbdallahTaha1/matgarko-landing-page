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
    <section className="py-24 bg-white" dir="rtl">
      <div className="container px-4 mx-auto md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-heading tracking-tighter-heading">
            ابدأ متجرك في 3 خطوات
          </h2>
          <p className="text-lg text-gray-600">
            خطوات واضحة من التسجيل إلى عرض المنتجات واستقبال أول طلب، بدون
            خبرة تقنية أو انتظار طويل.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10 transform -translate-y-1/2"></div>

          {steps.map((step) => (
            <div
              key={step.title}
              className="relative flex flex-col items-center text-center group"
            >
              <div
                className={`w-24 h-24 rounded-3xl ${step.color} shadow-lg flex items-center justify-center mb-8 transform rotate-3 group-hover:rotate-6 transition-transform duration-300`}
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-bold font-heading mb-4 text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
