import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App";
import {
  articleSchema,
  alternateLinksForPage,
  breadcrumbSchema,
  canonicalUrl,
  faqSchema,
  getSeoPage,
  indexableSeoPages,
  llmsFullTxt,
  llmsTxt,
  orderedSeoPages,
  organizationSchema,
  pageHtmlDir,
  pageHtmlLang,
  pageOgLocale,
  pricingFaqSchema,
  serviceSchema,
  type SeoPage,
  siteNameForPage,
  sitemapXml,
  socialImageAltForPage,
  socialImageUrl,
  softwareSchema,
  webPageSchema,
  websiteSchema,
} from "./lib/seo";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const escapeJson = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

function schemaForPage(page: SeoPage) {
  const pageArticleSchema = articleSchema(page);

  return [
    organizationSchema(),
    websiteSchema(page),
    webPageSchema(page),
    serviceSchema(page),
    softwareSchema(page),
    breadcrumbSchema(page),
    ...(pageArticleSchema ? [pageArticleSchema] : []),
    ...(page.path === "/" || page.path === "/en" ? [faqSchema(page)] : []),
    ...(page.path === "/pricing" || page.path === "/en/pricing" ? [pricingFaqSchema(page)] : []),
  ];
}

function siteNavigationSchema() {
  return indexableSeoPages.map((route) => ({
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: route.title.split("|")[0].trim(),
    url: canonicalUrl(route.path),
  }));
}

function renderHead(page: SeoPage) {
  const canonical = canonicalUrl(page.path);
  const image = socialImageUrl();
  const siteName = siteNameForPage(page);
  const hreflangLinks = alternateLinksForPage(page)
    .map((link) => `<link rel="alternate" hreflang="${escapeHtml(link.hreflang)}" href="${escapeHtml(link.href)}" />`)
    .join("\n    ");

  return `<!-- seo:start -->
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="keywords" content="${escapeHtml(page.keywords.join(", "))}" />
    <meta name="robots" content="${page.noindex ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"}" />
    <meta name="author" content="${escapeHtml(siteName)}" />
    <meta name="theme-color" content="#0d9488" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    ${hreflangLinks}
    <link rel="manifest" href="/site.webmanifest" />
    <meta property="og:locale" content="${pageOgLocale(page)}" />
    <meta property="og:type" content="${escapeHtml(page.type || "website")}" />
    <meta property="og:site_name" content="${escapeHtml(siteName)}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:alt" content="${escapeHtml(socialImageAltForPage(page))}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM summary" />
    <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="Full LLM context" />
    <script type="application/ld+json" id="matgarko-route-schema">${escapeJson(schemaForPage(page))}</script>
    <script type="application/ld+json" id="matgarko-site-navigation">${escapeJson(siteNavigationSchema())}</script>
    <!-- seo:end -->`;
}

export const prerenderRoutes = orderedSeoPages.map((page) => page.path);
export { llmsFullTxt, llmsTxt, sitemapXml };

export function render(path: string) {
  const page = getSeoPage(path);
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={path}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );

  return {
    html,
    head: renderHead(page),
    lang: pageHtmlLang(page),
    dir: pageHtmlDir(page),
  };
}
