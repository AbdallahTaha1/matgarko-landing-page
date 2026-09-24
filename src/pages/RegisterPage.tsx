import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader2, Store, CheckCircle2 } from 'lucide-react';
import { api, ApiError, type SignupModel, type SignupStatus } from '@/lib/api';
import { getAcquisition } from '@/lib/attribution';
import { trackSignupComplete, trackSignupStep } from '@/lib/analytics';
import { getConsent, serverConsent, subscribeConsent } from '@/lib/consent';
import { isEnglishPath } from '@/lib/i18n';
import { readyStoreLinks, rememberStore } from '@/lib/storeAccess';
import { StoreAccessHint } from '@/components/StoreAccessHint';
import { useSignupContactCheck } from '@/lib/useSignupContactCheck';
import { normalizePhoneInput, parseSignupPhone, phoneCountries, signupPhoneNumber, type CountryCode } from '@/lib/phone';

const tokenKey = 'matgarko-pending-signup';
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const inputClass = 'mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-950 focus:outline-emerald-600';
const messages: Record<string, [string, string]> = {
  SubdomainTaken: ['رابط المتجر مستخدم أو محجوز مؤقتًا. اختار رابط تاني.', 'This store address is taken or temporarily reserved. Choose another.'],
  SubdomainInvalid: ['استخدم 3 إلى 40 حرف إنجليزي أو رقم، والشرطة بين الحروف فقط.', 'Use 3–40 letters or digits, with hyphens only between characters.'],
  SubdomainReserved: ['الرابط ده محجوز للمنصة.', 'This address is reserved.'],
  PhoneTaken: ['رقم الموبايل مستخدم من قبل.', 'This phone number is already registered.'],
  PhoneInvalid: ['اكتب رقم موبايل صحيح وتأكد من مفتاح الدولة المختار.', 'Enter a valid mobile number and check the selected country code.'],
  EmailTaken: ['البريد الإلكتروني مستخدم من قبل.', 'This email is already registered.'],
  EmailInvalid: ['راجع البريد الإلكتروني.', 'Check your email address.'],
  Disabled: ['التسجيل مغلق مؤقتًا. حاول لاحقًا.', 'Registration is temporarily closed. Please try later.'],
  CapacityReached: ['لا نستقبل متاجر جديدة حاليًا. حاول لاحقًا.', 'We cannot accept new stores right now. Please try later.'],
  NotFound: ['طلب التسجيل انتهى أو غير موجود. ابدأ من جديد.', 'This registration was not found. Please start again.'],
  CodeIncorrect: ['رمز التحقق غير صحيح.', 'The verification code is incorrect.'],
  CodeExpired: ['الرمز انتهت صلاحيته. اطلب رمز جديد.', 'The code expired. Request a new code.'],
  TooManyAttempts: ['محاولات كثيرة. اطلب رمز جديد.', 'Too many attempts. Request a new code.'],
  TooManyResends: ['وصلت للحد الأقصى لإرسال الرموز. تواصل مع الدعم.', 'The resend limit has been reached. Contact support.'],
  EmailFailed: ['تعذر إرسال البريد. استخدم إعادة إرسال الرمز بعد انتهاء العداد.', 'Email could not be sent. Try resending after the countdown.'],
  ResendTooSoon: ['انتظر انتهاء العداد قبل إعادة الإرسال.', 'Wait for the countdown before resending.'],
  rate_limited: ['محاولات كثيرة. انتظر ثم حاول تاني.', 'Too many requests. Wait and try again.'],
  NetworkError: ['تعذر الاتصال بالخدمة. حاول تاني بعد لحظات.', 'Unable to connect to the service. Please try again shortly.'],
  RequestTimeout: ['الخدمة أخدت وقت أطول من المتوقع. حاول تاني بعد لحظات.', 'The service took longer than expected. Please try again shortly.'],
  InvalidRequest: ['راجع البيانات وحاول تاني.', 'Check your details and try again.'],
  InvalidResponse: ['حصل خطأ في الخدمة. حاول تاني.', 'The service returned an unexpected response. Please retry.'],
};

