"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const gradientStyle = {
  background: "linear-gradient(145deg, #1a0a2e 0%, #6b0f4e 35%, #d4005a 65%, #e8005a 80%, #ff0066 100%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
  filter: "drop-shadow(0px 10px 30px rgba(255, 0, 102, 0.4)) drop-shadow(0px 2px 8px rgba(212, 0, 90, 0.3))",
};

const Character = ({ char, index, centerIndex, scrollYProgress }: {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
}) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 1], [distanceFromCenter * 50, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [distanceFromCenter * 50, 0]);

  return (
    <motion.span
      className={cn("inline-block", isSpace && "w-4")}
      style={{ x, rotateX, ...gradientStyle }}
    >
      {char}
    </motion.span>
  );
};

export default function TextScroll() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "center center"] });

  const text = "See more from me";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  return (
    <div
      ref={targetRef}
      className="relative box-border flex h-[120vh] items-center justify-center bg-white"
    >
      <div
        className="w-full max-w-4xl text-center text-4xl md:text-6xl lg:text-7xl font-bold font-sans tracking-tight"
        style={{ perspective: "500px" }}
      >
        {characters.map((char, index) => (
          <Character
            key={index}
            char={char}
            index={index}
            centerIndex={centerIndex}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}
