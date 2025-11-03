import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Portfolio
          </button>

          <button
            className="md:hidden rounded-full p-2 text-gray-700 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <ul className="hidden md:flex items-center gap-8">
            <li>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                À propos
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Réalisations
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        <div
          className={`md:hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul
            id="mobile-navigation"
            className="mt-4 space-y-4 overflow-hidden rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-lg"
          >
            <li>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                À propos
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Réalisations
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full rounded-full bg-blue-600 px-6 py-2 text-center font-medium text-white transition-colors hover:bg-blue-700"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
