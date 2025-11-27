import { motion } from 'framer-motion';

// todo: remove mock functionality - replace with real gallery images from backend
const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    alt: 'Coffee cup with latte art',
  },
  {
    src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    alt: 'Delicious pizza',
  },
  {
    src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
    alt: 'Fresh pastries',
  },
  {
    src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
    alt: 'Coffee shop ambiance',
  },
  {
    src: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=800&q=80',
    alt: 'Espresso being made',
  },
  {
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    alt: 'Gourmet food spread',
  },
];

export function GallerySection() {
  return (
    <section id="gallery" className="py-20 md:py-24">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-12 md:mb-16"
          data-testid="text-gallery-title"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            GALLERY
          </span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="aspect-square rounded-md overflow-hidden cursor-pointer"
              data-testid={`gallery-image-${i}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
