import { ApiError, signupApiBase, timeoutSignal } from "./api";

/**
 * A media buyer's account on matgarko.com/media-buyers. A code step (signup, password reset) carries its
 * handle in X-Signup-Token; a signed-in call carries the session in X-Media-Buyer-Session. The session
 * stays in this browser for 30 days from its last use, so signing in again, and a WhatsApp code, are rare.
 */
export interface MediaBuyerService { title: string; description?: string | null; price?: number | null }
export interface MediaBuyerProfile {
  name: string; phone: string; isAgency: boolean; agencyName?: string | null; photoUrl?: string | null;
  country?: string | null; city?: string | null; headline?: string | null;
  platforms: string[]; specialties: string[];
  currency?: string | null; monthlyFee?: number | null; adSpendPercent?: number | null; salesPercent?: number | null; perOrderFee?: number | null;
  howIWork?: string | null; bestResult?: string | null; idealClient?: string | null; yearsExperience?: number | null;
  facebookUrl?: string | null; linkedInUrl?: string | null; portfolioUrl?: string | null; isAvailable: boolean;
  services: MediaBuyerService[]; workPhotos: { id: number; url: string }[];
  /** How much is filled in, and which required parts are not. */
  percent: number; missing: string[];
  hidden: boolean; hiddenReason?: string | null; visible: boolean;
}
/** What the dashboard saves: the profile's own fields, without what the server works out. */
export type MediaBuyerProfileInput = Omit<MediaBuyerProfile, "phone" | "photoUrl" | "workPhotos" | "percent" | "missing" | "hidden" | "hiddenReason" | "visible">;
export interface MediaBuyerSource { source?: string; medium?: string; campaign?: string; content?: string }

const sessionKey = "matgarko-media-buyer-session";
const base = `${signupApiBase}/media-buyers`;

export function getSession(): string | null {
  try { return localStorage.getItem(sessionKey); } catch { return null; }
}
export function setSession(session: string | null) {
  try {
    if (session) localStorage.setItem(sessionKey, session);
    else localStorage.removeItem(sessionKey);
  } catch { /* A private window without storage: the session lasts until the tab closes its state. */ }
}

async function request<T>(path: string, options: { data?: unknown; file?: Blob; token?: string; signedIn?: boolean; get?: boolean } = {}): Promise<T> {
  const headers: Record<string, string> = {};
  let body: BodyInit | undefined;
  if (options.file) {
    const form = new FormData();
    form.append("file", options.file, "photo.jpg");
    body = form;
  } else if (!options.get) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(options.data ?? {});
  }
  if (options.token) headers["X-Signup-Token"] = options.token;
  if (options.signedIn) headers["X-Media-Buyer-Session"] = getSession() ?? "";
  let response: Response;
  try {
    response = await fetch(base + path, {
      method: options.get ? "GET" : "POST", credentials: "omit", cache: "no-store",
      signal: timeoutSignal(options.file ? 60000 : 20000), headers, body,
    });
  } catch (error) {
    throw new ApiError(error instanceof DOMException && error.name === "TimeoutError" ? "RequestTimeout" : "NetworkError");
  }
  const json = await response.json().catch(() => null);
  if (!response.ok) {
    // A session the server no longer knows is forgotten here too, so the pages send the buyer to sign in.
    if (response.status === 401 && json?.code === "SignedOut") setSession(null);
    throw new ApiError(json?.code || (response.status === 429 ? "rate_limited" : "InvalidRequest"),
      json?.retryAfterSeconds || Number(response.headers.get("Retry-After")) || 0, response.status, json?.field || undefined);
  }
  if (!json || typeof json !== "object") throw new ApiError("InvalidResponse");
  return json as T;
}

type Awaiting = { token: string; retryAfterSeconds: number };
type SignedIn = { session: string; profile: MediaBuyerProfile };
const keep = (result: SignedIn) => { setSession(result.session); return result.profile; };

