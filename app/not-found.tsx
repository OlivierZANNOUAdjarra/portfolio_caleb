import Link from 'next/link';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-aurora-gradient"
      />

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-electric/10 text-electric">
        <Compass className="h-8 w-8" />
      </div>

      <p className="font-display text-7xl font-bold text-ink dark:text-paper">404</p>

      <h1 className="max-w-md font-display text-xl font-semibold text-ink dark:text-paper">
        Cette page s&apos;est perdue dans l&apos;imagination.
      </h1>

      <p className="max-w-sm text-sm text-ink/60 dark:text-paper/60">
        La page que vous cherchez n&apos;existe pas ou a été déplacée. Retournons à
        l&apos;essentiel.
      </p>

      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-body text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 dark:bg-electric"
      >
        <Home className="h-4 w-4" />
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}