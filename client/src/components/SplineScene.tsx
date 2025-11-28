import { Suspense, lazy, Component, type ReactNode, useState, useEffect, useRef } from 'react';
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

function SplineFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-[2rem]">
      <div className="flex flex-col items-center gap-4 text-center p-8">
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
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

function CyberLoadingUI() {
  const [loadingText, setLoadingText] = useState('INITIALIZING');
  const textOptions = ['INITIALIZING', 'BREWING 3D', 'LOADING ASSETS', 'ALMOST READY'];
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % textOptions.length;
      setLoadingText(textOptions[index]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-900 rounded-[2rem] overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]">
          <div 
            className="absolute inset-0 rounded-full border-2 border-indigo-500/30 animate-[spin_8s_linear_infinite]"
            style={{ boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)' }}
          />
          <div 
            className="absolute inset-4 rounded-full border border-purple-500/40 animate-[spin_6s_linear_infinite_reverse]"
            style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)' }}
          />
          <div 
            className="absolute inset-8 rounded-full border-2 border-dashed border-indigo-400/20 animate-[spin_12s_linear_infinite]"
          />
          <div 
            className="absolute inset-12 rounded-full border border-fuchsia-500/30 animate-[spin_4s_linear_infinite_reverse]"
            style={{ boxShadow: '0 0 15px rgba(217, 70, 239, 0.2)' }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div 
                className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600/80 to-purple-600/80 flex items-center justify-center animate-pulse"
                style={{ boxShadow: '0 0 40px rgba(99, 102, 241, 0.5), 0 0 80px rgba(139, 92, 246, 0.3)' }}
              >
                <Coffee className="w-10 h-10 text-white" />
              </div>
              
              <div className="absolute -inset-2 rounded-full border border-white/10 animate-ping opacity-30" />
            </div>
          </div>
        </div>
        
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-indigo-400/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span 
            className="text-sm font-mono text-indigo-300/80 tracking-widest"
            style={{ textShadow: '0 0 10px rgba(99, 102, 241, 0.5)' }}
          >
            {loadingText}
          </span>
          <span className="text-indigo-400/60 animate-pulse">...</span>
        </div>
        
        <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
          />
        </div>
      </div>
      
      <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-white/30">
        <div className="w-2 h-2 rounded-full bg-green-500/60 animate-pulse" />
        <span>SYSTEM.3D.RENDER</span>
      </div>
    </div>
  );
}

function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const splineRef = useRef<any>(null);

  useEffect(() => {
    setWebglSupported(checkWebGLSupport());
  }, []);

  const handleSplineLoad = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  };

  if (webglSupported === null) {
    return <CyberLoadingUI />;
  }

  if (!webglSupported) {
    return <SplineFallback />;
  }

  return (
    <SplineErrorBoundary fallback={<SplineFallback />}>
      <div className="relative w-full h-full">
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute inset-0 z-10"
            >
              <CyberLoadingUI />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
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
