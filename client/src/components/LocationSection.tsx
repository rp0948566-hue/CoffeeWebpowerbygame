import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePerformance } from '@/hooks/use-performance';

export function LocationSection() {
  const { shouldReduceAnimations } = usePerformance();
  const destination = "Love Over Coffee Indore, PLOT NO 11, Scheme No 51, Scheme No 113, Indore, Madhya Pradesh 452010";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.467479069354!2d75.8336393750801!3d22.74786797936706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd0395669351%3A0x6739600570897858!2sLove%20Over%20Coffee!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  const handleGetDirections = () => {
    window.open(directionsUrl, '_blank');
  };

  if (shouldReduceAnimations) {
    return (
      <section id="location" className="py-16 sm:py-24 px-4 sm:px-6 relative z-20 bg-slate-950">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 
              className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4" 
              style={{ fontFamily: '"Titan One", cursive' }}
              data-testid="text-location-title"
            >
              FIND THE <span className="text-indigo-500">SPOT</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">Come for the coffee, stay for the vibe.</p>
          </div>

          <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] rounded-2xl sm:rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-xl group">
            <iframe 
              src={mapEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale invert-[92%] contrast-[83%] group-hover:grayscale-0 group-hover:invert-0 group-hover:contrast-100 transition-all duration-500"
              title="Love Over Coffee Location"
            />

            <div 
              className="absolute inset-0 bg-transparent cursor-pointer"
              onClick={handleGetDirections}
              data-testid="map-overlay-click"
            />

            <Button
              onClick={handleGetDirections}
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-lg font-bold gap-2 shadow-lg shadow-indigo-500/30"
              data-testid="button-get-directions"
            >
              <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Get Directions</span>
              <span className="sm:hidden">Directions</span>
            </Button>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <div className="inline-flex items-center gap-2 sm:gap-3 text-gray-400">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm md:text-base">
                Love Over Coffee, Scheme No 51 & 113, Indore, MP 452010
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="location" className="py-16 sm:py-24 px-4 sm:px-6 relative z-20 bg-slate-950 gpu-accelerated">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4" 
            style={{ fontFamily: '"Titan One", cursive' }}
            data-testid="text-location-title"
          >
            FIND THE <span className="text-indigo-500">SPOT</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">Come for the coffee, stay for the vibe.</p>
        </motion.div>

        <motion.div 
          className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] rounded-2xl sm:rounded-[3rem] overflow-hidden border-2 border-white/10 hover:border-indigo-500/50 transition-colors duration-300 shadow-xl group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ transform: 'translateZ(0)' }}
        >
          <iframe 
            src={mapEmbedUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale invert-[92%] contrast-[83%] group-hover:grayscale-0 group-hover:invert-0 group-hover:contrast-100 transition-all duration-500"
            title="Love Over Coffee Location"
          />

          <div 
            className="absolute inset-0 bg-transparent cursor-pointer"
            onClick={handleGetDirections}
            data-testid="map-overlay-click"
          />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/70 backdrop-blur-md border border-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center gap-2 sm:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />
              <span className="font-bold text-white tracking-wider text-sm sm:text-base">CLICK FOR DIRECTIONS</span>
            </div>
          </div>

          <Button
            onClick={handleGetDirections}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-lg font-bold gap-2 shadow-lg shadow-indigo-500/30"
            data-testid="button-get-directions"
          >
            <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Get Directions</span>
            <span className="sm:hidden">Directions</span>
          </Button>
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 text-gray-400">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm md:text-base">
              Love Over Coffee, Scheme No 51 & 113, Indore, MP 452010
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
