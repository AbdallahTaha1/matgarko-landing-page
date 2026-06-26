import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const SIGNUP_URL = "https://signup.matgarko.com/signup";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 transition-all duration-300 glass border-b border-white/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="متجركو"
              className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-2xl font-bold text-gray-900 font-heading tracking-tighter">متجركو</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors font-medium">الرئيسية</Link>
            <Link to="/solutions" className="text-gray-600 hover:text-primary transition-colors font-medium">الحلول</Link>
            <Link to="/themes" className="text-gray-600 hover:text-primary transition-colors font-medium">القوالب</Link>
            <Link to="/integrations" className="text-gray-600 hover:text-primary transition-colors font-medium">الدفع والشحن</Link>
            <Link to="/getting-started" className="text-gray-600 hover:text-primary transition-colors font-medium">خطوات البدء</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-primary transition-colors font-medium">الأسعار</Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors font-medium">تواصل معنا</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-105">
              <a href={SIGNUP_URL}>أنشئ متجرك مجاناً</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-4">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-primary font-medium px-4">الرئيسية</Link>
              <Link to="/solutions" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-primary font-medium px-4">الحلول</Link>
              <Link to="/themes" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-primary font-medium px-4">القوالب</Link>
              <Link to="/integrations" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-primary font-medium px-4">الدفع والشحن</Link>
              <Link to="/getting-started" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-primary font-medium px-4">خطوات البدء</Link>
              <Link to="/pricing" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-primary font-medium px-4">الأسعار</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-primary font-medium px-4">تواصل معنا</Link>
              <div className="flex flex-col gap-3 px-4 pt-4 border-t border-gray-50">
                <Button asChild className="w-full justify-center bg-primary text-white">
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

