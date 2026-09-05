import { homeContent } from "@/data/home";
import type { AppLanguage } from "@/lib/i18n";
import { Banknote, CreditCard, Landmark, Smartphone, Wallet } from "lucide-react";

const icons = [Banknote, Landmark, CreditCard, CreditCard, Wallet, Smartphone];

export function TrustBar({ language }: { language: AppLanguage }) {
  const t = homeContent[language].trustBar;

  return (
    <section className="border-y border-gray-100 bg-white" aria-label={t.title}>
      <div className="container-x flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
        <p className="shrink-0 text-xs font-bold text-gray-500 sm:text-sm">{t.title}</p>
        <ul className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {t.items.map((item, index) => {
            const Icon = icons[index] ?? CreditCard;
            return (
              <li
                key={item}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-bold text-gray-800 sm:text-sm"
              >
                <Icon className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
