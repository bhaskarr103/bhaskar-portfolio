'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

interface NavItem {
  name: string;
  href: string;
  id: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#hero', id: 'hero' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Work', href: '#work', id: 'work' },
  { name: 'Process', href: '#process', id: 'process' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrolledPastHero, setScrolledPastHero] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.7;
      setScrolledPastHero(scrollY > heroThreshold);

      // Simple scrollspy
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = scrollY + window.innerHeight * 0.3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Floating Pill Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 sm:py-6 px-4 sm:px-8 flex items-center justify-between pointer-events-none ${
          scrolledPastHero
            ? 'bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/5 shadow-2xl py-3 sm:py-4'
            : 'bg-transparent'
        }`}
      >
        {/* Left Initials / Callout */}
        <div className="flex items-center pointer-events-auto">
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="group flex items-center space-x-2 font-mono text-sm tracking-wider text-white"
          >
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] group-hover:shadow-[0_0_8px_#00F0FF] transition-shadow duration-300" />
            <span className="font-bold tracking-widest text-white/90 group-hover:text-white transition-colors">
              BHASKAR
            </span>
            <span className="text-white/40 text-xs hidden sm:inline">{"// UAS & CV"}</span>
          </a>
        </div>

        {/* Center: Floating Pill Navigation Bar (Desktop) */}
        <nav className="hidden md:flex pointer-events-auto items-center p-1.5 rounded-full bg-[#121214]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`relative px-4 py-1.5 rounded-full font-sans text-xs tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'text-black font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePillIndicator"
                    className="absolute inset-0 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Status / Action */}
        <div className="hidden lg:flex items-center space-x-4 pointer-events-auto">
          <div className="flex items-center space-x-2 font-mono text-[11px] text-white/40 border border-white/10 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SYS: READY</span>
          </div>
          <MagneticButton
            href="#contact"
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-1.5 rounded-full bg-white text-black font-sans text-xs font-medium hover:bg-[#00F0FF] hover:text-black transition-colors shadow-lg"
          >
            Initiate Contact
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden pointer-events-auto">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full bg-[#141416]/90 border border-white/15 text-white backdrop-blur-md hover:border-[#00F0FF]/50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden"
          >
            <div className="pt-20">
              <div className="font-mono text-xs text-[#00F0FF] tracking-widest uppercase mb-8 flex items-center space-x-2">
                <Terminal size={14} />
                <span>NAVIGATION // DIRECTORY</span>
              </div>

              <div className="flex flex-col space-y-6">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className={`text-3xl font-bold font-sans tracking-tight uppercase flex items-center justify-between ${
                      activeSection === item.id ? 'text-[#00F0FF]' : 'text-white/80'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="font-mono text-xs text-white/30">0{index + 1}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="font-mono text-xs text-white/40 mb-2">AUTONOMOUS SYSTEMS & CV</div>
              <div className="text-sm text-white/70">M.Tech UAS — IIT Kanpur</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
