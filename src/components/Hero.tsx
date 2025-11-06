'use client';

import React, { useEffect, useState } from 'react';
import cvLogo from '../assets/logos/cv.svg';
import fiverrLogo from '../assets/logos/fiverr.svg';
import githubLogo from '../assets/logos/github.svg';
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

const AnimatedBlobs: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const [showContinue, setShowContinue] = useState(false);
  const scale = 1 + scrollProgress * 4;
  
  const blobStyle = {
    '--border-radius': '115% 140% 145% 110% / 125% 140% 110% 125%',
    '--border-width': '5vmin',
    aspectRatio: '1',
    display: 'block',
    gridArea: 'stack',
    backgroundSize: 'calc(100% + var(--border-width) * 2)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    border: 'var(--border-width) solid transparent',
    borderRadius: 'var(--border-radius)',
    maskImage: 'linear-gradient(transparent, transparent), linear-gradient(black, white)',
    maskClip: 'padding-box, border-box',
    maskComposite: 'intersect',
    mixBlendMode: 'screen' as const,
    height: '70vmin',
    filter: 'blur(1vmin)',
  } as React.CSSProperties;

  const blobs = [
    {
      backgroundColor: '#0074D9',
      backgroundImage: 'linear-gradient(#0074D9, #39CCCC, #0074D9)',
      transform: 'rotate(30deg) scale(1.03)',
    },
    {
      backgroundColor: '#FF4136',
      backgroundImage: 'linear-gradient(#FF4136, #FF851B, #FF4136)',
      transform: 'rotate(60deg) scale(0.95)',
    },
    {
      backgroundColor: '#3D9970',
      backgroundImage: 'linear-gradient(#3D9970, #01FF70, #3D9970)',
      transform: 'rotate(90deg) scale(0.97)',
    },
    {
      backgroundColor: '#B10DC9',
      backgroundImage: 'linear-gradient(#B10DC9, #85144B, #B10DC9)',
      transform: 'rotate(120deg) scale(1.02)',
    },
  ];

  const textOpacity = Math.max(0, 1 - scrollProgress * 3);
  const blobOpacity = Math.max(0, 1 - scrollProgress * 1.5);

  return (
    <div 
      className="pointer-events-none relative flex min-h-screen w-full items-center justify-center overflow-hidden"
      style={{
        transform: `scale(${scale})`,
        opacity: blobOpacity,
        transition: 'transform 0.05s ease-out, opacity 0.1s ease-out',
      }}
    >
      <span 
        className="absolute z-10 flex items-center text-center select-none"
        style={{
          opacity: textOpacity,
          transition: 'opacity 0.05s ease-out',
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <AppleHelloEnglishEffect
            className="h-[3.2rem] sm:h-[4.2rem] md:h-[4.8rem]"
            speed={1.1}
            onAnimationComplete={() => setShowContinue(true)}
          />
          {showContinue && (
            <span
              className="text-xs font-medium text-slate-800 opacity-0 animate-[fade-in_0.6s_ease-out_forwards] sm:text-sm md:text-base"
            >
              scroll for continue
            </span>
          )}
        </div>
      </span>

      <div className="grid" style={{ gridTemplateAreas: "'stack'" }}>
        <div
          className="relative grid"
          style={{
            gridTemplateAreas: "'stack'",
            gridArea: 'stack',
            animation: 'animatedBlobSpin 5s linear infinite',
          }}
        >
          {blobs.map((blob, index) => (
            <span
              key={index}
              style={{
                ...blobStyle,
                ...blob,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes animatedBlobSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
  overlayColor?: string;
}

interface DockIcon {
  src: string;
  alt: string;
  href?: string;
  onClick?: () => void;
}

const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = '',
  style = {},
  href,
  target = '_blank',
  overlayColor = 'rgba(255, 255, 255, 0.25)',
}) => {
  const glassStyle = {
    boxShadow: '0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
    transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 2.2)',
    ...style,
  };

  const content = (
    <div
      className={`relative flex font-semibold overflow-hidden text-black cursor-pointer transition-all duration-700 ${className}`}
      style={glassStyle}
    >
      <div
        className="absolute inset-0 z-0 overflow-hidden rounded-inherit rounded-3xl"
        style={{
          backdropFilter: 'blur(3px)',
          filter: 'url(#glass-distortion)',
          isolation: 'isolate',
        }}
      />
      <div
        className="absolute inset-0 z-10 rounded-inherit"
        style={{ background: overlayColor }}
      />
      <div
        className="absolute inset-0 z-20 rounded-inherit rounded-3xl overflow-hidden"
        style={{
          boxShadow:
            'inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)',
        }}
      />
      <div className="relative z-30">{children}</div>
    </div>
  );

  return href ? (
    <a href={href} target={target} rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
};

const GlassDock: React.FC<{ icons: DockIcon[] }> = ({ icons }) => (
  <GlassEffect className="rounded-3xl p-2 hover:p-3 hover:rounded-4xl">
    <div className="flex items-center justify-center gap-2.5 p-2">
      {icons.map((icon, index) => {
        const IconWrapper = icon.href ? 'a' : 'button';
        const props = icon.href
          ? {
              href: icon.href,
              target: '_blank',
              rel: 'noopener noreferrer',
              onClick: icon.onClick,
            }
          : {
              type: 'button',
              onClick: icon.onClick,
            };

        return (
          <IconWrapper
            key={index}
            {...props}
            className="group flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 transition-all duration-500"
          >
            <div className="w-[3.5rem] h-[3.5rem] flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md shadow-md ring-1 ring-white/30 overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-hover:bg-white/30">
              <img
                src={icon.src}
                alt={icon.alt}
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                style={{
                  borderRadius: '0.75rem',
                  transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 2.2)',
                }}
              />
            </div>
          </IconWrapper>
        );
      })}
    </div>
  </GlassEffect>
);

const GlassFilter: React.FC = () => (
  <svg style={{ display: 'none' }}>
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1"
        specularExponent="100"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="200"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

function Hero() {
  const [isCvMenuOpen, setIsCvMenuOpen] = React.useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const dockRef = React.useRef<HTMLDivElement | null>(null);
  const spacerRef = React.useRef<HTMLDivElement | null>(null);
  const closeCvMenu = React.useCallback(() => setIsCvMenuOpen(false), []);

  const cvOptions = React.useMemo(
    () => [
      { label: 'CV Français', href: '/CV-RAPHAEL-FR.pdf' },
      { label: 'CV Anglais', href: '/CV-RAPHAEL-EN.pdf' },
      { label: 'CV Arabe', href: '/CV-RAPHAEL-AR.pdf' },
      { label: 'CV Complet (EN)', href: '/CV-COMPLET-EN.pdf' },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!spacerRef.current) return;

      const spacerRect = spacerRef.current.getBoundingClientRect();
      const spacerHeight = spacerRef.current.offsetHeight;
      
      const scrolledInSpacer = -spacerRect.top;
      const progress = Math.max(0, Math.min(scrolledInSpacer / (spacerHeight * 0.4), 1));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    if (!isCvMenuOpen) return;

    const handleClickAway = (event: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
        setIsCvMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCvMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickAway);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickAway);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCvMenuOpen]);

  const handleCvSelect = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
    setIsCvMenuOpen(false);
  };

  const handleCvIconClick = () => {
    setIsCvMenuOpen((prev) => !prev);
  };

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'journey', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const dockIcons: DockIcon[] = [
    {
      src: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
      alt: 'LinkedIn',
      href: 'https://www.linkedin.com/in/raphael-theuillon-689139261/',
      onClick: closeCvMenu,
    },
    {
      src: fiverrLogo,
      alt: 'Fiverr',
      href: 'https://www.fiverr.com/users/raph910/seller_dashboard',
      onClick: closeCvMenu,
    },
    {
      src: githubLogo,
      alt: 'GitHub',
      href: 'https://github.com/Raphael91000',
      onClick: closeCvMenu,
    },
    {
      src: cvLogo,
      alt: 'CV',
      onClick: handleCvIconClick,
    },
  ];

  const uiOpacity = Math.max(0, 1 - scrollProgress * 2);
  const showHero = scrollProgress < 1;

  return (
    <>
      <div 
        id="hero"
        ref={spacerRef}
        className="relative bg-white"
        style={{ 
          height: '150vh',
          pointerEvents: 'none',
          position: 'relative',
        }} 
      />

      {showHero && (
        <div
          className="fixed inset-0 flex min-h-screen w-full flex-col items-center overflow-hidden bg-white font-light"
          style={{ zIndex: 50 }}
        >
          <GlassFilter />

          <div 
            className="absolute inset-0 z-0"
            style={{
              opacity: 1 - scrollProgress,
              transition: 'opacity 0.1s ease-out',
            }}
          >
            <BackgroundGradientAnimation />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh] bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.45)_55%,rgba(255,255,255,1)_100%)]" />
          </div>

          <div className="pointer-events-none absolute inset-0 z-10">
            <AnimatedBlobs scrollProgress={scrollProgress} />
          </div>

          <div 
            className="relative z-20 flex min-h-screen w-full flex-col items-center"
            style={{
              opacity: uiOpacity,
              transition: 'opacity 0.1s ease-out',
            }}
          >
            <div className="mt-10 hidden w-full justify-center px-6 md:flex">
              <GlassEffect
                className="items-center gap-3 rounded-3xl px-6 py-2.5 text-slate-900 shadow-2xl cursor-default"
                overlayColor="rgba(255, 255, 255, 0.12)"
              >
                <nav className="flex flex-wrap items-center gap-3">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="rounded-full px-4 py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 hover:bg-gradient-to-r hover:from-[#5c6ff4] hover:to-[#e870c2] hover:bg-clip-text hover:text-transparent transition-all duration-300"
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </GlassEffect>
            </div>

            <div className="mt-auto flex w-full justify-center pb-8 translate-y-2">
              <div className="relative" ref={dockRef}>
                <GlassDock icons={dockIcons} />
                {isCvMenuOpen && (
                  <div className="absolute bottom-full left-1/2 z-50 mb-4 w-56 -translate-x-1/2">
                    <GlassEffect className="rounded-2xl px-4 py-3">
                      <ul className="flex flex-col gap-2 text-sm text-slate-800">
                        {cvOptions.map((option) => (
                          <li key={option.href}>
                            <button
                              type="button"
                              onClick={() => handleCvSelect(option.href)}
                              className="w-full rounded-xl bg-white/60 px-3 py-2 text-left transition-colors duration-200 hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                            >
                              {option.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </GlassEffect>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;
