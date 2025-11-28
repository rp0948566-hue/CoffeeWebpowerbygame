import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  wrapperClassName?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  priority?: boolean;
}

export function LazyImage({
  src,
  alt,
  className,
  placeholderClassName,
  wrapperClassName,
  aspectRatio = 'auto',
  priority = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const aspectRatioClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: '',
  }[aspectRatio];

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden',
        aspectRatioClass,
        wrapperClassName
      )}
    >
      {!isLoaded && (
        <div
          className={cn(
            'absolute inset-0 skeleton bg-gradient-to-r from-white/5 via-white/10 to-white/5',
            placeholderClassName
          )}
        />
      )}
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500 ease-out',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
        />
      )}
    </div>
  );
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  className,
  loading = 'lazy',
  onLoad,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  return (
    <div className="relative">
      {!loaded && (
        <div className="absolute inset-0 skeleton rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={handleLoad}
        className={cn(
          'transition-opacity duration-400 ease-out',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
      />
    </div>
  );
}

export default LazyImage;
