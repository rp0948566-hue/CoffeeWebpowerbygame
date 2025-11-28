import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Camera, ChevronDown, Coffee, Pizza, Sandwich, IceCream, GlassWater, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePerformance } from '@/hooks/use-performance';

import cappuccinoImg from '@assets/stock_images/cappuccino_coffee_la_5d8da662.jpg';
import biscoffImg from '@assets/stock_images/lotus_biscoff_coffee_f655c8f9.jpg';
import coldCoffeeImg from '@assets/stock_images/cold_coffee_frappe_i_ee6facc1.jpg';
import tiramisuImg from '@assets/stock_images/tiramisu_frappe_dess_c0c66dcb.jpg';
import fondueImg from '@assets/stock_images/cheese_fondue_melted_af7f6f6f.jpg';
import nachosImg from '@assets/stock_images/nachos_chips_cheese__98097898.jpg';
import lemonTeaImg from '@assets/stock_images/lemon_mint_iced_tea__7cea188e.jpg';
import darkChocoImg from '@assets/stock_images/dark_chocolate_frapp_fcba1bc6.jpg';
import mangoMojitoImg from '@assets/stock_images/mango_mojito_cocktai_8ca0446e.jpg';
import espressoImg from '@assets/stock_images/espresso_coffee_shot_9fabe213.jpg';
import pizzaImg from '@assets/stock_images/margarita_pizza_fres_656dfc76.jpg';
import sandwichImg from '@assets/stock_images/grilled_vegetable_sa_fc2be385.jpg';
import pastaImg from '@assets/stock_images/creamy_pasta_alfredo_fbd36371.jpg';
import friesImg from '@assets/stock_images/french_fries_golden__cef30441.jpg';
import shakeImg from '@assets/stock_images/oreo_milkshake_choco_037e89bc.jpg';
import garlicBreadImg from '@assets/stock_images/garlic_bread_cheese_9cd39aeb.jpg';

const menuHighlights = [
  { id: 1, name: "Cappuccino", price: "₹160.00", reviews: 9, photos: 4, src: cappuccinoImg, color: "bg-amber-600", gradient: "from-amber-600/40 to-orange-500/20", description: "A shot of espresso with steamed milk and foam." },
  { id: 2, name: "Lotus Biscoff Coffee", price: "", reviews: 1, photos: 9, src: biscoffImg, color: "bg-orange-500", gradient: "from-orange-500/40 to-amber-500/20", description: "Tasty combination of cappuccino with caramelised taste of lotus biscoff." },
  { id: 3, name: "Cold Coffee", price: "", reviews: 4, photos: 1, src: coldCoffeeImg, color: "bg-blue-500", gradient: "from-blue-500/40 to-indigo-500/20", description: "Rich, creamy and irresistible cold coffee." },
  { id: 4, name: "Tiramisu Frappe", price: "₹240.00", reviews: 3, photos: 1, src: tiramisuImg, color: "bg-amber-700", gradient: "from-amber-700/40 to-brown-500/20", description: "Brownie chunks blended with amazing tiramisu flavour in cold coffee." },
  { id: 5, name: "Cheese Fondue", price: "", reviews: 3, photos: 1, src: fondueImg, color: "bg-yellow-500", gradient: "from-yellow-500/40 to-orange-400/20", description: "Bell pepper flavoured with indian spices, cheese and crispy finger bread." },
  { id: 6, name: "Nachos", price: "", reviews: 0, photos: 4, src: nachosImg, color: "bg-red-500", gradient: "from-red-500/40 to-orange-500/20", description: "Chefs special nachos with cheese and bell peppers." },
  { id: 7, name: "Lemon Mint Ice Tea", price: "₹160.00", reviews: 0, photos: 3, src: lemonTeaImg, color: "bg-green-500", gradient: "from-green-500/40 to-lime-500/20", description: "Refreshing lemon and mint flavored iced tea." },
  { id: 8, name: "Dark Chocolate Frappe", price: "₹200.00", reviews: 1, photos: 1, src: darkChocoImg, color: "bg-amber-900", gradient: "from-amber-900/40 to-brown-600/20", description: "Recommended to those who want combination of dark chocolate and frappe at the same time." },
  { id: 9, name: "Mango Mojito", price: "₹180.00", reviews: 1, photos: 1, src: mangoMojitoImg, color: "bg-yellow-400", gradient: "from-yellow-400/40 to-orange-400/20", description: "Mango, mint n lime. The perfect refresher." },
  { id: 10, name: "Espresso", price: "₹110.00", reviews: 1, photos: 1, src: espressoImg, color: "bg-amber-800", gradient: "from-amber-800/40 to-brown-700/20", description: "Full Flavoured Concentrated Foam Of Coffee." },
];

