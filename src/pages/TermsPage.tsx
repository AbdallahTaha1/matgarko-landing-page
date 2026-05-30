import { AlertCircle, CreditCard, ShieldCheck, Store } from "lucide-react";

const termsSections = [
  {
    title: "قبول الشروط",
    text: "باستخدامك لمتجركو أو إنشاء حساب على المنصة، فإنك توافق على هذه الشروط وعلى أي تحديثات مستقبلية يتم نشرها داخل الموقع.",
  },
  {
    title: "استخدام الحساب",
    text: "أنت مسؤول عن بيانات حسابك، كلمة المرور، والمحتوى الذي تضيفه داخل متجرك مثل المنتجات والصور والأسعار وسياسات البيع.",
  },
  {
    title: "المحتوى والمنتجات",
    text: "يجب ألا تستخدم المنصة لعرض منتجات مخالفة للقانون أو محتوى مضلل أو ينتهك حقوق الآخرين. يحق لمتجركو مراجعة أو إيقاف أي استخدام مخالف.",
  },
  {
    title: "الاشتراكات والمدفوعات",
    text: "الباقات والأسعار قد تتغير من وقت لآخر. يتم توضيح أي رسوم أو عروض متاحة قبل الاشتراك، وقد تختلف بعض المزايا حسب الباقة.",
  },
  {
    title: "توفر الخدمة",
    text: "نسعى لتقديم خدمة مستقرة، لكن قد تحدث أعمال صيانة أو أعطال خارجة عن الإرادة. سنحاول تقليل الانقطاع قدر الإمكان.",
  },
  {
    title: "التواصل والدعم",
    text: "يمكنك التواصل معنا عند وجود مشكلة في الحساب أو الخدمة، وسنحاول مساعدتك من خلال قنوات الدعم المتاحة.",
  },
];

export function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-24" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <section className="mx-auto mb-12 max-w-4xl text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 font-heading">
            الشروط والأحكام
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            هذه الشروط توضح قواعد استخدام منصة متجركو، ومسؤولياتك عند إنشاء
            وتشغيل متجرك الإلكتروني.
          </p>
        </section>

        <section className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {termsSections.map((section) => (
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

        <section className="mx-auto mt-10 max-w-5xl rounded-3xl bg-gray-900 p-8 text-white">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <Store className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <p className="text-gray-200">استخدم متجرك بطريقة قانونية وواضحة.</p>
            </div>
            <div className="flex items-start gap-3">
              <CreditCard className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <p className="text-gray-200">راجع تفاصيل الباقة قبل الاشتراك.</p>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <p className="text-gray-200">قد يتم تحديث الشروط عند تطوير الخدمة.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
