import { homeContent } from "@/data/home";
import { SIGNUP_URL } from "@/data/pricing";
import { localizePath, type AppLanguage } from "@/lib/i18n";
import { useRememberedStore } from "@/lib/storeAccess";
import { ArrowRight, Bell, Check, CheckCircle2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { GooglePlayBadge } from "./GooglePlayBadge";
import { StoreAccessHint } from "./StoreAccessHint";

const barHeights = [
  ["38%", "55%", "44%", "70%", "58%", "82%", "100%"],
  ["50%", "34%", "62%", "48%", "76%", "66%", "100%"],
];

/** The dashboard and a store on a phone, drawn in HTML so they stay sharp and weigh nothing. */
function HeroVisual({ language }: { language: AppLanguage }) {
  const t = homeContent[language].hero.mock;

  return (
    <div className="relative order-1 mx-auto mt-9 w-full min-w-0 max-w-[440px] lg:order-none lg:mt-0 lg:max-w-[470px]">
      <div className="absolute -inset-x-6 -top-6 bottom-10 -z-10 rounded-[3rem] bg-emerald-100/70 blur-3xl" aria-hidden="true" />

      <div aria-hidden="true" className="rounded-3xl bg-white p-4 pb-24 text-start shadow-[0_0_0_1px_#e3e8e7,0_30px_60px_-30px_rgba(14,90,82,0.45)] sm:p-5 sm:pb-28">
        <div className="flex items-center justify-between">
          <p className="text-sm font-extrabold text-gray-900">{t.dashboard}</p>
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <Bell className="h-4 w-4" />
            <span className="num absolute -end-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-sun-500 text-[9px] font-extrabold text-gray-950">3</span>
          </span>
        </div>

        <p className="mt-3 text-base font-extrabold text-gray-900">{t.greeting}</p>
        <p className="mt-0.5 text-xs leading-5 text-gray-500">{t.waiting}</p>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {t.stats.map((stat, index) => (
            <div key={stat.label} className="rounded-2xl bg-gray-50 p-3">
              <p className="text-[11px] text-gray-500">{stat.label}</p>
              <p className="num mt-0.5 whitespace-nowrap text-sm font-extrabold text-gray-900 sm:text-base">{stat.value}</p>
              <div className="mt-2 flex h-7 items-end gap-1" dir="ltr">
                {barHeights[index].map((height, bar) => (
                  <span key={bar} className={bar === 6 ? "w-full rounded-sm bg-emerald-600" : "w-full rounded-sm bg-emerald-200"} style={{ height }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs font-extrabold text-gray-900">{t.ordersTitle}</p>
        <ul className="mt-1 divide-y divide-gray-100">
          {t.orders.map((order) => (
            <li key={order.name} className="flex items-center gap-2 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-gray-900">{order.name}</p>
                <p className="num mt-0.5 truncate text-[11px] text-gray-500">{order.place} · {order.amount}</p>
              </div>
              {order.action ? (
                <span className="shrink-0 whitespace-nowrap rounded-full bg-emerald-600 px-2.5 py-1.5 text-[10px] font-bold text-white">{order.action}</span>
              ) : (
                <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-700">
                  <Check className="h-3 w-3" />
                  {order.done}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Under the dashboard: the new-order note on one side, the store on a phone on the other. */}
      <div className="relative -mt-20 flex items-start justify-between gap-3 px-3 sm:-mt-24 sm:px-5">
        <div className="mt-[52px] min-w-0 sm:mt-[60px]">
          <div aria-hidden="true" className="animate-float-panel flex items-center gap-2.5 rounded-2xl bg-white p-2.5 pe-4 text-start shadow-[0_0_0_1px_#e3e8e7,0_18px_36px_-18px_rgba(14,90,82,0.5)]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sun-100 text-sun-700">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-extrabold text-gray-900">{t.toast.title}</span>
              <span className="num block truncate text-[11px] text-gray-500">{t.toast.text}</span>
            </span>
          </div>
          <p className="mt-3 text-start text-[11px] leading-5 text-gray-400">{t.caption}</p>
        </div>

        <div className="w-[128px] shrink-0 overflow-hidden rounded-[1.6rem] border-[5px] border-gray-950 bg-gray-950 shadow-[0_24px_48px_-20px_rgba(10,33,30,0.6)] sm:w-[160px]">
          <img
            src="/templates/soft.webp"
            alt={t.storeAlt}
            width={480}
            height={935}
            decoding="async"
            className="block h-auto w-full rounded-[1.2rem]"
          />
        </div>
      </div>
    </div>
  );
}

export function Hero({ language }: { language: AppLanguage }) {
  const t = homeContent[language].hero;
  const store = useRememberedStore();
  const chips = (hidden: boolean) => (
    <ul className="flex shrink-0 gap-2.5 pe-2.5" aria-hidden={hidden || undefined}>
      {t.chips.map((chip) => (
        <li key={chip} dir={language === "en" ? "ltr" : "rtl"} className="whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-[0_0_0_1px_#e3e8e7] sm:text-[13px]">
          {chip}
        </li>
      ))}
    </ul>
  );

  return (
    <section className="hero-band relative overflow-hidden" aria-labelledby="hero-title">
      <div className="container-x relative pb-12 pt-7 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-16">
        {/* On a phone the text column dissolves into the grid, so the picture can sit between the
            buttons and the app links; on a wide screen it is a column again. */}
        <div className="grid grid-cols-1 items-center lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
          <div className="contents text-center lg:block lg:min-w-0 lg:text-start">
            <span className="inline-flex items-center gap-2 justify-self-center rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-emerald-700 shadow-[0_0_0_1px_#d5ebe6]">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t.kicker}
            </span>

            <h1
              id="hero-title"
              className="mt-4 text-[1.6rem] font-extrabold leading-[1.5] text-gray-900 font-heading min-[400px]:text-[1.8rem] sm:text-[2.4rem] sm:leading-[1.45] xl:text-[2.75rem]"
            >
              {t.titleLine1}{" "}
              <span className="block">
                {t.titleLine2} <span className="mark-sun whitespace-nowrap px-1">{t.titleMark}</span>
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-8 text-gray-600 sm:text-lg sm:leading-9 lg:mx-0">{t.lead}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a href={store?.adminUrl || (language === "en" ? "/en/register" : SIGNUP_URL)} className="btn btn-primary min-h-[3.25rem] px-8 text-base">
                {store ? (language === "en" ? "Manage your store" : "كمّل إدارة متجرك") : t.primaryCta}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </a>
              <Link to={localizePath("/pricing", language)} className="btn btn-secondary min-h-[3.25rem]">
                {t.secondaryCta}
              </Link>
            </div>

            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] font-semibold text-gray-600 sm:text-sm lg:justify-start">
              {t.trust.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Everything the store does, sliding by; the second copy only fills the loop. */}
            <div className="marquee -mx-4 mt-7 min-w-0 sm:mx-0">
              <div className="marquee-track py-1">
                {chips(false)}
                {chips(true)}
              </div>
            </div>

            <div className="order-2 mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 lg:order-none lg:mt-6 lg:justify-start">
              <GooglePlayBadge language={language} widthClass="w-[140px]" />
              <Link className="py-3 text-sm font-semibold text-emerald-700 underline underline-offset-4" to={localizePath("/download", language)}>
                {language === "en" ? "Download options" : "خيارات التحميل"}
              </Link>
            </div>

            <div className="order-2 flex justify-center lg:order-none lg:justify-start lg:[&>p]:justify-start">
              <StoreAccessHint language={language} compact />
            </div>
          </div>

          <HeroVisual language={language} />
        </div>
      </div>
    </section>
  );
}
