import { useSyncExternalStore } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getConsent, serverConsent, setConsent, subscribeConsent } from '@/lib/consent';
import { isEnglishPath } from '@/lib/i18n';
export function AnalyticsConsent() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, serverConsent);
  const english = isEnglishPath(useLocation().pathname);
  if (consent !== 'unknown') return <button className="block mx-auto px-4 py-3 text-xs underline" onClick={() => setConsent('unknown')}>{english ? 'Cookie preferences' : 'إعدادات ملفات الارتباط'}</button>;
  return <aside aria-label={english ? 'Cookie preferences' : 'إعدادات ملفات الارتباط'} dir={english ? 'ltr' : 'rtl'} className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
    <p className="text-sm leading-6 text-gray-700">{english ? 'Allow analytics and advertising cookies to help us understand visits and which campaigns lead to signups? Your store works either way.' : 'تسمح بملفات التحليلات والإعلانات عشان نعرف مصادر الزيارات والحملات اللي بتوصل لتسجيلات؟ تقدر تستخدم الموقع في الحالتين.'} <Link className="underline" to={english ? '/en/privacy' : '/privacy'}>{english ? 'Privacy policy' : 'سياسة الخصوصية'}</Link></p>
    <div className="mt-3 flex gap-3"><button className="btn btn-secondary flex-1" onClick={() => setConsent('declined')}>{english ? 'Decline' : 'رفض'}</button><button className="btn btn-primary flex-1" onClick={() => setConsent('accepted')}>{english ? 'Allow' : 'موافق'}</button></div>
  </aside>;
}
