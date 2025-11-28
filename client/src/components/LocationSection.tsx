import { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';

export function LocationSection() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Love+Over+Coffee+Indore+PLOT+NO+11+Scheme+No+51+Scheme+No+113+Indore+Madhya+Pradesh+452010";
  const embedUrl = "https://maps.google.com/maps?q=Love+Over+Coffee+Indore+PLOT+NO+11+Scheme+No+51&t=&z=15&ie=UTF8&iwloc=&output=embed";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && iframeRef.current) {
          iframeRef.current.src = embedUrl;
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="location" className="py-16 md:py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <p className="text-primary/80 text-sm uppercase tracking-[0.3em] mb-4">
            Find Us
          </p>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            style={{ fontFamily: "'Titan One', cursive" }}
            data-testid="text-location-title"
          >
            LOCATION & DIRECTIONS
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Love Over Coffee Indore, PLOT NO 11, Scheme No 51 & 113, Indore, MP 452010
          </p>
        </div>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="map-container-butter block relative w-full h-[450px] rounded-[2rem] overflow-hidden cursor-pointer border border-white/10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-testid="link-map-directions"
        >
          {!isMapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/30 to-purple-900/30 z-10">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="text-white/60 text-sm">Loading map...</p>
              </div>
            </div>
          )}
          
          <iframe
            ref={iframeRef}
            className="map-iframe-butter w-full h-full border-0 pointer-events-none"
            style={{
              filter: isHovered 
                ? 'grayscale(0%) invert(0%) contrast(100%)' 
                : 'grayscale(100%) invert(92%) contrast(83%)',
              opacity: isMapLoaded ? 1 : 0,
              transition: 'filter 0.4s ease-out, opacity 0.3s ease-out',
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Love Over Coffee Location"
            onLoad={() => setIsMapLoaded(true)}
          />
          
          <div 
            className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold text-sm shadow-lg"
            style={{
              backgroundColor: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.9)',
              boxShadow: isHovered 
                ? '0 8px 32px hsl(var(--primary) / 0.4)' 
                : '0 4px 16px hsl(var(--primary) / 0.25)',
              transition: 'background-color 0.2s ease-out, box-shadow 0.2s ease-out, transform 0.2s ease-out',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <MapPin className="w-4 h-4" />
            Get Directions
            <Navigation className="w-3 h-3" style={{ transform: 'rotate(45deg)' }} />
          </div>
          
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, hsl(var(--background) / 0.2), transparent)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease-out',
            }}
          />
          
          <div 
            className="absolute inset-0 pointer-events-none rounded-[2rem]"
            style={{
              boxShadow: isHovered 
                ? 'inset 0 0 60px hsl(var(--primary) / 0.15)' 
                : 'inset 0 0 0 transparent',
              transition: 'box-shadow 0.4s ease-out',
            }}
          />
        </a>
      </div>

      <style>{`
        .map-container-butter {
          transform: translateZ(0);
          will-change: transform;
          backface-visibility: hidden;
        }
        .map-iframe-butter {
          transform: translateZ(0);
          will-change: filter, opacity;
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}
