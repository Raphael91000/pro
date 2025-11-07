'use client';

import React from 'react';
import { cn } from '@/lib/utils';

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

const BLOBS = [
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

interface BlobPortalSceneProps {
  scale: number;
  blobOpacity?: number;
  textOpacity?: number;
  className?: string;
  children?: React.ReactNode;
}

export function BlobPortalScene({
  scale,
  blobOpacity = 1,
  textOpacity = 1,
  className,
  children,
}: BlobPortalSceneProps) {
  return (
    <div
      className={cn(
        'pointer-events-none relative flex min-h-screen w-full items-center justify-center overflow-hidden',
        className,
      )}
      style={{
        transform: `scale(${scale})`,
        opacity: blobOpacity,
        transition: 'transform 0.05s ease-out, opacity 0.1s ease-out',
      }}
    >
      {children && (
        <span
          className="absolute z-10 flex select-none items-center text-center"
          style={{
            opacity: textOpacity,
            transition: 'opacity 0.05s ease-out',
          }}
        >
          {children}
        </span>
      )}

      <div className="grid" style={{ gridTemplateAreas: "'stack'" }}>
        <div
          className="relative grid"
          style={{
            gridTemplateAreas: "'stack'",
            gridArea: 'stack',
            animation: 'animatedBlobSpin 5s linear infinite',
          }}
        >
          {BLOBS.map((blob, index) => (
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
}
