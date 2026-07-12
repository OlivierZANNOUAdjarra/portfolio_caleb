'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ImageIcon } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const gradients = [
  'from-electric/30 to-signal/30',
  'from-signal/30 to-glow/30',
  'from-glow/30 to-electric/30',
  'from-electric/30 to-glow/30',
  'from-signal/30 to-electric/30',
  'from-glow/30 to-signal/30',
  'from-electric/30 to-signal/30',
];

function TiltCard({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState('');

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const card = ref.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTransform(`translateY(-4px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`);
  }

  function handleMouseLeave() {
    setTransform('');
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: transform ? 'none' : 'transform .4s cubic-bezier(.16,.8,.24,1)' }}
      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl2 border border-ink/10 text-left shadow-sm shadow-ink/5 will-change-transform dark:border-white/10"
    >
      {children}
    </button>
  );
}

export default function PortfolioSection() {
  const { t } = useLanguage();
  const p = t.portfolio;

  const allLabel = p.categories[0];
  const [active, setActive] = useState<string>(allLabel);
  const [selected, setSelected] = useState<(typeof p.projects)[number] | null>(null);

  const filtered =
    active === allLabel ? p.projects : p.projects.filter((proj) => proj.category === active);

  return (
    <section
      id="portfolio"
      className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10"
      style={{ perspective: '900px' }}
    >
      <p className="inline-flex items-center gap-2 font-display text-xs font-medium uppercase tracking-[0.2em] text-electric">
        <ImageIcon className="h-3.5 w-3.5" />
        {p.badge}
      </p>

      <h2 className="mt-4 max-w-2xl font-display text-2xl font-semibold text-balance text-ink sm:text-3xl lg:text-4xl dark:text-paper">
        {p.title}
      </h2>

      <div className="mt-8 flex flex-wrap gap-2">
        {p.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === cat
                ? 'bg-ink text-paper dark:bg-electric'
                : 'bg-ink/5 text-ink/70 hover:bg-ink/10 dark:bg-white/5 dark:text-paper/70 dark:hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <TiltCard onClick={() => setSelected(project)}>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} transition-transform duration-500 group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-white/70">
                    {project.category}
                  </p>
                  <p className="mt-1 font-display text-base font-semibold text-white">
                    {project.title}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-xl2 bg-paper dark:bg-[#0A1626]"
            >
              <div
                className={`aspect-video bg-gradient-to-br ${
                  gradients[p.projects.indexOf(selected) % gradients.length]
                }`}
              />
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-electric">
                  {selected.category}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-ink dark:text-paper">
                  {selected.title}
                </h3>
                <p className="mt-2 text-sm text-ink/70 dark:text-paper/70">
                  {selected.description}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Fermer"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ink/80 text-white transition-colors hover:bg-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}