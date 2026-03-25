'use client';

import { CinematicHero } from '@/components/ui/cinematic-landing-hero';

function Hero() {
  return (
    <CinematicHero
      brandName="Raphael"
      tagline1="Turn ideas into"
      tagline2="web products."
      cardHeading="Freelance Web Developer."
      cardDescription="Raphael builds fast, modern websites that convert — delivered in less than 7 days."
      metricValue={42}
      metricLabel="Sites Delivered"
      ctaHeading="Let's work together."
      ctaDescription="Available for freelance missions and full-time opportunities. Let's create something remarkable."
    />
  );
}

export default Hero;
