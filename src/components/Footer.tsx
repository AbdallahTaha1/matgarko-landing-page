import { languageFromPath, localizePath } from "@/lib/i18n";
import { Facebook, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const FACEBOOK_URL = "https://www.facebook.com/matgarko2/";
const EMAIL_URL = "mailto:matgarko.help@gmail.com";
const WHATSAPP_URL = "https://wa.me/201080312538";

const footerColumns = [
  {
    arTitle: "عن متجركو",
    enTitle: "Company",
    links: [
      { path: "/about", ar: "من نحن", en: "About" },
      { path: "/solutions", ar: "حلول المتجر", en: "Solutions" },
      { path: "/pricing", ar: "الأسعار", en: "Pricing" },
      { path: "/terms", ar: "الشروط والأحكام", en: "Terms" },
      { path: "/privacy", ar: "سياسة الخصوصية", en: "Privacy" },
    ],
  },
  {
    arTitle: "المصادر والدعم",
    enTitle: "Resources",
    links: [
      { path: "/contact", ar: "تواصل معنا", en: "Contact" },
      { path: "/themes", ar: "قوالب المتجر", en: "Themes" },
      { path: "/integrations", ar: "الدفع والشحن", en: "Payment and shipping" },
      { path: "/getting-started", ar: "خطوات البدء", en: "Getting started" },
      { path: "/blog", ar: "المدونة", en: "Blog" },
    ],
  },
  {
    arTitle: "متاجر حسب النشاط",
    enTitle: "Store types",
    links: [
      { path: "/store/restaurants", ar: "متجر المطاعم", en: "Restaurants" },
      { path: "/store/clothing", ar: "متجر الملابس", en: "Clothing" },
      { path: "/store/electronics", ar: "متجر الإلكترونيات", en: "Electronics" },
      { path: "/store/cosmetics", ar: "متجر التجميل", en: "Cosmetics" },
      { path: "/store/furniture", ar: "متجر الأثاث", en: "Furniture" },
    ],
  },
  {
    arTitle: "مقارنة المنصات",
    enTitle: "Comparisons",
    links: [
      { path: "/compare/easyorders", ar: "متجركو vs إيزي أوردرز", en: "Matgarko vs EasyOrders" },
      { path: "/compare/salla", ar: "متجركو vs سلة", en: "Matgarko vs Salla" },
      { path: "/compare/shopify", ar: "متجركو vs شوبيفاي", en: "Matgarko vs Shopify" },
      { path: "/compare/woocommerce", ar: "متجركو vs ووكومرس", en: "Matgarko vs WooCommerce" },
      { path: "/compare", ar: "كل المقارنات", en: "All comparisons" },
    ],
  },
];

export function Footer() {
  const { pathname } = useLocation();
  const language = languageFromPath(pathname);
  const isEnglish = language === "en";
  const brandName = isEnglish ? "Matgarko" : "متجركو";
  const brandDescription = isEnglish
    ? "A practical ecommerce platform for merchants who want to create an online store for Egypt and Arabic-speaking markets without custom development."
    : "شريكك الرقمي الموثوق لتأسيس وإدارة متجرك الإلكتروني بنجاح. نبسط لك التجارة لتتفرغ للنمو.";

  return (
    <footer className="border-t border-gray-200 bg-gray-50 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-6">
          <div className="col-span-1">
            <div className="mb-6 flex items-center gap-2">
              <img src={logo} alt={brandName} className="h-12 w-12 object-contain" />
              <span className="text-2xl font-bold text-gray-900 font-heading">{brandName}</span>
            </div>
            <p className="mb-6 leading-relaxed text-gray-500">{brandDescription}</p>
            <div className="flex gap-4">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition-colors hover:border-primary hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={EMAIL_URL} aria-label="Email" className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition-colors hover:border-primary hover:text-primary">
                <Mail className="h-5 w-5" />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition-colors hover:border-primary hover:text-primary">
                <svg aria-hidden="true" viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor">
                  <path d="M16.02 3.2C9 3.2 3.29 8.9 3.29 15.91c0 2.24.59 4.42 1.71 6.34L3.18 28.8l6.71-1.76a12.66 12.66 0 0 0 6.13 1.56h.01c7.01 0 12.72-5.7 12.72-12.71S23.04 3.2 16.02 3.2Zm0 23.25h-.01c-1.95 0-3.86-.52-5.52-1.51l-.4-.24-3.98 1.04 1.06-3.88-.26-.4a10.52 10.52 0 0 1-1.61-5.55c0-5.86 4.77-10.63 10.64-10.63 2.84 0 5.52 1.11 7.53 3.12a10.56 10.56 0 0 1 3.12 7.51c0 5.87-4.77 10.64-10.57 10.64Zm5.82-7.96c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.35-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.46.21 2.01.13.61-.09 1.88-.77 2.14-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37Z" />
                </svg>
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.enTitle}>
              <h3 className="mb-6 font-bold text-gray-900 font-heading">{isEnglish ? column.enTitle : column.arTitle}</h3>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.path}>
                    <Link to={localizePath(link.path, language)} className="text-gray-500 transition-colors hover:text-primary">
                      {link[language]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-6 font-bold text-gray-900 font-heading">{isEnglish ? "Contact" : "تواصل معنا"}</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-500">
                <span className="w-20">{isEnglish ? "Phone:" : "الهاتف:"}</span>
                <span className="text-gray-900" dir="ltr">+20 108 031 2538</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <span className="w-20">{isEnglish ? "Email:" : "الإيميل:"}</span>
                <span className="text-gray-900">matgarko.help@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <span className="w-20">{isEnglish ? "Address:" : "العنوان:"}</span>
                <span className="text-gray-900">{isEnglish ? "New Cairo, Egypt" : "القاهرة الجديدة، مصر"}</span>
              </li>
              <li className="pt-2">
                <Link to={localizePath("/contact", language)} className="font-medium text-emerald-700 transition-colors hover:text-emerald-800">
                  {isEnglish ? "Contact page ->" : "صفحة التواصل ←"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 md:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {brandName}. {isEnglish ? "All rights reserved." : "جميع الحقوق محفوظة."}
          </p>
          <div className="flex items-center gap-6">
            {["Mastercard", "Visa", "Fawry", "Meeza"].map((method) => (
              <span
                key={method}
                className="rounded-md border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-500"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
