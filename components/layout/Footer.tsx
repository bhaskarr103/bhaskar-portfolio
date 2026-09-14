'use client';

import React from 'react';
import { ArrowUp, Radio } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#070709] border-t border-white/5 py-10 px-6 sm:px-12 text-white">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left branding & copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-2 font-mono text-xs text-white/80">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
            <span className="font-bold">BHASKAR RAJAURA</span>
            <span className="text-white/40">© {new Date().getFullYear()}</span>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-[11px] font-mono text-neutral-500 border-l border-white/10 pl-4">
            <Radio size={11} className="text-emerald-400 animate-pulse" />
            <span>KANPUR [26.5123° N, 80.2329° E]</span>
          </div>
        </div>

        {/* Center telemetry */}
        <div className="font-mono text-[11px] text-neutral-500 text-center">
          ENGINEERED WITH NEXT.JS 14 · CANVAS SCROLLYTELLING · FRAMER MOTION
        </div>

        {/* Right back-to-top button */}
        <div className="flex items-center space-x-3">
          <MagneticButton
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:text-white hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors"
          >
            <span>TOP</span>
            <ArrowUp size={13} className="text-[#00F0FF]" />
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
