'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { DATA } from '@/lib/data';
import { MagneticButton } from '../ui/MagneticButton'; // Importing Custom Magnetic Button

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 px-8 md:px-12 lg:px-20 py-6 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-[#14213D]/80 backdrop-blur-md border-b border-[#F5F5DC]/5' : ''}`}
    >
      <div className="text-2xl font-bold serif tracking-wider cursor-pointer z-50 text-[#F5F5DC]">
        IMAGINATION.
      </div>
      
      {/* Desktop Menu - Magnetic Hover Effect */}
      <div className="hidden md:flex gap-8 items-center">
        {DATA.nav.map((item) => (
          <MagneticButton 
            key={item} 
            onClick={() => scrollToSection(item)}
            className="relative px-2 py-1 text-sm uppercase tracking-widest font-medium text-[#F5F5DC] group"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#F5F5DC]/80">{item}</span>
             {/* Subtle underline animation instead of line-through */}
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F5F5DC] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </MagneticButton>
        ))}
      </div>

      {/* Mobile Toggle */}
      <button className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="text-[#14213D]" /> : <Menu className="text-[#F5F5DC]" />}
      </button>
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            key="mobile-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#F5F5DC] text-[#14213D] flex flex-col items-center justify-center gap-8 z-40"
          >
            {DATA.nav.map((item) => (
              <button 
                key={item} onClick={() => scrollToSection(item)}
                className="text-3xl serif italic hover:text-[#14213D]/50 transition-colors"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
