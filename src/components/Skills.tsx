'use client';

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { journeySkillsProgress } from "../lib/motionValues";

const skillCards = [
  {
    title: "Tech / Web / IA",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "ChatGPT Prompting",
      "AI Agents",
      "Automation",
    ],
  },
  {
    title: "Tools",
    skills: ["CRM", "Canva", "GitHub", "Microsoft Office", "CapCut", "ChatGPT"],
  },
  {
    title: "Soft Skills",
    skills: [
      "Team Management",
      "Motivation",
      "Stress Resistance",
      "Autonomy",
      "Multitasking",
      "Learning",
    ],
  },
];

export default function Skills() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const syncedProgress = useSpring(journeySkillsProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.9,
  });

  const { scrollYProgress: skillsScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "start 30%"],
  });

  const localProgressRaw = useTransform(
    skillsScrollProgress,
    [0, 1],
    [0, 1],
    { clamp: true },
  );
  const localProgress = useSpring(localProgressRaw, {
    stiffness: 150,
    damping: 26,
    mass: 0.9,
  });

  const combinedProgress = useTransform(
    [syncedProgress, localProgress],
    ([journeyValue, localValue]) => Math.max(journeyValue, localValue),
  );

  const headingOpacity = useTransform(combinedProgress, [0.05, 0.35], [0, 1]);
  const headingY = useTransform(combinedProgress, [0, 1], [40, 0]);
  const cardsOpacity = useTransform(combinedProgress, [0.12, 1], [0, 1]);
  const cardsY = useTransform(combinedProgress, [0, 1], [40, 0]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative -mt-12 overflow-hidden bg-white py-16 text-slate-900 sm:-mt-60 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-white" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(92,111,244,0.08)_15%,rgba(232,112,194,0.12)_55%,rgba(255,255,255,1)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative mt-20">
          <motion.p
            style={{
              opacity: prefersReducedMotion ? 1 : headingOpacity,
              y: prefersReducedMotion ? 0 : headingY,
            }}
            className="absolute -top-32 left-0 text-[2rem] font-bold leading-tight text-slate-900 sm:text-[2.3rem] lg:text-[2.7rem]"
          >
            Browse my{" "}
            <span className="bg-gradient-to-r from-[#5c6ff4] via-[#7b6ff4] to-[#e870c2] bg-clip-text text-transparent">
              skills.
            </span>
          </motion.p>

          <motion.div
            style={{
              opacity: prefersReducedMotion ? 1 : cardsOpacity,
              y: prefersReducedMotion ? 0 : cardsY,
            }}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
          >
            {skillCards.map((card) => (
              <div
                key={card.title}
                className="relative min-w-[280px] snap-center sm:min-w-0"
              >
                <div
                  className="pointer-events-none absolute inset-0 -z-10 translate-y-[-8%] rounded-[36px] bg-gradient-to-r from-[#5c6ff4]/55 via-[#7b6ff4]/45 to-[#e870c2]/60 opacity-65 blur-2xl transition-opacity duration-500"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 -z-10 translate-y-[-8%] rounded-[36px] bg-white/25 opacity-35"
                  style={{ filter: "url(#glass-distortion)", mixBlendMode: "screen" }}
                  aria-hidden="true"
                />

                <div className="group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[32px] border border-white/65 bg-white p-6 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.35)] ring-1 ring-[#5c6ff4]/45 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/75 dark:ring-[#5c6ff4]/30">
                  <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-white/90 dark:bg-white/10" />

                  <div className="relative flex h-full flex-col justify-between">
                    <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                      {card.title}
                    </h3>

                    <ul className="mt-6 space-y-2.5">
                      {card.skills.map((skill) => (
                        <li
                          key={skill}
                          className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm dark:bg-white/10 dark:text-white/90"
                        >
                          <span>{skill}</span>
                          <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                            {card.title.split(" ")[0]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="mt-6 flex justify-end gap-2 sm:hidden" />
        </div>
      </div>
    </section>
  );
}
