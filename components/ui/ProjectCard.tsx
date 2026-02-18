'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface Project {
  title: string;
  desc: string;
  tech: string[];
  id: number;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="h-[400px] w-full" style={{ perspective: 1000 }}>
      {/* Removed the mouse move handlers and dynamic rotation */}
      <div
        className="relative w-full h-full rounded-xl bg-[#F5F5DC]/5 border border-[#F5F5DC]/10 backdrop-blur-sm cursor-pointer group hover:bg-[#F5F5DC]/10 transition-colors duration-300"
      >
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
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
      </div>
    </div>
  );
};

export default ProjectCard;
