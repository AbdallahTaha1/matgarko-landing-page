import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  AVERAGE_ORDER_VALUE,
  FREE_TO_GROWTH_ORDERS,
  GROWTH_TO_PRO_ORDERS,
  SIGNUP_URL,
  costTable,
  formatCommission,
  formatEgp,
  planPriceLabel,
  plans,
  pricingFaqs,
} from "@/data/pricing";
import type { AppLanguage } from "@/lib/i18n";
import { WHATSAPP_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Crown } from "lucide-react";

const EXAMPLE_ORDER = 500;

const copy = {
  ar: {
    kicker: "الأسعار",
    title: "ابدأ مجاناً، وادفع 2% فقط لما تبيع",
    lead: "بدون رسوم شهرية في البداية. لما يكبر متجرك انتقل للباقة اللي توفرلك أكتر. كل الأسعار بالجنيه المصري.",
    monthly: "شهرياً",
    commission: "عمولة على كل طلب مكتمل",
    noCommission: "بدون أي عمولة",
    popular: "الأكثر اختياراً",
    exampleTitle: "مثال: طلب بقيمة 500 ج.م",
    exampleLead: "كم تدفع لمتجركو على هذا الطلب في كل باقة؟",
    exampleNet: "يصلك",
    tableTitle: "أي باقة أوفر لك؟",
    tableLead: `التكلفة الشهرية الكاملة (اشتراك + عمولة) بمتوسط قيمة طلب ${AVERAGE_ORDER_VALUE} ج.م.`,
    orders: "طلبات / شهر",
    cheapest: "الأوفر",
    breakeven: `باقة النمو أوفر بعد حوالي ${FREE_TO_GROWTH_ORDERS} طلب شهرياً، والاحترافي بعد حوالي ${GROWTH_TO_PRO_ORDERS} طلب.`,
    faqTitle: "أسئلة حول الأسعار",
    faqLead: "لو عندك سؤال تاني، كلمنا على واتساب.",
    ctaTitle: "ابدأ الآن بدون مخاطرة",
    ctaLead: "لا بطاقة ائتمان ولا التزام. سجّل وابدأ البيع بعمولة 2% فقط.",
    ctaPrimary: "ابدأ مجاناً الآن",
    ctaSecondary: "اسأل على واتساب",
    note: "رسوم بوابات الدفع الإلكتروني منفصلة وتُحصّلها شركة الدفع مباشرة.",
  },
  en: {
    kicker: "Pricing",
    title: "Start free, pay 2% only when you sell",
    lead: "No monthly fee to start. Move to a paid plan when it saves you money. All prices in EGP.",
    monthly: "per month",
    commission: "commission on completed orders",
    noCommission: "no commission at all",
    popular: "Most popular",
    exampleTitle: "Example: a 500 EGP order",
    exampleLead: "What you pay Matgarko on this order in each plan.",
    exampleNet: "You receive",
    tableTitle: "Which plan is cheaper for you?",
    tableLead: `Total monthly cost (subscription + commission) at a ${AVERAGE_ORDER_VALUE} EGP average order.`,
    orders: "Orders / month",
    cheapest: "Cheapest",
    breakeven: `Growth becomes cheaper after about ${FREE_TO_GROWTH_ORDERS} orders a month, and Pro after about ${GROWTH_TO_PRO_ORDERS}.`,
    faqTitle: "Pricing questions",
    faqLead: "Have another question? Message us on WhatsApp.",
    ctaTitle: "Start now with zero risk",
    ctaLead: "No credit card and no commitment. Sign up and start selling with 2% commission only.",
    ctaPrimary: "Start free now",
    ctaSecondary: "Ask on WhatsApp",
    note: "Online payment gateway fees are separate and charged by the payment provider.",
  },
} as const;

