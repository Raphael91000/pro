"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  // 🌈 Fond blanc, lucioles colorées façon Apple
  gradientBackgroundStart = "rgb(255, 255, 255)",
  gradientBackgroundEnd = "rgb(255, 255, 255)",
  firstColor = "255, 0, 128",
  secondColor = "147, 51, 234",
  thirdColor = "77, 166, 255",
  fourthColor = "255, 77, 166",
  fifthColor = "138, 180, 255",
  pointerColor = "140, 100, 255",
  size = "30%",
  blendingValue = "overlay",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  const [isSafari, setIsSafari] = useState(false);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 🌱 Initialisation des variables CSS
  useEffect(() => {
    const root = document.body.style;
    root.setProperty("--gradient-background-start", gradientBackgroundStart);
    root.setProperty("--gradient-background-end", gradientBackgroundEnd);
    root.setProperty("--first-color", firstColor);
    root.setProperty("--second-color", secondColor);
    root.setProperty("--third-color", thirdColor);
    root.setProperty("--fourth-color", fourthColor);
    root.setProperty("--fifth-color", fifthColor);
    root.setProperty("--pointer-color", pointerColor);
    root.setProperty("--size", size);
    root.setProperty("--blending-value", blendingValue);
  }, []);

  // ⚡ Mouvements interactifs (allégés)
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!interactive) return;

    let rafId: number;
    const move = () => {
      if (!interactiveRef.current) return;
      setCurX((prev) => prev + (tgX - prev) / 20);
      setCurY((prev) => prev + (tgY - prev) / 20);
      interactiveRef.current.style.transform = `translate3d(${Math.round(
        curX
      )}px, ${Math.round(curY)}px, 0)`;
      rafId = requestAnimationFrame(move);
    };

    rafId = requestAnimationFrame(move);
    return () => cancelAnimationFrame(rafId);
  }, [tgX, tgY, prefersReducedMotion, interactive]);

  // 🧠 Gère la position du curseur
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveRef.current) return;
    const rect = interactiveRef.current.getBoundingClientRect();
    setTgX(event.clientX - rect.left);
    setTgY(event.clientY - rect.top);
  };

  // 🍏 Détection Safari (pour le filtre blur)
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  // ⏸️ Suspendre les animations quand l’onglet est inactif
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleVisibilityChange = () => {
      const root = document.documentElement;
      if (document.hidden) {
        root.style.setProperty("--pause-animations", "paused");
      } else {
        root.style.setProperty("--pause-animations", "running");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [prefersReducedMotion]);

  return (
    <div
      className={cn(
        "h-screen w-screen relative overflow-hidden top-0 left-0 will-change-transform bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className={cn("", className)}>{children}</div>

      <div
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
        style={{ animationPlayState: "var(--pause-animations, running)" }}
      >
        {/* Les 5 lucioles animées */}
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]`,
            `top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:center_center] animate-first opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]`,
            `top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-400px)] animate-second opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]`,
            `top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%+400px)] animate-third opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]`,
            `top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-200px)] animate-fourth opacity-70`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]`,
            `top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-800px)_calc(50%+800px)] animate-fifth opacity-100`
          )}
        ></div>

        {/* Effet interactif */}
        {interactive && !prefersReducedMotion && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2 opacity-70`
            )}
            style={{ willChange: "transform" }}
          ></div>
        )}
      </div>
    </div>
  );
};
