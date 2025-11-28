import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MemoryItem {
  id: number;
  seed: number;
  version: number;
  src: string;
  caption: string;
}

const ITEM_COUNT = 18;
const RADIUS = 650;
const REFRESH_INTERVAL = 4000;

const buildSrc = (seed: number, version: number) => 
  `https://picsum.photos/seed/${seed + version * 100}/400/600`;

const buildHighResSrc = (seed: number, version: number) => 
  `https://picsum.photos/seed/${seed + version * 100}/800/1200`;

const createInitialMemories = (): MemoryItem[] => 
  Array.from({ length: ITEM_COUNT }).map((_, i) => ({
    id: i,
    seed: i + 50,
    version: 0,
    src: buildSrc(i + 50, 0),
    caption: `Memory ${i + 1}`
  }));

export function Memories() {
  const [memories, setMemories] = useState<MemoryItem[]>(createInitialMemories);
  const [selectedImage, setSelectedImage] = useState<MemoryItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [frozenImage, setFrozenImage] = useState<MemoryItem | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastMouseX = useRef(0);
  const velocityRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const refreshRandomImage = useCallback(() => {
    setMemories(prev => {
      const randomIdx = Math.floor(Math.random() * prev.length);
      return prev.map((memory, idx) => {
        if (idx === randomIdx) {
          const newVersion = memory.version + 1;
          return {
            ...memory,
            version: newVersion,
            src: buildSrc(memory.seed, newVersion)
          };
        }
        return memory;
      });
    });
  }, []);

  useEffect(() => {
    if (selectedImage || isPaused) return undefined;
    const interval = setInterval(refreshRandomImage, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [refreshRandomImage, selectedImage, isPaused]);

  useEffect(() => {
    if (selectedImage || isPaused || isDragging) return;

    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      const rotationSpeed = 0.008;
      setRotation(prev => (prev + rotationSpeed * deltaTime) % 360);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [selectedImage, isPaused, isDragging]);

  useEffect(() => {
    if (!isDragging && Math.abs(velocityRef.current) > 0.01) {
      const applyMomentum = () => {
        velocityRef.current *= 0.95;
        setRotation(prev => (prev + velocityRef.current) % 360);
        
        if (Math.abs(velocityRef.current) > 0.01) {
          requestAnimationFrame(applyMomentum);
        }
      };
      requestAnimationFrame(applyMomentum);
    }
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouseX.current = e.clientX;
    velocityRef.current = 0;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMouseX.current;
    const rotationDelta = deltaX * 0.15;
    velocityRef.current = rotationDelta;
    setRotation(prev => (prev + rotationDelta) % 360);
    lastMouseX.current = e.clientX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageClick = (memory: MemoryItem, e: React.MouseEvent) => {
    if (isDragging && Math.abs(velocityRef.current) > 0.5) {
      e.preventDefault();
      return;
    }
    setFrozenImage({ ...memory });
    setSelectedImage(memory);
    setIsPaused(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setFrozenImage(null);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
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
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePause}
            className="w-10 h-10"
            data-testid="button-toggle-pause"
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <div className="pt-32 pb-20">
        <div className="text-center mb-8 px-6">
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
            Drag to rotate • Click to view • {isPaused ? 'Paused' : 'Auto-rotating'}
          </p>
        </div>

        <div 
          ref={containerRef}
          className="gallery-container-butter h-[550px] md:h-[650px] flex items-center justify-center select-none"
          style={{ perspective: '1500px', perspectiveOrigin: 'center center' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div 
            className="gallery-cylinder-butter relative w-[280px] h-[380px] md:w-[320px] md:h-[420px]"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg)`,
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            {memories.map((memory, index) => {
              const angle = (360 / ITEM_COUNT) * index;
              return (
                <div
                  key={memory.id}
                  className="gallery-item-butter absolute left-1/2 top-1/2 w-[160px] h-[220px] md:w-[200px] md:h-[280px]"
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                    WebkitBoxReflect: 'below 8px linear-gradient(transparent, transparent, rgba(0,0,0,0.25))',
                  }}
                  onClick={(e) => handleImageClick(memory, e)}
                  data-testid={`card-memory-${memory.id}`}
                >
                  <div 
                    className="w-full h-full rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl shadow-black/30"
                    style={{
                      transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.3)';
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${memory.id}-${memory.version}`}
                        src={memory.src}
                        alt={memory.caption}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      />
                    </AnimatePresence>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-xs md:text-sm font-medium text-center">
                        {memory.caption}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && frozenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={buildHighResSrc(frozenImage.seed, frozenImage.version)}
                alt={frozenImage.caption}
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
                draggable={false}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent rounded-b-2xl">
                <h3 className="text-white text-xl font-bold text-center">
                  {frozenImage.caption}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <style>{`
        .gallery-container-butter {
          transform: translateZ(0);
          will-change: transform;
        }
        .gallery-cylinder-butter {
          transform-style: preserve-3d;
          will-change: transform;
          backface-visibility: hidden;
        }
        .gallery-item-butter {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          will-change: transform;
        }
        .gallery-item-butter img {
          will-change: opacity;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}

export default Memories;
