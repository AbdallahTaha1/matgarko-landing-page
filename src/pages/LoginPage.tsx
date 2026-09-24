import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Copy, LayoutDashboard, Store } from 'lucide-react';
import { localizePath, type AppLanguage } from '@/lib/i18n';
import { forgetStore, parseStoreAddress, rememberStore, useRememberedStore } from '@/lib/storeAccess';

export function LoginPage({ language = 'ar' }: { language?: AppLanguage }) {
  const en = language === 'en';
  const store = useRememberedStore();
  const [address, setAddress] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  function openStore(event: FormEvent) {
    event.preventDefault();
    const links = parseStoreAddress(address);
    if (!links) { setInvalid(true); return; }
    rememberStore(links);
    window.location.assign(links.adminUrl);
  }

  async function copyLink() {
    if (!store) return;
    try {
      await navigator.clipboard.writeText(store.storeUrl);
      setCopyStatus(en ? 'Store link copied.' : 'تم نسخ رابط المتجر.');
    } catch {
      setCopyStatus(en ? 'Select the store link above and copy it.' : 'حدد رابط المتجر اللي فوق وانسخه.');
    }
  }

  return <section className="hero-band min-h-[calc(100vh-4rem)] px-4 py-10 sm:py-14" dir={en ? 'ltr' : 'rtl'}>
    <div className="mx-auto max-w-lg">
      <Store className="mx-auto h-9 w-9 text-emerald-700" aria-hidden="true" />
      <h1 className="mt-4 text-center text-3xl font-black font-heading">{en ? 'Access your store' : 'ادخل متجرك'}</h1>
      <p className="mt-3 text-center text-sm leading-7 text-gray-600">{en ? 'Open your dashboard to manage products and orders using the email and password you registered with.' : 'افتح لوحة التحكم وتابع منتجاتك وطلباتك بنفس البريد وكلمة المرور اللي سجلت بيهم.'}</p>

      {store && <div className="mt-7 rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-bold text-gray-950">{en ? 'Your saved store' : 'متجرك المحفوظ'}</h2>
        <p className="mt-2 text-sm text-gray-600">{en ? 'Your store link — share it with your customers:' : 'ده رابط متجرك اللي تبعته لعملائك:'}</p>
        <a href={store.storeUrl} dir="ltr" className="mt-3 block break-all rounded-lg bg-emerald-50 p-3 text-center font-semibold text-emerald-800 underline underline-offset-4">{store.storeUrl}</a>
        <a className="btn btn-primary mt-4 w-full" href={store.adminUrl}><LayoutDashboard className="h-5 w-5" aria-hidden="true" />{en ? 'Open your dashboard' : 'افتح لوحة التحكم'}</a>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
          <button type="button" onClick={copyLink} className="inline-flex min-h-11 items-center gap-2 font-semibold text-emerald-800"><Copy className="h-4 w-4" aria-hidden="true" />{en ? 'Copy store link' : 'انسخ رابط المتجر'}</button>
          <button type="button" onClick={() => { forgetStore(); setCopyStatus(''); }} className="min-h-11 text-gray-600 underline">{en ? 'Remove saved link' : 'امسح الرابط المحفوظ'}</button>
        </div>
        {copyStatus && <p role="status" className="mt-2 text-sm text-emerald-800">{copyStatus}</p>}
        <p className="mt-2 text-xs leading-6 text-gray-500">{en ? 'This shortcut is saved in this browser. Removing it does not delete your store or sign you out.' : 'الرابط محفوظ على المتصفح ده. مسحه من هنا مش بيحذف متجرك ولا بيسجّل خروجك.'}</p>
      </div>}

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-bold text-gray-950">{store ? (en ? 'Open another store' : 'الدخول لمتجر تاني') : (en ? 'Open your store dashboard' : 'افتح لوحة تحكم متجرك')}</h2>
        <form className="mt-5" onSubmit={openStore}>
          <label htmlFor="store-address" className="block text-sm font-bold text-gray-700">{en ? 'Store link or address name' : 'رابط متجرك أو اسمه في الرابط'}</label>
          <input id="store-address" value={address} onChange={event => { setAddress(event.target.value); setInvalid(false); }} required maxLength={160} dir="ltr" autoCapitalize="none" autoCorrect="off" spellCheck={false} placeholder="yourstore.matgarko.com" aria-invalid={invalid || undefined} aria-describedby="store-address-help" className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-950 focus:outline-emerald-600" />
          <p id="store-address-help" className="mt-2 text-sm leading-6 text-gray-600">{en ? 'For example: yourstore.matgarko.com, or just yourstore.' : 'مثال: yourstore.matgarko.com أو اكتب yourstore بس.'}</p>
          {invalid && <p role="alert" className="mt-2 text-sm text-red-700">{en ? 'Enter your original Matgarko store link or the part before .matgarko.com.' : 'اكتب رابط متجرك الأصلي على متجركو أو الجزء اللي قبل .matgarko.com.'}</p>}
          <button type="submit" className="btn btn-secondary mt-4 w-full">{en ? 'Go to dashboard' : 'الدخول للوحة التحكم'}</button>
        </form>
        <details className="mt-5 border-t border-gray-100 pt-4 text-sm leading-7">
          <summary className="cursor-pointer py-2 font-bold text-emerald-800">{en ? 'Forgot your store link?' : 'مش فاكر رابط متجرك؟'}</summary>
          <p className="mt-2 text-gray-600">{en ? 'Search the email you registered with for the Matgarko message titled “تم تفعيل متجرك”. Copy the store link from that message and paste it above. Check your spam folder too.' : 'افتح البريد اللي سجلت بيه، ودوّر على رسالة متجركو بعنوان «تم تفعيل متجرك». انسخ رابط المتجر من الرسالة وحطه فوق. راجع الرسائل غير المرغوب فيها كمان.'}</p>
          <p className="mt-3 text-gray-600">{en ? 'Still cannot find it? Contact us and we will help you get back to your existing store.' : 'مش لاقي الرسالة؟ تواصل معانا وهنساعدك ترجع لمتجرك الحالي.'}</p>
          <a className="btn btn-secondary mt-3 w-full" href={`https://wa.me/201080312538?text=${encodeURIComponent(en ? 'I already have a Matgarko store and need help finding its link.' : 'عندي متجر على متجركو ومش فاكر الرابط، محتاج مساعدة للوصول لمتجري.')}`} target="_blank" rel="noopener noreferrer">{en ? 'Help me find my store' : 'ساعدني أوصل لمتجري'}</a>
        </details>
      </div>
      <p className="mt-6 text-center text-sm text-gray-600">{en ? 'New to Matgarko?' : 'لسه معندكش متجر؟'} <Link className="font-bold text-emerald-800 underline" to={localizePath('/register', language)}>{en ? 'Create your store free' : 'أنشئ متجرك مجاناً'}</Link></p>
    </div>
  </section>;
}
