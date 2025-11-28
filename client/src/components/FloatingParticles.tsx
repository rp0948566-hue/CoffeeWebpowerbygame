import { motion } from 'framer-motion';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';

const particles = [
  { id: 1, size: 4, x: '10%', y: '20%', delay: 0, duration: 15, color: 'bg-indigo-500/20' },
  { id: 2, size: 6, x: '85%', y: '15%', delay: 2, duration: 18, color: 'bg-purple-500/15' },
  { id: 3, size: 3, x: '70%', y: '60%', delay: 4, duration: 20, color: 'bg-indigo-400/20' },
  { id: 4, size: 5, x: '25%', y: '75%', delay: 1, duration: 16, color: 'bg-purple-400/15' },
  { id: 5, size: 4, x: '90%', y: '80%', delay: 3, duration: 22, color: 'bg-indigo-500/10' },
  { id: 6, size: 8, x: '5%', y: '50%', delay: 5, duration: 25, color: 'bg-purple-600/10' },
  { id: 7, size: 3, x: '50%', y: '10%', delay: 2.5, duration: 17, color: 'bg-indigo-300/15' },
  { id: 8, size: 5, x: '35%', y: '40%', delay: 4.5, duration: 19, color: 'bg-purple-500/10' },
  { id: 9, size: 6, x: '75%', y: '35%', delay: 1.5, duration: 21, color: 'bg-indigo-400/15' },
  { id: 10, size: 4, x: '15%', y: '85%', delay: 3.5, duration: 23, color: 'bg-purple-400/20' },
  { id: 11, size: 7, x: '60%', y: '90%', delay: 0.5, duration: 18, color: 'bg-indigo-500/10' },
  { id: 12, size: 3, x: '45%', y: '55%', delay: 6, duration: 20, color: 'bg-purple-300/15' },
];

const glowOrbs = [
  { id: 1, size: 300, x: '20%', y: '30%', color: 'from-indigo-600/5 to-transparent', delay: 0 },
  { id: 2, size: 400, x: '80%', y: '60%', color: 'from-purple-600/5 to-transparent', delay: 2 },
  { id: 3, size: 250, x: '50%', y: '80%', color: 'from-indigo-500/5 to-transparent', delay: 4 },
];

export function FloatingParticles() {
  const { isMobile, tier } = usePerformanceMode();
  
  if (isMobile || tier === 'LOW') {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {glowOrbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          className={`absolute rounded-full bg-gradient-radial ${orb.color} blur-3xl`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${particle.color}`}
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
    </div>
  );
}

export function SectionParticles({ count = 6, className = "" }: { count?: number; className?: string }) {
  const { isMobile } = usePerformanceMode();
  
  if (isMobile) return null;

  const sectionParticles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {sectionParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/10"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default FloatingParticles;
