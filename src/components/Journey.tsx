'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
} from 'framer-motion';
import AppleCards from './ui/apple-cards';
import { journeySkillsProgress } from '../lib/motionValues';

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [hasReachedLastCard, setHasReachedLastCard] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* --------------------------------------------------
   * Responsive detection (safe client-side)
   * -------------------------------------------------- */
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* --------------------------------------------------
   * Scroll logic (desktop only)
   * -------------------------------------------------- */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end start'],
  });

  const transitionProgress = useTransform(
    scrollYProgress,
    isMobile ? [0.1, 0.4] : [0.52, 0.88],
    [0, 1],
    { clamp: true }
  );

  const revealProgress = useSpring(0, {
    stiffness: 160,
    damping: 26,
    mass: 0.9,
  });

  /* --------------------------------------------------
   * Reveal orchestration
   * -------------------------------------------------- */
  useEffect(() => {
    if (isMobile || prefersReducedMotion) {
      revealProgress.set(1);
      journeySkillsProgress.set(1);
      return;
    }

    const unsubscribe = transitionProgress.on('change', (v) => {
      revealProgress.set(hasReachedLastCard ? v : 0);
    });

    return () => unsubscribe();
  }, [
    isMobile,
    prefersReducedMotion,
    transitionProgress,
    revealProgress,
    hasReachedLastCard,
  ]);

  /* --------------------------------------------------
   * Fast reveal phase
   * -------------------------------------------------- */
  const fastRevealProgress = useTransform(
    revealProgress,
    [0, 0.24],
    [0, 1],
    { clamp: true }
  );

  /* --------------------------------------------------
   * Motion values
   * -------------------------------------------------- */
  const journeyShiftRange = useMemo<[string, string]>(
    () => ['0%', '-55%'],
    []
  );

  const titleX = useTransform(fastRevealProgress, [0, 1], journeyShiftRange);

  const appleCardsX = useTransform(
    fastRevealProgress,
    [0, 1],
    journeyShiftRange
  );

  const appleCardsScale = useTransform(
    fastRevealProgress,
    [0, 1],
    [1, 0.94]
  );

  const appleCardsY = useTransform(
    fastRevealProgress,
    [0, 1],
    [0, -40]
  );

  /* --------------------------------------------------
   * External sync (skills)
   * -------------------------------------------------- */
  useMotionValueEvent(fastRevealProgress, 'change', (v) => {
    if (!prefersReducedMotion && !isMobile) {
      journeySkillsProgress.set(v);
    }
  });

  /* --------------------------------------------------
   * Render
   * -------------------------------------------------- */
  return (
    <div
      ref={containerRef}
      className="
        relative
        -mt-32 sm:-mt-40 lg:-mt-48
        min-h-[120vh] sm:min-h-[135vh] lg:min-h-[155vh]
      "
    >
      <section
        id="journey"
        className="
          sticky top-0 h-screen
          flex items-center overflow-hidden
          max-md:static max-md:h-auto
        "
      >
        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative z-20 mt-10 text-left sm:pl-4 lg:pl-6"
            style={{ x: isMobile ? 0 : titleX }}
          >
            <motion.h2 className="text-[2rem] font-bold leading-tight text-slate-700 sm:text-[2.3rem] lg:text-[2.7rem]">
              <span>Switch and click for discover </span>
              <span className="bg-gradient-to-r from-[#5c6ff4] via-[#7b6ff4] to-[#e870c2] bg-clip-text text-transparent">
                my journey.
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="relative z-30 will-change-transform"
            style={{
              x: isMobile ? 0 : appleCardsX,
              scale: isMobile ? 1 : appleCardsScale,
              y: isMobile || prefersReducedMotion ? 0 : appleCardsY,
              opacity: 1,
            }}
          >
            <AppleCards onEndReachedChange={setHasReachedLastCard} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
