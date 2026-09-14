'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Cpu, Radio } from 'lucide-react';
import HeroCanvas from '../canvas/HeroCanvas';

export const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[680px] flex flex-col justify-end overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background Hero Canvas: Ambient video loop with face-bias cover crop & warm grade */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas
          framePrefix="/sequence/hero"
          frameCount={144}
          fps={24}
          verticalBias={0.28}
        />
      </div>

      {/* Top Left Telemetry HUD Tag */}
      <div className="absolute top-24 sm:top-28 left-6 sm:left-12 z-20 hidden md:flex items-center space-x-3 text-xs font-mono text-white/50 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
        <Radio size={12} className="text-[#FF5500] animate-pulse" />
        <span className="tracking-widest">IIT KANPUR // UAS AUTONOMY</span>
      </div>

      {/* Top Right Spec Tag */}
      <div className="absolute top-24 sm:top-28 right-6 sm:right-12 z-20 hidden md:flex items-center space-x-3 text-xs font-mono text-white/50 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
        <Cpu size={12} className="text-[#00F0FF]" />
        <span className="tracking-widest">CV//ML//DL//UE5</span>
      </div>

      {/* Center-bottom-third Container for Hero Name & Subtitle */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 pb-20 sm:pb-24 pointer-events-none">
        <div className="max-w-4xl">
          {/* Staggered Name: Heavy bold sans-serif, ending with a period */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[160px] font-extrabold tracking-tight text-white leading-none font-sans select-none"
          >
            Bhaskar<span className="text-[#FF5500]">.</span>
          </motion.h1>

          {/* Subtitle: Muted opacity ~60%, same font family, delayed ~150ms */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 0.65, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 sm:mt-5 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light tracking-tight font-sans max-w-2xl select-none"
          >
            Autonomous Systems Engineer<span className="text-[#00F0FF]">.</span>
          </motion.p>
        </div>
      </div>

      {/* Animated Subtle Scroll-Down Indicator */}
      <div className="absolute bottom-6 inset-x-0 z-20 flex flex-col items-center justify-center">
        <button
          onClick={scrollToAbout}
          className="group flex flex-col items-center space-y-1 text-white/40 hover:text-white transition-colors duration-300 pointer-events-auto cursor-pointer focus:outline-none"
          aria-label="Scroll to about section"
        >
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 group-hover:text-[#00F0FF] transition-colors">
            SCROLL TO DISCOVER
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} className="text-white/60 group-hover:text-[#00F0FF] transition-colors" />
          </motion.div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
