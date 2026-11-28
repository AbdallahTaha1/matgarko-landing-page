import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { phoneCountries, signupPhoneNumber, type CountryCode } from "@/lib/phone";
import { mbHintClass, mbInputClass, mbLabelClass, useCooldown } from "@/lib/mediaBuyerUi";
import { MediaBuyerCodeStep } from "@/components/MediaBuyerCodeStep";
import { mediaBuyerApi, mediaBuyerError } from "@/lib/mediaBuyerApi";

/**
 * matgarko.com/media-buyers/login: phone and password, with no message sent. «نسيت الباسورد» is the
 * only place a WhatsApp code goes out again: the number, then the code with a new password.
 */
export function MediaBuyerLoginPage() {
  const navigate = useNavigate();
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>("EG");
  const [phoneText, setPhoneText] = useState("");
  const [password, setPassword] = useState("");
  const [stage, setStage] = useState<"login" | "forgot" | "code">("login");
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [cooldown, setCooldown] = useCooldown();
  const phone = signupPhoneNumber(phoneText, phoneCountry);

  const run = async (work: () => Promise<void>) => {
    if (busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await work();
    } catch (caught) {
      setError(mediaBuyerError(caught).text);
    } finally {
      setBusy(false);
    }
  };

  const needsPhone = () => {
    if (phone) return false;
    setError("اكتب رقم موبايل صحيح، وتأكد من مفتاح الدولة.");
    return true;
  };

  const signIn = (event: FormEvent) => {
    event.preventDefault();
    if (needsPhone()) return;
    void run(async () => {
      await mediaBuyerApi.signIn(phone!, password);
      navigate("/media-buyers/dashboard");
    });
  };

  const forgot = (event: FormEvent) => {
    event.preventDefault();
    if (needsPhone()) return;
    void run(async () => {
      const result = await mediaBuyerApi.forgotPassword(phone!);
      setToken(result.token);
      setCooldown(result.retryAfterSeconds || 60);
      setPassword("");
      setStage("code");
    });
  };

  const reset = (code: string) => {
    if (password.length < 8) return setError("الباسورد الجديد لازم يكون 8 حروف أو أرقام على الأقل.");
    void run(async () => {
      await mediaBuyerApi.resetPassword(token, code, password);
      navigate("/media-buyers/dashboard");
    });
  };

  const resend = () => void run(async () => {
    const result = await mediaBuyerApi.resend(token);
    setCooldown(result.retryAfterSeconds || 60);
    setNotice("بعتنالك كود جديد على واتساب.");
  });

  const phoneFields = (
    <>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <label htmlFor="mb-phoneCountry" className={mbLabelClass}>مفتاح الدولة
          <select id="mb-phoneCountry" className={mbInputClass} value={phoneCountry} onChange={(event) => setPhoneCountry(event.target.value as CountryCode)}>
            {phoneCountries.map((country) => <option key={country.code} value={country.code}>{country.ar} ({"⁦"}+{country.callingCode}{"⁩"})</option>)}
          </select>
        </label>
        <label htmlFor="mb-phone" className={mbLabelClass}>رقم الواتساب
          <input id="mb-phone" type="tel" dir="ltr" inputMode="tel" autoComplete="tel-national" maxLength={32} className={mbInputClass}
            value={phoneText} onChange={(event) => { setError(""); setPhoneText(event.target.value); }} />
        </label>
      </div>
    </>
  );

  return (
    <section className="signup-form hero-band min-h-[calc(100vh-4rem)] px-4 py-10 sm:py-14" dir="rtl">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-3xl font-black font-heading">{stage === "login" ? "دخول الميديا باير" : "باسورد جديد"}</h1>
        <div className="mt-7 rounded-xl border border-gray-200 bg-white p-5 shadow-xl sm:p-7">
          {error && <div role="alert" className="mb-5 rounded-lg bg-red-50 p-3 text-sm leading-6 text-red-800">{error}</div>}
          {notice && <p role="status" className="mb-4 text-sm text-emerald-700">{notice}</p>}

          {stage === "login" && (
            <form onSubmit={signIn} noValidate className="space-y-5">
              {phoneFields}
              <label htmlFor="mb-password" className={mbLabelClass}>الباسورد
                <input id="mb-password" type="password" dir="ltr" className={mbInputClass} value={password} maxLength={100} autoComplete="current-password"
                  onChange={(event) => { setError(""); setPassword(event.target.value); }} />
              </label>
              <button type="submit" disabled={busy || !password} className="btn btn-primary w-full disabled:opacity-50">
                {busy ? <Loader2 className="h-5 w-5 animate-spin" aria-label="جاري الدخول" /> : "دخول"}
              </button>
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <button type="button" className="underline" onClick={() => { setStage("forgot"); setError(""); }}>نسيت الباسورد؟</button>
                <Link to="/media-buyers#signup" className="font-bold underline">اعمل حساب جديد</Link>
              </div>
            </form>
          )}

          {stage === "forgot" && (
            <form onSubmit={forgot} noValidate className="space-y-5">
              <p className="text-sm leading-6 text-gray-600">اكتب رقم الواتساب بتاع حسابك، وهنبعتلك عليه كود تعمل بيه باسورد جديد.</p>
              {phoneFields}
              <button type="submit" disabled={busy} className="btn btn-primary w-full disabled:opacity-50">
                {busy ? <Loader2 className="h-5 w-5 animate-spin" aria-label="جاري الإرسال" /> : "ابعت الكود على واتساب"}
              </button>
              <button type="button" className="text-sm underline" onClick={() => { setStage("login"); setError(""); }}>رجوع للدخول</button>
            </form>
          )}

          {stage === "code" && (
            <MediaBuyerCodeStep phone={phone ?? ""} busy={busy} cooldown={cooldown} submitLabel="احفظ الباسورد وادخل"
              onSubmit={reset} onResend={resend} onBack={() => { setStage("forgot"); setError(""); setNotice(""); }}>
              <label htmlFor="mb-new-password" className={mbLabelClass}>الباسورد الجديد
                <input id="mb-new-password" type="password" dir="ltr" className={mbInputClass} value={password} minLength={8} maxLength={100}
                  autoComplete="new-password" onChange={(event) => { setError(""); setPassword(event.target.value); }} />
                <p className={mbHintClass}>8 حروف أو أرقام على الأقل. لو الرقم مالوش حساب، مش هيوصلك كود.</p>
              </label>
            </MediaBuyerCodeStep>
          )}
        </div>
      </div>
    </section>
  );
}
