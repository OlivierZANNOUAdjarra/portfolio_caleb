'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function WelcomeLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Le message reste visible pendant 2.5 secondes puis disparaît
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050c16] px-6 text-center"
        >
          {/* Petit effet de lumière en arrière-plan */}
          <div className="absolute h-[300px] w-[300px] rounded-full bg-electric/10 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative flex flex-col items-center gap-4"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-electric/10 text-electric">
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-display text-2xl font-bold tracking-wide text-white sm:text-3xl md:text-4xl"
            >
              Bienvenue sur le portail de <br />
              <span className="bg-gradient-to-r from-electric to-signal bg-clip-text text-transparent">
                AGBAKOU Caleb
              </span>
            </motion.h1>

            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
              className="h-0.5 bg-gradient-to-r from-electric to-signal"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
