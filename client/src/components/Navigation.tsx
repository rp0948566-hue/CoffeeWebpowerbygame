import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', path: '/', hash: '#home' },
  { name: 'Menu', path: '/menu', hash: null },
  { name: 'Gallery', path: '/gallery', hash: null },
  { name: 'Contact', path: '/', hash: '#contact' },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent, item: typeof navLinks[0]) => {
    e.preventDefault();
    setMenuOpen(false);

    if (item.path === '/menu') {
      navigate('/menu');
      return;
    }

    if (item.path === '/gallery') {
      navigate('/gallery');
      return;
    }

    if (item.hash) {
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: item.hash } });
      } else {
        const element = document.querySelector(item.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
          data-testid="link-logo"
        >
          LOC
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.path === '/menu' ? '/menu' : item.hash || '/'}
              onClick={(e) => handleNavClick(e, item)}
              className="hover:text-foreground transition-colors cursor-pointer"
              data-testid={`link-nav-${item.name.toLowerCase()}`}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
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
                  key={item.name}
                  href={item.path === '/menu' ? '/menu' : item.hash || '/'}
                  onClick={(e) => handleNavClick(e, item)}
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2 cursor-pointer"
                  data-testid={`link-mobile-nav-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
