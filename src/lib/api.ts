import type { Acquisition } from './attribution';
const base = (import.meta.env.VITE_SIGNUP_API_URL || 'https://signup.matgarko.com/api/signup/v1').replace(/\/$/, '');
export interface SignupModel {
  storeName: string; subdomain: string; email: string; phone: string;
  password: string; confirmPassword: string; acceptTerms: boolean; acquisition?: Acquisition; discoverySource?: string;
}
export interface SignupStatus {
  state: 'verification' | 'provisioning' | 'ready' | 'unavailable';
  retryAfterSeconds?: number; conversionId?: string; adminUrl?: string; storeUrl?: string;
}
export class ApiError extends Error {
  code: string; retryAfterSeconds: number; status: number;
  constructor(code: string, retryAfterSeconds = 0, status = 0) { super(code); this.code = code; this.retryAfterSeconds = retryAfterSeconds; this.status = status; }
}
async function request<T>(path: string, options: { data?: unknown; token?: string; signal?: AbortSignal } = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(base + path, {
      method: options.data === undefined ? 'GET' : 'POST', credentials: 'omit', cache: 'no-store',
      signal: options.signal || AbortSignal.timeout(20000),
      headers: { ...(options.data === undefined ? {} : { 'Content-Type': 'application/json' }), ...(options.token ? { 'X-Signup-Token': options.token } : {}) },
      body: options.data === undefined ? undefined : JSON.stringify(options.data),
    });
  } catch (error) { if (options.signal?.aborted) throw error; throw new ApiError('NetworkError'); }
  const json = await response.json().catch(() => null);
  if (!response.ok) throw new ApiError(json?.code || (response.status === 429 ? 'rate_limited' : 'InvalidRequest'), json?.retryAfterSeconds || Number(response.headers.get('Retry-After')) || 0, response.status);
  if (!json || typeof json !== 'object') throw new ApiError('InvalidResponse');
  return json as T;
}
export const api = {
  config: () => request<{ enabled: boolean; baseDomain: string }>('/config'),
  checkSubdomain: (value: string, signal?: AbortSignal) => request<{ available: boolean; code: string; message?: string }>(`/check-subdomain?value=${encodeURIComponent(value)}`, { signal }),
  signup: (data: SignupModel) => request<{ token: string; state: 'verification'; emailDeliveryFailed: boolean; retryAfterSeconds: number }>('/registrations', { data }),
  verify: (token: string, code: string) => request<SignupStatus>('/verify', { token, data: { code } }),
  resend: (token: string) => request<{ retryAfterSeconds: number }>('/resend', { token, data: {} }),
  status: (token: string) => request<SignupStatus>('/status', { token }),
};
