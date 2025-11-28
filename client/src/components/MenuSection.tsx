import { motion } from 'framer-motion';
import { Coffee, Pizza, UtensilsCrossed, type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MenuItem {
  name: string;
  price: string;
  desc: string;
}

interface MenuCategory {
  category: string;
  icon: LucideIcon;
  items: MenuItem[];
}

const menuItems: MenuCategory[] = [
  {
    category: 'Coffee',
    icon: Coffee,
    items: [
      { name: 'Espresso', price: '$3.50', desc: 'Rich and bold' },
      { name: 'Latte', price: '$4.00', desc: 'Smooth & milky' },
      { name: 'Cappuccino', price: '$4.50', desc: 'Frothy perfection' },
      { name: 'Cold Brew', price: '$5.00', desc: 'Smooth and refreshing' },
    ],
  },
  {
    category: 'Pizza',
    icon: Pizza,
    items: [
      { name: 'Margherita', price: '$12.00', desc: 'Classic cheese' },
      { name: 'Pepperoni', price: '$14.00', desc: 'Spicy slices' },
      { name: 'Veggie Supreme', price: '$13.00', desc: 'Garden fresh' },
      { name: 'BBQ Chicken', price: '$15.00', desc: 'Smoky goodness' },
    ],
  },
  {
    category: 'Noodles',
    icon: UtensilsCrossed,
    items: [
      { name: 'Maggi Masala', price: '$5.00', desc: 'Spicy Indian style' },
      { name: 'Cheese Maggi', price: '$6.00', desc: 'Extra cheesy' },
      { name: 'Hakka Noodles', price: '$8.00', desc: 'Indo-Chinese fusion' },
      { name: 'Pad Thai', price: '$10.00', desc: 'Thai classic' },
    ],
  },
];

interface MenuCardProps {
  category: MenuCategory;
  index: number;
}

function MenuCard({ category, index }: MenuCardProps) {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="bg-white/5 border-white/10 p-6 md:p-8 hover:border-primary/50 transition-colors"
        data-testid={`card-menu-${category.category.toLowerCase()}`}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold">{category.category}</h3>
        </div>
        <div className="space-y-4">
          {category.items.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-start border-b border-white/10 pb-4 last:border-0 last:pb-0"
              data-testid={`menu-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div>
                <h4 className="font-bold text-base md:text-lg">{item.name}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <span className="font-bold text-primary whitespace-nowrap ml-4">{item.price}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

export function MenuSection() {
  return (
    <section id="menu" className="py-20 md:py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-12 md:mb-16"
          data-testid="text-menu-title"
        >
          OUR{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            MENU
          </span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {menuItems.map((cat, index) => (
            <MenuCard key={cat.category} category={cat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
