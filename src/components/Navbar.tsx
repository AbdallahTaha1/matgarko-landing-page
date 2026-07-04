import { Button } from "@/components/ui/button";
import { alternateLanguagePath, languageFromPath, localizePath } from "@/lib/i18n";
import { Languages, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const SIGNUP_URL = "https://signup.matgarko.com/signup";

const navItems = [
  { path: "/", ar: "الرئيسية", en: "Home" },
  { path: "/solutions", ar: "الحلول", en: "Solutions" },
  { path: "/themes", ar: "القوالب", en: "Themes" },
  { path: "/integrations", ar: "الدفع والشحن", en: "Payment and shipping" },
  { path: "/getting-started", ar: "خطوات البدء", en: "Getting started" },
  { path: "/pricing", ar: "الأسعار", en: "Pricing" },
];

const mobileExtraItems = [
  { path: "/contact", ar: "تواصل معنا", en: "Contact" },
  { path: "/blog", ar: "المدونة", en: "Blog" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const language = languageFromPath(pathname);
  const isEnglish = language === "en";
  const brandName = isEnglish ? "Matgarko" : "متجركو";
  const signupLabel = isEnglish ? "Start your store free" : "أنشئ متجرك مجاناً";
  const mobileSignupLabel = isEnglish ? "Start free" : "ابدأ رحلتك مجاناً";
  const languageLabel = isEnglish ? "العربية" : "English";
  const menuLabel = isEnglish ? "Toggle menu" : "فتح القائمة";

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-emerald-100 bg-white/90 shadow-sm backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          <Link to={localizePath("/", language)} className="group flex items-center gap-2">
            <img
              src={logo}
              alt={brandName}
              className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-2xl font-black text-gray-950 font-heading">{brandName}</span>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-2 py-2 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={localizePath(item.path, language)}
                className="rounded-full px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-white hover:text-primary hover:shadow-sm"
              >
                {item[language]}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 xl:flex">
            <Link
              to={alternateLanguagePath(pathname)}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm font-extrabold text-gray-700 transition-colors hover:border-emerald-200 hover:text-emerald-700"
            >
              <Languages className="h-4 w-4" />
              {languageLabel}
            </Link>
            <Button asChild className="bg-gray-950 font-extrabold text-white shadow-lg shadow-gray-950/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-700">
              <a href={SIGNUP_URL}>{signupLabel}</a>
            </Button>
          </div>

          <button
            className="p-2 text-gray-700 hover:text-primary xl:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={menuLabel}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {isOpen ? (
          <div className="animate-in slide-in-from-top-2 border-t border-gray-100 py-4 xl:hidden">
            <div className="flex flex-col gap-4">
              {[...navItems, ...mobileExtraItems].map((item) => (
                <Link
                  key={item.path}
                  to={localizePath(item.path, language)}
                  onClick={() => setIsOpen(false)}
                  className="px-4 font-bold text-gray-700 hover:text-primary"
                >
                  {item[language]}
                </Link>
              ))}
              <div className="flex flex-col gap-3 border-t border-gray-50 px-4 pt-4">
                <Link
                  to={alternateLanguagePath(pathname)}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 font-extrabold text-gray-700 hover:text-primary"
                >
                  <Languages className="h-4 w-4" />
                  {languageLabel}
                </Link>
                <Button asChild className="w-full justify-center bg-gray-950 text-white hover:bg-emerald-700">
                  <a href={SIGNUP_URL} onClick={() => setIsOpen(false)}>
                    {mobileSignupLabel}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
