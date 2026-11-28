import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Camera, CheckCircle2, CircleAlert, EyeOff, Loader2, LogOut, Plus, Trash2 } from "lucide-react";
import { phoneCountries } from "@/lib/phone";
import { mbFieldClass, mbHintClass, mbInputClass, mbLabelClass } from "@/lib/mediaBuyerUi";
import {
  getSession, mediaBuyerApi, mediaBuyerError, shrinkPhoto,
  type MediaBuyerProfile, type MediaBuyerProfileInput,
} from "@/lib/mediaBuyerApi";
import {
  DIRECTORY_OPEN, currencies, currencyFor, currencyNames, missingLabels, platforms, pricingMethods, serviceSuggestions, specialties,
  type Choice, type PricingKey,
} from "@/data/mediaBuyers";

const MAX_SERVICES = 5;
const MAX_WORK_PHOTOS = 3;

type ServiceForm = { title: string; description: string; price: string; free: boolean };
type Form = {
  name: string; isAgency: boolean; agencyName: string; country: string; city: string; headline: string;
  platforms: string[]; specialties: string[]; currency: string;
  pricing: Record<PricingKey, { on: boolean; value: string }>;
  services: ServiceForm[];
  howIWork: string; bestResult: string; idealClient: string; yearsExperience: string;
  facebookUrl: string; linkedInUrl: string; portfolioUrl: string; isAvailable: boolean;
};

const text = (value?: string | null) => value ?? "";
const number = (value?: number | null) => (value == null ? "" : String(value));

function toForm(profile: MediaBuyerProfile): Form {
  const country = profile.country || "EG";
  return {
    name: profile.name, isAgency: profile.isAgency, agencyName: text(profile.agencyName), country, city: text(profile.city),
    headline: text(profile.headline), platforms: profile.platforms, specialties: profile.specialties,
    currency: profile.currency || currencyFor(country),
    pricing: Object.fromEntries(pricingMethods.map((method) => [method.key, { on: profile[method.key] != null, value: number(profile[method.key]) }])) as Form["pricing"],
    services: profile.services.map((service) => ({ title: service.title, description: text(service.description), price: number(service.price), free: service.price == null })),
    howIWork: text(profile.howIWork), bestResult: text(profile.bestResult), idealClient: text(profile.idealClient),
    yearsExperience: number(profile.yearsExperience), facebookUrl: text(profile.facebookUrl), linkedInUrl: text(profile.linkedInUrl),
    portfolioUrl: text(profile.portfolioUrl), isAvailable: profile.isAvailable,
  };
}

const optional = (value: string) => value.trim() || null;
const amount = (value: string) => (value.trim() === "" || !Number.isFinite(Number(value)) ? null : Number(value));

function toInput(form: Form): MediaBuyerProfileInput {
  const price = (key: PricingKey) => (form.pricing[key].on ? amount(form.pricing[key].value) : null);
  return {
    name: form.name.trim(), isAgency: form.isAgency, agencyName: form.isAgency ? optional(form.agencyName) : null,
    country: form.country, city: optional(form.city), headline: optional(form.headline),
    platforms: form.platforms, specialties: form.specialties, currency: form.currency,
    monthlyFee: price("monthlyFee"), adSpendPercent: price("adSpendPercent"), salesPercent: price("salesPercent"), perOrderFee: price("perOrderFee"),
    howIWork: optional(form.howIWork), bestResult: optional(form.bestResult), idealClient: optional(form.idealClient),
    yearsExperience: amount(form.yearsExperience), facebookUrl: optional(form.facebookUrl), linkedInUrl: optional(form.linkedInUrl),
    portfolioUrl: optional(form.portfolioUrl), isAvailable: form.isAvailable,
    services: form.services.map((service) => ({ title: service.title.trim(), description: optional(service.description), price: service.free ? null : amount(service.price) })),
  };
}

