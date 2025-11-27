import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Loading 3D Scene...</span>
          </div>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
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
