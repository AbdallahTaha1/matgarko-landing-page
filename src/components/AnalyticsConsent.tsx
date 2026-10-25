import { useSyncExternalStore } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getConsent, serverConsent, setConsent, subscribeConsent } from '@/lib/consent';
import { isEnglishPath } from '@/lib/i18n';
export function AnalyticsConsent() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, serverConsent);
  const english = isEnglishPath(useLocation().pathname);
  if (consent !== 'unknown') return <button className="block mx-auto px-4 py-3 text-xs underline" onClick={() => setConsent('unknown')}>{english ? 'Cookie preferences' : 'إعدادات ملفات الارتباط'}</button>;
  return <aside aria-label={english ? 'Cookie preferences' : 'إعدادات ملفات الارتباط'} dir={english ? 'ltr' : 'rtl'} className="fixed inset-x-2 bottom-2 z-[100] mx-auto flex max-w-xl items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
    <p className="flex-1 text-xs leading-5 text-gray-700">{english ? 'Allow analytics and advertising cookies?' : 'تسمح بملفات التحليلات والإعلانات؟'} <Link className="underline" to={english ? '/en/privacy' : '/privacy'}>{english ? 'Privacy' : 'الخصوصية'}</Link></p>
    <button className="h-8 shrink-0 rounded-md border border-gray-300 px-3 text-xs font-semibold text-gray-700 hover:bg-gray-50" onClick={() => setConsent('declined')}>{english ? 'Decline' : 'رفض'}</button>
    <button className="h-9 shrink-0 rounded-md bg-emerald-600 px-5 text-sm font-bold text-white shadow-sm hover:bg-emerald-700" onClick={() => setConsent('accepted')}>{english ? 'Allow' : 'موافق'}</button>
  </aside>;
}
