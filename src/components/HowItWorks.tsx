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

        <ol className="mt-9 grid gap-4 sm:grid-cols-3">
          {t.items.map((step, index) => (
            <Reveal key={step.title} as="li" delay={index * 100} className="flex gap-4 rounded-3xl bg-white p-5 shadow-[0_0_0_1px_#e3e8e7] sm:block sm:p-6">
              <span className="num flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-base font-extrabold text-white">
                {index + 1}
              </span>
              <div className="min-w-0 sm:mt-4">
                <h3 className="text-base font-extrabold leading-8 text-gray-900 font-heading sm:text-lg">{step.title}</h3>
                <p className="mt-1 text-sm leading-7 text-gray-600">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-6 text-center">
          <Link
            to={localizePath("/getting-started", language)}
            className="inline-flex items-center gap-1.5 py-2 text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
