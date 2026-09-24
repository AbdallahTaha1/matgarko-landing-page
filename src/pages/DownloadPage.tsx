import { useEffect, useState } from 'react';
import { Download, Globe, Smartphone } from 'lucide-react';
import { fetchReleases, type Releases } from '@/lib/appReleases';
import type { AppLanguage } from '@/lib/i18n';

export function DownloadPage({ language = 'ar' }: { language?: AppLanguage }) {
  const en = language === 'en';
  const [releases, setReleases] = useState<Releases | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [store, setStore] = useState('');
  const [storeError, setStoreError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    let active = true;
    fetchReleases(controller.signal).then(
      value => { if (active) setReleases(value); },
      () => { if (active) setFailed(true); },
    ).finally(() => clearTimeout(timer));
    return () => { active = false; clearTimeout(timer); controller.abort(); };
  }, [attempt]);

  function openStore(event: React.FormEvent) {
    event.preventDefault();
    const value = store.trim().toLowerCase();
    // Only navigate to platform stores. Never accept credentials or arbitrary URLs.
    const match = /^(?:https:\/\/)?([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)(?:\.matgarko\.com)?\/?$/.exec(value);
    if (!match || ['www', 'downloads', 'api', 'admin', 'mail', 'landing', 'support'].includes(match[1])) {
      setStoreError(true);
      return;
    }
    window.location.assign(`https://${match[1]}.matgarko.com/admin`);
  }

  return (
    <section className="hero-band" dir={en ? 'ltr' : 'rtl'}>
      <div className="container-x py-12 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <span className="section-kicker"><Smartphone size={18} aria-hidden="true" />{en ? 'Your store, with you' : 'متجرك معاك'}</span>
          <h1 className="mt-5 text-3xl font-extrabold leading-relaxed text-gray-950 sm:text-4xl">{en ? 'Get the Matgarko app' : 'حمّل تطبيق متجركو'}</h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">{en ? 'Manage products and orders from your phone. Choose the download that works for your device.' : 'تابع طلباتك ومنتجاتك من موبايلك. اختار طريقة التحميل المناسبة لجهازك.'}</p>

          <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8" aria-busy={!releases && !failed}>
            <h2 className="text-xl font-bold text-gray-950">{en ? 'For Android' : 'لأجهزة أندرويد'}</h2>
            <div className="mt-4" role="status" aria-live="polite">
              {!releases && !failed && <p className="text-gray-600">{en ? 'Checking available downloads…' : 'جارٍ تجهيز روابط التحميل…'}</p>}
              {failed && <>
                <p className="leading-7 text-gray-600">{en ? 'We could not load the download links. Try again or use your store in the browser below.' : 'تعذر تحميل روابط التطبيق حاليًا. جرّب مرة تانية، أو افتح متجرك من المتصفح بالأسفل.'}</p>
                <button className="btn btn-secondary mt-4" onClick={() => { setFailed(false); setReleases(null); setAttempt(n => n + 1); }}>{en ? 'Try again' : 'إعادة المحاولة'}</button>
              </>}
              {releases && !releases.play && !releases.website && <p className="leading-7 text-gray-600">{en ? 'The app download is being prepared. You can manage your store in the browser below.' : 'تحميل التطبيق قيد التجهيز. تقدر تدير متجرك من المتصفح بالأسفل.'}</p>}
            </div>
            {releases?.play && <a className="btn btn-primary mt-4 w-full" href={releases.play.storeUrl} referrerPolicy="no-referrer">{en ? 'Get it on Google Play' : 'تحميل من Google Play'}</a>}
            {releases?.website && <div className={releases.play ? 'mt-6 border-t border-gray-100 pt-6' : 'mt-4'}>
              <p className="mb-3 font-semibold text-gray-800">{en ? 'No Google Play on your device?' : 'جهازك مفيهوش Google Play؟'}</p>
              <a className={`btn ${releases.play ? 'btn-secondary' : 'btn-primary'} w-full`} href={releases.website.downloadUrl} referrerPolicy="no-referrer"><Download size={18} aria-hidden="true" />{en ? 'Download for Android (APK)' : 'تحميل مباشر لأندرويد (APK)'}</a>
              <p className="mt-3 text-sm text-gray-600">{en ? 'Version' : 'الإصدار'} <bdi>{releases.website.versionName}</bdi> · <bdi>{Math.ceil(releases.website.sizeBytes! / 1048576)} MB</bdi></p>
              <details className="mt-4 text-sm leading-7 text-gray-600">
                <summary className="cursor-pointer py-2 font-semibold text-emerald-800">{en ? 'How do I install it?' : 'إزاي أثبّت التطبيق؟'}</summary>
                <ol className="list-decimal space-y-2 ps-5">
                  <li>{en ? 'Download the file, then open it from Downloads.' : 'حمّل الملف وافتحه من التنزيلات.'}</li>
                  <li>{en ? 'If Android asks, allow this browser to install apps, then tap Install.' : 'لو أندرويد طلب إذن التثبيت من المتصفح، اسمح له واضغط تثبيت.'}</li>
                  <li>{en ? 'For updates, install the new file over the existing app. Keep your existing app and data.' : 'وقت التحديث، ثبّت الملف الجديد فوق التطبيق الموجود من غير ما تحذفه.'}</li>
                </ol>
                <p className="mt-3">{en ? 'Some devices cannot install Android APK files. Order push notifications require Google services. The browser remains available.' : 'بعض الأجهزة مش بتقبل ملفات APK. إشعارات الطلبات تحتاج خدمات Google. تقدر تستخدم المتصفح في أي وقت.'}</p>
              </details>
            </div>}
          </div>

          <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
            <Globe className="mb-3 text-emerald-700" aria-hidden="true" />
            <h2 className="text-xl font-bold text-gray-950">{en ? 'Use your store in the browser' : 'ادخل متجرك من المتصفح'}</h2>
            <p className="mt-3 leading-7 text-gray-600">{en ? 'Works without installing an app. Enter your original Matgarko store address.' : 'إدارة متجرك متاحة من غير تحميل تطبيق. اكتب رابط متجرك الأصلي على متجركو.'}</p>
            <form className="mt-5" onSubmit={openStore}>
              <label htmlFor="store-address" className="block font-semibold text-gray-800">{en ? 'Store address' : 'رابط المتجر'}</label>
              <input id="store-address" value={store} onChange={e => { setStore(e.target.value); setStoreError(false); }} dir="ltr" autoCapitalize="none" autoCorrect="off" spellCheck={false} required maxLength={120} placeholder="yourstore.matgarko.com" aria-invalid={storeError} aria-describedby="store-help" className="mt-2 w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-950 focus:border-emerald-600 focus:outline-emerald-600" />
              <p id="store-help" className={`mt-2 text-sm ${storeError ? 'text-red-700' : 'text-gray-600'}`}>{storeError ? (en ? 'Enter your store link, for example yourstore.matgarko.com.' : 'اكتب رابط متجرك، مثل yourstore.matgarko.com.') : (en ? 'You can enter just the part before .matgarko.com.' : 'ممكن تكتب الجزء اللي قبل .matgarko.com فقط.')}</p>
              <button className="btn btn-secondary mt-4 w-full" type="submit">{en ? 'Open store dashboard' : 'فتح لوحة المتجر'}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
