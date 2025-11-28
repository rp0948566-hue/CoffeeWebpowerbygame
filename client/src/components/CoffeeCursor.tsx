import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Coffee } from "lucide-react";

export default function CoffeeCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const jellyConfig1 = { damping: 12, stiffness: 100, mass: 0.5 };
  const jellyConfig2 = { damping: 8, stiffness: 50, mass: 0.8 };
  const jellyConfig3 = { damping: 5, stiffness: 25, mass: 1.2 };
  
  const x1 = useSpring(cursorX, jellyConfig1);
  const y1 = useSpring(cursorY, jellyConfig1);
  
  const x2 = useSpring(cursorX, jellyConfig2);
  const y2 = useSpring(cursorY, jellyConfig2);
  
  const x3 = useSpring(cursorX, jellyConfig3);
  const y3 = useSpring(cursorY, jellyConfig3);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }
    
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      cursorX.set(-100);
      cursorY.set(-100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @media (hover: none) {
          .custom-cursor { display: none !important; }
        }
        body { cursor: none; }
        a, button, [role="button"] { cursor: none; }
      `}</style>
      
      <motion.div 
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9996]"
        style={{ x: x3, y: y3 }}
      >
        <div 
          className="w-10 h-10 rounded-full bg-purple-500/10 blur-md"
          style={{ transform: 'translate(-4px, -4px)' }}
        />
      </motion.div>
      
      <motion.div 
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{ x: x2, y: y2 }}
      >
        <div 
          className="w-8 h-8 rounded-full bg-indigo-500/20 blur-sm"
          style={{ transform: 'translate(0px, 0px)' }}
        />
      </motion.div>
      
      <motion.div 
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: x1, y: y1 }}
        animate={{ 
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 15 : 0
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <Coffee 
          className="w-8 h-8 text-indigo-500" 
          style={{ 
            filter: 'drop-shadow(0 0 12px rgba(99, 102, 241, 0.6)) drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))',
            fill: 'rgba(99, 102, 241, 0.25)'
          }} 
        />
      </motion.div>
    </>
  );
}
