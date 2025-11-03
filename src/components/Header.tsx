import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
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

        {isMenuOpen && (
          <ul className="md:hidden mt-4 space-y-4 pb-4">
            <li>
              <button
                onClick={() => scrollToSection('about')}
                className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                À propos
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Réalisations
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-center"
              >
                Contact
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
