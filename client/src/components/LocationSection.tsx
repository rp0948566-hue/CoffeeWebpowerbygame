import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LocationSection() {
  const destination = "Love Over Coffee Indore, PLOT NO 11, Scheme No 51, Scheme No 113, Indore, Madhya Pradesh 452010";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.467479069354!2d75.8336393750801!3d22.74786797936706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd0395669351%3A0x6739600570897858!2sLove%20Over%20Coffee!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  const handleGetDirections = () => {
    window.open(directionsUrl, '_blank');
  };

  return (
    <section id="location" className="py-24 px-6 relative z-20 bg-slate-950">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-4xl md:text-6xl font-black text-white mb-4" 
            style={{ fontFamily: '"Titan One", cursive' }}
            data-testid="text-location-title"
          >
            FIND THE <span className="text-indigo-500">SPOT</span>
          </h2>
          <p className="text-gray-400 text-lg">Come for the coffee, stay for the vibe.</p>
        </motion.div>

        <motion.div 
          className="relative w-full h-[500px] rounded-[3rem] overflow-hidden border-2 border-white/10 hover:border-indigo-500/50 transition-all duration-500 shadow-2xl group"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <iframe 
            src={mapEmbedUrl}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale invert-[92%] contrast-[83%] group-hover:grayscale-0 group-hover:invert-0 group-hover:contrast-100 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
            title="Love Over Coffee Location"
          />

          <div 
            className="absolute inset-0 bg-transparent cursor-pointer"
            onClick={handleGetDirections}
            data-testid="map-overlay-click"
          />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              className="bg-black/70 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500"
              initial={{ y: 20 }}
              whileHover={{ scale: 1.05 }}
            >
              <MapPin className="w-6 h-6 text-indigo-400" />
              <span className="font-bold text-white tracking-widest">CLICK FOR DIRECTIONS</span>
            </motion.div>
          </div>

          <Button
            onClick={handleGetDirections}
            className="absolute bottom-6 right-6 z-30 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 py-6 text-lg font-bold gap-2 shadow-lg shadow-indigo-500/30"
            data-testid="button-get-directions"
          >
            <Navigation className="w-5 h-5" />
            Get Directions
          </Button>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-3 text-gray-400">
            <MapPin className="w-5 h-5 text-indigo-400" />
            <span className="text-sm md:text-base">
              Love Over Coffee, PLOT NO 11, Scheme No 51 & 113, Indore, MP 452010
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
