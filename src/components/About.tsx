'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AppleCards from './ui/apple-cards';
import Skills from './Skills';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animation pour les Apple Cards (sortent vers la gauche)
  const appleCardsX = useTransform(scrollYProgress, [0.4, 0.8], ["0%", "-100%"]);
  const appleCardsOpacity = useTransform(scrollYProgress, [0.4, 0.8], [1, 0]);
  const appleCardsScale = useTransform(scrollYProgress, [0.4, 0.8], [1, 0.95]);

  // Animation pour les Skills (entrent depuis la droite)
  const skillsX = useTransform(scrollYProgress, [0.4, 0.8], ["100%", "0%"]);
  const skillsOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const skillsScale = useTransform(scrollYProgress, [0.4, 0.8], [0.95, 1]);

  useEffect(() => {
    const handleScroll = () => {
      if (!aboutSectionRef.current) return;

      const rect = aboutSectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      // Détecter si on est à la fin de la section About
      const scrollProgress = scrollYProgress.get();
      if (scrollProgress > 0.5 && !isTransitioning) {
        setIsTransitioning(true);
      } else if (scrollProgress < 0.5 && isTransitioning) {
        setIsTransitioning(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollYProgress, isTransitioning]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh] overflow-hidden">
      <section 
        ref={aboutSectionRef}
        id="about"
        className="relative min-h-screen py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-[#5c6ff4] to-[#e870c2] bg-clip-text text-transparent">Switch</span>
              <span className="text-gray-800"> and </span>
              <span className="bg-gradient-to-r from-[#5c6ff4] to-[#e870c2] bg-clip-text text-transparent">click</span>
              <span className="text-gray-800"> for </span>
              <span className="bg-gradient-to-r from-[#5c6ff4] to-[#e870c2] bg-clip-text text-transparent">discover</span>
              <span className="text-gray-800"> my </span>
              <span className="bg-gradient-to-r from-[#5c6ff4] to-[#e870c2] bg-clip-text text-transparent">journey</span>
            </h2>
          </div>

          {/* Apple Cards avec animation */}
          <motion.div
            style={{
              x: appleCardsX,
              opacity: appleCardsOpacity,
              scale: appleCardsScale,
            }}
            className="relative z-10 will-change-transform"
          >
            <AppleCards />
          </motion.div>
        </div>
      </section>

      {/* Skills avec animation */}
      <motion.div
        style={{
          x: skillsX,
          opacity: skillsOpacity,
          scale: skillsScale,
        }}
        className="absolute top-0 left-0 w-full will-change-transform"
      >
        <Skills />
      </motion.div>
    </div>
  );
}
