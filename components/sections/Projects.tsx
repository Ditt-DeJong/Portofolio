'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, PanInfo } from 'framer-motion';
import { DATA } from '@/lib/data';
import ProjectCard from '@/components/ui/ProjectCard';

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Responsive State
  const [cardExampleWidth, setCardExampleWidth] = useState(350); 
  const [cardExampleHeight, setCardExampleHeight] = useState(400);

  const baseProjects = DATA.projects;
  const projects = [...baseProjects, ...baseProjects, ...baseProjects].slice(0, 9); 
  
  const cardCount = projects.length;
  // Dynamic radius based on card width
  const radius = Math.max((cardExampleWidth / 2) / Math.tan(Math.PI / cardCount) + 50, cardExampleWidth * 1.5); 

  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { damping: 20, stiffness: 50, mass: 1 });

  // Handle Resize for Responsive 3D
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardExampleWidth(260);
        setCardExampleHeight(320);
      } else {
        setCardExampleWidth(350);
        setCardExampleHeight(400);
      }
    };

    // Initial call
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number = 0;
    const speed = 0.05; 

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      
      if (!isDragging && !isHovering) {
        rotation.set(rotation.get() - speed * (delta / 16));
      }
      
      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, isHovering, rotation]);

  const handlePan = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const sensitivity = 0.15;
    rotation.set(rotation.get() + info.delta.x * sensitivity);
  };

  // Text Reveal Animation Variants
  const textRevealVariants = {
    hidden: { y: "100%" },
    visible: { 
      y: "0%",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="project" className="min-h-screen py-24 relative overflow-hidden flex flex-col justify-center bg-[#14213D] perspective-container px-8 md:px-12 lg:px-20">
      
      {/* 1. Ambient 'Aurora' Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-[#F5F5DC] opacity-10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#4cc9f0] opacity-5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="container mx-auto mb-12 relative z-10 pointer-events-none">
        <div className="flex flex-col md:flex-row justify-between items-end pointer-events-auto">
          {/* 5. Masked Text Reveal */}
          <div className="overflow-hidden">
            <motion.h2 
               initial="hidden" whileInView="visible" viewport={{ once: true }} variants={textRevealVariants}
               className="text-4xl md:text-6xl text-[#F5F5DC]"
            >
              What do <span className="italic text-[#F5F5DC]/50 pr-2">you</span> have?
            </motion.h2>
          </div>
          
          <div className="overflow-hidden mt-4 md:mt-0">
            <motion.div variants={textRevealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p className="text-[#F5F5DC]/60 max-w-sm text-right">
                Drag to spin. Hover to explore.
                </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ perspective: "2000px" }}
      >
         {/* 4. Floor Reflection */}
        <div 
            className="absolute bottom-[20px] md:bottom-[50px] left-1/2 -translate-x-1/2 w-[80%] max-w-[1000px] h-[60px] md:h-[100px] bg-[#000000] opacity-40 blur-[40px] md:blur-[50px] rounded-[100%]"
            style={{ zIndex: 0 }}
        />

        <motion.div
           className="relative flex items-center justify-center transform-style-3d z-10"
           style={{ 
             width: '100%',
             height: '100%',
             rotateY: smoothRotation,
             transformStyle: "preserve-3d",
           }}
           onPan={handlePan}
           onPanStart={() => setIsDragging(true)}
           onPanEnd={() => setIsDragging(false)}
        >
          {projects.map((project, index) => {
            const angle = (360 / cardCount) * index;
            return (
              <motion.div
                key={`${project.id}-${index}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: cardExampleWidth,
                  height: cardExampleHeight, // Height helper for finding center
                  transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
              >
                <div className="w-full h-full pointer-events-none">
                  <motion.div
                    className="w-full h-full pointer-events-auto"
                    whileHover={{ 
                      scale: 1.15,
                      zIndex: 100 
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
      <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#14213D] via-[#14213D]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#14213D] via-[#14213D]/80 to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default Projects;
