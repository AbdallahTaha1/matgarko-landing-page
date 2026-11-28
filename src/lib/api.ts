import type { Acquisition } from './attribution';
const base = (import.meta.env.VITE_SIGNUP_API_URL || 'https://signup.matgarko.com/api/signup/v1').replace(/\/$/, '');
/** The signup API's address, for the callers that are not a store signup (media buyers). */
export const signupApiBase = base;
export interface SignupModel {
  storeName: string; subdomain: string; email: string; phone: string;
  password: string; confirmPassword: string; acceptTerms: boolean; acquisition?: Acquisition; discoverySource?: string;
  /** The country the store sells in (prices in its currency, deliveries inside it), apart from the owner's phone. */
  country?: string;
  meta?: { sourceUrl: string; fbp?: string; fbc?: string };
  /** The subdomain of the store whose invitation link («ادعُ تاجر») brought the visitor. */
  ref?: string;
}
export interface SignupStatus {
  state: 'verification' | 'provisioning' | 'ready' | 'unavailable';
  retryAfterSeconds?: number; conversionId?: string; adminUrl?: string; storeUrl?: string;
}
export class ApiError extends Error {
  code: string; retryAfterSeconds: number; status: number;
  /** The form field the server found wrong. */
  field?: string; retryOn?: string;
  constructor(code: string, retryAfterSeconds = 0, status = 0, field?: string, retryOn?: string) { super(code); this.code = code; this.retryAfterSeconds = retryAfterSeconds; this.status = status; this.field = field; this.retryOn = retryOn; }
}
// AbortSignal.timeout needs iOS 16 and AbortSignal.any iOS 17.4; older iPhones threw before the
// request left and saw "unable to connect". A plain controller works on every browser.
export function timeoutSignal(ms: number, parent?: AbortSignal): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(new DOMException('The request timed out.', 'TimeoutError')), ms);
  parent?.addEventListener('abort', () => controller.abort(parent.reason), { once: true });
  return controller.signal;
}
async function request<T>(path: string, options: { data?: unknown; token?: string; signal?: AbortSignal } = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(base + path, {
      method: options.data === undefined ? 'GET' : 'POST', credentials: 'omit', cache: 'no-store',
      signal: options.signal || timeoutSignal(20000),
      headers: { ...(options.data === undefined ? {} : { 'Content-Type': 'application/json' }), ...(options.token ? { 'X-Signup-Token': options.token } : {}) },
      body: options.data === undefined ? undefined : JSON.stringify(options.data),
    });
  } catch (error) {
    if (options.signal?.aborted) throw error;
    throw new ApiError(error instanceof DOMException && error.name === 'TimeoutError' ? 'RequestTimeout' : 'NetworkError');
  }
  const json = await response.json().catch(() => null);
  if (!response.ok) throw new ApiError(json?.code || (response.status === 429 ? 'rate_limited' : 'InvalidRequest'), json?.retryAfterSeconds || Number(response.headers.get('Retry-After')) || 0, response.status, json?.field || undefined, json?.retryOn || undefined);
  if (!json || typeof json !== 'object') throw new ApiError('InvalidResponse');
  return json as T;
}
export const api = {
  config: () => request<{ enabled: boolean; baseDomain: string }>('/config'),
  checkSubdomain: (value: string, signal?: AbortSignal) => request<{ available: boolean; code: string; message?: string }>(`/check-subdomain?value=${encodeURIComponent(value)}`, { signal }),
  checkEmail: (email: string, signal?: AbortSignal) => request<{ available: boolean; code: string }>('/check-email', { data: { email }, signal }),
  checkPhone: (phone: string, signal?: AbortSignal) => request<{ available: boolean; code: string }>('/check-phone', { data: { phone }, signal }),
  signup: (data: SignupModel) => request<{ token: string; state: 'verification'; emailDeliveryFailed: boolean; whatsAppSent?: boolean; retryAfterSeconds: number }>('/registrations', { data }),
  verify: (token: string, code: string) => request<SignupStatus>('/verify', { token, data: { code } }),
  resend: (token: string) => request<{ retryAfterSeconds: number; whatsAppSent?: boolean }>('/resend', { token, data: {} }),
  status: (token: string) => request<SignupStatus>('/status', { token }),
  // A single-use link that signs the new owner into their dashboard. Callers fall back to the
  // plain dashboard address, which asks for the password, if this fails.
  signIn: (token: string) => request<{ url: string }>('/sign-in', { token, data: {} }),
};
