'use client';

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { journeySkillsProgress } from "../lib/motionValues";
import { ProductHighlightCard } from "./ui/product-highlight-card";

// ── 3D SVG Icons ──────────────────────────────────────────────────────────────

const Icon3DCode = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="codeTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff6eb0" />
        <stop offset="50%" stopColor="#d4005a" />
        <stop offset="100%" stopColor="#6b0f4e" />
      </linearGradient>
      <linearGradient id="codeSide" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3a0028" />
        <stop offset="100%" stopColor="#6b0f4e" />
      </linearGradient>
      <linearGradient id="codeHL" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffaacc" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#ff0066" stopOpacity="0" />
      </linearGradient>
      <filter id="codeShadow">
        <feDropShadow dx="2" dy="8" stdDeviation="6" floodColor="#d4005a" floodOpacity="0.4" />
      </filter>
    </defs>
    <g filter="url(#codeShadow)">
      {/* Left chevron < — extrusion */}
      <path d="M30 100 L70 60 L78 68 L46 100 L78 132 L70 140 Z" fill="url(#codeSide)" transform="translate(8,8)" opacity="0.6" />
      {/* Left chevron < — front */}
      <path d="M30 100 L70 60 L82 72 L54 100 L82 128 L70 140 Z" fill="url(#codeTop)" />
      <path d="M30 100 L70 60 L82 72 L54 100 L82 128 L70 140 Z" fill="url(#codeHL)" />

      {/* Slash / — extrusion */}
      <path d="M75 148 L125 52 L133 58 L83 154 Z" fill="url(#codeSide)" transform="translate(8,8)" opacity="0.6" />
      {/* Slash / — front */}
      <path d="M75 148 L125 52 L142 58 L92 154 Z" fill="url(#codeTop)" />
      <path d="M75 148 L125 52 L142 58 L92 154 Z" fill="url(#codeHL)" />

      {/* Right chevron > — extrusion */}
      <path d="M170 100 L130 60 L122 68 L154 100 L122 132 L130 140 Z" fill="url(#codeSide)" transform="translate(8,8)" opacity="0.6" />
      {/* Right chevron > — front */}
      <path d="M170 100 L130 60 L118 72 L146 100 L118 128 L130 140 Z" fill="url(#codeTop)" />
      <path d="M170 100 L130 60 L118 72 L146 100 L118 128 L130 140 Z" fill="url(#codeHL)" />
    </g>
  </svg>
);

const GEAR_PATH = `
  M 153.7,94.4
  A 54 54 0 0 1 153.7,105.6 L 137.5,105.9
  A 38 38 0 0 1 130.7,122.3 L 141.9,134.0
  A 54 54 0 0 1 134.0,141.9 L 122.3,130.7
  A 38 38 0 0 1 105.9,137.5 L 105.6,153.7
  A 54 54 0 0 1 94.4,153.7  L 94.1,137.5
  A 38 38 0 0 1 77.7,130.7  L 66.0,141.9
  A 54 54 0 0 1 58.0,134.0  L 69.3,122.3
  A 38 38 0 0 1 62.5,105.9  L 46.3,105.6
  A 54 54 0 0 1 46.3,94.4   L 62.5,94.1
  A 38 38 0 0 1 69.3,77.7   L 58.0,66.0
  A 54 54 0 0 1 66.0,58.1   L 77.7,69.3
  A 38 38 0 0 1 94.1,62.5   L 94.4,46.3
  A 54 54 0 0 1 105.6,46.3  L 105.9,62.5
  A 38 38 0 0 1 122.3,69.3  L 134.0,58.0
  A 54 54 0 0 1 141.9,66.0  L 130.7,77.7
  A 38 38 0 0 1 137.5,94.1  L 153.7,94.4 Z
  M 116,100 A 16 16 0 0 0 84,100 A 16 16 0 0 0 116,100 Z
`;

const Icon3DTools = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="toolTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff6eb0" />
        <stop offset="50%" stopColor="#d4005a" />
        <stop offset="100%" stopColor="#6b0f4e" />
      </linearGradient>
      <linearGradient id="toolSide" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3a0028" />
        <stop offset="100%" stopColor="#5a0a3e" />
      </linearGradient>
      <linearGradient id="toolHL" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffaacc" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#d4005a" stopOpacity="0" />
      </linearGradient>
      <filter id="toolShadow">
        <feDropShadow dx="2" dy="10" stdDeviation="7" floodColor="#d4005a" floodOpacity="0.45" />
      </filter>
    </defs>
    <g filter="url(#toolShadow)">
      {/* Extrusion */}
      <path d={GEAR_PATH} fill="url(#toolSide)" fillRule="evenodd" transform="translate(7,7)" opacity="0.6" />
      {/* Face principale */}
      <path d={GEAR_PATH} fill="url(#toolTop)" fillRule="evenodd" />
      {/* Highlight */}
      <path d={GEAR_PATH} fill="url(#toolHL)" fillRule="evenodd" />
    </g>
  </svg>
);

