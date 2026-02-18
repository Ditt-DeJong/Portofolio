'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import React from 'react';

interface Project {
  title: string;
  desc: string;
  tech: string[];
  id: number;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="h-[400px] w-full" style={{ perspective: 1000 }}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full rounded-xl bg-[#F5F5DC]/5 border border-[#F5F5DC]/10 backdrop-blur-sm cursor-pointer group"
      >
        <div style={{ transform: "translateZ(50px)" }} className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
          <div className="mb-auto w-full h-48 bg-[#14213D] rounded-lg flex items-center justify-center border border-[#F5F5DC]/10 group-hover:border-[#F5F5DC]/30 transition-colors shadow-inner">
            <span className="text-[#F5F5DC]/30 text-sm tracking-widest uppercase">Project Preview</span>
          </div>
          <h3 className="text-2xl font-bold mb-2 serif text-[#F5F5DC]">{project.title}</h3>
          <p className="text-sm text-[#F5F5DC]/70 mb-4">{project.desc}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="text-[10px] uppercase tracking-wider border border-[#F5F5DC]/20 px-2 py-1 rounded-full text-[#F5F5DC]/60">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
