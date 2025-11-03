'use client';

import React from 'react';

const AnimatedBlobs: React.FC = () => {
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
    height: '80vmin',
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

  return (
    <div className="pointer-events-none relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <span className="absolute z-10 whitespace-pre-wrap text-center text-6xl font-semibold leading-tight tracking-tighter drop-shadow-xl">
        <span className="block text-black">Welcome to my</span>
        <span className="block bg-[linear-gradient(90deg,#00c6ff,#7f7fd5,#e684ae,#ffb347,#ffe47a)] bg-clip-text text-transparent">
          Portfolio
        </span>
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
      `}</style>
    </div>
  );
};

// Types
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
  href: string;
}

// Glass Effect Wrapper Component
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
      {/* Glass Layers */}
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

      {/* Content */}
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

// Dock Component
const GlassDock: React.FC<{ icons: DockIcon[] }> = ({ icons }) => (
  <GlassEffect className="rounded-3xl p-3 hover:p-4 hover:rounded-4xl">
    <div className="flex items-center justify-center gap-2 rounded-3xl p-3 py-0 px-0.5 overflow-hidden">
      {icons.map((icon, index) => (
        <a
          key={index}
          href={icon.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          <img
            src={icon.src}
            alt={icon.alt}
            className="w-16 h-16 transition-all duration-700 hover:scale-110 cursor-pointer object-contain"
            style={{
              transformOrigin: 'center center',
              transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 2.2)',
            }}
          />
        </a>
      ))}
    </div>
  </GlassEffect>
);

// SVG Filter Component
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
  const sections = [
    { id: 'hero', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'portfolio', label: 'Réalisations' },
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
      src: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/a13d1acfd046f503f987c1c95af582c8_low_res_Claude.png',
      alt: 'LinkedIn',
      href: 'https://www.linkedin.com/in/raphael-theuillon-689139261/',
    },
    {
      src: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/9e80c50a5802d3b0a7ec66f3fe4ce348_low_res_Finder.png',
      alt: 'Fiverr',
      href: 'https://www.fiverr.com/users/raph910/seller_dashboard',
    },
    {
      src: 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/c2c4a538c2d42a8dc0927d7d6530d125_low_res_ChatGPT___Liquid_Glass__Default_.png',
      alt: 'GitHub',
      href: 'https://github.com/Raphael91000',
    },
  ];

  return (
    <div
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-white font-light"
    >
      <GlassFilter />

      <div className="pointer-events-none absolute inset-0 z-0">
        <AnimatedBlobs />
      </div>

      <div className="relative z-20 flex min-h-screen w-full flex-col items-center">
        <div className="mt-10 flex w-full justify-center px-6">
          <GlassEffect
            className="items-center gap-3 rounded-3xl px-6 py-2.5 text-slate-900 shadow-2xl cursor-default"
            overlayColor="rgba(255, 255, 255, 0.12)"
          >
            <nav className="flex flex-wrap items-center gap-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="rounded-full px-4 py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 hover:bg-[linear-gradient(90deg,#00c6ff,#7f7fd5,#e684ae,#ffb347,#ffe47a)] hover:bg-clip-text hover:text-transparent"
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </GlassEffect>
        </div>

        <div className="mt-auto flex w-full justify-center pb-12">
          <GlassDock icons={dockIcons} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
