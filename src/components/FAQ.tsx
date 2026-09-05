import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { englishFaqs } from "@/data/en";
import { faqs } from "@/data/faqs";
import { homeContent } from "@/data/home";
import type { AppLanguage } from "@/lib/i18n";
import { WHATSAPP_URL } from "@/lib/seo";
import { MessageCircle } from "lucide-react";

export function FAQ({ language }: { language: AppLanguage }) {
  const t = homeContent[language].faq;
  const items = language === "en" ? englishFaqs : faqs;

  return (
    <section id="faq" className="section bg-white" aria-labelledby="faq-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <Reveal>
            <SectionHeading id="faq-title" kicker={t.kicker} title={t.title} lead={t.lead} align="start" />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t.more}
            </a>
          </Reveal>

          <Reveal delay={80}>
            <FaqList items={items} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
