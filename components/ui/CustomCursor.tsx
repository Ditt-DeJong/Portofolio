'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    const handleMouseOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      // Cek apakah elemen interaktif
      const isInteractive = t?.tagName === 'BUTTON' || t?.tagName === 'A' || t?.tagName === 'INPUT' || t?.closest('button') || t?.closest('a');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#F5F5DC] rounded-full pointer-events-none z-[9999]"
        animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6, scale: isHovering ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[#F5F5DC] rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 20, y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1, opacity: isHovering ? 0.8 : 0.4
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
    </>
  );
};

export default CustomCursor;
