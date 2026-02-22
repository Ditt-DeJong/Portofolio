'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimationControls, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ChefHat, ArrowLeft, Maximize2, MousePointerClick, RotateCcw } from 'lucide-react';
import { DATA } from '@/lib/data';
import Image from 'next/image';

const CATEGORIES = {
  Active: [1, 7, 11, 12, 18, 19, 24, 26, 29, 30, 32],
  Uniform: [2, 4, 9, 14, 15, 20, 21, 22, 25, 27, 28, 30],
  'Little Silliness': [3, 5, 6, 8, 10, 13, 16, 17, 23, 31],
};

// Bloop component that wanders randomly within the section
const WanderingBloop = ({
  label,
  onClick,
  sectionRef,
  size,
  bgClass,
  delay,
}: {
  label: string | React.ReactNode;
  onClick: () => void;
  sectionRef: React.RefObject<HTMLElement | null>;
  size: string;
  bgClass: string;
  delay: number;
}) => {
  const controls = useAnimationControls();
  const bloopRef = useRef<HTMLButtonElement>(null);

  const getRandomPosition = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return { x: 0, y: 0 };
    
    const sectionRect = section.getBoundingClientRect();
    const bloopSize = 176; 
    const padding = 20;
    
    const maxX = sectionRect.width - bloopSize - padding * 2;
    const maxY = sectionRect.height - bloopSize - padding * 2;
    
    return {
      x: padding + Math.random() * Math.max(0, maxX),
      y: padding + Math.random() * Math.max(0, maxY),
    };
  }, [sectionRef]);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const wander = async () => {
      await new Promise(resolve => {
        timeoutId = setTimeout(resolve, delay);
      });

      while (isMounted) {
        const pos = getRandomPosition();
        await controls.start({
          x: pos.x,
          y: pos.y,
          transition: {
            duration: 6 + Math.random() * 4,
            ease: [0.25, 0.1, 0.25, 1],
          },
        });
        await new Promise(resolve => {
          timeoutId = setTimeout(resolve, 500 + Math.random() * 1500);
        });
      }
    };

    wander();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [controls, getRandomPosition, delay]);

  return (
    <motion.button
      ref={bloopRef}
      animate={controls}
      onClick={onClick}
      whileHover={{ scale: 1.15, boxShadow: "0 0 40px rgba(245, 245, 220, 0.3)" }}
      className={`absolute top-0 left-0 ${size} rounded-full ${bgClass} border border-[#F5F5DC]/20 backdrop-blur-md flex items-center justify-center text-[#F5F5DC] font-medium tracking-wider text-sm md:text-base z-10 transition-colors hover:bg-[#F5F5DC]/20 p-4 cursor-pointer`}
    >
      {label}
    </motion.button>
  );
};

