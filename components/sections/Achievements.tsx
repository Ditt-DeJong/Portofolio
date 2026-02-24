'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Award, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { DATA } from '@/lib/data';

const Achievements = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedItem = selectedIndex !== null ? DATA.achievements[selectedIndex] : null;

  const goNext = () => {
    if (selectedIndex !== null && selectedIndex < DATA.achievements.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const goBack = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goBack();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  return (
    <section id="achievement" className="min-h-screen py-24 px-8 md:px-12 lg:px-20 relative flex flex-col justify-center">
      <div className="container mx-auto">
        <motion.h2 
           initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
           className="text-center text-4xl md:text-6xl mb-20 text-[#F5F5DC]"
        >
          Where's the <span className="font-serif italic border-b-2 border-[#F5F5DC]">proof</span>?
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {DATA.achievements.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ x: 20, backgroundColor: "rgba(245, 245, 220, 0.05)" }}
              onClick={() => {
                if (item.fileUrl) setSelectedIndex(i);
              }}
              className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#F5F5DC]/20 py-8 px-4 cursor-pointer group text-[#F5F5DC] gap-4 md:gap-0"
            >
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-[#F5F5DC]/30 font-mono text-sm">0{i + 1}</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-light group-hover:text-[#F5F5DC] transition-colors">{item.title}</h3>
                  <p className="text-sm text-[#F5F5DC]/50">{item.issuer}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 self-end md:self-auto">
                 <span className="text-[#F5F5DC]/40 font-mono text-sm border border-[#F5F5DC]/20 px-2 py-1 rounded">{item.year}</span>
                 <ArrowRight className="w-5 h-5 text-[#F5F5DC]/0 group-hover:text-[#F5F5DC] transition-all opacity-0 group-hover:opacity-100 hidden md:block group-hover:translate-x-1" />
                 <ArrowRight className="w-5 h-5 text-[#F5F5DC] md:hidden opacity-50" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedItem && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 md:p-8"
          >
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[85vh] flex flex-col bg-[#0a0a0a] border border-[#F5F5DC]/15 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-[#F5F5DC]/10 bg-[#F5F5DC]/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5F5DC]/10 flex items-center justify-center">
                    <Award className="w-4 h-4 text-[#F5F5DC]/60" />
                  </div>
                  <div>
                    <h3 className="text-[#F5F5DC] text-sm font-medium tracking-wide">{selectedItem.title}</h3>
                    <p className="text-[#F5F5DC]/30 text-xs tracking-wider">{selectedItem.issuer} · {selectedItem.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#F5F5DC]/20 text-xs font-mono tracking-widest mr-2">
                    {selectedIndex + 1}/{DATA.achievements.length}
                  </span>
                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="p-2 text-[#F5F5DC]/40 hover:text-[#F5F5DC] hover:bg-[#F5F5DC]/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content — Image preview */}
              <div className="flex-1 flex items-center justify-center overflow-auto bg-gradient-to-b from-[#0a0a0a] to-[#111] p-6">
                <motion.img
                  key={selectedItem.fileUrl}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={selectedItem.fileUrl}
                  alt={selectedItem.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-[#F5F5DC]/10 bg-[#F5F5DC]/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={goBack}
                    disabled={selectedIndex <= 0}
                    className="p-2 rounded-lg border border-[#F5F5DC]/15 text-[#F5F5DC]/40 hover:text-[#F5F5DC] hover:border-[#F5F5DC]/30 hover:bg-[#F5F5DC]/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={goNext}
                    disabled={selectedIndex >= DATA.achievements.length - 1}
                    className="p-2 rounded-lg border border-[#F5F5DC]/15 text-[#F5F5DC]/40 hover:text-[#F5F5DC] hover:border-[#F5F5DC]/30 hover:bg-[#F5F5DC]/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <a
                  href={selectedItem.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F5F5DC]/35 hover:text-[#F5F5DC] border border-[#F5F5DC]/15 px-5 py-2 rounded-full hover:bg-[#F5F5DC]/10 hover:border-[#F5F5DC]/30 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open full size
                </a>
              </div>
            </motion.div>

            {/* Keyboard hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[#F5F5DC]/15 text-[10px] tracking-widest uppercase"
            >
              <span>← → Navigate</span>
              <span>·</span>
              <span>ESC Close</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;
