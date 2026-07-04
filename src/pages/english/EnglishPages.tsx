import type { BlogArticle, BlogSection } from "@/data/blog";
import {
  englishBlogArticles,
  englishComparisons,
  englishFaqs,
  englishHome,
  englishIndustries,
  englishPricingFaqs,
  englishPricingPlans,
  englishSimplePages,
  type EnglishComparisonContent,
  type EnglishIndustryContent,
  type EnglishPageContent,
  type EnglishPageSection,
} from "@/data/en";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  CreditCard,
  Globe2,
  ShieldCheck,
  Store,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const SIGNUP_URL = "https://signup.matgarko.com/signup";
const WHATSAPP_URL = "https://wa.me/201080312538";
const EMAIL_URL = "mailto:matgarko.help@gmail.com";

const homeIcons: LucideIcon[] = [Store, Boxes, Truck, Globe2, CreditCard, Users];

function primaryHref(label?: string) {
  if (!label) return SIGNUP_URL;
  if (label.toLowerCase().includes("whatsapp") || label.toLowerCase().includes("message")) return WHATSAPP_URL;
  return SIGNUP_URL;
}

function secondaryHref(label?: string) {
  if (!label) return "/en/pricing";
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("email")) return EMAIL_URL;
  if (lowerLabel.includes("contact")) return "/en/contact";
  if (lowerLabel.includes("integration")) return "/en/integrations";
  if (lowerLabel.includes("plan") || lowerLabel.includes("pricing")) return "/en/pricing";
  if (lowerLabel.includes("guide")) return "/en/blog/how-to-create-online-store-egypt";
  if (lowerLabel.includes("store type")) return "/en/store/restaurants";
  return "/en/pricing";
}

function CtaButtons({ primary, secondary }: { primary?: string; secondary?: string }) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      {primary ? (
        <Button asChild size="lg" className="bg-gray-950 font-extrabold text-white hover:bg-emerald-700">
          <a href={primaryHref(primary)}>{primary}</a>
        </Button>
      ) : null}
      {secondary ? (
        <Button asChild size="lg" variant="outline" className="border-gray-300 font-extrabold text-gray-900 hover:border-emerald-300 hover:text-emerald-800">
          {secondaryHref(secondary).startsWith("mailto:") ? (
            <a href={secondaryHref(secondary)}>{secondary}</a>
          ) : (
            <Link to={secondaryHref(secondary)}>{secondary}</Link>
          )}
        </Button>
      ) : null}
    </div>
  );
}

function PageHero({ kicker, title, lead, primaryCta, secondaryCta }: EnglishPageContent) {
  return (
    <section className="page-hero">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl">
          <span className="section-kicker">{kicker}</span>
          <h1 className="mt-6 text-4xl font-black leading-tight text-gray-950 font-heading md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-gray-700 md:text-xl">
            {lead}
          </p>
          <CtaButtons primary={primaryCta} secondary={secondaryCta} />
        </div>
      </div>
    </section>
  );
}

