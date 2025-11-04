import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl animate-[slideUp_0.3s_ease-out]">
        <div className="relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-72 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full hover:bg-white transition-colors shadow-lg"
            aria-label="Fermer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          <h2 id="modal-title" className="text-3xl font-bold text-gray-900 mb-4">
            {project.title}
          </h2>

          <div className="flex flex-wrap gap-3 mb-6">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {project.longDescription}
          </p>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle2 size={24} className="text-blue-600" />
              Fonctionnalités principales
            </h3>
            <ul className="space-y-3">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium"
              >
                <ExternalLink size={20} />
                Voir le site en ligne
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all font-medium"
              >
                <Github size={20} />
                Voir sur GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
