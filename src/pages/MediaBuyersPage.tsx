import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, CheckCircle2, Gauge, Loader2, MessageCircle, Plus, Search, Send, ShieldCheck, Trash2, Users, Wallet } from "lucide-react";
import { api, ApiError, type MediaBuyerApplication } from "@/lib/api";
import { captureAcquisition, getLandingParameters } from "@/lib/attribution";
import { normalizePhoneInput, phoneCountries, signupPhoneNumber, type CountryCode } from "@/lib/phone";
import { FaqList } from "@/components/FaqList";
import {
  adCountries, currencies, currencyFor, currencyNames, mediaBuyerFaq, platforms, pricingModels, services, specialties,
  type Choice,
} from "@/data/mediaBuyers";

const fieldClass = "block rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-950 focus:outline-emerald-600";
const inputClass = `mt-2 w-full ${fieldClass}`;
const hintClass = "mt-1.5 text-xs leading-5 text-gray-500";
const labelClass = "block text-sm font-bold text-gray-800";
const BIO_MAX = 400;

type Work = { field: string; duration: string; work: string; result: string; link: string };
const emptyWork: Work = { field: "", duration: "", work: "", result: "", link: "" };

type Form = {
  isAgency: boolean; agencyName: string; name: string; phone: string; email: string;
  country: CountryCode; city: string; worksIn: string[]; yearsExperience: string;
  platforms: string[]; specialties: string[]; services: string[];
  minMonthlyBudget: string; budgetCurrency: string; pricingModel: string; priceNote: string;
  bio: string; facebookUrl: string; linkedInUrl: string; portfolioUrl: string; matgarkoStores: string;
  portfolio: Work[]; acceptTerms: boolean; website: string;
};

const fieldLabels: Record<string, string> = {
  name: "الاسم", agencyName: "اسم الوكالة", phone: "رقم الواتساب", email: "البريد", country: "البلد", city: "المدينة",
  worksIn: "البلاد اللي بتعلن فيها", yearsExperience: "سنين الخبرة", platforms: "المنصات", specialties: "المجالات",
  services: "الخدمات", minMonthlyBudget: "أقل ميزانية", budgetCurrency: "العملة", pricingModel: "طريقة الحساب",
  priceNote: "السعر التقريبي", bio: "النبذة", facebookUrl: "لينك فيسبوك", linkedInUrl: "لينك لينكدإن",
  portfolioUrl: "لينك البورتفوليو", matgarkoStores: "متاجر عملائك", portfolio: "سابقة الأعمال", acceptTerms: "الموافقة على الشروط",
};

const messages: Record<string, string> = {
  PhoneInvalid: "اكتب رقم موبايل صحيح عليه واتساب، وتأكد من مفتاح الدولة.",
  AlreadyApplied: "الرقم ده قدّم قبل كده وطلبه عندنا. هنكلمك على واتساب.",
  WhatsAppFailed: "مقدرناش نبعت الكود على الرقم ده. اتأكد إن عليه واتساب وإن مفتاح الدولة صح.",
  InvalidCode: "الكود مش صحيح. راجعه وجرّب تاني.",
  CodeExpired: "الكود انتهى. اطلب كود جديد.",
  TooManyAttempts: "محاولات كتير. اطلب كود جديد.",
  ResendTooSoon: "استنى العداد يخلص قبل ما تطلب كود جديد.",
  TooManyResends: "وصلت لأقصى عدد أكواد. كلمنا على واتساب ونساعدك.",
  NotFound: "الطلب ده انتهى. ابدأ من الأول.",
  rate_limited: "محاولات كتير. استنى شوية وجرّب تاني.",
  NetworkError: "مقدرناش نوصل للخدمة. جرّب تاني بعد لحظات.",
  RequestTimeout: "الخدمة أخدت وقت أطول من المتوقع. جرّب تاني.",
  InvalidRequest: "راجع البيانات وجرّب تاني.",
  InvalidResponse: "حصلت مشكلة عندنا. جرّب تاني.",
};

