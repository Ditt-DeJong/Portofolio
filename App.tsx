import React, { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowRight, Music, Terminal, ChefHat, Zap, MessageSquare, Sparkles, Send, Loader2, Menu, X } from 'lucide-react';

// --- UTILS: SAFE GEMINI CALLER ---
const generateGeminiContent = async (prompt, systemInstruction = "") => {
  const apiKey = ""; // Masukkan API Key jika ada. Jika kosong, mode demo aktif.
  
  if (!apiKey) {
    console.warn("API Key missing. Returning null for demo mode.");
    return null;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  try {
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

// --- DATA & CONTENT ---
const DATA = {
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

// --- GLOBAL STYLES (INJECTED) ---
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;700&display=swap');
    
    body {
      background-color: #F5F5DC;
      color: #14213D;
      font-family: 'Plus Jakarta Sans', sans-serif;
      cursor: none;
      overflow-x: hidden;
      margin: 0;
    }
    
    h1, h2, h3, .serif {
      font-family: 'Playfair Display', serif;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #F5F5DC; }
    ::-webkit-scrollbar-thumb { background: #14213D; border-radius: 4px; opacity: 0.5; }
    
    /* Grain Texture */
    .grain-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 9998; opacity: 0.08;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      filter: invert(1);
    }
  `}} />
);

// --- COMPONENTS ---

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    const handleMouseOver = (e) => {
      const t = e.target;
      // Cek apakah elemen interaktif
      const isInteractive = t?.tagName === 'BUTTON' || t?.tagName === 'A' || t?.tagName === 'INPUT' || t?.closest('button') || t?.closest('a');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#14213D] rounded-full pointer-events-none z-[9999]"
        animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6, scale: isHovering ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[#14213D] rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 20, y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1, opacity: isHovering ? 0.8 : 0.4
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center text-[#14213D]"
    >
      <div className="text-2xl font-bold serif tracking-wider cursor-pointer z-50">
        IMAGINATION.
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8">
        {DATA.nav.map((item) => (
          <button 
            key={item} 
            onClick={() => scrollToSection(item)}
            className="text-sm uppercase tracking-widest hover:line-through decoration-[#14213D] transition-all font-medium"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Mobile Toggle */}
      <button className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="text-[#F5F5DC]" /> : <Menu className="text-[#14213D]" />}
      </button>
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            key="mobile-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#14213D] text-[#F5F5DC] flex flex-col items-center justify-center gap-8 z-40"
          >
            {DATA.nav.map((item) => (
              <button 
                key={item} onClick={() => scrollToSection(item)}
                className="text-3xl serif italic hover:text-[#F5F5DC]/50 transition-colors"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const ProjectCard = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  function handleMouse(event) {
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
        className="relative w-full h-full rounded-xl bg-[#14213D]/5 border border-[#14213D]/10 backdrop-blur-sm cursor-pointer group"
      >
        <div style={{ transform: "translateZ(50px)" }} className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
          <div className="mb-auto w-full h-48 bg-[#F5F5DC] rounded-lg flex items-center justify-center border border-[#14213D]/10 group-hover:border-[#14213D]/30 transition-colors shadow-inner">
            <span className="text-[#14213D]/30 text-sm tracking-widest uppercase">Project Preview</span>
          </div>
          <h3 className="text-2xl font-bold mb-2 serif text-[#14213D]">{project.title}</h3>
          <p className="text-sm text-[#14213D]/70 mb-4">{project.desc}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="text-[10px] uppercase tracking-wider border border-[#14213D]/20 px-2 py-1 rounded-full text-[#14213D]/60">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SousChef = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Bonjour! I am the Sous-Chef. Ask me anything about the Head Chef's skills or menu." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setIsLoading(true);

    const systemPrompt = `You are a professional Sous-Chef for a 17 y/o developer portfolio. Answer concisely using culinary metaphors.`;

    try {
      const response = await generateGeminiContent(userMsg, systemPrompt);
      
      // Delay sedikit agar terasa natural jika response terlalu cepat (demo mode)
      setTimeout(() => {
        if (response) {
          setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        } else {
          setMessages(prev => [...prev, { role: 'assistant', text: "Mode Demo: Saya tidak dapat terhubung ke server utama (API Key belum diisi), tapi saya mengerti Anda bertanya tentang: " + userMsg }]);
        }
        setIsLoading(false);
      }, 800);
      
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Pardon, the kitchen is too noisy right now." }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 md:w-96 bg-[#F5F5DC] border border-[#14213D]/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-4 bg-[#14213D]/5 border-b border-[#14213D]/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ChefHat size={18} className="text-[#14213D]" />
                <span className="font-serif italic text-[#14213D]">Sous-Chef AI</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={16} className="text-[#14213D]/50 hover:text-[#14213D]" /></button>
            </div>
            
            <div ref={scrollRef} className="h-64 overflow-y-auto p-4 space-y-3 bg-[#F5F5DC]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${m.role === 'user' ? 'bg-[#14213D] text-[#F5F5DC]' : 'bg-[#14213D]/10 text-[#14213D]'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-[#14213D]/50 text-xs italic flex items-center gap-2"><Loader2 className="animate-spin" size={12}/> Cooking response...</div>}
            </div>

            <div className="p-3 border-t border-[#14213D]/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about the chef..."
                className="flex-1 bg-transparent border border-[#14213D]/20 rounded-lg px-3 py-2 text-sm text-[#14213D] focus:outline-none focus:border-[#14213D]/50"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-[#14213D] text-[#F5F5DC] rounded-lg hover:bg-[#14213D]/80 transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#14213D] rounded-full flex items-center justify-center text-[#F5F5DC] shadow-lg hover:scale-110 transition-transform"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

const Kitchen = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const cookIdea = async () => {
    if (!ingredients) return;
    setLoading(true);
    setRecipe(null);

    const prompt = `Create a unique web project idea using: ${ingredients}. Return JSON ONLY: { "title": "...", "description": "...", "features": ["..."] }.`;

    try {
      const resultText = await generateGeminiContent(prompt);
      
      if (!resultText) {
         setTimeout(() => {
             setRecipe({ 
                title: "Demo Mode Soufflé", 
                description: "Karena API Key belum diisi, ini adalah contoh hasil.",
                features: ["Add API Key to Enable AI", "Interactive UI", "Real-time generation"]
              });
             setLoading(false);
         }, 1000);
         return;
      }

      // --- CRITICAL FIX: Safe JSON Parsing ---
      // Cari substring yang dimulai dengan { dan diakhiri dengan }
      // Ini mencegah crash jika AI menjawab "Here is the JSON: { ... }"
      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      const cleanJson = jsonMatch ? jsonMatch[0] : resultText;
      
      const parsed = JSON.parse(cleanJson);
      setRecipe(parsed);
    } catch (e) {
      console.error("JSON Parse Error:", e);
      setRecipe({ 
        title: "Burnt Toast (Error)", 
        description: "The AI Chef got confused. Please try simpler ingredients.",
        features: ["Try Again", "Check Console"]
      });
    }
    setLoading(false);
  };

  return (
    <section id="kitchen" className="min-h-screen py-24 px-6 relative flex flex-col justify-center">
      <div className="container mx-auto max-w-4xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
           className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-[#14213D]" size={32} />
            <h2 className="text-4xl md:text-5xl serif italic text-[#14213D]">The Experimental Kitchen</h2>
          </div>
          <p className="text-[#14213D]/60 max-w-lg mx-auto">
            Stuck on ideas? Toss some tech ingredients into the pot and let our AI Chef cook up a project concept for you.
          </p>
        </motion.div>

        <div className="bg-[#14213D]/5 border border-[#14213D]/10 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input 
              type="text" 
              placeholder="Enter ingredients (e.g., React, AI, Three.js)..." 
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="flex-1 bg-[#F5F5DC]/50 border border-[#14213D]/20 rounded-xl px-6 py-4 text-[#14213D] focus:outline-none focus:border-[#14213D] transition-all"
            />
            <button 
              onClick={cookIdea}
              disabled={loading}
              className="bg-[#14213D] text-[#F5F5DC] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#14213D]/90 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <ChefHat />}
              <span>Cook Idea ✨</span>
            </button>
          </div>

          <AnimatePresence>
            {recipe && (
              <motion.div
                key="recipe-result"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="border-t border-[#14213D]/10 pt-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl serif text-[#14213D]">{recipe.title}</h3>
                    <span className="bg-[#14213D]/20 text-[#14213D] px-3 py-1 rounded-full text-xs uppercase tracking-wider">Chef's Special</span>
                  </div>
                  <p className="text-[#14213D]/80 mb-6 text-lg italic font-light">"{recipe.description}"</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {recipe.features?.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-[#14213D]/70">
                        <Zap size={16} className="text-[#14213D]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Intro = () => (
  <section id="intro" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-6">
    <motion.div 
      animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#14213D] rounded-full blur-[120px] mix-blend-multiply opacity-10"
    />
    <motion.div 
      animate={{ scale: [1, 1.5, 1], rotate: [0, -180, 0], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-800 rounded-full blur-[120px] mix-blend-multiply opacity-10"
    />

    <div className="relative z-10 text-center">
      <motion.p 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="text-[#14213D]/60 uppercase tracking-[0.3em] text-sm mb-4"
      >
        Portfolio 2024
      </motion.p>
      <motion.h1 
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight text-[#14213D]"
      >
        Welcome to <br />
        <span className="italic font-light">my imagination</span>
      </motion.h1>
      <motion.div 
        initial={{ width: 0 }} animate={{ width: "100px" }} transition={{ delay: 1, duration: 1 }}
        className="h-[1px] bg-[#14213D] mx-auto mb-8"
      />
      <motion.p 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="max-w-md mx-auto text-[#14213D]/80 font-light text-lg"
      >
        "Crafting digital experiences where logic meets artistry."
      </motion.p>
    </div>

    <motion.div 
      animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest opacity-50 text-[#14213D]"
    >
      Scroll to Explore
    </motion.div>
  </section>
);

const About = () => (
  <section id="about" className="min-h-screen py-24 px-6 relative flex items-center">
    <div className="container mx-auto">
      <motion.h2 
        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
        className="text-4xl md:text-6xl mb-16 italic text-[#14213D]"
      >
        Who is the <span className="font-bold underline decoration-1 underline-offset-8">chef</span> here?
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-12">
          <div className="border-l-2 border-[#14213D]/20 pl-6">
            <span className="block text-[#14213D]/40 uppercase tracking-widest text-sm mb-2">Age</span>
            <span className="text-3xl font-light text-[#14213D]">{DATA.about.age}</span>
          </div>
          
          <div className="border-l-2 border-[#14213D]/20 pl-6">
            <span className="block text-[#14213D]/40 uppercase tracking-widest text-sm mb-2">Special Menu</span>
            <div className="flex items-center gap-3">
              <ChefHat className="w-6 h-6 text-[#14213D]" />
              <span className="text-3xl font-light text-[#14213D]">{DATA.about.specialMenu}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-6">
            {DATA.about.tags.map((tag, i) => (
              <motion.div 
                key={i} whileHover={{ scale: 1.05, backgroundColor: "rgba(20, 33, 61, 0.1)" }}
                className="flex items-center gap-2 px-4 py-2 border border-[#14213D]/30 rounded-full cursor-default text-[#14213D]"
              >
                <tag.icon size={16} />
                <span className="text-sm">{tag.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="aspect-[3/4] md:aspect-square bg-[#14213D]/5 rounded-2xl border border-[#14213D]/10 relative overflow-hidden group"
        >
           <div className="absolute inset-0 flex items-center justify-center text-[#14213D]/20 group-hover:text-[#14213D]/40 transition-colors">
             <span className="text-lg uppercase tracking-widest border border-dashed border-[#14213D]/30 px-8 py-4">
               Insert Your Photo Here
             </span>
           </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section id="project" className="min-h-screen py-24 px-6 relative">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <motion.h2 
           initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
           className="text-4xl md:text-6xl text-[#14213D]"
        >
          What do <span className="italic text-[#14213D]/50">you</span> have?
        </motion.h2>
        <p className="text-[#14213D]/60 mt-4 md:mt-0 max-w-sm text-right">
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

const Achievements = () => (
  <section id="achievement" className="min-h-screen py-24 px-6 relative flex flex-col justify-center">
    <div className="container mx-auto">
      <motion.h2 
         initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
         className="text-center text-4xl md:text-6xl mb-20 text-[#14213D]"
      >
        Where’s the <span className="font-serif italic border-b-2 border-[#14213D]">proof</span>?
      </motion.h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {DATA.achievements.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ x: 20, backgroundColor: "rgba(20, 33, 61, 0.05)" }}
            className="flex items-center justify-between border-b border-[#14213D]/20 py-8 px-4 cursor-pointer group text-[#14213D]"
          >
            <div className="flex items-center gap-6">
              <span className="text-[#14213D]/30 font-mono text-sm">0{i + 1}</span>
              <div>
                <h3 className="text-2xl font-light group-hover:text-[#14213D] transition-colors">{item.title}</h3>
                <p className="text-sm text-[#14213D]/50">{item.issuer}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <span className="text-[#14213D]/40 font-mono text-sm border border-[#14213D]/20 px-2 py-1 rounded">{item.year}</span>
               <ArrowRight className="w-5 h-5 text-[#14213D]/0 group-hover:text-[#14213D] transition-all opacity-0 group-hover:opacity-100" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-[#14213D]/10 text-center text-[#14213D]">
    <p className="font-serif italic text-2xl mb-4">Let's cook something together.</p>
    <p className="text-sm text-[#14213D]/40 uppercase tracking-widest">© 2024 Imagination Portfolio.</p>
  </footer>
);

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-[#14213D] selection:text-[#F5F5DC]">
      <GlobalStyles />
      <div className="grain-overlay"></div>
      
      <CustomCursor />
      <Navbar />
      
      <main>
        <Intro />
        <About />
        <Projects />
        <Kitchen /> 
        <Achievements />
      </main>
      
      <SousChef /> 
      <Footer />
    </div>
  );
}