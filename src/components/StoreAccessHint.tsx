import { Link } from 'react-router-dom';
import { localizePath, type AppLanguage } from '@/lib/i18n';
import { useRememberedStore } from '@/lib/storeAccess';

export function StoreAccessHint({ language }: { language: AppLanguage }) {
  const store = useRememberedStore();
  const en = language === 'en';

  return <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7">
    <p className="font-bold text-gray-900">{store ? (en ? 'Welcome back to your store' : 'متجرك مستنيك') : (en ? 'Already have a store?' : 'عملت متجر قبل كده؟')}</p>
    {store && <a href={store.storeUrl} dir="ltr" className="mt-1 block break-all text-start font-medium text-emerald-800 underline underline-offset-4">{new URL(store.storeUrl).hostname}</a>}
    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
      {store && <a href={store.adminUrl} className="font-bold text-emerald-800 underline underline-offset-4">{en ? 'Open your dashboard' : 'افتح لوحة التحكم'}</a>}
      <Link to={localizePath('/login', language)} className="font-bold text-emerald-800 underline underline-offset-4">{store ? (en ? 'Store access options' : 'خيارات الدخول لمتجرك') : (en ? 'Access your store' : 'ادخل متجرك')}</Link>
      {!store && <span className="text-gray-600">{en ? 'Use your existing account to manage it.' : 'ادخل بحسابك الحالي وكمل إدارة شغلك.'}</span>}
    </div>
  </div>;
}
