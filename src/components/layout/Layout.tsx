import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { WhatsAppButton } from '../WhatsAppButton';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { isEnglishPath } from '@/lib/i18n';

const Layout = () => {
  const location = useLocation();
  const isEnglish = isEnglishPath(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-gray-950 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        {isEnglish ? 'Skip to content' : 'تخطي إلى المحتوى'}
      </a>
      <Navbar />
      <main id="main-content" className="pt-16">
        <Outlet />
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Layout;
