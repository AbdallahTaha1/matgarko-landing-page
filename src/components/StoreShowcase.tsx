import { homeContent } from "@/data/home";
import { showcaseStores, type ShowcaseStore } from "@/data/stores";
import type { AppLanguage } from "@/lib/i18n";
import { useState } from "react";

function StoreLogo({ store, name }: { store: ShowcaseStore; name: string }) {
  const [failed, setFailed] = useState(false);

  if (!store.logo || failed) {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-lg font-extrabold text-emerald-800" aria-hidden="true">
        {name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={store.logo}
      alt=""
      width={48}
      height={48}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-12 w-12 shrink-0 rounded-2xl bg-white object-cover shadow-[0_0_0_1px_#e3e8e7]"
    />
  );
}

export function StoreShowcase({ language }: { language: AppLanguage }) {
  const t = homeContent[language].stores;

  return (
    <section className="bg-white py-10 sm:py-14" aria-labelledby="stores-title">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="stores-title" className="text-lg font-extrabold leading-8 text-gray-900 font-heading sm:text-2xl sm:leading-10">{t.title}</h2>
          <p className="mt-1.5 text-sm leading-7 text-gray-600 sm:text-base">{t.lead}</p>
        </div>

        {/* Phones scroll the stores sideways so the section stays one row tall. */}
        <ul className="scrollbar-none -mx-4 mt-6 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 sm:pb-0">
          {showcaseStores.map((store) => {
            const name = store.name[language];
            return (
              <li key={store.url} className="w-[13rem] shrink-0 snap-start sm:w-auto">
                <a
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex h-full items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_0_0_1px_#e3e8e7] transition hover:shadow-[0_0_0_1px_#abd6cc,0_14px_30px_-20px_rgba(14,90,82,0.45)]"
                >
                  <StoreLogo store={store} name={name} />
                  <span className="min-w-0 text-start">
                    <span className="block text-sm font-extrabold leading-6 text-gray-900">{name}</span>
                    <span className="block truncate text-xs leading-5 text-gray-500">{store.category[language]}</span>
                  </span>
                  <span className="sr-only">{t.opensNewTab}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