function messageFor(error: ApiError) {
  if (error.code === "Invalid" && error.field) {
    const key = error.field.startsWith("portfolio") ? "portfolio" : error.field;
    return `راجع: ${fieldLabels[key] ?? "البيانات"}.`;
  }
  if (error.code === "RejectedRecently") {
    return error.retryOn ? `الرقم ده اتراجع طلبه قريب. تقدر تقدّم تاني من يوم ${error.retryOn}.` : "الرقم ده اتراجع طلبه قريب. تقدر تقدّم تاني بعد 30 يوم.";
  }
  return messages[error.code] ?? messages.InvalidRequest;
}

/** The id of the input a server or client error points at, so it can take the focus. */
function inputFor(field?: string) {
  if (!field) return undefined;
  const work = /^portfolio\.(\d)$/.exec(field);
  if (work) return `work-${work[1]}-field`;
  return field === "portfolio" ? "work-0-field" : field === "acceptTerms" ? "acceptTerms" : `mb-${field}`;
}

const trim = (value: string) => value.trim();
const optional = (value: string) => value.trim() || undefined;
const isLink = (value: string) => !value.trim() || /^https?:\/\/\S+\.\S+/i.test(value.trim());

/** The first wrong field, by the server's names, before anything is sent. */
function check(form: Form, phone: string | undefined): string | undefined {
  if (trim(form.name).length < 2) return "name";
  if (form.isAgency && trim(form.agencyName).length < 2) return "agencyName";
  if (!phone) return "phone";
  if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) return "email";
  if (trim(form.city).length < 2) return "city";
  if (form.worksIn.length === 0) return "worksIn";
  const years = Number(form.yearsExperience);
  if (form.yearsExperience === "" || !Number.isInteger(years) || years < 0 || years > 40) return "yearsExperience";
  if (form.platforms.length === 0) return "platforms";
  if (form.specialties.length === 0) return "specialties";
  if (form.services.length === 0) return "services";
  const budget = Number(form.minMonthlyBudget);
  if (form.minMonthlyBudget === "" || !Number.isFinite(budget) || budget < 0) return "minMonthlyBudget";
  const bio = trim(form.bio);
  if (bio.length < 20 || bio.length > BIO_MAX) return "bio";
  for (const [index, work] of form.portfolio.entries()) {
    if (trim(work.field).length < 2 || trim(work.work).length < 10 || trim(work.result).length < 2 || !isLink(work.link)) return `portfolio.${index}`;
  }
  if (!isLink(form.facebookUrl)) return "facebookUrl";
  if (!isLink(form.linkedInUrl)) return "linkedInUrl";
  if (!isLink(form.portfolioUrl)) return "portfolioUrl";
  if (!form.acceptTerms) return "acceptTerms";
  return undefined;
}

function source(): MediaBuyerApplication["source"] {
  captureAcquisition();
  const landing = getLandingParameters();
  const here = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
  const value = (key: string) => (here.get(key) || landing.get(key) || "").trim().slice(0, 200) || undefined;
  const picked = { source: value("utm_source"), medium: value("utm_medium"), campaign: value("utm_campaign"), content: value("utm_content") };
  return Object.values(picked).some(Boolean) ? picked : undefined;
}

