'use client';

import { motion } from 'framer-motion';

export default function SectionDivider() {
  return (
    <div className="relative mx-auto max-w-6xl px-6 sm:px-10" aria-hidden="true">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-full origin-left bg-gradient-to-r from-transparent via-electric/30 to-transparent"
      />
    </div>
  );
}