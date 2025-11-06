'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

export function HeroTransitionOverlay() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 25 && latest < 360);
  });

  useEffect(() => {
    setVisible(scrollY.get() > 25 && scrollY.get() < 360);
  }, [scrollY]);

  if (!visible) {
    return null;
  }

  const blurStrength = useTransform(scrollY, [40, 200], [0, 18], { clamp: true });
  const tintOpacity = useTransform(scrollY, [40, 200], [0, 0.7], { clamp: true });
  const glowOpacity = useTransform(scrollY, [40, 120, 260], [0, 0.85, 0], { clamp: true });
  const containerOpacity = useTransform(scrollY, [40, 120, 320], [0, 1, 0], { clamp: true });
  const blurFilter = useTransform(blurStrength, (blur) => `blur(${Math.max(0, blur)}px)`);

  const backgroundGradient = useMemo(
    () =>
      'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(246,247,255,0.65) 45%, rgba(11,18,32,0.95) 100%)',
    []
  );

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[340px] overflow-hidden"
      style={{ opacity: containerOpacity }}
    >
      <motion.div
        className="absolute inset-0 bg-white"
        style={{
          filter: blurFilter,
          opacity: tintOpacity,
          background: backgroundGradient,
        }}
      />

      <motion.div
        className="absolute inset-x-0 top-[55%] h-36 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#5c6ff4]/40 via-[#7b6ff4]/18 to-[#e870c2]/35 blur-3xl"
        style={{ opacity: glowOpacity }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-transparent mix-blend-overlay"
        style={{ opacity: glowOpacity }}
      />
    </motion.div>
  );
}
