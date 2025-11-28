import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: "home", label: "Intro" },
  { id: "gallery", label: "Memories" },
  { id: "media", label: "Media" },
  { id: "portal", label: "Time Travel" },
  { id: "location", label: "Find Us" },
  { id: "contact", label: "Contact" }
];

export function ScrollNavigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < 100 || currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : -20 
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-6 md:left-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-0"
      data-testid="scroll-navigation"
    >
      <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      
      <div className="relative flex flex-col items-center gap-6 py-4">
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          const isHovered = hoveredSection === id;
          
          return (
            <div 
              key={id} 
              className="relative flex items-center"
              onMouseEnter={() => setHoveredSection(id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-full mr-4 px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg"
                    style={{
                      background: 'rgba(15, 15, 25, 0.8)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <span className="text-xs font-medium text-white/90 tracking-wide">
                      {label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={() => scrollToSection(id)}
                animate={{ 
                  scale: isActive ? 1.5 : isHovered ? 1.2 : 1,
                  backgroundColor: isActive ? "#6366f1" : "transparent",
                  borderColor: isActive ? "#6366f1" : isHovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="w-3 h-3 rounded-full border-2 cursor-pointer relative z-10 backdrop-blur-sm"
                style={{
                  boxShadow: isActive ? '0 0 15px rgba(99, 102, 241, 0.6), 0 0 30px rgba(99, 102, 241, 0.3)' : 'none'
                }}
                data-testid={`scroll-nav-${id}`}
                aria-label={`Scroll to ${label}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-glow"
                    className="absolute inset-0 rounded-full bg-indigo-500/30"
                    initial={false}
                    animate={{ scale: [1, 1.8, 1.8], opacity: [0.6, 0, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                )}
              </motion.button>
            </div>
          );
        })}
      </div>
    </motion.nav>
  );
}
