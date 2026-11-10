import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InquiryModal, InquiryPreset } from './components/InquiryModal';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryPreset, setInquiryPreset] = useState<InquiryPreset | undefined>(undefined);

  const handleOpenInquiry = (preset?: InquiryPreset) => {
    setInquiryPreset(preset);
    setInquiryOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
        <Navbar onOpenInquiry={handleOpenInquiry} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenInquiry={handleOpenInquiry} />} />
            <Route path="/products" element={<ProductsPage onOpenInquiry={handleOpenInquiry} />} />
            <Route path="/about" element={<AboutPage onOpenInquiry={handleOpenInquiry} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage onOpenInquiry={handleOpenInquiry} />} />
          </Routes>
        </main>
        <Footer onOpenInquiry={handleOpenInquiry} />
        <InquiryModal
          isOpen={inquiryOpen}
          onClose={() => setInquiryOpen(false)}
          preset={inquiryPreset}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
