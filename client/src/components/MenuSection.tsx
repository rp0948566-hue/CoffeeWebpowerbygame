import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
  thumbnail: string;
}

const menuVideos: VideoItem[] = [
  {
    id: '1',
    title: 'The Art of Espresso',
    category: 'Coffee',
    youtubeId: 'st571DYYTR8',
    thumbnail: 'https://img.youtube.com/vi/st571DYYTR8/maxresdefault.jpg',
  },
  {
    id: '2',
    title: 'Perfect Latte Art',
    category: 'Coffee',
    youtubeId: 'x5nOFirDRTo',
    thumbnail: 'https://img.youtube.com/vi/x5nOFirDRTo/maxresdefault.jpg',
  },
  {
    id: '3',
    title: 'Authentic Italian Pizza',
    category: 'Pizza',
    youtubeId: 'lzAk5wAImFQ',
    thumbnail: 'https://img.youtube.com/vi/lzAk5wAImFQ/maxresdefault.jpg',
  },
  {
    id: '4',
    title: 'Street Food Noodles',
    category: 'Noodles',
    youtubeId: 'ZMBWqhxwB_M',
    thumbnail: 'https://img.youtube.com/vi/ZMBWqhxwB_M/maxresdefault.jpg',
  },
  {
    id: '5',
    title: 'Cold Brew Secrets',
    category: 'Coffee',
    youtubeId: 'qwvftXK87Lo',
    thumbnail: 'https://img.youtube.com/vi/qwvftXK87Lo/maxresdefault.jpg',
  },
];

interface VideoCardProps {
  video: VideoItem;
  index: number;
  isPlaying: boolean;
  onPlay: () => void;
}

function VideoCard({ video, index, isPlaying, onPlay }: VideoCardProps) {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0, scale: 0.95 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative group ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
      data-testid={`video-card-${video.id}`}
    >
      <div 
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 ${
          index === 0 ? 'aspect-video md:aspect-[16/10]' : 'aspect-video'
        }`}
        style={{
          boxShadow: '0 0 40px rgba(99, 102, 241, 0.1), inset 0 0 60px rgba(0,0,0,0.3)'
        }}
      >
        {isPlaying ? (
          <div className="relative w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${video.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
              title={video.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="absolute bottom-4 right-4 z-20 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
              data-testid={`button-mute-${video.id}`}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        ) : (
          <>
            <img
              src={video.thumbnail}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/20 transition-colors duration-500" />
            
            <motion.button
              onClick={onPlay}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              data-testid={`button-play-${video.id}`}
            >
              <div 
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-primary/80 transition-all duration-300"
                style={{
                  boxShadow: '0 0 30px rgba(255,255,255,0.2)'
                }}
              >
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
              </div>
            </motion.button>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/80 text-white mb-2">
                {video.category}
              </span>
              <h3 
                className={`font-bold text-white ${index === 0 ? 'text-xl md:text-2xl' : 'text-lg'}`}
                style={{ fontFamily: "'Titan One', cursive" }}
              >
                {video.title}
              </h3>
            </div>
          </>
        )}
        
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10" />
      </div>
    </motion.div>
  );
}

export function MenuSection() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section id="menu" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-indigo-950/10 to-background pointer-events-none" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Play className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Video Showcase</span>
          </motion.div>
          
          <h2
            className="text-4xl md:text-5xl lg:text-7xl font-black mb-4"
            style={{ fontFamily: "'Titan One', cursive" }}
            data-testid="text-menu-title"
          >
            OUR{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent">
              MENU
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience our culinary creations through immersive videos
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {menuVideos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              isPlaying={playingId === video.id}
              onPlay={() => setPlayingId(video.id)}
            />
          ))}
        </div>
        
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Click to play</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <span>Toggle sound</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
