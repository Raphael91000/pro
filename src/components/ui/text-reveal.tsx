"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
  cardClassName?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
  cardClassName,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const acceleratedProgress = useTransform(
    scrollYProgress,
    [0, 0.28, 0.45, 1],
    [0, 1, 1, 1],
    { clamp: true }
  );

  const words = text.split(" ");
  const totalWords = words.length || 1;
  const baseSegment = 1 / totalWords;
  const overlap = baseSegment * 1.05;

  return (
    <div
      ref={targetRef}
      className={cn("relative z-0", className)}
      style={{ height: `${Math.max(260, totalWords * 12)}vh` }}
    >
      <div className="sticky top-[15vh] mx-auto flex h-[60vh] w-full max-w-5xl items-center justify-center px-5 py-10 sm:w-[70vw] sm:px-6 md:px-8 md:py-12">
        <div className="group relative w-full rounded-[32px] p-[2px]">
          <div
            className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-r from-[#5c6ff4]/55 via-[#7b6ff4]/45 to-[#e870c2]/60 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 rounded-[32px] bg-white/25 opacity-35"
            style={{ filter: "url(#glass-distortion)", mixBlendMode: "screen" }}
            aria-hidden="true"
          />

          <div
            className={cn(
              "relative w-full rounded-[30px] border border-white/65 bg-white/95 p-6 shadow-[0_45px_110px_-55px_rgba(92,111,244,0.55)] md:p-10",
              "before:pointer-events-none before:absolute before:inset-x-4 before:top-2 before:h-[55%] before:rounded-[26px] before:bg-gradient-to-b before:from-white/70 before:via-white/20 before:to-transparent before:opacity-70",
              "ring-1 ring-[#5c6ff4]/45 dark:ring-[#5c6ff4]/30 dark:border-white/10 dark:bg-slate-950/80",
              "backdrop-blur-md",
              cardClassName
            )}
          >
            <p className="flex flex-wrap text-2xl font-bold leading-tight text-black/20 dark:text-white/20 md:text-3xl lg:text-4xl xl:text-[2.75rem]">
              {words.map((word, i) => {
                const start = Math.max(0, i * baseSegment - overlap * 0.5);
                const end = Math.min(1, start + baseSegment + overlap);

                return (
                  <Word
                    key={`${word}-${i}`}
                    progress={acceleratedProgress}
                    range={[start, end]}
                  >
                    {word}
                  </Word>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1], { clamp: true });

  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span style={{ opacity }} className="text-black dark:text-white">
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };
