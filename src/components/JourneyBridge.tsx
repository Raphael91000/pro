"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Le path part vers la droite depuis le "e" (direction naturelle de la boucle),
// fait une boucle, puis descend vers la section Journey
const PATH =
  "M876 394 C980 392 1080 320 1060 220 C1040 120 880 60 760 140 C640 220 660 380 780 420 C700 580 400 660 300 880 C200 1100 380 1200 580 1160 C780 1120 700 1380 560 1580 C420 1780 580 1880 480 2100";

// Point de départ M dans le viewBox
const PATH_START_X = 876;
const PATH_START_Y = 394;
const VIEWBOX_W = 1278;

interface AnchorPos {
  left: number;
  top: number;
  width: number;
}

export default function JourneyBridge({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<AnchorPos | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mobile : offset réduit pour que le tracé se complète plus vite
  // Desktop : offset original inchangé
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: isMobile ? ["start -10%", "start -55%"] : ["start -10%", "start -120%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useLayoutEffect(() => {
    function measure() {
      const anchor = document.querySelector<HTMLElement>('[data-path-anchor="true"]');
      if (!anchor || !wrapperRef.current) return;

      const anchorRect = anchor.getBoundingClientRect();
      const wrapperRect = wrapperRef.current.getBoundingClientRect();

      // Position du bord droit du "e" par rapport au wrapper
      const relX = anchorRect.left - wrapperRect.left;
      const relY = anchorRect.top + anchorRect.height / 2 - wrapperRect.top;

      const svgWidth = Math.min(window.innerWidth * 0.5, 560);
      const scale = svgWidth / VIEWBOX_W;

      setPos({
        left: relX - PATH_START_X * scale,
        top: relY - PATH_START_Y * scale,
        width: svgWidth,
      });
    }

    document.fonts.ready.then(() => {
      // Double RAF : garantit que le layout est finalisé avant de mesurer
      requestAnimationFrame(() => requestAnimationFrame(measure));
    });
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {children}

      {pos && (
        <div
          className="absolute pointer-events-none"
          style={{ left: pos.left, top: pos.top, width: pos.width, zIndex: 0 }}
        >
          <svg
            viewBox="0 0 1278 2319"
            fill="none"
            overflow="visible"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "auto" }}
          >
            <defs>
              <linearGradient id="bridgeGradient" x1="639" y1="0" x2="639" y2="2480" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff0066" />
                <stop offset="35%" stopColor="#d4005a" />
                <stop offset="65%" stopColor="#6b0f4e" />
                <stop offset="100%" stopColor="#1a0a2e" />
              </linearGradient>
            </defs>

            {/* Tracé fantôme */}
            <path d={PATH} stroke="rgba(212,0,90,0.07)" strokeWidth="12" fill="none" strokeLinecap="round" />

            {/* Tracé animé au scroll */}
            <motion.path
              d={PATH}
              stroke="url(#bridgeGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>
        </div>
      )}
    </div>
  );
}
