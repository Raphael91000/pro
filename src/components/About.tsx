"use client";

import { TextRevealByWord } from "./ui/text-reveal";

const aboutCopy =
  "Hello, my name is Raphael, I'm 25 years old and I'm passionate about web development, AI, and entrepreneurship. Throughout this journey, you'll find my professional experiences and projects. Enjoy!";

export default function About() {
  return (
    <section
      id="about"
      className="relative pt-8 pb-0 text-slate-900 sm:pt-10 lg:pt-12"
    >
      <div className="mx-auto flex w-full justify-center px-4 sm:px-6 lg:px-8">
        <TextRevealByWord text={aboutCopy} />
      </div>
    </section>
  );
}