function SectionCards({ sections }: { sections: EnglishPageSection[] }) {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title} className="premium-card p-6 md:p-8">
              <h2 className="text-2xl font-black text-gray-950 font-heading">{section.title}</h2>
              <p className="mt-4 text-base leading-8 text-gray-700">{section.text}</p>
              {section.items ? (
                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-semibold text-gray-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-gray-950 py-16 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-[1.4fr_0.6fr] md:items-center">
          <div>
            <span className="text-sm font-extrabold uppercase tracking-wider text-emerald-300">Ready to launch</span>
            <h2 className="mt-4 text-3xl font-black leading-tight font-heading md:text-5xl">
              Build the store, test demand, and upgrade only when growth makes it worth it.
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <Button asChild size="lg" className="bg-white font-extrabold text-gray-950 hover:bg-emerald-50">
              <a href={SIGNUP_URL}>Start your store free</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent font-extrabold text-white hover:bg-white/10">
              <Link to="/en/contact">Talk to us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function EnglishStandardPage({ content }: { content: EnglishPageContent }) {
  return (
    <>
      <PageHero {...content} />
      <SectionCards sections={content.sections} />
      <FinalCta />
    </>
  );
}

export function EnglishHomePage() {
  return (
    <>
      <section className="hero-band relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="section-kicker">{englishHome.hero.kicker}</span>
              <h1 className="mt-6 text-4xl font-black leading-tight text-gray-950 font-heading md:text-6xl">
                {englishHome.hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-gray-700 md:text-xl">
                {englishHome.hero.lead}
              </p>
              <CtaButtons primary={englishHome.hero.primaryCta} secondary={englishHome.hero.secondaryCta} />
            </div>

            <div className="rounded-lg border border-emerald-100 bg-white p-5 shadow-2xl shadow-emerald-900/10">
              <div className="rounded-md bg-gray-950 p-5 text-white">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm text-emerald-200">Store dashboard</p>
                    <p className="text-2xl font-black">Today&apos;s launch list</p>
                  </div>
                  <Store className="h-8 w-8 text-emerald-300" />
                </div>
                <div className="mt-5 space-y-3">
                  {englishHome.workflow.map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-md bg-white/8 p-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400 text-sm font-black text-gray-950">
                        {index + 1}
                      </span>
                      <span className="font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {englishHome.stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-3xl font-black text-gray-950">{stat.value}</p>
                <p className="mt-2 text-sm font-semibold text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <span className="section-kicker">Why Matgarko</span>
            <h2 className="mt-5 text-3xl font-black text-gray-950 font-heading md:text-5xl">
              Built around how regional merchants actually sell
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {englishHome.features.map((feature, index) => {
              const Icon = homeIcons[index] || CheckCircle2;
              return (
                <article key={feature.title} className="premium-card p-6">
                  <div className="icon-tile h-12 w-12">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-gray-950">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-gray-700">{feature.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/70 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="section-kicker">FAQ</span>
              <h2 className="mt-5 text-3xl font-black text-gray-950 font-heading md:text-5xl">
                Answers for English-speaking teams researching Matgarko
              </h2>
            </div>
            <div className="grid gap-4">
              {englishFaqs.map((faq) => (
                <article key={faq.question} className="rounded-lg border border-emerald-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-black text-gray-950">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-gray-700">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

export function EnglishSolutionsPage() {
  return <EnglishStandardPage content={englishSimplePages.solutions} />;
}

export function EnglishIntegrationsPage() {
  return <EnglishStandardPage content={englishSimplePages.integrations} />;
}

export function EnglishThemesPage() {
  return <EnglishStandardPage content={englishSimplePages.themes} />;
}

export function EnglishGettingStartedPage() {
  return <EnglishStandardPage content={englishSimplePages["getting-started"]} />;
}

export function EnglishAboutPage() {
  return <EnglishStandardPage content={englishSimplePages.about} />;
}

export function EnglishContactPage() {
  return <EnglishStandardPage content={englishSimplePages.contact} />;
}

export function EnglishTermsPage() {
  return <EnglishStandardPage content={englishSimplePages.terms} />;
}

export function EnglishPrivacyPage() {
  return <EnglishStandardPage content={englishSimplePages.privacy} />;
}

export function EnglishPricingPage() {
  return (
    <>
      <PageHero
        kicker="Pricing"
        title="Start free, then upgrade when lower commission saves money"
        lead="Matgarko pricing is built for merchants who want to test demand before committing to fixed monthly software cost. Public plans are priced in EGP."
        primaryCta="Start free"
        secondaryCta="Contact us"
        sections={[]}
      />
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {englishPricingPlans.map((plan) => (
              <article key={plan.name} className="premium-card flex flex-col p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-gray-950">{plan.name}</h2>
                    <p className="mt-2 text-sm font-semibold text-emerald-700">{plan.commission}</p>
                  </div>
                  <CreditCard className="h-7 w-7 text-emerald-700" />
                </div>
                <p className="mt-6 text-4xl font-black text-gray-950">{plan.price}</p>
                <p className="mt-1 text-sm font-semibold text-gray-500">{plan.cadence}</p>
                <p className="mt-5 leading-7 text-gray-700">{plan.note}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm font-semibold text-gray-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {englishPricingFaqs.map((faq) => (
              <article key={faq.question} className="rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="text-lg font-black text-gray-950">{faq.question}</h2>
                <p className="mt-3 leading-7 text-gray-700">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

function EnglishIndustryPage({ content }: { content: EnglishIndustryContent }) {
  return (
    <>
      <PageHero
        kicker={content.label}
        title={content.title}
        lead={content.lead}
        primaryCta="Start your store free"
        secondaryCta="See pricing"
        sections={[]}
      />
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-lg font-bold leading-8 text-emerald-950">
            {content.proof}
          </div>
          <div className="mt-8">
            <SectionCards sections={content.features} />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

export function EnglishRestaurantsPage() {
  return <EnglishIndustryPage content={englishIndustries.restaurants} />;
}

export function EnglishClothingPage() {
  return <EnglishIndustryPage content={englishIndustries.clothing} />;
}

export function EnglishElectronicsPage() {
  return <EnglishIndustryPage content={englishIndustries.electronics} />;
}

export function EnglishCosmeticsPage() {
  return <EnglishIndustryPage content={englishIndustries.cosmetics} />;
}

export function EnglishFurniturePage() {
  return <EnglishIndustryPage content={englishIndustries.furniture} />;
}

export function EnglishCompareIndexPage() {
  const comparisons = Object.values(englishComparisons);

  return (
    <>
      <PageHero
        kicker="Platform comparisons"
        title="Compare ecommerce platforms for Egypt and MENA"
        lead="Use these pages to compare Matgarko with common alternatives across local pricing, setup complexity, Arabic-commerce workflows, and operational fit."
        primaryCta="Start free"
        secondaryCta="See pricing"
        sections={[]}
      />
      <section className="py-16 md:py-20">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2 md:px-6">
          {comparisons.map((comparison) => (
            <Link key={comparison.slug} to={`/en/compare/${comparison.slug}`} className="premium-card block p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-black text-gray-950">{comparison.competitor}</h2>
                <ArrowRight className="h-5 w-5 text-emerald-700" />
              </div>
              <p className="mt-4 leading-7 text-gray-700">{comparison.lead}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function EnglishCompetitorPage({ content }: { content: EnglishComparisonContent }) {
  return (
    <>
      <PageHero
        kicker={`Matgarko vs ${content.competitor}`}
        title={content.title}
        lead={content.lead}
        primaryCta="Start free"
        secondaryCta="See pricing"
        sections={[]}
      />
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-lg font-bold leading-8 text-emerald-950">
            {content.verdict}
          </div>
          <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="grid grid-cols-3 bg-gray-950 text-sm font-black text-white">
              <div className="p-4">Factor</div>
              <div className="p-4">Matgarko</div>
              <div className="p-4">{content.competitor}</div>
            </div>
            {content.rows.map((row) => (
              <div key={row.factor} className="grid grid-cols-3 border-t border-gray-200 text-sm leading-7 text-gray-700">
                <div className="p-4 font-black text-gray-950">{row.factor}</div>
                <div className="p-4">{row.matgarko}</div>
                <div className="p-4">{row.competitor}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="premium-card p-6">
              <h2 className="text-xl font-black text-gray-950">Best for</h2>
              <ul className="mt-4 space-y-3">
                {content.bestFor.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-semibold text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="premium-card p-6">
              <h2 className="text-xl font-black text-gray-950">Watchouts</h2>
              <ul className="mt-4 space-y-3">
                {content.watchouts.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-semibold text-gray-700">
                    <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

export function EnglishVsEasyOrdersPage() {
  return <EnglishCompetitorPage content={englishComparisons.easyorders} />;
}

export function EnglishVsShopifyPage() {
  return <EnglishCompetitorPage content={englishComparisons.shopify} />;
}

export function EnglishVsSallaPage() {
  return <EnglishCompetitorPage content={englishComparisons.salla} />;
}

export function EnglishVsWooCommercePage() {
  return <EnglishCompetitorPage content={englishComparisons.woocommerce} />;
}

export function EnglishBlogIndexPage() {
  return (
    <>
      <PageHero
        kicker="Blog"
        title="Ecommerce guides for Egypt and MENA merchants"
        lead="Practical English guides for teams researching online store setup, ecommerce pricing, platform choices, and launch strategy in Egypt and Arabic-speaking markets."
        primaryCta="Start free"
        secondaryCta="See pricing"
        sections={[]}
      />
      <section className="py-16 md:py-20">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2 md:px-6">
          {englishBlogArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}

function ArticleCard({ article }: { article: BlogArticle }) {
  return (
    <Link to={`/en/blog/${article.slug}`} className="premium-card block p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">{article.category}</span>
        <span className="text-sm font-semibold text-gray-500">{article.readingTime}</span>
      </div>
      <h2 className="mt-5 text-2xl font-black leading-tight text-gray-950">{article.title}</h2>
      <p className="mt-4 leading-7 text-gray-700">{article.description}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-emerald-700">
        Read article <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

function renderBlogSection(section: BlogSection, index: number) {
  if (section.type === "h2") {
    return <h2 key={index} className="mt-10 text-3xl font-black text-gray-950">{section.text}</h2>;
  }
  if (section.type === "h3") {
    return <h3 key={index} className="mt-8 text-2xl font-black text-gray-950">{section.text}</h3>;
  }
  if (section.type === "ul" && section.items) {
    return (
      <ul key={index} className="mt-5 space-y-3">
        {section.items.map((item) => (
          <li key={item} className="flex gap-3 leading-8 text-gray-700">
            <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (section.type === "ol" && section.items) {
    return (
      <ol key={index} className="mt-5 list-decimal space-y-3 pl-6 leading-8 text-gray-700">
        {section.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    );
  }
  if (section.type === "callout") {
    return (
      <aside key={index} className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 p-5 font-semibold leading-8 text-emerald-950">
        {section.text}
      </aside>
    );
  }
  return <p key={index} className="mt-5 leading-8 text-gray-700">{section.text}</p>;
}

export function EnglishBlogArticlePage() {
  const { slug } = useParams();
  const article = englishBlogArticles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <section className="page-hero">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="page-title">Article not found</h1>
          <p className="page-lead mt-4">The English article you are looking for is not available.</p>
          <Button asChild className="mt-8">
            <Link to="/en/blog">Back to blog</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <article>
      <section className="page-hero">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl">
            <span className="section-kicker">{article.category}</span>
            <h1 className="mt-6 text-4xl font-black leading-tight text-gray-950 font-heading md:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-gray-700 md:text-xl">
              {article.description}
            </p>
            <p className="mt-5 text-sm font-bold text-gray-500">
              Published {article.publishDate} - {article.readingTime}
            </p>
          </div>
        </div>
      </section>
      <section className="py-14 md:py-18">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-lg">
            {article.content.map(renderBlogSection)}
          </div>
        </div>
      </section>
      <FinalCta />
    </article>
  );
}

export function EnglishRegisterPage() {
  return (
    <section className="page-hero min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto grid gap-10 px-4 md:grid-cols-[0.9fr_1.1fr] md:px-6">
        <div>
          <span className="section-kicker">Create your store</span>
          <h1 className="mt-6 text-4xl font-black leading-tight text-gray-950 font-heading md:text-6xl">
            Start your Matgarko store account
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            Prepare your store name, contact details, and first product idea. The live signup flow opens on the Matgarko signup domain.
          </p>
          <Button asChild size="lg" className="mt-8 bg-gray-950 font-extrabold text-white hover:bg-emerald-700">
            <a href={SIGNUP_URL}>Open signup</a>
          </Button>
        </div>
        <form className="rounded-lg border border-gray-200 bg-white p-6 shadow-xl shadow-emerald-900/5">
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-bold text-gray-700">
              Store name
              <input name="storeName" className="rounded-md border border-gray-300 px-4 py-3 text-base" placeholder="Example: Cairo Home Decor" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-gray-700">
              Store link
              <input name="subdomain" className="rounded-md border border-gray-300 px-4 py-3 text-base" placeholder="yourstore" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-gray-700">
              Email
              <input name="email" type="email" className="rounded-md border border-gray-300 px-4 py-3 text-base" placeholder="you@example.com" />
            </label>
            <p className="rounded-md bg-emerald-50 p-4 text-sm font-semibold leading-7 text-emerald-950">
              This page is intentionally noindex. Use the signup button to continue on the official account creation flow.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
