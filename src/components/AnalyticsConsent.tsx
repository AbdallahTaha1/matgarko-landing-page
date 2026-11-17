import { useSyncExternalStore } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getConsent, serverConsent, setConsent, subscribeConsent } from '@/lib/consent';
import { isEnglishPath } from '@/lib/i18n';
export function AnalyticsConsent() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, serverConsent);
  const english = isEnglishPath(useLocation().pathname);
  // Once answered, the choice is changed from «إعدادات ملفات الارتباط» in the footer.
  if (consent !== 'unknown') return null;
  return <aside aria-label={english ? 'Cookie preferences' : 'إعدادات ملفات الارتباط'} dir={english ? 'ltr' : 'rtl'} className="fixed inset-x-2 bottom-2 z-[100] mx-auto flex max-w-xl items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_0_0_1px_#dfe3e2,0_16px_40px_-16px_rgba(10,33,30,0.45)]">
    <p className="flex-1 text-xs leading-5 text-gray-700">{english ? 'Allow analytics and advertising cookies?' : 'تسمح بملفات التحليلات والإعلانات؟'} <Link className="underline" to={english ? '/en/privacy' : '/privacy'}>{english ? 'Privacy' : 'الخصوصية'}</Link></p>
    <button className="h-9 shrink-0 rounded-full px-3.5 text-xs font-bold text-gray-700 shadow-[inset_0_0_0_1px_#c5cfd1] hover:bg-gray-50" onClick={() => setConsent('declined')}>{english ? 'Decline' : 'رفض'}</button>
    <button className="h-9 shrink-0 rounded-full bg-emerald-600 px-5 text-sm font-bold text-white hover:bg-emerald-700" onClick={() => setConsent('accepted')}>{english ? 'Allow' : 'موافق'}</button>
  </aside>;
}
