import { languageFromPath, localizePath } from "@/lib/i18n";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const FACEBOOK_URL = "https://www.facebook.com/matgarko2/";
const EMAIL = "matgarko.help@gmail.com";
const WHATSAPP_URL = "https://wa.me/201080312538";

const footerColumns = [
  {
    arTitle: "المنصة",
    enTitle: "Platform",
    links: [
      { path: "/solutions", ar: "الحلول", en: "Solutions" },
      { path: "/themes", ar: "القوالب", en: "Themes" },
      { path: "/integrations", ar: "الدفع والشحن", en: "Payment and shipping" },
      { path: "/getting-started", ar: "خطوات البدء", en: "Getting started" },
      { path: "/pricing", ar: "الأسعار", en: "Pricing" },
    ],
  },
  {
    arTitle: "متاجر حسب النشاط",
    enTitle: "Store types",
    links: [
      { path: "/store/restaurants", ar: "المطاعم", en: "Restaurants" },
      { path: "/store/clothing", ar: "الملابس", en: "Clothing" },
      { path: "/store/electronics", ar: "الإلكترونيات", en: "Electronics" },
      { path: "/store/cosmetics", ar: "التجميل", en: "Cosmetics" },
      { path: "/store/furniture", ar: "الأثاث", en: "Furniture" },
    ],
  },
  {
    arTitle: "مقارنات",
    enTitle: "Comparisons",
    links: [
      { path: "/compare/easyorders", ar: "متجركو vs إيزي أوردرز", en: "vs EasyOrders" },
      { path: "/compare/salla", ar: "متجركو vs سلة", en: "vs Salla" },
      { path: "/compare/shopify", ar: "متجركو vs شوبيفاي", en: "vs Shopify" },
      { path: "/compare/woocommerce", ar: "متجركو vs ووكومرس", en: "vs WooCommerce" },
      { path: "/compare", ar: "كل المقارنات", en: "All comparisons" },
    ],
  },
  {
    arTitle: "الشركة",
    enTitle: "Company",
    links: [
      { path: "/about", ar: "من نحن", en: "About" },
      { path: "/blog", ar: "المدونة", en: "Blog" },
      { path: "/contact", ar: "تواصل معنا", en: "Contact" },
      { path: "/terms", ar: "الشروط والأحكام", en: "Terms" },
      { path: "/privacy", ar: "سياسة الخصوصية", en: "Privacy" },
    ],
  },
];

export function Footer() {
  const { pathname } = useLocation();
  const language = languageFromPath(pathname);
  const isEnglish = language === "en";
  const brandName = isEnglish ? "Matgarko" : "متجركو";
  const brandDescription = isEnglish
    ? "An Arabic-first ecommerce platform for merchants in Egypt. Create your store, receive orders, and grow with pricing in EGP."
    : "منصة مصرية لإنشاء المتاجر الإلكترونية. أنشئ متجرك، استقبل الطلبات، وكبّر تجارتك بأسعار بالجنيه.";

  return (
    <footer className="border-t border-gray-200 bg-gray-50" dir={isEnglish ? "ltr" : "rtl"}>
      <div className="container-x pb-8 pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Link to={localizePath("/", language)} className="inline-flex items-center gap-2" aria-label={brandName}>
              <img src={logo} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
              <span className="text-xl font-extrabold text-gray-950 font-heading">{brandName}</span>
            </Link>
            <p className="mt-4 text-sm leading-7 text-gray-600">{brandDescription}</p>

            <ul className="mt-5 space-y-2.5 text-sm text-gray-700">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700" dir="ltr">
                  +20 108 031 2538
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                <a href={`mailto:${EMAIL}`} className="hover:text-emerald-700">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                <span>{isEnglish ? "New Cairo, Egypt" : "القاهرة الجديدة، مصر"}</span>
              </li>
            </ul>

            <div className="mt-5 flex gap-2">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-emerald-300 hover:text-emerald-700"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-emerald-300 hover:text-emerald-700"
              >
                <svg aria-hidden="true" viewBox="0 0 32 32" className="h-4 w-4" fill="currentColor">
                  <path d="M16.02 3.2C9 3.2 3.29 8.9 3.29 15.91c0 2.24.59 4.42 1.71 6.34L3.18 28.8l6.71-1.76a12.66 12.66 0 0 0 6.13 1.56h.01c7.01 0 12.72-5.7 12.72-12.71S23.04 3.2 16.02 3.2Zm0 23.25h-.01c-1.95 0-3.86-.52-5.52-1.51l-.4-.24-3.98 1.04 1.06-3.88-.26-.4a10.52 10.52 0 0 1-1.61-5.55c0-5.86 4.77-10.63 10.64-10.63 2.84 0 5.52 1.11 7.53 3.12a10.56 10.56 0 0 1 3.12 7.51c0 5.87-4.77 10.64-10.57 10.64Zm5.82-7.96c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.35-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.46.21 2.01.13.61-.09 1.88-.77 2.14-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            {footerColumns.map((column) => (
              <div key={column.enTitle}>
                <h3 className="text-sm font-extrabold text-gray-950 font-heading">{isEnglish ? column.enTitle : column.arTitle}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.path}>
                      <Link to={localizePath(link.path, language)} className="text-sm text-gray-600 transition-colors hover:text-emerald-700">
                        {link[language]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
          <p className="text-xs text-gray-500 sm:text-sm">
            © {new Date().getFullYear()} {brandName}. {isEnglish ? "All rights reserved." : "جميع الحقوق محفوظة."}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2" aria-label={isEnglish ? "Payment methods" : "طرق الدفع"}>
            {["Visa", "Mastercard", "Fawry", "Meeza"].map((method) => (
              <li key={method} className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-bold text-gray-600">
                {method}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
