import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { homeContent } from "@/data/home";
import { localizePath, type AppLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ArrowRight, BadgePercent, BarChart3, Boxes, CreditCard, Megaphone, MessageCircleMore, MousePointerClick, PackageCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const icons = [Boxes, PackageCheck, CreditCard, Truck, BadgePercent, Megaphone, MousePointerClick, MessageCircleMore, BarChart3];

export function Features({ language }: { language: AppLanguage }) {
  const t = homeContent[language].features;

  return (
    <section id="features" className="section bg-white" aria-labelledby="features-title">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="features-title" kicker={t.kicker} title={t.title} lead={t.lead} />
        </Reveal>

        {/* On a phone one compact list (icon beside the text) instead of nine tall cards. */}
        <div className="mt-8 divide-y divide-gray-100 overflow-hidden rounded-3xl bg-white shadow-[0_0_0_1px_#e3e8e7] sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-4 sm:divide-y-0 sm:overflow-visible sm:rounded-none sm:bg-transparent sm:shadow-none lg:grid-cols-3">
          {t.items.map((item, index) => {
            const Icon = icons[index] ?? Boxes;
            return (
              <Reveal
                key={item.title}
                as="article"
                delay={(index % 3) * 70}
                className="flex gap-3.5 p-4 sm:block sm:rounded-3xl sm:bg-white sm:p-6 sm:shadow-[0_0_0_1px_#e3e8e7] sm:transition-transform sm:duration-300 sm:hover:-translate-y-1"
              >
                <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl", index % 3 === 1 ? "bg-sun-100 text-sun-700" : "bg-emerald-50 text-emerald-600")}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-extrabold leading-7 text-gray-900 font-heading sm:mt-4 sm:text-lg sm:leading-8">{item.title}</h3>
                  <p className="mt-0.5 text-sm leading-7 text-gray-600 sm:mt-1.5">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <Link to={localizePath("/solutions", language)} className="inline-flex items-center gap-1.5 py-2 text-sm font-bold text-emerald-700 hover:text-emerald-800">
            {t.more}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
