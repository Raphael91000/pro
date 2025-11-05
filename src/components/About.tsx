import CardStack from './ui/card-stack'; // Garde le composant

export default function About() {
  // Données pour les cards (inchangées)
  const cards = [
    {
      id: 1,
      title: "Développement Web",
      content: "Expert en React, TypeScript et frameworks modernes pour créer des applications web performantes.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Intelligence Artificielle",
      content: "Passionné par l'IA et le machine learning, intégration de solutions intelligentes dans les projets.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Entrepreneuriat",
      content: "Créateur de solutions innovantes qui résolvent des problèmes réels et ont un impact positif.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Design & UX",
      content: "Attention particulière à l'expérience utilisateur et aux interfaces intuitives et esthétiques.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop"
    },
  ];

  return (
    <section 
      id="about"
      className="relative min-h-screen py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            My journey
          </h2>
        </div>

        {/* Card Stack centré */}
        <div className="flex justify-center">
          <CardStack cards={cards} />
        </div>
      </div>
    </section>
  );
}
