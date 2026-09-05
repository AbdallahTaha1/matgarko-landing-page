import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { homeContent } from "@/data/home";
import { localizePath, type AppLanguage } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function HowItWorks({ language }: { language: AppLanguage }) {
  const t = homeContent[language].steps;

  return (
    <section className="section bg-white" aria-labelledby="steps-title">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="steps-title" kicker={t.kicker} title={t.title} lead={t.lead} />
        </Reveal>

        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {t.items.map((step, index) => (
            <Reveal key={step.title} as="li" delay={index * 100} className="relative flex gap-4 sm:block">
              <div className="flex flex-col items-center sm:mb-4 sm:items-start">
                <span className="num flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-950 text-sm font-extrabold text-white shadow-md shadow-gray-950/20">
                  {index + 1}
                </span>
                {index < t.items.length - 1 ? <span className="mt-2 w-px flex-1 bg-gray-200 sm:hidden" aria-hidden="true" /> : null}
              </div>
              <div className="pb-2 sm:pb-0">
                <h3 className="text-base font-extrabold text-gray-950 font-heading sm:text-lg">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-gray-600 sm:leading-7">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-8 text-center">
          <Link
            to={localizePath("/getting-started", language)}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
