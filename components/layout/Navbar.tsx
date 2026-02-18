'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { DATA } from '@/lib/data';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
      className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center text-[#F5F5DC]"
    >
      <div className="text-2xl font-bold serif tracking-wider cursor-pointer z-50">
        IMAGINATION.
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8">
        {DATA.nav.map((item) => (
          <button 
            key={item} 
            onClick={() => scrollToSection(item)}
            className="text-sm uppercase tracking-widest hover:line-through decoration-[#F5F5DC] transition-all font-medium"
          >
            {item}
          </button>
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
