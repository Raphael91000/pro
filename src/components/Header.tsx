import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'journey', label: 'Journey' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-none bg-transparent md:hidden"
    >
      <div className="mx-auto w-full max-w-3xl px-4 pt-4">
        <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white/60 shadow-[0_28px_120px_-48px_rgba(92,111,244,0.55)] backdrop-blur-2xl transition-shadow duration-300">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(92,111,244,0.45)_0%,rgba(92,111,244,0)_55%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(232,112,194,0.35)_0%,rgba(232,112,194,0)_65%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-white/20 mix-blend-screen"
            style={{ filter: 'url(#glass-distortion)' }}
            aria-hidden="true"
          />

          <nav className="relative z-10 flex items-center justify-between px-5 py-4">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-lg font-semibold text-slate-900 transition-colors duration-200 hover:text-[#5c6ff4]"
            >
              Portfolio
            </button>

            <button
              className="rounded-full border border-white/70 bg-white/60 p-2 text-slate-700 shadow-sm transition-all duration-200 hover:scale-105 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c6ff4]/60"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>

          <div
            className={`relative z-10 overflow-hidden px-5 transition-[max-height,opacity,padding] duration-300 ease-out ${
              isMenuOpen ? 'max-h-80 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'
            }`}
          >
            <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-[0_20px_60px_-45px_rgba(92,111,244,0.65)] backdrop-blur-xl">
              <ul id="mobile-navigation" className="space-y-3">
                {menuItems.map((item, index) => {
                  const isLast = index === menuItems.length - 1;

                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={
                          isLast
                            ? "flex w-full items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_left,rgba(92,111,244,0.82)_0%,rgba(92,111,244,0.6)_45%,rgba(232,112,194,0.85)_100%)] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_50px_-28px_rgba(92,111,244,0.65)] transition-transform duration-200 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c6ff4]/70"
                            : "block w-full rounded-2xl bg-white/65 px-6 py-3 text-left text-base font-medium text-slate-700 shadow-sm transition-all duration-200 hover:bg-white hover:text-[#5c6ff4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c6ff4]/70"
                        }
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
