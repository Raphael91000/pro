'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform, type SpringOptions } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
  gradientClassName?: string;
};

export function SpotlightIbelick({
  className,
  size = 200,
  springOptions = { bounce: 0 },
  gradientClassName,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        const computedStyle = window.getComputedStyle(parent);
        if (computedStyle.position === 'static') {
          parent.dataset.prevPosition = parent.style.position;
          parent.style.position = 'relative';
        }
        if (computedStyle.overflow !== 'hidden') {
          parent.dataset.prevOverflow = parent.style.overflow;
          parent.style.overflow = 'hidden';
        }
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement]
  );

  useEffect(() => {
    if (!parentElement) return;

    const handleEnter = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);

    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', handleEnter);
    parentElement.addEventListener('mouseleave', handleLeave);

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', handleEnter);
      parentElement.removeEventListener('mouseleave', handleLeave);
      if (parentElement.dataset.prevOverflow !== undefined) {
        parentElement.style.overflow = parentElement.dataset.prevOverflow || '';
        delete parentElement.dataset.prevOverflow;
      }
      if (parentElement.dataset.prevPosition !== undefined) {
        parentElement.style.position = parentElement.dataset.prevPosition || '';
        delete parentElement.dataset.prevPosition;
      }
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_75%)] blur-2xl transition-opacity duration-200',
        gradientClassName ?? 'from-[#5c6ff4]/70 via-[#7b6ff5]/55 to-[#e870c2]/65',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
      }}
    />
  );
}
