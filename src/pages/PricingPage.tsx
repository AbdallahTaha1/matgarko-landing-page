import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/motion/Reveal";
import { PricingCalculator } from "@/components/PricingCalculator";
import { SectionHeading } from "@/components/SectionHeading";
import {
  PRO_CHEAPER_ABOVE_LABEL,
  SIGNUP_URL,
  costTable,
  formatEgp,
  getPlan,
  perOrderFeeLabel,
  plans,
  pricingFaqs,
} from "@/data/pricing";
import type { AppLanguage } from "@/lib/i18n";
import { WHATSAPP_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Crown, Sparkles } from "lucide-react";

const starter = getPlan("free");
const pro = getPlan("pro");
const fee = formatEgp(starter.perOrderFee, "ar");
const feeEn = formatEgp(starter.perOrderFee, "en");

const copy = {
  ar: {
    kicker: "الأسعار",
    title: `${fee} على الطلب، والطلبات الوهمية ببلاش`,
    lead: "ابدأ بدون اشتراك شهري ولا مدة تجريبية تنتهي. سعر ثابت على كل طلب مهما كانت قيمته، ومفيش نسبة من مبيعاتك. كل الأسعار بالجنيه المصري.",
    highlights: ["بدون بطاقة ائتمان", "بدون اشتراك شهري", "سعر ثابت على الطلب", "الطلبات الوهمية ببلاش"],
    popular: "الأنسب للبداية",
    monthlyFee: "الاشتراك الشهري",
    perOrderLabel: "على كل طلب",
    noPerOrderFee: "بدون رسوم",
    fakeFree: "الطلب الوهمي ببلاش",
    proHint: `أوفر من البداية لو طلباتك أكتر من ${PRO_CHEAPER_ABOVE_LABEL} طلب في الشهر.`,
    note: "السعر ثابت لكل طلب مهما كانت قيمته أو عدد المنتجات فيه.",
    rulesTitle: "إيه اللي بيتحسب وإيه اللي ببلاش؟",
    rulesLead: `${fee} ثابتة على الطلب، سواء الطلب بـ ${formatEgp(150, "ar")} أو بـ ${formatEgp(5000, "ar")}.`,
    examplesTitle: "أمثلة",
    rulesCardTitle: "بالتفصيل",
    examples: [
      { label: `طلب بـ ${formatEgp(150, "ar")}`, fee: starter.perOrderFee },
      { label: `طلب بـ ${formatEgp(5000, "ar")}`, fee: starter.perOrderFee },
      { label: "طلب وهمي علّم عليه الدرع واتلغى", fee: 0 },
      { label: "طلب من واتساب سجلته بنفسك", fee: 0 },
    ],
    rules: [
      "كل طلب يتعمل في متجرك بيتحسب، حتى لو اتلغى أو رجع بعد كده.",
      "الطلب الوهمي ببلاش: لو درع الطلبات الوهمية علّم عليه وقت ما اتعمل (مكرر، أو طلبات كتير من نفس الرقم) وبعدين اتلغى، مش بيتحسب.",
      "الطلبات اللي بتسجلها بنفسك من واتساب أو التليفون من «طلب جديد» ببلاش.",
      "بتوصلك فاتورة شهرية في لوحة التحكم، وتدفع بتحويل حسب التعليمات في الفاتورة.",
    ],
    tableTitle: "أمثلة جاهزة للتكلفة الشهرية",
    tableLead: `الاشتراك + ${perOrderFeeLabel(starter, "ar")} في البداية. احترافي ${formatEgp(pro.monthly, "ar")} ثابتة مهما كان عدد الطلبات.`,
    orders: "طلبات / شهر",
    cheapest: "الأوفر",
    faqTitle: "أسئلة حول الأسعار",
    faqLead: "لو عندك سؤال تاني، كلمنا على واتساب.",
    ctaTitle: "ابدأ الآن بدون مخاطرة",
    ctaLead: `لا بطاقة ائتمان ولا التزام. سجّل وابدأ البيع بـ ${perOrderFeeLabel(starter, "ar")} بس.`,
    ctaPrimary: "ابدأ مجاناً الآن",
    ctaSecondary: "اسأل على واتساب",
  },
  en: {
    kicker: "Pricing",
    title: `${feeEn} per order, and fake orders are free`,
    lead: "Start with no monthly fee and no expiring trial. One flat fee per order whatever its value, never a percentage of your sales. All prices in EGP.",
    highlights: ["No credit card", "No monthly fee", "Flat fee per order", "Fake orders are free"],
    popular: "Best way to start",
    monthlyFee: "Monthly fee",
    perOrderLabel: "Per order",
    noPerOrderFee: "No fee",
    fakeFree: "Fake orders are free",
    proHint: `Cheaper than Starter above ${PRO_CHEAPER_ABOVE_LABEL} orders a month.`,
    note: "The fee is the same for every order, whatever its value or item count.",
    rulesTitle: "What is billed and what is free?",
    rulesLead: `A flat ${feeEn} per order, whether the order is ${formatEgp(150, "en")} or ${formatEgp(5000, "en")}.`,
    examplesTitle: "Examples",
    rulesCardTitle: "In detail",
    examples: [
      { label: `A ${formatEgp(150, "en")} order`, fee: starter.perOrderFee },
      { label: `A ${formatEgp(5000, "en")} order`, fee: starter.perOrderFee },
      { label: "A fake order flagged by the shield, then canceled", fee: 0 },
      { label: "A WhatsApp order you recorded yourself", fee: 0 },
    ],
    rules: [
      "Every order placed in your store is billed, even if it is later canceled or returned.",
      "Fake orders are free: if the fake-order shield flagged an order when it was placed (a duplicate, or many orders from the same number) and it was then canceled, it is not billed.",
      "Orders you record yourself from WhatsApp or phone calls with «New order» are free.",
      "You get a monthly invoice in your dashboard and pay by transfer following the instructions on the invoice.",
    ],
    tableTitle: "Ready-made monthly examples",
    tableLead: `Subscription + ${perOrderFeeLabel(starter, "en")} on Starter. Pro is a flat ${formatEgp(pro.monthly, "en")} however many orders you get.`,
    orders: "Orders / month",
    cheapest: "Cheapest",
    faqTitle: "Pricing questions",
    faqLead: "Have another question? Message us on WhatsApp.",
    ctaTitle: "Start now with zero risk",
    ctaLead: `No credit card and no commitment. Sign up and start selling for just ${perOrderFeeLabel(starter, "en")}.`,
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
                    <dt className="whitespace-nowrap text-sm font-semibold text-gray-600">{t.perOrderLabel}</dt>
                    <dd className="text-end">
                      {plan.perOrderFee === 0 ? (
                        <span className="whitespace-nowrap text-lg font-extrabold text-emerald-700 sm:text-xl">{t.noPerOrderFee}</span>
                      ) : (
                        <>
                          <span className="num text-2xl font-extrabold text-gray-950">{formatEgp(plan.perOrderFee, language)}</span>
                          <span className="mt-0.5 block text-xs font-semibold text-emerald-700">{t.fakeFree}</span>
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

                {plan.perOrderFee === 0 ? <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold leading-6 text-emerald-800">{t.proHint}</p> : null}

                <a href={signupHref} className={cn("btn mt-6 w-full", plan.popular ? "btn-primary" : "btn-secondary")}>
                  {plan.cta[language]}
                </a>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-6 text-gray-500 sm:text-sm">{t.note}</p>
        </div>
      </section>

      <section className="bg-[#f7faf8] py-12 sm:py-16" aria-labelledby="billing-rules-title">
        <div className="container-x">
          <Reveal>
            <SectionHeading id="billing-rules-title" title={t.rulesTitle} lead={t.rulesLead} />
          </Reveal>
          <div className="mx-auto mt-8 grid max-w-4xl gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal delay={80} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <h3 className="text-base font-extrabold text-gray-950 font-heading">{t.examplesTitle}</h3>
              <ul className="mt-4 divide-y divide-gray-100">
                {t.examples.map((example) => (
                  <li key={example.label} className="flex items-center justify-between gap-3 py-3 text-sm">
                    <span className="text-gray-700">{example.label}</span>
                    <span className={cn("num shrink-0 font-extrabold", example.fee === 0 ? "text-emerald-700" : "text-gray-950")}>{formatEgp(example.fee, language)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <h3 className="text-base font-extrabold text-gray-950 font-heading">{t.rulesCardTitle}</h3>
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
