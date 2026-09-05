import { homeContent } from "@/data/home";
import { SIGNUP_URL } from "@/data/pricing";
import { localizePath, type AppLanguage } from "@/lib/i18n";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  Flower2,
  Leaf,
  Package,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const productIcons = [Sparkles, Flower2, Leaf, Package];
const productTints = ["from-emerald-100 to-teal-50", "from-amber-100 to-orange-50", "from-sky-100 to-cyan-50", "from-rose-100 to-pink-50"];

export function Hero({ language }: { language: AppLanguage }) {
  const t = homeContent[language].hero;

  return (
    <section className="hero-band relative overflow-hidden" aria-labelledby="hero-title">
      <div className="noise-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000_20%,transparent_100%)]" aria-hidden="true" />

      <div className="container-x relative pb-12 pt-10 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="text-start">
            <span className="section-kicker">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
              </span>
              {t.kicker}
            </span>

            <h1
              id="hero-title"
              className="mt-5 max-w-xl text-[2rem] font-extrabold leading-[1.4] text-gray-950 font-heading sm:text-4xl sm:leading-[1.35] lg:text-5xl lg:leading-[1.3]"
            >
              {t.titleLine1}
              <span className="text-conversion-gradient block pb-2">{t.titleLine2}</span>
            </h1>

            <p className="mt-4 max-w-lg text-base leading-7 text-gray-600 sm:mt-5 sm:text-lg sm:leading-8">{t.lead}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={SIGNUP_URL} className="btn btn-primary">
                {t.primaryCta}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </a>
              <Link to={localizePath("/pricing", language)} className="btn btn-secondary">
                {t.secondaryCta}
              </Link>
            </div>

            <ul className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-gray-600 sm:text-sm">
              {t.trust.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[480px] lg:block" aria-hidden="true">
            <div className="absolute -inset-x-10 top-10 -z-10 h-[420px] rounded-full bg-emerald-200/40 blur-3xl" />

            <div className="absolute -start-4 top-2 z-20 w-52 rounded-2xl border border-gray-200 bg-white p-3.5 shadow-xl shadow-gray-950/10 animate-float-panel">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <ShoppingBag className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-gray-950">{t.mock.order.title}</p>
                  <p className="truncate text-xs text-gray-500">{t.mock.order.place}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-xs">
                <span className="inline-flex items-center gap-1 font-semibold text-gray-600">
                  <Banknote className="h-3.5 w-3.5 text-emerald-600" />
                  {t.mock.order.method}
                </span>
                <span className="num font-extrabold text-gray-950">{t.mock.order.amount}</span>
              </div>
            </div>

            <div className="absolute -end-4 bottom-10 z-20 w-48 rounded-2xl bg-gray-950 p-3.5 text-white shadow-xl shadow-gray-950/20 animate-float-panel [animation-delay:1.2s]">
              <p className="text-xs text-gray-400">{t.mock.sales.label}</p>
              <div className="mt-1 flex items-end justify-between gap-2">
                <p className="num whitespace-nowrap text-base font-extrabold leading-none">{t.mock.sales.value}</p>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[11px] font-bold text-emerald-300">
                  <TrendingUp className="h-3 w-3" />
                  {t.mock.sales.delta}
                </span>
              </div>
            </div>

            <div className="mx-auto w-[300px] rounded-[2.25rem] border-[6px] border-gray-950 bg-gray-950 shadow-2xl shadow-gray-950/25">
              <div className="overflow-hidden rounded-[1.9rem] bg-white">
                <div className="flex items-center justify-between px-4 pb-2 pt-3">
                  <div className="h-1.5 w-12 rounded-full bg-gray-200" />
                  <div className="h-3 w-3 rounded-full bg-gray-200" />
                </div>

                <div className="flex items-center justify-between px-4 pb-3">
                  <div>
                    <p className="text-sm font-extrabold text-gray-950">{t.mock.storeName}</p>
                    <p className="text-[11px] text-gray-500">{t.mock.storeTag}</p>
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                    <ShoppingBag className="h-4 w-4" />
                  </span>
                </div>

                <div className="mx-4 rounded-xl bg-gradient-to-l from-emerald-600 to-teal-700 p-3 text-white">
                  <p className="text-xs font-bold">{t.mock.banner}</p>
                  <div className="mt-2 h-1.5 w-16 rounded-full bg-white/40" />
                </div>

                <div className="grid grid-cols-2 gap-3 p-4">
                  {t.mock.products.map((product, index) => {
                    const Icon = productIcons[index] ?? Package;
                    return (
                      <div key={product.name} className="rounded-xl border border-gray-100 bg-white p-2 shadow-sm">
                        <div className={`flex h-16 items-center justify-center rounded-lg bg-gradient-to-br ${productTints[index]} text-gray-700`}>
                          <Icon className="h-6 w-6 opacity-70" />
                        </div>
                        <p className="mt-2 truncate text-[11px] font-bold text-gray-900">{product.name}</p>
                        <p className="num text-[11px] font-extrabold text-emerald-700">{product.price}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="px-4 pb-4">
                  <div className="flex h-10 items-center justify-center rounded-xl bg-gray-950 text-xs font-bold text-white">
                    {t.mock.checkout}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
