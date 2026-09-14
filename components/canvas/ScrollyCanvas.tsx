'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useImageSequence } from './useImageSequence';

export interface ScrollyCanvasProps {
  /**
   * Current scroll progress from 0.0 to 1.0
   */
  progress: number;
  /**
   * Directory prefix for the frames (e.g. '/sequence/process/')
   */
  framePrefix?: string;
  /**
   * Total number of frames
   */
  frameCount?: number;
  /**
   * Start frame index (default: 1)
   */
  startIndex?: number;
  /**
   * Vertical bias for object-fit cover (0 = top, 0.5 = center, 1 = bottom).
   * Default: 0.5
   */
  verticalBias?: number;
  /**
   * Optional custom overlay or children
   */
  children?: React.ReactNode;
  /**
   * Additional class name for container
   */
  className?: string;
  /**
   * Label shown during loading
   */
  loadingLabel?: string;
}

export const ScrollyCanvas: React.FC<ScrollyCanvasProps> = ({
  progress,
  framePrefix = '/sequence/process',
  frameCount = 80,
  startIndex = 1,
  verticalBias = 0.5,
  children,
  className = '',
  loadingLabel = 'INITIALIZING SYSTEM SEQUENCE',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // Preload frame sequence
  const { images, progress: loadProgress, isLoaded } = useImageSequence({
    prefix: framePrefix,
    frameCount,
    startIndex,
  });

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  /**
   * Draw cover-fit frame to canvas
   */
  const drawFrame = useCallback(
    (targetFrameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      // Adjust internal buffer size to match client size * DPR for high-DPI screens
      if (
        canvas.width !== Math.floor(displayWidth * dpr) ||
        canvas.height !== Math.floor(displayHeight * dpr)
      ) {
        canvas.width = Math.floor(displayWidth * dpr);
        canvas.height = Math.floor(displayHeight * dpr);
      }

      const cWidth = canvas.width;
      const cHeight = canvas.height;

      const img = images[targetFrameIndex];

      // If image is loaded and complete with valid dimensions
      if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
        const imgW = img.naturalWidth;
        const imgH = img.naturalHeight;

        const canvasAspect = cWidth / cHeight;
        const imgAspect = imgW / imgH;

        let sx = 0;
        let sy = 0;
        let sWidth = imgW;
        let sHeight = imgH;

        if (canvasAspect > imgAspect) {
          // Canvas is wider than image (horizontal letterbox prevented by cropping top/bottom)
          sWidth = imgW;
          sHeight = imgW / canvasAspect;
          sx = 0;
          sy = (imgH - sHeight) * verticalBias;
        } else {
          // Canvas is taller than image (vertical letterbox prevented by cropping sides)
          sHeight = imgH;
          sWidth = imgH * canvasAspect;
          sx = (imgW - sWidth) * 0.5;
          sy = 0;
        }

        ctx.clearRect(0, 0, cWidth, cHeight);
        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, cWidth, cHeight);
        lastDrawnFrameRef.current = targetFrameIndex;
      } else {
        // Fallback procedural visual if images are still preloading or generating
        ctx.clearRect(0, 0, cWidth, cHeight);
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, cWidth, cHeight);

        // Draw technical HUD grid
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
        ctx.lineWidth = 1 * dpr;
        const gridSize = 40 * dpr;

        for (let x = 0; x < cWidth; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, cHeight);
          ctx.stroke();
        }
        for (let y = 0; y < cHeight; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(cWidth, y);
          ctx.stroke();
        }

        // Animated telemetry ring synced with progress
        const centerX = cWidth * 0.5;
        const centerY = cHeight * 0.5;
        const baseRadius = Math.min(cWidth, cHeight) * 0.22;

        ctx.save();
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
        ctx.lineWidth = 2 * dpr;
        ctx.beginPath();
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + Math.PI * 2 * (progress || 0.01);
        ctx.arc(centerX, centerY, baseRadius, startAngle, endAngle);
        ctx.stroke();

        // Crosshairs
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1 * dpr;
        const chSize = 30 * dpr;
        ctx.beginPath();
        ctx.moveTo(centerX - chSize, centerY);
        ctx.lineTo(centerX + chSize, centerY);
        ctx.moveTo(centerX, centerY - chSize);
        ctx.lineTo(centerX, centerY + chSize);
        ctx.stroke();

        ctx.restore();
      }
    },
    [images, verticalBias, progress]
  );

  // Re-render when scroll progress or load status changes
  useEffect(() => {
    if (frameCount <= 0) return;

    // Calculate target frame index (clamped between 0 and frameCount - 1)
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    const targetIndex = Math.min(
      Math.floor(clampedProgress * (frameCount - 1)),
      frameCount - 1
    );

    // If reduced motion is preferred, render directly without rAF batch delay
    if (isReducedMotion) {
      drawFrame(targetIndex);
      return;
    }

    // Schedule rAF draw
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      drawFrame(targetIndex);
    });

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [progress, frameCount, drawFrame, isReducedMotion]);

  // Handle window resize with rAF debouncing
  useEffect(() => {
    let resizeRaf: number | null = null;

    const handleResize = () => {
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        const frameToRedraw =
          lastDrawnFrameRef.current >= 0 ? lastDrawnFrameRef.current : 0;
        drawFrame(frameToRedraw);
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    // Initial draw
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
    };
  }, [drawFrame]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#0A0A0A] ${className}`}>
      {/* HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Preloading HUD indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0A0A0A]/90 backdrop-blur-md transition-opacity duration-700">
          <div className="flex flex-col items-center max-w-xs w-full px-6 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
              <span className="font-mono text-xs tracking-widest text-[#00F0FF] uppercase">
                {loadingLabel}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF5500] transition-all duration-150 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            <div className="flex justify-between w-full font-mono text-[10px] text-white/50 tracking-wider">
              <span>BUFFERING FRAMES</span>
              <span>{loadProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Vignette overlay for cinematic depth */}
      <div className="pointer-events-none absolute inset-0 bg-radial-vignette opacity-75" />

      {/* Children overlays (dynamic text, milestone callouts, data readouts) */}
      {children && <div className="absolute inset-0 z-20 pointer-events-none">{children}</div>}
    </div>
  );
};

export default ScrollyCanvas;
