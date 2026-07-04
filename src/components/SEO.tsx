import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  articleSchema,
  alternateLinksForPage,
  breadcrumbSchema,
  canonicalUrl,
  faqSchema,
  getSeoPage,
  indexableSeoPages,
  organizationSchema,
  pageHtmlDir,
  pageHtmlLang,
  pageOgLocale,
  pricingFaqSchema,
  serviceSchema,
  siteNameForPage,
  socialImageAltForPage,
  socialImageUrl,
  softwareSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/seo";

function upsertMeta(attribute: "name" | "property", value: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${value}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
}

function upsertAlternateMarkdown(href: string, title: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][href="${href}"]`);

  if (!element) {
    element = document.createElement("link");
    element.rel = "alternate";
    element.href = href;
    document.head.appendChild(element);
  }

  element.type = "text/markdown";
  element.title = title;
}

function syncHreflangLinks(links: Array<{ hreflang: string; href: string }>) {
  const wanted = new Map(links.map((link) => [link.hreflang, link.href]));
  const existing = document.head.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]');

  existing.forEach((element) => {
    const hreflang = element.getAttribute("hreflang");

    if (!hreflang || !wanted.has(hreflang)) {
      element.remove();
    }
  });

  links.forEach((link) => {
    let element = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${link.hreflang}"]`);

    if (!element) {
      element = document.createElement("link");
      element.rel = "alternate";
      element.setAttribute("hreflang", link.hreflang);
      document.head.appendChild(element);
    }

    element.href = link.href;
  });
}

function upsertJsonLd(id: string, data: unknown) {
  let element = document.getElementById(id) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.id = id;
    document.head.appendChild(element);
  }

  element.text = JSON.stringify(data);
}

export function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = getSeoPage(pathname);
    const canonical = canonicalUrl(page.path);
    const image = socialImageUrl();
    const siteName = siteNameForPage(page);

    document.documentElement.lang = pageHtmlLang(page);
    document.documentElement.dir = pageHtmlDir(page);
    document.title = page.title;

    upsertMeta("name", "description", page.description);
    upsertMeta("name", "keywords", page.keywords.join(", "));
    upsertMeta("name", "robots", page.noindex ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    upsertMeta("name", "author", siteName);
    upsertMeta("name", "theme-color", "#0d9488");
    upsertMeta("property", "og:locale", pageOgLocale(page));
    upsertMeta("property", "og:type", page.type || "website");
    upsertMeta("property", "og:site_name", siteName);
    upsertMeta("property", "og:title", page.title);
    upsertMeta("property", "og:description", page.description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:alt", socialImageAltForPage(page));
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", page.title);
    upsertMeta("name", "twitter:description", page.description);
    upsertMeta("name", "twitter:image", image);

    upsertLink("canonical", canonical);
    syncHreflangLinks(alternateLinksForPage(page));
    upsertAlternateMarkdown("/llms.txt", "LLM summary");
    upsertAlternateMarkdown("/llms-full.txt", "Full LLM context");

    const pageArticleSchema = articleSchema(page);
    const jsonLd = [
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

    upsertJsonLd("matgarko-route-schema", jsonLd);
    upsertJsonLd(
      "matgarko-site-navigation",
      indexableSeoPages.map((route) => ({
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        name: route.title.split("|")[0].trim(),
        url: canonicalUrl(route.path),
      })),
    );
  }, [pathname]);

  return null;
}
