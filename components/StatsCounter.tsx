'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { useLanguage } from '@/lib/language-context';

// 📌 Chiffres à ajuster librement selon la réalité — c'est ici qu'on les modifie
const STATS = [
  { value: 40, key: 'projects' as const, suffix: '+' },
  { value: 25, key: 'clients' as const, suffix: '+' },
  { value: 50, key: 'tools' as const, suffix: '+' },
  { value: 2, key: 'experience' as const, suffix: '' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-ink dark:text-paper sm:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const { t } = useLanguage();
  const s = t.stats;

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-16 sm:px-10">
      <div className="grid grid-cols-2 gap-8 rounded-xl2 border border-ink/10 bg-white/60 p-8 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center gap-1 text-center"
          >
            <Counter value={stat.value} suffix={stat.suffix} />
            <span className="text-xs font-medium uppercase tracking-wide text-ink/60 dark:text-paper/60">
              {s[stat.key]}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}