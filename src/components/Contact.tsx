'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  AnimatePresence,
  motion,
} from 'framer-motion';

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [btnHovered, setBtnHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
      className="relative min-h-screen bg-white overflow-hidden py-16 text-slate-900 sm:py-20 flex flex-col justify-center"
      style={{ position: isMobile ? 'relative' : 'sticky', top: 0, zIndex: 300, borderRadius: '2rem 2rem 0 0' }}
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-10 text-center">
          Let&apos;s work{' '}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #ff0066 0%, #d4005a 40%, #6b0f4e 100%)' }}>
            together.
          </span>
        </h2>
        <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/50 shadow-[0_40px_90px_-50px_rgba(15,23,42,0.25)] backdrop-blur-2xl">
          <div className="grid gap-6 overflow-hidden rounded-3xl lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-0">
            <div className="relative min-h-[240px] overflow-hidden lg:min-h-[340px]" style={{ background: 'linear-gradient(145deg, #1a0a2e 0%, #6b0f4e 50%, #d4005a 100%)' }}>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,102,0.15)_0%,transparent_70%)]" />
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-1/3 -top-1/4 h-[160%] w-[120%] bg-[radial-gradient(circle_at_center,rgba(107,15,78,0.35)_0%,rgba(107,15,78,0)_70%)] blur-3xl" />
                <div className="absolute -right-1/2 -bottom-1/3 h-[150%] w-[140%] bg-[radial-gradient(circle_at_center,rgba(255,0,102,0.28)_0%,rgba(255,0,102,0)_72%)] blur-3xl" />
              </div>
              <img
                src="/app3.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none scale-105 translate-y-6"
              />
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-between space-y-3 px-5 py-5 sm:px-7 sm:py-6 lg:px-8 lg:py-7"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
                  Contact
                </span>
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Let&apos;s get in{' '}
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(145deg, #1a0a2e 0%, #6b0f4e 35%, #d4005a 65%, #e8005a 80%, #ff0066 100%)' }}>
                    touch.
                  </span>
                </h2>
                <p className="text-base text-slate-600">
                  Share your project idea or just say hello. I aim to reply within 24 hours.
                </p>
              </div>

              <div className="space-y-4">
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
                    rows={2}
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
                  onMouseEnter={() => setBtnHovered(true)}
                  onMouseLeave={() => setBtnHovered(false)}
                  className={cn(
                    'w-full rounded-2xl px-6 py-3 text-base font-semibold shadow-[0_20px_45px_-25px_rgba(255,0,102,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0066]/60',
                    status === 'loading' ? 'cursor-wait opacity-90' : '',
                  )}
                  style={{
                    backgroundImage: 'linear-gradient(145deg, #1a0a2e 0%, #6b0f4e 35%, #d4005a 65%, #e8005a 80%, #ff0066 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    transform: (!btnHovered && status !== 'loading') ? 'scale(1)' : btnHovered ? 'scale(1.02)' : 'scale(1)',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'white',
                    borderRadius: 'inherit',
                    transform: btnHovered && status !== 'loading' ? 'translateX(0)' : 'translateX(-101%)',
                    transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
                  }} />
                  <span className="flex items-center justify-center gap-2" style={{ position: 'relative', zIndex: 1 }}>
                    {status === 'loading' && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                    )}
                    <span style={btnHovered && status !== 'loading' ? {
                      background: 'linear-gradient(135deg, #ff0066 0%, #d4005a 40%, #6b0f4e 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    } : { color: 'white' }}>Send message</span>
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
