'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

type Message = { role: 'user' | 'assistant'; text: string };

export default function AIAssistant() {
  const { t } = useLanguage();
  const a = t.assistant;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  async function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;

    const nextMessages: Message[] = [...messages, { role: 'user', text }];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', text: data.text || a.error }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: a.error }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={a.title}
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-electric to-signal text-white shadow-lg shadow-electric/30 transition-transform hover:scale-110"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </button>

      {/* Panneau de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-40 right-6 z-50 flex h-[28rem] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-xl2 border border-ink/10 bg-paper shadow-2xl shadow-ink/20 dark:border-white/10 dark:bg-[#0A1626]"
          >
            <div className="flex items-center gap-2 border-b border-ink/10 bg-gradient-to-r from-electric/10 to-signal/10 px-4 py-3 dark:border-white/10">
              <Sparkles className="h-4 w-4 text-electric" />
              <p className="font-display text-sm font-semibold text-ink dark:text-paper">
                {a.title}
              </p>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              <div className="max-w-[85%] rounded-xl2 rounded-tl-sm bg-ink/5 px-3.5 py-2.5 text-sm text-ink/80 dark:bg-white/5 dark:text-paper/80">
                {a.welcome}
              </div>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-xl2 px-3.5 py-2.5 text-sm ${
                    m.role === 'user'
                      ? 'ml-auto rounded-tr-sm bg-electric text-white'
                      : 'rounded-tl-sm bg-ink/5 text-ink/80 dark:bg-white/5 dark:text-paper/80'
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {isLoading && (
                <div className="flex w-fit items-center gap-2 rounded-xl2 rounded-tl-sm bg-ink/5 px-3.5 py-2.5 text-sm text-ink/50 dark:bg-white/5 dark:text-paper/50">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-ink/10 p-3 dark:border-white/10">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={a.placeholder}
                className="flex-1 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm text-ink outline-none focus:border-electric dark:border-white/15 dark:bg-white/10 dark:text-paper"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                aria-label="Envoyer"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-electric text-white transition-transform hover:scale-105 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}