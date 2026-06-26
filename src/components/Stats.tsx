const stats = [
  { value: "50 ج", label: "بداية مناسبة للتجربة" },
  { value: "3", label: "باقات شهرية حسب احتياجك" },
  { value: "دقائق", label: "من التسجيل لأول إعداد" },
  { value: "RTL", label: "تجربة عربية للتاجر والعميل" },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-16 text-white" dir="rtl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-emerald-400 to-transparent" />
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.value}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-xl transition-all hover:-translate-y-1 hover:bg-white/[0.1]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-emerald-400 to-lime-300 opacity-70 transition-opacity group-hover:opacity-100" />
              <div className="mb-2 text-4xl font-black text-white font-heading md:text-5xl" dir={index === 3 ? "ltr" : "rtl"}>
                {stat.value}
              </div>
              <div className="text-sm font-bold leading-relaxed text-gray-300 md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
