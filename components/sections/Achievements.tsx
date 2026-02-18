'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DATA } from '@/lib/data';

const Achievements = () => (
  <section id="achievement" className="min-h-screen py-24 px-6 relative flex flex-col justify-center">
    <div className="container mx-auto">
      <motion.h2 
         initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
         className="text-center text-4xl md:text-6xl mb-20 text-[#F5F5DC]"
      >
        Where’s the <span className="font-serif italic border-b-2 border-[#F5F5DC]">proof</span>?
      </motion.h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {DATA.achievements.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ x: 20, backgroundColor: "rgba(245, 245, 220, 0.05)" }}
            className="flex items-center justify-between border-b border-[#F5F5DC]/20 py-8 px-4 cursor-pointer group text-[#F5F5DC]"
          >
            <div className="flex items-center gap-6">
              <span className="text-[#F5F5DC]/30 font-mono text-sm">0{i + 1}</span>
              <div>
                <h3 className="text-2xl font-light group-hover:text-[#F5F5DC] transition-colors">{item.title}</h3>
                <p className="text-sm text-[#F5F5DC]/50">{item.issuer}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <span className="text-[#F5F5DC]/40 font-mono text-sm border border-[#F5F5DC]/20 px-2 py-1 rounded">{item.year}</span>
               <ArrowRight className="w-5 h-5 text-[#F5F5DC]/0 group-hover:text-[#F5F5DC] transition-all opacity-0 group-hover:opacity-100" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Achievements;
