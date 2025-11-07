export default function Footer() {
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'journey', label: 'My Journey' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative py-10 text-slate-700">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/40 via-white/10 to-transparent" />
      <div className="relative mx-auto max-w-5xl px-6 space-y-6 text-center">
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
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
