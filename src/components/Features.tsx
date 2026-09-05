import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { homeContent } from "@/data/home";
import type { AppLanguage } from "@/lib/i18n";
import { BadgePercent, Boxes, PackageCheck, Truck } from "lucide-react";

const icons = [Boxes, PackageCheck, Truck, BadgePercent];

export function Features({ language }: { language: AppLanguage }) {
  const t = homeContent[language].features;

  return (
    <section id="features" className="section bg-[#f7faf8]" aria-labelledby="features-title">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="features-title" kicker={t.kicker} title={t.title} lead={t.lead} />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, index) => {
            const Icon = icons[index] ?? Boxes;
            return (
              <Reveal key={item.title} as="article" delay={index * 80} className="premium-card p-5 sm:p-6">
                <div className="icon-tile h-11 w-11">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-extrabold text-gray-950 font-heading sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 sm:leading-7">{item.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
