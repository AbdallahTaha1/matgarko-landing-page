import { CTA } from "../components/CTA";
import { FAQ } from "../components/FAQ";
import { Features } from "../components/Features";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { FakeOrderShield, StickyCta, Templates, VersusEasyOrders, WhatIs } from "../components/HomeSections";
import { PricingPreview } from "../components/PricingPreview";
import { StoreShowcase } from "../components/StoreShowcase";
import type { AppLanguage } from "@/lib/i18n";

export const HomePage = ({ language = "ar" }: { language?: AppLanguage }) => {
  return (
    <div dir={language === "en" ? "ltr" : "rtl"}>
      <Hero language={language} />
      <StoreShowcase language={language} />
      <WhatIs language={language} />
      <Features language={language} />
      <FakeOrderShield language={language} />
      <Templates language={language} />
      <HowItWorks language={language} />
      <PricingPreview language={language} />
      <VersusEasyOrders language={language} />
      <FAQ language={language} />
      <CTA language={language} />
      <StickyCta language={language} />
    </div>
  );
};
