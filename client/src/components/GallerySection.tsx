import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// todo: remove mock functionality - replace with real gallery data from backend
const galleryItems = [
  { id: 1, title: "ARTISAN PIZZA", category: "Savory", src: "/Animation/1.png", color: "bg-orange-500" },
  { id: 2, title: "HOT COFFEE", category: "Brew", src: "/Animation/2.png", color: "bg-amber-700" },
  { id: 3, title: "FRESH MOJITO", category: "Refresh", src: "/Animation/3.png", color: "bg-emerald-500" },
  { id: 4, title: "CLUB SANDWICH", category: "Snack", src: "/Animation/4.png", color: "bg-red-500" },
  { id: 5, title: "COLD COFFEE", category: "Chilled", src: "/Animation/5.png", color: "bg-indigo-500" },
];

interface GalleryItemProps {
  item: typeof galleryItems[0];
  isActive: boolean;
  onHover: () => void;
  index: number;
}

function GalleryMenuItem({ item, isActive, onHover, index }: GalleryItemProps) {
  return (
    <motion.div
      className="relative cursor-pointer py-2 md:py-4"
      onMouseEnter={onHover}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      data-testid={`gallery-item-${item.id}`}
    >
      <motion.div
        className="flex items-center gap-4 md:gap-6"
        animate={{ x: isActive ? 20 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <motion.span
          className="text-xs md:text-sm font-mono text-muted-foreground"
          animate={{ opacity: isActive ? 1 : 0.5 }}
        >
          0{item.id}
        </motion.span>
        
        <div className="flex flex-col">
          <motion.h3
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none cursor-pointer transition-all duration-300 ${
              isActive ? '' : 'text-outline'
            }`}
            style={{ fontFamily: "'Titan One', cursive" }}
            animate={{
              color: isActive ? '#ffffff' : 'transparent',
              WebkitTextStroke: isActive ? '0px' : '2px white',
            }}
            whileHover={{ scale: 1.02 }}
          >
            {item.title}
          </motion.h3>
          
          <motion.span
            className="text-xs md:text-sm uppercase tracking-widest mt-1 md:mt-2"
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 10,
              color: isActive ? 'hsl(var(--primary))' : 'transparent',
            }}
            transition={{ duration: 0.2 }}
          >
            {item.category}
          </motion.span>
        </div>
      </motion.div>

      {isActive && (
        <motion.div
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 md:h-16 ${item.color} rounded-full`}
          layoutId="activeIndicator"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}

function ImageViewport({ activeItem }: { activeItem: typeof galleryItems[0] }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-[2rem] bg-black/40 border border-white/10">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeItem.id}
          className="absolute inset-0"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={`absolute inset-0 ${activeItem.color} opacity-20`} />
          
          <img
            src={activeItem.src}
            alt={activeItem.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          <motion.div
            className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${activeItem.color} text-white mb-2 md:mb-3`}>
              {activeItem.category}
            </span>
            <h4
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "'Titan One', cursive" }}
            >
              {activeItem.title}
            </h4>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-4 md:top-6 right-4 md:right-6 flex gap-2">
        {galleryItems.map((item) => (
          <motion.div
            key={item.id}
            className={`w-2 h-2 rounded-full ${
              item.id === activeItem.id ? activeItem.color : 'bg-white/30'
            }`}
            animate={{ scale: item.id === activeItem.id ? 1.2 : 1 }}
          />
        ))}
      </div>
    </div>
  );
}

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = galleryItems[activeIndex];

  return (
    <section id="gallery" className="min-h-screen py-16 md:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-12 md:mb-16"
          data-testid="text-gallery-title"
        >
          OUR{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            SPECIALTIES
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-2 md:space-y-4">
            {galleryItems.map((item, index) => (
              <GalleryMenuItem
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                onHover={() => setActiveIndex(index)}
                index={index}
              />
            ))}
          </div>

          <div className="order-1 lg:order-2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] sticky top-24">
            <ImageViewport activeItem={activeItem} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
