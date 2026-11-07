import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { homeContent } from "@/data/home";
import { localizePath, type AppLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ArrowRight, Ban, CheckCircle2, ShieldAlert, ShieldCheck, X } from "lucide-react";
import { Link } from "react-router-dom";

/** Three numbers right under the hero: the price, a fake order's price, the setup time. */
export function HomeProof({ language }: { language: AppLanguage }) {
  const items = homeContent[language].proof;
  return (
    <section aria-label={language === "en" ? "Matgarko in numbers" : "متجركو في أرقام"} className="border-y border-gray-200/70 bg-white">
      <div className="container-x">
        <ul className="grid grid-cols-3 divide-x divide-gray-200/80 rtl:divide-x-reverse">
          {items.map((item) => (
            <li key={item.label} className="px-2 py-5 text-center sm:py-7">
              <p className="num text-xl font-extrabold text-gray-950 font-heading sm:text-3xl" dir="auto">{item.value}</p>
              <p className="mt-1 text-[11px] leading-4 text-gray-600 sm:text-sm sm:leading-6">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The fake-order shield as merchants see it: an order list with warning chips. */
export function FakeOrderShield({ language }: { language: AppLanguage }) {
  const t = homeContent[language].shield;
  return (
    <section className="section overflow-hidden" aria-labelledby="shield-title">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <SectionHeading id="shield-title" kicker={t.kicker} title={t.title} lead={t.lead} align="start" />
          <ul className="mt-6 space-y-3">
            {t.points.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm leading-7 text-gray-700 sm:text-base">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600 sm:mt-1.5" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto max-w-md" aria-hidden="true">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-emerald-100/60 blur-2xl" />
            <div className="card overflow-hidden shadow-xl shadow-gray-950/5">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <p className="text-sm font-extrabold text-gray-950">{t.listTitle}</p>
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
              </div>
              <ul className="divide-y divide-gray-100">
                {t.orders.map((order) => (
                  <li key={order.number} className={cn("flex items-center gap-3 px-4 py-3", order.tone === "danger" && "bg-red-50/60", order.tone === "warn" && "bg-amber-50/60")}>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-950"><span className="num" dir="ltr">{order.number}</span> · {order.place}</p>
                      {order.flag ? (
                        <span className={cn("mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold", order.tone === "danger" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800")}>
                          <ShieldAlert className="h-3 w-3" />
                          {order.flag}
                        </span>
                      ) : null}
                    </div>
                    <span className="num shrink-0 text-sm font-extrabold text-gray-950">{order.amount}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 bg-gray-950 px-4 py-3 text-xs font-bold text-white sm:text-sm">
                <Ban className="h-4 w-4 text-emerald-400" />
                {t.free}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Matgarko against EasyOrders in four rows, linking to the full comparison. */
export function VersusEasyOrders({ language }: { language: AppLanguage }) {
  const t = homeContent[language].versus;
  return (
    <section className="section" aria-labelledby="versus-title">
      <div className="container-x max-w-4xl">
        <Reveal>
          <SectionHeading id="versus-title" kicker={t.kicker} title={t.title} lead={t.lead} />
        </Reveal>
        <Reveal delay={80} className="mt-8">
          <div className="card overflow-hidden">
            <table className="w-full table-fixed text-sm sm:text-base">
              <thead>
                <tr className="border-b border-gray-100">
                  <th scope="col" className="w-[30%] px-3 py-3 text-start text-xs font-semibold text-gray-500 sm:px-5 sm:text-sm"><span className="sr-only">{language === "en" ? "What" : "البند"}</span></th>
                  <th scope="col" className="bg-emerald-50 px-3 py-3 text-start font-extrabold text-emerald-800 sm:px-5">{t.us}</th>
                  <th scope="col" className="px-3 py-3 text-start font-bold text-gray-600 sm:px-5">{t.them}</th>
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row) => (
                  <tr key={row.label} className="border-b border-gray-100 last:border-0">
                    <th scope="row" className="px-3 py-3.5 text-start text-xs font-semibold leading-5 text-gray-600 sm:px-5 sm:text-sm">{row.label}</th>
                    <td className="bg-emerald-50/60 px-3 py-3.5 text-[13px] font-extrabold leading-6 text-gray-950 sm:px-5 sm:text-base">
                      <span className="inline-flex items-start gap-1.5"><CheckCircle2 className="mt-1 hidden h-4 w-4 shrink-0 text-emerald-600 sm:block" aria-hidden="true" />{row.us}</span>
                    </td>
                    <td className="px-3 py-3.5 text-xs leading-5 text-gray-600 sm:px-5 sm:text-base sm:leading-6">
                      <span className="inline-flex items-start gap-1.5"><X className="mt-1 hidden h-4 w-4 shrink-0 text-gray-400 sm:block" aria-hidden="true" />{row.them}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-gray-500">{t.note}</p>
            <Link to={localizePath("/compare/easyorders", language)} className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-900">
              {t.link}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
