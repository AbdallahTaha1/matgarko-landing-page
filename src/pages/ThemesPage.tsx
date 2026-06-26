import { Button } from "@/components/ui/button";
import {
  Brush,
  Laptop,
  LayoutTemplate,
  Monitor,
  Paintbrush,
  Shirt,
  ShoppingBasket,
  Smartphone,
  Sofa,
  Sparkles,
  Utensils,
} from "lucide-react";

const themes = [
  {
    icon: <ShoppingBasket className="h-7 w-7" />,
    name: "متجر عام",
    category: "منتجات متنوعة",
    description: "مناسب للمتاجر التي تبيع أكثر من نوع منتج وتحتاج واجهة واضحة وسهلة التصفح.",
  },
  {
    icon: <Laptop className="h-7 w-7" />,
    name: "إلكترونيات",
    category: "أجهزة وإكسسوارات",
    description: "يعرض المواصفات والأسعار والعروض بشكل منظم ليساعد العميل يقارن ويختار.",
  },
  {
    icon: <Utensils className="h-7 w-7" />,
    name: "مطاعم وأغذية",
    category: "أكل ومنتجات غذائية",
    description: "مناسب للقوائم، المنتجات السريعة، والعروض اليومية مع تجربة طلب بسيطة.",
  },
  {
    icon: <Sofa className="h-7 w-7" />,
    name: "أثاث وديكور",
    category: "منزل وديكور",
    description: "يركز على عرض المنتجات بتفاصيل واضحة ومساحات مناسبة للوصف والمقاسات.",
  },
  {
    icon: <Shirt className="h-7 w-7" />,
    name: "موضة وملابس",
    category: "ملابس وإكسسوارات",
    description: "مصمم لعرض المقاسات والألوان والتصنيفات بطريقة سهلة للعميل.",
  },
  {
    icon: <Sparkles className="h-7 w-7" />,
    name: "جمال وعناية",
    category: "Cosmetics",
    description: "مناسب لمنتجات العناية والجمال مع مساحة لوصف الاستخدام والمكونات.",
  },
];

const features = [
  { icon: <Monitor className="h-4 w-4" />, label: "متجاوب" },
  { icon: <Smartphone className="h-4 w-4" />, label: "مناسب للجوال" },
  { icon: <Paintbrush className="h-4 w-4" />, label: "قابل للتخصيص" },
];

export function ThemesPage() {
  return (
    <div className="min-h-screen bg-white text-right" dir="rtl">
      <section className="page-hero">
        <div className="container mx-auto px-4 text-center md:px-6">
          <div className="section-kicker mb-5">
            <LayoutTemplate className="w-4 h-4" />
            قوالب جاهزة لتبدأ أسرع
          </div>
          <h1 className="page-title mb-5">
            اختر شكل المتجر المناسب لنشاطك
          </h1>
          <p className="page-lead">
            بدل ما تبدأ من صفحة فارغة، اختر قالب مناسب لنوع تجارتك ثم عدل
            الألوان والمحتوى والصفحات بما يناسب علامتك التجارية.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:px-6">

        <div className="mx-auto mb-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {["الكل", "متاجر عامة", "إلكترونيات", "مطاعم", "ديكور", "جمال"].map((label, index) => (
            <Button key={label} variant={index === 0 ? "outline" : "ghost"} className="rounded-full border-gray-200 font-bold hover:bg-emerald-50 hover:text-emerald-700">
              {label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => (
            <article
              key={theme.name}
              className="premium-card group p-7"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="icon-tile h-12 w-12 transition-transform group-hover:scale-110">
                  {theme.icon}
                </div>
                <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-bold text-gray-600">
                  {theme.category}
                </span>
              </div>

              <h3 className="mb-3 text-xl font-black text-gray-950 font-heading">
                {theme.name}
              </h3>
              <p className="mb-6 leading-relaxed text-gray-600">{theme.description}</p>

              <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5 text-sm text-gray-500">
                {features.map((feature) => (
                  <span key={feature.label} className="inline-flex items-center gap-1.5">
                    {feature.icon}
                    {feature.label}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-lg border border-gray-200 bg-gray-950 p-8 text-center text-white shadow-xl">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-white/10 text-emerald-300">
            <Brush className="h-6 w-6" />
          </div>
          <h2 className="mb-3 text-2xl font-black text-white font-heading">
            كل قالب قابل للتعديل
          </h2>
          <p className="mx-auto max-w-2xl text-gray-300 leading-relaxed">
            يمكنك تغيير الألوان، ترتيب الأقسام، النصوص، الصفحات، وبيانات التواصل
            حتى يظهر المتجر بشكل مناسب لنشاطك.
          </p>
        </div>
      </div>
    </div>
  );
}
