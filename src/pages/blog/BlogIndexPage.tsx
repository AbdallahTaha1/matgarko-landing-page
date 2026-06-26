import { blogArticles } from "@/data/blog";
import { Link } from "react-router-dom";
import { Clock, ArrowLeft, BookOpen } from "lucide-react";

export function BlogIndexPage() {
  return (
    <div className="bg-white text-right" dir="rtl">
      {/* Hero */}
      <section className="page-hero">
        <div className="container px-4 mx-auto text-center">
          <div className="section-kicker mb-5">
            <BookOpen className="h-4 w-4" />
            المدونة
          </div>
          <h1 className="page-title mb-5">دليلك لإنشاء وتنمية متجرك الإلكتروني</h1>
          <p className="page-lead">
            مقالات عملية وأدلة مفصّلة تساعدك على إنشاء متجرك، اختيار الأدوات المناسبة، وتنمية مبيعاتك في السوق المصري.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogArticles.map((article) => (
            <article
              key={article.slug}
              className="premium-card group p-7 flex flex-col"
              itemScope
              itemType="https://schema.org/Article"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <time itemProp="timeRequired">{article.readingTime}</time>
                </span>
              </div>

              <h2
                className="text-xl font-black text-gray-950 mb-3 font-heading leading-tight group-hover:text-emerald-700 transition-colors"
                itemProp="headline"
              >
                <Link to={`/blog/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1" itemProp="description">
                {article.description}
              </p>

              <Link
                to={`/blog/${article.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                itemProp="url"
              >
                <ArrowLeft className="w-4 h-4" />
                اقرأ المقال كاملاً
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50 border-t border-gray-100 text-center">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl font-black text-gray-950 mb-4 font-heading">جاهز تبدأ متجرك؟</h2>
          <p className="text-gray-500 mb-8">ابدأ مجاناً — ادفع فقط لما تبيع. بدون أي التزام.</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white font-extrabold hover:bg-emerald-700 h-12 px-8 rounded-lg transition-colors"
          >
            أنشئ متجرك الآن ←
          </Link>
        </div>
      </section>
    </div>
  );
}
