import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/motion/Reveal";
import { PricingCalculator } from "@/components/PricingCalculator";
import { SectionHeading } from "@/components/SectionHeading";
import {
  AVERAGE_ORDER_VALUE,
  FREE_TO_PRO_ORDERS,
  SIGNUP_URL,
  STARTER_CAP_ORDER_VALUE,
  commissionCapLabel,
  costTable,
  formatCommission,
  formatEgp,
  getPlan,
  orderCommission,
  plans,
  pricingFaqs,
} from "@/data/pricing";
import type { AppLanguage } from "@/lib/i18n";
import { WHATSAPP_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Crown, Sparkles } from "lucide-react";

const EXAMPLE_ORDERS = [100, 250, 500, 1000, 2500];

const starter = getPlan("free");

const copy = {
  ar: {
    kicker: "الأسعار",
    title: `ابدأ مجاناً، وادفع ${formatCommission(starter)} فقط لما تبيع`,
    lead: `بدون اشتراك شهري ولا مدة تجريبية تنتهي. العمولة على الطلبات المكتملة بس، ${commissionCapLabel(starter, "ar")} مهما كبر. كل الأسعار بالجنيه المصري.`,
    highlights: ["بدون بطاقة ائتمان", "بدون اشتراك شهري", "العمولة على الطلب المكتمل فقط", "دفع عند الاستلام"],
    popular: "الأنسب للبداية",
    monthlyFee: "الاشتراك الشهري",
    commissionLabel: "عمولة الطلب المكتمل",
    noCommission: "بدون عمولة",
    proHint: `أوفر من البداية من حوالي ${FREE_TO_PRO_ORDERS} طلب في الشهر، لو متوسط الطلب ${AVERAGE_ORDER_VALUE} ج.م.`,
    note: "العمولة على قيمة المنتجات بعد الخصم، قبل الشحن والضرائب. السقف لكل طلب مكتمل مهما كان عدد المنتجات فيه.",
    capTitle: "العمولة لها سقف، مهما كبر الطلب",
    capLead: `بتدفع ${formatCommission(starter)} من قيمة الطلب لحد ${formatEgp(STARTER_CAP_ORDER_VALUE, "ar")}، وبعدها ${formatEgp(starter.commissionCap, "ar")} ثابتة. طلب بـ ${formatEgp(5000, "ar")} بيدفع نفس عمولة طلب بـ ${formatEgp(STARTER_CAP_ORDER_VALUE, "ar")}.`,
    orderValue: "قيمة الطلب",
    fee: "عمولة البداية",
    capped: "السقف",
    rulesTitle: "إزاي بنحسب العمولة؟",
    rules: [
      "على الطلبات المكتملة فقط. الملغي أو المسترد قبل الفاتورة مش بيتحسب.",
      "على قيمة المنتجات بعد الخصم، قبل الشحن والضرائب.",
      "السقف لكل طلب لوحده، مش سقف شهري.",
      "بتوصلك فاتورة شهرية في لوحة التحكم، وتدفع بتحويل حسب التعليمات في الفاتورة.",
    ],
    tableTitle: "أمثلة جاهزة للتكلفة الشهرية",
    tableLead: `اشتراك + عمولة، بافتراض أن كل طلب مكتمل قيمته ${AVERAGE_ORDER_VALUE} ج.م. المبلغ الفعلي يعتمد على قيمة كل طلب.`,
    orders: "طلبات / شهر",
    cheapest: "الأوفر",
    faqTitle: "أسئلة حول الأسعار",
    faqLead: "لو عندك سؤال تاني، كلمنا على واتساب.",
    ctaTitle: "ابدأ الآن بدون مخاطرة",
    ctaLead: `لا بطاقة ائتمان ولا التزام. سجّل وابدأ البيع بعمولة ${formatCommission(starter)} فقط.`,
    ctaPrimary: "ابدأ مجاناً الآن",
    ctaSecondary: "اسأل على واتساب",
  },
  en: {
    kicker: "Pricing",
    title: `Start free, pay ${formatCommission(starter)} only when you sell`,
    lead: `No monthly fee and no expiring trial. We charge only on completed orders, and never more than ${formatEgp(starter.commissionCap, "en")} per order however large. All prices in EGP.`,
    highlights: ["No credit card", "No monthly fee", "Completed orders only", "Cash on delivery"],
    popular: "Best way to start",
    monthlyFee: "Monthly fee",
    commissionLabel: "Commission on completed orders",
    noCommission: "No commission",
    proHint: `Cheaper than Starter from about ${FREE_TO_PRO_ORDERS} orders a month, if the average order is ${AVERAGE_ORDER_VALUE} EGP.`,
    note: "Commission is based on merchandise after discounts, excluding shipping and tax. The cap applies to each completed order, regardless of item count.",
    capTitle: "Commission has a cap, however big the order",
    capLead: `You pay ${formatCommission(starter)} of the order value up to ${formatEgp(STARTER_CAP_ORDER_VALUE, "en")}, then a flat ${formatEgp(starter.commissionCap, "en")}. A ${formatEgp(5000, "en")} order pays the same as a ${formatEgp(STARTER_CAP_ORDER_VALUE, "en")} one.`,
    orderValue: "Order value",
    fee: "Starter commission",
    capped: "Cap",
    rulesTitle: "How is commission calculated?",
    rules: [
      "Completed orders only. Orders cancelled or refunded before invoicing are not counted.",
      "Based on merchandise after discounts, before shipping and tax.",
      "The cap applies to each order on its own, not to the month.",
      "You get a monthly invoice in your dashboard and pay by transfer following the instructions on the invoice.",
    ],
    tableTitle: "Ready-made monthly examples",
    tableLead: `Subscription + commission, assuming every completed order is worth ${AVERAGE_ORDER_VALUE} EGP. Actual fees depend on each order's value.`,
    orders: "Orders / month",
    cheapest: "Cheapest",
    faqTitle: "Pricing questions",
    faqLead: "Have another question? Message us on WhatsApp.",
    ctaTitle: "Start now with zero risk",
    ctaLead: `No credit card and no commitment. Sign up and start selling with ${formatCommission(starter)} commission only.`,
    ctaPrimary: "Start free now",
    ctaSecondary: "Ask on WhatsApp",
  },
} as const;

