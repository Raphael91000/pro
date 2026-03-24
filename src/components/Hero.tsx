'use client';

import { CinematicHero } from '@/components/ui/cinematic-landing-hero';

function Hero() {
  return (
    <CinematicHero
      brandName="Raphael"
      tagline1="Turn ideas into"
      tagline2="web products."
      cardHeading="Freelance Web Developer."
      cardDescription={
        <>
          <span className="text-white font-semibold">Raphael</span> designs and builds modern web experiences — from sleek interfaces to robust backends, with a focus on performance and craft.
        </>
      }
      metricValue={42}
      metricLabel="Sites Delivered"
      ctaHeading="Let's work together."
      ctaDescription="Available for freelance missions and full-time opportunities. Let's create something remarkable."
    />
  );
}

export default Hero;
