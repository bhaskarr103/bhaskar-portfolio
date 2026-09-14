'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface SectionHeadingProps {
  tag: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tag,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  return (
    <div
      className={`relative mb-12 md:mb-20 ${
        align === 'center' ? 'text-center items-center' : 'text-left'
      } ${className}`}
    >
      {/* Monospace section tag with pulsing status indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`inline-flex items-center space-x-2.5 font-mono text-xs uppercase tracking-[0.2em] text-[#00F0FF] mb-3 px-3 py-1 rounded-full border border-[#00F0FF]/20 bg-[#00F0FF]/5 backdrop-blur-sm`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
        <span>{tag}</span>
      </motion.div>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white uppercase font-sans"
      >
        {title}
      </motion.h2>

      {/* Optional Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-2xl text-base sm:text-lg text-neutral-400 font-light leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
