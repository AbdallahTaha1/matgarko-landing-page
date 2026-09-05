import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { homeContent } from "@/data/home";
import { SIGNUP_URL, formatCommission, formatEgp, plans } from "@/data/pricing";
import { localizePath, type AppLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

export function PricingPreview({ language }: { language: AppLanguage }) {
  const t = homeContent[language].pricing;

  return (
    <section id="pricing" className="section bg-[#f7faf8]" aria-labelledby="pricing-title">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="pricing-title" kicker={t.kicker} title={t.title} lead={t.lead} />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal
              key={plan.id}
              as="article"
              delay={index * 90}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white p-5 shadow-sm sm:p-6",
                plan.popular ? "border-emerald-600 shadow-xl shadow-emerald-900/10 ring-1 ring-emerald-600" : "border-gray-200",
              )}
            >
              {plan.popular ? (
                <span className="absolute -top-3 start-5 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-extrabold text-white shadow-md">
                  {t.popular}
                </span>
              ) : null}

              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-extrabold text-gray-950 font-heading">{plan.name[language]}</h3>
                <p className="text-xs font-semibold text-gray-500">{plan.tagline[language]}</p>
              </div>

              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="num text-3xl font-extrabold text-gray-950">{formatEgp(plan.monthly, language)}</span>
                <span className="text-xs font-semibold text-gray-500">/ {t.monthly}</span>
              </div>
              <p className={cn("mt-1 text-sm font-bold", plan.commission === 0 ? "text-emerald-700" : "text-gray-700")}>
                {plan.commission === 0 ? t.noCommission : `+ ${formatCommission(plan)} ${t.commission}`}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-gray-100 pt-5">
                {plan.features[language].slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={SIGNUP_URL}
                className={cn("btn mt-6 w-full", plan.popular ? "btn-primary" : "btn-secondary")}
              >
                {plan.cta[language]}
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-start">
          <p className="text-xs text-gray-500 sm:text-sm">{t.note}</p>
          <Link
            to={localizePath("/pricing", language)}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            {t.compare}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
