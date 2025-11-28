import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: "home", label: "Intro" },
  { id: "gallery", label: "Memories" },
  { id: "media", label: "Media" },
  { id: "portal", label: "Time Travel" },
  { id: "location", label: "Find Us" },
  { id: "contact", label: "Contact" }
];

const ultraSmoothSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8
};

const fastSmoothSpring = {
  type: "spring" as const,
  stiffness: 500,
  damping: 35,
  mass: 0.5
};

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
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsVisible(currentScrollY < 100 || currentScrollY < lastScrollY);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = useCallback((targetId: string) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = Math.min(800, Math.max(400, Math.abs(distance) * 0.3));
    let startTime: number | null = null;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeOutExpo(progress);
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : 20 
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-0"
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
                    initial={{ opacity: 0, x: 10, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.9 }}
                    transition={fastSmoothSpring}
                    className="absolute left-full ml-4 px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg"
                    style={{
                      background: 'rgba(15, 15, 25, 0.85)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    }}
                  >
                    <span className="text-xs font-medium text-white/90 tracking-wide">
                      {label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={() => smoothScrollTo(id)}
                animate={{ 
                  scale: isActive ? 1.6 : isHovered ? 1.3 : 1,
                  backgroundColor: isActive ? "rgba(99, 102, 241, 1)" : "rgba(0, 0, 0, 0)",
                  borderColor: isActive ? "rgba(99, 102, 241, 1)" : isHovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)",
                  boxShadow: isActive 
                    ? '0 0 20px rgba(99, 102, 241, 0.7), 0 0 40px rgba(99, 102, 241, 0.4), 0 0 60px rgba(99, 102, 241, 0.2)' 
                    : '0 0 0px rgba(99, 102, 241, 0)'
                }}
                whileHover={{ scale: isActive ? 1.7 : 1.3 }}
                whileTap={{ scale: 0.85 }}
                transition={ultraSmoothSpring}
                className="w-3 h-3 rounded-full border-2 cursor-pointer relative z-10"
                data-testid={`scroll-nav-${id}`}
                aria-label={`Scroll to ${label}`}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-indigo-500/40"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: [1, 2.2, 2.2], opacity: [0.6, 0, 0] }}
                    transition={{ 
                      duration: 1.8, 
                      repeat: Infinity,
                      ease: [0.16, 1, 0.3, 1]
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
