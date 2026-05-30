const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initAnalytics() {
  // The Google tag is loaded in index.html so Google/Netlify tag scanners can detect it.
  // This fallback only exists for local builds where the static tag may be removed later.
  if (!GA_MEASUREMENT_ID || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
}

export function trackPageView(path: string) {
  if (!GA_MEASUREMENT_ID || !window.gtag) {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
  });
}