const menuCategories = [
  {
    id: 'coffee-black',
    name: 'Coffee (Without Milk)',
    icon: Coffee,
    color: 'from-amber-900 to-amber-700',
    items: [
      { name: 'Americano', description: 'Espresso shot brewed with hot water.', price: '₹150.00' },
      { name: 'Espresso', description: 'Full Flavoured Concentrated Foam Of Coffee.', price: '₹110.00' },
      { name: 'Iced Americano', description: 'Espresso shot combined with water and chilled with ice.', price: '₹170.00' },
      { name: 'Irish Americano', description: 'Espresso shot combined with hot water mixed with Irish syrup.', price: '₹180.00' },
    ]
  },
  {
    id: 'coffee-hot',
    name: 'Hot Coffee (With Milk)',
    icon: Coffee,
    color: 'from-amber-700 to-orange-600',
    items: [
      { name: 'Biscoff Cappuccino', description: 'Tasty combination of cappuccino with caramelised taste of lotus biscoff.', price: '₹190.00' },
      { name: 'Cafe Latte', description: 'A shot of espresso with steamed milk and a small layer of foam.', price: '₹170.00' },
      { name: 'Cafe Mocha', description: 'A combination of rich espresso with chocolate sauce and steamed milk.', price: '₹190.00' },
      { name: 'Cappuccino', description: 'A shot of espresso with steamed milk and foam.', price: '₹160.00' },
      { name: 'Flat White', description: 'Another version of cafe latte, espresso shot with steamed milk layered with very thin micro foam.', price: '₹170.00' },
      { name: 'Hot Chocolate', description: 'This sinful brew is a blend of dark chocolate with hot milk.', price: '₹180.00' },
      { name: 'Signature Hot Chocolate', description: 'Hot chocolate with the combination of hazelnut flavour.', price: '₹200.00' },
    ]
  },
  {
    id: 'signature',
    name: 'Signature Drinks',
    icon: GlassWater,
    color: 'from-purple-600 to-indigo-600',
    items: [
      { name: 'Cold Brew', description: 'Black - a delicate & complete drink.', price: '₹190.00' },
      { name: 'Condensed Latte', description: 'Espresso with condensed.', price: '₹200.00' },
      { name: 'Cranberry Cold Brew', description: 'Cranberry with cold brew.', price: '₹240.00' },
      { name: 'Vietnamese', description: 'Espresso, condensed, ice.', price: '₹220.00' },
    ]
  },
  {
    id: 'ice-tea',
    name: 'Ice Teas',
    icon: GlassWater,
    color: 'from-green-500 to-teal-500',
    items: [
      { name: 'Blueberry Ice Tea', description: 'Refreshing blueberry flavored iced tea.', price: '₹200.00' },
      { name: 'Lemon Mint Ice Tea', description: 'Classic lemon mint refresher.', price: '₹160.00' },
      { name: 'Peach Ice Tea', description: 'Sweet peach flavored iced tea.', price: '₹180.00' },
      { name: 'Strawberry Ice Tea', description: 'Fresh strawberry iced tea.', price: '₹180.00' },
    ]
  },
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    icon: Coffee,
    color: 'from-blue-600 to-cyan-500',
    items: [
      { name: 'Cafe Frappe', description: 'Rich, creamy and irresistable cold coffee.', price: '₹190.00' },
      { name: 'Caramel Creamy Frappe', description: 'Cafe frappe with the combination of caramel flavour.', price: '₹210.00' },
      { name: 'Choco Frappe', description: 'Cafe frappe with combination of chocolate fudge.', price: '₹200.00' },
      { name: 'Dark Chocolate Frappe', description: 'Dark chocolate and frappe combination.', price: '₹200.00' },
      { name: 'Oreo Frappe', description: 'Oreo cookies blended with ice cream n espresso shot.', price: '₹220.00' },
      { name: 'Tiramisu Frappe', description: 'Brownie chunks blended with amazing tiramisu flavour.', price: '₹240.00' },
    ]
  },
  {
    id: 'mocktails',
    name: 'Mocktails',
    icon: GlassWater,
    color: 'from-pink-500 to-rose-500',
    items: [
      { name: 'Mango Mojito', description: 'Mango, mint n lime. The perfect refresher.', price: '₹180.00' },
      { name: 'Virgin Mojito', description: 'Refreshing chilled mint mojito.', price: '₹170.00' },
      { name: 'Cranberry Mojito', description: 'Crisp, clean taste of cranberry with lemon n ice.', price: '₹200.00' },
      { name: 'Watermelon Punch', description: 'Watermelon refreshing drink.', price: '₹180.00' },
    ]
  },
  {
    id: 'shakes',
    name: 'Shakes',
    icon: IceCream,
    color: 'from-pink-400 to-purple-500',
    items: [
      { name: 'Oreo Shake', description: 'You Want Oreo? We Got Oreo.', price: '₹220.00' },
      { name: 'Nutella Shake', description: 'For the nutella lovers.', price: '₹280.00' },
      { name: 'Dark Chocolate Shake', description: 'As chocolaty as it can get!', price: '₹190.00' },
      { name: 'Strawberry Shake', description: 'The strawberry shake that you deserve.', price: '₹200.00' },
    ]
  },
  {
    id: 'pizza',
    name: 'Pizza',
    icon: Pizza,
    color: 'from-red-500 to-orange-500',
    items: [
      { name: 'Classic Margarita Pizza', description: 'Classic Margarita with Mozzarella.', price: '₹310.00' },
      { name: 'Farm Fresh Pizza', description: 'Onion, tomato and capsicum with mozzarella.', price: '₹330.00' },
      { name: 'Tandoori Paneer Pizza', description: 'Cottage cheese, onion, capsicum with tandoori mayo.', price: '₹420.00' },
      { name: 'Supreme Pizza', description: 'Green chilli, onion, tomato, capsicum, paneer.', price: '₹410.00' },
    ]
  },
  {
    id: 'sandwiches',
    name: 'Sandwiches',
    icon: Sandwich,
    color: 'from-yellow-500 to-amber-500',
    items: [
      { name: 'Veg Club Sandwich', description: 'Fresh Lettuce, Coleslaw, Onion, Tomato.', price: '₹260.00' },
      { name: 'Cheese Corn Sandwich', description: 'A combination of cheese n corn.', price: '₹220.00' },
      { name: 'Tandoori Paneer Sandwich', description: 'Paneer is an emotion.', price: '₹270.00' },
      { name: 'Triple Cheese Sandwich', description: 'Loaded with cheese.', price: '₹320.00' },
    ]
  },
  {
    id: 'pasta',
    name: 'Pasta',
    icon: Utensils,
    color: 'from-orange-400 to-red-400',
    items: [
      { name: 'Alfredo Pasta (White)', description: 'Creamy sauce with parmesan cheese.', price: '₹400.00' },
      { name: 'Penne Arrabiata (Red)', description: 'Spicy fresh tomato sauce.', price: '₹370.00' },
      { name: 'Penne Pink Sauce', description: 'Silky smooth decadent white sauce.', price: '₹420.00' },
    ]
  },
  {
    id: 'fries',
    name: 'Loaded Fries',
    icon: Utensils,
    color: 'from-yellow-400 to-orange-400',
    items: [
      { name: 'French Fries', description: "Fries before guys kind.", price: '₹170.00' },
      { name: 'Peri Peri Fries', description: 'With peri peri spices.', price: '₹220.00' },
      { name: 'Cheese Jalapeno Fries', description: 'With cheese and jalapeno.', price: '₹240.00' },
    ]
  },
  {
    id: 'garlic-bread',
    name: 'Garlic Bread',
    icon: Utensils,
    color: 'from-amber-400 to-yellow-500',
    items: [
      { name: 'Cheese Garlic Bread', description: 'Cheese blend, garlic and butter.', price: '₹220.00' },
      { name: 'Chili Corn Garlic Bread', description: 'Cheese blend, corn, green chili.', price: '₹250.00' },
      { name: 'OTC Garlic Bread', description: 'Onion, tomato, capsicum with spices.', price: '₹300.00' },
    ]
  },
];

