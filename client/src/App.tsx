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
import { FloatingParticles } from "@/components/FloatingParticles";
import { GallerySection } from "@/components/GallerySection";
import { ScrollNavigation } from "@/components/ScrollNavigation";

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
          <section id="home">
            <HeroSection />
          </section>
          <MenuSection />
          <section id="gallery">
            <GallerySection />
          </section>
          <section id="media">
            <MediaGallery />
          </section>
          <section id="portal">
            <DrinkPortal />
          </section>
          <section id="location">
            <LocationSection />
          </section>
          <section id="contact">
            <ContactSection />
          </section>
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
    lerp: 0.12,
    duration: 1.0,
    smoothWheel: true,
    wheelMultiplier: 1.2,
    touchMultiplier: 1.5,
    infinite: false,
    orientation: 'vertical' as const,
    gestureOrientation: 'vertical' as const,
    smoothTouch: false,
    syncTouch: false,
    syncTouchLerp: 0.1,
    easing: (t: number) => 1 - Math.pow(1 - t, 4),
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
        <FloatingParticles />
        <CoffeeCursor />
        <ScrollNavigation />
        <AppContent />
        <BackgroundAudio />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
