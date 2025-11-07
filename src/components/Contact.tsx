'use client';

import { useRef, useState } from 'react';
import { SplineScene } from '@/components/ui/splite';
import { cn } from '@/lib/utils';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formState, setFormState] = useState<ContactFormState>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xvgveydw', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setFormState({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 text-slate-900 sm:py-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/50 shadow-[0_40px_90px_-50px_rgba(15,23,42,0.25)] backdrop-blur-2xl">
          <div className="grid gap-6 overflow-hidden rounded-3xl lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-0">
            <div className="relative min-h-[320px] overflow-hidden bg-gradient-to-br from-white/60 via-white/35 to-white/15 lg:min-h-[480px]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.65)_0%,rgba(226,232,255,0.35)_45%,rgba(203,213,225,0.1)_100%)]" />
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-1/3 -top-1/4 h-[160%] w-[120%] bg-[radial-gradient(circle_at_center,rgba(92,111,244,0.35)_0%,rgba(92,111,244,0)_70%)] blur-3xl" />
                <div className="absolute -right-1/2 -bottom-1/3 h-[150%] w-[140%] bg-[radial-gradient(circle_at_center,rgba(232,112,194,0.28)_0%,rgba(232,112,194,0)_72%)] blur-3xl" />
              </div>
              <ErrorBoundary fallback={<RobotFallback />}>
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="absolute inset-0 h-full w-full"
                />
              </ErrorBoundary>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-between space-y-6 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
                  Contact
                </span>
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                  Let&apos;s get in{' '}
                  <span className="text-transparent bg-gradient-to-r from-[#5c6ff4] via-[#7b6ff4] to-[#e870c2] bg-clip-text">
                    touch.
                  </span>
                </h2>
                <p className="text-base text-slate-600">
                  Share your project idea or just say hello. I aim to reply within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className={inputStyles}
                    placeholder="First Last Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className={inputStyles}
                    placeholder="hello@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={handleChange}
                    className={cn(inputStyles, 'resize-none')}
                    placeholder="Tell me about your project or how I can help."
                  />
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={cn(
                    'w-full rounded-2xl bg-[radial-gradient(circle_at_left,rgba(92,111,244,0.8)_0%,rgba(92,111,244,0.55)_45%,rgba(232,112,194,0.8)_100%)] px-6 py-3 text-base font-semibold text-white shadow-[0_20px_45px_-25px_rgba(92,111,244,0.45)] transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c6ff4]/60',
                    status === 'loading' ? 'cursor-wait opacity-90' : 'hover:scale-[1.02]',
                  )}
                >
                  <span className="flex items-center justify-center gap-2">
                    {status === 'loading' && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                    )}
                    <span>Send message</span>
                  </span>
                </button>

                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.p
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-2xl border border-emerald-300/60 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600"
                    >
                      ✅ Message envoyé !
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-2xl border border-rose-300/60 bg-rose-500/10 px-4 py-3 text-sm text-rose-600"
                    >
                      ❌ Erreur lors de l&apos;envoi.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputStyles =
  'mt-2 w-full rounded-2xl border border-white/60 bg-white/75 px-4 py-3 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/70 transition';

function RobotFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-gradient-to-br from-white via-slate-100 to-slate-200 p-10 text-center text-slate-700">
      <div className="text-base font-semibold uppercase tracking-[0.4em] text-slate-500">
        Contact
      </div>
      <h3 className="text-2xl font-bold text-slate-900">Robot unavailable</h3>
      <p className="max-w-xs text-sm text-slate-600">
        The 3D scene couldn&apos;t load right now. Send me a message and I&apos;ll get back to you within 24 hours.
      </p>
    </div>
  );
}
