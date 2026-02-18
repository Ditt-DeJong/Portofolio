'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChefHat, Loader2, Zap } from 'lucide-react';
import { generateGeminiContent } from '@/lib/gemini';

interface Recipe {
  title: string;
  description: string;
  features: string[];
}

const Kitchen = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
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
            <Sparkles className="text-[#F5F5DC]" size={32} />
            <h2 className="text-4xl md:text-5xl serif italic text-[#F5F5DC]">The Experimental Kitchen</h2>
          </div>
          <p className="text-[#F5F5DC]/60 max-w-lg mx-auto">
            Stuck on ideas? Toss some tech ingredients into the pot and let our AI Chef cook up a project concept for you.
          </p>
        </motion.div>

        <div className="bg-[#F5F5DC]/5 border border-[#F5F5DC]/10 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input 
              type="text" 
              placeholder="Enter ingredients (e.g., React, AI, Three.js)..." 
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="flex-1 bg-[#14213D]/50 border border-[#F5F5DC]/20 rounded-xl px-6 py-4 text-[#F5F5DC] focus:outline-none focus:border-[#F5F5DC] transition-all"
            />
            <button 
              onClick={cookIdea}
              disabled={loading}
              className="bg-[#F5F5DC] text-[#14213D] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#F5F5DC]/90 transition-all disabled:opacity-50"
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
                <div className="border-t border-[#F5F5DC]/10 pt-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl serif text-[#F5F5DC]">{recipe.title}</h3>
                    <span className="bg-[#F5F5DC]/20 text-[#F5F5DC] px-3 py-1 rounded-full text-xs uppercase tracking-wider">Chef's Special</span>
                  </div>
                  <p className="text-[#F5F5DC]/80 mb-6 text-lg italic font-light">"{recipe.description}"</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {recipe.features?.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-[#F5F5DC]/70">
                        <Zap size={16} className="text-[#F5F5DC]" />
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

export default Kitchen;
