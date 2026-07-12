'use client';

import { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Send, CheckCircle2 } from 'lucide-react';
import { sendContactMessage } from '@/app/actions/contact';
import { useLanguage } from '@/lib/language-context';

export default function ContactSection() {
  const { t } = useLanguage();
  const c = t.contact;
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const contactInfo = [
    { icon: Mail, label: 'calebagbakou@gmail.com', href: 'mailto:calebagbakou@gmail.com' },
    { icon: Phone, label: '+229 01 48 13 53 95 (WhatsApp)', href: 'https://wa.me/2290148135395' },
    { icon: Phone, label: '+229 01 50 25 97 92', href: 'tel:+2290150259792' },
    { icon: Phone, label: '+229 01 95 93 86 00', href: 'tel:+2290195938600' },
    { icon: MapPin, label: c.locationLabel, href: undefined },
  ];

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await sendContactMessage(formData);
      setResult(res);
    });
  }

  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-6 py-24 sm:px-10">
      <p className="inline-flex items-center gap-2 font-display text-xs font-medium uppercase tracking-[0.2em] text-electric">
        <Send className="h-3.5 w-3.5" />
        {c.badge}
      </p>

      <h2 className="mt-4 max-w-2xl font-display text-2xl font-semibold text-balance text-ink sm:text-3xl lg:text-4xl dark:text-paper">
        {c.title}
      </h2>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="flex items-center gap-3 rounded-xl2 border border-ink/10 bg-white/60 px-4 py-3.5 text-sm text-ink/80 backdrop-blur-sm transition-colors hover:border-electric/30 hover:text-electric dark:border-white/10 dark:bg-white/5 dark:text-paper/80">
                <Icon className="h-4 w-4 shrink-0 text-electric" />
                {item.label}
              </div>
            );
            return item.href ? (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}

          {/* Facebook épuré avec ton vrai lien de profil */}
          <a
            href="https://www.facebook.com/profile.php?id=61580115693070"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl2 border border-ink/10 bg-white/60 px-4 py-3.5 text-sm text-ink/80 backdrop-blur-sm transition-colors hover:border-electric/30 hover:text-electric dark:border-white/10 dark:bg-white/5 dark:text-paper/80"
          >
            <Facebook className="h-4 w-4 shrink-0 text-electric" />
            Caleb Agk
          </a>

          {/* TikTok épuré avec ton vrai lien de profil */}
          <a
            href="https://tiktok.com/@calebagk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl2 border border-ink/10 bg-white/60 px-4 py-3.5 text-sm text-ink/80 backdrop-blur-sm transition-colors hover:border-electric/30 hover:text-electric dark:border-white/10 dark:bg-white/5 dark:text-paper/80"
          >
            <svg
              className="h-4 w-4 shrink-0 text-electric"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
            Caleb Agk
          </a>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
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
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
              {c.formName}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-electric dark:border-white/15 dark:bg-white/10 dark:text-paper"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
              {c.formEmail}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-electric dark:border-white/15 dark:bg-white/10 dark:text-paper"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink dark:text-paper">
              {c.formMessage}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full resize-none rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-electric dark:border-white/15 dark:bg-white/10 dark:text-paper"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60 dark:bg-electric"
          >
            {isPending ? c.sending : c.submit}
            <Send className="h-4 w-4" />
          </button>

          {result && (
            <p
              className={`flex items-center gap-2 text-sm ${
                result.success ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              {result.success && <CheckCircle2 className="h-4 w-4" />}
              {result.message}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
