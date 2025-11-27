import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Snowflake, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { id: 1, name: "ARTISAN PIZZA", price: "$12", src: "/Animation/1.png", color: "bg-orange-500", gradient: "from-orange-500/40 to-red-500/20" },
  { id: 2, name: "HOT COFFEE", price: "$5", src: "/Animation/2.png", color: "bg-amber-600", gradient: "from-amber-600/40 to-orange-500/20" },
  { id: 3, name: "FRESH MOJITO", price: "$8", src: "/Animation/3.png", color: "bg-emerald-500", gradient: "from-emerald-500/40 to-teal-500/20" },
  { id: 4, name: "CLUB SANDWICH", price: "$7", src: "/Animation/4.png", color: "bg-red-500", gradient: "from-red-500/40 to-rose-500/20" },
  { id: 5, name: "COLD COFFEE", price: "$6", src: "/Animation/5.png", color: "bg-indigo-500", gradient: "from-indigo-500/40 to-purple-500/20" },
];

function FloatingBubble({ delay, size, left, duration }: { delay: number; size: number; left: string; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left,
        bottom: '-100px',
        background: `radial-gradient(circle at 30% 30%, transparent 40%, rgba(255,255,255,0.1) 60%, transparent 70%)`,
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      animate={{
        y: [0, -window.innerHeight - 200],
        x: [0, Math.random() * 100 - 50],
        scale: [1, 1.1, 0.9, 1],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

function FloatingIcon({ Icon, delay, startX, startY }: { Icon: typeof Leaf; delay: number; startX: string; startY: string }) {
  return (
    <motion.div
      className="absolute text-white/10 pointer-events-none"
      style={{ left: startX, top: startY }}
      animate={{
        x: [0, 30, -20, 40, 0],
        y: [0, -40, -20, -60, 0],
        rotate: [0, 45, -30, 60, 0],
        opacity: [0.1, 0.2, 0.15, 0.2, 0.1],
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Icon className="w-12 h-12" />
    </motion.div>
  );
}

function AtmosphericBackground() {
  const bubbles = [
    { delay: 0, size: 60, left: '10%', duration: 15 },
    { delay: 2, size: 40, left: '25%', duration: 12 },
    { delay: 4, size: 80, left: '45%', duration: 18 },
    { delay: 1, size: 30, left: '60%', duration: 10 },
    { delay: 3, size: 50, left: '75%', duration: 14 },
    { delay: 5, size: 70, left: '85%', duration: 16 },
    { delay: 2.5, size: 35, left: '35%', duration: 11 },
    { delay: 6, size: 55, left: '55%', duration: 13 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble, i) => (
        <FloatingBubble key={i} {...bubble} />
      ))}
      <FloatingIcon Icon={Leaf} delay={0} startX="5%" startY="20%" />
      <FloatingIcon Icon={Snowflake} delay={2} startX="90%" startY="30%" />
      <FloatingIcon Icon={Leaf} delay={4} startX="15%" startY="70%" />
      <FloatingIcon Icon={Snowflake} delay={6} startX="80%" startY="60%" />
      <FloatingIcon Icon={Leaf} delay={1} startX="50%" startY="80%" />
    </div>
  );
}

function MassiveHeader() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const gradientX = useTransform(mouseX, [0, window.innerWidth], [0, 100]);
  const gradientY = useTransform(mouseY, [0, window.innerHeight], [0, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      className="relative py-16 md:py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <motion.h1
        className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black text-center leading-none select-none"
        style={{
          fontFamily: "'Titan One', cursive",
          background: `linear-gradient(${gradientX.get()}deg, #6366f1, #a855f7, #ec4899, #6366f1)`,
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        data-testid="text-flavors-title"
      >
        FLAVORS
      </motion.h1>
      
      <motion.p
        className="text-center text-muted-foreground text-lg md:text-xl mt-4 max-w-2xl mx-auto px-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Discover our handcrafted selection of premium beverages and artisan bites
      </motion.p>
    </motion.div>
  );
}

interface ProductCardProps {
  item: typeof menuItems[0];
  index: number;
}

function ProductCard({ item, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.6 + index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-menu-${item.id}`}
    >
      <div className="relative rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-sm p-6 h-full">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.2 : 0.8,
          }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative z-10">
          <div className="relative h-56 md:h-64 mb-6 flex items-center justify-center overflow-hidden rounded-2xl">
            <motion.div
              className={`absolute inset-0 ${item.color} rounded-full blur-3xl`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isHovered ? 0.4 : 0,
                scale: isHovered ? 1.5 : 0,
              }}
              transition={{ duration: 0.5 }}
            />
            
            <motion.img
              src={item.src}
              alt={item.name}
              className="relative z-10 w-full h-full object-cover rounded-2xl"
              style={{
                filter: isHovered ? 'grayscale(0%) saturate(1.2)' : 'grayscale(40%) saturate(0.8)',
              }}
              animate={{
                scale: isHovered ? 1.15 : 1,
                rotate: isHovered ? 3 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <motion.h3
            className="text-xl md:text-2xl font-bold text-white mb-2"
            style={{ fontFamily: "'Titan One', cursive" }}
            animate={{
              scale: isHovered ? 1.05 : 1,
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {item.name}
          </motion.h3>

          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0.7, y: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0.7,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className={`text-2xl font-bold ${isHovered ? 'text-white' : 'text-muted-foreground'} transition-colors`}>
              {item.price}
            </span>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : 20,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Button
                size="sm"
                className={`rounded-full ${item.color} hover:opacity-90 text-white gap-2`}
                data-testid={`button-add-cart-${item.id}`}
              >
                <ShoppingCart className="w-4 h-4" />
                Add
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function Menu() {
  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      <AtmosphericBackground />
      
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
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

      <main className="relative z-10 container mx-auto px-6 pt-28 pb-20">
        <MassiveHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
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

      <div className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
    </div>
  );
}

export default Menu;
