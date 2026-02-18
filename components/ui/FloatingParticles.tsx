'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingParticles = () => {
    // Client-side only rendering to avoid hydration mismatch
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
             {/* 
                 Using fixed positioning to ensure it stays in place while scrolling.
                 z-0 ensures it's behind content but visible. 
             */}
            {[...Array(20)].map((_, i) => {
                 // Generate random values only on client render
                 const width = Math.random() * 4 + 2 + "px";
                 const height = width; // Keep it circular
                 const left = Math.random() * 100 + "%";
                 const top = Math.random() * 100 + "%";
                 const duration = Math.random() * 20 + 10;
                 const delay = Math.random() * 5;

                 return (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-[#F5F5DC]"
                        style={{
                            width,
                            height,
                            left,
                            top,
                            opacity: 0.1, // Initial opacity
                        }}
                        animate={{
                            y: [0, -100], // Move up
                            opacity: [0.1, 0.4, 0.1], // Pulse
                        }}
                        transition={{
                            duration: duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: delay,
                        }}
                    />
                 );
            })}
        </div>
    );
};

export default FloatingParticles;
