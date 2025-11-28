import { MapPin } from 'lucide-react';

export function LocationSection() {
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Love+Over+Coffee+Indore+PLOT+NO+11+Scheme+No+51+Scheme+No+113+Indore+Madhya+Pradesh+452010";
  const embedUrl = "https://maps.google.com/maps?q=Love+Over+Coffee+Indore+PLOT+NO+11+Scheme+No+51&t=&z=15&ie=UTF8&iwloc=&output=embed";

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
          className="block relative w-full h-[450px] rounded-[2rem] overflow-hidden group cursor-pointer border border-white/10 hover:border-primary/30 transition-all duration-300"
          data-testid="link-map-directions"
        >
          <iframe
            src={embedUrl}
            className="w-full h-full border-0 pointer-events-none transition-all duration-500 grayscale invert contrast-[90%] group-hover:grayscale-0 group-hover:invert-0 group-hover:contrast-100"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Love Over Coffee Location"
          />
          
          <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-primary/90 backdrop-blur-sm rounded-full text-white font-semibold text-sm shadow-lg shadow-primary/25 group-hover:bg-primary transition-colors">
            <MapPin className="w-4 h-4" />
            Get Directions
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </a>
      </div>
    </section>
  );
}
