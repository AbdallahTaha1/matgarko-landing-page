import { Reveal } from "@/components/motion/Reveal";
import { homeContent } from "@/data/home";
import { SIGNUP_URL } from "@/data/pricing";
import type { AppLanguage } from "@/lib/i18n";
import { WHATSAPP_URL } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export function CTA({ language }: { language: AppLanguage }) {
  const t = homeContent[language].cta;

  return (
    <section className="relative overflow-hidden bg-gray-950 text-white" aria-labelledby="cta-title">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-emerald-400 to-transparent" aria-hidden="true" />
      <div className="absolute -end-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" aria-hidden="true" />

      <div className="container-x relative py-14 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="cta-title" className="text-2xl font-extrabold leading-snug font-heading sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-3 text-base leading-7 text-gray-300 sm:text-lg">{t.lead}</p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={SIGNUP_URL} className="btn btn-accent">
              {t.primary}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark">
              {t.secondary}
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-10 grid max-w-2xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/5 rtl:divide-x-reverse">
          {t.stats.map((stat) => (
            <div key={stat.label} className="px-2 py-4 text-center sm:py-5">
              <p className="num text-lg font-extrabold text-white sm:text-2xl">{stat.value}</p>
              <p className="mt-1 text-[11px] font-semibold text-gray-400 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
