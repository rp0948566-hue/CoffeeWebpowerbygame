import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Camera, ChevronDown, Coffee, Pizza, Sandwich, IceCream, GlassWater, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePerformance } from '@/hooks/use-performance';
import { 
  menuHighlights, 
  menuCategories as configMenuCategories, 
  categoryImages 
} from '@/config/assets.config';

const iconMap: Record<string, typeof Coffee> = {
  Coffee,
  GlassWater,
  IceCream,
  Pizza,
  Sandwich,
  Utensils,
};

const menuCategories = configMenuCategories.map(cat => ({
  ...cat,
  icon: iconMap[cat.icon] || Coffee,
}));


function StaticHeader() {
  return (
    <div className="relative py-10 md:py-16 overflow-hidden">
      <p className="text-center text-primary/80 text-sm uppercase tracking-[0.3em] mb-4">
        Menu Highlights
      </p>
      <h1
        className="text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[7rem] font-black text-center leading-none select-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        style={{ fontFamily: "'Titan One', cursive" }}
        data-testid="text-flavors-title"
      >
        OUR MENU
      </h1>
      <p className="text-center text-muted-foreground text-base md:text-lg mt-4 max-w-2xl mx-auto px-6">
        Discover our handcrafted selection of premium beverages and artisan bites
      </p>
    </div>
  );
}

function AnimatedHeader() {
  return (
    <motion.div 
      className="relative py-10 md:py-16 overflow-hidden gpu-accelerated"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.p
        className="text-center text-primary/80 text-sm uppercase tracking-[0.3em] mb-4"
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        Menu Highlights
      </motion.p>
      <motion.h1
        className="text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[7rem] font-black text-center leading-none select-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        style={{ fontFamily: "'Titan One', cursive" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        data-testid="text-flavors-title"
      >
        OUR MENU
      </motion.h1>
      
      <motion.p
        className="text-center text-muted-foreground text-base md:text-lg mt-4 max-w-2xl mx-auto px-6"
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.25, ease: "easeOut" }}
      >
        Discover our handcrafted selection of premium beverages and artisan bites
      </motion.p>
    </motion.div>
  );
}

interface HighlightCardProps {
  item: typeof menuHighlights[0];
}

function StaticHighlightCard({ item }: HighlightCardProps) {
  return (
    <div
      className="relative group cursor-pointer"
      data-testid={`card-highlight-${item.id}`}
    >
      <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 h-full">
        <div className="relative z-10 p-3 sm:p-4">
          <div className="relative h-32 sm:h-40 md:h-48 mb-3 sm:mb-4 flex items-center justify-center overflow-hidden rounded-xl">
            <img
              src={item.src}
              alt={item.name}
              className="w-full h-full object-cover rounded-xl"
              loading="lazy"
            />
            
            <div className="absolute top-2 left-2 flex gap-1">
              {item.photos > 0 && (
                <Badge variant="secondary" className="text-xs bg-black/60 border-0">
                  <Camera className="w-3 h-3 mr-1" />
                  {item.photos}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-white text-sm sm:text-base line-clamp-2">{item.name}</h3>
              {item.price && (
                <span className="text-primary font-bold text-sm whitespace-nowrap">{item.price}</span>
              )}
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">{item.description}</p>

            {item.reviews > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                {item.reviews} {item.reviews === 1 ? 'review' : 'reviews'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedHighlightCard({ item, index }: HighlightCardProps & { index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer gpu-accelerated"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.03, duration: 0.25, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-highlight-${item.id}`}
    >
      <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 h-full">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl transition-opacity duration-200 ease-out ${isHovered ? 'opacity-80' : 'opacity-0'}`} 
        />

        <div className="relative z-10 p-3 sm:p-4">
          <div className="relative h-32 sm:h-40 md:h-48 mb-3 sm:mb-4 flex items-center justify-center overflow-hidden rounded-xl">
            <img
              src={item.src}
              alt={item.name}
              className={`w-full h-full object-cover rounded-xl transition-transform duration-200 ease-out gpu-accelerated ${isHovered ? 'scale-105' : 'scale-100'}`}
              loading="lazy"
            />
            
            <div className="absolute top-2 left-2 flex gap-1">
              {item.photos > 0 && (
                <Badge variant="secondary" className="text-xs bg-black/60 border-0">
                  <Camera className="w-3 h-3 mr-1" />
                  {item.photos}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-white text-sm sm:text-base line-clamp-2">{item.name}</h3>
              {item.price && (
                <span className="text-primary font-bold text-sm whitespace-nowrap">{item.price}</span>
              )}
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">{item.description}</p>

            {item.reviews > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                {item.reviews} {item.reviews === 1 ? 'review' : 'reviews'}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StaticCategorySection({ category }: { category: typeof menuCategories[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = category.icon;

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 sm:p-6 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
        data-testid={`category-${category.id}`}
      >
        <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        
        <div className="flex-1 text-left">
          <h3 className="font-bold text-white text-base sm:text-lg">{category.name}</h3>
          <p className="text-xs sm:text-sm text-gray-400">{category.items.length} items</p>
        </div>

        <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {isExpanded && (
        <div className="border-t border-white/10">
          <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {category.items.map((item, i) => (
              <div
                key={i}
                className="group bg-white/[0.02] rounded-xl border border-white/5 overflow-hidden"
              >
                <div className="relative h-32 sm:h-40 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 right-2 text-primary font-bold text-sm bg-black/50 px-2 py-1 rounded-lg">{item.price}</span>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-white text-sm mb-1">{item.name}</h4>
                  <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AnimatedCategorySection({ category }: { category: typeof menuCategories[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="gpu-accelerated"
    >
      <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 sm:p-6 flex items-center gap-4 hover:bg-white/[0.02] transition-colors duration-150"
          data-testid={`category-${category.id}`}
        >
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          
          <div className="flex-1 text-left">
            <h3 className="font-bold text-white text-base sm:text-lg">{category.name}</h3>
            <p className="text-xs sm:text-sm text-gray-400">{category.items.length} items</p>
          </div>

          <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-400 transition-transform duration-150 ease-out ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/10"
          >
            <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {category.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15, delay: i * 0.03 }}
                  className="group bg-white/[0.02] rounded-xl border border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-150"
                >
                  <div className="relative h-32 sm:h-40 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-2 right-2 text-primary font-bold text-sm bg-black/50 px-2 py-1 rounded-lg backdrop-blur-sm">{item.price}</span>
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-white text-sm mb-1">{item.name}</h4>
                    <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function Menu() {
  const { shouldReduceAnimations } = usePerformance();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden gpu-accelerated">
      <div className="relative z-10">
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <Link to="/" data-testid="link-back-home">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </Link>
            
            <h1 
              className="text-lg sm:text-xl font-bold text-primary"
              style={{ fontFamily: "'Titan One', cursive" }}
            >
              LOVE OVER COFFEE
            </h1>
            
            <div className="w-16 sm:w-20" />
          </div>
        </header>

        {shouldReduceAnimations ? <StaticHeader /> : <AnimatedHeader />}

        <section className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Popular Highlights</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {menuHighlights.map((item, index) => (
              shouldReduceAnimations ? (
                <StaticHighlightCard key={item.id} item={item} />
              ) : (
                <AnimatedHighlightCard key={item.id} item={item} index={index} />
              )
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Full Menu</h2>
          <div className="space-y-3 sm:space-y-4">
            {menuCategories.map((category) => (
              shouldReduceAnimations ? (
                <StaticCategorySection key={category.id} category={category} />
              ) : (
                <AnimatedCategorySection key={category.id} category={category} />
              )
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
