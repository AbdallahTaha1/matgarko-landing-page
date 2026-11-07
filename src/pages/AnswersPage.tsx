import { answers } from "@/data/answers";
import { countries } from "@/data/countries";
import { Link } from "react-router-dom";

/** Direct answers about Matgarko, one question per heading, readable without the rest of the page. */
export function AnswersPage() {
  return (
    <div dir="rtl">
      <section className="page-hero text-center">
        <div className="container-x">
          <span className="section-kicker">إجابات سريعة</span>
          <h1 className="page-title mt-4">متجركو في أسئلة وإجابات</h1>
          <p className="page-lead mt-4">إجابات مباشرة عن الأسعار والدول والدفع عند الاستلام والطلبات الوهمية. آخر تحديث: 7 نوفمبر 2026.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-x max-w-3xl space-y-4">
          {answers.map((item) => (
            <article key={item.question} className="card p-5 sm:p-6">
              <h2 className="text-lg font-extrabold leading-8 text-gray-950 font-heading">{item.question}</h2>
              <p className="mt-2 text-base leading-8 text-gray-700">{item.answer}</p>
            </article>
          ))}
          <nav className="card p-5 sm:p-6" aria-label="متجركو حسب الدولة">
            <h2 className="text-lg font-extrabold text-gray-950 font-heading">متجركو في بلدك</h2>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <li><Link to="/pricing" className="font-bold text-emerald-800 underline underline-offset-4">الأسعار في مصر</Link></li>
              {countries.map((country) => (
                <li key={country.slug}>
                  <Link to={`/${country.slug}/pricing`} className="font-bold text-emerald-800 underline underline-offset-4">الأسعار {country.inName}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
}
