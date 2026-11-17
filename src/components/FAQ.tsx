import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { englishFaqs } from "@/data/en";
import { faqs } from "@/data/faqs";
import { homeContent } from "@/data/home";
import type { AppLanguage } from "@/lib/i18n";
import { WHATSAPP_URL } from "@/lib/seo";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function FAQ({ language }: { language: AppLanguage }) {
  const t = homeContent[language].faq;
  const items = language === "en" ? englishFaqs : faqs;

  return (
    <section id="faq" className="section band-soft" aria-labelledby="faq-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <Reveal>
            <SectionHeading id="faq-title" kicker={t.kicker} title={t.title} lead={t.lead} align="start" />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 py-2 text-sm font-bold text-emerald-700 hover:text-emerald-800"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t.more}
            </a>
            {/* The answers page exists in Arabic only. */}
            {language === "ar" && (
              <p>
                <Link to="/answers" className="inline-flex items-center gap-1.5 py-2 text-sm font-bold text-emerald-700 hover:text-emerald-800">
                  {t.all}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                </Link>
              </p>
            )}
          </Reveal>

          <Reveal delay={80}>
            <FaqList items={items} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