const categoryImages: Record<string, string> = {
  'coffee-black': espressoImg,
  'coffee-hot': cappuccinoImg,
  'signature': biscoffImg,
  'ice-tea': lemonTeaImg,
  'cold-coffee': coldCoffeeImg,
  'mocktails': mangoMojitoImg,
  'shakes': shakeImg,
  'pizza': pizzaImg,
  'sandwiches': sandwichImg,
  'pasta': pastaImg,
  'fries': friesImg,
  'garlic-bread': garlicBreadImg,
};

function SimpleBackground({ particleCount }: { particleCount: number }) {
  const particles = useMemo(() => 
    [...Array(particleCount)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 5,
    })), [particleCount]
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white/5 animate-pulse-slow"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            transform: 'translateZ(0)',
          }}
        />
      ))}
    </div>
  );
}

function MassiveHeader({ reduceMotion }: { reduceMotion: boolean }) {
  if (reduceMotion) {
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

  return (
    <motion.div 
      className="relative py-10 md:py-16 overflow-hidden gpu-accelerated"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p
        className="text-center text-primary/80 text-sm uppercase tracking-[0.3em] mb-4"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Menu Highlights
      </motion.p>
      <motion.h1
        className="text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[7rem] font-black text-center leading-none select-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        style={{ fontFamily: "'Titan One', cursive", transform: 'translateZ(0)' }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        data-testid="text-flavors-title"
      >
        OUR MENU
      </motion.h1>
      
      <motion.p
        className="text-center text-muted-foreground text-base md:text-lg mt-4 max-w-2xl mx-auto px-6"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Discover our handcrafted selection of premium beverages and artisan bites
      </motion.p>
    </motion.div>
  );
}

interface HighlightCardProps {
  item: typeof menuHighlights[0];
  index: number;
  reduceMotion: boolean;
}

function HighlightCard({ item, index, reduceMotion }: HighlightCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardContent = (
    <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-sm h-full">
      {!reduceMotion && isHovered && (
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl opacity-80`}
          style={{ transform: 'translateZ(0)' }}
        />
      )}

      <div className="relative z-10 p-3 sm:p-4">
        <div className="relative h-32 sm:h-40 md:h-48 mb-3 sm:mb-4 flex items-center justify-center overflow-hidden rounded-xl">
          <img
            src={item.src}
            alt={item.name}
            className={`w-full h-full object-cover rounded-xl transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
            loading="lazy"
            style={{ transform: 'translateZ(0)' }}
          />
          
          <div className="absolute top-2 left-2 flex gap-1">
            {item.photos > 0 && (
              <Badge variant="secondary" className="text-xs bg-black/60 backdrop-blur-sm border-0">
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
  );

  if (reduceMotion) {
    return (
      <div
        className="relative group cursor-pointer gpu-accelerated"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid={`card-highlight-${item.id}`}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <motion.div
      className="relative group cursor-pointer gpu-accelerated"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1 + index * 0.05,
        duration: 0.4,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-highlight-${item.id}`}
    >
      {cardContent}
    </motion.div>
  );
}

function CategorySection({ category, categoryImage, reduceMotion }: { 
  category: typeof menuCategories[0]; 
  categoryImage: string;
  reduceMotion: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = category.icon;

  const content = (
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
          <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {category.items.map((item, i) => (
              <div
                key={i}
                className="p-3 sm:p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                  <span className="text-primary font-bold text-sm whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (reduceMotion) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="gpu-accelerated"
    >
      {content}
    </motion.div>
  );
}

export function Menu() {
  const { shouldReduceAnimations, particleCount, isMobile } = usePerformance();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SimpleBackground particleCount={isMobile ? 3 : particleCount} />
      
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

        <MassiveHeader reduceMotion={shouldReduceAnimations} />

        <section className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Popular Highlights</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {menuHighlights.map((item, index) => (
              <HighlightCard 
                key={item.id} 
                item={item} 
                index={index} 
                reduceMotion={shouldReduceAnimations}
              />
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Full Menu</h2>
          <div className="space-y-3 sm:space-y-4">
            {menuCategories.map((category) => (
              <CategorySection 
                key={category.id} 
                category={category}
                categoryImage={categoryImages[category.id]}
                reduceMotion={shouldReduceAnimations}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
