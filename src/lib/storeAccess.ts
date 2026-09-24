import { useSyncExternalStore } from 'react';

const storageKey = 'matgarko-last-store';
const changeEvent = 'matgarko-store-changed';
const baseDomain = 'matgarko.com';
const reserved = new Set(['www', 'signup', 'auth', 'downloads', 'api', 'admin', 'mail', 'landing', 'support', 'host']);

export type StoreLinks = { storeUrl: string; adminUrl: string };

// Keep navigation on a single tenant host, with no credentials, queries or fragments.
function storeOrigin(value: string, domain = baseDomain) {
  try {
    const url = new URL(value);
    const suffix = `.${domain.toLowerCase()}`;
    const subdomain = url.hostname.endsWith(suffix) ? url.hostname.slice(0, -suffix.length) : '';
    if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(subdomain) || reserved.has(subdomain)) return null;
    if (url.username || url.password || url.search || url.hash) return null;
    if (url.protocol !== 'https:' && !(import.meta.env.DEV && url.protocol === 'http:')) return null;
    if (!import.meta.env.DEV && url.port) return null;
    if (!['/', '/admin', '/admin/'].includes(url.pathname)) return null;
    return url.origin;
  } catch { return null; }
}

export function readyStoreLinks(adminUrl?: string, storeUrl?: string, domain = baseDomain): StoreLinks | null {
  const origin = adminUrl && storeOrigin(adminUrl, domain);
  if (!origin || (storeUrl && storeOrigin(storeUrl, domain) !== origin)) return null;
  return { storeUrl: `${origin}/`, adminUrl: `${origin}/admin` };
}

export function parseStoreAddress(value: string): StoreLinks | null {
  const address = value.trim().toLowerCase();
  if (!address || /\s|\\/.test(address)) return null;
  const url = /^[a-z0-9-]+$/.test(address)
    ? `https://${address}.${baseDomain}`
    : address.startsWith('https://') ? address : `https://${address}`;
  const origin = storeOrigin(url);
  return origin ? { storeUrl: `${origin}/`, adminUrl: `${origin}/admin` } : null;
}

export function rememberStore(store: StoreLinks) {
  // Only the public store address is retained; never account data or signup tokens.
  const safe = readyStoreLinks(store.adminUrl, store.storeUrl);
  if (!safe) return;
  try {
    localStorage.setItem(storageKey, safe.storeUrl);
    window.dispatchEvent(new Event(changeEvent));
  } catch { /* Navigation still works when browser storage is blocked. */ }
}

export function forgetStore() {
  try {
    localStorage.removeItem(storageKey);
    window.dispatchEvent(new Event(changeEvent));
  } catch { /* Optional shortcut. */ }
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(changeEvent, callback);
  };
}

function snapshot() {
  try { return localStorage.getItem(storageKey); } catch { return null; }
}

export function useRememberedStore() {
  const value = useSyncExternalStore(subscribe, snapshot, () => null);
  return value ? parseStoreAddress(value) : null;
}
