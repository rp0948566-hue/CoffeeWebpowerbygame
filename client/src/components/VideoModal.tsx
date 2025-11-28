import { useState, useCallback, Suspense, useEffect, useRef, Component, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { X, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WavingVideo, WavingVideoFallback } from './WavingVideo';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

// Check if WebGL is supported
function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
}

// Error boundary to catch WebGL context creation failures at runtime
interface WebGLErrorBoundaryProps {
  children: ReactNode;
  onError: () => void;
  fallback: ReactNode;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<WebGLErrorBoundaryProps, WebGLErrorBoundaryState> {
  constructor(props: WebGLErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('WebGL error caught, falling back to HTML5 video:', error.message);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Fallback video player when WebGL is not available
function FallbackVideoPlayer({ 
  videoUrl, 
  isMuted, 
  onReady 
}: { 
  videoUrl: string; 
  isMuted: boolean; 
  onReady: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleLoaded = () => {
    setIsLoaded(true);
    onReady();
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 border border-white/10">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/50 to-purple-900/50">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        )}
        <video
          ref={videoRef}
          src={videoUrl}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loop
          playsInline
          autoPlay
          onLoadedData={handleLoaded}
          data-testid="fallback-video-player"
        />
        {/* Gradient overlay for premium look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
      </div>
    </div>
  );
}

export function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Check WebGL support on mount
  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
  }, []);

  const handleVideoReady = useCallback(() => {
    setIsVideoReady(true);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleClose = useCallback(() => {
    setIsVideoReady(false);
    setIsLoading(true);
    onClose();
  }, [onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          data-testid="video-modal"
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            onClick={handleClose}
          />

          {/* Loading indicator */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute z-10 flex flex-col items-center gap-4"
              >
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-white/60 text-sm">Loading video...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Title */}
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute top-8 left-1/2 -translate-x-1/2 text-white text-xl font-bold z-20"
            >
              {title}
            </motion.h2>
          )}

          {/* Close button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="absolute top-6 right-6 z-20"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
              data-testid="button-close-video"
            >
              <X className="w-6 h-6" />
            </Button>
          </motion.div>

          {/* Mute toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="absolute bottom-6 right-6 z-20"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
              data-testid="button-toggle-mute"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
          </motion.div>

          {/* Instructions - only show for WebGL mode */}
          {webGLSupported && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVideoReady ? 1 : 0, y: isVideoReady ? 0 : 20 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
            >
              <p className="text-white/40 text-xs tracking-wide">
                Move mouse to interact • Hover to wave • ESC to close
              </p>
            </motion.div>
          )}

          {/* Video Player - WebGL with Error Boundary or Fallback */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1 
            }}
            className="relative w-full h-full max-w-[90vw] max-h-[80vh] z-10"
          >
            {webGLSupported ? (
              <WebGLErrorBoundary
                onError={() => setWebGLSupported(false)}
                fallback={
                  <FallbackVideoPlayer
                    videoUrl={videoUrl}
                    isMuted={isMuted}
                    onReady={handleVideoReady}
                  />
                }
              >
                <Canvas
                  camera={{ position: [0, 0, 10], fov: 45 }}
                  gl={{ 
                    antialias: true, 
                    alpha: true,
                    powerPreference: 'high-performance'
                  }}
                  dpr={[1, 2]}
                  style={{ background: 'transparent' }}
                >
                  <ambientLight intensity={1} />
                  <Suspense fallback={<WavingVideoFallback />}>
                    <WavingVideo
                      videoUrl={videoUrl}
                      isPlaying={isOpen}
                      onReady={handleVideoReady}
                    />
                  </Suspense>
                </Canvas>
              </WebGLErrorBoundary>
            ) : (
              <FallbackVideoPlayer
                videoUrl={videoUrl}
                isMuted={isMuted}
                onReady={handleVideoReady}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook to easily use the video modal
export function useVideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState<string | undefined>();

  const openVideo = useCallback((url: string, videoTitle?: string) => {
    setVideoUrl(url);
    setTitle(videoTitle);
    setIsOpen(true);
  }, []);

  const closeVideo = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    videoUrl,
    title,
    openVideo,
    closeVideo,
  };
}