/** The first thing wrong before anything is sent, as the words to show and the element to take the focus. */
function check(form: Form): { text: string; id: string } | undefined {
  if (form.name.trim().length < 2) return { text: "اكتب اسمك.", id: "mb-name" };
  if (form.isAgency && form.agencyName.trim().length < 2) return { text: "اكتب اسم الوكالة.", id: "mb-agencyName" };
  for (const method of pricingMethods) {
    const entry = form.pricing[method.key];
    const value = Number(entry.value);
    if (entry.on && (entry.value.trim() === "" || !Number.isFinite(value) || value <= 0 || value > method.max))
      return { text: `اكتب رقم صحيح في «${method.label}»، أو شيل العلامة من عليها.`, id: `mb-${method.key}` };
  }
  for (const [index, service] of form.services.entries()) {
    if (service.title.trim().length < 2) return { text: `اكتب عنوان الخدمة رقم ${index + 1}، أو احذفها.`, id: `service-${index}-title` };
    if (!service.free && !(Number(service.price) > 0)) return { text: `اكتب سعر «${service.title.trim()}»، أو علّم إنها مجانًا.`, id: `service-${index}-price` };
  }
  for (const [key, label] of [["facebookUrl", "فيسبوك"], ["linkedInUrl", "لينكدإن"], ["portfolioUrl", "البورتفوليو"]] as const) {
    if (form[key].trim() && !/^https?:\/\/\S+\.\S+/i.test(form[key].trim())) return { text: `لينك ${label} لازم يبدأ بـ https://`, id: `mb-${key}` };
  }
  return undefined;
}

function Chips({ id, legend, hint, choices, value, onChange }: {
  id: string; legend: string; hint?: string; choices: Choice[]; value: string[]; onChange: (value: string[]) => void;
}) {
  return (
    <fieldset id={id} tabIndex={-1} className="focus:outline-none">
      <legend className={mbLabelClass}>{legend}</legend>
      {hint && <p className={mbHintClass}>{hint}</p>}
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

function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-5 border-t border-gray-100 pt-6 first:border-t-0 first:pt-0">
      <legend className="text-lg font-extrabold text-gray-950 font-heading">{title}{note && <span className="ms-2 text-sm font-normal text-gray-500">{note}</span>}</legend>
      {children}
    </fieldset>
  );
}

/** Where the profile stands, in one coloured line with what to do next. */
function Status({ profile }: { profile: MediaBuyerProfile }) {
  if (profile.hidden) {
    return (
      <div role="status" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-7 text-red-900">
        <EyeOff className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
        <p><strong>بروفايلك مخفي عن التجار.</strong> {profile.hiddenReason} عدّل اللي محتاج تعديل، وكلمنا على واتساب عشان نرجّعه.</p>
      </div>
    );
  }
  if (profile.missing.length > 0) {
    return (
      <div role="status" className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
        <CircleAlert className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
        <p><strong>بروفايلك لسه مش جاهز يظهر للتجار.</strong> ناقصه: {profile.missing.map((key) => missingLabels[key] ?? key).join("، ")}.</p>
      </div>
    );
  }
  if (!profile.isAvailable) {
    return (
      <div role="status" className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-7 text-gray-800">
        <EyeOff className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
        <p><strong>إنت معلّم إنك مشغول.</strong> بروفايلك مش بيظهر للتجار لحد ما ترجّع «متاح لعملاء جداد».</p>
      </div>
    );
  }
  return (
    <div role="status" className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-900">
      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
      <p>
        <strong>بروفايلك مكتمل.</strong>{" "}
        {DIRECTORY_OPEN ? "وظاهر لتجار متجركو في صفحة الميديا باير." : "هيظهر لتجار متجركو أول ما صفحة الميديا باير تفتح في لوحة التحكم، وده قريب."}
      </p>
    </div>
  );
}

/**
 * matgarko.com/media-buyers/dashboard: the buyer's own profile. Everything is saved by one button; a photo
 * is saved as soon as it is chosen. What merchants will read is what is written here, so the page says
 * which parts are required and which only help.
 */
