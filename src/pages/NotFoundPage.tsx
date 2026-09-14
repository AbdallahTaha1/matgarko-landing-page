import { Link, useLocation } from "react-router-dom";
import { isEnglishPath } from "@/lib/i18n";

export function NotFoundPage() {
  const { pathname } = useLocation();
  const english = isEnglishPath(pathname);
  const home = english ? "/en" : "/";

  return (
    <section className="page-hero" dir={english ? "ltr" : "rtl"}>
      <div className="container-x py-16">
        <p className="section-kicker">404</p>
        <h1 className="mt-5 text-3xl font-black text-gray-950 font-heading">
          {english ? "Page not found" : "الصفحة غير موجودة"}
        </h1>
        <p className="mt-4 text-gray-600">
          {english ? "This page may have moved or the address may be incorrect." : "ربما تغير مكان الصفحة أو يوجد خطأ في الرابط."}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to={home} className="btn btn-primary">{english ? "Back to home" : "العودة للرئيسية"}</Link>
          <Link to={english ? "/en/pricing" : "/pricing"} className="btn btn-secondary">{english ? "View pricing" : "شوف الأسعار"}</Link>
        </div>
      </div>
    </section>
  );
}
