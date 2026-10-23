import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, GraduationCap, MessageCircle, Search } from "lucide-react";
import { learnGuides, type LearnGuide } from "@/data/learn";
import { WHATSAPP_URL } from "@/lib/seo";
import { LearnIcon } from "./LearnIcon";

// Arabic search that ignores diacritics and the common alef, yaa and taa marbuta spellings.
const normalize = (value: string) =>
  value
    .replace(/[ً-ْـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .toLowerCase();

const matches = (guide: LearnGuide, needle: string) =>
  normalize([guide.title, guide.summary, guide.category, ...guide.keywords].join(" ")).includes(needle);

export function LearnIndexPage() {
  const [query, setQuery] = useState("");
  const needle = normalize(query.trim());
  const [startHere, ...others] = learnGuides;
  const visible = needle ? learnGuides.filter((guide) => matches(guide, needle)) : others;

  return (
    <div className="bg-white text-right" dir="rtl">
      <section className="page-hero">
        <div className="container-x text-center">
          <div className="section-kicker mb-5">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            مركز التعلّم
          </div>
          <h1 className="page-title mb-5">تعلّم تدير متجرك خطوة بخطوة</h1>
          <p className="page-lead">
            شروحات قصيرة بالصور من لوحة التحكم نفسها: من أول منتج لحد أول طلب، ومن ضبط الشحن لحد الإعلانات.
          </p>
          <form role="search" className="mx-auto mt-8 max-w-xl" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="learn-search" className="sr-only">
              ابحث في الشروحات
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                id="learn-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ابحث: شحن، كوبون، منتج..."
                className="h-14 w-full rounded-2xl border border-gray-200 bg-white pe-4 ps-12 text-base shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>
          </form>
        </div>
      </section>

      <section className="container-x py-12 sm:py-16">
        {!needle && (
          <Link
            to={`/learn/${startHere.slug}`}
            className="premium-card group mb-8 flex flex-col gap-5 bg-gradient-to-l from-emerald-50 to-white p-6 sm:flex-row sm:items-center sm:p-8"
          >
            <span className="icon-tile h-14 w-14 shrink-0 bg-emerald-600 text-white">
              <LearnIcon name={startHere.icon} className="h-7 w-7" />
            </span>
            <span className="flex-1">
              <span className="mb-1 block text-xs font-bold text-emerald-700">أول ما تبدأ</span>
              <span className="block text-xl font-black leading-tight text-gray-950 font-heading group-hover:text-emerald-700 sm:text-2xl">
                {startHere.title}
              </span>
              <span className="mt-2 block text-sm leading-6 text-gray-600">{startHere.summary}</span>
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
              ابدأ الشرح
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        )}

        {visible.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((guide) => (
              <Link key={guide.slug} to={`/learn/${guide.slug}`} className="premium-card group flex flex-col p-6">
                <span className="icon-tile mb-4 h-12 w-12">
                  <LearnIcon name={guide.icon} className="h-6 w-6" />
                </span>
                <span className="mb-2 flex items-center gap-3 text-xs">
                  <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 font-bold text-emerald-700">{guide.category}</span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {guide.readingTime}
                  </span>
                </span>
                <h2 className="mb-2 text-lg font-black leading-snug text-gray-950 font-heading group-hover:text-emerald-700">{guide.title}</h2>
                <p className="flex-1 text-sm leading-6 text-gray-600">{guide.summary}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-gray-600" role="status">
            مفيش شرح بالاسم ده لسه. اسألنا على واتساب وهنضيفه.
          </p>
        )}
      </section>

      <section className="border-t border-gray-100 bg-gray-50 py-14 text-center">
        <div className="container-x">
          <h2 className="mb-3 text-2xl font-black text-gray-950 font-heading">مش لاقي اللي بتدور عليه؟</h2>
          <p className="mb-6 text-gray-600">فريق متجركو جاهز يساعدك على واتساب.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            كلّمنا على واتساب
          </a>
        </div>
      </section>
    </div>
  );
}