const Icon3DPeople = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="peopleTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff6eb0" />
        <stop offset="50%" stopColor="#d4005a" />
        <stop offset="100%" stopColor="#6b0f4e" />
      </linearGradient>
      <linearGradient id="peopleBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4005a" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#3a0028" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id="peopleHL" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffaacc" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#d4005a" stopOpacity="0" />
      </linearGradient>
      <filter id="peopleShadow">
        <feDropShadow dx="2" dy="8" stdDeviation="6" floodColor="#d4005a" floodOpacity="0.4" />
      </filter>
    </defs>
    <g filter="url(#peopleShadow)">
      {/* Back people */}
      <ellipse cx="72" cy="70" rx="18" ry="18" fill="url(#peopleBg)" />
      <path d="M38 148 C38 122 54 112 72 112 C90 112 106 122 106 148 Z" fill="url(#peopleBg)" />
      <ellipse cx="128" cy="70" rx="18" ry="18" fill="url(#peopleBg)" />
      <path d="M94 148 C94 122 110 112 128 112 C146 112 162 122 162 148 Z" fill="url(#peopleBg)" />

      {/* Center person — extrusion */}
      <ellipse cx="106" cy="68" rx="22" ry="22" fill="url(#peopleTop)" opacity="0.3" transform="translate(4,6)" />
      <path d="M68 161 C68 132 84 120 106 120 C128 120 144 132 144 161 Z" fill="url(#peopleTop)" opacity="0.3" transform="translate(4,6)" />

      {/* Center person — front */}
      <ellipse cx="100" cy="62" rx="22" ry="22" fill="url(#peopleTop)" />
      <ellipse cx="100" cy="62" rx="22" ry="22" fill="url(#peopleHL)" />
      <path d="M62 155 C62 126 78 114 100 114 C122 114 138 126 138 155 Z" fill="url(#peopleTop)" />
      <path d="M62 155 C62 126 78 114 100 114 C122 114 138 126 138 155 Z" fill="url(#peopleHL)" />
    </g>
  </svg>
);

// ── Card data ─────────────────────────────────────────────────────────────────

const skillCards = [
  {
    title: "Tech / Web / IA",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "AI Agents", "Automation"],
    imageElement: <Icon3DCode />,
  },
  {
    title: "Tools",
    skills: ["GitHub", "Canva", "CRM", "CapCut", "Microsoft Office", "ChatGPT", "ChatGPT Prompting", "Claude Code", "Claude AI", "Claude Cowork"],
    imageElement: <Icon3DTools />,
  },
  {
    title: "Soft Skills",
    skills: ["Team Management", "Motivation", "Stress Resistance", "Autonomy", "Multitasking", "Learning"],
    imageElement: <Icon3DPeople />,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Skills() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const syncedProgress = useSpring(journeySkillsProgress, { stiffness: 140, damping: 24, mass: 0.9 });

  const { scrollYProgress: skillsScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "start 30%"],
  });

  const localProgressRaw = useTransform(skillsScrollProgress, [0, 1], [0, 1], { clamp: true });
  const localProgress = useSpring(localProgressRaw, { stiffness: 150, damping: 26, mass: 0.9 });

  const combinedProgress = useTransform(
    [syncedProgress, localProgress],
    ([j, l]) => Math.max(j as number, l as number),
  );

  const cardsOpacity = useTransform(combinedProgress, [0.12, 1], [0, 1]);
  const cardsY = useTransform(combinedProgress, [0, 1], [40, 0]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative bg-white py-16 pb-24 text-slate-900 sm:py-20 sm:pb-28"
      style={{ position: isMobile ? 'relative' : 'sticky', top: 0, zIndex: 200, borderRadius: '2rem 2rem 0 0' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-white" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{
            opacity: prefersReducedMotion ? 1 : cardsOpacity,
            y: prefersReducedMotion ? 0 : cardsY,
          }}
          className="flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:gap-10 lg:grid-cols-3"
        >
          {skillCards.map((card) => (
            <ProductHighlightCard
              key={card.title}
              title={card.title}
              skills={card.skills}
              imageElement={card.imageElement}
              className="w-full"
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
