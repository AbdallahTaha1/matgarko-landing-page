import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { homeContent } from "@/data/home";
import { SIGNUP_URL, formatEgp, includedInEveryPlan, plans } from "@/data/pricing";
import { localizePath, type AppLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Gift } from "lucide-react";
import { Link } from "react-router-dom";

export function PricingPreview({ language }: { language: AppLanguage }) {
  const t = homeContent[language].pricing;

  return (
    <section id="pricing" className="section band-soft" aria-labelledby="pricing-title">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="pricing-title" kicker={t.kicker} title={t.title} lead={t.lead} />
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-3xl gap-5 md:grid-cols-2">
          {plans.map((plan, index) => (
            <Reveal
              key={plan.id}
              as="article"
              delay={index * 90}
              className={cn(
                "relative flex flex-col rounded-3xl bg-white p-6 sm:p-7",
                plan.popular ? "shadow-[0_0_0_2px_#0e5a52,0_24px_50px_-28px_rgba(14,90,82,0.55)]" : "shadow-[0_0_0_1px_#e3e8e7]",
              )}
            >
              {plan.popular ? (
                <span className="absolute -top-3 start-6 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-extrabold text-white">
                  {t.popular}
                </span>
              ) : null}

              <h3 className="text-lg font-extrabold text-gray-900 font-heading">{plan.name[language]}</h3>
              <p className="mt-0.5 text-xs font-semibold leading-6 text-gray-500">{plan.tagline[language]}</p>

              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="num text-[2rem] font-extrabold leading-tight text-gray-900">{formatEgp(plan.monthly, language)}</span>
                <span className="text-xs font-semibold text-gray-500">/ {t.monthly}</span>
              </div>
              <p className={cn("mt-1 text-sm font-bold", plan.perOrderFee === 0 ? "text-emerald-600" : "text-gray-700")}>
                {plan.perOrderFee === 0 ? t.noPerOrderFee : `+ ${formatEgp(plan.perOrderFee, language)} ${t.perOrder}`}
              </p>

              {plan.perOrderFee > 0 && (
                <>
                  <p className="mt-1 text-xs font-semibold text-emerald-600">{t.fakeFree}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-sun-100 px-3 py-1.5 text-xs font-extrabold text-sun-800">
                    <Gift className="h-3.5 w-3.5" aria-hidden="true" />
                    {t.welcome}
                  </p>
                </>
              )}

              <div className="flex-1" />

              <a
                href={language === "en" ? "/en/register" : SIGNUP_URL}
                className={cn("btn mt-6 w-full", plan.popular ? "btn-primary" : "btn-secondary")}
              >
                {plan.cta[language]}
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-5 max-w-3xl rounded-3xl bg-white p-5 shadow-[0_0_0_1px_#e3e8e7] sm:p-6">
          <p className="text-sm font-extrabold text-gray-900">{t.included}</p>
          <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {includedInEveryPlan[language].map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm leading-6 text-gray-700">
                <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mx-auto mt-4 flex max-w-3xl flex-col items-center justify-between gap-1 text-center sm:flex-row sm:text-start">
          <p className="text-xs leading-6 text-gray-500 sm:text-sm">{t.note}</p>
          <Link
            to={localizePath("/pricing", language)}
            className="inline-flex shrink-0 items-center gap-1.5 py-2 text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            {t.compare}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
