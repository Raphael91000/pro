import { Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Créatif(ve)
              <span className="block text-blue-600">Designer & Développeur(se)</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
              Je crée des expériences numériques élégantes et fonctionnelles qui donnent vie à vos idées.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => scrollToSection('portfolio')}
                className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all hover:shadow-lg font-medium"
              >
                Voir mes projets
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all font-medium"
              >
                Me contacter
              </button>
            </div>

            <div className="flex gap-4 pt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full hover:bg-gray-900 hover:text-white transition-all shadow-md"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-md"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:contact@example.com"
                className="p-3 bg-white rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-md"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-full flex items-center justify-center">
                  <span className="text-6xl md:text-8xl">👤</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
