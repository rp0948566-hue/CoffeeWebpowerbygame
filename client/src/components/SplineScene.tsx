import { Suspense, lazy, Component, type ReactNode, useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee } from 'lucide-react';
import { usePerformance } from '@/hooks/use-performance';

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
  const { shouldReduceAnimations } = usePerformance();
  
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-[2rem] gpu-accelerated">
      <div className="flex flex-col items-center gap-4 text-center p-8">
        <div 
          className={`w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center ${!shouldReduceAnimations ? 'animate-pulse' : ''}`}
          style={{ 
            boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)',
            transform: 'translateZ(0)'
          }}
        >
          <Coffee className="w-12 h-12 text-primary" />
        </div>
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

function OptimizedLoadingUI({ particleCount }: { particleCount: number }) {
  const particles = useMemo(() => 
    [...Array(particleCount)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2,
    })), [particleCount]
  );

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-900 rounded-[2rem] overflow-hidden relative gpu-accelerated">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_60%)]" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px]">
          <div 
            className="absolute inset-0 rounded-full border-2 border-indigo-500/40 animate-spin-slow"
            style={{ boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)', transform: 'translateZ(0)' }}
          />
          <div 
            className="absolute inset-8 rounded-full border border-purple-500/40 animate-spin-reverse"
            style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)', transform: 'translateZ(0)' }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center animate-pulse-slow"
              style={{ 
                boxShadow: '0 0 40px rgba(99, 102, 241, 0.5), 0 0 80px rgba(139, 92, 246, 0.3)',
                transform: 'translateZ(0)'
              }}
            >
              <Coffee className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
        </div>
        
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-indigo-400/50 animate-pulse-slow"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              transform: 'translateZ(0)',
            }}
          />
        ))}
      </div>
      
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span 
            className="text-xs sm:text-sm font-mono text-indigo-300/90 tracking-widest"
            style={{ textShadow: '0 0 10px rgba(99, 102, 241, 0.5)' }}
          >
            LOADING 3D
          </span>
        </div>
        
        <div className="w-32 h-1 bg-slate-800/80 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-loading-bar" />
        </div>
      </div>
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
  const { shouldReduceAnimations, particleCount, isLowEnd } = usePerformance();
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const splineRef = useRef<any>(null);

  useEffect(() => {
    setWebglSupported(checkWebGLSupport());
  }, []);

  const handleSplineLoad = (splineApp: any) => {
    splineRef.current = splineApp;
    setTimeout(() => {
      setIsLoaded(true);
    }, 200);
  };

  if (webglSupported === null) {
    return <OptimizedLoadingUI particleCount={particleCount} />;
  }

  if (!webglSupported || isLowEnd) {
    return <SplineFallback />;
  }

  return (
    <SplineErrorBoundary fallback={<SplineFallback />}>
      <div className="relative w-full h-full gpu-accelerated">
        <AnimatePresence mode="wait">
          {!isLoaded && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceAnimations ? 0.2 : 0.5 }}
              className="absolute inset-0 z-10"
            >
              <OptimizedLoadingUI particleCount={particleCount} />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: shouldReduceAnimations ? 0.2 : 0.6 }}
          className="absolute inset-0"
          style={{ transform: 'translateZ(0)' }}
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
