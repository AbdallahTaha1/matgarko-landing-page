import { Button } from "@/components/ui/button";
import { Clock, Facebook, Mail, MessageCircle, Phone } from "lucide-react";

const EMAIL = "matgarko.help@gmail.com";
const PHONE_DISPLAY = "+20 108 031 2538";
const WHATSAPP_URL = "https://wa.me/201080312538";
const FACEBOOK_URL = "https://www.facebook.com/matgarko2/";

const contactMethods = [
  {
    icon: <MessageCircle className="w-6 h-6 text-current" />,
    title: "واتساب",
    value: PHONE_DISPLAY,
    description: "الأسرع للتواصل والاستفسار عن إنشاء المتجر",
    href: WHATSAPP_URL,
    action: "تواصل على واتساب",
  },
  {
    icon: <Mail className="w-6 h-6 text-current" />,
    title: "البريد الإلكتروني",
    value: EMAIL,
    description: "للاستفسارات التفصيلية أو طلبات الدعم",
    href: `mailto:${EMAIL}`,
    action: "أرسل إيميل",
  },
  {
    icon: <Facebook className="w-6 h-6 text-current" />,
    title: "فيسبوك",
    value: "Matgarko",
    description: "تابع آخر الأخبار أو تواصل معنا من خلال الصفحة",
    href: FACEBOOK_URL,
    action: "افتح فيسبوك",
  },
  {
    icon: <Phone className="w-6 h-6 text-current" />,
    title: "الهاتف",
    value: PHONE_DISPLAY,
    description: "يمكنك استخدام نفس الرقم للتواصل أو واتساب",
    href: `tel:+201080312538`,
    action: "اتصل بنا",
  },
];

export const ContactPage = () => {
  return (
    <div className="bg-white text-right" dir="rtl">
      <section className="page-hero">
        <div className="container px-4 mx-auto text-center relative z-10">
          <div className="section-kicker mb-5">
            <MessageCircle className="h-4 w-4" />
            تواصل معنا
          </div>
          <h1 className="page-title mb-5">
            نحن هنا لمساعدتك
          </h1>
          <p className="page-lead">
            عندك سؤال عن الباقات أو إنشاء المتجر؟ تواصل معنا بالطريقة الأنسب لك،
            والأفضل البدء من واتساب لرد أسرع.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="grid gap-6 md:grid-cols-2">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="premium-card group p-6"
                >
                  <div className="icon-tile mb-5 h-12 w-12 transition-transform group-hover:scale-110">
                    {method.icon}
                  </div>
                  <h2 className="mb-2 text-xl font-black text-gray-950 font-heading">
                    {method.title}
                  </h2>
                  <p className="mb-2 font-bold text-emerald-700" dir={method.title === "الهاتف" ? "ltr" : undefined}>
                    {method.value}
                  </p>
                  <p className="mb-5 text-sm leading-relaxed text-gray-500">
                    {method.description}
                  </p>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-emerald-700">
                    {method.action}
                  </span>
                </a>
              ))}
            </div>

            <aside className="rounded-lg border border-gray-200 bg-gray-950 p-8 text-white shadow-xl lg:p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-md bg-white/10 text-emerald-300 shadow-sm">
                <Clock className="h-7 w-7" />
              </div>
              <h2 className="mb-4 text-2xl font-black text-white font-heading">
                أفضل طريقة للتواصل
              </h2>
              <p className="mb-6 leading-relaxed text-gray-300">
                استخدم واتساب لو عندك سؤال سريع عن الأسعار، الباقة المجانية،
                أو خطوات إنشاء المتجر. ولو الاستفسار يحتاج تفاصيل أكثر، أرسل
                لنا على البريد الإلكتروني.
              </p>
              <div className="space-y-3 rounded-lg bg-white/10 p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-300">واتساب</span>
                  <span className="font-semibold text-white" dir="ltr">{PHONE_DISPLAY}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-300">الإيميل</span>
                  <span className="font-semibold text-white">{EMAIL}</span>
                </div>
              </div>
              <Button asChild size="lg" className="mt-6 w-full bg-emerald-500 font-extrabold text-gray-950 hover:bg-emerald-400">
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
