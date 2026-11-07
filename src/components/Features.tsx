import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { homeContent } from "@/data/home";
import type { AppLanguage } from "@/lib/i18n";
import { BadgePercent, BarChart3, Boxes, LayoutTemplate, Megaphone, MousePointerClick, PackageCheck, Truck } from "lucide-react";

const icons = [Boxes, PackageCheck, Truck, BadgePercent, Megaphone, MousePointerClick, BarChart3, LayoutTemplate];

export function Features({ language }: { language: AppLanguage }) {
  const t = homeContent[language].features;

  return (
    <section id="features" className="section bg-[#f7faf8]" aria-labelledby="features-title">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="features-title" kicker={t.kicker} title={t.title} lead={t.lead} />
        </Reveal>

        {/* On a phone one compact list (icon beside the text) instead of eight tall cards. */}
        <div className="mt-8 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-4 sm:divide-y-0 sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent sm:shadow-none lg:grid-cols-4">
          {t.items.map((item, index) => {
            const Icon = icons[index] ?? Boxes;
            return (
              <Reveal
                key={item.title}
                as="article"
                delay={index * 60}
                className="flex gap-3.5 p-4 sm:block sm:rounded-2xl sm:border sm:border-gray-200 sm:bg-white sm:p-6 sm:shadow-sm sm:transition-all sm:duration-300 sm:hover:-translate-y-1 sm:hover:border-emerald-200 sm:hover:shadow-xl sm:hover:shadow-emerald-900/5"
              >
                <div className="icon-tile h-10 w-10 shrink-0 sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-extrabold leading-7 text-gray-950 font-heading sm:mt-4 sm:text-lg">{item.title}</h3>
                  <p className="mt-0.5 text-sm leading-6 text-gray-600 sm:mt-2 sm:leading-7">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