function Chips({ id, legend, hint, choices, value, onChange }: {
  id: string; legend: string; hint?: string; choices: Choice[]; value: string[]; onChange: (value: string[]) => void;
}) {
  return (
    <fieldset id={id} tabIndex={-1} className="focus:outline-none">
      <legend className={labelClass}>{legend}</legend>
      {hint && <p className={hintClass}>{hint}</p>}
      <div className="mt-2.5 flex flex-wrap gap-2">
        {choices.map((choice) => {
          const on = value.includes(choice.key);
          return (
            <label key={choice.key} className={`cursor-pointer select-none rounded-full border px-3.5 py-2 text-sm font-bold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-emerald-600 ${on ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-gray-300 bg-white text-gray-700 hover:border-emerald-300"}`}>
              <input type="checkbox" className="sr-only" checked={on}
                onChange={() => onChange(on ? value.filter((key) => key !== choice.key) : [...value, choice.key])} />
              {on && <CheckCircle2 className="-ms-0.5 me-1 inline h-4 w-4 align-[-3px]" aria-hidden="true" />}
              {choice.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Benefit({ icon, title, children, soon }: { icon: ReactNode; title: string; children: ReactNode; soon?: boolean }) {
  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="icon-tile h-11 w-11 shrink-0">{icon}</span>
        <h3 className="text-base font-extrabold leading-7 text-gray-950 font-heading sm:text-lg">
          {title}
          {soon && <span className="ms-2 rounded-full bg-amber-50 px-2 py-0.5 align-middle text-xs font-bold text-amber-800">قريبًا</span>}
        </h3>
      </div>
      <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">{children}</p>
    </div>
  );
}

/** matgarko.com/media-buyers: why apply, how the review works, the application, and its WhatsApp code. */
export function MediaBuyersPage() {
  const [form, setForm] = useState<Form>({
    isAgency: false, agencyName: "", name: "", phone: "", email: "", country: "EG", city: "", worksIn: ["EG"],
    yearsExperience: "", platforms: [], specialties: [], services: ["ads"], minMonthlyBudget: "", budgetCurrency: "EGP",
    pricingModel: "", priceNote: "", bio: "", facebookUrl: "", linkedInUrl: "", portfolioUrl: "", matgarkoStores: "",
    portfolio: [{ ...emptyWork }], acceptTerms: false, website: "",
  });
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>("EG");
  const [stage, setStage] = useState<"form" | "code" | "done">("form");
  const [token, setToken] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<{ text: string; field?: string } | null>(null);
  const [notice, setNotice] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const errorBox = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const phone = signupPhoneNumber(form.phone, phoneCountry);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm((current) => ({ ...current, [key]: value }));
  const setWork = (index: number, key: keyof Work, value: string) =>
    setForm((current) => ({ ...current, portfolio: current.portfolio.map((work, i) => (i === index ? { ...work, [key]: value } : work)) }));

  const fail = (text: string, field?: string) => {
    setError({ text, field });
    setNotice("");
    requestAnimationFrame(() => {
      const target = inputFor(field) ? document.getElementById(inputFor(field)!) : null;
      (target ?? errorBox.current)?.focus();
      (target ?? errorBox.current)?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  };

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    const wrong = check(form, phone);
    if (wrong) return fail(wrong === "phone" ? messages.PhoneInvalid : `راجع: ${fieldLabels[wrong.startsWith("portfolio") ? "portfolio" : wrong]}.`, wrong);
    setBusy(true);
    setError(null);
    try {
      const result = await api.applyMediaBuyer({
        isAgency: form.isAgency, agencyName: form.isAgency ? trim(form.agencyName) : undefined, name: trim(form.name),
        phone: phone!, email: optional(form.email), country: form.country, city: trim(form.city), worksIn: form.worksIn,
        yearsExperience: Number(form.yearsExperience), platforms: form.platforms, specialties: form.specialties,
        services: form.services, minMonthlyBudget: Math.round(Number(form.minMonthlyBudget)), budgetCurrency: form.budgetCurrency,
        pricingModel: optional(form.pricingModel), priceNote: optional(form.priceNote), bio: trim(form.bio),
        facebookUrl: optional(form.facebookUrl), linkedInUrl: optional(form.linkedInUrl), portfolioUrl: optional(form.portfolioUrl),
        matgarkoStores: optional(form.matgarkoStores),
        portfolio: form.portfolio.map((work) => ({ field: trim(work.field), duration: optional(work.duration), work: trim(work.work), result: trim(work.result), link: optional(work.link) })),
        acceptTerms: form.acceptTerms, website: form.website || undefined, source: source(),
      });
      setToken(result.token);
      setCooldown(result.retryAfterSeconds || 60);
      setStage("code");
      requestAnimationFrame(() => top.current?.scrollIntoView({ block: "start", behavior: "smooth" }));
    } catch (caught) {
      const apiError = caught instanceof ApiError ? caught : new ApiError("NetworkError");
      fail(messageFor(apiError), apiError.field);
    } finally {
      setBusy(false);
    }
  }

  async function verify(event: FormEvent) {
    event.preventDefault();
    if (busy || code.length !== 6) return;
    setBusy(true);
    setError(null);
    try {
      await api.verifyMediaBuyer(token, code);
      setStage("done");
      requestAnimationFrame(() => top.current?.scrollIntoView({ block: "start", behavior: "smooth" }));
    } catch (caught) {
      fail(messageFor(caught instanceof ApiError ? caught : new ApiError("NetworkError")));
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    if (busy || cooldown > 0) return;
    setBusy(true);
    setError(null);
    try {
      const result = await api.resendMediaBuyer(token);
      setCooldown(result.retryAfterSeconds || 60);
      setCode("");
      setNotice("بعتنالك كود جديد على واتساب.");
    } catch (caught) {
      const apiError = caught instanceof ApiError ? caught : new ApiError("NetworkError");
      if (apiError.retryAfterSeconds) setCooldown(apiError.retryAfterSeconds);
      fail(messageFor(apiError));
    } finally {
      setBusy(false);
    }
  }

  const invalid = (field: string) => error?.field === field || undefined;
  const countryName = (code: string) => phoneCountries.find((country) => country.code === code)?.ar ?? code;
  const countryChoices: Choice[] = [...new Set<CountryCode>([...adCountries, ...form.worksIn as CountryCode[]])]
    .map((code) => ({ key: code, label: countryName(code) }));

  return (
    <div dir="rtl">
      <section className="page-hero text-center">
        <div className="container-x">
          <span className="section-kicker">للميديا باير والوكالات</span>
          <h1 className="page-title mt-4">اشتغل مع تجار متجركو</h1>
          <p className="page-lead mt-4">
            قدّم مرة واحدة، ولو اتقبلت هتظهر للتجار اللي بيدوّروا على حد يعلن لهم جوه لوحة تحكم متجركو. ببلاش، ومن غير نسبة من شغلك.
          </p>
          <a href="#apply" className="btn btn-primary mt-7">قدّم دلوقتي</a>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <h2 className="section-title text-center">هتاخد إيه؟</h2>
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2">
            <Benefit icon={<Users className="h-5 w-5" aria-hidden="true" />} title="عملاء من تجار متجركو">
              التاجر بيختار من الميديا باير المقبولين حسب المجال والمنصة والميزانية، ولما يطلبك بيوصلك رقمه واللي محتاجه.
            </Benefit>
            <Benefit icon={<BadgeCheck className="h-5 w-5" aria-hidden="true" />} title="نتايجك من المنصة، مش سكرينشوتات" soon>
              كل أوردر في متجركو مكتوب عليه جه من أنهي إعلان. هنحسب لك الأوردرات اللي اتسلّمت من شغلك، بموافقة التاجر، وتظهر في بروفايلك.
            </Benefit>
            <Benefit icon={<Gauge className="h-5 w-5" aria-hidden="true" />} title="أدوات تريّحك في الشغل">
              بيكسل ميتا مع Conversions API وبيكسل تيك توك جاهزين، ومصدر كل أوردر في الإحصائيات، وحاجب الأوردرات الوهمية ببلاش.
            </Benefit>
            <Benefit icon={<Wallet className="h-5 w-5" aria-hidden="true" />} title="أرخص لعملائك الكبار">
              باقة احترافي بـ2,000 ج.م في الشهر من غير رسوم على الأوردر، والمتجر الجديد بيبدأ بـ20 أوردر ببلاش.
            </Benefit>
          </div>
        </div>
      </section>

      <section className="section border-y border-gray-100 bg-gray-50/60">
        <div className="container-x max-w-4xl">
          <h2 className="section-title text-center">بيمشي إزاي؟</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: <Send className="h-5 w-5" aria-hidden="true" />, title: "قدّم في 5 دقايق", text: "اكتب خبرتك وسابقة أعمالك، وأكّد رقمك بكود على واتساب." },
              { icon: <Search className="h-5 w-5" aria-hidden="true" />, title: "بنراجع طلبك", text: "بنقرا شغلك، وممكن نكلمك على واتساب. لو اتقبلت بنبعتلك رسالة." },
              { icon: <MessageCircle className="h-5 w-5" aria-hidden="true" />, title: "التجار يوصلولك", text: "تظهر في صفحة الميديا باير جوه لوحة التاجر، وطلباتهم توصلك على رقمك." },
            ].map((step, index) => (
              <li key={step.title} className="card p-5">
                <div className="flex items-center gap-3">
                  <span className="icon-tile h-10 w-10 shrink-0">{step.icon}</span>
                  <span className="text-xs font-bold text-emerald-700">خطوة {index + 1}</span>
                </div>
                <h3 className="mt-3 font-extrabold text-gray-950 font-heading">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-7 text-gray-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="apply" className="signup-form section scroll-mt-20">
        <div ref={top} className="mx-auto max-w-2xl scroll-mt-24 px-4">
          <h2 className="section-title text-center">{stage === "done" ? "طلبك وصل" : "قدّم كميديا باير"}</h2>
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-xl sm:p-7">
            {error && (
              <div ref={errorBox} tabIndex={-1} role="alert" className="mb-5 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm leading-6 text-red-800">
                {error.text}
              </div>
            )}
            {notice && <p role="status" className="mb-4 text-sm text-emerald-700">{notice}</p>}

            {stage === "done" && (
              <div className="py-4 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" aria-hidden="true" />
                <p className="mt-4 text-lg font-extrabold text-gray-950 font-heading">شكرًا! طلبك عندنا ✅</p>
                <p className="mt-2 text-sm leading-7 text-gray-600">هنراجعه ونكلمك على واتساب على نفس الرقم. لو عندك عميل محتاج متجر، يقدر يفتحه ببلاش دلوقتي.</p>
                <Link to="/register" className="btn btn-secondary mt-5">افتح متجر لعميل</Link>
              </div>
            )}

            {stage === "code" && (
              <form onSubmit={verify} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold">أكّد رقمك</h3>
                  <p className="mt-1.5 text-sm leading-6 text-gray-600">
                    بعتنا كود من 6 أرقام على واتساب للرقم <bdi dir="ltr" className="font-bold">{phone}</bdi>.
                  </p>
                </div>
                <label htmlFor="code" className={labelClass}>الكود
                  <input id="code" className={inputClass + " text-center tracking-[0.4em]"} value={code} required pattern="[0-9]{6}" maxLength={6}
                    inputMode="numeric" autoComplete="one-time-code" dir="ltr" autoFocus
                    onChange={(event) => setCode(normalizePhoneInput(event.target.value).replace(/[^0-9]/g, "").slice(0, 6))} />
                </label>
                <button type="submit" disabled={busy || code.length !== 6} className="btn btn-primary w-full disabled:opacity-50">
                  {busy ? <Loader2 className="h-5 w-5 animate-spin" aria-label="جاري التأكيد" /> : "تأكيد وإرسال الطلب"}
                </button>
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                  <button type="button" disabled={busy || cooldown > 0} onClick={resend} className="font-bold underline disabled:no-underline">
                    {cooldown > 0 ? `ابعت كود جديد بعد ${cooldown} ثانية` : "ابعت كود جديد"}
                  </button>
                  <button type="button" disabled={busy} onClick={() => { setStage("form"); setError(null); setNotice(""); setCode(""); }} className="underline">
                    تعديل البيانات أو الرقم
                  </button>
                </div>
              </form>
            )}

            {stage === "form" && (
              <form onSubmit={submit} noValidate className="space-y-7">
                <fieldset className="space-y-5">
                  <legend className="text-lg font-extrabold text-gray-950 font-heading">عنك</legend>
                  <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="بتشتغل لوحدك ولا وكالة؟">
                    {[{ agency: false, label: "ميديا باير فري لانس" }, { agency: true, label: "وكالة" }].map((option) => (
                      <label key={option.label} className={`cursor-pointer rounded-lg border px-3 py-3 text-center text-sm font-bold has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-emerald-600 ${form.isAgency === option.agency ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-gray-300 text-gray-700"}`}>
                        <input type="radio" name="kind" className="sr-only" checked={form.isAgency === option.agency} onChange={() => set("isAgency", option.agency)} />
                        {option.label}
                      </label>
                    ))}
                  </div>
                  {form.isAgency && (
                    <label htmlFor="mb-agencyName" className={labelClass}>اسم الوكالة
                      <input id="mb-agencyName" className={inputClass} value={form.agencyName} maxLength={120} autoComplete="organization"
                        aria-invalid={invalid("agencyName")} onChange={(event) => set("agencyName", event.target.value)} />
                    </label>
                  )}
                  <label htmlFor="mb-name" className={labelClass}>{form.isAgency ? "اسمك (المسؤول عن الوكالة)" : "اسمك"}
                    <input id="mb-name" className={inputClass} value={form.name} maxLength={100} autoComplete="name"
                      aria-invalid={invalid("name")} onChange={(event) => set("name", event.target.value)} />
                    <p className={hintClass}>ده اللي هيظهر للتجار.</p>
                  </label>
                  <div className="grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                    <label htmlFor="mb-phoneCountry" className={labelClass}>مفتاح الدولة
                      <select id="mb-phoneCountry" className={inputClass} value={phoneCountry} onChange={(event) => setPhoneCountry(event.target.value as CountryCode)}>
                        {phoneCountries.map((country) => <option key={country.code} value={country.code}>{country.ar} ({"⁦"}+{country.callingCode}{"⁩"})</option>)}
                      </select>
                    </label>
                    <label htmlFor="mb-phone" className={labelClass}>رقم الواتساب
                      <input id="mb-phone" type="tel" dir="ltr" inputMode="tel" autoComplete="tel-national" maxLength={32} className={inputClass}
                        value={form.phone} aria-invalid={invalid("phone")} aria-describedby="mb-phone-hint" onChange={(event) => set("phone", event.target.value)} />
                    </label>
                  </div>
                  <p id="mb-phone-hint" className={`${hintClass} -mt-3`}>هنبعت عليه كود تأكيد، ومش هيظهر غير للتاجر اللي يطلبك.</p>
                  <label htmlFor="mb-email" className={labelClass}>البريد الإلكتروني <span className="font-normal text-gray-500">(اختياري)</span>
                    <input id="mb-email" type="email" dir="ltr" autoComplete="email" maxLength={320} className={inputClass}
                      value={form.email} aria-invalid={invalid("email")} onChange={(event) => set("email", event.target.value)} />
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label htmlFor="mb-country" className={labelClass}>عايش في
                      <select id="mb-country" className={inputClass} value={form.country} onChange={(event) => {
                        const country = event.target.value as CountryCode;
                        setForm((current) => ({ ...current, country, budgetCurrency: currencyFor(country) }));
                      }}>
                        {phoneCountries.map((country) => <option key={country.code} value={country.code}>{country.ar}</option>)}
                      </select>
                    </label>
                    <label htmlFor="mb-city" className={labelClass}>المدينة
                      <input id="mb-city" className={inputClass} value={form.city} maxLength={80} autoComplete="address-level2"
                        aria-invalid={invalid("city")} onChange={(event) => set("city", event.target.value)} />
                    </label>
                  </div>
                </fieldset>

                <fieldset className="space-y-6 border-t border-gray-100 pt-6">
                  <legend className="text-lg font-extrabold text-gray-950 font-heading">شغلك</legend>
                  <Chips id="mb-worksIn" legend="بتعلن لعملاء في" choices={countryChoices} value={form.worksIn} onChange={(value) => set("worksIn", value)} />
                  <Chips id="mb-platforms" legend="المنصات اللي بتشتغل عليها" choices={platforms} value={form.platforms} onChange={(value) => set("platforms", value)} />
                  <Chips id="mb-specialties" legend="المجالات اللي عندك فيها خبرة" hint="اختار لحد 8." choices={specialties} value={form.specialties}
                    onChange={(value) => set("specialties", value.slice(0, 8))} />
                  <Chips id="mb-services" legend="بتقدّم إيه" choices={services} value={form.services} onChange={(value) => set("services", value)} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label htmlFor="mb-yearsExperience" className={labelClass}>سنين الخبرة
                      <input id="mb-yearsExperience" type="number" inputMode="numeric" min={0} max={40} dir="ltr" className={inputClass}
                        value={form.yearsExperience} aria-invalid={invalid("yearsExperience")} onChange={(event) => set("yearsExperience", event.target.value)} />
                    </label>
                    <div>
                      <label htmlFor="mb-minMonthlyBudget" className={labelClass}>أقل ميزانية إعلانات شهرية بتقبلها</label>
                      <div className="mt-2 flex gap-2">
                        <input id="mb-minMonthlyBudget" type="number" inputMode="numeric" min={0} dir="ltr" className={`${fieldClass} min-w-0 flex-1`}
                          value={form.minMonthlyBudget} aria-invalid={invalid("minMonthlyBudget")} onChange={(event) => set("minMonthlyBudget", event.target.value)} />
                        <select aria-label="العملة" className={`${fieldClass} w-24 shrink-0`} value={form.budgetCurrency} onChange={(event) => set("budgetCurrency", event.target.value)}>
                          {currencies.map((currency) => <option key={currency} value={currency}>{currencyNames[currency]}</option>)}
                        </select>
                      </div>
                      <p className={hintClass}>بيساعد التاجر يعرف إنت مناسب لميزانيته.</p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label htmlFor="mb-pricingModel" className={labelClass}>بتحاسب إزاي؟ <span className="font-normal text-gray-500">(اختياري)</span>
                      <select id="mb-pricingModel" className={inputClass} value={form.pricingModel} onChange={(event) => set("pricingModel", event.target.value)}>
                        <option value="">مش عايز أقول</option>
                        {pricingModels.map((model) => <option key={model.key} value={model.key}>{model.label}</option>)}
                      </select>
                    </label>
                    <label htmlFor="mb-priceNote" className={labelClass}>السعر التقريبي <span className="font-normal text-gray-500">(اختياري)</span>
                      <input id="mb-priceNote" className={inputClass} value={form.priceNote} maxLength={200} placeholder="مثال: من 5,000 ج.م في الشهر"
                        onChange={(event) => set("priceNote", event.target.value)} />
                    </label>
                  </div>
                  <label htmlFor="mb-bio" className={labelClass}>نبذة عنك وعن شغلك
                    <textarea id="mb-bio" rows={4} maxLength={BIO_MAX} className={inputClass + " leading-7"} value={form.bio} aria-invalid={invalid("bio")}
                      placeholder="مثال: بشتغل على متاجر الدفع عند الاستلام من 4 سنين، أغلبها ملابس ومنتج واحد، وبعمل الكرييتف بنفسي."
                      onChange={(event) => set("bio", event.target.value)} />
                    <p className={hintClass}>{form.bio.trim().length < 20 ? "20 حرف على الأقل. " : ""}{form.bio.length} / {BIO_MAX}</p>
                  </label>
                </fieldset>

                <fieldset className="space-y-4 border-t border-gray-100 pt-6">
                  <legend className="text-lg font-extrabold text-gray-950 font-heading">سابقة أعمال</legend>
                  <p className="-mt-2 text-sm leading-6 text-gray-600">مثال واحد على الأقل، ولحد 3. اكتب النتيجة برقم لو تقدر: أوردرات، أو تكلفة الأوردر، أو نسبة التسليم.</p>
                  {form.portfolio.map((work, index) => (
                    <div key={index} className={`space-y-4 rounded-xl border p-4 ${error?.field === `portfolio.${index}` ? "border-red-300 bg-red-50/40" : "border-gray-200 bg-gray-50/60"}`}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-extrabold text-gray-900">مثال {index + 1}</p>
                        {form.portfolio.length > 1 && (
                          <button type="button" className="inline-flex items-center gap-1 text-sm text-red-700" aria-label={`احذف مثال ${index + 1}`}
                            onClick={() => set("portfolio", form.portfolio.filter((_, i) => i !== index))}>
                            <Trash2 className="h-4 w-4" aria-hidden="true" /> احذف
                          </button>
                        )}
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label htmlFor={`work-${index}-field`} className={labelClass}>المجال
                          <input id={`work-${index}-field`} className={inputClass} value={work.field} maxLength={100} placeholder="مثال: براند ملابس"
                            onChange={(event) => setWork(index, "field", event.target.value)} />
                        </label>
                        <label htmlFor={`work-${index}-duration`} className={labelClass}>المدة <span className="font-normal text-gray-500">(اختياري)</span>
                          <input id={`work-${index}-duration`} className={inputClass} value={work.duration} maxLength={60} placeholder="مثال: 6 شهور"
                            onChange={(event) => setWork(index, "duration", event.target.value)} />
                        </label>
                      </div>
                      <label htmlFor={`work-${index}-work`} className={labelClass}>عملت إيه
                        <textarea id={`work-${index}-work`} rows={2} className={inputClass + " leading-7"} value={work.work} maxLength={400}
                          placeholder="مثال: حملات ميتا وتيك توك للبيع عند الاستلام، والكرييتف" onChange={(event) => setWork(index, "work", event.target.value)} />
                      </label>
                      <label htmlFor={`work-${index}-result`} className={labelClass}>النتيجة
                        <input id={`work-${index}-result`} className={inputClass} value={work.result} maxLength={300} placeholder="مثال: 1,200 أوردر في الشهر بتكلفة 45 ج.م للأوردر"
                          onChange={(event) => setWork(index, "result", event.target.value)} />
                      </label>
                      <label htmlFor={`work-${index}-link`} className={labelClass}>لينك <span className="font-normal text-gray-500">(اختياري)</span>
                        <input id={`work-${index}-link`} type="url" dir="ltr" className={inputClass} value={work.link} maxLength={300} placeholder="https://"
                          onChange={(event) => setWork(index, "link", event.target.value)} />
                      </label>
                    </div>
                  ))}
                  {form.portfolio.length < 3 && (
                    <button type="button" className="inline-flex items-center gap-1.5 text-sm font-bold" onClick={() => set("portfolio", [...form.portfolio, { ...emptyWork }])}>
                      <Plus className="h-4 w-4" aria-hidden="true" /> أضف مثال تاني
                    </button>
                  )}
                </fieldset>

                <fieldset className="space-y-4 border-t border-gray-100 pt-6">
                  <legend className="text-lg font-extrabold text-gray-950 font-heading">روابط <span className="text-sm font-normal text-gray-500">(اختياري)</span></legend>
                  {([["facebookUrl", "فيسبوك"], ["linkedInUrl", "لينكدإن"], ["portfolioUrl", "بورتفوليو أو موقعك"]] as const).map(([key, label]) => (
                    <label key={key} htmlFor={`mb-${key}`} className={labelClass}>{label}
                      <input id={`mb-${key}`} type="url" dir="ltr" className={inputClass} value={form[key]} maxLength={300} placeholder="https://"
                        aria-invalid={invalid(key)} onChange={(event) => set(key, event.target.value)} />
                    </label>
                  ))}
                  <label htmlFor="mb-matgarkoStores" className={labelClass}>عندك عملاء شغالين على متجركو؟ اكتب روابط متاجرهم
                    <textarea id="mb-matgarkoStores" rows={2} dir="ltr" className={inputClass} value={form.matgarkoStores} maxLength={500}
                      placeholder="shop.matgarko.com" onChange={(event) => set("matgarkoStores", event.target.value)} />
                    <p className={hintClass}>بيسرّع المراجعة. مش بيظهر للتجار.</p>
                  </label>
                </fieldset>

                {/* People never see this field; a bot that fills it is answered and forgotten. Clipped in place:
                    an offset far to one side would widen this right-to-left page. */}
                <div aria-hidden="true" className="sr-only">
                  <label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => set("website", event.target.value)} /></label>
                </div>

                <div className="space-y-4 border-t border-gray-100 pt-6">
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm leading-7 text-gray-700">
                    <p className="flex items-center gap-2 font-extrabold text-gray-900"><ShieldCheck className="h-5 w-5 text-emerald-700" aria-hidden="true" /> الشروط باختصار</p>
                    <ul className="mt-2 list-disc space-y-1 ps-5">
                      <li>متجركو بترشّحك للتجار، ومش طرف في اتفاقك ولا فلوسك معاهم.</li>
                      <li>ممنوع تضمن للتاجر نتايج، أو تاخد فلوس من غير اتفاق مكتوب، أو تكلّم تاجر ما طلبكش.</li>
                      <li>أي شكوى حقيقية من تاجر ممكن توقف ظهورك.</li>
                      <li>رقمك بيظهر بس للتاجر اللي يطلبك.</li>
                    </ul>
                  </div>
                  <label htmlFor="acceptTerms" className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-800">
                    <input id="acceptTerms" type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-emerald-700" checked={form.acceptTerms}
                      aria-invalid={invalid("acceptTerms")} onChange={(event) => set("acceptTerms", event.target.checked)} />
                    <span>موافق على الشروط دي وعلى <Link to="/terms" target="_blank" className="underline">الشروط والأحكام</Link> و<Link to="/privacy" target="_blank" className="underline">سياسة الخصوصية</Link>.</span>
                  </label>
                  <button type="submit" disabled={busy} className="btn btn-primary w-full disabled:opacity-50">
                    {busy ? <Loader2 className="h-5 w-5 animate-spin" aria-label="جاري الإرسال" /> : "ابعت كود التأكيد على واتساب"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section border-t border-gray-100">
        <div className="container-x max-w-3xl">
          <h2 className="section-title text-center">أسئلة الميديا باير</h2>
          <FaqList items={mediaBuyerFaq} className="mt-8" />
        </div>
      </section>
    </div>
  );
}
