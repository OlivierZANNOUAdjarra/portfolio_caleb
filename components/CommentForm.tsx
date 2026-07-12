'use client';

import { useState, useTransition } from 'react';
import { submitComment } from '@/app/actions/comments';
import { useLanguage } from '@/lib/language-context';
import { Send, CheckCircle2 } from 'lucide-react';

export default function CommentForm() {
  const { t } = useLanguage();
  const c = t.comments;
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await submitComment(formData);
      setResult(res);
    });
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4 rounded-xl2 border border-ink/10 bg-white/60 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
    >
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px]"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
          {c.formName}
        </label>
        <input
          id="c-name"
          name="name"
          type="text"
          required
          maxLength={80}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-electric dark:border-white/15 dark:bg-white/10 dark:text-paper"
        />
      </div>

      <div>
        <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
          {c.formMessage}
        </label>
        <textarea
          id="c-message"
          name="message"
          required
          maxLength={500}
          rows={3}
          className="w-full resize-none rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-electric dark:border-white/15 dark:bg-white/10 dark:text-paper"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60 dark:bg-electric"
      >
        {isPending ? c.sending : c.submit}
        <Send className="h-4 w-4" />
      </button>

      {result && (
        <p className={`flex items-center gap-2 text-sm ${result.success ? 'text-emerald-600' : 'text-red-600'}`}>
          {result.success && <CheckCircle2 className="h-4 w-4" />}
          {result.message}
        </p>
      )}
    </form>
  );
      }
