import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { audioAssets } from '@/config/assets.config';

export default function BackgroundAudio() {
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startAudio = useCallback(() => {
    if (audioRef.current && !hasInteracted) {
      audioRef.current.muted = false;
      audioRef.current.play().then(() => {
        setIsMuted(false);
        setHasInteracted(true);
      }).catch(() => {});
    }
  }, [hasInteracted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioAssets.defaultVolume;
      audioRef.current.play().catch(() => {});
    }

    const enableAudio = () => {
      startAudio();
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
    };

    document.addEventListener("click", enableAudio);
    document.addEventListener("touchstart", enableAudio);

    return () => {
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
    };
  }, [startAudio]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(() => {});
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-8 left-8 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/20 hover:border-white/20 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 group"
      data-testid="button-audio-toggle"
      aria-label={isMuted ? "Unmute background music" : "Mute background music"}
    >
      <audio 
        ref={audioRef} 
        src={audioAssets.backgroundMusic}
        loop 
        playsInline
        preload="auto"
      />
      
      {isMuted ? (
        <VolumeX className="w-5 h-5 opacity-50 group-hover:opacity-80 transition-opacity" />
      ) : (
        <Volume2 className="w-5 h-5 text-indigo-400" />
      )}
      
      {!isMuted && (
        <>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500/60 animate-spin" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-[-4px] rounded-full border border-indigo-500/30 animate-pulse" />
        </>
      )}
    </button>
  );
}
