import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface LiquidTransitionProps {
  children: ReactNode;
}

const curtainVariants = {
  initial: {
    y: '100%',
    borderTopLeftRadius: '50% 100px',
    borderTopRightRadius: '50% 100px',
  },
  animate: {
    y: '100%',
    borderTopLeftRadius: '0% 0px',
    borderTopRightRadius: '0% 0px',
    transition: {
      duration: 0,
    },
  },
  exit: {
    y: ['100%', '0%', '-100%'],
    borderTopLeftRadius: ['50% 100px', '20% 40px', '0% 0px'],
    borderTopRightRadius: ['50% 100px', '20% 40px', '0% 0px'],
    transition: {
      duration: 1.2,
      times: [0, 0.4, 1],
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const contentVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export function LiquidTransition({ children }: LiquidTransitionProps) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-b from-[#0a0118] via-indigo-950 to-[#050505] pointer-events-none"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={curtainVariants}
      />
      
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={contentVariants}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}

export function LiquidCurtainEnter() {
  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 1 } }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#0a0118] via-indigo-950 to-[#050505]"
        initial={{ 
          y: 0,
          borderTopLeftRadius: '0% 0px',
          borderTopRightRadius: '0% 0px',
        }}
        animate={{ 
          y: '-100%',
          borderTopLeftRadius: '50% 80px',
          borderTopRightRadius: '50% 80px',
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1,
        }}
      />
      
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/20 via-accent/10 to-transparent blur-2xl"
        initial={{ y: 0, opacity: 0.8 }}
        animate={{ y: '-150%', opacity: 0 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </motion.div>
  );
}
