import { useState, useEffect, useMemo } from 'react';

export type PerformanceTier = 'HIGH' | 'MEDIUM' | 'LOW';

export interface PerformanceMode {
  tier: PerformanceTier;
  show3D: boolean;
  enableBlur: boolean;
  enableShadows: boolean;
  enableAnimations: boolean;
  enableLenis: boolean;
  enableParticles: boolean;
  particleCount: number;
  animationDuration: number;
  isMobile: boolean;
  isLowEnd: boolean;
  isDataSaver: boolean;
  prefersReducedMotion: boolean;
}

function detectPerformanceMode(): PerformanceMode {
  if (typeof window === 'undefined') {
    return getHighPerformanceDefaults();
  }

  const isMobile = window.matchMedia('(max-width: 768px)').matches || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const deviceMemory = (navigator as any).deviceMemory || 4;
  
  const connection = (navigator as any).connection;
  const isDataSaver = connection?.saveData === true;
  const isSlowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isLowCPU = hardwareConcurrency < 4;
  const isLowRAM = deviceMemory < 4;
  const isLowEnd = isLowCPU || isLowRAM || isDataSaver || isSlowConnection;

  let tier: PerformanceTier;
  
  if (isMobile || isLowEnd || prefersReducedMotion) {
    tier = 'LOW';
  } else if (hardwareConcurrency >= 8 && deviceMemory >= 8) {
    tier = 'HIGH';
  } else {
    tier = 'MEDIUM';
  }

  return {
    tier,
    show3D: tier === 'HIGH',
    enableBlur: tier !== 'LOW',
    enableShadows: tier !== 'LOW',
    enableAnimations: !prefersReducedMotion && tier !== 'LOW',
    enableLenis: !isMobile,
    enableParticles: tier === 'HIGH',
    particleCount: tier === 'HIGH' ? 20 : tier === 'MEDIUM' ? 10 : 0,
    animationDuration: tier === 'LOW' ? 0.1 : tier === 'MEDIUM' ? 0.2 : 0.3,
    isMobile,
    isLowEnd,
    isDataSaver,
    prefersReducedMotion,
  };
}

function getHighPerformanceDefaults(): PerformanceMode {
  return {
    tier: 'HIGH',
    show3D: true,
    enableBlur: true,
    enableShadows: true,
    enableAnimations: true,
    enableLenis: true,
    enableParticles: true,
    particleCount: 20,
    animationDuration: 0.3,
    isMobile: false,
    isLowEnd: false,
    isDataSaver: false,
    prefersReducedMotion: false,
  };
}

export function usePerformanceMode(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>(getHighPerformanceDefaults);

  useEffect(() => {
    const updateMode = () => {
      setMode(detectPerformanceMode());
    };

    updateMode();

    const mediaQueryMobile = window.matchMedia('(max-width: 768px)');
    const mediaQueryMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => updateMode();

    mediaQueryMobile.addEventListener('change', handleChange);
    mediaQueryMotion.addEventListener('change', handleChange);
    window.addEventListener('resize', handleChange);

    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', handleChange);
    }

    return () => {
      mediaQueryMobile.removeEventListener('change', handleChange);
      mediaQueryMotion.removeEventListener('change', handleChange);
      window.removeEventListener('resize', handleChange);
      if (connection) {
        connection.removeEventListener('change', handleChange);
      }
    };
  }, []);

  return mode;
}

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(
        window.matchMedia('(max-width: 768px)').matches ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };

    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

export default usePerformanceMode;
