import { Suspense, lazy, Component, type ReactNode, useState, useEffect } from 'react';
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

function LoadingSpinner() {
  return (
    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm">Loading 3D Scene...</span>
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

  useEffect(() => {
    setWebglSupported(checkWebGLSupport());
  }, []);

  if (webglSupported === null) {
    return <LoadingSpinner />;
  }

  if (!webglSupported) {
    return <SplineFallback />;
  }

  return (
    <SplineErrorBoundary fallback={<SplineFallback />}>
      <Suspense fallback={<LoadingSpinner />}>
        <Spline scene={scene} className={className} />
      </Suspense>
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
