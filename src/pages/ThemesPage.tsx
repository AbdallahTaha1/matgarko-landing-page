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
    <div className="min-h-screen bg-gray-50 py-24" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            <LayoutTemplate className="w-4 h-4" />
            قوالب جاهزة لتبدأ أسرع
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-gray-900">
            اختر شكل المتجر المناسب لنشاطك
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            بدل ما تبدأ من صفحة فارغة، اختر قالب مناسب لنوع تجارتك ثم عدل
            الألوان والمحتوى والصفحات بما يناسب علامتك التجارية.
          </p>
        </div>

        <div className="mx-auto mb-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {["الكل", "متاجر عامة", "إلكترونيات", "مطاعم", "ديكور", "جمال"].map((label, index) => (
            <Button key={label} variant={index === 0 ? "outline" : "ghost"} className="rounded-full">
              {label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => (
            <article
              key={theme.name}
              className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  {theme.icon}
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  {theme.category}
                </span>
              </div>

              <h3 className="mb-3 text-2xl font-bold text-gray-900 font-heading">
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

        <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-primary/10 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Brush className="h-6 w-6" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900 font-heading">
            كل قالب قابل للتعديل
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 leading-relaxed">
            يمكنك تغيير الألوان، ترتيب الأقسام، النصوص، الصفحات، وبيانات التواصل
            حتى يظهر المتجر بشكل مناسب لنشاطك.
          </p>
        </div>
      </div>
    </div>
  );
}
