import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = ['Home', 'Menu', 'Gallery', 'Contact'];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <a href="#home" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent" data-testid="link-logo">
          LOC
        </a>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-foreground transition-colors"
              data-testid={`link-nav-${item.toLowerCase()}`}
            >
              {item}
            </a>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          data-testid="button-mobile-menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMenuOpen(false)}
                  data-testid={`link-mobile-nav-${item.toLowerCase()}`}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
