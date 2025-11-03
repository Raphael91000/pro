import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';
import ProjectModal from './ProjectModal';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  longDescription: string;
  features: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Application E-commerce',
    description: 'Plateforme de commerce en ligne moderne avec panier, paiements et gestion des commandes.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Stripe', 'Supabase'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    longDescription: 'Une application e-commerce complète offrant une expérience d\'achat fluide et sécurisée. Le projet intègre un système de paiement avec Stripe, une gestion avancée des stocks et un tableau de bord administrateur.',
    features: [
      'Authentification sécurisée des utilisateurs',
      'Panier d\'achat avec calcul en temps réel',
      'Intégration Stripe pour les paiements',
      'Tableau de bord administrateur',
      'Gestion des commandes et suivi',
      'Design responsive et accessible'
    ]
  },
  {
    id: 2,
    title: 'Dashboard Analytics',
    description: 'Interface d\'analyse de données avec graphiques interactifs et visualisations en temps réel.',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Next.js', 'Chart.js', 'PostgreSQL', 'TailwindCSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    longDescription: 'Un tableau de bord analytique sophistiqué permettant de visualiser des données complexes de manière intuitive. Utilise des graphiques interactifs et des métriques en temps réel pour faciliter la prise de décision.',
    features: [
      'Graphiques interactifs et personnalisables',
      'Mise à jour des données en temps réel',
      'Filtres et segmentation avancés',
      'Export des rapports en PDF',
      'Dark mode et personnalisation',
      'Performance optimisée pour grands volumes'
    ]
  },
  {
    id: 3,
    title: 'Application Mobile',
    description: 'Application mobile cross-platform pour la gestion de tâches et la productivité.',
    image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    longDescription: 'Une application mobile intuitive pour gérer vos tâches quotidiennes et améliorer votre productivité. Synchronisation cloud, notifications intelligentes et interface élégante.',
    features: [
      'Synchronisation multi-appareils',
      'Notifications push personnalisées',
      'Mode hors ligne complet',
      'Partage de listes collaboratives',
      'Statistiques de productivité',
      'Interface intuitive et rapide'
    ]
  },
  {
    id: 4,
    title: 'Site Portfolio Designer',
    description: 'Portfolio interactif pour un designer avec animations et transitions élégantes.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Vue.js', 'GSAP', 'Sass', 'Netlify'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    longDescription: 'Un site portfolio créatif mettant en valeur le travail d\'un designer avec des animations fluides et une navigation immersive. Chaque projet est présenté avec soin dans une interface visuellement captivante.',
    features: [
      'Animations GSAP sophistiquées',
      'Galerie interactive full-screen',
      'Navigation parallax smooth',
      'Optimisation des images',
      'SEO optimisé',
      'Chargement progressif'
    ]
  },
  {
    id: 5,
    title: 'Plateforme de Réservation',
    description: 'Système de réservation en ligne avec calendrier interactif et gestion des disponibilités.',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    longDescription: 'Une plateforme de réservation complète permettant aux utilisateurs de réserver des services en temps réel. Système de calendrier avancé, notifications instantanées et gestion intelligente des disponibilités.',
    features: [
      'Calendrier interactif en temps réel',
      'Notifications instantanées',
      'Gestion multi-utilisateurs',
      'Confirmation automatique par email',
      'Système de rappels',
      'Tableau de bord de gestion'
    ]
  },
  {
    id: 6,
    title: 'Blog Moderne',
    description: 'Plateforme de blogging avec éditeur markdown, commentaires et système de tags.',
    image: 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Next.js', 'MDX', 'Prisma', 'TailwindCSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    longDescription: 'Une plateforme de blogging moderne avec un éditeur markdown intégré, système de commentaires et gestion avancée du contenu. Optimisée pour le SEO et les performances.',
    features: [
      'Éditeur markdown avec prévisualisation',
      'Système de commentaires modéré',
      'Tags et catégories',
      'Recherche full-text',
      'RSS feed automatique',
      'Optimisation SEO avancée'
    ]
  }
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="portfolio" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mes Réalisations
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez une sélection de mes projets récents, alliant créativité et expertise technique.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <article
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-4">
                    {project.liveUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.liveUrl, '_blank');
                        }}
                        className="p-2 bg-white text-gray-900 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                        aria-label="Voir le site"
                      >
                        <ExternalLink size={20} />
                      </button>
                    )}
                    {project.githubUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.githubUrl, '_blank');
                        }}
                        className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
                        aria-label="Voir sur GitHub"
                      >
                        <Github size={20} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
