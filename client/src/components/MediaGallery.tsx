import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MediaItem {
  id: number;
  type: 'video' | 'image';
  src: string;
  thumbnail?: string;
  title?: string;
}

const defaultMedia: MediaItem[] = [
  { id: 1, type: 'image', src: 'https://picsum.photos/seed/loc1/800/600', title: 'Coffee Moments 1' },
  { id: 2, type: 'image', src: 'https://picsum.photos/seed/loc2/800/600', title: 'Coffee Moments 2' },
  { id: 3, type: 'image', src: 'https://picsum.photos/seed/loc3/800/600', title: 'Coffee Moments 3' },
  { id: 4, type: 'image', src: 'https://picsum.photos/seed/loc4/800/600', title: 'Cafe Vibes 1' },
  { id: 5, type: 'image', src: 'https://picsum.photos/seed/loc5/800/600', title: 'Cafe Vibes 2' },
  { id: 6, type: 'image', src: 'https://picsum.photos/seed/loc6/800/600', title: 'Premium Brews 1' },
  { id: 7, type: 'image', src: 'https://picsum.photos/seed/loc7/800/600', title: 'Premium Brews 2' },
  { id: 8, type: 'image', src: 'https://picsum.photos/seed/loc8/800/600', title: 'Love Over Coffee' },
];

interface MediaCardProps {
  item: MediaItem;
  isActive: boolean;
}

function MediaCard({ item, isActive }: MediaCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (item.type === 'video') {
    return (
      <div className="media-card relative w-full h-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 gpu-accelerated">
        <video
          ref={videoRef}
          src={item.src}
          className={`w-full h-full object-cover transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          data-testid={`video-${item.id}`}
        />
        
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/50 to-purple-900/50">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}

        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors duration-150 group"
          data-testid={`button-play-${item.id}`}
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-150">
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" />
            )}
          </div>
        </button>

        {item.title && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white text-sm font-medium">{item.title}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="media-card relative w-full h-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 gpu-accelerated">
      <img
        src={item.src}
        alt={item.title || 'Gallery image'}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {item.title && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white text-sm font-medium">{item.title}</p>
        </div>
      )}
    </div>
  );
}

interface MediaGalleryProps {
  media?: MediaItem[];
  title?: string;
  subtitle?: string;
}

export function MediaGallery({ 
  media = defaultMedia, 
  title = "Our Moments",
  subtitle = "Experience the Love Over Coffee journey"
}: MediaGalleryProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', updateScrollButtons, { passive: true });
      updateScrollButtons();
      return () => slider.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const cardWidth = 320;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden gpu-accelerated">
      <div className="container mx-auto px-6 mb-8">
        <p className="text-primary/80 text-sm uppercase tracking-[0.3em] mb-4 text-center">
          {subtitle}
        </p>
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-black text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          style={{ fontFamily: "'Titan One', cursive" }}
          data-testid="text-media-gallery-title"
        >
          {title}
        </h2>
      </div>

      <div className="relative">
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 border border-white/20 backdrop-blur-sm"
            onClick={() => scroll('left')}
            data-testid="button-scroll-left"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </Button>
        )}

        {canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 border border-white/20 backdrop-blur-sm"
            onClick={() => scroll('right')}
            data-testid="button-scroll-right"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </Button>
        )}

        <div
          ref={sliderRef}
          className="media-slider flex gap-4 overflow-x-auto px-6 pb-4 scroll-smooth snap-x snap-mandatory"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {media.map((item, index) => (
            <div 
              key={item.id}
              className="media-slide flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] h-[400px] sm:h-[450px] md:h-[500px] snap-center"
              data-testid={`media-slide-${item.id}`}
            >
              <MediaCard item={item} isActive={index === activeIndex} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .media-slider::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default MediaGallery;
