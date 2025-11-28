import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';

const smoothEase = [0.16, 1, 0.3, 1];

export function DrinkPortal() {
  return (
    <section className="relative py-16 md:py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/15 to-emerald-500/10" />
      
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute top-10 left-[10%] w-3 h-3 rounded-full bg-cyan-400/60 animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute top-20 left-[20%] w-2 h-2 rounded-full bg-teal-400/50 animate-bounce" style={{ animationDelay: '0.3s' }} />
        <div className="absolute top-16 right-[15%] w-4 h-4 rounded-full bg-emerald-400/40 animate-bounce" style={{ animationDelay: '0.6s' }} />
        <div className="absolute bottom-20 left-[25%] w-2 h-2 rounded-full bg-cyan-300/50 animate-bounce" style={{ animationDelay: '0.9s' }} />
        <div className="absolute bottom-16 right-[20%] w-3 h-3 rounded-full bg-teal-300/60 animate-bounce" style={{ animationDelay: '1.2s' }} />
      </motion.div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/80 via-teal-600/80 to-emerald-600/80" />
          
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <Droplets className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Partner Brand</span>
              </div>
              
              <h3 
                className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
                style={{ fontFamily: "'Titan One', cursive" }}
              >
                DRINK <span className="text-cyan-200">ZOI</span>
              </h3>
              
              <p className="text-white/90 text-lg max-w-md mb-6">
                Discover the liquid revolution. Premium beverages crafted for the modern palate.
              </p>
              
              <a 
                href="https://www.drinkzoi.co/" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="link-drink-zoi"
              >
                <Button 
                  size="lg" 
                  className="rounded-full bg-white text-teal-700 hover:bg-white/90 gap-2 px-8 font-bold shadow-xl"
                >
                  <Sparkles className="w-5 h-5" />
                  Explore Zoi
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: smoothEase, delay: 0.2 }}
              className="relative"
            >
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/30">
                <div className="text-center">
                  <Droplets className="w-12 h-12 md:w-16 md:h-16 text-white mx-auto mb-2" />
                  <span className="text-white font-bold text-lg">ZOI</span>
                </div>
              </div>
              
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default DrinkPortal;
