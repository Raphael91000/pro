'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import AppleCards from './ui/apple-cards';

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasReachedLastCard, setHasReachedLastCard] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end start'],
  });

  const transitionProgress = useTransform(
    scrollYProgress,
    [0.52, 0.88],
    [0, 1],
    { clamp: true },
  );

  const journeyShiftRange: [string, string] = ['0%', '-55%'];

  const revealProgress = useSpring(0, {
    stiffness: 160,
    damping: 26,
    mass: 0.9,
  });

  useEffect(() => {
    const unsubscribe = transitionProgress.on("change", (value) => {
      revealProgress.set(hasReachedLastCard ? value : 0);
    });
    return () => unsubscribe();
  }, [transitionProgress, revealProgress, hasReachedLastCard]);

  useEffect(() => {
    if (!hasReachedLastCard) {
      revealProgress.set(0);
    } else {
      revealProgress.set(transitionProgress.get());
    }
  }, [hasReachedLastCard, revealProgress, transitionProgress]);

  const fastRevealProgress = useTransform(
    revealProgress,
    [0, 0.24],
    [0, 1],
    { clamp: true },
  );

  const titleX = useTransform(fastRevealProgress, [0, 1], journeyShiftRange);

  const appleCardsX = useTransform(
    fastRevealProgress,
    [0, 1],
    journeyShiftRange,
  );
  const appleCardsOpacity = useTransform(fastRevealProgress, [0, 1], [1, 0]);
  const appleCardsScale = useTransform(fastRevealProgress, [0, 1], [1, 0.94]);

  return (
    <div
      ref={containerRef}
      className="relative -mt-32 sm:-mt-40 lg:-mt-48 min-h-[120vh] sm:min-h-[135vh] lg:min-h-[155vh]"
    >
      <section
        id="journey"
        className="sticky top-0 flex h-screen items-center overflow-hidden"
      >
        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative z-28 mt-10 mb-0 text-left sm:pl-4 lg:pl-6"
            style={{ x: titleX }}
          >
            <motion.h2 className="text-[2rem] font-bold leading-tight text-slate-700 sm:text-[2.3rem] lg:text-[2.7rem]">
              <span>Switch and click for discover </span>
              <span className="bg-gradient-to-r from-[#5c6ff4] via-[#7b6ff4] to-[#e870c2] bg-clip-text text-transparent">
                my journey.
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            style={{
              x: appleCardsX,
              opacity: appleCardsOpacity,
              scale: appleCardsScale,
            }}
            className="relative z-30 will-change-transform"
          >
            <AppleCards onEndReachedChange={setHasReachedLastCard} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
