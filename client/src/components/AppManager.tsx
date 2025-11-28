import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MainApp = lazy(() => import('@/App').then(module => ({ default: module.default })));

function TimeTravelLoader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center"
          style={{ boxShadow: '0 0 40px rgba(99, 102, 241, 0.5)' }}
        >
          <Coffee className="w-10 h-10 text-white" />
        </motion.div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-lg font-mono text-indigo-300"
          style={{ textShadow: '0 0 10px rgba(99, 102, 241, 0.5)' }}
        >
          ENTERING 2025 EXPERIENCE...
        </motion.p>
      </div>
    </div>
  );
}

function OldSiteIframe() {
  return (
    <iframe
      src="https://loveovercoffee.pages.dev/"
      className="w-full h-full border-0"
      title="Love Over Coffee Legacy"
      data-testid="iframe-legacy-site"
    />
  );
}

export function AppManager() {
  const [showNewExperience, setShowNewExperience] = useState(false);

  if (showNewExperience) {
    return (
      <Suspense fallback={<TimeTravelLoader />}>
        <MainApp />
      </Suspense>
    );
  }

  return (
    <div className="fixed inset-0 bg-black">
      <OldSiteIframe />
      
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <Button
            size="lg"
            onClick={() => setShowNewExperience(true)}
            className="group relative px-8 py-6 text-lg font-bold rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 border border-white/20 shadow-2xl overflow-hidden"
            style={{ 
              boxShadow: '0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)',
            }}
            data-testid="button-enter-2025"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            
            <span className="relative flex items-center gap-3">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span>ENTER 2025 EXPERIENCE</span>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </span>
          </Button>
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600"
        style={{ boxShadow: '0 0 20px rgba(99, 102, 241, 0.8)' }}
      />
    </div>
  );
}

export default AppManager;
