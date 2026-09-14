'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useImageSequence } from './useImageSequence';

export interface HeroCanvasProps {
  framePrefix?: string;
  frameCount?: number;
  fps?: number;
  verticalBias?: number;
  className?: string;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({
  framePrefix = '/sequence/hero',
  frameCount = 80,
  fps = 24,
  verticalBias = 0.28, // Bias toward upper-middle of frame to preserve subject face on mobile portrait
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentFrameIndexRef = useRef<number>(0);
  const lastTimestampRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  const { images } = useImageSequence({
    prefix: framePrefix,
    frameCount,
    startIndex: 1,
  });

  const interval = 1000 / fps;

  const drawCurrentFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (
        canvas.width !== Math.floor(displayWidth * dpr) ||
        canvas.height !== Math.floor(displayHeight * dpr)
      ) {
        canvas.width = Math.floor(displayWidth * dpr);
        canvas.height = Math.floor(displayHeight * dpr);
      }

      const cWidth = canvas.width;
      const cHeight = canvas.height;

      const img = images[frameIndex];

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
          // Canvas is wider than image (ultrawide/desktop)
          sWidth = imgW;
          sHeight = imgW / canvasAspect;
          sx = 0;
          sy = (imgH - sHeight) * verticalBias;
        } else {
          // Canvas is taller than image (narrow / mobile portrait)
          // Keep upper-middle face focus
          sHeight = imgH;
          sWidth = imgH * canvasAspect;
          sx = (imgW - sWidth) * 0.5;
          sy = 0;
        }

        ctx.clearRect(0, 0, cWidth, cHeight);
        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, cWidth, cHeight);

        // Apply cinematic warm dramatic color grade on canvas
        // Deep oranges/reds on shadows, cool dark edges
        const warmGrad = ctx.createRadialGradient(
          cWidth * 0.5,
          cHeight * 0.4,
          cHeight * 0.1,
          cWidth * 0.5,
          cHeight * 0.5,
          cHeight * 0.8
        );
        warmGrad.addColorStop(0, 'rgba(255, 90, 20, 0.04)');
        warmGrad.addColorStop(0.5, 'rgba(180, 40, 10, 0.08)');
        warmGrad.addColorStop(1, 'rgba(10, 10, 12, 0.6)');

        ctx.fillStyle = warmGrad;
        ctx.fillRect(0, 0, cWidth, cHeight);
      } else {
        // Fallback ambient generative backdrop if frames are still loading or missing
        ctx.fillStyle = '#08080A';
        ctx.fillRect(0, 0, cWidth, cHeight);

        const cx = cWidth * 0.5;
        const cy = cHeight * 0.42;
        const rad = Math.min(cWidth, cHeight) * 0.55;

        const halo = ctx.createRadialGradient(cx, cy, 10, cx, cy, rad);
        halo.addColorStop(0, 'rgba(255, 80, 20, 0.15)');
        halo.addColorStop(0.4, 'rgba(180, 30, 10, 0.08)');
        halo.addColorStop(0.8, 'rgba(10, 12, 18, 0.7)');
        halo.addColorStop(1, 'rgba(6, 6, 8, 1)');

        ctx.fillStyle = halo;
        ctx.fillRect(0, 0, cWidth, cHeight);

        // Subtle tech grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.lineWidth = 1 * dpr;
        const step = 60 * dpr;
        for (let x = 0; x < cWidth; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, cHeight);
          ctx.stroke();
        }
      }
    },
    [images, verticalBias]
  );

  // Autoplay loop using timed rAF at specified fps
  useEffect(() => {
    if (frameCount <= 0) return;

    let isRunning = true;

    const loop = (timestamp: number) => {
      if (!isRunning) return;

      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }

      const elapsed = timestamp - lastTimestampRef.current;

      if (elapsed >= interval) {
        lastTimestampRef.current = timestamp - (elapsed % interval);
        currentFrameIndexRef.current =
          (currentFrameIndexRef.current + 1) % frameCount;

        drawCurrentFrame(currentFrameIndexRef.current);
        if (!isReady) setIsReady(true);
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [frameCount, interval, drawCurrentFrame, isReady]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      drawCurrentFrame(currentFrameIndexRef.current);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [drawCurrentFrame]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#0A0A0A] ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover select-none pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Heavy cinematic vignette on the edges so subject pops */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, transparent 25%, rgba(10, 10, 10, 0.5) 65%, rgba(10, 10, 10, 0.95) 100%)',
        }}
      />
      {/* Subtle bottom shadow gradient to seamlessly blend into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
    </div>
  );
};

export default HeroCanvas;
