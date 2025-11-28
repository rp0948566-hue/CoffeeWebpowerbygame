import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const smoothEase = [0.16, 1, 0.3, 1];

const backgroundImages = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&auto=format&fit=crop",
];

export function DrinkPortal() {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="group relative overflow-hidden rounded-[3rem] border border-white/10 bg-black/40 backdrop-blur-2xl p-10 md:p-16 lg:p-24 text-center transition-all duration-500 hover:border-indigo-500/30 hover:shadow-[0_0_50px_rgba(79,70,229,0.15)]"
        >
          <div className="absolute inset-0 overflow-hidden rounded-[3rem]">
            <div className="absolute inset-0 grid grid-cols-3 gap-2 p-4 opacity-30">
              {backgroundImages.map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative overflow-hidden rounded-xl"
                >
                  <img
                    src={src}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-transparent to-purple-900/20" />
          </div>

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block mb-6 font-mono text-sm tracking-[0.3em] text-indigo-400 uppercase">
                The Origins
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
              className="mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
              style={{ fontFamily: '"Titan One", cursive' }}
            >
              TIME TRAVEL <br className="hidden sm:block" /> TO <span className="text-indigo-500">2024</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
              className="mb-10 md:mb-12 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Step back into the timeline. Witness the foundation of our digital journey before the upgrade.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, ease: smoothEase }}
            >
              <a 
                href="https://loveovercoffee.pages.dev/"
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="link-time-travel-legacy"
                className="relative inline-flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 overflow-hidden rounded-full bg-white text-black font-black text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] group-hover:bg-indigo-50 group-hover:text-indigo-950"
              >
                <span>WARP TO LEGACY</span>
                <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

export default DrinkPortal;
