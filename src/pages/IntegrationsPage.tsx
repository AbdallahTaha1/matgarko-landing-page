import { SIGNUP_URL } from "@/data/pricing";
import { ArrowRight, Banknote, ClipboardList, Megaphone, MessageCircle, Truck } from "lucide-react";

const groups = [
  {
    icon: <Banknote className="h-6 w-6 text-current" />,
    title: "الدفع",
    description: "العميل يختار طريقة الدفع وهو بيطلب، والفلوس بتوصل لحسابك إنت. متجركو ما بياخدش نسبة منها.",
    items: ["الدفع عند الاستلام", "تحويل إنستاباي أو محفظة بصورة التحويل", "بطاقات عبر حسابك في Paymob أو Kashier", "رسوم تحصيل وحد أدنى وأقصى للطلب"],
  },
  {
    icon: <Truck className="h-6 w-6 text-current" />,
    title: "الشحن",
    description: "جمّع المحافظات في مناطق توصيل بسعر لكل منطقة، عشان العميل يعرف التكلفة قبل تأكيد الطلب. متجركو ما بيوصّلش الطلبات: إنت بتشحن مع شركتك أو مندوبك.",
    items: ["مناطق توصيل بسعر لكل منطقة", "قالب جاهز لمحافظات مصر", "شحن مجاني بحد أدنى للطلب", "شريط «باقي كذا على الشحن المجاني»"],
  },
  {
    icon: <Megaphone className="h-6 w-6 text-current" />,
    title: "الإعلانات والتحليلات",
    description: "اربط حساباتك من «البيكسل والتحليلات» بدون مبرمج، وأحداث الشراء توصل لإعلاناتك من المتصفح ومن السيرفر.",
    items: ["Meta Pixel وConversions API", "بكسل TikTok", "Google Analytics وSearch Console", "كتالوج منتجات لـMeta وTikTok وGoogle"],
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-current" />,
    title: "واتساب",
    description: "خلّي عملاءك يكلموك بسهولة، وأكّد كل طلب برسالة جاهزة تبعتها من واتساب بتاعك.",
    items: ["زر واتساب عائم في المتجر", "رسالة تأكيد الطلب جاهزة", "متابعة الطلبات اللي ما اكتملتش", "روابط فيسبوك وإنستجرام وتيك توك"],
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
            استقبل الطلبات بالدفع عند الاستلام، أو بتحويل إنستاباي، أو بالبطاقة عبر حسابك في Paymob أو Kashier. حدد تكلفة التوصيل بوضوح لعملائك، واربط بكسل ميتا وتيك توك وGoogle Analytics وواتساب بمتجرك.
          </p>
          <a href={SIGNUP_URL} className="btn btn-primary mt-7">
            أنشئ متجرك مجاناً
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </a>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 md:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {groups.map((group) => (
            <div key={group.title} className="premium-card min-w-0 p-5 sm:p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="icon-tile h-12 w-12 shrink-0">{group.icon}</div>
                <h2 className="text-xl font-extrabold text-gray-900 font-heading">{group.title}</h2>
              </div>
              <p className="mb-5 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">{group.description}</p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {group.items.map((name) => (
                  <li
                    key={name}
                    className="flex min-h-16 items-center justify-center rounded-2xl bg-gray-50 p-3.5 text-center text-sm font-bold leading-6 text-gray-700 shadow-[0_0_0_1px_#eef2f2]"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="band-dark mt-10 flex flex-col items-center gap-5 rounded-3xl p-7 text-white md:flex-row md:p-9">
          <ClipboardList className="h-10 w-10 shrink-0 text-sun-400" />
          <div>
            <h2 className="mb-2 text-2xl font-extrabold leading-10 text-white font-heading">من الطلب إلى التسليم</h2>
            <p className="leading-8 text-emerald-100">
              راجع بيانات الطلب وتواصل مع العميل للتأكيد، وأكّد استلام التحويلات من «المدفوعات» بضغطة، ثم جهّز المنتجات للتسليم.
              وضّح للعميل تكلفة التوصيل والموعد المتوقع لاستلام طلبه.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
