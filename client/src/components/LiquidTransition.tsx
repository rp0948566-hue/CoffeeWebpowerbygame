import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface LiquidTransitionProps {
  children: ReactNode;
}

const curtainVariants = {
  initial: {
    y: '100%',
    borderTopLeftRadius: '50% 60px',
    borderTopRightRadius: '50% 60px',
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
    borderTopLeftRadius: ['50% 60px', '20% 30px', '0% 0px'],
    borderTopRightRadius: ['50% 60px', '20% 30px', '0% 0px'],
    transition: {
      duration: 0.8,
      times: [0, 0.4, 1],
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const contentVariants = {
  initial: {
    opacity: 0,
    y: 15,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.05,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export function LiquidTransition({ children }: LiquidTransitionProps) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-b from-[#0a0118] via-indigo-950 to-[#050505] pointer-events-none gpu-accelerated"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={curtainVariants}
        style={{ transform: 'translateZ(0)' }}
      />
      
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={contentVariants}
        className="min-h-screen gpu-accelerated"
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
      exit={{ opacity: 0, transition: { delay: 0.6 } }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#0a0118] via-indigo-950 to-[#050505] gpu-accelerated"
        initial={{ 
          y: 0,
          borderTopLeftRadius: '0% 0px',
          borderTopRightRadius: '0% 0px',
        }}
        animate={{ 
          y: '-100%',
          borderTopLeftRadius: '50% 50px',
          borderTopRightRadius: '50% 50px',
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.05,
        }}
        style={{ transform: 'translateZ(0)' }}
      />
    </motion.div>
  );
}
