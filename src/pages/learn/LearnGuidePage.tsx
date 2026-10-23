import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, MapPin, MessageCircle } from "lucide-react";
import { getLearnGuide, learnGuides, type LearnSection } from "@/data/learn";
import { WHATSAPP_URL } from "@/lib/seo";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { LearnIcon } from "./LearnIcon";

function renderSection(section: LearnSection, index: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2 key={index} id={`s${index}`} className="mb-4 mt-10 scroll-mt-24 text-2xl font-black text-gray-950 font-heading">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={index} className="mb-3 mt-8 text-xl font-bold text-gray-900 font-heading">
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p key={index} className="mb-4 leading-8 text-gray-700">
          {section.text}
        </p>
      );
    case "ul":
      return (
        <ul key={index} className="mb-6 list-none space-y-2.5">
          {section.items.map((item) => (
            <li key={item} className="flex items-start gap-3 leading-7 text-gray-700">
              <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="mb-6 list-none space-y-3">
          {section.items.map((item, position) => (
            <li key={item} className="flex items-start gap-3 leading-7 text-gray-700">
              <span className="num mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                {position + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div key={index} className="my-6 rounded-xl border border-emerald-100 bg-emerald-50 p-5">
          <p className="text-sm font-medium leading-7 text-emerald-900">{section.text}</p>
        </div>
      );
    case "image":
      return (
        // Wider than the text column on desktop, and a tap opens the full-size screenshot on a phone.
        <figure key={index} className="my-8 lg:-mx-24">
          <button
            type="button"
            onClick={() => window.open(section.src, "_blank", "noopener,noreferrer")}
            aria-label="فتح الصورة بالحجم الكامل"
            className="block w-full cursor-zoom-in"
          >
            <img
              src={section.src}
              alt={section.alt}
              width={section.width}
              height={section.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full rounded-xl border border-gray-200 shadow-sm"
            />
          </button>
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            {section.caption}
            <span className="block text-xs text-gray-400">اضغط على الصورة لتكبيرها</span>
          </figcaption>
        </figure>
      );
    default:
      return null;
  }
}

export function LearnGuidePage() {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? getLearnGuide(slug) : undefined;
  if (!guide) return <NotFoundPage />;

  const position = learnGuides.indexOf(guide);
  const previous = learnGuides[position - 1];
  const next = learnGuides[position + 1];
  const headings = guide.content.flatMap((section, index) =>
    section.type === "h2" ? [{ id: `s${index}`, text: section.text }] : [],
  );

  return (
    <div className="bg-white text-right" dir="rtl">
      <nav className="container-x pt-6 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="hover:text-emerald-600">
              متجركو
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/learn" className="hover:text-emerald-600">
              مركز التعلّم
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-900">{guide.category}</li>
        </ol>
      </nav>

      <article className="container-x max-w-3xl py-10">
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="icon-tile h-10 w-10">
              <LearnIcon name={guide.icon} className="h-5 w-5" />
            </span>
            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{guide.category}</span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {guide.readingTime} قراءة
            </span>
          </div>
          <h1 className="mb-4 text-3xl font-black leading-tight text-gray-950 font-heading md:text-4xl">{guide.title}</h1>
          <p className="text-lg leading-8 text-gray-600">{guide.description}</p>
          <p className="mt-5 inline-flex items-start gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-800">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
            <span>
              هتلاقيها في: <span className="text-emerald-800">{guide.where}</span>
            </span>
          </p>
        </header>

        {headings.length > 2 && (
          <nav aria-label="محتويات الشرح" className="mb-8 rounded-xl border border-gray-200 p-5">
            <p className="mb-3 text-sm font-black text-gray-950">في الشرح ده</p>
            <ul className="space-y-2 text-sm">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`} className="text-emerald-700 hover:text-emerald-800">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div>{guide.content.map(renderSection)}</div>

        <div className="mt-12 rounded-2xl bg-gray-950 p-8 text-center text-white">
          <h2 className="mb-2 text-xl font-black font-heading">لسه عندك سؤال؟</h2>
          <p className="mb-6 text-sm text-gray-300">اكتبلنا على واتساب وهنساعدك في ضبط متجرك.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            كلّمنا على واتساب
          </a>
        </div>

        <nav aria-label="الشروحات التالية" className="mt-10 grid gap-4 sm:grid-cols-2">
          {next && (
            <Link to={`/learn/${next.slug}`} className="premium-card p-5">
              <span className="mb-1 flex items-center gap-1 text-xs font-bold text-emerald-700">
                الشرح اللي بعده
                <ArrowLeft className="h-3 w-3" aria-hidden="true" />
              </span>
              <span className="font-black leading-snug text-gray-950">{next.title}</span>
            </Link>
          )}
          {previous && (
            <Link to={`/learn/${previous.slug}`} className="premium-card p-5">
              <span className="mb-1 flex items-center gap-1 text-xs font-bold text-gray-500">
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
                الشرح اللي قبله
              </span>
              <span className="font-black leading-snug text-gray-950">{previous.title}</span>
            </Link>
          )}
        </nav>

        <p className="mt-8 text-center text-sm">
          <Link to="/learn" className="font-bold text-emerald-700 hover:text-emerald-800">
            كل الشروحات في مركز التعلّم
          </Link>
        </p>
      </article>
    </div>
  );
}
