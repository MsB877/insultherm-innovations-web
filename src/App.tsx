import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { OrderCartProvider } from './context/OrderCartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OrderCartDrawer } from './components/OrderCartDrawer';
import { ImageLightbox, LightboxImagePayload } from './components/ImageLightbox';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname, hash]);
  return null;
};

export const App: React.FC = () => {
  const [lightboxImage, setLightboxImage] = useState<LightboxImagePayload | null>(null);

  return (
    <BrowserRouter>
      <OrderCartProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#14171A]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage onOpenLightbox={setLightboxImage} />} />
              <Route path="/products" element={<ProductsPage onOpenLightbox={setLightboxImage} />} />
              <Route path="/about" element={<AboutPage onOpenLightbox={setLightboxImage} />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<HomePage onOpenLightbox={setLightboxImage} />} />
            </Routes>
          </main>
          <Footer />
          <OrderCartDrawer />
          <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
        </div>
      </OrderCartProvider>
    </BrowserRouter>
  );
};

export default App;
