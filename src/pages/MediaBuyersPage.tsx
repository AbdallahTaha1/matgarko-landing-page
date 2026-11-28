import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BadgeCheck, Eye, EyeOff, Gauge, Loader2, MessageCircle, Send, UserRound, Users, Wallet } from "lucide-react";
import { captureAcquisition, getLandingParameters } from "@/lib/attribution";
import { phoneCountries, signupPhoneNumber, type CountryCode } from "@/lib/phone";
import { mbHintClass, mbInputClass, mbLabelClass, useCooldown } from "@/lib/mediaBuyerUi";
import { MediaBuyerCodeStep as CodeStep } from "@/components/MediaBuyerCodeStep";
import { getSession, mediaBuyerApi, mediaBuyerError, type MediaBuyerSource } from "@/lib/mediaBuyerApi";
import { FaqList } from "@/components/FaqList";
import { mediaBuyerFaq } from "@/data/mediaBuyers";

/** Where the buyer came from, read from the link (a group post's utm tags, a merchant's invite). */
function source(): MediaBuyerSource | undefined {
  captureAcquisition();
  const landing = getLandingParameters();
  const here = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
  const value = (key: string) => (here.get(key) || landing.get(key) || "").trim().slice(0, 200) || undefined;
  const picked = { source: value("utm_source"), medium: value("utm_medium"), campaign: value("utm_campaign"), content: value("utm_content") };
  return Object.values(picked).some(Boolean) ? picked : undefined;
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

/** matgarko.com/media-buyers: why join, how it works, and the short signup: name, WhatsApp number, password. */
export function MediaBuyersPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>("EG");
  const [phoneText, setPhoneText] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [website, setWebsite] = useState("");
  const [stage, setStage] = useState<"form" | "code">("form");
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<{ text: string; field?: string } | null>(null);
  const [notice, setNotice] = useState("");
  const [cooldown, setCooldown] = useCooldown();
  const [signedIn, setSignedIn] = useState(false);
  const errorBox = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const phone = signupPhoneNumber(phoneText, phoneCountry);

  useEffect(() => { setSignedIn(Boolean(getSession())); }, []);

  const fail = (text: string, field?: string) => {
    setError({ text, field });
    setNotice("");
    requestAnimationFrame(() => {
      const target = field ? document.getElementById(`mb-${field}`) : null;
      (target ?? errorBox.current)?.focus();
      (target ?? errorBox.current)?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  };

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    if (name.trim().length < 2) return fail("اكتب اسمك.", "name");
    if (!phone) return fail("اكتب رقم موبايل صحيح عليه واتساب، وتأكد من مفتاح الدولة.", "phone");
    if (password.length < 8) return fail("الباسورد لازم يكون 8 حروف أو أرقام على الأقل.", "password");
    setBusy(true);
    setError(null);
    try {
      const result = await mediaBuyerApi.signUp({ name: name.trim(), phone, password, website: website || undefined, source: source() });
      setToken(result.token);
      setCooldown(result.retryAfterSeconds || 60);
      setStage("code");
      requestAnimationFrame(() => top.current?.scrollIntoView({ block: "start", behavior: "smooth" }));
    } catch (caught) {
      const problem = mediaBuyerError(caught);
      fail(problem.text, problem.field);
    } finally {
      setBusy(false);
    }
  }

  async function verify(code: string) {
    setBusy(true);
    setError(null);
    try {
      await mediaBuyerApi.verify(token, code);
      navigate("/media-buyers/dashboard?welcome=1");
    } catch (caught) {
      fail(mediaBuyerError(caught).text);
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    if (busy || cooldown > 0) return;
    setBusy(true);
    setError(null);
    try {
      const result = await mediaBuyerApi.resend(token);
      setCooldown(result.retryAfterSeconds || 60);
      setNotice("بعتنالك كود جديد على واتساب.");
    } catch (caught) {
      fail(mediaBuyerError(caught).text);
    } finally {
      setBusy(false);
    }
  }

  const edit = <T,>(set: (value: T) => void) => (value: T) => { setError(null); set(value); };

  return (
    <div dir="rtl">
      <section className="page-hero text-center">
        <div className="container-x">
          <span className="section-kicker">للميديا باير والوكالات</span>
          <h1 className="page-title mt-4">اشتغل مع تجار متجركو</h1>
          <p className="page-lead mt-4">
            اعمل حسابك في دقيقة، واكتب خبرتك وأسعارك وخدماتك. التاجر اللي محتاج حد يعلن له يشوف بروفايلك ويكلّمك على واتساب. ببلاش، ومن غير نسبة من شغلك.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href="#signup" className="btn btn-primary">اعمل حسابك</a>
            <Link to={signedIn ? "/media-buyers/dashboard" : "/media-buyers/login"} className="btn btn-secondary">{signedIn ? "ادخل لوحتك" : "عندي حساب"}</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <h2 className="section-title text-center">هتاخد إيه؟</h2>
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2">
            <Benefit icon={<Users className="h-5 w-5" aria-hidden="true" />} title="تجار بيدوّروا على حد يعلن لهم">
              تجار متجركو بيفتحوا متاجرهم ومحتاجين إعلانات عشان يبيعوا. بروفايلك بيوصّلهم ليك من غير ما تدوّر عليهم.
            </Benefit>
            <Benefit icon={<UserRound className="h-5 w-5" aria-hidden="true" />} title="بروفايل بيبيع شغلك">
              صورتك، وطريقة حسابك، وخدماتك بسعرك، زي «مراجعة متجرك مجانًا» أو «إعلانك الأول». وتعدّله في أي وقت من لوحتك.
            </Benefit>
            <Benefit icon={<BadgeCheck className="h-5 w-5" aria-hidden="true" />} title="شارة «اشتغل مع تجار متجركو»" soon>
              لما تاجر يضيفك لمتجره، المنصة هتحسب الطلبات اللي جت من إعلاناتك واتسلّمت، وتظهر في بروفايلك بدل السكرينشوتات.
            </Benefit>
            <Benefit icon={<Gauge className="h-5 w-5" aria-hidden="true" />} title="أدوات تريّحك في الشغل">
              بيكسل ميتا مع Conversions API وبيكسل تيك توك جاهزين، ومصدر كل أوردر في الإحصائيات، وحاجب الأوردرات الوهمية ببلاش.
            </Benefit>
          </div>
        </div>
      </section>

      <section className="section border-y border-gray-100 bg-gray-50/60">
        <div className="container-x max-w-4xl">
          <h2 className="section-title text-center">بيمشي إزاي؟</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: <Send className="h-5 w-5" aria-hidden="true" />, title: "اعمل حسابك", text: "اسمك ورقم الواتساب وباسورد، وأكّد رقمك بكود. دقيقة واحدة." },
              { icon: <Wallet className="h-5 w-5" aria-hidden="true" />, title: "كمّل بروفايلك", text: "صورتك، ومجالاتك، وطريقة حسابك أو خدمة بسعرك. من غير موافقة ولا انتظار." },
              { icon: <MessageCircle className="h-5 w-5" aria-hidden="true" />, title: "التجار يكلّموك", text: "التاجر يشوف بروفايلك ويكلّمك على واتساب، والاتفاق بينكم مباشرة." },
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

      <section id="signup" className="signup-form section scroll-mt-20">
        <div ref={top} className="mx-auto max-w-lg scroll-mt-24 px-4">
          <h2 className="section-title text-center">اعمل حسابك</h2>
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-xl sm:p-7">
            {error && <div ref={errorBox} tabIndex={-1} role="alert" className="mb-5 rounded-lg bg-red-50 p-3 text-sm leading-6 text-red-800">{error.text}</div>}
            {notice && <p role="status" className="mb-4 text-sm text-emerald-700">{notice}</p>}

            {stage === "code" && (
              <CodeStep phone={phone ?? ""} busy={busy} cooldown={cooldown} onSubmit={verify} onResend={resend}
                onBack={() => { setStage("form"); setError(null); setNotice(""); }} />
            )}

            {stage === "form" && (
              <form onSubmit={submit} noValidate className="space-y-5">
                <label htmlFor="mb-name" className={mbLabelClass}>اسمك الحقيقي
                  <input id="mb-name" className={mbInputClass} value={name} maxLength={100} autoComplete="name"
                    aria-invalid={error?.field === "name" || undefined} onChange={(event) => edit(setName)(event.target.value)} />
                  <p className={mbHintClass}>ده اللي هيظهر للتجار. لو وكالة، اكتب اسمك وهتضيف اسم الوكالة بعدين.</p>
                </label>
                <div className="grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                  <label htmlFor="mb-phoneCountry" className={mbLabelClass}>مفتاح الدولة
                    <select id="mb-phoneCountry" className={mbInputClass} value={phoneCountry} onChange={(event) => edit(setPhoneCountry)(event.target.value as CountryCode)}>
                      {phoneCountries.map((country) => <option key={country.code} value={country.code}>{country.ar} ({"⁦"}+{country.callingCode}{"⁩"})</option>)}
                    </select>
                  </label>
                  <label htmlFor="mb-phone" className={mbLabelClass}>رقم الواتساب
                    <input id="mb-phone" type="tel" dir="ltr" inputMode="tel" autoComplete="tel-national" maxLength={32} className={mbInputClass}
                      value={phoneText} aria-invalid={error?.field === "phone" || undefined} onChange={(event) => edit(setPhoneText)(event.target.value)} />
                  </label>
                </div>
                <p className={`${mbHintClass} -mt-3`}>هنبعت عليه كود مرة واحدة، وبعد كده هتدخل بيه وبالباسورد.</p>
                <div>
                  <label htmlFor="mb-password" className={mbLabelClass}>باسورد</label>
                  <div className="relative" dir="ltr">
                    <input id="mb-password" type={showPassword ? "text" : "password"} className={`${mbInputClass} pe-12`} value={password}
                      minLength={8} maxLength={100} autoComplete="new-password" aria-invalid={error?.field === "password" || undefined}
                      onChange={(event) => edit(setPassword)(event.target.value)} />
                    <button type="button" onClick={() => setShowPassword((value) => !value)} aria-pressed={showPassword}
                      aria-label={showPassword ? "إخفاء الباسورد" : "إظهار الباسورد"} className="absolute inset-y-0 end-0 mt-2 flex w-12 items-center justify-center text-gray-500">
                      {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                    </button>
                  </div>
                  <p className={mbHintClass}>8 حروف أو أرقام على الأقل.</p>
                </div>

                {/* People never see this field; a bot that fills it is answered and forgotten. Clipped in place:
                    an offset far to one side would widen this right-to-left page. */}
                <div aria-hidden="true" className="sr-only">
                  <label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
                </div>

                <button type="submit" disabled={busy} className="btn btn-primary w-full disabled:opacity-50">
                  {busy ? <Loader2 className="h-5 w-5 animate-spin" aria-label="جاري الإرسال" /> : "ابعت كود التأكيد على واتساب"}
                </button>
                <p className="text-center text-xs leading-5 text-gray-500">
                  بالضغط على الزرار أنت موافق على <Link to="/terms" target="_blank" className="underline">الشروط والأحكام</Link> و<Link to="/privacy" target="_blank" className="underline">سياسة الخصوصية</Link>،
                  وإن بياناتك اللي هتكتبها في بروفايلك ورقمك يظهروا لتجار متجركو.
                </p>
                <p className="text-center text-sm">عندك حساب؟ <Link to="/media-buyers/login" className="font-bold underline">ادخل من هنا</Link></p>
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
