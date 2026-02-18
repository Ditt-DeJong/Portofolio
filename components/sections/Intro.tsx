'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Intro = () => (
  <section id="intro" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-8 md:px-12 lg:px-20">
    <motion.div 
      animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F5F5DC] rounded-full blur-[120px] mix-blend-screen opacity-10"
    />
    <motion.div 
      animate={{ scale: [1, 1.5, 1], rotate: [0, -180, 0], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400 rounded-full blur-[120px] mix-blend-screen opacity-10"
    />

    <div className="relative z-10 text-center">
      <motion.p 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="text-[#F5F5DC]/60 uppercase tracking-[0.3em] text-sm mb-4"
      >
        Portfolio 2024
      </motion.p>
      <motion.h1 
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight text-[#F5F5DC]"
      >
        Welcome to <br />
        <span className="italic font-light">my imagination</span>
      </motion.h1>
      <motion.div 
        initial={{ width: 0 }} animate={{ width: "100px" }} transition={{ delay: 1, duration: 1 }}
        className="h-[1px] bg-[#F5F5DC] mx-auto mb-8"
      />
      <motion.p 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="max-w-md mx-auto text-[#F5F5DC]/80 font-light text-lg"
      >
        "Crafting digital experiences where logic meets artistry."
      </motion.p>
    </div>

    <motion.div 
      animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
      className="absolute bottom-10 inset-x-0 flex justify-center text-xs uppercase tracking-widest opacity-50 text-[#F5F5DC]"
    >
      Scroll to Explore
    </motion.div>
  </section>
);

export default Intro;
