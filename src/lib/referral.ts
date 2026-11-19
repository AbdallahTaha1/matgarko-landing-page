/**
 * «ادعُ تاجر»: a merchant's invitation link is matgarko.com/register?ref=<their store's subdomain>. The code is kept
 * for this tab, so a reload or a step back still sends it, and goes with the signup; the server ignores one that names
 * no live store or the visitor's own number or email.
 */
const key = 'matgarko-referral';

export function readReferral(): string | null {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('ref')?.trim().toLowerCase();
    if (fromUrl && /^[a-z0-9-]{1,200}$/.test(fromUrl)) {
      sessionStorage.setItem(key, fromUrl);
      return fromUrl;
    }
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}
