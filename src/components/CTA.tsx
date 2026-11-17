import { Reveal } from "@/components/motion/Reveal";
import { homeContent } from "@/data/home";
import { SIGNUP_URL } from "@/data/pricing";
import type { AppLanguage } from "@/lib/i18n";
import { WHATSAPP_URL } from "@/lib/seo";
import { SIGNUP_LINK_KEY } from "@/lib/storeAccess";
import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

/**
 * The closing band: type the store link you want and go to signup with it filled in. The link is
 * handed over in this tab's storage, never in the address, and the form still leads to signup
 * when scripts are off.
 */
export function CTA({ language }: { language: AppLanguage }) {
  const t = homeContent[language].cta;
  const signupUrl = language === "en" ? "/en/register" : SIGNUP_URL;
  const [link, setLink] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const wanted = link.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/^-+|-+$/g, "").slice(0, 40);
    try {
      if (wanted) sessionStorage.setItem(SIGNUP_LINK_KEY, wanted);
      else sessionStorage.removeItem(SIGNUP_LINK_KEY);
    } catch {
      /* Signup simply starts empty. */
    }
    window.location.assign(signupUrl);
  }

  return (
    <section className="band-dark relative overflow-hidden" aria-labelledby="cta-title">
      <div className="container-x relative py-16 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="cta-title" className="text-[1.7rem] font-extrabold leading-[1.5] font-heading sm:text-4xl sm:leading-[1.45]">
            {t.title}
          </h2>
          <p className="mt-3 text-base leading-8 text-emerald-100 sm:text-lg sm:leading-9">{t.lead}</p>

          <form action={signupUrl} onSubmit={submit} className="mx-auto mt-7 max-w-md rounded-[1.75rem] bg-white p-2 text-start shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
            <label htmlFor="cta-store-link" className="sr-only">{t.linkLabel}</label>
            <div dir="ltr" className="flex items-center rounded-full bg-gray-50 px-4 shadow-[inset_0_0_0_1px_#dfe3e2] focus-within:shadow-[inset_0_0_0_2px_#0e5a52]">
              <input
                id="cta-store-link"
                type="text"
                dir="ltr"
                value={link}
                onChange={(event) => setLink(event.target.value)}
                placeholder="my-store"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                maxLength={60}
                className="h-12 min-w-0 flex-1 bg-transparent text-left text-base font-semibold text-gray-900 outline-none placeholder:text-gray-400"
              />
              <span className="shrink-0 text-sm font-semibold text-gray-500" aria-hidden="true">.matgarko.com</span>
            </div>
            <button type="submit" className="btn btn-primary mt-2 w-full">
              {t.primary}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </button>
          </form>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 py-2 text-sm font-bold text-white underline underline-offset-4">
            {t.secondary}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
