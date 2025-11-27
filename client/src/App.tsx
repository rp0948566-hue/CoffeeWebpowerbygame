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

function LoveOverCoffee() {
  return (
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
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <LoveOverCoffee />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