export const PricingPage = ({ language = "ar" }: { language?: AppLanguage }) => {
  const t = copy[language];

  return (
    <div dir={language === "en" ? "ltr" : "rtl"} className="bg-white">
      <section className="page-hero" aria-labelledby="pricing-page-title">
        <div className="container-x text-center">
          <span className="section-kicker">
            <Crown className="h-3.5 w-3.5" aria-hidden="true" />
            {t.kicker}
          </span>
          <h1 id="pricing-page-title" className="page-title mt-4">
            {t.title}
          </h1>
          <p className="page-lead mt-4">{t.lead}</p>
        </div>
      </section>

      <section className="section" aria-label={t.kicker}>
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan, index) => (
              <Reveal
                key={plan.id}
                as="article"
                delay={index * 90}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm",
                  plan.popular ? "border-emerald-600 shadow-xl shadow-emerald-900/10 ring-1 ring-emerald-600" : "border-gray-200",
                )}
              >
                {plan.popular ? (
                  <span className="absolute -top-3 start-6 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-extrabold text-white shadow-md">
                    <Crown className="h-3 w-3" aria-hidden="true" />
                    {t.popular}
                  </span>
                ) : null}

                <h2 className="text-xl font-extrabold text-gray-950 font-heading">{plan.name[language]}</h2>
                <p className="mt-1 text-sm text-gray-500">{plan.tagline[language]}</p>

                <div className="mt-5 rounded-xl bg-gray-50 p-4">
                  <div className="flex items-baseline gap-1.5">
                    <span className="num text-3xl font-extrabold text-gray-950">{formatEgp(plan.monthly, language)}</span>
                    <span className="text-xs font-semibold text-gray-500">/ {t.monthly}</span>
                  </div>
                  <p className={cn("mt-1.5 text-sm font-bold", plan.commission === 0 ? "text-emerald-700" : "text-gray-700")}>
                    {plan.commission === 0 ? t.noCommission : `+ ${formatCommission(plan)} ${t.commission}`}
                  </p>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features[language].map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a href={SIGNUP_URL} className={cn("btn mt-6 w-full", plan.popular ? "btn-primary" : "btn-secondary")}>
                  {plan.cta[language]}
                </a>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-gray-500 sm:text-sm">{t.note}</p>
        </div>
      </section>

      <section className="bg-[#f7faf8] py-12 sm:py-16" aria-labelledby="example-title">
        <div className="container-x">
          <Reveal>
            <SectionHeading id="example-title" title={t.exampleTitle} lead={t.exampleLead} />
          </Reveal>
          <Reveal delay={80} className="mx-auto mt-8 grid max-w-3xl grid-cols-3 divide-x divide-gray-200 rounded-2xl border border-gray-200 bg-white rtl:divide-x-reverse">
            {plans.map((plan) => {
              const fee = (EXAMPLE_ORDER * plan.commission) / 100;
              return (
                <div key={plan.id} className="px-2 py-5 text-center sm:px-4">
                  <p className="text-xs font-bold text-gray-500 sm:text-sm">{plan.name[language]}</p>
                  <p className={cn("num mt-1 text-lg font-extrabold sm:text-2xl", fee === 0 ? "text-emerald-700" : "text-gray-950")}>
                    {formatEgp(fee, language)}
                  </p>
                  <p className="num mt-1 text-[11px] text-gray-500 sm:text-xs">
                    {t.exampleNet} {formatEgp(EXAMPLE_ORDER - fee, language)}
                  </p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="cost-table-title">
        <div className="container-x">
          <Reveal>
            <SectionHeading id="cost-table-title" title={t.tableTitle} lead={t.tableLead} />
          </Reveal>

          <Reveal delay={80} className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <caption className="sr-only">{t.tableTitle}</caption>
              <thead className="bg-gray-50 text-xs text-gray-500">
                <tr>
                  <th scope="col" className="px-3 py-3 text-start font-bold sm:px-5">
                    {t.orders}
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.id} scope="col" className="px-2 py-3 text-center font-bold sm:px-4">
                      <span className="block text-gray-900">{plan.name[language]}</span>
                      <span className="num block text-[11px] font-semibold text-gray-500">{planPriceLabel(plan, language)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {costTable.map((row) => {
                  const cheapest = Math.min(...row.costs.map((cell) => cell.cost));
                  return (
                    <tr key={row.orders}>
                      <th scope="row" className="num px-3 py-3 text-start font-bold text-gray-900 sm:px-5">
                        {row.orders}
                      </th>
                      {row.costs.map((cell) => (
                        <td
                          key={cell.id}
                          className={cn(
                            "num whitespace-nowrap px-2 py-3 text-center text-xs sm:px-4 sm:text-sm",
                            cell.cost === cheapest ? "font-extrabold text-emerald-700" : "text-gray-600",
                          )}
                        >
                          {formatEgp(cell.cost, language)}
                          {cell.cost === cheapest ? <span className="sr-only"> ({t.cheapest})</span> : null}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Reveal>
          <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-gray-500 sm:text-sm">{t.breakeven}</p>
        </div>
      </section>

      <section className="bg-[#f7faf8] py-12 sm:py-16" aria-labelledby="pricing-faq-title">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <Reveal>
              <SectionHeading id="pricing-faq-title" title={t.faqTitle} lead={t.faqLead} align="start" />
            </Reveal>
            <Reveal delay={80}>
              <FaqList items={pricingFaqs[language]} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="pricing-cta-title">
        <div className="container-x">
          <Reveal className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center sm:p-8 md:flex-row md:text-start">
            <div>
              <h2 id="pricing-cta-title" className="text-xl font-extrabold text-gray-950 font-heading sm:text-2xl">
                {t.ctaTitle}
              </h2>
              <p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">{t.ctaLead}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={SIGNUP_URL} className="btn btn-primary">
                {t.ctaPrimary}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                {t.ctaSecondary}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
