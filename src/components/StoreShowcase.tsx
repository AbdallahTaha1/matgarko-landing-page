import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { homeContent } from "@/data/home";
import { showcaseStores, type ShowcaseStore } from "@/data/stores";
import type { AppLanguage } from "@/lib/i18n";
import { useState } from "react";

function StoreLogo({ store, name }: { store: ShowcaseStore; name: string }) {
  const [failed, setFailed] = useState(false);

  if (!store.logo || failed) {
    return (
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-lg font-extrabold text-emerald-800" aria-hidden="true">
        {name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={store.logo}
      alt=""
      width={56}
      height={56}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-14 w-14 shrink-0 rounded-2xl border border-gray-100 bg-white object-cover"
    />
  );
}

export function StoreShowcase({ language }: { language: AppLanguage }) {
  const t = homeContent[language].stores;

  return (
    <section className="border-y border-gray-100 bg-white py-10 sm:py-14" aria-labelledby="stores-title">
      <div className="container-x">
        <Reveal>
          <SectionHeading id="stores-title" title={t.title} lead={t.lead} />
        </Reveal>

        {/* Phones scroll the stores sideways so the section stays one row tall. */}
        <ul className="-mx-4 mt-8 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 sm:pb-0">
          {showcaseStores.map((store, index) => {
            const name = store.name[language];
            return (
              <Reveal key={store.url} as="li" delay={(index % 4) * 60} className="w-36 shrink-0 snap-start sm:w-auto">
                <a
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col items-center rounded-2xl border border-gray-200 bg-white p-4 text-center transition hover:border-emerald-300 hover:shadow-md"
                >
                  <StoreLogo store={store} name={name} />
                  <span className="mt-3 text-sm font-extrabold leading-5 text-gray-950">{name}</span>
                  <span className="mt-1 text-xs leading-5 text-gray-500">{store.category[language]}</span>
                  <span className="sr-only">{t.opensNewTab}</span>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