export const PricingPage = ({ language = "ar" }: { language?: AppLanguage }) => {
  const t = copy[language];
  const signupHref = language === "en" ? "/en/register" : SIGNUP_URL;

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
          <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {t.highlights.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-label={t.kicker}>
        <div className="container-x">
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {plans.map((plan, index) => (
              <Reveal
                key={plan.id}
                as="article"
                delay={index * 90}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm sm:p-7",
                  plan.popular ? "border-emerald-600 shadow-xl shadow-emerald-900/10 ring-1 ring-emerald-600" : "border-gray-200",
                )}
              >
                {plan.popular ? (
                  <span className="absolute -top-3 start-6 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-extrabold text-white shadow-md">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    {t.popular}
                  </span>
                ) : null}

                <h2 className="text-xl font-extrabold text-gray-950 font-heading">{plan.name[language]}</h2>
                <p className="mt-1 text-sm text-gray-500">{plan.tagline[language]}</p>

                <dl className="mt-5 divide-y divide-gray-200 rounded-xl bg-gray-50 px-4">
                  <div className="flex items-center justify-between gap-3 py-4">
                    <dt className="text-sm font-semibold text-gray-600">{t.monthlyFee}</dt>
                    <dd className="num text-2xl font-extrabold text-gray-950">{formatEgp(plan.monthly, language)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 py-4">
                    <dt className="text-sm font-semibold text-gray-600">{t.commissionLabel}</dt>
                    <dd className="text-end">
                      {plan.commission === 0 ? (
                        <span className="whitespace-nowrap text-xl font-extrabold text-emerald-700 sm:text-2xl">{t.noCommission}</span>
                      ) : (
                        <>
                          <span className="num text-2xl font-extrabold text-gray-950">{formatCommission(plan)}</span>
                          <span className="mt-0.5 block text-xs font-semibold text-emerald-700">{commissionCapLabel(plan, language)}</span>
                        </>
                      )}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features[language].map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.commission === 0 ? <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold leading-6 text-emerald-800">{t.proHint}</p> : null}

                <a href={signupHref} className={cn("btn mt-6 w-full", plan.popular ? "btn-primary" : "btn-secondary")}>
                  {plan.cta[language]}
                </a>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-6 text-gray-500 sm:text-sm">{t.note}</p>
        </div>
      </section>

      <section className="bg-[#f7faf8] py-12 sm:py-16" aria-labelledby="cap-title">
        <div className="container-x">
          <Reveal>
            <SectionHeading id="cap-title" title={t.capTitle} lead={t.capLead} />
          </Reveal>
          <div className="mx-auto mt-8 grid max-w-4xl gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal delay={80} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between text-xs font-bold text-gray-500">
                <span>{t.orderValue}</span>
                <span>{t.fee}</span>
              </div>
              <ul className="space-y-3.5">
                {EXAMPLE_ORDERS.map((value) => {
                  const fee = orderCommission(starter, value);
                  const atCap = value >= STARTER_CAP_ORDER_VALUE;
                  return (
                    <li key={value} className="grid grid-cols-[5.5rem_1fr_5.5rem] items-center gap-3 sm:grid-cols-[6.5rem_1fr_6.5rem]">
                      <span className="num text-xs font-semibold text-gray-700 sm:text-sm">{formatEgp(value, language)}</span>
                      <span aria-hidden="true" className="h-3 overflow-hidden rounded-full bg-emerald-100">
                        <span
                          className={cn("block h-full rounded-full", atCap ? "bg-emerald-700" : "bg-emerald-500")}
                          style={{ width: `${Math.max(6, (fee / starter.commissionCap) * 100)}%` }}
                        />
                      </span>
                      <span className="num text-end text-sm font-extrabold text-emerald-700">
                        {formatEgp(fee, language)}
                        {atCap ? <span className="ms-1 text-[10px] font-bold text-gray-500">({t.capped})</span> : null}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={140} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <h3 className="text-base font-extrabold text-gray-950 font-heading">{t.rulesTitle}</h3>
              <ul className="mt-4 space-y-3">
                {t.rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2.5 text-sm leading-6 text-gray-700">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="cost-table-title">
        <div className="container-x">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <PricingCalculator language={language} />
            </Reveal>

            <Reveal delay={80} className="mt-10">
              <SectionHeading id="cost-table-title" title={t.tableTitle} lead={t.tableLead} />
            </Reveal>

            <Reveal delay={80} className="mx-auto mt-6 max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white">
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
          </div>
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
              <a href={signupHref} className="btn btn-primary">
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
