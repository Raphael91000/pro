'use client'

import { TextRevealByWord } from "@/components/ui/text-reveal";

export default function About() {
  return (
    <section id="about" className="bg-white">
      <TextRevealByWord 
        text="Hello, my name is Raphael, I'm 25 years old and I'm passionate about web development, AI, and entrepreneurship. Throughout this journey, you'll find my professional experiences and projects. Enjoy!"
      />
    </section>
  );
}