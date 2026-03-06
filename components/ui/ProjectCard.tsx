'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface Project {
  title: string;
  desc: string;
  tech: string[];
  id: number;
  image?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="h-[400px] w-full" style={{ perspective: 1000 }}>
      <div className="relative w-full h-full rounded-xl bg-[#F5F5DC]/5 border border-[#F5F5DC]/10 backdrop-blur-sm group hover:bg-[#F5F5DC]/10 transition-colors duration-300">
        <div className="absolute inset-0 p-6 flex flex-col h-full">
          {/* Browser Mockup Container */}
          <div className="w-full shrink-0 h-48 rounded-lg border border-[#F5F5DC]/10 bg-[#14213D] overflow-hidden flex flex-col group-hover:border-[#F5F5DC]/30 transition-all shadow-inner relative group-hover:shadow-[0_0_20px_rgba(245,245,220,0.1)]">
            {/* MacOS Window Top Bar */}
            <div className="h-6 bg-[#1a2b4c]/80 backdrop-blur-md border-b border-[#F5F5DC]/10 flex items-center px-3 gap-1.5 z-10 w-full shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_5px_rgba(248,113,113,0.5)]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.5)]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_5px_rgba(74,222,128,0.5)]"></div>
            </div>
            
            {/* Image Content */}
            <div className="flex-1 relative overflow-hidden bg-[#0A1128]">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-top filter brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[#F5F5DC]/30 text-sm tracking-widest uppercase">No Preview</span>
                </div>
              )}
            </div>
          </div>

          {/* Text Content */}
          <div className="mt-auto pt-6 flex flex-col gap-2">
            <h3 className="text-xl font-bold serif text-[#F5F5DC] line-clamp-1">{project.title}</h3>
            <p className="text-sm text-[#F5F5DC]/70 line-clamp-2 leading-relaxed">{project.desc}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tech.map(t => (
                <span key={t} className="text-[10px] uppercase tracking-wider border border-[#F5F5DC]/20 px-2 py-1 rounded-full text-[#F5F5DC]/60 group-hover:border-[#F5F5DC]/40 transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
