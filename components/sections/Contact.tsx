'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Send, Copy, Check } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import MagneticButton from '../ui/MagneticButton';

export const Contact: React.FC = () => {
  const emailAddress = 'bhaskarr25@iitk.ac.in';
  const [copied, setCopied] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative w-full py-28 sm:py-36 bg-[#0A0A0A] text-white overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[#FF5500]/10 via-[#00F0FF]/5 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <SectionHeading
          tag="// 05 INITIATE CONTACT"
          title="Let's Build Something That Flies."
          subtitle="Interested in collaborating on autonomous drone inspection, computer vision deployment, or safety-critical control architectures? Let's talk."
        />

        {/* Big Animated Email Callout */}
        <div className="my-16 sm:my-24 text-center sm:text-left">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4">
            DIRECT SECURE TRANSMISSION
          </p>

          <div className="inline-block group relative">
            <a
              href={`mailto:${emailAddress}`}
              onMouseEnter={() => setIsGlitching(true)}
              onMouseLeave={() => setIsGlitching(false)}
              className="font-sans text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white hover:text-[#00F0FF] transition-colors duration-300 block break-all"
              data-cursor-magnetic
            >
              <span className={`relative inline-block ${isGlitching ? 'skew-x-2 filter drop-shadow-[2px_0_#FF5500]' : ''}`}>
                {emailAddress}
              </span>
            </a>

            {/* Hover Glitch Underline */}
            <div className="w-full h-[2px] bg-neutral-800 group-hover:bg-[#00F0FF] transition-colors duration-300 mt-2" />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={handleCopy}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white hover:border-[#00F0FF]/50 transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL'}</span>
            </button>

            <a
              href={`mailto:${emailAddress}`}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white text-black text-xs font-sans font-semibold hover:bg-[#00F0FF] transition-colors"
            >
              <Send size={13} />
              <span>Launch Mail Client</span>
            </a>
          </div>
        </div>

        {/* Information Matrix & Socials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10">
          {/* Location / Academic Base */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest">
              CURRENT AFFILIATION
            </span>
            <div className="text-white font-medium text-base">Indian Institute of Technology (IIT) Kanpur</div>
            <div className="text-xs text-neutral-400 font-light">Department of Aerospace Engineering · UAS Flight Lab</div>
          </div>

          {/* Availability Status */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest">
              COLLABORATION STATUS
            </span>
            <div className="flex items-center space-x-2 text-white font-medium text-base">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Open to R&D & Engineering Roles</span>
            </div>
            <div className="text-xs text-neutral-400 font-light">Autonomous Aerial Robotics, Computer Vision, Safe Control</div>
          </div>

          {/* Social Profiles */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest">
              NETWORK CHANNELS
            </span>
            <div className="flex items-center space-x-3 pt-1">
              <MagneticButton
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors"
              >
                <Github size={18} />
              </MagneticButton>

              <MagneticButton
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors"
              >
                <Linkedin size={18} />
              </MagneticButton>

              <MagneticButton
                href="#hero"
                className="p-3 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors font-mono text-xs font-bold"
              >
                BR
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
