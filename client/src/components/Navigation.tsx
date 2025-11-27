import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, GlassWater } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', path: '/', hash: '#home' },
  { name: 'Menu', path: '/menu', hash: null },
  { name: 'Gallery', path: '/', hash: '#gallery' },
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
          <a 
            href="https://www.drinkzoi.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex relative px-4 md:px-6 py-2.5 group rounded-full bg-slate-800/80 text-white font-bold overflow-hidden border border-white/10 hover:border-white/20 transition-all"
            data-testid="link-explore-drinks"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-20 group-hover:opacity-40 transition-opacity" />
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
            <span className="relative flex items-center gap-2 text-sm">
              <GlassWater className="w-4 h-4 text-indigo-400" /> 
              <span className="hidden md:inline">EXPLORE</span> DRINKS
            </span>
          </a>

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
              
              <a 
                href="https://www.drinkzoi.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-lg font-bold text-indigo-400 hover:text-indigo-300 transition-colors py-2"
                data-testid="link-mobile-explore-drinks"
              >
                <GlassWater className="w-5 h-5" /> 
                EXPLORE DRINKS
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
