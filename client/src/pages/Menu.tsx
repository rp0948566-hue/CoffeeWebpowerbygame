import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Snowflake, ShoppingCart, Star, Camera, ChevronDown, Coffee, Pizza, Sandwich, IceCream, GlassWater, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
      { name: 'Cranberry Espresso', description: 'Cranberry with espresso.', price: '₹170.00' },
      { name: 'Orange Cold Brew', description: 'Orange with cold brew.', price: '₹240.00' },
      { name: 'Orange Espresso', description: 'Orange with espresso.', price: '₹170.00' },
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
      { name: 'Fresh Lime Soda', description: 'Refreshing water based sweet-salty drink.', price: '₹150.00' },
      { name: 'Lemon Mint Ice Tea', description: 'Classic lemon mint refresher.', price: '₹160.00' },
      { name: 'Peach Ice Tea', description: 'Sweet peach flavored iced tea.', price: '₹180.00' },
      { name: 'Red Bull Ice Tea', description: 'Energizing ice tea combo.', price: '₹270.00' },
      { name: 'Strawberry Ice Tea', description: 'Fresh strawberry iced tea.', price: '₹180.00' },
      { name: 'Watermelon Ice Tea', description: 'Summer watermelon refresher.', price: '₹180.00' },
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
      { name: 'Choco Cookie Frappe', description: 'Blending of espresso in ice cream n secret cookie and this flavour served with half cut passion.', price: '₹240.00' },
      { name: 'Choco Frappe', description: 'Cafe frappe with combination of chocolate fudge.', price: '₹200.00' },
      { name: 'Cookie Crunchy Creamy Frappe', description: 'Unique flavour of hazelnut n caramel with chunks cookies. Recommended.', price: '₹240.00' },
      { name: 'Dark Chocolate Frappe', description: 'Recommended to those who want combination of dark chocolate and frappe at the same time.', price: '₹200.00' },
      { name: 'Iced Cappuccino', description: 'Espresso mixed with milk, chocolate and ice cubes. Topped with milk froth.', price: '₹190.00' },
      { name: 'Iced Latte', description: 'Rich espresso and cold milk served over ice.', price: '₹190.00' },
      { name: 'Iced Mocha', description: 'Espresso with chocolate, milk n cream over ice.', price: '₹200.00' },
      { name: 'Irish Mocha Creamy Frappe', description: 'Cafe frappe mixed with Irish n chocolate flavour.', price: '₹220.00' },
      { name: 'Mocha Hazelnut Frappe', description: 'A delicious cold coffee that is blended with chocolate and hazelnut flavour.', price: '₹230.00' },
      { name: 'Nutella Frappe', description: 'Most desirable quencher in one glass. Nutella blended with espresso.', price: '₹300.00' },
      { name: 'Oreo Frappe', description: 'Oreo cookies blended with ice cream n espresso shot.', price: '₹220.00' },
      { name: 'Tiramisu Frappe', description: 'Brownie chunks blended with amazing tiramisu flavour in cold coffee.', price: '₹240.00' },
    ]
  },
  {
    id: 'mocktails',
    name: 'Mocktails',
    icon: GlassWater,
    color: 'from-pink-500 to-rose-500',
    items: [
      { name: 'Orange Tango', description: 'Blend of sweet and sour flair with touch of spice, leave you for crave more.', price: '₹240.00' },
      { name: 'Blueberry Mango Mojito', description: 'Delicious combination of blue berry n mango.', price: '₹200.00' },
      { name: 'Coco Hibiscus Bliss', description: 'Blend of hibiscus and white chocolate with every sip.', price: '₹220.00' },
      { name: 'Cranberry Mojito', description: 'Enjoy the crisp, clean taste of cranberry with mudded lemon n ice.', price: '₹200.00' },
      { name: 'Kiwi Mojito', description: 'A refreshing flavour of mint, ice and kiwi.', price: '₹360.00' },
      { name: 'Mango Mojito', description: 'Mango, mint n lime. The perfect refresher.', price: '₹180.00' },
      { name: 'Masala Lemonade', description: 'Flavorful Indian beverage that blends the tanginess of lemon with a medley of warm spices.', price: '₹160.00' },
      { name: 'Minty Berry Burst', description: 'Burst of refreshing mint and seasonal flavours of berry.', price: '₹210.00' },
      { name: 'Virgin Mojito', description: 'Refreshing chilled mint mojito flavour made using syrup, ice, muddled lemons n mint leaves.', price: '₹170.00' },
      { name: 'Watermelon Punch', description: 'Watermelon flavour refreshing drink to fight the heat.', price: '₹180.00' },
    ]
  },
  {
    id: 'shakes',
    name: 'Shakes',
    icon: IceCream,
    color: 'from-pink-400 to-purple-500',
    items: [
      { name: 'Biscoff Shake', description: 'Deliciousness of biscoff cookie blend to perfection.', price: '₹270.00' },
      { name: 'Blueberry Shake', description: 'Blueberry flavour blended with vanilla ice cream.', price: '₹220.00' },
      { name: 'Caramel Creamy Shake', description: 'Smoothness of caramel to make you drooooool!', price: '₹200.00' },
      { name: 'Choco Brownie Shake', description: 'Super creamy, super chocolaty with chunks of brownie.', price: '₹240.00' },
      { name: 'Dark Chocolate Hazelnut Shake', description: 'Chocolate shake flavoured with hazelnut.', price: '₹220.00' },
      { name: 'Dark Chocolate Shake', description: 'As chocolaty as it can get!', price: '₹190.00' },
      { name: 'Ferrero Rocher Shake', description: 'The exclusive shake loaded with ferrero rocher n nutella.', price: '₹300.00' },
      { name: 'Kit-Kat Shake', description: 'A shake that deserves a break! Blended and topped with kit kat.', price: '₹220.00' },
      { name: 'Nutella Shake', description: 'For the nutella lovers.', price: '₹280.00' },
      { name: 'Oreo Shake', description: 'You Want Oreo? We Got Oreo.', price: '₹220.00' },
      { name: 'Strawberry Shake', description: 'The strawberry shake that you deserve.', price: '₹200.00' },
    ]
  },
  {
    id: 'pizza',
    name: 'Pizza',
    icon: Pizza,
    color: 'from-red-500 to-orange-500',
    items: [
      { name: 'Classic Margarita Pizza', description: 'Classic Margarita, Home Made Tomato Sauce, Mozzarella And Evo.', price: '₹310.00' },
      { name: 'Paneer Bhurji Pizza', description: 'Spicy paneer bhurji on our traditional margarita.', price: '₹400.00' },
      { name: 'Pesto Mushroom Pizza', description: 'Basil Pesto, Mushroom, Caramelized Onion, Feta Cheese, Cherry Tomatoes, Parmesan Cheese And Mozzarella.', price: '₹440.00' },
      { name: 'Tandoori Paneer Pizza', description: 'Jumble Of Cottage Cheese, Onion, Capsicum With Cheese Blend And Tandoori Mayonnaise.', price: '₹420.00' },
      { name: 'Farm Fresh Pizza', description: 'Tasty combination of onion, tomato and capsicum and mozzarella.', price: '₹330.00' },
      { name: 'Supreme Pizza', description: 'Yummy toppings of green chilli, onion, tomato, capsicum and paneer with cheese blend.', price: '₹410.00' },
      { name: 'Multi Cheese Nirmana Pizza', description: 'Poke your senses with this pizza, cooked with onion, capsicum, jalapeno and sweet corn with blended cheese.', price: '₹440.00' },
    ]
  },
  {
    id: 'sandwiches',
    name: 'Sandwiches',
    icon: Sandwich,
    color: 'from-yellow-500 to-amber-500',
    items: [
      { name: 'French Toast Sandwich', description: 'A new style french toast made using saute vegetables and different mayonnaise in masala loaf.', price: '₹280.00' },
      { name: 'Pesto Grilled Veg Sandwich', description: 'French Loaff Stuffed With English Grilled Veg, Mozzarella, Cocktail Sauce And Served With Fries.', price: '₹330.00' },
      { name: 'Veg Club Sandwich', description: 'Fresh Lettuce, Coleslaw, Onion, Tomato, Cucumber, Cheese Slice.', price: '₹260.00' },
      { name: 'Veg Grilled Sandwich', description: 'Tasty combination of onion, tomato and capsicum.', price: '₹200.00' },
      { name: 'Cheese Corn Sandwich', description: 'A combination of cheese n corn parked in two layers to give you a heavenly experience.', price: '₹220.00' },
      { name: 'Mexican Sandwich', description: 'A tasteful sandwich made of bell peppers and onions with three different mayonnaise.', price: '₹220.00' },
      { name: 'Mushroom Sandwich', description: 'Fantastic combination of saute mushroom n onion with cheese dressing.', price: '₹220.00' },
      { name: 'Tandoori Paneer Sandwich', description: 'Paneer is an emotion. Try it to know what it tastes like.', price: '₹270.00' },
      { name: 'Triple Cheese Sandwich', description: 'Onion, tomato, capsicum & lettuce loaded with cheese, blended and placed between three slices of brown breads.', price: '₹320.00' },
    ]
  },
  {
    id: 'pasta',
    name: 'Pasta',
    icon: Utensils,
    color: 'from-orange-400 to-red-400',
    items: [
      { name: 'Alfredo Pasta (White)', description: 'A creamy sauce with lots of parmesan cheese serves with bread.', price: '₹400.00' },
      { name: 'Penne Arrabiata (Red)', description: 'A spicy combination of fresh homemade tomato sauce, garlic and chilly flakes served with bread.', price: '₹370.00' },
      { name: 'Penne Creamy Pesto', description: 'A Creamy Combination Of Fresh Pesto, Cream And Lots Of Parmesan Cheese Served With Bread.', price: '₹440.00' },
      { name: 'Penne Pink Sauce', description: 'Simply cooked penne pasta mixed with a silky smooth & decadent white sauce.', price: '₹420.00' },
    ]
  },
  {
    id: 'fries',
    name: 'Loaded Fries',
    icon: Utensils,
    color: 'from-yellow-400 to-orange-400',
    items: [
      { name: 'Baked Fries', description: 'Crispy french fries backed with cheese sauce and mozzarella cheese.', price: '₹280.00' },
      { name: 'French Fries', description: "For you, if you're the fries before guys kind.", price: '₹170.00' },
      { name: 'Peri Peri Fries', description: 'Fries topped with your favourite peri peri spices.', price: '₹220.00' },
      { name: 'Masala Fries', description: 'A spicy treat by chef special.', price: '₹190.00' },
      { name: 'Barbeque Fries', description: 'Fries topped with tandoori and chilli dressing.', price: '₹240.00' },
      { name: 'Cheese Jalapeno Fries', description: 'Fries topped with cheese and jalapeno dressing.', price: '₹240.00' },
      { name: 'Mexican Fries', description: 'Fries topped with cheese, mayo and jalapeno dressing.', price: '₹240.00' },
      { name: 'Nachos Fries', description: 'A combination of fries and nachos, topped with chilli and plain mayo.', price: '₹260.00' },
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
      { name: 'Masala Pull-A-Part Garlic Bread', description: 'Freshly baked garlic bread with garlic butter, indian masala and cheese.', price: '₹400.00' },
      { name: 'OTC Garlic Bread', description: 'Cheese blend, onion, tomato, capsicum with spices.', price: '₹300.00' },
      { name: 'Pesto Pull-A-Part Garlic Bread', description: 'Freshly Baked Garlic Bread with Garlic Butter, Pesto, diced tomato and cheese.', price: '₹440.00' },
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
      className="relative py-12 md:py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <motion.p
        className="text-center text-primary/80 text-sm uppercase tracking-[0.3em] mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Menu Highlights
      </motion.p>
      <motion.h1
        className="text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] font-black text-center leading-none select-none"
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
        OUR MENU
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

interface HighlightCardProps {
  item: typeof menuHighlights[0];
  index: number;
}

function HighlightCard({ item, index }: HighlightCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.4 + index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-highlight-${item.id}`}
    >
      <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-sm h-full">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.2 : 0.8,
          }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative z-10 p-4">
          <div className="relative h-40 md:h-48 mb-4 flex items-center justify-center overflow-hidden rounded-xl">
            <motion.div
              className={`absolute inset-0 ${item.color} rounded-full blur-3xl`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isHovered ? 0.3 : 0,
                scale: isHovered ? 1.5 : 0,
              }}
              transition={{ duration: 0.5 }}
            />
            
            <motion.img
              src={item.src}
              alt={item.name}
              className="relative z-10 w-full h-full object-cover rounded-xl"
              style={{
                filter: isHovered ? 'grayscale(0%) saturate(1.2)' : 'grayscale(30%) saturate(0.9)',
              }}
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 2 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="space-y-2">
            <motion.h3
              className="text-lg md:text-xl font-bold text-white"
              style={{ fontFamily: "'Titan One', cursive" }}
              animate={{
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {item.name}
            </motion.h3>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {item.reviews > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  {item.reviews} {item.reviews === 1 ? 'review' : 'reviews'}
                </span>
              )}
              {item.reviews > 0 && item.photos > 0 && <span>·</span>}
              {item.photos > 0 && (
                <span className="flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  {item.photos} {item.photos === 1 ? 'photo' : 'photos'}
                </span>
              )}
            </div>

            <motion.p
              className="text-sm text-muted-foreground line-clamp-2"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: isHovered ? 1 : 0.6 }}
            >
              {item.description}
            </motion.p>

            <motion.div
              className="flex items-center justify-between pt-2"
              initial={{ opacity: 0.8, y: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0.8,
                y: isHovered ? 0 : 5,
              }}
              transition={{ duration: 0.3 }}
            >
              {item.price ? (
                <span className="text-xl font-bold text-white">{item.price}</span>
              ) : (
                <Badge variant="secondary" className="text-xs">Price varies</Badge>
              )}
              
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  size="sm"
                  className={`rounded-full ${item.color} hover:opacity-90 text-white gap-1`}
                  data-testid={`button-add-${item.id}`}
                >
                  <ShoppingCart className="w-3 h-3" />
                  Add
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface CategorySectionProps {
  category: typeof menuCategories[0];
  index: number;
}

function CategorySection({ category, index }: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(index < 3);
  const Icon = category.icon;

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
      data-testid={`category-${category.id}`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors group"
      >
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Titan One', cursive" }}>
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground">{category.items.length} items</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={categoryImages[category.id]}
            alt={category.name}
            className="w-16 h-16 rounded-lg object-cover opacity-60 group-hover:opacity-100 transition-opacity"
          />
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 px-2">
              {category.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group cursor-pointer"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <h4 className="font-semibold text-white group-hover:text-primary transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-bold text-white">{item.price}</span>
                    <Button size="sm" variant="ghost" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

      <main className="relative z-10 container mx-auto px-4 md:px-6 pt-28 pb-20">
        <MassiveHeader />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2" style={{ fontFamily: "'Titan One', cursive" }}>
            <Star className="w-6 h-6 text-yellow-500" />
            Popular Highlights
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {menuHighlights.map((item, index) => (
              <HighlightCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Titan One', cursive" }}>
            Full Menu
          </h2>
          {menuCategories.map((category, index) => (
            <CategorySection key={category.id} category={category} index={index} />
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
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
