import { getConsent } from './consent';

const pixelId = import.meta.env.VITE_META_PIXEL_ID?.trim();
// Temporary: VITE_META_REQUIRE_CONSENT=false lets Meta run for every visitor, whatever they chose
// in the cookie banner. Remove the variable to put the consent check back.
const consentRequired = import.meta.env.VITE_META_REQUIRE_CONSENT !== 'false';
interface PixelQueue {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: PixelQueue;
  loaded: boolean;
  version: string;
}
declare global { interface Window { fbq?: PixelQueue; _fbq?: PixelQueue; } }

let initialized = false;
let loading = false;
let loaded = false;
let lastPage = '';
const pendingSignups = new Set<string>();
const sentSignups = new Set<string>();
const allowedQueryKeys = new Set(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid', 'fbclid']);

// Meta reads URLs itself. Suppress tracking on URLs/referrers containing
// non-marketing query parameters rather than forwarding possible signup secrets.
function safeUrl(value: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return !url.hash && [...url.searchParams.keys()].every(key => allowedQueryKeys.has(key));
  } catch { return false; }
}
function canTrack() {
  return /^\d+$/.test(pixelId || '') && (!consentRequired || getConsent() === 'accepted')
    && safeUrl(window.location.href) && safeUrl(document.referrer);
}

export function initMetaPixel() {
  if (!canTrack()) {
    window.fbq?.('consent', 'revoke');
    lastPage = '';
    pendingSignups.clear();
    return;
  }
  if (!window.fbq) {
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    }) as PixelQueue;
    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    window.fbq = fbq;
    window._fbq ||= fbq;
  }
  window.fbq('consent', 'grant');
  if (!initialized) {
    // Only explicit events; do not automatically read registration form fields.
    window.fbq('set', 'autoConfig', false, pixelId);
    window.fbq('init', pixelId);
    initialized = true;
  }
  if (loading || loaded) return;
  loading = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  script.onload = () => {
    loading = false;
    loaded = true;
    if (!canTrack()) return;
    trackMetaPageView();
    for (const id of pendingSignups) trackMetaSignupComplete(id);
  };
  script.onerror = () => {
    loading = false;
    script.remove();
  };
  document.head.appendChild(script);
}

export function trackMetaPageView() {
  if (!loaded || !canTrack() || !window.fbq) return;
  const page = window.location.pathname + window.location.search;
  if (page === lastPage) return;
  window.fbq('trackSingle', pixelId, 'PageView');
  lastPage = page;
}

// Settles once the browser has finished Meta's request for this event, or after a bound. A
// request still in flight can be dropped when the page navigates away, so callers wait for this
// before leaving.
const pixelRequestWaitMs = 4000;
function pixelRequestDone(event: string) {
  return new Promise<void>(resolve => {
    let observer: PerformanceObserver | undefined;
    const finish = () => { clearTimeout(timer); observer?.disconnect(); resolve(); };
    const timer = setTimeout(finish, pixelRequestWaitMs);
    try {
      observer = new PerformanceObserver(list => {
        if (list.getEntries().some(entry => entry.name.includes('facebook.com/tr') && entry.name.includes(`ev=${event}`))) finish();
      });
      observer.observe({ type: 'resource' });
    } catch { /* The timer still bounds the wait. */ }
  });
}

export function trackMetaSignupComplete(conversionId: string): Promise<void> {
  if (!conversionId || !canTrack()) return Promise.resolve();
  initMetaPixel();
  const key = `matgarko-conversion-meta-${pixelId}-${conversionId}`;
  let recorded = sentSignups.has(key);
  try { recorded ||= localStorage.getItem(key) === 'sent'; } catch { /* In-memory fallback. */ }
  if (recorded) return Promise.resolve();
  const sent = pixelRequestDone('CompleteRegistration');
  if (!loaded || !window.fbq) { pendingSignups.add(conversionId); return sent; }
  pendingSignups.delete(conversionId);
  window.fbq('trackSingle', pixelId, 'CompleteRegistration', {}, { eventID: conversionId });
  sentSignups.add(key);
  try { localStorage.setItem(key, 'sent'); } catch { /* In-memory fallback. */ }
  return sent;
}

// The server reports CompleteRegistration itself once the owner confirms their email, so a closed
// tab or an ad blocker cannot lose it. It needs the ids Meta's pixel keeps in this browser to match
// the signup to the ad click, so the signup request carries them. Nothing is sent when Meta is
// not allowed to run here.
export function metaBrowserIds() {
  if (!canTrack()) return undefined;
  const cookie = (name: string) => document.cookie.split('; ').find(part => part.startsWith(name + '='))?.slice(name.length + 1);
  return { sourceUrl: window.location.origin + window.location.pathname, fbp: cookie('_fbp'), fbc: cookie('_fbc') };
}
