import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const SIGNUP_URL = "https://signup.matgarko.com/signup";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-emerald-100 bg-white/90 shadow-sm backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="متجركو"
              className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-2xl font-black text-gray-950 font-heading">متجركو</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-2 py-2">
            <Link to="/" className="rounded-full px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-white hover:text-primary hover:shadow-sm">الرئيسية</Link>
            <Link to="/solutions" className="rounded-full px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-white hover:text-primary hover:shadow-sm">الحلول</Link>
            <Link to="/themes" className="rounded-full px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-white hover:text-primary hover:shadow-sm">القوالب</Link>
            <Link to="/integrations" className="rounded-full px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-white hover:text-primary hover:shadow-sm">الدفع والشحن</Link>
            <Link to="/getting-started" className="rounded-full px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-white hover:text-primary hover:shadow-sm">خطوات البدء</Link>
            <Link to="/pricing" className="rounded-full px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-white hover:text-primary hover:shadow-sm">الأسعار</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden xl:flex items-center gap-4">
            <Button asChild className="bg-gray-950 font-extrabold text-white shadow-lg shadow-gray-950/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-700">
              <a href={SIGNUP_URL}>أنشئ متجرك مجاناً</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="xl:hidden p-2 text-gray-700 hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="xl:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-4">
              <Link to="/" onClick={() => setIsOpen(false)} className="px-4 font-bold text-gray-700 hover:text-primary">الرئيسية</Link>
              <Link to="/solutions" onClick={() => setIsOpen(false)} className="px-4 font-bold text-gray-700 hover:text-primary">الحلول</Link>
              <Link to="/themes" onClick={() => setIsOpen(false)} className="px-4 font-bold text-gray-700 hover:text-primary">القوالب</Link>
              <Link to="/integrations" onClick={() => setIsOpen(false)} className="px-4 font-bold text-gray-700 hover:text-primary">الدفع والشحن</Link>
              <Link to="/getting-started" onClick={() => setIsOpen(false)} className="px-4 font-bold text-gray-700 hover:text-primary">خطوات البدء</Link>
              <Link to="/pricing" onClick={() => setIsOpen(false)} className="px-4 font-bold text-gray-700 hover:text-primary">الأسعار</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="px-4 font-bold text-gray-700 hover:text-primary">تواصل معنا</Link>
              <div className="flex flex-col gap-3 px-4 pt-4 border-t border-gray-50">
                <Button asChild className="w-full justify-center bg-gray-950 text-white hover:bg-emerald-700">
                  <a href={SIGNUP_URL} onClick={() => setIsOpen(false)}>ابدأ رحلتك مجاناً</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

