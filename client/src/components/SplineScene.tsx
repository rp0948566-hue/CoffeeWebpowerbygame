import { Suspense, lazy, Component, type ReactNode, useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee } from 'lucide-react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SplineErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log('Spline WebGL error caught:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function SplineFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-[2rem]">
      <div className="flex flex-col items-center gap-4 text-center p-8">
        <motion.div 
          className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center"
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 20px rgba(99, 102, 241, 0.3)',
              '0 0 40px rgba(99, 102, 241, 0.5)',
              '0 0 20px rgba(99, 102, 241, 0.3)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Coffee className="w-12 h-12 text-primary" />
        </motion.div>
        <h3 
          className="text-3xl font-bold text-primary"
          style={{ fontFamily: "'Titan One', cursive" }}
        >
          LOVE OVER COFFEE
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Premium artisan coffee experience
        </p>
      </div>
    </div>
  );
}

function SmoothLoadingUI() {
  const particles = useMemo(() => 
    [...Array(30)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    })), []
  );

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-900 rounded-[2rem] overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_60%)]" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]">
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-indigo-500/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)' }}
          />
          <motion.div 
            className="absolute inset-6 rounded-full border border-purple-500/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
          />
          <motion.div 
            className="absolute inset-12 rounded-full border-2 border-dashed border-indigo-400/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div 
            className="absolute inset-[4.5rem] rounded-full border border-fuchsia-500/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            style={{ boxShadow: '0 0 20px rgba(217, 70, 239, 0.25)' }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="relative"
              animate={{ 
                scale: [1, 1.08, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
                    '0 0 50px rgba(99, 102, 241, 0.7), 0 0 100px rgba(139, 92, 246, 0.5)',
                    '0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Coffee className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </motion.div>
              
              <motion.div 
                className="absolute -inset-3 rounded-full border border-white/20"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div 
                className="absolute -inset-6 rounded-full border border-white/10"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
        
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-indigo-400/70"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}
      </div>
      
      <motion.div 
        className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-2 h-2 rounded-full bg-indigo-500"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.span 
            className="text-xs sm:text-sm font-mono text-indigo-300/90 tracking-widest"
            style={{ textShadow: '0 0 15px rgba(99, 102, 241, 0.6)' }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            BREWING 3D EXPERIENCE
          </motion.span>
        </div>
        
        <div className="w-40 h-1.5 bg-slate-800/80 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-full"
            style={{ backgroundSize: '200% 100%' }}
            animate={{ 
              x: ['-100%', '100%'],
              backgroundPosition: ['0% 0%', '100% 0%']
            }}
            transition={{ 
              x: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
              backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' }
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const splineRef = useRef<any>(null);

  useEffect(() => {
    setWebglSupported(checkWebGLSupport());
    
    const progressInterval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, []);

  const handleSplineLoad = (splineApp: any) => {
    splineRef.current = splineApp;
    setLoadProgress(100);
    
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  };

  if (webglSupported === null) {
    return <SmoothLoadingUI />;
  }

  if (!webglSupported) {
    return <SplineFallback />;
  }

  return (
    <SplineErrorBoundary fallback={<SplineFallback />}>
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          {!isLoaded && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-10"
            >
              <SmoothLoadingUI />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: isLoaded ? 1 : 0,
            scale: isLoaded ? 1 : 0.95
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Suspense fallback={null}>
            <Spline 
              ref={splineRef}
              scene={scene} 
              className={className}
              onLoad={handleSplineLoad}
            />
          </Suspense>
        </motion.div>
      </div>
    </SplineErrorBoundary>
  );
}

export function SpotlightSVG() {
  return (
    <svg
      className="absolute -top-40 -left-20 w-[150%] h-[150%] opacity-40 pointer-events-none z-0"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter0_f_spotlight)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.82 -0.57 -0.57 0.82 3631 2291)"
          fill="white"
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_spotlight"
          x="0"
          y="0"
          width="3785"
          height="2840"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}
