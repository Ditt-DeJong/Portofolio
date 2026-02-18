import { Music, Terminal, Zap } from 'lucide-react';

export const DATA = {
  nav: ['Intro', 'About', 'Project', 'Kitchen', 'Achievement'],
  about: {
    age: "17 Tahun",
    specialMenu: "React.js & Creative Interaction",
    tags: [
      { icon: Music, text: "Music Enthusiast" },
      { icon: Terminal, text: "Front-end Dev" },
      { icon: Zap, text: "Grow in Silence" }
    ]
  },
  projects: [
    {
      title: "Ethereal Commerce",
      desc: "Platform e-commerce dengan pengalaman belanja 3D immersive.",
      tech: ["Next.js", "Three.js", "Tailwind"],
      id: 1
    },
    {
      title: "Nexus Dashboard",
      desc: "SaaS Analytics dashboard dengan visualisasi data real-time.",
      tech: ["React", "D3.js", "Firebase"],
      id: 2
    },
    {
      title: "Zenith Portfolio",
      desc: "Template portofolio minimalis untuk fotografer kelas dunia.",
      tech: ["Vue", "GSAP", "Strapi"],
      id: 3
    }
  ],
  achievements: [
    { title: "Juara 1 LKS Web Tech", issuer: "Tingkat Provinsi", year: "2024" },
    { title: "Best UI/UX Design", issuer: "Hackathon Nasional", year: "2023" },
    { title: "Google Certified Dev", issuer: "Google Developer Group", year: "2023" }
  ]
};
