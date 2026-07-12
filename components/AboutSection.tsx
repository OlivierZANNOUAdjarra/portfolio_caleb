'use client';

import { motion } from 'framer-motion';
import { Sparkles, Target, Users, User, Building2, Landmark } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function AboutSection() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section
      id="a-propos"
      className="relative mx-auto max-w-5xl px-6 py-24 sm:px-10"
    >
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        custom={0}
        variants={fadeUp}
        className="inline-flex items-center gap-2 font-display text-xs font-medium uppercase tracking-[0.2em] text-electric"
      >
        <Sparkles className="h-3.5 w-3.5" />
        {a.badge}
      </motion.p>

      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        custom={0.1}
        variants={fadeUp}
        className="mt-4 max-w-2xl font-display text-2xl font-semibold text-balance text-ink sm:text-3xl lg:text-4xl dark:text-paper"
      >
        {a.title}
      </motion.h2>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          custom={0.2}
          variants={fadeUp}
          className="space-y-5 font-body text-base leading-relaxed text-ink/75 sm:text-lg dark:text-paper/75"
        >
          <p>{a.paragraph1}</p>
          <p>{a.paragraph2}</p>
        </motion.div>

        {/* Cadre Mission + Accompagne, aligné sur la palette marine/or */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          custom={0.3}
          variants={fadeUp}
          className="flex flex-col gap-5 overflow-hidden rounded-xl2 border border-electric/25 bg-white/40 p-6 shadow-[0_0_20px_rgba(201,166,97,0.08)] backdrop-blur-sm dark:border-electric/20 dark:bg-white/5"
        >
          {/* Carte Mission */}
          <div className="relative -m-6 mb-0 overflow-hidden p-6">
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  'radial-gradient(120% 140% at 0% 0%, rgba(201,166,97,0.14), transparent 55%), radial-gradient(120% 140% at 100% 0%, rgba(124,147,173,0.1), transparent 55%)',
              }}
            />
            {/* Liseré vertical doré à gauche */}
            <div
              aria-hidden
              className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-electric via-electric-400 to-glow"
            />

            <div className="flex items-start gap-3.5">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-electric/15 text-electric">
                <Target className="h-4.5 w-4.5" strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-electric">
                  {a.missionLabel}
                </p>
                <p className="mt-1.5 font-display text-[15px] font-semibold leading-relaxed text-ink dark:text-paper">
                  {a.missionText}
                </p>
              </div>
            </div>
          </div>

          {/* Section Accompagne (Audience) */}
          <div className="border-t border-ink/10 pt-5 dark:border-white/10">
            <div className="mb-4 flex items-center gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-signal/15 text-signal">
                <Users className="h-4.5 w-4.5" strokeWidth={1.8} />
              </div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-signal">
                {a.audienceLabel}
              </p>
            </div>
            <div className="flex flex-col">
              {a.audiences.map((aud, i) => {
                const Icon = [User, Building2, Landmark][i] ?? User;
                const tone = ['bg-electric/15 text-electric', 'bg-glow/15 text-glow', 'bg-signal/15 text-signal'][i];
                return (
                  <div
                    key={aud}
                    className="flex items-center gap-3 border-t border-ink/10 py-3 first:border-t-0 dark:border-white/10"
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] ${tone}`}>
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </div>
                    <span className="font-display text-sm font-semibold text-ink dark:text-paper">
                      {aud}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
