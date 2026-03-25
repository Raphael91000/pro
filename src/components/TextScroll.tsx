"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const gradientStyle = {
  background: "linear-gradient(145deg, #1a0a2e 0%, #6b0f4e 35%, #d4005a 65%, #e8005a 80%, #ff0066 100%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

export default function TextScroll() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center center"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-80vw", "0vw"]);

  return (
    <div
      ref={targetRef}
      className="relative box-border flex h-[120vh] items-center justify-center bg-white overflow-hidden"
    >
      <div className="relative">
        {/* Texte invisible en flow normal — donne sa taille au wrapper + sert à mesurer */}
        <p
          aria-hidden="true"
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-sans tracking-tight text-center px-4 pointer-events-none select-none"
          style={{ ...gradientStyle, visibility: "hidden" }}
        >
          See more from me<span data-path-anchor="true" style={{ display: "inline" }} />
        </p>

        {/* Texte animé positionné par-dessus */}
        <motion.p
          aria-live="polite"
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-sans tracking-tight text-center px-4 absolute inset-0 pointer-events-none"
          style={{
            x,
            ...gradientStyle,
            filter: "drop-shadow(0px 10px 30px rgba(255, 0, 102, 0.4)) drop-shadow(0px 2px 8px rgba(212, 0, 90, 0.3))",
          }}
        >
          See more from me
        </motion.p>
      </div>
    </div>
  );
}
