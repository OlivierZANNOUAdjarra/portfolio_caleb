'use client';

import { useState, useTransition } from 'react';
import { login } from '@/app/actions/auth';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  function handleSubmit(formData: FormData) {
    setError('');
    startTransition(async () => {
      const res = await login(formData);
      if (res && !res.success) setError(res.message);
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        action={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl2 border border-ink/10 bg-white/70 p-8 shadow-xl shadow-ink/5 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/5 text-ink">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="font-display text-lg font-semibold text-ink">
            Espace admin
          </h1>
          <p className="text-sm text-ink/50">Caleb Creative — Dashboard</p>
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-electric"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-electric"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {isPending ? 'Connexion...' : 'Se connecter'}
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </main>
  );
}
