'use client';

import { useState, useEffect, RefObject } from 'react';

export interface UseScrollProgressOptions {
  /**
   * Offset start (e.g., 'start start' means when top of container hits top of viewport)
   */
  startOffset?: number;
  /**
   * Offset end factor
   */
  endOffset?: number;
}

export function useScrollProgress(
  containerRef: RefObject<HTMLElement>,
  options: UseScrollProgressOptions = {}
): number {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let animationFrameId: number | null = null;
    let isTicking = false;

    const calculateProgress = () => {
      if (!containerRef.current) return;

      const element = containerRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || 1;

      // The total scroll distance for this container while pinned/scrolled
      // element.offsetHeight is the full height (e.g. 300vh - 400vh)
      const totalScrollableDistance = element.offsetHeight - windowHeight;

      if (totalScrollableDistance <= 0) {
        setProgress(0);
        isTicking = false;
        return;
      }

      // How far the top of the container has scrolled above the top of the viewport
      const scrolled = -rect.top;
      const rawProgress = scrolled / totalScrollableDistance;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      setProgress(clampedProgress);
      isTicking = false;
    };

    const onScrollOrResize = () => {
      if (!isTicking) {
        isTicking = true;
        animationFrameId = requestAnimationFrame(calculateProgress);
      }
    };

    // Initial calculation
    calculateProgress();

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [containerRef, options.startOffset, options.endOffset]);

  return progress;
}
