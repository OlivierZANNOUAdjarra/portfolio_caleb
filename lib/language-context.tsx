'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { translations, Lang } from '@/lib/translations';

type Translations = typeof translations['fr'];

const LanguageContext = createContext<{
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
}>({ lang: 'fr', t: translations.fr, toggleLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr');

  useEffect(() => {
    const stored = localStorage.getItem('cc-lang') as Lang | null;
    if (stored) setLang(stored);
  }, []);

  function toggleLang() {
    setLang((prev) => {
      const next: Lang = prev === 'fr' ? 'en' : 'fr';
      localStorage.setItem('cc-lang', next);
      document.cookie = `cc-lang=${next}; path=/; max-age=31536000`;
      return next;
    });
  }

  const t = translations[lang] as Translations;

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}