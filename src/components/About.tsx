import { Code, Palette, Zap, Download } from 'lucide-react';

const skills = [
  {
    icon: Code,
    title: 'Développement',
    items: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS']
  },
  {
    icon: Palette,
    title: 'Design',
    items: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI/UX']
  },
  {
    icon: Zap,
    title: 'Outils',
    items: ['Git', 'VS Code', 'Vite', 'Vercel', 'Supabase']
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            À propos de moi
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Passionné(e) par la création d'expériences numériques exceptionnelles, je combine design et développement pour donner vie à des projets innovants.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Avec plusieurs années d'expérience, j'ai eu l'opportunité de travailler sur des projets variés, du site vitrine à l'application web complexe. Mon approche allie créativité, rigueur technique et attention aux détails.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Je crois fermement en l'importance de l'accessibilité et de la performance dans le web moderne. Chaque projet est une opportunité d'apprendre et de repousser les limites du possible.
            </p>

            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-blue-600 transition-all shadow-md hover:shadow-lg font-medium"
            >
              <Download size={20} />
              Télécharger mon CV
            </a>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Compétences & Expertises
            </h3>
            <div className="space-y-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-600 text-white rounded-lg">
                        <Icon size={24} />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900">
                        {skill.title}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-11">
                      {skill.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
