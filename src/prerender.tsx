import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App";
import {
  breadcrumbSchema,
  canonicalUrl,
  faqSchema,
  orderedSeoPages,
  organizationSchema,
  type SeoPage,
  SITE_NAME,
  socialImageUrl,
  softwareSchema,
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
  return [
    organizationSchema(),
    websiteSchema(),
    softwareSchema(),
    breadcrumbSchema(page),
    ...(page.path === "/" ? [faqSchema()] : []),
  ];
}

function siteNavigationSchema() {
  return orderedSeoPages.map((route) => ({
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: route.title.split("|")[0].trim(),
    url: canonicalUrl(route.path),
  }));
}

function renderHead(page: SeoPage) {
  const canonical = canonicalUrl(page.path);
  const image = socialImageUrl();

  return `<!-- seo:start -->
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="keywords" content="${escapeHtml(page.keywords.join(", "))}" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <meta name="author" content="${escapeHtml(SITE_NAME)}" />
    <meta name="theme-color" content="#0d9488" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta property="og:locale" content="ar_EG" />
    <meta property="og:type" content="${escapeHtml(page.type || "website")}" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:alt" content="متجركو - منصة إنشاء متجر إلكتروني عربي" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <script type="application/ld+json" id="matgarko-route-schema">${escapeJson(schemaForPage(page))}</script>
    <script type="application/ld+json" id="matgarko-site-navigation">${escapeJson(siteNavigationSchema())}</script>
    <!-- seo:end -->`;
}

export const prerenderRoutes = orderedSeoPages.map((page) => page.path);

export function render(path: string) {
  const page = orderedSeoPages.find((route) => route.path === path) || orderedSeoPages[0];
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
  };
}
