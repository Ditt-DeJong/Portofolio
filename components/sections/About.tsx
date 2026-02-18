'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';
import { DATA } from '@/lib/data';

const About = () => (
  <section id="about" className="min-h-screen py-24 px-6 relative flex items-center">
    <div className="container mx-auto">
      <motion.h2 
        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
        className="text-4xl md:text-6xl mb-16 italic text-[#F5F5DC]"
      >
        Who is the <span className="font-bold underline decoration-1 underline-offset-8">chef</span> here?
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-12">
          <div className="border-l-2 border-[#F5F5DC]/20 pl-6">
            <span className="block text-[#F5F5DC]/40 uppercase tracking-widest text-sm mb-2">Age</span>
            <span className="text-3xl font-light text-[#F5F5DC]">{DATA.about.age}</span>
          </div>
          
          <div className="border-l-2 border-[#F5F5DC]/20 pl-6">
            <span className="block text-[#F5F5DC]/40 uppercase tracking-widest text-sm mb-2">Special Menu</span>
            <div className="flex items-center gap-3">
              <ChefHat className="w-6 h-6 text-[#F5F5DC]" />
              <span className="text-3xl font-light text-[#F5F5DC]">{DATA.about.specialMenu}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-6">
            {DATA.about.tags.map((tag, i) => (
              <motion.div 
                key={i} whileHover={{ scale: 1.05, backgroundColor: "rgba(245, 245, 220, 0.1)" }}
                className="flex items-center gap-2 px-4 py-2 border border-[#F5F5DC]/30 rounded-full cursor-default text-[#F5F5DC]"
              >
                <tag.icon size={16} />
                <span className="text-sm">{tag.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="aspect-[3/4] md:aspect-square bg-[#F5F5DC]/5 rounded-2xl border border-[#F5F5DC]/10 relative overflow-hidden group"
        >
           <div className="absolute inset-0 flex items-center justify-center text-[#F5F5DC]/20 group-hover:text-[#F5F5DC]/40 transition-colors">
             <span className="text-lg uppercase tracking-widest border border-dashed border-[#F5F5DC]/30 px-8 py-4">
               Insert Your Photo Here
             </span>
           </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
