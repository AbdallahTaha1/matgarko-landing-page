import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const SIGNUP_URL = "https://signup.matgarko.com/signup";

export function CTA() {
  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden" dir="rtl">
      <div className="container px-4 mx-auto md:px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 font-heading tracking-tight leading-tight">
          جاهز تبدأ بيع أونلاين؟
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          أنشئ متجرك، أضف منتجاتك، وابدأ استقبال الطلبات من لوحة سهلة.
          جرب متجركو الآن واستفد من الشهر المجاني لفترة محدودة.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white h-16 px-10 text-xl rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1"
          >
            <a href={SIGNUP_URL}>أنشئ متجرك الآن</a>
          </Button>
          <Button
            asChild
            size="lg"
            className="h-16 px-10 text-xl rounded-full border border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white gap-2 group"
          >
            <Link to="/getting-started">
              اعرف الخطوات{" "}
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
