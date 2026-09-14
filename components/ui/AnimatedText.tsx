'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface AnimatedTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  staggerChildren?: number;
  delay?: number;
  mode?: 'words' | 'characters';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  wordClassName = '',
  staggerChildren = 0.04,
  delay = 0,
  mode = 'words',
  as = 'span',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
      filter: shouldReduceMotion ? 'none' : 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const Component = motion[as];

  if (mode === 'characters') {
    const characters = Array.from(text);
    return (
      <Component
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className={`inline-block ${className}`}
      >
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={childVariants}
            className={`inline-block ${wordClassName}`}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </Component>
    );
  }

  // Split by words
  const words = text.split(' ');

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`inline-block ${className}`}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden whitespace-nowrap mr-[0.25em]">
          <motion.span
            variants={childVariants}
            className={`inline-block ${wordClassName}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};

export default AnimatedText;
