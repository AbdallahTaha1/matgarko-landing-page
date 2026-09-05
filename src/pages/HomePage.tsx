import { CTA } from "../components/CTA";
import { FAQ } from "../components/FAQ";
import { Features } from "../components/Features";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { PricingPreview } from "../components/PricingPreview";
import { TrustBar } from "../components/TrustBar";
import type { AppLanguage } from "@/lib/i18n";

export const HomePage = ({ language = "ar" }: { language?: AppLanguage }) => {
  return (
    <div dir={language === "en" ? "ltr" : "rtl"}>
      <Hero language={language} />
      <TrustBar language={language} />
      <Features language={language} />
      <HowItWorks language={language} />
      <PricingPreview language={language} />
      <FAQ language={language} />
      <CTA language={language} />
    </div>
  );
};
