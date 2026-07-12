'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Wrench, Cpu } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import FloatingToolIcons from '@/components/FloatingToolIcons';

// ASSOCIATION PRECISE : Nom affiché -> Nom du fichier dans public/
const TOOL_IMAGES: Record<string, string> = {
  // Logiciels
  "Adobe Photoshop": "photoshop.png",
  "Adobe Premiere Pro": "premiere.png",
  "Adobe After Effects": "aftereffects.png",
  "CapCut": "capcut.png",
  "Canva": "canva.png",
  
  // Intelligence Artificielle (selon votre image)
  "ChatGPT": "chatgpt.png",
  "Midjourney": "midjourney.png",
  "Bytedance Seedance": "seedance.png",
  "Kling AI": "kling.png",
  "Claude AI": "claude.png",
  "Leonardo AI": "leonardo.png",
  "Gemini": "gemini.png",
  "Ideogram": "ideogram.png",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ToolCard({ name, delay }: { name: string; delay: number }) {
  const imageFileName = TOOL_IMAGES[name];

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      custom={delay}
      variants={fadeUp}
      className="group relative flex flex-col items-center justify-center rounded-[2.5rem] border border-white/40 bg-white/80 p-8 shadow-xl shadow-black/[0.03] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-electric/10 dark:border-white/10 dark:bg-white/5 dark:shadow-none"
    >
      <div className="relative mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-inner dark:bg-white/10">
        {imageFileName ? (
          <Image
            src={`/${imageFileName}`}
            alt={name}
            width={56}
            height={56}
            className="h-14 w-14 object-contain transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          /* Avatar de secours avec dégradé si l'image est manquante */
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-electric/80 to-signal/80 text-2xl font-bold text-white">
            {name.charAt(0)}
          </div>
        )}
      </div>
      
      <p className="text-center font-display text-sm font-semibold tracking-tight text-ink/80 dark:text-paper/90">
        {name}
      </p>
    </motion.div>
  );
}

export default function ToolsSection() {
  const { t } = useLanguage();
  
  // Listes basées sur vos besoins
  const softwareList = ["Adobe Photoshop", "Adobe Premiere Pro", "Adobe After Effects", "CapCut", "Canva"];
  const aiList = ["ChatGPT", "Midjourney", "Bytedance Seedance", "Kling AI", "Claude AI", "Leonardo AI", "Gemini", "Ideogram"];

  return (
    <section id="outils" className="relative mx-auto max-w-6xl overflow-hidden px-6 py-24 sm:px-10">
      <FloatingToolIcons />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 mb-16 text-center"
      >
        <p className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.3em] text-electric">
          <Wrench className="h-3 w-3" />
          Mon Arsenal
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl dark:text-paper">
          Outils & Technologies
        </h2>
      </motion.div>

      <div className="relative z-10 space-y-20">
        {/* SECTION LOGICIELS */}
        <div>
          <div className="mb-8 flex items-center gap-4">
            <h3 className="font-display text-sm font-black uppercase tracking-widest text-ink/40 dark:text-paper/40">
              Logiciels de Création
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-ink/10 to-transparent dark:from-paper/10" />
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {softwareList.map((name, i) => (
              <ToolCard key={name} name={name} delay={i * 0.05} />
            ))}
          </div>
        </div>

        {/* SECTION INTELLIGENCE ARTIFICIELLE */}
        <div>
          <div className="mb-8 flex items-center gap-4">
            <h3 className="flex items-center gap-2 font-display text-sm font-black uppercase tracking-widest text-ink/40 dark:text-paper/40">
              <Cpu className="h-4 w-4 text-electric" />
              Intelligence Artificielle
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-ink/10 to-transparent dark:from-paper/10" />
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {aiList.map((name, i) => (
              <ToolCard key={name} name={name} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
