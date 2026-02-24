import { Music, Terminal, Zap } from 'lucide-react';

export const DATA = {
  nav: ['Intro', 'About', 'Project', 'Kitchen', 'Achievement'],
  about: {
    age: "17 Tahun",
    specialMenu: "React.js & Creative Interaction",
    ownership: "Someone Special",
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
    { title: "Revou Coding Camp Software Engineering", issuer: "Coding Camp", year: "2025", fileUrl: "/certificates/Coding Camp_page-0001.jpg" },
    { title: "FUSION-TECH Pemrograman", issuer: "Fusion Tech", year: "2024", fileUrl: "/certificates/FUSION-TECH - Pemrogaman.png" },
    { title: "IDTC", issuer: "IDTC", year: "2024", fileUrl: "/certificates/IDTC_page-0001.jpg" },
    { title: "ITC Web Design", issuer: "ITC", year: "2024", fileUrl: "/certificates/ITC - Web Design (1)_page-0001.jpg" },
    { title: "IT-CAS Pemenang", issuer: "IT-CAS", year: "2024", fileUrl: "/certificates/Sertifikat IT-CAS Pemenang -19 (2) (1)_page-0001.jpg" },
    { title: "Sertifikat Rifqi Aditya Rachman", issuer: "Sertifikat", year: "2024", fileUrl: "/certificates/Rifqi_Aditya_Rachman_page-0001.jpg" },
    { title: "Sertifikat Bahasa Indonesia", issuer: "Penghargaan", year: "2024", fileUrl: "/certificates/Rifqi Aditya Rachman - Bahasa Indonesia 7974_page-0003.jpg" },
    { title: "Sertifikat Penghargaan", issuer: "Penghargaan", year: "2024", fileUrl: "/certificates/Sertifikat_Rifqi Aditya Rachman (1).jpg" },
  ] as { title: string; issuer: string; year: string; fileUrl?: string }[]
};