// Swipeable Card component
const SwipeCard = ({
  imageNum,
  category,
  index,
  totalCards,
  onSwipe,
  onTap,
  isTop,
}: {
  imageNum: number;
  category: string;
  index: number;
  totalCards: number;
  onSwipe: () => void;
  onTap: () => void;
  isTop: boolean;
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-25, 0, 25]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0.5, 1, 1, 1, 0.5]);
  const nextLabelOpacity = useTransform(x, [0, 100], [0, 1]);
  const skipLabelOpacity = useTransform(x, [-100, 0], [1, 0]);

  // Card stack offset — cards behind are slightly scaled down and offset
  const stackScale = isTop ? 1 : Math.max(0.9, 1 - index * 0.04);
  const stackY = isTop ? 0 : index * 12;
  const stackOpacity = Math.max(0, 1 - index * 0.2);

  const [exitX, setExitX] = useState(0);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 120;
    if (Math.abs(info.offset.x) > threshold) {
      setExitX(info.offset.x > 0 ? 500 : -500);
      onSwipe();
    }
  };

  if (index > 3) return null; // Only render top 4 cards for performance

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : `${(index % 2 === 0 ? 1 : -1) * index * 1.5}deg`,
        opacity: isTop ? opacity : stackOpacity,
        zIndex: totalCards - index,
      }}
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{
        scale: stackScale,
        y: stackY,
        opacity: stackOpacity,
      }}
      exit={{
        x: exitX || 500,
        opacity: 0,
        rotate: exitX >= 0 ? 25 : -25,
        transition: { duration: 0.4 },
      }}
      drag={isTop ? "x" : false}
      dragElastic={1}
      onDragEnd={isTop ? handleDragEnd : undefined}
      whileHover={isTop ? { scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={`absolute inset-0 rounded-2xl overflow-hidden border border-[#F5F5DC]/15 shadow-2xl ${isTop ? 'cursor-grab active:cursor-grabbing' : ''}`}
    >
      <Image
        src={`/images/Aku (${imageNum}).jpeg`}
        alt={`${category} photo ${imageNum}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 80vw, 400px"
        priority={isTop}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      
      {/* Card info at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[#F5F5DC]/50 text-[10px] tracking-[0.3em] uppercase block mb-1">
              {category}
            </span>
            <span className="text-[#F5F5DC] text-lg font-light tracking-wider">
              Photo #{String(totalCards - index).padStart(2, '0')}
            </span>
          </div>
          {isTop && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Maximize2 className="text-[#F5F5DC]/50 w-5 h-5" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Swipe direction indicators for top card */}
      {isTop && (
        <>
          <motion.div
            style={{ opacity: nextLabelOpacity }}
            className="absolute top-6 right-6 px-3 py-1.5 rounded-full border-2 border-green-400/80 text-green-400/80 text-xs font-bold tracking-widest uppercase rotate-12"
          >
            Next →
          </motion.div>
          <motion.div
            style={{ opacity: skipLabelOpacity }}
            className="absolute top-6 left-6 px-3 py-1.5 rounded-full border-2 border-red-400/80 text-red-400/80 text-xs font-bold tracking-widest uppercase -rotate-12"
          >
            ← Skip
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

const About = () => {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORIES | null>(null);
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  const [swipedCards, setSwipedCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Get remaining cards (not yet swiped)
  const currentImages = selectedCategory ? CATEGORIES[selectedCategory] : [];
  const remainingCards = currentImages.filter((_, i) => !swipedCards.includes(i));
  const swipedCount = swipedCards.length;

  // Lightbox navigation
  const currentLightboxIndex = lightboxImage !== null ? currentImages.indexOf(lightboxImage) : -1;

  const goToNext = () => {
    if (currentLightboxIndex < currentImages.length - 1) {
      setLightboxImage(currentImages[currentLightboxIndex + 1]);
    }
  };

  const goToPrev = () => {
    if (currentLightboxIndex > 0) {
      setLightboxImage(currentImages[currentLightboxIndex - 1]);
    }
  };

  const handleSwipe = () => {
    const currentTopIndex = currentImages.indexOf(remainingCards[0]);
    setSwipedCards(prev => [...prev, currentTopIndex]);
  };

  const handleReset = () => {
    setSwipedCards([]);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setSwipedCards([]);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxImage === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-24 px-8 md:px-12 lg:px-20 relative flex items-center overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F5F5DC]/5 blur-[120px] rounded-full -z-10" />
      
      {/* Wandering Bloops */}
      <AnimatePresence>
        {!selectedCategory && (
          <>
            <WanderingBloop
              label="Active"
              onClick={() => setSelectedCategory('Active')}
              sectionRef={sectionRef}
              size="w-32 h-32 md:w-40 md:h-40"
              bgClass="bg-[#F5F5DC]/10"
              delay={0}
            />
            <WanderingBloop
              label="Uniform"
              onClick={() => setSelectedCategory('Uniform')}
              sectionRef={sectionRef}
              size="w-28 h-28 md:w-36 md:h-36"
              bgClass="bg-[#F5F5DC]/5"
              delay={1500}
            />
            <WanderingBloop
              label={<>Little<br/>Silliness</>}
              onClick={() => setSelectedCategory('Little Silliness')}
              sectionRef={sectionRef}
              size="w-36 h-36 md:w-44 md:h-44"
              bgClass="bg-[#F5F5DC]/[0.08]"
              delay={3000}
            />
          </>
        )}
      </AnimatePresence>

      <div className="container mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="text-4xl md:text-6xl italic text-[#F5F5DC] mt-20 -mb-6"
        >
          Who is the <span className="font-bold underline decoration-1 underline-offset-8">chef</span> here?
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start pt-10">
          <div className="space-y-12 mt-40">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="border-l-2 border-[#F5F5DC]/20 pl-6">
                <span className="block text-[#F5F5DC]/40 uppercase tracking-widest text-sm mb-2">Age</span>
                <span className="text-3xl font-light text-[#F5F5DC]">{DATA.about.age}</span>
              </div>

              <div className="border-l-2 border-[#F5F5DC]/20 pl-6">
                <span className="block text-[#F5F5DC]/40 uppercase tracking-widest text-sm mb-2">Ownership</span>
                <span className="text-3xl font-light text-[#F5F5DC]">{DATA.about.ownership}</span>
              </div>
              
              <div className="border-l-2 border-[#F5F5DC]/20 pl-6">
                <span className="block text-[#F5F5DC]/40 uppercase tracking-widest text-sm mb-2">Special Menu</span>
                <div className="flex items-center gap-3">
                  <ChefHat className="w-6 h-6 text-[#F5F5DC]" />
                  <span className="text-3xl font-light text-[#F5F5DC]">{DATA.about.specialMenu}</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-6"
            >
              {DATA.about.tags.map((tag, i) => (
                <motion.div 
                  key={i} whileHover={{ scale: 1.05, backgroundColor: "rgba(245, 245, 220, 0.1)" }}
                  className="flex items-center gap-2 px-4 py-2 border border-[#F5F5DC]/30 rounded-full cursor-default text-[#F5F5DC]"
                >
                  <tag.icon size={16} />
                  <span className="text-sm">{tag.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="relative min-h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!selectedCategory ? (
                <motion.div 
                  key="bloops-hint"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* Hint */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="absolute top-0 right-0 z-20"
                  >
                    <motion.div
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="flex flex-col items-end gap-2 bg-[#F5F5DC]/5 backdrop-blur-sm border border-[#F5F5DC]/10 rounded-xl px-4 py-3"
                    >
                      <div className="flex items-center gap-2 text-[#F5F5DC]/60">
                        <MousePointerClick className="w-4 h-4" />
                        <span className="text-xs tracking-widest uppercase">Click the floating bloops</span>
                      </div>
                      <span className="text-[10px] tracking-wider uppercase text-[#F5F5DC]/30">
                        They wander around — catch them!
                      </span>
                    </motion.div>
                  </motion.div>

                  <svg className="w-[300px] h-[300px] opacity-10" viewBox="0 0 400 400">
                    <motion.circle 
                      cx="200" cy="200" r="150" fill="none" stroke="#F5F5DC" strokeWidth="0.5" strokeDasharray="5 5"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>
                </motion.div>
              ) : (
                <motion.div 
                  key="card-stack"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between w-full mb-6">
                    <button 
                      onClick={handleBack}
                      className="flex items-center gap-2 text-[#F5F5DC]/60 hover:text-[#F5F5DC] transition-colors group"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      <span className="text-sm font-medium tracking-widest uppercase">Back</span>
                    </button>
                    <h3 className="text-[#F5F5DC] font-light tracking-[0.2em] uppercase text-sm">
                      <span className="font-bold border-b border-[#F5F5DC]/30 pb-1">{selectedCategory}</span>
                    </h3>
                  </div>

                  {/* Card Stack Container */}
                  <div className="relative w-full max-w-[340px] aspect-[3/4] overflow-hidden">
                    <AnimatePresence>
                      {remainingCards.length > 0 ? (
                        [...remainingCards].reverse().map((num, reverseIdx) => {
                          const actualIdx = remainingCards.length - 1 - reverseIdx;
                          return (
                            <SwipeCard
                              key={`${selectedCategory}-${num}`}
                              imageNum={num}
                              category={selectedCategory}
                              index={actualIdx}
                              totalCards={currentImages.length}
                              onSwipe={handleSwipe}
                              onTap={() => setLightboxImage(num)}
                              isTop={actualIdx === 0}
                            />
                          );
                        })
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#F5F5DC]/20 bg-[#F5F5DC]/5"
                        >
                          <span className="text-[#F5F5DC]/40 text-sm tracking-widest uppercase mb-4">
                            No more cards
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleReset}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#F5F5DC]/30 text-[#F5F5DC]/70 hover:text-[#F5F5DC] hover:border-[#F5F5DC]/50 hover:bg-[#F5F5DC]/10 transition-all text-sm tracking-wider"
                          >
                            <RotateCcw className="w-4 h-4" />
                            Shuffle again
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Progress & Instructions */}
                  <div className="mt-8 flex flex-col items-center gap-3">
                    {/* Progress bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-[#F5F5DC]/30 text-xs tracking-widest">
                        {swipedCount}/{currentImages.length}
                      </span>
                      <div className="w-32 h-1 rounded-full bg-[#F5F5DC]/10 overflow-hidden">
                        <motion.div
                          className="h-full bg-[#F5F5DC]/40 rounded-full"
                          animate={{ width: `${(swipedCount / currentImages.length) * 100}%` }}
                          transition={{ type: "spring", stiffness: 200 }}
                        />
                      </div>
                    </div>

                    {/* Swipe instruction */}
                    {remainingCards.length > 0 && (
                      <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="flex items-center gap-2 text-[#F5F5DC]/25 text-[10px] tracking-[0.2em] uppercase"
                      >
                        <span>← Swipe to browse →</span>
                        <span>·</span>
                        <span>Tap to expand</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 text-[#F5F5DC]/60 hover:text-[#F5F5DC] transition-colors z-10 p-2 rounded-full border border-[#F5F5DC]/20 hover:border-[#F5F5DC]/40 hover:bg-[#F5F5DC]/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </motion.button>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-6 left-6 text-[#F5F5DC]/40 text-sm tracking-widest font-light"
            >
              {currentLightboxIndex + 1} / {currentImages.length}
            </motion.div>

            {/* Category label */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="absolute top-6 left-1/2 -translate-x-1/2 text-[#F5F5DC]/30 text-xs tracking-[0.3em] uppercase font-medium"
            >
              {selectedCategory}
            </motion.div>

            {/* Prev button */}
            {currentLightboxIndex > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                className="absolute left-4 md:left-8 text-[#F5F5DC]/40 hover:text-[#F5F5DC] transition-all p-3 rounded-full border border-[#F5F5DC]/10 hover:border-[#F5F5DC]/30 hover:bg-[#F5F5DC]/5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </motion.button>
            )}

            {/* Next button */}
            {currentLightboxIndex < currentImages.length - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 md:right-8 text-[#F5F5DC]/40 hover:text-[#F5F5DC] transition-all p-3 rounded-full border border-[#F5F5DC]/10 hover:border-[#F5F5DC]/30 hover:bg-[#F5F5DC]/5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </motion.button>
            )}

            {/* Main image */}
            <motion.div
              key={lightboxImage}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-[85vw] h-[75vh] md:w-[60vw] md:h-[80vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`/images/Aku (${lightboxImage}).jpeg`}
                alt={`${selectedCategory} photo ${lightboxImage}`}
                fill
                className="object-contain rounded-2xl"
                sizes="(max-width: 768px) 85vw, 60vw"
                priority
              />
            </motion.div>

            {/* Keyboard hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[#F5F5DC]/20 text-[10px] tracking-widest uppercase"
            >
              <span>← → Navigate</span>
              <span>·</span>
              <span>ESC Close</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(245, 245, 220, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 245, 220, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 245, 220, 0.4);
        }
      `}</style>
    </section>
  );
};

export default About;