export const mediaBuyerApi = {
  signUp: (data: { name: string; phone: string; password: string; website?: string; source?: MediaBuyerSource }) => request<Awaiting>("", { data }),
  verify: (token: string, code: string) => request<SignedIn>("/verify", { token, data: { code } }).then(keep),
  resend: (token: string) => request<{ retryAfterSeconds: number }>("/resend", { token }),
  signIn: (phone: string, password: string) => request<SignedIn>("/login", { data: { phone, password } }).then(keep),
  signOut: () => request<unknown>("/logout", { signedIn: true }).catch(() => undefined).then(() => setSession(null)),
  forgotPassword: (phone: string) => request<Awaiting>("/password/forgot", { data: { phone } }),
  resetPassword: (token: string, code: string, password: string) => request<SignedIn>("/password/reset", { token, data: { code, password } }).then(keep),
  me: () => request<{ profile: MediaBuyerProfile }>("/me", { signedIn: true, get: true }).then((result) => result.profile),
  save: (data: MediaBuyerProfileInput) => request<{ profile: MediaBuyerProfile }>("/me", { signedIn: true, data }).then((result) => result.profile),
  setPhoto: (file: Blob) => request<{ profile: MediaBuyerProfile }>("/me/photo", { signedIn: true, file }).then((result) => result.profile),
  addWorkPhoto: (file: Blob) => request<{ profile: MediaBuyerProfile }>("/me/work-photos", { signedIn: true, file }).then((result) => result.profile),
  removeWorkPhoto: (id: number) => request<{ profile: MediaBuyerProfile }>(`/me/work-photos/${id}/delete`, { signedIn: true }).then((result) => result.profile),
};

/**
 * A phone photo is several megabytes; the server takes two. This draws it no wider or taller than
 * `side` and saves it as JPEG. A browser that cannot (an odd format) sends the file as it is, and the
 * server answers if that is too big.
 */
export async function shrinkPhoto(file: File, side = 1200): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, side / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.86));
    return blob ?? file;
  } catch {
    return file;
  }
}

const messages: Record<string, string> = {
  PhoneInvalid: "اكتب رقم موبايل صحيح عليه واتساب، وتأكد من مفتاح الدولة.",
  PhoneTaken: "الرقم ده له حساب فعلًا. ادخل بيه، أو استخدم «نسيت الباسورد».",
  WeakPassword: "الباسورد لازم يكون 8 حروف أو أرقام على الأقل.",
  WhatsAppFailed: "مقدرناش نبعت الكود على الرقم ده. اتأكد إن عليه واتساب وإن مفتاح الدولة صح.",
  InvalidCode: "الكود مش صحيح. راجعه وجرّب تاني.",
  CodeExpired: "الكود انتهى. اطلب كود جديد.",
  TooManyAttempts: "محاولات كتير. اطلب كود جديد.",
  ResendTooSoon: "استنى دقيقة قبل ما تطلب كود جديد.",
  TooManyCodes: "وصلت لأقصى عدد أكواد النهارده. جرّب بكرة، أو كلمنا على واتساب.",
  InvalidLogin: "الرقم أو الباسورد مش صح.",
  Locked: "محاولات كتير غلط. استنى ربع ساعة وجرّب تاني، أو استخدم «نسيت الباسورد».",
  NotFound: "الطلب ده انتهى. ابدأ من الأول.",
  ImageInvalid: "الصورة لازم تكون JPG أو PNG أو WebP، وأقل من 2 ميجا.",
  TooManyPhotos: "أقصى عدد 3 صور. احذف واحدة الأول.",
  SignedOut: "جلستك انتهت. ادخل تاني.",
  rate_limited: "محاولات كتير. استنى شوية وجرّب تاني.",
  NetworkError: "مقدرناش نوصل للخدمة. جرّب تاني بعد لحظات.",
  RequestTimeout: "الخدمة أخدت وقت أطول من المتوقع. جرّب تاني.",
  InvalidRequest: "راجع البيانات وجرّب تاني.",
  InvalidResponse: "حصلت مشكلة عندنا. جرّب تاني.",
};

const fieldLabels: Record<string, string> = {
  name: "الاسم", agencyName: "اسم الوكالة", country: "البلد", city: "المدينة", headline: "سطر التعريف",
  platforms: "المنصات", specialties: "المجالات", currency: "العملة", monthlyFee: "المبلغ الشهري",
  adSpendPercent: "نسبة الإعلانات", salesPercent: "نسبة المبيعات", perOrderFee: "المبلغ على الطلب",
  howIWork: "بشتغل إزاي", bestResult: "أحسن نتيجة", idealClient: "التاجر المناسب", yearsExperience: "سنين الخبرة",
  facebookUrl: "لينك فيسبوك", linkedInUrl: "لينك لينكدإن", portfolioUrl: "لينك البورتفوليو", services: "الخدمات",
};

/** What to tell the buyer about a failed call, in their words. */
export function mediaBuyerError(caught: unknown): { text: string; field?: string; code: string } {
  const error = caught instanceof ApiError ? caught : new ApiError("NetworkError");
  if (error.code === "Invalid" && error.field) {
    const key = error.field.startsWith("services") ? "services" : error.field;
    return { text: `راجع: ${fieldLabels[key] ?? "البيانات"}.`, field: error.field, code: error.code };
  }
  return { text: messages[error.code] ?? messages.InvalidRequest, field: error.field, code: error.code };
}
