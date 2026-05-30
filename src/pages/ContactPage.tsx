import { Button } from "@/components/ui/button";
import { Clock, Facebook, Mail, MessageCircle, Phone } from "lucide-react";

const EMAIL = "matgarko.help@gmail.com";
const PHONE_DISPLAY = "+20 108 031 2538";
const WHATSAPP_URL = "https://wa.me/201080312538";
const FACEBOOK_URL = "https://www.facebook.com/matgarko2/";

const contactMethods = [
  {
    icon: <MessageCircle className="w-6 h-6 text-green-500" />,
    title: "واتساب",
    value: PHONE_DISPLAY,
    description: "الأسرع للتواصل والاستفسار عن إنشاء المتجر",
    href: WHATSAPP_URL,
    action: "تواصل على واتساب",
  },
  {
    icon: <Mail className="w-6 h-6 text-blue-500" />,
    title: "البريد الإلكتروني",
    value: EMAIL,
    description: "للاستفسارات التفصيلية أو طلبات الدعم",
    href: `mailto:${EMAIL}`,
    action: "أرسل إيميل",
  },
  {
    icon: <Facebook className="w-6 h-6 text-blue-600" />,
    title: "فيسبوك",
    value: "Matgarko",
    description: "تابع آخر الأخبار أو تواصل معنا من خلال الصفحة",
    href: FACEBOOK_URL,
    action: "افتح فيسبوك",
  },
  {
    icon: <Phone className="w-6 h-6 text-purple-500" />,
    title: "الهاتف",
    value: PHONE_DISPLAY,
    description: "يمكنك استخدام نفس الرقم للتواصل أو واتساب",
    href: `tel:+201080312538`,
    action: "اتصل بنا",
  },
];

export const ContactPage = () => {
  return (
    <div className="bg-white" dir="rtl">
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white pt-32 pb-16">
        <div className="container px-4 mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            <MessageCircle className="h-4 w-4" />
            تواصل معنا
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
            نحن هنا لمساعدتك
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            عندك سؤال عن الباقات أو إنشاء المتجر؟ تواصل معنا بالطريقة الأنسب لك،
            والأفضل البدء من واتساب لرد أسرع.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="grid gap-6 md:grid-cols-2">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-lg"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm transition-transform group-hover:scale-110">
                    {method.icon}
                  </div>
                  <h2 className="mb-2 text-xl font-bold text-gray-900 font-heading">
                    {method.title}
                  </h2>
                  <p className="mb-2 font-medium text-primary" dir={method.title === "الهاتف" ? "ltr" : undefined}>
                    {method.value}
                  </p>
                  <p className="mb-5 text-sm leading-relaxed text-gray-500">
                    {method.description}
                  </p>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-primary">
                    {method.action}
                  </span>
                </a>
              ))}
            </div>

            <aside className="rounded-3xl border border-primary/10 bg-primary/5 p-8 lg:p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                <Clock className="h-7 w-7" />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 font-heading">
                أفضل طريقة للتواصل
              </h2>
              <p className="mb-6 leading-relaxed text-gray-600">
                استخدم واتساب لو عندك سؤال سريع عن الأسعار، التجربة المجانية،
                أو خطوات إنشاء المتجر. ولو الاستفسار يحتاج تفاصيل أكثر، أرسل
                لنا على البريد الإلكتروني.
              </p>
              <div className="space-y-3 rounded-2xl bg-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-500">واتساب</span>
                  <span className="font-semibold text-gray-900" dir="ltr">{PHONE_DISPLAY}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-500">الإيميل</span>
                  <span className="font-semibold text-gray-900">{EMAIL}</span>
                </div>
              </div>
              <Button asChild size="lg" className="mt-6 w-full bg-primary text-white hover:bg-primary/90">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  ابدأ المحادثة على واتساب
                </a>
              </Button>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};
