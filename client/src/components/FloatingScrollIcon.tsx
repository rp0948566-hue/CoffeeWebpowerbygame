import { motion, useScroll, useTransform } from 'framer-motion';
import { Coffee } from 'lucide-react';

export function FloatingScrollIcon() {
  const { scrollYProgress } = useScroll();
  const cupRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div
      style={{ rotate: cupRotation }}
      className="fixed bottom-8 right-8 z-50 bg-primary p-4 rounded-full shadow-lg shadow-primary/50 hidden md:block"
      data-testid="floating-scroll-icon"
    >
      <Coffee className="w-6 h-6 text-primary-foreground" />
    </motion.div>
  );
}
