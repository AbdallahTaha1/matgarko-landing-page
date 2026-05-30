import { Database, Lock, Mail, ShieldCheck } from "lucide-react";

const privacySections = [
  {
    title: "المعلومات التي نجمعها",
    text: "عند إنشاء حساب أو التواصل معنا، قد نجمع بيانات مثل الاسم، البريد الإلكتروني، رقم الهاتف، اسم المتجر، وبيانات الاستخدام الأساسية داخل المنصة.",
  },
  {
    title: "كيف نستخدم البيانات",
    text: "نستخدم البيانات لتشغيل حسابك، تحسين تجربة المتجر، تقديم الدعم، إرسال تنبيهات مهمة، ومساعدتك في إدارة المنتجات والطلبات.",
  },
  {
    title: "مشاركة البيانات",
    text: "لا نبيع بياناتك الشخصية. قد نشارك بعض المعلومات فقط عند الحاجة لتشغيل الخدمة، مثل خدمات الاستضافة أو الدفع أو الدعم الفني.",
  },
  {
    title: "حماية المعلومات",
    text: "نستخدم إجراءات تنظيمية وتقنية لحماية بياناتك من الوصول غير المصرح به، ونعمل على تقليل الوصول للبيانات حسب الحاجة.",
  },
];

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-24" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <section className="mx-auto mb-12 max-w-4xl text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 font-heading">
            سياسة الخصوصية
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            نوضح هنا كيف تتعامل متجركو مع بياناتك وبيانات متجرك، وما الذي
            نستخدمه لتقديم الخدمة وتحسينها.
          </p>
        </section>

        <section className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {privacySections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-gray-100 bg-gray-50/70 p-7"
            >
              <h2 className="mb-3 text-xl font-bold text-gray-900 font-heading">
                {section.title}
              </h2>
              <p className="leading-relaxed text-gray-600">{section.text}</p>
            </article>
          ))}
        </section>

        <section className="mx-auto mt-10 max-w-5xl rounded-3xl border border-primary/10 bg-primary/5 p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <p className="text-gray-700">نحافظ على سرية بيانات حسابك ومتجرك.</p>
            </div>
            <div className="flex items-start gap-3">
              <Database className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <p className="text-gray-700">تستخدم البيانات لتشغيل الخدمة وتحسينها.</p>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <p className="text-gray-700">للاستفسار: matgarko.help@gmail.com</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
