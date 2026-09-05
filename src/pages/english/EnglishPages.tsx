import type { BlogArticle, BlogSection } from "@/data/blog";
import {
  englishBlogArticles,
  englishComparisons,
  englishIndustries,
  englishSimplePages,
  type EnglishComparisonContent,
  type EnglishIndustryContent,
  type EnglishPageContent,
  type EnglishPageSection,
} from "@/data/en";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { PricingPage } from "@/pages/PricingPage";

const SIGNUP_URL = "https://signup.matgarko.com/signup";
const WHATSAPP_URL = "https://wa.me/201080312538";
const EMAIL_URL = "mailto:matgarko.help@gmail.com";

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
  return <HomePage language="en" />;
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
  return <PricingPage language="en" />;
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
