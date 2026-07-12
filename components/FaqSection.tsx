'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function FaqSection() {
  const { t } = useLanguage();
  const f = t.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative mx-auto max-w-3xl px-6 py-24 sm:px-10">
      <p className="inline-flex items-center gap-2 font-display text-xs font-medium uppercase tracking-[0.2em] text-electric">
        <HelpCircle className="h-3.5 w-3.5" />
        {f.badge}
      </p>

      <h2 className="mt-4 font-display text-2xl font-semibold text-balance text-ink sm:text-3xl lg:text-4xl dark:text-paper">
        {f.title}
      </h2>

      <div className="mt-10 divide-y divide-ink/10 rounded-xl2 border border-ink/10 bg-white/60 backdrop-blur-sm dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
        {f.items.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={faq.question} className="px-5 sm:px-6">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display text-sm font-semibold text-ink dark:text-paper sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-electric transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-relaxed text-ink/70 dark:text-paper/70">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
