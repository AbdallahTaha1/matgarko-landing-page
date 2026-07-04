import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  articleSchema,
  breadcrumbSchema,
  canonicalUrl,
  faqSchema,
  indexableSeoPages,
  organizationSchema,
  seoPages,
  SITE_NAME,
  socialImageUrl,
  softwareSchema,
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
    const page = seoPages[pathname] || seoPages["/"];
    const canonical = canonicalUrl(page.path);
    const image = socialImageUrl();

    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    document.title = page.title;

    upsertMeta("name", "description", page.description);
    upsertMeta("name", "keywords", page.keywords.join(", "));
    upsertMeta("name", "robots", page.noindex ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    upsertMeta("name", "author", SITE_NAME);
    upsertMeta("name", "theme-color", "#0d9488");
    upsertMeta("property", "og:locale", "ar_EG");
    upsertMeta("property", "og:type", page.type || "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", page.title);
    upsertMeta("property", "og:description", page.description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:alt", "متجركو - منصة إنشاء متجر إلكتروني عربي");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", page.title);
    upsertMeta("name", "twitter:description", page.description);
    upsertMeta("name", "twitter:image", image);

    upsertLink("canonical", canonical);

    const pageArticleSchema = articleSchema(page);
    const jsonLd = [
      organizationSchema(),
      websiteSchema(),
      softwareSchema(),
      breadcrumbSchema(page),
      ...(pageArticleSchema ? [pageArticleSchema] : []),
      ...(page.path === "/" ? [faqSchema()] : []),
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
