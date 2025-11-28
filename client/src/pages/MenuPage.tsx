import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  {
    id: 1,
    name: 'ARTISAN PIZZA',
    description: 'Hand-tossed dough with premium toppings and fresh mozzarella',
    price: '$18.99',
    category: 'Savory',
    image: '/Animation/1.png',
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    id: 2,
    name: 'HOT COFFEE',
    description: 'Single-origin arabica beans, freshly roasted and brewed',
    price: '$5.99',
    category: 'Brew',
    image: '/Animation/2.png',
    color: 'from-amber-700/20 to-orange-600/20',
  },
  {
    id: 3,
    name: 'FRESH MOJITO',
    description: 'Muddled mint, fresh lime, and premium white rum',
    price: '$12.99',
    category: 'Refresh',
    image: '/Animation/3.png',
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 4,
    name: 'CLUB SANDWICH',
    description: 'Triple-decker with turkey, bacon, lettuce, and tomato',
    price: '$14.99',
    category: 'Snack',
    image: '/Animation/4.png',
    color: 'from-red-500/20 to-rose-500/20',
  },
  {
    id: 5,
    name: 'COLD COFFEE',
    description: 'Slow-brewed for 12 hours, smooth and refreshing',
    price: '$6.99',
    category: 'Chilled',
    image: '/Animation/5.png',
    color: 'from-indigo-500/20 to-purple-500/20',
  },
];

const floatingElements = [
  { size: 80, x: '10%', y: '20%', delay: 0, blur: 'blur-xl' },
  { size: 120, x: '85%', y: '30%', delay: 0.5, blur: 'blur-2xl' },
  { size: 60, x: '70%', y: '70%', delay: 1, blur: 'blur-xl' },
  { size: 100, x: '20%', y: '80%', delay: 1.5, blur: 'blur-2xl' },
  { size: 40, x: '50%', y: '10%', delay: 2, blur: 'blur-lg' },
];

function FloatingParticle({ size, x, y, delay, blur }: typeof floatingElements[0]) {
  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-br from-primary/10 to-accent/10 ${blur}`}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1],
        y: [0, -30, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

function FloatingIcon({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute text-primary/20"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, rotate: 0 }}
      animate={{
        opacity: [0.2, 0.4, 0.2],
        rotate: [0, 10, -10, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Leaf className="w-8 h-8" />
    </motion.div>
  );
}

interface ProductCardProps {
  item: typeof menuItems[0];
  index: number;
}

function ProductCard({ item, index }: ProductCardProps) {
  return (
    <motion.div
      className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.5 + index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.02 }}
      data-testid={`card-product-${item.id}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative p-6 h-full flex flex-col">
        <span className="text-xs font-medium text-primary/80 uppercase tracking-widest mb-2">
          {item.category}
        </span>

        <div className="relative h-48 md:h-56 mb-4 overflow-hidden rounded-2xl">
          <motion.img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <h3
          className="text-2xl md:text-3xl font-bold text-white mb-2"
          style={{ fontFamily: "'Titan One', cursive" }}
        >
          {item.name}
        </h3>

        <motion.p
          className="text-sm text-muted-foreground mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ y: 10 }}
          whileHover={{ y: 0 }}
        >
          {item.description}
        </motion.p>

        <div className="mt-auto flex items-center justify-between">
          <motion.span
            className="text-2xl font-bold text-primary"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
          >
            {item.price}
          </motion.span>

          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: 20 }}
            whileHover={{ x: 0 }}
          >
            <Button
              size="sm"
              className="rounded-full"
              data-testid={`button-add-${item.id}`}
            >
              Add to Cart
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedTitle() {
  const words = ['OUR', 'FLAVORS'];

  return (
    <motion.div className="text-center mb-16">
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
        {words.map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            className={`inline-block mr-4 md:mr-8 ${
              wordIndex === 1
                ? 'bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'
                : 'text-white'
            }`}
            style={{ fontFamily: "'Titan One', cursive" }}
            initial={{ opacity: 0, y: 50, rotateX: -45 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: wordIndex * 0.2,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </h1>
      <motion.p
        className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Discover our carefully curated selection of premium beverages and artisan bites
      </motion.p>
    </motion.div>
  );
}

export function MenuPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {floatingElements.map((el, i) => (
        <FloatingParticle key={i} {...el} />
      ))}
      <FloatingIcon delay={0} x="5%" y="40%" />
      <FloatingIcon delay={1} x="92%" y="55%" />
      <FloatingIcon delay={2} x="15%" y="75%" />
      <FloatingIcon delay={3} x="80%" y="25%" />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" data-testid="link-back-home">
            <Button
              variant="ghost"
              className="gap-2 text-muted-foreground hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          <Link
            to="/"
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
            style={{ fontFamily: "'Titan One', cursive" }}
            data-testid="link-logo-menu"
          >
            LOC
          </Link>

          <div className="w-32" />
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-32 pb-20">
        <AnimatedTitle />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {menuItems.map((item, index) => (
            <ProductCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Link to="/" data-testid="link-back-bottom">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-12 border-white/20 hover:bg-white/5"
            >
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </main>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </div>
  );
}

export default MenuPage;
