import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const galleryItems = [
  { id: 1, title: "ARTISAN PIZZA", category: "Savory", src: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop" },
  { id: 2, title: "HOT COFFEE", category: "Brew", src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop" },
  { id: 3, title: "FRESH MOJITO", category: "Refresh", src: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop" },
  { id: 4, title: "CLUB SANDWICH", category: "Snack", src: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop" },
  { id: 5, title: "COLD COFFEE", category: "Chilled", src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&auto=format&fit=crop" },
];

const springTransition = {
  type: "spring" as const,
  stiffness: 250,
  damping: 25,
};

const heavySpring = {
  type: "spring" as const,
  mass: 0.5,
  stiffness: 100,
  damping: 20,
};

export function GallerySection() {
  const [activeId, setActiveId] = useState(1);

  return (
    <section id="gallery" className="py-24 md:py-32 px-4 md:px-6 bg-[#050505] text-white min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#050505] to-[#050505]" />
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
        
        <div className="space-y-2 md:space-y-4 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-8"
          >
            <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-indigo-400 uppercase">
              Our Specialties
            </span>
          </motion.div>

          {galleryItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, ...heavySpring }}
              onMouseEnter={() => setActiveId(item.id)}
              className="group cursor-pointer relative py-1 md:py-2"
              data-testid={`gallery-item-${item.id}`}
            >
              <motion.div
                className="absolute top-1/2 -left-2 md:-left-4 w-2 md:w-3 h-2 md:h-3 bg-indigo-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: activeId === item.id ? 1 : 0 }}
                transition={springTransition}
              />
              
              <motion.h2
                className={cn(
                  "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black transition-colors duration-500 ease-out leading-none",
                  activeId === item.id 
                    ? "translate-x-4 md:translate-x-10 text-white" 
                    : "text-transparent text-stroke-2 text-stroke-white/30 hover:text-stroke-white/60"
                )}
                style={{ fontFamily: '"Titan One", cursive' }}
                animate={{ x: activeId === item.id ? 20 : 0 }}
                transition={heavySpring}
              >
                {item.title}
              </motion.h2>
              
              <motion.span
                className="block text-xs uppercase tracking-widest text-indigo-400 mt-1 ml-4 md:ml-10"
                initial={{ opacity: 0, y: 5 }}
                animate={{ 
                  opacity: activeId === item.id ? 1 : 0,
                  y: activeId === item.id ? 0 : 5
                }}
                transition={{ duration: 0.3 }}
              >
                {item.category}
              </motion.span>
            </motion.div>
          ))}
        </div>

        <div className="relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl order-1 lg:order-2">
          <AnimatePresence mode="popLayout">
            {galleryItems.map((item) => item.id === activeId && (
              <motion.div
                key={item.id}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%", opacity: 0.5 }}
                transition={springTransition}
                className="absolute inset-0 w-full h-full"
              >
                <motion.img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1.1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  loading="lazy"
                />
                
                <div 
                  className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
                  style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, ...heavySpring }}
                  className="absolute bottom-6 md:bottom-8 left-6 md:left-8 bg-black/50 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/10"
                >
                  <span className="font-bold tracking-widest text-xs md:text-sm uppercase">{item.category}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, ...heavySpring }}
                  className="absolute bottom-6 md:bottom-8 right-6 md:right-8 flex gap-1.5"
                >
                  {galleryItems.map((dot) => (
                    <div
                      key={dot.id}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        dot.id === activeId ? "bg-white w-6" : "bg-white/30"
                      )}
                    />
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        </div>

      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

export default GallerySection;
