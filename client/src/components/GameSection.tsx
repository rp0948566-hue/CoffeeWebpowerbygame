import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, ExternalLink, Play, Zap, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function GameSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const openGameInNewTab = () => {
    window.open('https://play.garance.com/', '_blank');
  };

  return (
    <section id="game" className="py-20 md:py-32 px-4 md:px-6 bg-black relative z-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-black to-background" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Gamepad2 className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-300 font-medium">The Waiting Lounge</span>
          </motion.div>

          <h2 
            className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-4"
            style={{ fontFamily: "'Titan One', cursive" }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white">
              WHILE IT BREWS
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
            Challenge yourself. Beat the high score before your coffee arrives.
          </p>
          <p className="text-sm text-indigo-400/60">
            Kill time, not vibes. Play now.
          </p>
        </motion.div>

        <motion.div 
          className="relative w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 rounded-[2.5rem] blur-xl opacity-30 animate-pulse" />
          
          <div 
            className="relative h-[500px] md:h-[700px] rounded-[2rem] border border-white/10 overflow-hidden bg-slate-900/90 backdrop-blur-sm"
            style={{
              boxShadow: '0 0 80px rgba(99, 102, 241, 0.3), 0 0 40px rgba(139, 92, 246, 0.2), inset 0 0 60px rgba(0,0,0,0.5)'
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-slate-800/80 to-transparent z-10 flex items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-white/40 font-mono hidden sm:block">play.garance.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400/60" />
                <Trophy className="w-4 h-4 text-amber-400/60" />
              </div>
            </div>

            {isLoading && !hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-20">
                <motion.div
                  className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <p className="mt-4 text-white/60">Loading game...</p>
              </div>
            )}

            {!hasError ? (
              <iframe 
                src="https://play.garance.com/"
                className="w-full h-full"
                title="Arcade Game"
                allow="autoplay; fullscreen"
                allowFullScreen
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                style={{ border: 'none' }}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-indigo-950">
                <Gamepad2 className="w-20 h-20 text-indigo-400/60 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">Game Ready!</h3>
                <p className="text-muted-foreground mb-6 text-center px-4">
                  Click below for the best experience
                </p>
                <Button
                  size="lg"
                  onClick={openGameInNewTab}
                  className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 gap-2 px-8"
                  data-testid="button-launch-game"
                >
                  <Play className="w-5 h-5" />
                  Launch Game
                </Button>
              </div>
            )}

            <div className="absolute bottom-4 right-4 z-30 flex items-center gap-3">
              <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white/50 border border-white/10 hidden sm:block">
                Interactive Experience
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={openGameInNewTab}
                className="rounded-full border-white/20 bg-black/40 backdrop-blur-md hover:bg-white/10 gap-2"
                data-testid="button-fullscreen-game"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Fullscreen</span>
              </Button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none z-20" />
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>No signup required</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span>Instant play</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Beat your high score</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
