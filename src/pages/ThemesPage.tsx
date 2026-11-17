import { TemplatePhones } from "@/components/HomeSections";
import { StoreShowcase } from "@/components/StoreShowcase";
import { SIGNUP_URL } from "@/data/pricing";
import {
  ArrowRight,
  Code2,
  History,
  ImageIcon,
  LayoutGrid,
  Palette,
  PanelTop,
  Smartphone,
  Sparkles,
  Type,
} from "lucide-react";

const choices = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "«صمّم متجري» بالذكاء الاصطناعي",
    description: "اكتب إنت بتبيع إيه والشكل اللي تحبه، ويقترحلك شكل كامل لمتجرك تشوفه قبل ما تستخدمه.",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "ألوان جاهزة حسب نشاطك",
    description: "42 مجموعة ألوان متناسقة، مقسمة على 7 أنواع نشاط. اختار اللي يناسب متجرك وشوفه على طول.",
  },
  {
    icon: <ImageIcon className="h-6 w-6" />,
    title: "لوجو متجرك وصورك",
    description: "ارفع اللوجو وصور منتجاتك، واختار شكل الصور مربعة أو طولية، والمتجر يعرضها في كروت مرتبة على الموبايل.",
  },
  {
    icon: <Type className="h-6 w-6" />,
    title: "الخطوط",
    description: "اختار خط المتجر من خطوط عربية واضحة تتقري بسهولة على الموبايل، وخط مختلف للعناوين لو تحب.",
  },
  {
    icon: <PanelTop className="h-6 w-6" />,
    title: "أعلى المتجر وأسفله",
    description: "اختار شكل أعلى المتجر، ومنه شكل فوق صورة الغلاف، وشكل أسفل المتجر ولونه، وشكل الأزرار والحواف.",
  },
  {
    icon: <LayoutGrid className="h-6 w-6" />,
    title: "أقسام الصفحة الرئيسية",
    description: "رتّب صفحتك الرئيسية من أكتر من 20 نوع قسم: سلايدر، عروض، تصنيفات، منتجات، آراء العملاء وأسئلة شائعة، واختار لون خلفية كل قسم.",
  },
  {
    icon: <History className="h-6 w-6" />,
    title: "النسخ المحفوظة",
    description: "احفظ شكل متجرك الحالي، وجرّب براحتك، وارجع لأي نسخة سابقة بلمسة.",
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "للمتقدمين",
    description: "أضف CSS خاص، أو قسم بتصميمك بـHTML وCSS في الصفحة الرئيسية. صفحة الدفع ما بتتأثرش.",
  },
];

const paletteGroups = ["متنوع", "أزياء", "إلكترونيات", "تجميل وعناية", "أطعمة ومشروبات", "أطفال وألعاب", "منزل وديكور"];

export function ThemesPage() {
  return (
    <div className="min-h-screen bg-white text-right" dir="rtl">
      <section className="page-hero">
        <div className="container mx-auto px-4 text-center md:px-6">
          <div className="section-kicker mb-5">
            <Smartphone className="w-4 h-4" />
            تصميم المتجر
          </div>
          <h1 className="page-title mb-5">
            ستة قوالب جاهزة لمتجرك، بألوانك وشعارك
          </h1>
          <p className="page-lead">
            اختار قالب من ستة وشوف متجرك بيه قبل ما تستخدمه، أو اكتب إنت بتبيع إيه
            و«صمّم متجري» يقترحلك شكل كامل. كل القوالب مجربة على الموبايل، لأن أغلب
            عملائك بيشتروا منه، ومنتجاتك وكلامك بيفضلوا زي ما هما لما تغيّر القالب.
          </p>
          <a href={SIGNUP_URL} className="btn btn-primary mt-7">
            أنشئ متجرك مجاناً
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="band-soft overflow-hidden py-12 sm:py-16" aria-labelledby="themes-templates-title">
        <div className="container-x">
          <h2 id="themes-templates-title" className="section-title text-center">القوالب الستة</h2>
          <p className="section-lead mx-auto mt-3 max-w-2xl text-center">
            ناعم، أنيق، قوي، طبيعي، سوق وكلاسيك. كل قالب بشكل مختلف لأعلى المتجر والعناوين وكروت المنتجات.
          </p>
          <div className="mt-9">
            <TemplatePhones language="ar" />
          </div>
          <p className="mt-4 text-center text-xs text-gray-400">الصور من متاجر تجريبية بكل قالب.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 md:px-6 sm:py-16">
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <h2 className="section-title">وبعد القالب، كل حاجة بتتغير بإيدك</h2>
          <p className="section-lead mt-3">من «تصميم المتجر» و«واجهة المتجر» في لوحة التحكم، من غير مبرمج.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
          {choices.map((choice, index) => (
            <article key={choice.title} className="premium-card group flex gap-3.5 p-5 md:block md:p-6">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 md:mb-5 ${index === 0 ? "bg-sun-100 text-sun-700" : "bg-emerald-50 text-emerald-600"}`}>
                {choice.icon}
              </div>
              <div className="min-w-0">
                <h3 className="mb-1.5 text-lg font-extrabold leading-8 text-gray-900 font-heading">
                  {choice.title}
                </h3>
                <p className="text-sm leading-7 text-gray-600">{choice.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-4xl text-center">
          <h2 className="mb-4 text-2xl font-extrabold leading-10 text-gray-900 font-heading">
            مجموعات الألوان حسب النشاط
          </h2>
          <ul className="flex flex-wrap justify-center gap-3">
            {paletteGroups.map((group) => (
              <li key={group} className="rounded-full bg-gray-50 px-4 py-2 text-sm font-bold text-gray-700 shadow-[0_0_0_1px_#e3e8e7]">
                {group}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <StoreShowcase language="ar" />
    </div>
  );
}
