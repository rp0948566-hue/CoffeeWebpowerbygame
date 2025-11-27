import { Coffee } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Coffee className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Love Over Coffee
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#home" className="hover:text-foreground transition-colors" data-testid="link-footer-home">
              Home
            </a>
            <a href="#menu" className="hover:text-foreground transition-colors" data-testid="link-footer-menu">
              Menu
            </a>
            <a href="#gallery" className="hover:text-foreground transition-colors" data-testid="link-footer-gallery">
              Gallery
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors" data-testid="link-footer-contact">
              Contact
            </a>
          </div>

          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            {currentYear} Love Over Coffee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
