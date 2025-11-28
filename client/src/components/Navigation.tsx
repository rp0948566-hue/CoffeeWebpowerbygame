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

const smoothSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
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
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-white/5"
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="relative group"
          data-testid="link-logo"
        >
          <motion.span 
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent"
            whileHover={{ scale: 1.05 }}
            transition={smoothSpring}
          >
            LOC
          </motion.span>
          <motion.div 
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </Link>
        
        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((item) => (
            <motion.a
              key={item.name}
              href={item.path === '/menu' ? '/menu' : item.hash || '/'}
              onClick={(e) => handleNavClick(e, item)}
              onMouseEnter={() => setHoveredLink(item.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative px-4 py-2 text-muted-foreground hover:text-foreground cursor-pointer rounded-full transition-colors duration-200"
              data-testid={`link-nav-${item.name.toLowerCase()}`}
            >
              {hoveredLink === item.name && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute inset-0 bg-white/5 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={smoothSpring}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.div whileTap={{ scale: 0.95 }} transition={smoothSpring}>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden relative overflow-hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              data-testid="button-mobile-menu"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-2">
              {navLinks.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.path === '/menu' ? '/menu' : item.hash || '/'}
                  onClick={(e) => handleNavClick(e, item)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="text-lg font-medium text-muted-foreground hover:text-foreground py-3 px-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer"
                  data-testid={`link-mobile-nav-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