export function MediaBuyerDashboardPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [profile, setProfile] = useState<MediaBuyerProfile | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const [saved, setSaved] = useState("");
  const [busy, setBusy] = useState<"" | "save" | "photo" | "work">("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(params.get("welcome") ? "رقمك اتأكد وحسابك اتعمل. كمّل بروفايلك عشان تظهر للتجار." : "");
  const errorBox = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);

  const load = (next: MediaBuyerProfile, keepForm = false) => {
    setProfile(next);
    if (!keepForm) {
      const fresh = toForm(next);
      setForm(fresh);
      setSaved(JSON.stringify(fresh));
    }
  };

  useEffect(() => {
    if (!getSession()) { navigate("/media-buyers/login", { replace: true }); return; }
    let alive = true;
    mediaBuyerApi.me().then((next) => { if (alive) load(next); }).catch((caught) => {
      if (!alive) return;
      const problem = mediaBuyerError(caught);
      if (problem.code === "SignedOut") navigate("/media-buyers/login", { replace: true });
      else setError(problem.text);
    });
    return () => { alive = false; };
  }, [navigate]);

  const dirty = useMemo(() => form != null && JSON.stringify(form) !== saved, [form, saved]);

  const fail = (message: string, id?: string) => {
    setError(message);
    setNotice("");
    requestAnimationFrame(() => {
      const target = id ? document.getElementById(id) : null;
      (target ?? errorBox.current)?.focus();
      (target ?? errorBox.current)?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  };

  const signedOut = (caught: unknown) => {
    const problem = mediaBuyerError(caught);
    if (problem.code === "SignedOut") navigate("/media-buyers/login", { replace: true });
    return problem;
  };

  async function save(next: Form, done = "اتحفظ.") {
    if (busy) return;
    const wrong = check(next);
    if (wrong) return fail(wrong.text, wrong.id);
    setBusy("save");
    setError("");
    try {
      load(await mediaBuyerApi.save(toInput(next)));
      setNotice(done);
      // The button is at the foot of a long form; where the profile stands now is at its head.
      requestAnimationFrame(() => top.current?.scrollIntoView({ block: "start", behavior: "smooth" }));
    } catch (caught) {
      const problem = signedOut(caught);
      fail(problem.text, problem.field?.startsWith("services.") ? `service-${problem.field.split(".")[1]}-title` : problem.field ? `mb-${problem.field}` : undefined);
    } finally {
      setBusy("");
    }
  }

  async function upload(event: ChangeEvent<HTMLInputElement>, kind: "photo" | "work") {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || busy) return;
    setBusy(kind);
    setError("");
    try {
      const small = await shrinkPhoto(file, kind === "photo" ? 800 : 1400);
      // The form on screen may hold edits not saved yet: only what the server works out is taken from the answer.
      load(kind === "photo" ? await mediaBuyerApi.setPhoto(small) : await mediaBuyerApi.addWorkPhoto(small), true);
      setNotice(kind === "photo" ? "الصورة اتحفظت." : "الصورة اتضافت.");
    } catch (caught) {
      fail(signedOut(caught).text);
    } finally {
      setBusy("");
    }
  }

  async function removeWorkPhoto(id: number) {
    if (busy) return;
    setBusy("work");
    try {
      load(await mediaBuyerApi.removeWorkPhoto(id), true);
    } catch (caught) {
      fail(signedOut(caught).text);
    } finally {
      setBusy("");
    }
  }

  if (!profile || !form) {
    return (
      <section className="hero-band min-h-[calc(100vh-4rem)] px-4 py-16 text-center" dir="rtl">
        {/* The page as it is built ahead of time, before the browser knows who is signed in. */}
        <h1 className="sr-only">لوحة الميديا باير</h1>
        {error ? <p role="alert" className="mx-auto max-w-md rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>
          : <Loader2 className="mx-auto h-7 w-7 animate-spin text-emerald-700" aria-label="جاري التحميل" />}
      </section>
    );
  }

  const set = <K extends keyof Form>(key: K, value: Form[K]) => { setError(""); setNotice(""); setForm((current) => (current ? { ...current, [key]: value } : current)); };
  const setPricing = (key: PricingKey, patch: Partial<{ on: boolean; value: string }>) => set("pricing", { ...form.pricing, [key]: { ...form.pricing[key], ...patch } });
  const setService = (index: number, patch: Partial<ServiceForm>) => set("services", form.services.map((service, i) => (i === index ? { ...service, ...patch } : service)));
  const currency = currencyNames[form.currency as keyof typeof currencyNames] ?? form.currency;
  const unusedSuggestions = serviceSuggestions.filter((suggestion) => !form.services.some((service) => service.title.trim() === suggestion.title));

  return (
    <section className="signup-form hero-band min-h-[calc(100vh-4rem)] px-4 py-8 sm:py-12" dir="rtl">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-black font-heading sm:text-3xl">لوحة الميديا باير</h1>
          <button type="button" className="inline-flex items-center gap-1.5 text-sm underline" onClick={() => void mediaBuyerApi.signOut().then(() => navigate("/media-buyers/login"))}>
            <LogOut className="h-4 w-4" aria-hidden="true" /> خروج
          </button>
        </div>

        <div ref={top} className="mt-5 scroll-mt-24 space-y-3">
          {notice && <p role="status" className="rounded-xl bg-emerald-50 p-3 text-sm leading-6 text-emerald-800">{notice}</p>}
          <Status profile={profile} />
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between text-sm font-bold text-gray-800">
              <span>اكتمال البروفايل</span><span dir="ltr">{profile.percent}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100" role="progressbar" aria-valuenow={profile.percent} aria-valuemin={0} aria-valuemax={100} aria-label="اكتمال البروفايل">
              <div className="h-full rounded-full bg-emerald-600" style={{ width: `${profile.percent}%` }} />
            </div>
            <p className={mbHintClass}>التاجر بيختار من البروفايل. كل ما كان أوضح وفيه شغلك وأسعارك، فرصتك أكبر. متجركو بتأكد رقمك بس، وباقي الكلام مكتوب للتاجر إنه كلامك.</p>
          </div>
        </div>

        <form onSubmit={(event: FormEvent) => { event.preventDefault(); void save(form); }} noValidate className="mt-5 space-y-7 rounded-xl border border-gray-200 bg-white p-5 shadow-xl sm:p-7">
          {error && <div ref={errorBox} tabIndex={-1} role="alert" className="rounded-lg bg-red-50 p-3 text-sm leading-6 text-red-800">{error}</div>}

          <Section title="إنت مين">
            <div className="flex items-center gap-4">
              {profile.photoUrl
                ? <img src={profile.photoUrl} alt="صورتك" className="h-24 w-24 shrink-0 rounded-2xl border border-gray-200 object-cover" />
                : <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-gray-400"><Camera className="h-7 w-7" aria-hidden="true" /></div>}
              <div>
                <label className={`btn btn-secondary cursor-pointer ${busy === "photo" ? "opacity-60" : ""}`}>
                  {busy === "photo" ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Camera className="h-5 w-5" aria-hidden="true" />}
                  {profile.photoUrl ? "غيّر الصورة" : "ارفع صورتك"}
                  <input id="mb-photo" type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" disabled={busy !== ""} onChange={(event) => void upload(event, "photo")} />
                </label>
                <p className={mbHintClass}>صورة شخصية واضحة لوشك (أو لوجو الوكالة). التاجر بيثق في اللي شايف صورته.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="بتشتغل لوحدك ولا وكالة؟">
              {[{ agency: false, label: "ميديا باير فري لانس" }, { agency: true, label: "وكالة" }].map((option) => (
                <label key={option.label} className={`cursor-pointer rounded-lg border px-3 py-3 text-center text-sm font-bold has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-emerald-600 ${form.isAgency === option.agency ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-gray-300 text-gray-700"}`}>
                  <input type="radio" name="kind" className="sr-only" checked={form.isAgency === option.agency} onChange={() => set("isAgency", option.agency)} />
                  {option.label}
                </label>
              ))}
            </div>
            {form.isAgency && (
              <label htmlFor="mb-agencyName" className={mbLabelClass}>اسم الوكالة
                <input id="mb-agencyName" className={mbInputClass} value={form.agencyName} maxLength={120} autoComplete="organization" onChange={(event) => set("agencyName", event.target.value)} />
              </label>
            )}
            <label htmlFor="mb-name" className={mbLabelClass}>{form.isAgency ? "اسمك (المسؤول عن الوكالة)" : "اسمك الحقيقي"}
              <input id="mb-name" className={mbInputClass} value={form.name} maxLength={100} autoComplete="name" onChange={(event) => set("name", event.target.value)} />
            </label>
            <label htmlFor="mb-headline" className={mbLabelClass}>سطر يعرّف بيك
              <input id="mb-headline" className={mbInputClass} value={form.headline} maxLength={120} placeholder="مثال: ميديا باير لمتاجر الملابس، 4 سنين على ميتا وتيك توك"
                onChange={(event) => set("headline", event.target.value)} />
              <p className={mbHintClass}>أول حاجة التاجر بيقراها تحت اسمك.</p>
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label htmlFor="mb-country" className={mbLabelClass}>عايش في
                <select id="mb-country" className={mbInputClass} value={form.country} onChange={(event) => set("country", event.target.value)}>
                  {phoneCountries.map((country) => <option key={country.code} value={country.code}>{country.ar}</option>)}
                </select>
              </label>
              <label htmlFor="mb-city" className={mbLabelClass}>المدينة
                <input id="mb-city" className={mbInputClass} value={form.city} maxLength={80} autoComplete="address-level2" onChange={(event) => set("city", event.target.value)} />
              </label>
            </div>
          </Section>

          <Section title="شغلك">
            <Chips id="mb-platforms" legend="المنصات اللي بتشتغل عليها" choices={platforms} value={form.platforms} onChange={(value) => set("platforms", value)} />
            <Chips id="mb-specialties" legend="المجالات اللي عندك فيها خبرة" hint="اختار لحد 8. التاجر بيدوّر باللي بيبيعه." choices={specialties} value={form.specialties}
              onChange={(value) => set("specialties", value.slice(0, 8))} />
          </Section>

          <Section title="بتحاسب إزاي؟">
            <p className="-mt-2 text-sm leading-6 text-gray-600">علّم على طريقة أو أكتر واكتب رقمك. التاجر بيشوفها زي ما هي، فاكتب اللي بتشتغل بيه فعلًا.</p>
            <label htmlFor="mb-currency" className={mbLabelClass}>العملة
              <select id="mb-currency" className={`${mbFieldClass} mt-2 w-32`} value={form.currency} onChange={(event) => set("currency", event.target.value)}>
                {currencies.map((code) => <option key={code} value={code}>{currencyNames[code]}</option>)}
              </select>
            </label>
            <div className="space-y-3">
              {pricingMethods.map((method) => {
                const entry = form.pricing[method.key];
                return (
                  <div key={method.key} className={`rounded-xl border p-3.5 ${entry.on ? "border-emerald-300 bg-emerald-50/50" : "border-gray-200"}`}>
                    <label className="flex cursor-pointer items-start gap-3 text-sm font-bold text-gray-900">
                      <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-emerald-700" checked={entry.on} onChange={(event) => setPricing(method.key, { on: event.target.checked })} />
                      <span>{method.label}<span className="mt-0.5 block text-xs font-normal leading-5 text-gray-500">{method.hint}</span></span>
                    </label>
                    {entry.on && (
                      <div className="mt-3 flex items-center gap-2 ps-8">
                        <input id={`mb-${method.key}`} type="number" inputMode="decimal" min={0} max={method.max} step={method.percent ? 0.5 : 1} dir="ltr"
                          aria-label={method.label} className={`${mbFieldClass} w-36`} value={entry.value} onChange={(event) => setPricing(method.key, { value: event.target.value })} />
                        <span className="text-sm font-bold text-gray-700">{method.percent ? "%" : currency}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Section>

          <Section title="خدماتي" note="(اختياري، لحد 5)">
            <p className="-mt-2 text-sm leading-6 text-gray-600">حاجات محددة بتعملها بسعر معروف، أو مجانًا. خدمة مجانية زي مراجعة المتجر بتخلّي التاجر يجرّبك من غير ما يدفع.</p>
            {form.services.map((service, index) => (
              <div key={index} className="space-y-3 rounded-xl border border-gray-200 bg-gray-50/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-extrabold text-gray-900">خدمة {index + 1}</p>
                  <button type="button" className="inline-flex items-center gap-1 text-sm text-red-700" aria-label={`احذف الخدمة ${index + 1}`}
                    onClick={() => set("services", form.services.filter((_, i) => i !== index))}>
                    <Trash2 className="h-4 w-4" aria-hidden="true" /> احذف
                  </button>
                </div>
                <label htmlFor={`service-${index}-title`} className={mbLabelClass}>العنوان
                  <input id={`service-${index}-title`} className={mbInputClass} value={service.title} maxLength={60} placeholder="مثال: إعلانك الأول" onChange={(event) => setService(index, { title: event.target.value })} />
                </label>
                <label htmlFor={`service-${index}-description`} className={mbLabelClass}>فيها إيه <span className="font-normal text-gray-500">(اختياري)</span>
                  <input id={`service-${index}-description`} className={mbInputClass} value={service.description} maxLength={200} onChange={(event) => setService(index, { description: event.target.value })} />
                </label>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                  <label className="flex cursor-pointer items-center gap-2 text-sm font-bold text-gray-800">
                    <input type="checkbox" className="h-5 w-5 accent-emerald-700" checked={service.free} onChange={(event) => setService(index, { free: event.target.checked })} /> مجانًا
                  </label>
                  {!service.free && (
                    <div className="flex items-center gap-2">
                      <input id={`service-${index}-price`} type="number" inputMode="numeric" min={1} dir="ltr" aria-label="السعر" className={`${mbFieldClass} w-36`}
                        value={service.price} onChange={(event) => setService(index, { price: event.target.value })} />
                      <span className="text-sm font-bold text-gray-700">{currency}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {form.services.length < MAX_SERVICES && (
              <div className="space-y-3">
                {unusedSuggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2" aria-label="اقتراحات">
                    {unusedSuggestions.map((suggestion) => (
                      <button key={suggestion.title} type="button" className="rounded-full border border-dashed border-emerald-400 bg-white px-3.5 py-2 text-sm font-bold"
                        onClick={() => set("services", [...form.services, { title: suggestion.title, description: suggestion.description, price: "", free: Boolean(suggestion.free) }])}>
                        + {suggestion.title}
                      </button>
                    ))}
                  </div>
                )}
                <button type="button" className="inline-flex items-center gap-1.5 text-sm font-bold" onClick={() => set("services", [...form.services, { title: "", description: "", price: "", free: false }])}>
                  <Plus className="h-4 w-4" aria-hidden="true" /> خدمة من عندك
                </button>
              </div>
            )}
          </Section>

          <Section title="عنّي" note="(اختياري، وبيفرق مع التاجر)">
            {([
              ["howIWork", "بشتغل إزاي؟", "مثال: بعمل الإعلانات والتصميم بنفسي، وببعت تقرير كل أسبوع."],
              ["bestResult", "أحسن نتيجة حققتها", "مثال: براند ملابس، 1,200 أوردر في الشهر بتكلفة 45 ج.م للأوردر."],
              ["idealClient", "مين التاجر المناسب ليا؟", "مثال: متاجر الملابس اللي لسه بتبدأ، بميزانية إعلانات من 3,000 في الشهر."],
            ] as const).map(([key, label, placeholder]) => (
              <label key={key} htmlFor={`mb-${key}`} className={mbLabelClass}>{label}
                <textarea id={`mb-${key}`} rows={2} maxLength={500} className={mbInputClass + " leading-7"} value={form[key]} placeholder={placeholder} onChange={(event) => set(key, event.target.value)} />
              </label>
            ))}
            <label htmlFor="mb-yearsExperience" className={mbLabelClass}>سنين الخبرة
              <input id="mb-yearsExperience" type="number" inputMode="numeric" min={0} max={40} dir="ltr" className={`${mbFieldClass} mt-2 w-32`} value={form.yearsExperience} onChange={(event) => set("yearsExperience", event.target.value)} />
            </label>
            <div>
              <p className={mbLabelClass}>صور من شغلك <span className="font-normal text-gray-500">(لحد 3)</span></p>
              <p className={mbHintClass}>نتايج حملة من مدير الإعلانات، أو إعلان عملته. خبّي أي بيانات خاصة بعميلك.</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {profile.workPhotos.map((photo) => (
                  <div key={photo.id} className="relative">
                    <img src={photo.url} alt="صورة من شغلك" className="h-28 w-28 rounded-xl border border-gray-200 object-cover" />
                    <button type="button" aria-label="احذف الصورة" disabled={busy !== ""} onClick={() => void removeWorkPhoto(photo.id)}
                      className="absolute -end-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-red-700 shadow">
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                ))}
                {profile.workPhotos.length < MAX_WORK_PHOTOS && (
                  <label className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-gray-300 text-xs font-bold text-gray-600">
                    {busy === "work" ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Plus className="h-5 w-5" aria-hidden="true" />}
                    أضف صورة
                    <input id="mb-workPhoto" type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" disabled={busy !== ""} onChange={(event) => void upload(event, "work")} />
                  </label>
                )}
              </div>
            </div>
          </Section>

          <Section title="روابط" note="(اختياري)">
            <p className="-mt-2 text-sm leading-6 text-gray-600">لينك لحسابك بيخلّي التاجر يتأكد إنك شخص حقيقي.</p>
            {([["facebookUrl", "فيسبوك"], ["linkedInUrl", "لينكدإن"], ["portfolioUrl", "بورتفوليو أو موقعك"]] as const).map(([key, label]) => (
              <label key={key} htmlFor={`mb-${key}`} className={mbLabelClass}>{label}
                <input id={`mb-${key}`} type="url" dir="ltr" className={mbInputClass} value={form[key]} maxLength={300} placeholder="https://" onChange={(event) => set(key, event.target.value)} />
              </label>
            ))}
          </Section>

          <div className="space-y-4 border-t border-gray-100 pt-6">
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-800">
              <input id="mb-isAvailable" type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-emerald-700" checked={form.isAvailable} onChange={(event) => set("isAvailable", event.target.checked)} />
              <span><strong>متاح لعملاء جداد.</strong> شيل العلامة لو مشغول: بروفايلك يختفي من عند التجار وحسابك يفضل زي ما هو.</span>
            </label>
            <button type="submit" disabled={busy !== ""} className="btn btn-primary w-full disabled:opacity-50">
              {busy === "save" ? <Loader2 className="h-5 w-5 animate-spin" aria-label="جاري الحفظ" /> : dirty ? "احفظ التعديلات" : "احفظ"}
            </button>
            {dirty && <p className="text-center text-xs text-amber-700">فيه تعديلات لسه ما اتحفظتش.</p>}
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          عندك عميل محتاج متجر؟ <Link to="/register" className="font-bold underline">يفتحه ببلاش من هنا</Link>، وأول 20 أوردر علينا.
        </p>
      </div>
    </section>
  );
}
