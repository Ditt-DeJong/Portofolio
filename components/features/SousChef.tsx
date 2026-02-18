'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, X, Send, MessageSquare, Loader2 } from 'lucide-react';
import { generateGeminiContent } from '@/lib/gemini';

const SousChef = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Bonjour! I am the Sous-Chef. Ask me anything about the Head Chef's skills or menu." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
            className="absolute bottom-16 right-0 w-80 md:w-96 bg-[#14213D] border border-[#F5F5DC]/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-4 bg-[#F5F5DC]/5 border-b border-[#F5F5DC]/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ChefHat size={18} className="text-[#F5F5DC]" />
                <span className="font-serif italic text-[#F5F5DC]">Sous-Chef AI</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={16} className="text-[#F5F5DC]/50 hover:text-[#F5F5DC]" /></button>
            </div>
            
            <div ref={scrollRef} className="h-64 overflow-y-auto p-4 space-y-3 bg-[#14213D]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${m.role === 'user' ? 'bg-[#F5F5DC] text-[#14213D]' : 'bg-[#F5F5DC]/10 text-[#F5F5DC]'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-[#F5F5DC]/50 text-xs italic flex items-center gap-2"><Loader2 className="animate-spin" size={12}/> Cooking response...</div>}
            </div>

            <div className="p-3 border-t border-[#F5F5DC]/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about the chef..."
                className="flex-1 bg-transparent border border-[#F5F5DC]/20 rounded-lg px-3 py-2 text-sm text-[#F5F5DC] focus:outline-none focus:border-[#F5F5DC]/50"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-[#F5F5DC] text-[#14213D] rounded-lg hover:bg-[#F5F5DC]/80 transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#F5F5DC] rounded-full flex items-center justify-center text-[#14213D] shadow-lg hover:scale-110 transition-transform"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

export default SousChef;
