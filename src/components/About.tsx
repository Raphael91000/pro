'use client'

export default function About() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center p-8 bg-white">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          À propos
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Designer & Développeur passionné par la création d'expériences numériques exceptionnelles.
        </p>
      </div>
    </section>
  );
}