'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/language-context';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const WHATSAPP_LINK =
  'https://wa.me/2290148135395?text=' +
  encodeURIComponent(
    "Bonjour Caleb ! Je découvre votre portfolio Caleb Creative et j'aimerais échanger sur un projet."
  );

export default function SiteHeader() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const links = [
    { id: 'a-propos', label: t.nav.about, idx: '01' },
    { id: 'services', label: t.nav.services, idx: '02' },
    { id: 'portfolio', label: t.nav.portfolio, idx: '03' },
    { id: 'outils', label: t.nav.tools, idx: '04' },
    { id: 'faq', label: t.nav.faq, idx: '05' },
    { id: 'contact', label: t.nav.contact, idx: '06' },
  ];

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[200] flex items-center justify-between border-b border-ink/10 bg-paper/90 px-5 py-3.5 backdrop-blur-md transition-shadow dark:border-white/10 dark:bg-[#0A1626]/90 sm:px-10 ${
          scrolled ? 'shadow-lg shadow-black/10' : ''
        }`}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-[9px]">
            <Image src="/logo.png" alt="Caleb Creative" fill sizes="32px" className="object-cover" />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate font-display text-[15px] font-bold text-ink dark:text-paper">
              Caleb <span className="text-electric">AGBAKOU</span>
            </p>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.09em] text-electric">
              Caleb Creative
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            aria-label="Changer de langue"
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-ink/10 bg-white/60 font-mono text-xs font-semibold text-ink/70 transition-colors hover:border-electric hover:text-electric dark:border-white/10 dark:bg-white/5 dark:text-paper/70"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Changer de thème"
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-ink/10 bg-white/60 text-ink/70 transition-colors hover:border-electric hover:text-electric dark:border-white/10 dark:bg-white/5 dark:text-paper/70"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            className={`flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border transition-colors ${
              isOpen
                ? 'border-electric text-electric'
                : 'border-ink/10 bg-white/60 text-ink hover:border-electric dark:border-white/10 dark:bg-white/5 dark:text-paper'
            }`}
          >
            {isOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-0 z-[190] flex flex-col justify-center bg-aurora-gradient bg-ink px-8 py-16 dark:bg-[#0A1626] sm:px-24"
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le menu"
              className="absolute right-6 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-electric hover:text-electric sm:right-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col">
              {links.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  className="flex items-center justify-between border-b border-white/10 py-3.5 font-display text-xl font-semibold text-white transition-colors hover:text-electric sm:text-2xl"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-[11px] font-normal text-glow">{link.idx}</span>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + links.length * 0.05 }}
              className="mt-10 flex items-center justify-between"
            >
              <span className="font-mono text-xs text-white/50">Abomey, Bénin</span>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="sheen-wrap flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-electric"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Écrire
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}