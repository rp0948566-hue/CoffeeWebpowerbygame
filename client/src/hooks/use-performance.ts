import { useState, useEffect } from 'react';

interface PerformanceLevel {
  isLowEnd: boolean;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  shouldReduceAnimations: boolean;
  particleCount: number;
  animationDuration: number;
}

export function usePerformance(): PerformanceLevel {
  const [performance, setPerformance] = useState<PerformanceLevel>({
    isLowEnd: false,
    isMobile: false,
    prefersReducedMotion: false,
    shouldReduceAnimations: false,
    particleCount: 20,
    animationDuration: 1,
  });

  useEffect(() => {
    const checkPerformance = () => {
      const isMobile = window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const deviceMemory = (navigator as any).deviceMemory || 4;
      const isLowEnd = hardwareConcurrency <= 4 || deviceMemory <= 4 || isMobile;
      
      const shouldReduceAnimations = isLowEnd || prefersReducedMotion || isMobile;
      
      const particleCount = shouldReduceAnimations ? 5 : (isLowEnd ? 10 : 20);
      const animationDuration = shouldReduceAnimations ? 0.3 : 1;

      setPerformance({
        isLowEnd,
        isMobile,
        prefersReducedMotion,
        shouldReduceAnimations,
        particleCount,
        animationDuration,
      });
    };

    checkPerformance();
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => checkPerformance();
    mediaQuery.addEventListener('change', handleChange);
    window.addEventListener('resize', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', handleChange);
    };
  }, []);

  return performance;
}

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
