import { motion } from 'framer-motion';

const curtainVariants = {
  initial: {
    scaleY: 1,
    originY: 1,
  },
  animate: {
    scaleY: 0,
    originY: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1,
    },
  },
  exit: {
    scaleY: 1,
    originY: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const contentVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-[100] bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 pointer-events-none"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={curtainVariants}
        style={{ transformOrigin: 'top' }}
      />
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={contentVariants}
      >
        {children}
      </motion.div>
    </>
  );
}
