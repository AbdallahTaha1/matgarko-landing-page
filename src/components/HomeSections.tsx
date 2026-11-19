import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { HOME_UPDATED, homeContent } from "@/data/home";
import { SIGNUP_URL } from "@/data/pricing";
import { localizePath, type AppLanguage } from "@/lib/i18n";
import { useRememberedStore } from "@/lib/storeAccess";
import { cn } from "@/lib/utils";
import { ArrowRight, Ban, CheckCircle2, CreditCard, ShieldAlert, ShieldCheck, Sparkles, Store, Truck, Wallet, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const whatIsIcons = [Store, CreditCard, Truck, Wallet];

/**
 * «ما هي متجركو؟»: a plain definition, who it is for, four facts and a fact sheet. Search engines
 * and AI assistants quote this block, so every sentence stands on its own and names the product.
 */
export function WhatIs({ language }: { language: AppLanguage }) {
  const t = homeContent[language].whatIs;
  return (
    <section id="what-is" className="section band-soft" aria-labelledby="what-is-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
          <Reveal>
            <SectionHeading id="what-is-title" kicker={t.kicker} title={t.title} align="start" />
            <p className="mt-4 text-base leading-8 text-gray-700 sm:text-lg sm:leading-9">{t.text}</p>
            <p className="mt-4 rounded-2xl bg-white p-4 text-sm font-semibold leading-7 text-gray-700 shadow-[0_0_0_1px_#e3e8e7] sm:text-base sm:leading-8">{t.audience}</p>
          </Reveal>

          <div className="grid content-start gap-3 sm:grid-cols-2 sm:gap-4">
            {t.cards.map((card, index) => {
              const Icon = whatIsIcons[index] ?? Store;
              return (
                <Reveal key={card.title} as="article" delay={index * 70} className="flex gap-3.5 rounded-3xl bg-white p-4 shadow-[0_0_0_1px_#e3e8e7] sm:block sm:p-6">
                  <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl", index % 2 ? "bg-sun-100 text-sun-700" : "bg-emerald-50 text-emerald-600")}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-extrabold leading-8 text-gray-900 font-heading sm:mt-4 sm:text-lg">{card.title}</h3>
                    <p className="mt-0.5 text-sm leading-7 text-gray-600 sm:mt-1.5">{card.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className="mt-6 rounded-3xl bg-white p-5 shadow-[0_0_0_1px_#e3e8e7] sm:p-7 lg:mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-base font-extrabold text-gray-900 font-heading sm:text-lg">{t.factsTitle}</h3>
            <p className="text-xs text-gray-400">
              <time dateTime={HOME_UPDATED}>{t.updated}</time>
            </p>
          </div>
          <dl className="mt-3 grid text-sm sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
            {t.facts.map((fact) => (
              <div key={fact.label} className="border-t border-gray-100 py-3">
                <dt className="text-xs font-bold text-emerald-600">{fact.label}</dt>
                <dd className="mt-0.5 leading-7 text-gray-800">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/** The fake-order shield as merchants see it: an order list with warning chips, on the deep teal band. */
export function FakeOrderShield({ language }: { language: AppLanguage }) {
  const t = homeContent[language].shield;
  return (
    <section className="section band-dark overflow-hidden" aria-labelledby="shield-title">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <SectionHeading id="shield-title" kicker={t.kicker} title={t.title} lead={t.lead} align="start" tone="dark" />
          <ul className="mt-6 space-y-3">
            {t.points.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm leading-7 text-emerald-100 sm:text-base sm:leading-8">
                <CheckCircle2 className="mt-1.5 h-4 w-4 shrink-0 text-sun-400" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto max-w-md text-gray-900" aria-hidden="true">
            <div className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3.5">
                <p className="text-sm font-extrabold text-gray-900">{t.listTitle}</p>
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
              </div>
              <ul className="divide-y divide-gray-100">
                {t.orders.map((order) => (
                  <li key={order.number} className={cn("flex items-center gap-3 px-4 py-3", order.tone === "danger" && "bg-red-50", order.tone === "warn" && "bg-amber-50")}>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900"><span className="num" dir="ltr">{order.number}</span> · {order.place}</p>
                      {order.flag ? (
                        <span className={cn("mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold", order.tone === "danger" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800")}>
                          <ShieldAlert className="h-3 w-3" />
                          {order.flag}
                        </span>
                      ) : null}
                    </div>
                    <span className="num shrink-0 text-sm font-extrabold text-gray-900">{order.amount}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 bg-gray-950 px-4 py-3.5 text-xs font-bold text-white sm:text-sm">
                <Ban className="h-4 w-4 shrink-0 text-sun-400" />
                {t.free}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * The ready templates as phone screens, each opening its demo store: a row that scrolls sideways on phones,
 * rows of five on wide screens with a short last row centred. The home page shows the first ten, the store
 * design page all of them.
 */
export function TemplatePhones({ language, limit }: { language: AppLanguage; limit?: number }) {
  const t = homeContent[language].templates;
  const items = limit ? t.items.slice(0, limit) : t.items;
  return (
    <ul className="scrollbar-none -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-wrap lg:justify-center lg:gap-x-5 lg:gap-y-9 lg:overflow-visible lg:px-0">
      {items.map((item) => (
        <li key={item.key} className="relative w-[215px] shrink-0 snap-start sm:w-[230px] lg:w-[calc(20%-1rem)]">
          <a
            href={`https://demo-${item.key}.matgarko.com/`}
            target="_blank"
            rel="noopener"
            aria-label={t.open(item.name)}
            className="block overflow-hidden rounded-[1.5rem] border-[5px] border-gray-950 bg-gray-950 shadow-[0_20px_40px_-24px_rgba(10,33,30,0.55)] transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <img
              src={`/templates/${item.key}.webp`}
              alt={t.alt(item.name, item.kind)}
              width={480}
              height={935}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full rounded-[1.1rem]"
            />
          </a>
          <p className="mt-3 text-center text-sm font-extrabold text-gray-900">{item.name}</p>
          <p className="text-center text-xs leading-6 text-gray-500">{item.kind}</p>
        </li>
      ))}
    </ul>
  );
}

/** Ten of the ready templates as phone screens, a way to the rest, and the AI designer beside them. */
export function Templates({ language }: { language: AppLanguage }) {
  const t = homeContent[language].templates;
  return (
    <section id="templates" className="section band-soft overflow-hidden" aria-labelledby="templates-title">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="templates-title" kicker={t.kicker} title={t.title} lead={t.lead} />
        </Reveal>

        <Reveal className="mt-9">
          <TemplatePhones language={language} limit={10} />
        </Reveal>

        <Reveal className="mx-auto mt-8 flex max-w-3xl items-start gap-4 rounded-3xl bg-white p-5 shadow-[0_0_0_1px_#e3e8e7] sm:items-center sm:p-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sun-100 text-sun-700">
            <Sparkles className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="flex flex-wrap items-center gap-2 text-base font-extrabold text-gray-900 font-heading sm:text-lg">
              {t.aiTitle}
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">{t.aiBadge}</span>
            </h3>
            <p className="mt-1 text-sm leading-7 text-gray-600">{t.aiText}</p>
          </div>
        </Reveal>

        <div className="mt-5 flex flex-col items-center gap-1 text-center">
          <Link to={localizePath("/themes", language)} className="inline-flex items-center gap-1.5 py-2 text-sm font-bold text-emerald-700 hover:text-emerald-800">
            {t.more}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
          <p className="text-xs text-gray-400">{t.note}</p>
        </div>
      </div>
    </section>
  );
}

/** Matgarko against EasyOrders in three rows, linking to the full comparison. */
export function VersusEasyOrders({ language }: { language: AppLanguage }) {
  const t = homeContent[language].versus;
  return (
    <section className="section bg-white" aria-labelledby="versus-title">
      <div className="container-x max-w-4xl">
        <Reveal>
          <SectionHeading id="versus-title" kicker={t.kicker} title={t.title} lead={t.lead} />
        </Reveal>
        <Reveal delay={80} className="mt-8">
          <div className="card overflow-hidden">
            <table className="w-full table-fixed text-sm sm:text-base">
              <thead>
                <tr className="border-b border-gray-100">
                  <th scope="col" className="w-[30%] px-3 py-3.5 text-start text-xs font-semibold text-gray-500 sm:px-5 sm:text-sm"><span className="sr-only">{language === "en" ? "What" : "البند"}</span></th>
                  <th scope="col" className="bg-emerald-50 px-3 py-3.5 text-start font-extrabold text-emerald-700 sm:px-5">{t.us}</th>
                  <th scope="col" className="px-3 py-3.5 text-start font-bold text-gray-600 sm:px-5">{t.them}</th>
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row) => (
                  <tr key={row.label} className="border-b border-gray-100 last:border-0">
                    <th scope="row" className="px-3 py-4 text-start text-xs font-semibold leading-6 text-gray-600 sm:px-5 sm:text-sm">{row.label}</th>
                    <td className="bg-emerald-50 px-3 py-4 text-[13px] font-extrabold leading-6 text-gray-900 sm:px-5 sm:text-base">
                      <span className="inline-flex items-start gap-1.5"><CheckCircle2 className="mt-1 hidden h-4 w-4 shrink-0 text-emerald-600 sm:block" aria-hidden="true" />{row.us}</span>
                    </td>
                    <td className="px-3 py-4 text-xs leading-6 text-gray-600 sm:px-5 sm:text-base">
                      <span className="inline-flex items-start gap-1.5"><X className="mt-1 hidden h-4 w-4 shrink-0 text-gray-400 sm:block" aria-hidden="true" />{row.them}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-6 text-gray-500">{t.note}</p>
            <Link to={localizePath("/compare/easyorders", language)} className="inline-flex shrink-0 items-center gap-1.5 py-2 text-sm font-bold text-emerald-700 hover:text-emerald-800">
              {t.link}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * A signup bar fixed to the bottom of a phone's screen once the hero's own button has scrolled
 * away. It is added by script after load, so the prerendered page and its first screen (short in
 * the Facebook, Instagram and TikTok in-app browsers) are never covered.
 */
export function StickyCta({ language }: { language: AppLanguage }) {
  const t = homeContent[language].sticky;
  const store = useRememberedStore();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const update = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 700;
      setShown(window.scrollY > 640 && !nearEnd);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // The floating WhatsApp button steps up while the bar is on screen (see .wa-float in index.css).
  useEffect(() => {
    document.documentElement.toggleAttribute("data-signup-bar", shown);
    return () => document.documentElement.removeAttribute("data-signup-bar");
  }, [shown]);

  if (!shown) return null;

  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white px-4 pt-3 shadow-[0_-12px_30px_-18px_rgba(10,33,30,0.35)] lg:hidden">
      <div className="mx-auto flex max-w-xl items-center gap-3">
        <p className="min-w-0 flex-1 text-xs font-bold leading-5 text-gray-700">{t.text}</p>
        <a href={store?.adminUrl || (language === "en" ? "/en/register" : SIGNUP_URL)} className="btn btn-primary min-h-11 shrink-0 px-5 text-sm">
          {store ? (language === "en" ? "Dashboard" : "لوحة التحكم") : t.cta}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
