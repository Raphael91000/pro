import { Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 text-slate-700">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/40 via-white/10 to-transparent" />
      <div className="relative mx-auto max-w-7xl space-y-10 px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-2xl font-bold text-slate-900">Portfolio</h3>
            <p className="leading-relaxed text-slate-600">
              Designer & développeur passionné par la création d&apos;expériences numériques élégantes et utiles.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-slate-900">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-slate-600 transition-colors hover:text-slate-900"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-slate-600 transition-colors hover:text-slate-900"
                >
                  À propos
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-slate-600 transition-colors hover:text-slate-900"
                >
                  My Journey
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-slate-600 transition-colors hover:text-slate-900"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-slate-900">Retrouvez-moi</h4>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/raphael-theuillon-689139261/"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-slate-700 transition-colors hover:bg-white"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/Raphael91000"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-slate-700 transition-colors hover:bg-white"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} />
              </a>
              <a
                href="https://x.com/Raph_theuillon"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-slate-700 transition-colors hover:bg-white"
                aria-label="Twitter / X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={18} />
              </a>
              <a
                href="mailto:hello@email.com"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-slate-700 transition-colors hover:bg-white"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/70 pt-6 text-sm text-slate-500 md:flex-row">
          <p>© {currentYear} Raphael Theuillon. Tous droits réservés.</p>
          <p className="flex items-center gap-2">
            Fait avec <Heart size={16} className="text-rose-500" /> à Paris.
          </p>
        </div>
      </div>
    </footer>
  );
}
