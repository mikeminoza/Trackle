"use client";

import HeroBadge from "./HeroBadge";
import HeroHeading from "./HeroHeading";
import HeroCTA from "./HeroCTA";
import HeroFeatureCards from "./HeroFeatureCards";
import HeroKeyFeatures from "./HeroKeyFeatures";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <div className="relative overflow-hidden w-full">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="w-full px-2 py-16 lg:py-24">
        <div className="w-full max-w-7xl mx-auto">
          <HeroBadge />
          <HeroHeading />
          <HeroCTA />
          <HeroFeatureCards />
          <HeroKeyFeatures />
          <HeroStats />
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
