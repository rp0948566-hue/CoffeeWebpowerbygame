import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Coffee } from "lucide-react";

export default function CoffeeCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

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
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{ scale: isHovering ? 1.4 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <Coffee 
          className="w-8 h-8 text-indigo-500 drop-shadow-lg" 
          style={{ 
            filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))',
            fill: 'rgba(99, 102, 241, 0.2)'
          }} 
        />
      </motion.div>
    </>
  );
}
