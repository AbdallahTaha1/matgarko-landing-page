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
    title: "المنتجات والمحتوى الممنوع",
    text: "لا نسمح ببيع أو عرض أي منتج أو محتوى يخالف القوانين المصرية أو قيم المجتمع المصري أو أحكام الشريعة الإسلامية. ومن ذلك على سبيل المثال: الخمور والمسكرات، المخدرات، منتجات الخنزير، المحتوى الإباحي أو الخادش للحياء، أدوات القمار والمراهنات، الأسلحة والذخيرة، المنتجات المقلدة أو المسروقة، بيع الأدوية بدون ترخيص صيدلية، والمحتوى الذي يسيء للأديان أو يحرض على الكراهية أو العنف. يحق لمتجركو إخفاء أي منتج مخالف أو إيقاف المتجر.",
  },
  {
    title: "الصور المحتشمة",
    text: "نشجّع أن تكون صور المتجر والمنتجات محتشمة ومناسبة لكل أفراد الأسرة، وألا تتضمن صور نساء بشكل غير لائق. يمكن مثلًا عرض الملابس على مانيكان أو بدون عارضة. يحق لمتجركو طلب تعديل أو إخفاء أي صورة خادشة للحياء.",
  },
  {
    title: "النصب والاحتيال",
    text: "نتعامل بحزم مع أي متجر يُنشأ بغرض النصب أو الاحتيال، مثل استلام أموال دون تسليم الطلبات، أو عرض منتجات غير موجودة، أو انتحال اسم متجر أو علامة تجارية أخرى، أو استخدام أسعار أو عروض أو تقييمات وهمية. في هذه الحالات يحق لمتجركو إيقاف المتجر فورًا ودون إنذار، وحذفه، ومنع صاحبه من التسجيل مرة أخرى، والاحتفاظ بالبيانات اللازمة وتقديمها للجهات المختصة. ويمكن لأي عميل الإبلاغ عن متجر مشبوه من صفحة «تواصل معنا».",
  },
  {
    title: "الاشتراكات والمدفوعات",
    text: "الباقات والأسعار قد تتغير من وقت لآخر. يتم توضيح أي رسوم أو عروض متاحة قبل الاشتراك، وقد تختلف بعض المزايا حسب الباقة.",
  },
  {
    title: "المتاجر غير المستخدمة",
    text: "إذا ظل متجرك بدون أي منتجات أو طلبات ولم يتم الدخول إلى لوحة تحكمه لمدة 14 يومًا متتالية، يحق لمتجركو حذفه نهائيًا مع بياناته. نرسل لك تنبيهًا على البريد الإلكتروني أو رقم واتساب المسجّل قبل الحذف بـ 7 أيام على الأقل، ويكفي الدخول إلى لوحة التحكم خلال هذه المدة لإلغاء الحذف. لا تنطبق هذه القاعدة على أي متجر فيه منتجات أو طلبات. بعد الحذف يصبح رابط المتجر متاحًا للتسجيل من جديد.",
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
    <div className="min-h-screen bg-white py-16 text-right" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <section className="hero-band noise-grid mx-auto mb-12 max-w-4xl rounded-lg border border-emerald-100 p-8 text-center md:p-10">
          <div className="icon-tile mx-auto mb-5 h-14 w-14">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="mb-4 text-3xl font-black text-gray-950 font-heading md:text-4xl">
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
              className="premium-card p-7"
            >
              <h2 className="mb-3 text-lg font-black text-gray-950 font-heading">
                {section.title}
              </h2>
              <p className="leading-relaxed text-gray-600">{section.text}</p>
            </article>
          ))}
        </section>

        <section className="mx-auto mt-10 max-w-5xl rounded-lg bg-gray-950 p-8 text-white shadow-xl">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <Store className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
              <p className="text-gray-200">استخدم متجرك بطريقة قانونية وواضحة.</p>
            </div>
            <div className="flex items-start gap-3">
              <CreditCard className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
              <p className="text-gray-200">راجع تفاصيل الباقة قبل الاشتراك.</p>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
              <p className="text-gray-200">قد يتم تحديث الشروط عند تطوير الخدمة.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
