import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ReactLenis } from '@studio-freight/react-lenis';
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { MenuSection } from "@/components/MenuSection";
import { GallerySection } from "@/components/GallerySection";
import { ContactSection } from "@/components/ContactSection";
import { FloatingScrollIcon } from "@/components/FloatingScrollIcon";
import { Footer } from "@/components/Footer";
import { MenuPage } from "@/pages/MenuPage";
import { PageTransition } from "@/components/PageTransition";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    
    if (state?.scrollTo) {
      setTimeout(() => {
        const element = document.querySelector(state.scrollTo!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 600);
      window.history.replaceState({}, document.title);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.state]);

  return null;
}

function HomePage() {
  return (
    <PageTransition>
      <div className="relative min-h-screen">
        <Navigation />
        <main>
          <HeroSection />
          <MenuSection />
          <GallerySection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingScrollIcon />
      </div>
    </PageTransition>
  );
}

function MenuPageWrapper() {
  return (
    <PageTransition>
      <MenuPage />
    </PageTransition>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPageWrapper />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
          <BrowserRouter>
            <ScrollToTop />
            <AnimatedRoutes />
          </BrowserRouter>
        </ReactLenis>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
