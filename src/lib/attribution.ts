import { getConsent } from './consent';
export interface AcquisitionTouch {
  source: string; medium: string; campaign?: string; content?: string; term?: string;
  gclid?: string; gbraid?: string; wbraid?: string; referrerHost?: string;
  landingPath: string; capturedAt: string;
}
export interface Acquisition { first: AcquisitionTouch; last: AcquisitionTouch }
let initial: AcquisitionTouch | undefined;
let current: Acquisition | undefined;
let landingParameters = new URLSearchParams();
const marketingKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid'];
const lifetime = 90 * 24 * 60 * 60 * 1000;
export function captureAcquisition() {
  if (typeof window === 'undefined') return;
  if (!initial) {
    const params = new URLSearchParams(window.location.search);
    landingParameters = new URLSearchParams([...params].filter(([key]) => marketingKeys.includes(key)));
    const value = (key: string, max = 200) => params.get(key)?.trim().slice(0, max) || undefined;
    let referrerHost: string | undefined;
    try {
      const host = new URL(document.referrer).hostname;
      if (host !== window.location.hostname && host !== 'matgarko.com' && host !== 'www.matgarko.com') referrerHost = host;
    } catch { /* Direct visit. */ }
    const paidGoogle = value('gclid', 512) || value('gbraid', 512) || value('wbraid', 512);
    const organic = referrerHost && /(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com|search\.yahoo\.com)$/.test(referrerHost);
    initial = {
      source: value('utm_source', 100) || (paidGoogle ? 'google' : referrerHost || 'direct'),
      medium: value('utm_medium', 100) || (paidGoogle ? 'cpc' : organic ? 'organic' : referrerHost ? 'referral' : 'none'),
      campaign: value('utm_campaign'), content: value('utm_content'), term: value('utm_term'),
      gclid: value('gclid', 512), gbraid: value('gbraid', 512), wbraid: value('wbraid', 512),
      referrerHost, landingPath: window.location.pathname.slice(0, 512), capturedAt: new Date().toISOString(),
    };
  }
  if (getConsent() !== 'accepted') { current = undefined; return; }
  if (current) return;
  let saved: Acquisition | undefined;
  try {
    const parsed = JSON.parse(localStorage.getItem('matgarko-acquisition') || 'null') as Acquisition | null;
    if (parsed?.first && parsed.last && Date.now() - Date.parse(parsed.first.capturedAt) < lifetime) saved = parsed;
  } catch { /* Missing or unavailable storage. */ }
  current = { first: saved?.first || initial, last: initial.source === 'direct' && saved ? saved.last : initial };
  try { localStorage.setItem('matgarko-acquisition', JSON.stringify(current)); } catch { /* Signup still works. */ }
}
export function getAcquisition() {
  captureAcquisition();
  return getConsent() === 'accepted' ? current : undefined;
}

// Retain campaign information in memory when consent is given after internal navigation.
export function getLandingParameters() { return new URLSearchParams(landingParameters); }
