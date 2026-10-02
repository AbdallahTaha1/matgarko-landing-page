import { PLAY_URL } from '@/lib/appReleases';
import type { AppLanguage } from '@/lib/i18n';

export function GooglePlayBadge({ language }: { language: AppLanguage }) {
  return (
    <a
      href={PLAY_URL}
      referrerPolicy="no-referrer"
      className="inline-flex w-[220px] max-w-full shrink-0 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
    >
      <img
        src={`/badges/google-play-${language}.png`}
        alt={language === 'en' ? 'Get it on Google Play' : 'تحميل من Google Play'}
        width={646}
        height={250}
        className="h-auto w-full"
      />
    </a>
  );
}
