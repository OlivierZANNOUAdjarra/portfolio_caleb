'use client';

import { useTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/language-context';
import { Sun, Moon } from 'lucide-react';

export default function SiteControls() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();

  return (
    <div className="fixed left-6 top-6 z-50 flex items-center gap-2">
      <button
        onClick={toggleLang}
        aria-label="Changer de langue"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-sm font-semibold text-ink shadow-md backdrop-blur-sm transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-ink/80 dark:text-paper"
      >
        {lang === 'fr' ? 'EN' : 'FR'}
      </button>

      <button
        onClick={toggleTheme}
        aria-label="Changer de thème"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-ink shadow-md backdrop-blur-sm transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-ink/80 dark:text-paper"
      >
        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </button>
    </div>
  );
}