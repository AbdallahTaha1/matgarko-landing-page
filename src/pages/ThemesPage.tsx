import { StoreShowcase } from "@/components/StoreShowcase";
import {
  ImageIcon,
  LayoutGrid,
  Palette,
  PanelTop,
  Smartphone,
  Type,
} from "lucide-react";

const choices = [
  {
    icon: <Palette className="h-7 w-7" />,
    title: "ألوان جاهزة حسب نشاطك",
    description: "42 مجموعة ألوان متناسقة، مقسمة على 7 أنواع نشاط. اختار اللي يناسب متجرك وشوفه على طول.",
  },
  {
    icon: <ImageIcon className="h-7 w-7" />,
    title: "لوجو متجرك وصورك",
    description: "ارفع اللوجو وصور منتجاتك، والمتجر يعرضها كاملة في كروت مرتبة على الموبايل.",
  },
  {
    icon: <Type className="h-7 w-7" />,
    title: "الخط",
    description: "اختار خط من خطوط عربية واضحة تتقري بسهولة على شاشة الموبايل.",
  },
  {
    icon: <PanelTop className="h-7 w-7" />,
    title: "الهيدر والأزرار",
    description: "حدد شكل الهيدر وشكل الأزرار والحواف عشان المتجر يبان بطابع علامتك.",
  },
  {
    icon: <LayoutGrid className="h-7 w-7" />,
    title: "أقسام الصفحة الرئيسية",
    description: "رتّب صفحتك الرئيسية من أكتر من 20 نوع قسم: سلايدر، عروض، تصنيفات، منتجات وآراء العملاء.",
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
            شكل جاهز مجرب على الموبايل، بألوانك أنت
          </h1>
          <p className="page-lead">
            بدل ما تختار من قوالب كتير: شكل واحد سريع ومجرب على الموبايل، لأن
            أغلب عملائك بيشتروا منه. وأنت تختار الألوان حسب نشاطك واللوجو والخط
            والصور، فيطلع المتجر بطابع علامتك.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {choices.map((choice) => (
            <article key={choice.title} className="premium-card group p-7">
              <div className="icon-tile mb-6 h-12 w-12 transition-transform group-hover:scale-110">
                {choice.icon}
              </div>
              <h2 className="mb-3 text-xl font-black text-gray-950 font-heading">
                {choice.title}
              </h2>
              <p className="leading-relaxed text-gray-600">{choice.description}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-4xl text-center">
          <h2 className="mb-4 text-2xl font-black text-gray-950 font-heading">
            مجموعات الألوان حسب النشاط
          </h2>
          <ul className="flex flex-wrap justify-center gap-3">
            {paletteGroups.map((group) => (
              <li key={group} className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-bold text-gray-700">
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
