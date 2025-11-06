import React from 'react';
import { Code2, Database, Palette, Zap, Globe, Brain, Layers, Settings } from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: 'frontend' | 'backend' | 'design' | 'tools' | 'ai';
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: <Code2 />, category: 'frontend' },
  { name: 'TypeScript', icon: <Code2 />, category: 'frontend' },
  { name: 'Tailwind CSS', icon: <Palette />, category: 'frontend' },
  { name: 'Next.js', icon: <Globe />, category: 'frontend' },
  { name: 'Vite', icon: <Zap />, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', icon: <Database />, category: 'backend' },
  { name: 'PostgreSQL', icon: <Database />, category: 'backend' },
  { name: 'API REST', icon: <Layers />, category: 'backend' },
  
  // Design
  { name: 'Figma', icon: <Palette />, category: 'design' },
  { name: 'UI/UX', icon: <Palette />, category: 'design' },
  
  // AI
  { name: 'ChatGPT', icon: <Brain />, category: 'ai' },
  { name: 'AI Automation', icon: <Brain />, category: 'ai' },
  { name: 'Prompt Engineering', icon: <Brain />, category: 'ai' },
  
  // Tools
  { name: 'Git', icon: <Settings />, category: 'tools' },
  { name: 'Docker', icon: <Settings />, category: 'tools' },
  { name: 'VS Code', icon: <Code2 />, category: 'tools' },
];

const categoryConfig = {
  frontend: { label: 'Frontend', color: 'from-blue-500 to-cyan-500' },
  backend: { label: 'Backend', color: 'from-purple-500 to-pink-500' },
  design: { label: 'Design', color: 'from-pink-500 to-rose-500' },
  ai: { label: 'AI', color: 'from-violet-500 to-purple-500' },
  tools: { label: 'Tools', color: 'from-orange-500 to-red-500' },
};

export default function Skills() {
  const categories = Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>;

  return (
    <section 
      id="skills"
      className="relative min-h-screen py-20 bg-gradient-to-b from-white to-gray-50 w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#5c6ff4] to-[#e870c2] bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#5c6ff4] to-[#e870c2] mx-auto rounded-full"></div>
        </div>

        {/* Skills by Category */}
        <div className="space-y-16">
          {categories.map((category) => {
            const categorySkills = skills.filter(skill => skill.category === category);
            if (categorySkills.length === 0) return null;
            
            const config = categoryConfig[category];
            
            return (
              <div key={category} className="space-y-6">
                {/* Category Title */}
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {config.label}
                  </h3>
                  <div className={`flex-1 h-px bg-gradient-to-r ${config.color} opacity-30`}></div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {categorySkills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      {/* Icon Container */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {skill.icon}
                        </div>
                      </div>
                      
                      {/* Skill Name */}
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        {skill.name}
                      </p>
                      
                      {/* Hover Gradient Overlay */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

