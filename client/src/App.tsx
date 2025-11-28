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
import { ContactSection } from "@/components/ContactSection";
import { LocationSection } from "@/components/LocationSection";
import { FloatingScrollIcon } from "@/components/FloatingScrollIcon";
import { Footer } from "@/components/Footer";
import { Menu } from "@/pages/Menu";
import { Memories } from "@/pages/Memories";
import { LiquidTransition } from "@/components/LiquidTransition";
import CoffeeCursor from "@/components/CoffeeCursor";

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
      }, 800);
      window.history.replaceState({}, document.title);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.state]);

  return null;
}

function HomePage() {
  return (
    <LiquidTransition>
      <div className="relative min-h-screen">
        <Navigation />
        <main>
          <HeroSection />
          <MenuSection />
          <LocationSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingScrollIcon />
      </div>
    </LiquidTransition>
  );
}

function MenuPageWrapper() {
  return (
    <LiquidTransition>
      <Menu />
    </LiquidTransition>
  );
}

function GalleryPageWrapper() {
  return (
    <LiquidTransition>
      <Memories />
    </LiquidTransition>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPageWrapper />} />
        <Route path="/gallery" element={<GalleryPageWrapper />} />
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
            <CoffeeCursor />
          </BrowserRouter>
        </ReactLenis>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
