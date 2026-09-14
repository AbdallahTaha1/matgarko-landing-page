import { getConsent } from './consent';
import { getAcquisition, getLandingParameters } from './attribution';
const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
const adsId = import.meta.env.VITE_GOOGLE_ADS_ID;
const adsLabel = import.meta.env.VITE_GOOGLE_ADS_SIGNUP_LABEL;
let initialized = false;
let lastPage = '';
let previousLocation = '';
const sent = new Set<string>();
declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; } }
export function initAnalytics() {
  if (getConsent() !== 'accepted') {
    window.gtag?.('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    lastPage = '';
    return;
  }
  if (!gaId && !adsId) return;
  window.dataLayer ||= [];
  // The Google tag command queue uses Arguments objects, as in Google's standard snippet.
  // eslint-disable-next-line prefer-rest-params
  window.gtag ||= function () { window.dataLayer!.push(arguments); };
  window.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'denied', ad_personalization: 'denied' });
  if (initialized) return;
  initialized = true;
  window.gtag('js', new Date());
  if (gaId) window.gtag('config', gaId, { send_page_view: false });
  if (adsId) window.gtag('config', adsId, { send_page_view: false });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId || adsId)}`;
  document.head.appendChild(script);
}
export function trackPageView(path: string) {
  if (getConsent() !== 'accepted' || !gaId || !window.gtag || path === lastPage) return;
  lastPage = path;
  const location = new URL(path, window.location.origin);
  if (!previousLocation) {
    for (const [key, value] of getLandingParameters()) if (!location.searchParams.has(key)) location.searchParams.set(key, value);
  }
  for (const key of [...location.searchParams.keys()]) {
    if (!['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid'].includes(key)) location.searchParams.delete(key);
  }
  let referrer = '';
  try { referrer = document.referrer ? new URL(document.referrer).origin : ''; } catch { /* No referrer. */ }
  window.gtag('event', 'page_view', { send_to: gaId, page_location: location.href, page_title: document.title, page_referrer: previousLocation || referrer });
  previousLocation = location.href;
}
export function trackSignupStep(event: 'signup_start' | 'signup_details_submitted' | 'signup_email_verified') {
  if (getConsent() !== 'accepted' || !gaId || !window.gtag) return;
  window.gtag('event', event, { send_to: gaId, method: 'email' });
}
export function trackSignupComplete(conversionId: string) {
  if (getConsent() !== 'accepted' || !window.gtag) return;
  const acquisition = getAcquisition();
  for (const destination of ['ga', 'ads'] as const) {
    if (destination === 'ga' ? !gaId : !adsId || !adsLabel) continue;
    const key = `matgarko-conversion-${destination}-${conversionId}`;
    let recorded = sent.has(key);
    try { recorded ||= localStorage.getItem(key) === 'sent'; } catch { /* In-memory deduplication. */ }
    if (recorded) continue;
    sent.add(key);
    if (destination === 'ga') window.gtag('event', 'sign_up', { send_to: gaId, method: 'email', transaction_id: conversionId, first_source: acquisition?.first.source, last_source: acquisition?.last.source });
    else window.gtag('event', 'conversion', { send_to: `${adsId}/${adsLabel}`, transaction_id: conversionId });
    try { localStorage.setItem(key, 'sent'); } catch { /* In-memory deduplication. */ }
  }
}
