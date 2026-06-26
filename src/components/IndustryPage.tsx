import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

export type IndustryFeature = {
  title: string;
  description: string;
  icon: ReactNode;
};

export type IndustryFaq = {
  q: string;
  a: string;
};

export type IndustryPageProps = {
  icon: ReactNode;
  badge: string;
  h1: string;
  lead: string;
  features: IndustryFeature[];
  benefits: string[];
  faqs: IndustryFaq[];
  ctaText: string;
  relatedLinks: { label: string; href: string }[];
};

const SIGNUP_URL = "https://signup.matgarko.com/signup";

export function IndustryPage({
  icon,
  badge,
  h1,
  lead,
  features,
  benefits,
  faqs,
  ctaText,
  relatedLinks,
}: IndustryPageProps) {
  return (
    <div className="bg-white text-right" dir="rtl">
      {/* Breadcrumb */}
      <nav className="container px-4 mx-auto pt-6 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link to="/" itemProp="item" className="hover:text-emerald-600 transition-colors">
              <span itemProp="name">متجركو</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li aria-hidden="true">/</li>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span className="text-gray-900 font-medium" itemProp="name">{badge}</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="page-hero">
        <div className="container px-4 mx-auto text-center">
          <div className="section-kicker mb-5">
            {icon}
            {badge}
          </div>
          <h1 className="page-title mb-5">{h1}</h1>
          <p className="page-lead">{lead}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button asChild className="bg-emerald-600 text-white font-extrabold hover:bg-emerald-700 h-12 px-8">
              <a href={SIGNUP_URL}>{ctaText} ←</a>
            </Button>
            <Button asChild variant="outline" className="h-12 px-6 font-bold border-gray-300 hover:border-emerald-400">
              <Link to="/pricing">شوف الأسعار</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 container px-4 mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-gray-950 text-center mb-12 font-heading">
          كل اللي تحتاجه في متجرك
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feat) => (
            <div key={feat.title} className="premium-card p-6">
              <div className="icon-tile h-11 w-11 mb-4">{feat.icon}</div>
              <h3 className="text-lg font-bold text-gray-950 mb-2 font-heading">{feat.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Checklist */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-2xl font-black text-gray-950 mb-8 font-heading text-center">
            لماذا متجركو؟
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-emerald-700" />
                </div>
                <span className="text-gray-700 text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 container px-4 mx-auto max-w-3xl">
        <h2 className="text-2xl font-black text-gray-950 mb-8 font-heading text-center">أسئلة شائعة</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl border border-gray-100 p-5"
              itemScope
              itemType="https://schema.org/Question"
            >
              <h3 className="font-bold text-gray-900 mb-2 text-sm" itemProp="name">{faq.q}</h3>
              <div itemScope itemType="https://schema.org/Answer">
                <p className="text-gray-600 text-sm leading-relaxed" itemProp="text">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-8 border-t border-gray-100">
        <div className="container px-4 mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4">يهمك كمان</p>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-full transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-950 text-white text-center">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl font-black mb-4 font-heading">{ctaText}</h2>
          <p className="text-gray-400 mb-8">ابدأ مجاناً — ادفع فقط لما تبيع. بدون أي التزام.</p>
          <Button asChild className="bg-emerald-500 text-gray-950 font-extrabold hover:bg-emerald-400 h-12 px-10">
            <a href={SIGNUP_URL}>أنشئ متجرك الآن ←</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
