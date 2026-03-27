"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, color-mix(in srgb, hsl(var(--foreground)) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, hsl(var(--foreground)) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* -------------------------------------------------------------------
     PHYSICAL SKEUOMORPHIC MATERIALS (Restored 3D Depth)
  ---------------------------------------------------------------------- */
  
  /* OUTSIDE THE CARD: Theme-aware text (Shadow in Light Mode, Glow in Dark Mode) */
  .text-3d-matte {
      color: hsl(var(--foreground));
      text-shadow: 
          0 10px 30px color-mix(in srgb, hsl(var(--foreground)) 20%, transparent), 
          0 2px 4px color-mix(in srgb, hsl(var(--foreground)) 10%, transparent);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, #1a0a2e 0%, #6b0f4e 35%, #d4005a 65%, #e8005a 80%, #ff0066 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter:
          drop-shadow(0px 10px 30px rgba(255, 0, 102, 0.4))
          drop-shadow(0px 2px 8px rgba(212, 0, 90, 0.3));
  }

  /* INSIDE THE CARD: Hardcoded Silver/White for the dark background, deep rich shadows */
  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  /* Deep Physical Card with Dynamic Mouse Lighting */
  .premium-depth-card {
      background: linear-gradient(325deg, #1a0a2e 0%, #6b0f4e 35%, #d4005a 65%, #e8005a 80%, #ff0066 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* Realistic iPhone Mockup Hardware */
  .iphone-bezel {
      background-color: #111;
      box-shadow: 
          inset 0 0 0 2px #52525B, 
          inset 0 0 0 7px #000, 
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow: 
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 
          0 10px 20px rgba(0,0,0,0.3),
          inset 0 1px 1px rgba(255,255,255,0.05),
          inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  /* Physical Tactile Buttons */
  .btn-modern-light, .btn-modern-dark {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
      color: #0F172A;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:active {
      transform: translateY(1px);
      background: linear-gradient(180deg, #F1F5F9 0%, #E2E8F0 100%);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1), inset 0 3px 6px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.02);
  }
  .btn-modern-dark {
      background: linear-gradient(180deg, #27272A 0%, #18181B 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #3F3F46 0%, #27272A 100%);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:active {
      transform: translateY(1px);
      background: #18181B;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.05), inset 0 3px 8px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(0,0,0,0.5);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }

  .app-img {
    position: absolute;
    bottom: 0;
    left: 12%;
    transform: translateX(-50%);
    width: 200vw;
    max-width: none;
    pointer-events: none;
    user-select: none;
  }
  @media (max-width: 767px) {
    .hero-text-wrapper {
      padding-bottom: 55vh !important;
    }
  }

  @media (min-width: 768px) {
    .app-img {
      top: 50%;
      bottom: auto;
      left: 60%;
      width: 80%;
      max-width: 1100px;
    }
  }

`;

// ── Social Dock ────────────────────────────────────────────────────────────

const webOptions = [
  { label: "Siteasy",  href: "https://siteeasy.krglobalsolutionsltd.com/" },
  { label: "Codio",    href: "https://www.codio.studio/" },
  { label: "NeuroBot", href: "https://error404-two.vercel.app/" },
];

const GRAD = "linear-gradient(135deg, #ff0066 0%, #d4005a 40%, #6b0f4e 100%)";
const iconClass = "flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-125 cursor-pointer";

const DockIcon = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="relative group flex flex-col items-center">
    <div className="absolute bottom-full mb-3 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
      <div
        className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold whitespace-nowrap"
        style={{ background: GRAD }}
      >
        {label}
      </div>
      <div
        className="w-0 h-0"
        style={{
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: "6px solid #d4005a",
        }}
      />
    </div>
    {children}
  </div>
);

// Applique le dégradé sur une image SVG via CSS mask
const GradientImg = ({ src, alt }: { src: string; alt: string }) => (
  <div
    aria-label={alt}
    style={{
      width: 26, height: 26,
      background: GRAD,
      WebkitMaskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      WebkitMaskPosition: "center",
      maskImage: `url(${src})`,
      maskRepeat: "no-repeat",
      maskSize: "contain",
      maskPosition: "center",
    }}
  />
);

function SocialDock() {
  const [webOpen, setWebOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!webOpen) return;
    const handler = () => setWebOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [webOpen]);

  return (
    <div
      className="hero-dock absolute bottom-12 md:bottom-12 left-10 md:left-16 z-[15] pointer-events-auto transition-all duration-300 max-md:bottom-24"
      style={{
        transform: "translateX(0)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Web dropdown */}
      {webOpen && (
        <div className="absolute bottom-full mb-3 w-56 rounded-2xl border border-black/10 bg-white backdrop-blur-xl p-2 flex flex-col gap-1 shadow-xl" style={{ left: "calc(50% + 40px)", transform: "translateX(-50%)" }}>
          {webOptions.map((opt) => (
            <a
              key={opt.href}
              href={opt.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setWebOpen(false)}
              className="rounded-xl px-3 py-2 text-sm text-black font-medium hover:bg-black/5 transition-colors"
            >
              {opt.label}
            </a>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">

        {/* LinkedIn */}
        <DockIcon label="LinkedIn">
          <a href="https://www.linkedin.com/in/raphael-theuillon-689139261/" target="_blank" rel="noopener noreferrer" className={iconClass}>
            <svg width="36" height="36" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="g-li" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff0066"/><stop offset="40%" stopColor="#d4005a"/><stop offset="100%" stopColor="#6b0f4e"/>
                </linearGradient>
              </defs>
              <path fill="url(#g-li)" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect fill="url(#g-li)" x="2" y="9" width="4" height="12"/>
              <circle fill="url(#g-li)" cx="4" cy="4" r="2"/>
            </svg>
          </a>
        </DockIcon>

        {/* GitHub */}
        <DockIcon label="GitHub">
          <a href="https://github.com/Raphael91000" target="_blank" rel="noopener noreferrer" className={iconClass}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="g-gh" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff0066"/><stop offset="40%" stopColor="#d4005a"/><stop offset="100%" stopColor="#6b0f4e"/>
                </linearGradient>
              </defs>
              <path fill="url(#g-gh)" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>
        </DockIcon>

        {/* Divider */}
        <div className="w-px h-6 bg-white/25 mx-1" />

        {/* Sites web */}
        <DockIcon label="Sites web">
          <button onClick={(e) => { e.stopPropagation(); setWebOpen((v) => !v); }} className={iconClass} aria-label="Sites web">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="g-globe" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff0066"/><stop offset="40%" stopColor="#d4005a"/><stop offset="100%" stopColor="#6b0f4e"/>
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="10" stroke="url(#g-globe)" strokeWidth="2"/>
              <line x1="2" y1="12" x2="22" y2="12" stroke="url(#g-globe)" strokeWidth="2"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="url(#g-globe)" strokeWidth="2"/>
            </svg>
          </button>
        </DockIcon>

        {/* WhatsApp */}
        <DockIcon label="WhatsApp">
          <a href="https://wa.me/33761848332" target="_blank" rel="noopener noreferrer" className={iconClass}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="g-wa" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff0066"/><stop offset="40%" stopColor="#d4005a"/><stop offset="100%" stopColor="#6b0f4e"/>
                </linearGradient>
              </defs>
              <path fill="url(#g-wa)" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path fill="url(#g-wa)" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.304A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 0 1-4.076-1.117l-.292-.173-3.024.792.807-2.944-.19-.302A7.96 7.96 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
            </svg>
          </a>
        </DockIcon>

      </div>
    </div>
  );
}

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({ 
  brandName = "Sobers",
  tagline1 = "Track the journey,",
  tagline2 = "not just the days.",
  cardHeading = "Accountability, redefined.",
  cardDescription = <><span className="text-white font-semibold">Sobers</span> empowers sponsors and sponsees in 12-step recovery programs with structured accountability, precise sobriety tracking, and beautiful visual timelines.</>,
  metricValue = 365,
  metricLabel = "Days Sober",
  ctaHeading = "Start your recovery.",
  ctaDescription = "Join thousands of others in the 12-step program and take control of your timeline today.",
  className, 
  ...props 
}: CinematicHeroProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
const requestRef = useRef<number>(0);

  // 1. High-Performance Mouse Interaction Logic (Using requestAnimationFrame)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            x: xVal * 8,
            y: yVal * 6,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  },[]);

  // 2. Complex Cinematic Scroll Timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });
      gsap.set(".app2-hero-img", { autoAlpha: 0 });
      gsap.set([".card-reveal-left", ".card-reveal-right"], { autoAlpha: 0, y: 20 });
      gsap.set([".app-hero-img", ".hero-dock"], { autoAlpha: 0 });

      const introTl = gsap.timeline({ delay: 0.3 });

      // Config GPU globale
      gsap.config({ force3D: true });

      if (!isMobile) {
        // Desktop : texte + dock de gauche, app.png de droite
        gsap.set(".text-track", { autoAlpha: 0, x: -100, filter: "blur(12px)", force3D: true });
        gsap.set(".text-days", { autoAlpha: 0, x: -80, force3D: true });
        gsap.set(".hero-dock", { autoAlpha: 0, y: 30, force3D: true });
        // xPercent/yPercent gèrent le centrage, x gère le slide — GSAP les combine sans conflit
        gsap.set(".app-hero-img", { autoAlpha: 0, x: 120, xPercent: -50, yPercent: -50, force3D: true });

        introTl
          .to(".text-track", { duration: 1.6, autoAlpha: 1, x: 0, filter: "blur(0px)", ease: "power4.out", force3D: true, clearProps: "filter" })
          .to(".text-days", { duration: 1.4, autoAlpha: 1, x: 0, ease: "power4.out", force3D: true }, "-=1.1")
          .to(".hero-dock", { duration: 1.2, autoAlpha: 1, y: 0, ease: "power4.out", force3D: true }, "-=1.0")
          .to(".app-hero-img", { duration: 1.6, autoAlpha: 1, x: 0, ease: "power4.out", force3D: true }, "-=1.4");
      } else {
        // Mobile : animation originale verticale
        gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20, force3D: true });
        gsap.set(".text-days", { autoAlpha: 0, y: 40, force3D: true });

        introTl
          .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out", force3D: true, clearProps: "filter" })
          .to(".text-days", { duration: 1.4, autoAlpha: 1, y: 0, ease: "expo.out", force3D: true }, "-=1.0")
          .to([".app-hero-img", ".hero-dock"], { autoAlpha: 1, duration: 1.2, ease: "power2.out", force3D: true }, "-=1.0");
      }

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=7000",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      scrollTl
        .set([".app-hero-img", ".hero-dock"], { autoAlpha: 1 }, 0)
        .to(".bg-hero-img", { autoAlpha: 0, ease: "power2.inOut", duration: 1.5 }, 0)
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, autoAlpha: 0, scale: 0.6 },
          { y: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
.fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 }) 
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -40, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .fromTo([".app-hero-img", ".hero-dock"], { autoAlpha: 1 }, { autoAlpha: 0, ease: "power2.in", duration: 0.6 }, "<")
        // Responsive card pullback sizing
        .to(".main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut",
          duration: 1.8
        }, "pullback")
        .to(".app2-hero-img", { autoAlpha: 1, ease: "power2.inOut", duration: 1.5 }, "pullback")
        .to([".card-reveal-left", ".card-reveal-right"], { autoAlpha: 1, y: 0, ease: "expo.out", duration: 1.5, stagger: 0.15 }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .set(".main-card", { overflow: "visible" })
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 })
        .to([".app2-hero-img", ".app2-halo"], { y: window.innerHeight + 300, ease: "power3.in", duration: 1.5 }, "<")
        .to(".app2-halo", { opacity: 1, ease: "power2.inOut", duration: 0.6 }, "<");

    }, containerRef);

    // Force recalcul des positions après le rendu initial (critique sur mobile)
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  },[metricValue]); 

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-background text-foreground font-sans antialiased", className)}
      style={{ perspective: "1500px", touchAction: "pan-y" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* bg.png — fond plein écran */}
      <img src="/bg.png" alt="" aria-hidden="true" className="bg-hero-img absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-[1]" />
      {/* app.png — par dessus */}
      <img src="/app.png" alt="" aria-hidden="true" className="app-img app-hero-img z-[2]" />

      {/* BACKGROUND LAYER: Hero Texts */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-start justify-center text-left w-screen px-10 md:px-16 will-change-transform transform-style-3d pointer-events-none" style={{ paddingBottom: "26vh" }}>
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
          {tagline1}
        </h1>
        <h1 className="text-days text-silver-matte text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">
          {tagline2}
        </h1>
      </div>

      {/* BACKGROUND LAYER 2: Tactile CTA Buttons */}
      <div className="cta-wrapper absolute z-10 flex items-center justify-center w-screen pl-[44rem] gsap-reveal pointer-events-none will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-silver-matte text-center">
          {ctaHeading.split(". ")[1]}
        </h2>
      </div>

      {/* FOREGROUND LAYER: The Physical Deep Blue Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
          style={{ touchAction: "pan-y" }}
        >
          <div className="card-sheen" aria-hidden="true" />
          <img src="/app2.png" alt="" aria-hidden="true" className="app2-hero-img absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-[5]" style={{ opacity: 0 }} />
          <div className="card-reveal-left absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 z-[8] pointer-events-none" style={{ opacity: 0 }}>
            <span className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-card-silver-matte">You bring</span>
          </div>
          <div className="card-reveal-right absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-[8] pointer-events-none text-right" style={{ opacity: 0 }}>
            <span className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-card-silver-matte">the idea</span>
          </div>
          <div className="app2-halo absolute bottom-0 left-[21.5rem] right-[19.5rem] h-8 pointer-events-none z-[6]" aria-hidden="true" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))", opacity: 0 }} />

          {/* DYNAMIC RESPONSIVE GRID: Flex-col on mobile to force order, Grid on desktop */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            
            {/* 1. TOP (Mobile) / RIGHT (Desktop): BRAND NAME */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex flex-col items-center lg:items-end justify-center z-20 w-full">
<h2 className="text-6xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-card-silver-matte lg:-mt-8 lg:-mr-12">
                {brandName}
              </h2>
            </div>

            {/* 2. MIDDLE (Mobile) / CENTER (Desktop): IPHONE MOCKUP */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10">
              
              {/* Inner wrapper for safe CSS scaling that doesn't conflict with GSAP */}
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">
                
                {/* The iPhone Bezel */}
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform"
                >
                  {/* Physical Hardware Buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {/* Inner Screen Container — uses flex-1 + margin instead of absolute positioning */}
                  <div className="flex-1 m-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white relative z-10 transform-gpu isolate">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Island Notch */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                    </div>

                    {/* App Interface */}
                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                      <div className="phone-widget flex justify-between items-center mb-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-1">Today</span>
                          <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">Journey</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/5 text-neutral-200 flex items-center justify-center font-bold text-sm border border-white/10 shadow-lg shadow-black/50">RT</div>
                      </div>

                      <div className="phone-widget relative w-44 h-44 mx-auto flex items-center justify-center mb-8 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                          <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#1a0a2e" />
                              <stop offset="35%" stopColor="#6b0f4e" />
                              <stop offset="65%" stopColor="#d4005a" />
                              <stop offset="80%" stopColor="#e8005a" />
                              <stop offset="100%" stopColor="#ff0066" />
                            </linearGradient>
                          </defs>
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                          <circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="url(#progressGradient)" strokeWidth="12" />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="counter-val text-4xl font-extrabold tracking-tighter text-white">0</span>
                          <span className="text-[8px] text-blue-200/50 uppercase tracking-[0.1em] font-bold mt-0.5">{metricLabel}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/30 to-pink-700/10 flex items-center justify-center flex-shrink-0 border border-pink-400/20 shadow-inner text-pink-400 font-bold text-sm">
                            A
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-bold text-pink-400 mb-0.5">Alex Johnson</p>
                            <p className="text-[10px] text-white/80 leading-tight truncate">Hey Raphael, are you available for a new project?</p>
                          </div>
                        </div>
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/30 to-pink-700/10 flex items-center justify-center flex-shrink-0 border border-pink-400/20 shadow-inner text-pink-400 font-bold text-sm">
                            M
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-bold text-pink-400 mb-0.5">Marie Dupont</p>
                            <p className="text-[10px] text-white/80 leading-tight truncate">Thanks for the website, the quality is amazing!</p>
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    </div>
                  </div>
                </div>

{/* Floating Glass Badges — siblings of bezel, positioned relative to scale wrapper */}
                <div className="floating-badge absolute flex top-6 -left-20 floating-ui-badge rounded-2xl p-4 items-center gap-4 z-30">
                  <span className="text-xl drop-shadow-lg" aria-hidden="true">🔥</span>
                  <div>
                    <p className="text-white text-sm font-bold tracking-tight">Site delivered</p>
                    <p className="text-blue-200/50 text-xs font-medium">Happy client</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-16 -right-20 floating-ui-badge rounded-2xl p-4 items-center gap-4 z-30">
                  <span className="text-lg drop-shadow-lg" aria-hidden="true">🤝</span>
                  <div>
                    <p className="text-white text-sm font-bold tracking-tight">New project</p>
                    <p className="text-blue-200/50 text-xs font-medium">Started today</p>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. BOTTOM (Mobile) / LEFT (Desktop): ACCOUNTABILITY TEXT */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                {cardHeading}
              </h3>
              {/* HIDDEN ON MOBILE (added hidden md:block) */}
              <p className="hidden md:block text-blue-100/70 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ── Social Dock ─────────────────────────────────────────────── */}
      <SocialDock />

    </div>
  );
}