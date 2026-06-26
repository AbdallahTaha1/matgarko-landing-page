import { Button } from "@/components/ui/button";
import { Check, X, ArrowLeft, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export type ComparisonRow = {
  feature: string;
  matgarko: string | boolean;
  competitor: string | boolean;
  highlight?: boolean;
};

export type CompetitorPageProps = {
  competitorName: string;
  competitorNameAr: string;
  badge: string;
  h1: string;
  lead: string;
  competitorSummary: string;
  matgarkoAdvantages: string[];
  comparisonRows: ComparisonRow[];
  faqs: { q: string; a: string }[];
  targetKeywords?: string[];
};

const SIGNUP_URL = "https://signup.matgarko.com/signup";

function CellValue({ value }: { value: string | boolean }) {
  if (value === true)
    return (
      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-sm">
        <Check className="w-4 h-4" /> نعم
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex items-center gap-1 text-red-400 text-sm">
        <X className="w-4 h-4" /> لا
      </span>
    );
  return <span className="text-sm text-gray-700">{value}</span>;
}

export function CompetitorPage({
  competitorName,
  competitorNameAr,
  badge,
  h1,
  lead,
  competitorSummary,
  matgarkoAdvantages,
  comparisonRows,
  faqs,
}: CompetitorPageProps) {
  return (
    <div className="bg-white text-right" dir="rtl">
      {/* Breadcrumb */}
      <nav className="container px-4 mx-auto pt-6 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link to="/" className="hover:text-emerald-600 transition-colors" itemProp="item">
              <span itemProp="name">متجركو</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li aria-hidden="true">/</li>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link to="/compare" className="hover:text-emerald-600 transition-colors" itemProp="item">
              <span itemProp="name">المقارنات</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          <li aria-hidden="true">/</li>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span className="text-gray-900" itemProp="name">متجركو vs {competitorNameAr}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="page-hero">
        <div className="container px-4 mx-auto text-center">
          <div className="section-kicker mb-5">
            <Zap className="w-4 h-4" />
            {badge}
          </div>
          <h1 className="page-title mb-5">{h1}</h1>
          <p className="page-lead">{lead}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button asChild className="bg-emerald-600 text-white font-extrabold hover:bg-emerald-700 h-12 px-8">
              <a href={SIGNUP_URL}>ابدأ مجاناً مع متجركو ←</a>
            </Button>
            <Button asChild variant="outline" className="h-12 px-6 font-bold border-gray-300 hover:border-emerald-400">
              <Link to="/pricing">شوف الأسعار</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Summary Cards */}
      <section className="container px-4 mx-auto py-12">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Matgarko Card */}
          <div className="rounded-2xl border-2 border-emerald-400 p-7 bg-white shadow-lg shadow-emerald-900/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">م</div>
              <div>
                <p className="font-black text-gray-950 font-heading">متجركو</p>
                <p className="text-xs text-emerald-600 font-bold">منصة مصرية محلية ✓</p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {matgarkoAdvantages.map((adv) => (
                <li key={adv} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  {adv}
                </li>
              ))}
            </ul>
          </div>

          {/* Competitor Card */}
          <div className="rounded-2xl border border-gray-200 p-7 bg-gray-50 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-200 text-gray-600 flex items-center justify-center font-black text-sm">
                {competitorNameAr[0]}
              </div>
              <div>
                <p className="font-black text-gray-700 font-heading">{competitorNameAr}</p>
                <p className="text-xs text-gray-400">{competitorName}</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{competitorSummary}</p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-2xl font-black text-gray-950 mb-8 font-heading text-center">
            مقارنة تفصيلية: متجركو vs {competitorNameAr}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
            <table className="w-full" aria-label={`مقارنة متجركو مع ${competitorNameAr}`}>
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-right p-4 text-sm font-bold text-gray-500 w-1/2">الخاصية</th>
                  <th className="text-center p-4 text-sm font-bold text-emerald-700">متجركو ✓</th>
                  <th className="text-center p-4 text-sm font-bold text-gray-500">{competitorNameAr}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-gray-50 ${row.highlight ? "bg-emerald-50/50" : ""}`}
                  >
                    <td className={`p-4 text-sm font-medium ${row.highlight ? "text-emerald-900 font-bold" : "text-gray-700"}`}>
                      {row.feature}
                    </td>
                    <td className="p-4 text-center">
                      <CellValue value={row.matgarko} />
                    </td>
                    <td className="p-4 text-center">
                      <CellValue value={row.competitor} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Switch CTA */}
      <section className="py-16 container px-4 mx-auto max-w-4xl">
        <div className="bg-gray-950 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-black mb-3 font-heading">
            جرّب متجركو مجاناً — بدون مخاطرة
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            ابدأ بعمولة 3% فقط على كل طلب. لا رسوم شهرية، لا بطاقة ائتمان، لا التزام. جرب المنصة وقرر بنفسك.
          </p>
          <a
            href={SIGNUP_URL}
            className="inline-flex items-center gap-2 bg-emerald-500 text-gray-950 font-extrabold hover:bg-emerald-400 px-8 py-3 rounded-lg transition-colors"
          >
            ابدأ مجاناً الآن ←
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-2xl font-black text-gray-950 mb-8 font-heading text-center">
            أسئلة شائعة عن متجركو و{competitorNameAr}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-5"
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
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-8 border-t border-gray-100">
        <div className="container px-4 mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4">يهمك كمان</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "أسعار متجركو", href: "/pricing" },
              { label: "قوالب المتجر", href: "/themes" },
              { label: "الدفع والشحن", href: "/integrations" },
              { label: "مقارنة المنصات", href: "/blog/best-ecommerce-platform-egypt" },
              { label: "ابدأ متجرك الآن", href: "/getting-started" },
            ].map((link) => (
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
    </div>
  );
}
