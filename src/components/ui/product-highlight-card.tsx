"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductHighlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  skills: string[];
  imageElement: React.ReactNode;
}

export const ProductHighlightCard = React.forwardRef<HTMLDivElement, ProductHighlightCardProps>(
  ({ className, title, skills, imageElement, ...props }, ref) => {
    const [hovered, setHovered] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    };

    const rotateX = useTransform(mouseY, [0, 460], [6, -6]);
    const rotateY = useTransform(mouseX, [0, 350], [-6, 6]);
    const springConfig = { stiffness: 280, damping: 24 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const glowX = useTransform(mouseX, [0, 350], [0, 100]);
    const glowY = useTransform(mouseY, [0, 460], [0, 100]);
    const rawGlow = useMotionValue(0);
    const glowOpacity = useSpring(rawGlow, { stiffness: 200, damping: 20 });

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => { handleMouseMove(e); rawGlow.set(1); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); rawGlow.set(0); setHovered(false); }}
        style={{ rotateX: springRotateX, rotateY: springRotateY }}
        className={cn(
          "relative h-[460px] w-full rounded-2xl bg-white border border-slate-100 shadow-md transition-shadow duration-300 hover:shadow-xl",
          className
        )}
        {...props}
      >
        {/* Bordure qui s'illumine au hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            opacity: glowOpacity,
            boxShadow: "inset 0 0 0 1.5px rgba(255,0,102,0.5), 0 0 40px -8px rgba(212,0,90,0.3)",
          }}
        />

        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="relative z-10 flex h-full flex-col p-7">
            <h2
              className="text-4xl font-bold tracking-tight mb-6"
              style={{
                background: "linear-gradient(135deg, #ff0066 0%, #d4005a 40%, #6b0f4e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {title}
            </h2>

            <ul className="space-y-3">
              {skills.map((skill) => (
                <li key={skill} className="flex items-center gap-3 text-base font-medium text-slate-700">
                  <span
                    className="text-lg leading-none flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #ff0066, #6b0f4e)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >•</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Icône animée — en dehors du overflow-hidden pour déborder de la card */}
        <motion.div
          animate={hovered ? {
            rotateY: -30,
            rotateX: 12,
            y: -20,
            x: 8,
            scale: 1.25,
            filter: "drop-shadow(0px 28px 36px rgba(212,0,90,0.65)) drop-shadow(0px 10px 20px rgba(0,0,0,0.35))",
          } : {
            rotateY: 0,
            rotateX: 0,
            y: 0,
            x: 0,
            scale: 1,
            filter: "drop-shadow(0px 6px 12px rgba(0,0,0,0.2))",
          }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          style={{ transformStyle: "preserve-3d", zIndex: 30 }}
          className="absolute right-[-2.5rem] bottom-[-2.5rem] h-44 w-44 cursor-default"
        >
          {imageElement}
        </motion.div>
      </motion.div>
    );
  }
);

ProductHighlightCard.displayName = "ProductHighlightCard";
