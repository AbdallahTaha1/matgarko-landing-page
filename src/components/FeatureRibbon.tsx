import {
  BadgePercent,
  Bot,
  CreditCard,
  LayoutTemplate,
  ShieldCheck,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";

const features = [
  { icon: <LayoutTemplate className="h-4 w-4" />, label: "قوالب جاهزة" },
  { icon: <CreditCard className="h-4 w-4" />, label: "دفع مرن" },
  { icon: <Truck className="h-4 w-4" />, label: "شحن منظم" },
  { icon: <BadgePercent className="h-4 w-4" />, label: "كوبونات وعروض" },
  { icon: <ShieldCheck className="h-4 w-4" />, label: "صفحات ثقة" },
  { icon: <Bot className="h-4 w-4" />, label: "إعداد ذكي" },
  { icon: <Zap className="h-4 w-4" />, label: "تشغيل سريع" },
  { icon: <Sparkles className="h-4 w-4" />, label: "تصميم قابل للتعديل" },
];

export function FeatureRibbon() {
  return (
    <section className="overflow-hidden border-y border-emerald-100 bg-white py-4" dir="rtl">
      <div className="flex w-max animate-marquee-rtl gap-3 px-3">
        {/* First set — crawlable, visible to search engines and screen readers */}
        {features.map((item) => (
          <span
            key={item.label}
            className="inline-flex min-w-max items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-bold text-gray-800 shadow-sm"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </span>
        ))}
        {/* Visual loop copies — hidden from crawlers and screen readers */}
        {[...features, ...features].map((item, index) => (
          <span
            key={`loop-${index}`}
            aria-hidden="true"
            className="inline-flex min-w-max items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-bold text-gray-800 shadow-sm"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}
