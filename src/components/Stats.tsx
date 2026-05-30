const stats = [
  { value: "50 ج", label: "بداية مناسبة للتجربة" },
  { value: "3", label: "باقات شهرية حسب احتياجك" },
  { value: "دقائق", label: "لإنشاء متجرك وبدء الإعداد" },
  { value: "عربي", label: "واجهة سهلة للتاجر والعميل" },
];

export function Stats() {
  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden" dir="rtl">
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 text-center">
          {stats.map((stat, index) => (
            <div
              key={stat.value}
              className={`relative px-4 py-2 ${
                index < stats.length - 1
                  ? "md:after:absolute md:after:left-0 md:after:top-1/2 md:after:h-20 md:after:w-px md:after:-translate-y-1/2 md:after:bg-white/15"
                  : ""
              }`}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 font-heading" dir="ltr">
                {stat.value}
              </div>
              <div className="text-primary-foreground/80 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
