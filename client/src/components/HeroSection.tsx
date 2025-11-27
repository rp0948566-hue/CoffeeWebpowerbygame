import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SplineScene, SpotlightSVG } from './SplineScene';

export function HeroSection() {
  return (
    <section id="home" className="relative pt-32 pb-20 px-6 min-h-screen flex items-center">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="z-20">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
            data-testid="text-hero-title"
          >
            LOVE OVER <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              COFFEE
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-muted-foreground text-lg md:text-xl mb-8 max-w-lg"
            data-testid="text-hero-description"
          >
            Experience the perfect blend of premium flavors and cozy vibes in a futuristic setting.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="rounded-full px-8 text-lg font-bold"
              data-testid="button-order-now"
            >
              Order Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 text-lg border-white/20"
              data-testid="button-our-story"
            >
              Our Story
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="relative h-[400px] md:h-[500px] w-full bg-black/40 rounded-[2rem] border border-white/10 overflow-hidden"
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
    </section>
  );
}
