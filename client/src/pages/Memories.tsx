import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const memories = Array.from({ length: 27 }).map((_, i) => ({
  id: i,
  src: `https://picsum.photos/seed/${i + 50}/400/600`,
  caption: `Memory ${i + 1}`
}));

const ITEM_COUNT = 27;
const RADIUS = 800;

export function Memories() {
  const [selectedImage, setSelectedImage] = useState<typeof memories[0] | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleImageClick = (memory: typeof memories[0]) => {
    setSelectedImage(memory);
    setIsPaused(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setIsPaused(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" className="gap-2" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <h1 
            className="text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            style={{ fontFamily: "'Titan One', cursive" }}
          >
            MEMORIES
          </h1>
          <div className="w-32" />
        </div>
      </div>

      <div className="pt-32 pb-20">
        <div className="text-center mb-12 px-6">
          <p className="text-primary/80 text-sm uppercase tracking-[0.3em] mb-4">
            Our Journey
          </p>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4"
            style={{ fontFamily: "'Titan One', cursive" }}
            data-testid="text-gallery-title"
          >
            GALLERY
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Moments captured, memories preserved. Hover to pause, click to explore.
          </p>
        </div>

        <div className="gallery-container h-[600px] md:h-[700px] flex items-center justify-center">
          <div 
            className={`gallery-cylinder relative w-[300px] h-[400px] md:w-[350px] md:h-[450px]`}
            style={{ 
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {memories.map((memory, index) => {
              const angle = (360 / ITEM_COUNT) * index;
              return (
                <motion.div
                  key={memory.id}
                  className="gallery-item absolute left-1/2 top-1/2 w-[180px] h-[240px] md:w-[220px] md:h-[300px] cursor-pointer"
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                    WebkitBoxReflect: 'below 10px linear-gradient(transparent, transparent, rgba(0,0,0,0.3))',
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleImageClick(memory)}
                  data-testid={`card-memory-${memory.id}`}
                >
                  <div className="w-full h-full rounded-xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-xl shadow-black/20">
                    <img
                      src={memory.src}
                      alt={memory.caption}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-sm font-medium text-center">
                        {memory.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-8 text-muted-foreground text-sm">
          <p>Drag or hover to pause rotation</p>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={handleClose}
            data-testid="lightbox-overlay"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 text-white hover:bg-white/10 z-10"
              onClick={handleClose}
              data-testid="button-close-lightbox"
            >
              <X className="w-6 h-6" />
            </Button>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src.replace('/400/600', '/800/1200')}
                alt={selectedImage.caption}
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent rounded-b-2xl">
                <h3 className="text-white text-xl font-bold text-center">
                  {selectedImage.caption}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}

export default Memories;
