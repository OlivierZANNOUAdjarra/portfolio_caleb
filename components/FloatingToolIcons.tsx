'use client';

import { motion } from 'framer-motion';

const SLUGS = ['openai', 'midjourney', 'flux', 'kling', 'runway', 'ideogram', 'geminicli'];

// Positions et trajectoires pseudo-aléatoires mais fixes (cohérentes à chaque chargement)
const SWIMMERS = SLUGS.map((slug, i) => ({
  slug,
  top: 8 + ((i * 37) % 80),
  left: 4 + ((i * 53) % 90),
  duration: 14 + (i % 4) * 3,
  delay: i * 0.6,
  size: 30 + (i % 3) * 8,
}));

export default function FloatingToolIcons() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0 overflow-hidden opacity-[0.35] dark:opacity-[0.22]"
    >
      {SWIMMERS.map((s, i) => (
        <motion.div
          key={s.slug}
          className="absolute"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
          animate={{
            x: [0, 24, -18, 12, 0],
            y: [0, -20, 14, -10, 0],
            rotate: [0, 6, -6, 3, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://unpkg.com/@lobehub/icons-static-svg@latest/icons/${s.slug}.svg`}
            alt=""
            width={s.size}
            height={s.size}
            className="object-contain"
            loading="lazy"
          />
        </motion.div>
      ))}
    </div>
  );
}