'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '@/lib/data';
import ProjectCard from '@/components/ui/ProjectCard';

const Projects = () => (
  <section id="project" className="min-h-screen py-24 px-6 relative">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <motion.h2 
           initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
           className="text-4xl md:text-6xl text-[#F5F5DC]"
        >
          What do <span className="italic text-[#F5F5DC]/50">you</span> have?
        </motion.h2>
        <p className="text-[#F5F5DC]/60 mt-4 md:mt-0 max-w-sm text-right">
          Selected works that showcase the blend of logic and design.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DATA.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
