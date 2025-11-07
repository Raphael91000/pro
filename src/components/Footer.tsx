export default function Footer() {
  const navItems = [
    { id: 'hero', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'journey', label: 'My Journey' },
    { id: 'skills', label: 'Compétences' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative py-10 text-slate-700">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/40 via-white/10 to-transparent" />
      <div className="relative mx-auto max-w-5xl px-6 space-y-6 text-center">
        <p className="text-3xl font-bold text-slate-800 sm:text-4xl">
          Scroll down to return to the{' '}
          <span className="text-transparent bg-gradient-to-r from-[#5c6ff4] via-[#7b6ff4] to-[#e870c2] bg-clip-text">
            home.
          </span>
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-6 rounded-3xl border border-white/70 bg-white/70 px-6 py-4 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </footer>
  );
}
