'use client'

import { TextRevealByWord } from "@/components/ui/text-reveal";

export default function About() {
  return (
    <section id="about" className="bg-white">
      <TextRevealByWord 
        text="Je suis un Designer & Développeur passionné par la création d'expériences numériques exceptionnelles. J'aime transformer des idées en interfaces élégantes et intuitives. Mon objectif est de créer des produits qui font la différence."
        className="bg-white"
      />
    </section>
  );
}