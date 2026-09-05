import { SIGNUP_URL } from "@/data/pricing";
import { alternateLanguagePath, languageFromPath, localizePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Languages, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  { path: "/solutions", ar: "الحلول", en: "Solutions" },
  { path: "/themes", ar: "القوالب", en: "Themes" },
  { path: "/integrations", ar: "الدفع والشحن", en: "Payment and shipping" },
  { path: "/getting-started", ar: "خطوات البدء", en: "Getting started" },
  { path: "/pricing", ar: "الأسعار", en: "Pricing" },
];

const mobileExtraItems = [
  { path: "/blog", ar: "المدونة", en: "Blog" },
  { path: "/contact", ar: "تواصل معنا", en: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const language = languageFromPath(pathname);
  const isEnglish = language === "en";
  const brandName = isEnglish ? "Matgarko" : "متجركو";
  const signupLabel = isEnglish ? "Start free" : "أنشئ متجرك مجاناً";
  const languageLabel = isEnglish ? "العربية" : "English";
  const menuLabel = isEnglish ? (isOpen ? "Close menu" : "Open menu") : isOpen ? "إغلاق القائمة" : "فتح القائمة";
  const navLabel = isEnglish ? "Main navigation" : "القائمة الرئيسية";

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const isActive = (path: string) => {
    const localized = localizePath(path, language);
    return pathname === localized || pathname.startsWith(`${localized}/`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/70 bg-white/85 backdrop-blur-xl" dir={isEnglish ? "ltr" : "rtl"}>
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <Link to={localizePath("/", language)} className="flex shrink-0 items-center gap-2" aria-label={brandName}>
          <img src={logo} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
          <span className="text-xl font-extrabold text-gray-950 font-heading">{brandName}</span>
        </Link>

        <nav aria-label={navLabel} className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={localizePath(item.path, language)}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-bold transition-colors hover:bg-gray-100 hover:text-gray-950",
                isActive(item.path) ? "text-emerald-700" : "text-gray-700",
              )}
            >
              {item[language]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to={alternateLanguagePath(pathname)}
            hrefLang={isEnglish ? "ar" : "en"}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-950"
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
            {languageLabel}
          </Link>
          <a href={SIGNUP_URL} className="btn btn-primary h-10 px-4 text-sm">
            {signupLabel}
          </a>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <Link
            to={alternateLanguagePath(pathname)}
            hrefLang={isEnglish ? "ar" : "en"}
            aria-label={languageLabel}
            onClick={() => setIsOpen(false)}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg px-2.5 text-xs font-bold text-gray-700 hover:bg-gray-100"
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
            {languageLabel}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-800 hover:bg-gray-100"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={menuLabel}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <nav
          id="mobile-menu"
          aria-label={navLabel}
          className="animate-menu-in border-t border-gray-100 bg-white shadow-xl shadow-gray-950/5 lg:hidden"
        >
          <div className="container-x py-3">
            <ul className="divide-y divide-gray-100">
              {[...navItems, ...mobileExtraItems].map((item) => (
                <li key={item.path}>
                  <Link
                    to={localizePath(item.path, language)}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive(item.path) ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center py-3 text-base font-bold",
                      isActive(item.path) ? "text-emerald-700" : "text-gray-800",
                    )}
                  >
                    {item[language]}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={SIGNUP_URL} onClick={() => setIsOpen(false)} className="btn btn-primary mt-3 w-full">
              {signupLabel}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
