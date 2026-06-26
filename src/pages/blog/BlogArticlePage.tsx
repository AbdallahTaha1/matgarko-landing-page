import { blogArticles, type BlogSection } from "@/data/blog";
import { useParams, Link, Navigate } from "react-router-dom";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

const SIGNUP_URL = "https://signup.matgarko.com/signup";

function renderSection(section: BlogSection, idx: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2 key={idx} className="text-2xl font-black text-gray-950 mt-10 mb-4 font-heading">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={idx} className="text-xl font-bold text-gray-900 mt-8 mb-3 font-heading">
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p key={idx} className="text-gray-600 leading-relaxed mb-4">
          {section.text}
        </p>
      );
    case "ul":
      return (
        <ul key={idx} className="space-y-2 mb-6 list-none">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={idx} className="space-y-2 mb-6 list-none">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 number-font">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div key={idx} className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 my-6">
          <p className="text-emerald-800 font-medium text-sm leading-relaxed">{section.text}</p>
        </div>
      );
    default:
      return null;
  }
}

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const otherArticles = blogArticles.filter((a) => a.slug !== slug).slice(0, 3);

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
            <Link to="/blog" className="hover:text-emerald-600 transition-colors" itemProp="item">
              <span itemProp="name">المدونة</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          <li aria-hidden="true">/</li>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span className="text-gray-900" itemProp="name">{article.category}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      {/* Article */}
      <article
        className="container px-4 mx-auto py-12 max-w-3xl"
        itemScope
        itemType="https://schema.org/Article"
      >
        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              <time itemProp="timeRequired">{article.readingTime} قراءة</time>
            </span>
          </div>

          <h1
            className="text-3xl md:text-4xl font-black text-gray-950 leading-tight mb-6 font-heading"
            itemProp="headline"
          >
            {article.title}
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed" itemProp="description">
            {article.description}
          </p>

          <div className="mt-6 flex items-center gap-4 text-sm text-gray-400 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>فريق متجركو</span>
            </div>
            <span>|</span>
            <time dateTime={article.publishDate} itemProp="datePublished">
              {new Date(article.publishDate).toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </header>

        {/* Article Content — always fully in DOM for crawlers */}
        <div itemProp="articleBody">
          {article.content.map((section, idx) => renderSection(section, idx))}
        </div>

        {/* In-article CTA */}
        <div className="my-12 bg-gray-950 rounded-2xl p-8 text-white text-center">
          <h2 className="text-xl font-black mb-3 font-heading">جاهز تبدأ متجرك؟</h2>
          <p className="text-gray-400 mb-6 text-sm">ابدأ مجاناً — ادفع فقط لما تبيع. بدون أي التزام.</p>
          <a
            href={SIGNUP_URL}
            className="inline-flex items-center gap-2 bg-emerald-500 text-gray-950 font-extrabold hover:bg-emerald-400 px-8 py-3 rounded-lg transition-colors"
          >
            أنشئ متجرك الآن ←
          </a>
        </div>
      </article>

      {/* Related Articles */}
      {otherArticles.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100 py-16">
          <div className="container px-4 mx-auto max-w-5xl">
            <h2 className="text-2xl font-black text-gray-950 mb-8 font-heading">مقالات أخرى قد تهمك</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {otherArticles.map((rel) => (
                <article key={rel.slug} className="premium-card p-6 group">
                  <span className="text-xs font-bold text-emerald-700 mb-3 block">{rel.category}</span>
                  <h3 className="font-black text-gray-950 mb-3 font-heading text-lg leading-tight group-hover:text-emerald-700 transition-colors">
                    <Link to={`/blog/${rel.slug}`}>{rel.title}</Link>
                  </h3>
                  <Link
                    to={`/blog/${rel.slug}`}
                    className="inline-flex items-center gap-1 text-sm text-emerald-700 hover:text-emerald-800 font-bold mt-2"
                  >
                    <ArrowRight className="w-3 h-3" /> اقرأ أكثر
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