export default function RegisterPage() {
  const english = isEnglishPath(useLocation().pathname);
  const t = (ar: string, en: string) => english ? en : ar;
  const consent = useSyncExternalStore(subscribeConsent, getConsent, serverConsent);
  const [form, setForm] = useState<SignupModel>({ storeName: '', subdomain: '', email: '', phone: '', password: '', confirmPassword: '', acceptTerms: false });
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>('EG');
  const internationalPhone = signupPhoneNumber(form.phone, phoneCountry);
  const [config, setConfig] = useState<{ enabled: boolean; baseDomain: string } | null>(null);
  const [stage, setStage] = useState<'store' | 'account' | SignupStatus['state']>('store');
  const [status, setStatus] = useState<SignupStatus | null>(null);
  const [token, setToken] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [pollingPaused, setPollingPaused] = useState(false);
  const [availability, setAvailability] = useState({ value: '', state: 'idle' });
  const submitting = useRef(false);
  const openReadyDashboard = useRef<(() => void) | null>(null);
  const errorAlert = useRef<HTMLDivElement>(null);
  const available = availability.value === form.subdomain && availability.state === 'available';
  const emailCheck = useSignupContactCheck('email', form.email, stage === 'account' && !!config?.enabled);
  const phoneCheck = useSignupContactCheck('phone', form.phone ? internationalPhone || `invalid:${phoneCountry}:${form.phone}` : '', stage === 'account' && !!config?.enabled);
  const readyStore = status?.state === 'ready' && config ? readyStoreLinks(status.adminUrl, status.storeUrl, config.baseDomain) : null;
  const adminUrl = readyStore?.adminUrl;
  const storeUrl = readyStore?.storeUrl;

  function applyStatus(next: SignupStatus) {
    if (!['verification', 'provisioning', 'ready', 'unavailable'].includes(next.state)) throw new ApiError('InvalidResponse');
    setStatus(next); setStage(next.state); setCooldown(next.retryAfterSeconds || 0);
  }
  function showError(cause: unknown) {
    const e = cause instanceof ApiError ? cause : new ApiError('NetworkError');
    setError(e.code); if (e.retryAfterSeconds) setCooldown(e.retryAfterSeconds);
  }
  useEffect(() => {
    let active = true;
    async function initialize() {
      try {
        const settings = await api.config();
        let saved: string | null = null;
        try { saved = sessionStorage.getItem(tokenKey); } catch { /* Optional storage. */ }
        if (saved && uuid.test(saved)) {
          try {
            const next = await api.status(saved);
            if (active) { setToken(saved); applyStatus(next); }
          } catch (cause) {
            if (active) {
              setToken(saved); setStage('verification'); showError(cause);
            }
          }
        }
        if (active) setConfig(settings);
      } catch (cause) { if (active) showError(cause); }
    }
    void initialize();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(form.subdomain) || form.subdomain.length < 3 || !config?.enabled || stage !== 'store') return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setAvailability({ value: form.subdomain, state: 'checking' });
      try {
        const result = await api.checkSubdomain(form.subdomain, controller.signal);
        if (!controller.signal.aborted) setAvailability({ value: form.subdomain, state: result.available ? 'available' : result.code });
      } catch { if (!controller.signal.aborted) setAvailability({ value: form.subdomain, state: 'NetworkError' }); }
    }, 450);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [form.subdomain, config?.enabled, stage]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(value => Math.max(0, value - 1)), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);
  useEffect(() => {
    if (stage !== 'provisioning' || !token || pollingPaused) return;
    let active = true;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;
    async function poll() {
      try {
        const next = await api.status(token);
        if (!active) return;
        applyStatus(next);
        if (next.state !== 'provisioning') return;
        if (++attempts >= 24) { setPollingPaused(true); return; }
        timer = setTimeout(poll, 5000);
      } catch (cause) { if (active) { showError(cause); setPollingPaused(true); } }
    }
    timer = setTimeout(poll, 3000);
    return () => { active = false; clearTimeout(timer); };
  }, [stage, token, pollingPaused]);
  useEffect(() => {
    if (status?.state !== 'ready') return;
    const conversion = status.conversionId ? trackSignupComplete(status.conversionId) : Promise.resolve();
    if (!adminUrl || !storeUrl) return;
    rememberStore({ adminUrl, storeUrl });
    let active = true;
    let navigating = false;
    const navigate = () => {
      if (!active || navigating) return;
      navigating = true;
      try { sessionStorage.removeItem(tokenKey); } catch { /* Navigation does not require storage. */ }
      window.location.replace(adminUrl);
    };
    // Both automatic navigation and the primary link wait for Google's processing
    // callbacks (or the bounded fallback). Merely queueing gtag is not enough.
    openReadyDashboard.current = () => { void conversion.then(navigate); };
    const timer = setTimeout(() => {
      void conversion.then(navigate);
    }, 1500);
    return () => { active = false; clearTimeout(timer); openReadyDashboard.current = null; };
  }, [status, consent, adminUrl, storeUrl]);
  useEffect(() => {
    if (error) errorAlert.current?.focus();
  }, [error]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (submitting.current) return;
    setError(''); setNotice('');
    if (stage === 'store') {
      if (!available || !config?.enabled) return;
      trackSignupStep('signup_start'); setStage('account'); return;
    }
    if (stage === 'account' && form.password !== form.confirmPassword) { setError('password_mismatch'); return; }
    if (stage === 'account' && (!emailCheck.available || !phoneCheck.available || !internationalPhone)) return;
    submitting.current = true; setBusy(true);
    try {
      if (stage === 'account') {
        const result = await api.signup({ ...form, phone: internationalPhone!, acquisition: getAcquisition() });
        if (!uuid.test(result.token)) throw new ApiError('InvalidResponse');
        setToken(result.token);
        try { sessionStorage.setItem(tokenKey, result.token); } catch { /* Still usable in this tab. */ }
        setForm(value => ({ ...value, password: '', confirmPassword: '' }));
        setStage('verification'); setCooldown(result.retryAfterSeconds);
        if (result.emailDeliveryFailed) setError('EmailFailed');
        trackSignupStep('signup_details_submitted');
      } else if (stage === 'verification') {
        const next = await api.verify(token, code);
        applyStatus(next); setCode('');
        if (next.state !== 'verification') trackSignupStep('signup_email_verified');
      }
    } catch (cause) { showError(cause); }
    finally { submitting.current = false; setBusy(false); }
  }
  async function resend() {
    if (busy || cooldown > 0) return;
    setBusy(true); setError(''); setNotice('');
    try { const result = await api.resend(token); setCooldown(result.retryAfterSeconds); setNotice(t('تم إرسال رمز جديد.', 'A new code has been sent.')); }
    catch (cause) { showError(cause); }
    finally { setBusy(false); }
  }
  function restart() {
    try { sessionStorage.removeItem(tokenKey); } catch { /* Optional storage. */ }
    setToken(''); setStatus(null); setCode(''); setError(''); setNotice(''); setStage('store'); setPollingPaused(false);
  }
  const errorMessage = error === 'password_mismatch' ? t('كلمتا المرور غير متطابقتين.', 'Passwords do not match.') : (messages[error] || messages.InvalidRequest)[english ? 1 : 0];
  const hintClass = 'mt-2 text-xs leading-5 text-gray-500';
  function changeField(name: keyof SignupModel, value: string) {
    if (name === 'phone') {
      value = normalizePhoneInput(value);
      if (value.startsWith('+')) {
        const parsed = parseSignupPhone(value);
        if (parsed?.country && phoneCountries.some(country => country.code === parsed.country)) {
          setPhoneCountry(parsed.country);
          value = parsed.formatNational();
        }
      }
    }
    setForm(previous => ({ ...previous, [name]: value }));
  }
  const field = (name: 'storeName' | 'email' | 'phone' | 'password' | 'confirmPassword', label: string, type = 'text', extra = {}, hint = '') => {
    const check = name === 'email' ? emailCheck : name === 'phone' ? phoneCheck : undefined;
    const hasError = check && !['idle', 'checking', 'available'].includes(check.state);
    const canRetry = hasError && !['EmailInvalid', 'PhoneInvalid', 'EmailTaken', 'PhoneTaken', 'Disabled'].includes(check.state);
    const description = [hint ? `${name}-hint` : '', check ? `${name}-status` : ''].filter(Boolean).join(' ');
    return <div>
      <label className="block text-sm font-bold text-gray-700" htmlFor={name}>{label}<input id={name} name={name} type={type} value={form[name]} onChange={event => changeField(name, event.target.value)} required aria-describedby={description || undefined} aria-invalid={hasError && !canRetry || undefined} className={inputClass} {...extra} /></label>
      {hint && <p id={`${name}-hint`} className={hintClass}>{hint}</p>}
      {check && <p id={`${name}-status`} role="status" className={`mt-2 text-sm ${hasError ? 'text-red-600' : check.available ? 'text-emerald-700' : 'text-gray-500'}`}>
        {check.state === 'checking' ? t('جاري الفحص…', 'Checking…') : check.available ? name === 'email' ? t('البريد متاح للتسجيل', 'Email available for signup') : t('رقم الموبايل متاح للتسجيل', 'Mobile number available for signup') : hasError ? (messages[check.state] || messages.InvalidRequest)[english ? 1 : 0] : ''}
      </p>}
      {check && ['EmailTaken', 'PhoneTaken'].includes(check.state) && <Link to={english ? '/en/login' : '/login'} className="mt-2 inline-block text-sm font-bold text-emerald-800 underline">{t('ادخل متجرك الحالي', 'Access your existing store')}</Link>}
      {canRetry && <button type="button" className="mt-2 text-sm underline" onClick={check.retry}>{t('إعادة الفحص', 'Check again')}</button>}
    </div>;
  };

  return <section className="signup-form hero-band min-h-[calc(100vh-4rem)] px-4 py-10 sm:py-14" dir={english ? 'ltr' : 'rtl'}>
    <div className="mx-auto max-w-lg">
      <Store className="mx-auto h-9 w-9 text-emerald-700" aria-hidden="true" />
      <h1 className="mt-4 text-center text-3xl font-black font-heading">{t('أنشئ متجرك الآن', 'Create your store')}</h1>
      <p className="mt-3 text-center text-sm leading-6 text-gray-600">{t('اختار رابط متجرك، أكّد بريدك، وابدأ إدارة شغلك من موبايلك.', 'Choose your store address, verify your email, and manage your business from your phone.')}</p>
      {['store', 'account'].includes(stage) && <StoreAccessHint language={english ? 'en' : 'ar'} />}
      <div className="mt-7 rounded-xl border border-gray-200 bg-white p-5 shadow-xl sm:p-7">
        {!config && !error && <p role="status">{t('جاري الاتصال…', 'Connecting…')}</p>}
        {config && !config.enabled && <p role="alert" className="mb-4 text-amber-800">{messages.Disabled[english ? 1 : 0]}</p>}
        {error && <div ref={errorAlert} tabIndex={-1} role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{errorMessage}{['EmailTaken', 'PhoneTaken'].includes(error) && <Link to={english ? '/en/login' : '/login'} className="mt-2 block font-bold underline">{t('ادخل متجرك الحالي', 'Access your existing store')}</Link>}</div>}
        {!config && error && <button className="btn btn-secondary mb-4" onClick={() => window.location.reload()}>{t('حاول تاني', 'Retry connection')}</button>}
        {notice && <p role="status" className="mb-4 text-sm text-emerald-700">{notice}</p>}
        {['store', 'account', 'verification'].includes(stage) && <form onSubmit={submit} className="space-y-5">
          {stage === 'store' && <>
            {field('storeName', t('اسم المتجر', 'Store name'), 'text', { maxLength: 200, autoComplete: 'organization' }, t('ده الاسم اللي هيظهر لعملائك. اكتبه بالعربي أو الإنجليزي.', 'This is the name your customers will see. Use Arabic or English.'))}
            <div>
              <label className="block text-sm font-bold text-gray-700" htmlFor="subdomain">{t('رابط المتجر', 'Store address')}<div dir="ltr" className="flex min-w-0 items-center gap-2"><input id="subdomain" name="subdomain" required minLength={3} maxLength={40} pattern="[a-z0-9](([a-z0-9]|-)*[a-z0-9])?" autoCapitalize="none" autoComplete="off" spellCheck={false} aria-describedby="subdomain-hint subdomain-status" className={inputClass + ' min-w-0'} value={form.subdomain} onChange={event => setForm(value => ({ ...value, subdomain: event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))} /><span className="shrink-0 text-xs font-normal">.{config?.baseDomain || 'matgarko.com'}</span></div></label>
              <p id="subdomain-hint" className={hintClass}>{t('اختار اسم قصير من 3 إلى 40 حرف إنجليزي أو رقم، من غير مسافات. مثال:', 'Choose a short address with 3–40 English letters or digits, without spaces. Example:')} <bdi>my-store.{config?.baseDomain || 'matgarko.com'}</bdi></p>
              <p id="subdomain-status" role="status" className={`mt-2 text-sm ${available ? 'text-emerald-700' : availability.value === form.subdomain && messages[availability.state] ? 'text-red-600' : 'text-gray-600'}`}>{available ? t('الرابط متاح', 'Address available') : availability.value === form.subdomain && messages[availability.state] ? messages[availability.state][english ? 1 : 0] : form.subdomain.length >= 3 ? t('جاري فحص الرابط…', 'Checking address…') : t('مسموح بشرطة بين الحروف أو الأرقام.', 'Hyphens are allowed between letters or digits.')}</p>
            </div>
            <button type="submit" disabled={!available || !config?.enabled} className="btn btn-primary w-full disabled:opacity-50">{t('التالي', 'Continue')}</button>
          </>}
          {stage === 'account' && <>
            {field('email', t('البريد الإلكتروني', 'Email'), 'email', { maxLength: 320, autoComplete: 'email', dir: 'ltr' }, t('استخدم بريد تقدر تفتحه دلوقتي؛ هنبعت عليه رمز تأكيد حسابك.', 'Use an email you can access now. We will send your verification code there.'))}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700" htmlFor="phoneCountry">{t('الدولة ومفتاح الاتصال', 'Country and calling code')}<select id="phoneCountry" name="phoneCountry" value={phoneCountry} onChange={event => setPhoneCountry(event.target.value as CountryCode)} className={inputClass} autoComplete="country">
                {phoneCountries.map(country => <option key={country.code} value={country.code}>{t(country.ar, country.en)} ({'\u2066'}+{country.callingCode}{'\u2069'})</option>)}
              </select></label>
              {field('phone', t('رقم الموبايل', 'Mobile number'), 'tel', { maxLength: 32, inputMode: 'tel', autoComplete: 'tel-national', dir: 'ltr' }, t('اختار الدولة واكتب رقمك المحلي، أو الصق الرقم كاملًا بمفتاح الدولة. بنقبل الأرقام العربية والإنجليزية.', 'Choose your country and enter your local mobile number, or paste the full international number. Arabic and English digits are accepted.'))}
            </div>
            {field('password', t('كلمة المرور', 'Password'), 'password', { minLength: 8, maxLength: 100, autoComplete: 'new-password' }, t('8 أحرف على الأقل. يفضّل تخلط حروف وأرقام ورموز وتستخدم كلمة مرور جديدة.', 'At least 8 characters. Use a unique password with a mix of letters, numbers, and symbols.'))}
            {field('confirmPassword', t('تأكيد كلمة المرور', 'Confirm password'), 'password', { minLength: 8, maxLength: 100, autoComplete: 'new-password' })}
            <div><label htmlFor="discoverySource" className="block text-sm font-bold text-gray-700">{t('عرفتنا منين؟ — اختياري', 'How did you hear about us? — optional')}<select id="discoverySource" name="discoverySource" aria-describedby="discoverySource-hint" className={inputClass} value={form.discoverySource || ''} onChange={event => setForm(value => ({ ...value, discoverySource: event.target.value || undefined }))}>
              <option value="">{t('اختار لو تحب', 'Select if you wish')}</option>
              {[['google', 'جوجل', 'Google'], ['facebook_instagram', 'فيسبوك أو إنستجرام', 'Facebook or Instagram'], ['tiktok', 'تيك توك', 'TikTok'], ['youtube', 'يوتيوب', 'YouTube'], ['friend', 'ترشيح صديق', 'A friend'], ['whatsapp', 'واتساب', 'WhatsApp'], ['ai', 'ChatGPT أو أداة ذكاء اصطناعي', 'ChatGPT or another AI tool'], ['other', 'مصدر تاني', 'Another source']].map(([value, ar, en]) => <option key={value} value={value}>{t(ar, en)}</option>)}
            </select></label><p id="discoverySource-hint" className={hintClass}>{t('إجابتك بتساعدنا نوصل لتجار أكتر. تقدر تكمل من غير ما تختار.', 'Your answer helps us reach more merchants. You can leave this blank.')}</p></div>
            <label className="flex items-start gap-3 text-sm leading-6"><input name="acceptTerms" type="checkbox" required checked={form.acceptTerms} onChange={event => setForm(value => ({ ...value, acceptTerms: event.target.checked }))} className="mt-1 h-5 w-5 shrink-0" /><span>{t('أوافق على', 'I agree to the')} <Link target="_blank" className="underline" to={english ? '/en/terms' : '/terms'}>{t('الشروط والأحكام', 'terms')}</Link> {t('و', 'and')} <Link target="_blank" className="underline" to={english ? '/en/privacy' : '/privacy'}>{t('سياسة الخصوصية', 'privacy policy')}</Link>.</span></label>
            <button type="submit" disabled={busy || !form.acceptTerms || cooldown > 0 || !emailCheck.available || !phoneCheck.available} className="btn btn-primary w-full disabled:opacity-50">{busy ? <Loader2 className="h-5 w-5 animate-spin" /> : t('إرسال رمز التحقق', 'Send verification code')}{cooldown > 0 && ` (${cooldown})`}</button>
            <button type="button" disabled={busy} className="btn btn-secondary w-full" onClick={() => { setStage('store'); setError(''); }}>{t('السابق', 'Back')}</button>
          </>}
          {stage === 'verification' && <>
            <h2 className="text-xl font-bold">{t('أكّد بريدك الإلكتروني', 'Verify your email')}</h2><p className="text-sm leading-6 text-gray-600">{t('اكتب الرمز المكوّن من 6 أرقام اللي وصلك على البريد. راجع الرسائل غير المرغوب فيها كمان.', 'Enter the 6-digit code sent to your email. Check your spam folder too.')}</p>
            <label htmlFor="code" className="block text-sm font-bold">{t('رمز التحقق', 'Verification code')}<input id="code" name="code" className={inputClass + ' text-center tracking-[0.4em]'} value={code} onChange={event => setCode(event.target.value.replace(/[^0-9]/g, '').slice(0, 6))} required pattern="[0-9]{6}" maxLength={6} inputMode="numeric" autoComplete="one-time-code" dir="ltr" /></label>
            <button type="submit" disabled={busy || code.length !== 6} className="btn btn-primary w-full disabled:opacity-50">{busy ? t('جاري التحقق…', 'Verifying…') : t('تأكيد البريد وإنشاء المتجر', 'Verify and create store')}</button>
            <button type="button" disabled={busy || cooldown > 0} className="btn btn-secondary w-full disabled:opacity-50" onClick={resend}>{t('إعادة إرسال الرمز', 'Resend code')}{cooldown > 0 && ` (${cooldown})`}</button>
            <button type="button" className="text-sm underline" disabled={busy} onClick={restart}>{t('تغيير بيانات التسجيل', 'Start a different registration')}</button>
          </>}
        </form>}
        {stage === 'provisioning' && <div className="space-y-5 text-center"><Loader2 className="mx-auto h-9 w-9 animate-spin text-emerald-700" /><h2 className="text-xl font-bold">{t('بنجهّز متجرك', 'Preparing your store')}</h2><p className="text-sm leading-6">{t('بريدك اتأكد. تجهيز المتجر ممكن ياخد بضع دقائق، وهتوصلك رسالة لما يبقى جاهز.', 'Your email is verified. Setup can take a few minutes; we will email you when your store is ready.')}</p>{pollingPaused && <button className="btn btn-secondary" onClick={() => { setError(''); setPollingPaused(false); }}>{t('فحص الحالة تاني', 'Check status again')}</button>}</div>}
        {stage === 'ready' && <div className="space-y-5 text-center"><CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" /><h2 className="text-2xl font-bold text-emerald-700">{t('متجرك جاهز!', 'Your store is ready!')}</h2>
          {readyStore ? <>
            <p role="status" className="text-sm leading-6">{t('بنفتح لك لوحة التحكم دلوقتي… ادخل بنفس البريد وكلمة المرور اللي سجلت بيهم.', 'Opening your dashboard now… Sign in with the email and password you registered with.')}</p>
            <a className="btn btn-primary w-full" href={readyStore.adminUrl} onClick={event => {
              if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !openReadyDashboard.current) return;
              event.preventDefault();
              openReadyDashboard.current();
            }}>{t('افتح لوحة إدارة متجرك', 'Open your dashboard')}</a>
            <div className="rounded-lg bg-emerald-50 p-3 text-sm leading-7"><p>{t('ده رابط متجرك لعملائك:', 'Your store link for customers:')}</p><a dir="ltr" className="block break-all font-semibold text-emerald-800 underline" href={readyStore.storeUrl}>{readyStore.storeUrl}</a></div>
            <p className="text-sm leading-6 text-gray-600">{t('في أي وقت ارجع لمتجركو واضغط «ادخل متجرك» للوصول لمتجرك.', 'Come back to Matgarko and choose “Access your store” whenever you need it.')}</p>
          </> : <p role="alert" className="text-sm leading-7">{t('متجرك جاهز، لكن تعذر فتح رابطه. تقدر توصل له من', 'Your store is ready, but its link could not be opened. Use')} <Link className="font-bold text-emerald-800 underline" to={english ? '/en/login' : '/login'}>{t('صفحة الدخول لمتجرك', 'the store access page')}</Link>.</p>}
        </div>}
        {stage === 'unavailable' && <p role="alert">{t('المتجر غير متاح حاليًا. تواصل مع الدعم.', 'Your store is currently unavailable. Please contact support.')}</p>}
        <p className="mt-6 text-center text-xs text-gray-500"><Link className="underline" to={english ? '/en/contact' : '/contact'}>{t('محتاج مساعدة؟ تواصل معانا', 'Need help? Contact us')}</Link></p>
      </div>
    </div>
  </section>;
}
