import { isEnglishPath } from "@/lib/i18n";
import { useLocation } from "react-router-dom";

const WHATSAPP_NUMBER = "201080312538";

export function WhatsAppButton() {
  const { pathname } = useLocation();
  const isEnglish = isEnglishPath(pathname);

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={isEnglish ? "Contact us on WhatsApp" : "تواصل معنا عبر واتساب"}
      className={`fixed bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-green-500/30 transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] focus:outline-none focus:ring-4 focus:ring-green-300 ${isEnglish ? "right-6" : "left-6"}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8"
        fill="currentColor"
      >
        <path d="M16.02 3.2C9 3.2 3.29 8.9 3.29 15.91c0 2.24.59 4.42 1.71 6.34L3.18 28.8l6.71-1.76a12.66 12.66 0 0 0 6.13 1.56h.01c7.01 0 12.72-5.7 12.72-12.71S23.04 3.2 16.02 3.2Zm0 23.25h-.01c-1.95 0-3.86-.52-5.52-1.51l-.4-.24-3.98 1.04 1.06-3.88-.26-.4a10.52 10.52 0 0 1-1.61-5.55c0-5.86 4.77-10.63 10.64-10.63 2.84 0 5.52 1.11 7.53 3.12a10.56 10.56 0 0 1 3.12 7.51c0 5.87-4.77 10.64-10.57 10.64Zm5.82-7.96c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.35-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.46.21 2.01.13.61-.09 1.88-.77 2.14-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}
