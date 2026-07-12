import Image from 'next/image';
import { Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink px-6 py-12 dark:bg-[#0A1626] sm:px-10">
      {/* Grille de fond décorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(circle at 50% 0%, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 0%, black, transparent 75%)',
        }}
      />
      
      {/* Lueur Aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-aurora-gradient opacity-30"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
        
        {/* Section Marque / Logo */}
        <div className="flex items-center gap-3.5">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <Image 
              src="/logo.png" 
              alt="Caleb Creative" 
              fill 
              sizes="40px" 
              className="object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base font-bold tracking-tight text-white">
              Caleb Creative
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
              Là où l&apos;imagination devient réalité
            </span>
          </div>
        </div>

        {/* Section Réseaux Sociaux */}
        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com/profile.php?id=61580115693070"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:scale-105 hover:border-electric hover:bg-electric/10 hover:text-electric"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="https://tiktok.com/@calebagk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:scale-105 hover:border-electric hover:bg-electric/10 hover:text-electric"
          >
            {/* Logo officiel de TikTok en SVG */}
            <svg
              className="h-4 w-4 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.03 1.6 4.17 1.12 1.25 2.69 2.04 4.34 2.19v3.83c-1.7-.06-3.38-.6-4.78-1.57-.2-.14-.38-.3-.57-.46V14.3c.02 1.76-.49 3.53-1.49 4.95-1.54 2.14-4.14 3.48-6.79 3.48-2.12 0-4.24-.83-5.78-2.31C1.2 18.66.45 16.14.63 13.65c.23-3.13 2.51-5.91 5.61-6.42 1.21-.19 2.47-.07 3.63.36v4.06c-.84-.36-1.78-.45-2.66-.23-1.46.33-2.65 1.54-2.92 3.02-.37 1.95.77 3.99 2.67 4.54 1.48.43 3.16.03 4.22-1.01.68-.66 1.05-1.59 1.05-2.54V0h.3z" />
            </svg>
          </a>
        </div>

        {/* Section Droits d'auteur */}
        <div className="flex flex-col items-center sm:items-end gap-1 font-mono text-[11px] text-white/40">
          <p>© 2026 Caleb Creative</p>
          <p className="opacity-70">Abomey, Bénin</p>
        </div>

      </div>
    </footer>
  );
}
