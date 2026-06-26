import { Features } from "../components/Features";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { FAQ } from "../components/FAQ";
import { Testimonials } from "../components/Testimonials";
import { Stats } from "../components/Stats";
import { CTA } from "../components/CTA";
import { WhyEcommerce } from "../components/WhyEcommerce";
import { MarketReadiness } from "../components/MarketReadiness";
import { FeatureRibbon } from "../components/FeatureRibbon";

export const HomePage = () => {
  return (
    <>
      <Hero />
      <FeatureRibbon />
      <Stats />
      <WhyEcommerce />
      <Features />
      <MarketReadiness />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
};
