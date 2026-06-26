import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { SolutionsPage } from "./pages/SolutionsPage";
import { DevelopersPage } from "./pages/DevelopersPage";
import { PricingPage } from "./pages/PricingPage";
import { ContactPage } from "./pages/ContactPage";
import { AboutPage } from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import { TermsPage } from "./pages/TermsPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { IntegrationsPage } from "./pages/IntegrationsPage";
import { Analytics } from "./components/Analytics";
import { SEO } from "./components/SEO";
import { ThemesPage } from "./pages/ThemesPage";
// Industry pages
import { RestaurantsPage } from "./pages/industries/RestaurantsPage";
import { ClothingPage } from "./pages/industries/ClothingPage";
import { ElectronicsPage } from "./pages/industries/ElectronicsPage";
import { CosmeticsPage } from "./pages/industries/CosmeticsPage";
import { FurniturePage } from "./pages/industries/FurniturePage";
// Blog
import { BlogIndexPage } from "./pages/blog/BlogIndexPage";
import { BlogArticlePage } from "./pages/blog/BlogArticlePage";
// Compare (competitor) pages
import { CompareIndexPage } from "./pages/compare/CompareIndexPage";
import { VsEasyOrdersPage } from "./pages/compare/VsEasyOrdersPage";
import { VsShopifyPage } from "./pages/compare/VsShopifyPage";
import { VsSallaPage } from "./pages/compare/VsSallaPage";
import { VsWooCommercePage } from "./pages/compare/VsWooCommercePage";

export function AppRoutes() {
  return (
    <>
      <SEO />
      <Analytics />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="integrations" element={<IntegrationsPage />} />
          <Route path="themes" element={<ThemesPage />} />
          <Route path="getting-started" element={<DevelopersPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          {/* Industry landing pages */}
          <Route path="store/restaurants" element={<RestaurantsPage />} />
          <Route path="store/clothing" element={<ClothingPage />} />
          <Route path="store/electronics" element={<ElectronicsPage />} />
          <Route path="store/cosmetics" element={<CosmeticsPage />} />
          <Route path="store/furniture" element={<FurniturePage />} />
          {/* Blog */}
          <Route path="blog" element={<BlogIndexPage />} />
          <Route path="blog/:slug" element={<BlogArticlePage />} />
          {/* Compare / competitor pages */}
          <Route path="compare" element={<CompareIndexPage />} />
          <Route path="compare/easyorders" element={<VsEasyOrdersPage />} />
          <Route path="compare/shopify" element={<VsShopifyPage />} />
          <Route path="compare/salla" element={<VsSallaPage />} />
          <Route path="compare/woocommerce" element={<VsWooCommercePage />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
