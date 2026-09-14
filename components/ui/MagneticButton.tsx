'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
  as?: 'button' | 'a';
  target?: string;
  rel?: string;
  download?: boolean | string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  strength = 0.35,
  as = 'button',
  target,
  rel,
  download,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const Component = as === 'a' || href ? motion.a : motion.button;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="inline-block"
      data-cursor-magnetic
      data-hovered={isHovered}
    >
      <Component
        href={href}
        target={target}
        rel={rel}
        download={download}
        onClick={onClick}
        className={`relative inline-flex items-center justify-center transition-colors duration-300 ${className}`}
        whileTap={{ scale: 0.96 }}
      >
        {children}
      </Component>
    </motion.div>
  );
};

export default MagneticButton;
