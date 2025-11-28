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
import { MediaGallery } from "@/components/MediaGallery";
import { FloatingScrollIcon } from "@/components/FloatingScrollIcon";
import { Footer } from "@/components/Footer";
import { Menu } from "@/pages/Menu";
import { Memories } from "@/pages/Memories";
import { LiquidTransition } from "@/components/LiquidTransition";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import BackgroundAudio from "@/components/BackgroundAudio";
import { DrinkPortal } from "@/components/DrinkPortal";
import { CoffeeCursor } from "@/components/CoffeeCursor";
import { Maggie } from "@/components/Maggie";

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
          <MediaGallery />
          <DrinkPortal />
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

function AppContent() {
  const { enableLenis, isMobile, tier } = usePerformanceMode();

  useEffect(() => {
    document.documentElement.setAttribute('data-performance-tier', tier);
    document.documentElement.setAttribute('data-is-mobile', String(isMobile));
  }, [tier, isMobile]);

  const lenisOptions = {
    lerp: 0.045,
    duration: 1.8,
    smoothWheel: true,
    wheelMultiplier: 0.5,
    touchMultiplier: 1.0,
    infinite: false,
    orientation: 'vertical' as const,
    gestureOrientation: 'vertical' as const,
    smoothTouch: false,
    syncTouch: false,
    syncTouchLerp: 0.045,
  };

  if (!enableLenis || isMobile) {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    );
  }

  return (
    <ReactLenis root options={lenisOptions}>
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </ReactLenis>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CoffeeCursor />
        <AppContent />
        <Maggie />
        <BackgroundAudio />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
