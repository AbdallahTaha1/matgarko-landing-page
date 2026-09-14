export type Consent = 'unknown' | 'accepted' | 'declined';
let memory: Consent = 'unknown';
export function getConsent(): Consent {
  if (typeof window === 'undefined') return 'unknown';
  try {
    const value = localStorage.getItem('matgarko-consent');
    return value === 'accepted' || value === 'declined' ? value : memory;
  } catch { return memory; }
}
export function setConsent(value: Consent) {
  memory = value;
  try { localStorage.setItem('matgarko-consent', value); } catch { /* Optional storage. */ }
  if (value !== 'accepted') {
    try { localStorage.removeItem('matgarko-acquisition'); } catch { /* Optional storage. */ }
  }
  window.dispatchEvent(new Event('matgarko-consent'));
}
export function subscribeConsent(callback: () => void) {
  window.addEventListener('matgarko-consent', callback);
  window.addEventListener('storage', callback);
  return () => { window.removeEventListener('matgarko-consent', callback); window.removeEventListener('storage', callback); };
}
export const serverConsent = (): Consent => 'unknown';
