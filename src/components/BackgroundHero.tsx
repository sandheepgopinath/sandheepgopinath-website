"use client";

import React from "react";
import Image from "next/image";

export function BackgroundHero() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none bg-zinc-950">
      {/* High-res background image */}
      <Image
        src="/hero-bg.svg"
        alt="Background texture"
        fill
        priority
        className="object-cover object-center opacity-90 scale-105"
      />

      {/* Atmospheric ambient glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-blue-600/15 blur-[100px] rounded-full" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-purple-600/15 blur-[120px] rounded-full" />

      {/* Vignette fade to dark */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/60 to-zinc-950" />
    </div>
  );
}
