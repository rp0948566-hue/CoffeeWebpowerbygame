import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SplineScene, SpotlightSVG } from './SplineScene';

const letterVariants = {
  hidden: { opacity: 0, y: 100, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const wordVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.8 + i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

function AnimatedLetter({ letter, index, isOutline }: { letter: string; index: number; isOutline?: boolean }) {
  return (
    <motion.span
      custom={index}
      variants={letterVariants}
      initial="hidden"
      animate="visible"
      className={`inline-block cursor-pointer ${isOutline ? 'text-outline' : ''}`}
      style={{ fontFamily: "'Titan One', cursive" }}
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 },
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

export function HeroSection() {
  return (
    <section id="home" className="relative pt-24 pb-16 px-6 min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="z-20 text-center lg:text-left">
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-8"
            data-testid="text-hero-title"
            style={{ fontFamily: "'Titan One', cursive" }}
          >
            <div className="mb-2">
              <KineticText text="LOVE" isOutline startIndex={0} />
            </div>
            <div className="mb-2">
              <KineticText text="OVER" startIndex={4} />
            </div>
            <div className="text-primary">
              <KineticText text="COFFEE" startIndex={8} />
            </div>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
          >
            {['Premium', 'Artisan', 'Crafted'].map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="px-4 py-2 rounded-full border border-white/20 text-sm font-medium text-muted-foreground backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgba(99, 102, 241, 0.5)',
                  color: '#fff',
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.0, ease: 'easeOut' }}
            className="flex flex-wrap justify-center lg:justify-start gap-4"
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
          initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[350px] sm:h-[400px] md:h-[500px] w-full bg-black/40 rounded-[2rem] border border-white/10 overflow-hidden"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-white/60"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
