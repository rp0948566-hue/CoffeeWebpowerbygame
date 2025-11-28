import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SplineScene, SpotlightSVG, SplineFallback } from './SplineScene';
import { usePerformance } from '@/hooks/use-performance';

function StaticHeroSection() {
  return (
    <section id="home" className="relative pt-24 pb-16 px-6 min-h-screen flex items-center overflow-hidden gpu-accelerated">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="z-20 text-center lg:text-left">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none mb-6 sm:mb-8"
            data-testid="text-hero-title"
            style={{ fontFamily: "'Titan One', cursive" }}
          >
            <div className="mb-1 sm:mb-2">
              <span className="text-outline">LOVE</span>
            </div>
            <div className="mb-1 sm:mb-2">
              OVER
            </div>
            <div className="text-primary">
              COFFEE
            </div>
          </h1>

          <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-6 sm:mb-8">
            {['Premium', 'Artisan', 'Crafted'].map((word) => (
              <span
                key={word}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 text-xs sm:text-sm font-medium text-muted-foreground"
              >
                {word}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link to="/menu" data-testid="link-explore-menu">
              <Button
                size="lg"
                className="rounded-full px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-accent border border-white/20 shadow-lg shadow-primary/25"
              >
                Explore Menu
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full bg-black/40 rounded-2xl sm:rounded-[2rem] border border-white/10 overflow-hidden">
          <SpotlightSVG />
          <div className="relative z-10 w-full h-full">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedLetter({ letter, index, isOutline }: { letter: string; index: number; isOutline?: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.04,
        duration: 0.3,
        ease: "easeOut",
      }}
      className={`inline-block cursor-pointer gpu-accelerated ${isOutline ? 'text-outline' : ''}`}
      style={{ fontFamily: "'Titan One', cursive" }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.15, ease: "easeOut" },
      }}
    >
      {letter === ' ' ? '\u00A0' : letter}
    </motion.span>
  );
}

function KineticText({ text, isOutline, startIndex = 0 }: { text: string; isOutline?: boolean; startIndex?: number }) {
  return (
    <span className="inline-block">
      {text.split('').map((letter, i) => (
        <AnimatedLetter
          key={i}
          letter={letter}
          index={startIndex + i}
          isOutline={isOutline}
        />
      ))}
    </span>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="gpu-accelerated"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedHeroSection() {
  return (
    <section id="home" className="relative pt-24 pb-16 px-6 min-h-screen flex items-center overflow-hidden gpu-accelerated">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="z-20 text-center lg:text-left">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none mb-6 sm:mb-8"
            data-testid="text-hero-title"
            style={{ fontFamily: "'Titan One', cursive" }}
          >
            <div className="mb-1 sm:mb-2">
              <KineticText text="LOVE" isOutline startIndex={0} />
            </div>
            <div className="mb-1 sm:mb-2">
              <KineticText text="OVER" startIndex={4} />
            </div>
            <div className="text-primary">
              <KineticText text="COFFEE" startIndex={8} />
            </div>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3, ease: "easeOut" }}
            className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-6 sm:mb-8"
          >
            {['Premium', 'Artisan', 'Crafted'].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.08, duration: 0.2 }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 text-xs sm:text-sm font-medium text-muted-foreground hover:border-primary/50 hover:text-white transition-colors duration-150"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.9, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <MagneticButton>
              <Link to="/menu" data-testid="link-explore-menu">
                <Button
                  size="lg"
                  className="rounded-full px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-accent border border-white/20 shadow-lg shadow-primary/25"
                >
                  Explore Menu
                </Button>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="relative h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full bg-black/40 rounded-2xl sm:rounded-[2rem] border border-white/10 overflow-hidden gpu-accelerated"
        >
          <SpotlightSVG />
          <div className="relative z-10 w-full h-full">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block gpu-accelerated"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2 animate-bounce-slow">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </div>
      </motion.div>
    </section>
  );
}

export function HeroSection() {
  const { shouldReduceAnimations, isLowEnd, isMobile, prefersReducedMotion } = usePerformance();
  
  if (shouldReduceAnimations || isLowEnd || isMobile || prefersReducedMotion) {
    return <StaticHeroSection />;
  }

  return <AnimatedHeroSection />;
}
