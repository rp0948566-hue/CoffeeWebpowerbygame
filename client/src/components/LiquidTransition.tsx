import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface LiquidTransitionProps {
  children: ReactNode;
}

const smoothEase = [0.16, 1, 0.3, 1];

const curtainVariants = {
  initial: {
    y: '100%',
    borderTopLeftRadius: '50% 40px',
    borderTopRightRadius: '50% 40px',
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
    borderTopLeftRadius: ['50% 40px', '20% 20px', '0% 0px'],
    borderTopRightRadius: ['50% 40px', '20% 20px', '0% 0px'],
    transition: {
      duration: 0.6,
      times: [0, 0.35, 1],
      ease: smoothEase,
    },
  },
};

const contentVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      delay: 0.02,
      ease: smoothEase,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.18,
      ease: smoothEase,
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
      exit={{ opacity: 0, transition: { delay: 0.5 } }}
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
          borderTopLeftRadius: '50% 30px',
          borderTopRightRadius: '50% 30px',
        }}
        transition={{
          duration: 0.5,
          ease: smoothEase,
          delay: 0.02,
        }}
        style={{ transform: 'translateZ(0)' }}
      />
    </motion.div>
  );
}
