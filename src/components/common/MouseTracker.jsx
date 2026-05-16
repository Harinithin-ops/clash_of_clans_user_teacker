import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../../services/SettingsContext';

const MouseTracker = () => {
  const { settings } = useSettings();
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!settings.customCursor) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      
      // Use requestAnimationFrame for smooth, synchronized updates
      // Direct DOM manipulation avoids React render cycles and transform conflicts
      requestAnimationFrame(() => {
        if (cursor) {
          cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
      });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isVisible, settings.customCursor]);

  if (!settings.customCursor) return null;

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[2147483647] will-change-transform"
      style={{ 
        visibility: isVisible ? 'visible' : 'hidden',
        // Ensure no default transition interferes with the manual transform
        transition: 'none' 
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 15 : 0, // Slight tilt for flair
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative"
      >
        {/* Custom Cursor Image */}
        <div className="relative w-8 h-8">
          <img 
            src="/assets/custom-cursor.png" 
            alt="Custom Cursor" 
            className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          
          {/* Subtle Glow */}
          <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full -z-10 animate-pulse"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default MouseTracker;
