'use client';

import { useState, useEffect, useRef } from 'react';

export interface UseImageSequenceOptions {
  /**
   * Directory path or URL prefix (e.g. '/sequence/process/')
   */
  prefix: string;
  /**
   * File name pattern or format function.
   * By default: (index) => `frame_${String(index).padStart(4, '0')}.jpg`
   */
  formatFileName?: (index: number) => string;
  /**
   * Total number of frames in sequence
   */
  frameCount: number;
  /**
   * 1-based start index (e.g. 1)
   */
  startIndex?: number;
}

export interface UseImageSequenceResult {
  images: HTMLImageElement[];
  progress: number; // 0 to 100
  isLoaded: boolean;
  totalLoaded: number;
  error: string | null;
}

export function useImageSequence({
  prefix,
  formatFileName = (i) => `frame_${String(i).padStart(4, '0')}.jpg`,
  frameCount,
  startIndex = 1,
}: UseImageSequenceOptions): UseImageSequenceResult {
  const [progress, setProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [totalLoaded, setTotalLoaded] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    isMountedRef.current = true;
    if (frameCount <= 0) {
      setIsLoaded(true);
      return;
    }

    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    const normalizedPrefix = prefix.endsWith('/') ? prefix : `${prefix}/`;

    for (let i = 0; i < frameCount; i++) {
      const frameIndex = startIndex + i;
      const fileName = formatFileName(frameIndex);
      const src = `${normalizedPrefix}${fileName}`;

      const img = new Image();
      img.crossOrigin = 'anonymous';

      const onFrameLoad = () => {
        if (!isMountedRef.current) return;
        loadedCount++;
        setTotalLoaded(loadedCount);
        const currentProgress = Math.round((loadedCount / frameCount) * 100);
        setProgress(currentProgress);

        if (loadedCount >= frameCount) {
          setIsLoaded(true);
        }
      };

      const onFrameError = () => {
        if (!isMountedRef.current) return;
        setError(`Failed to load frame: ${src}`);
        // Even on error, advance count so the app doesn't freeze indefinitely
        loadedCount++;
        setTotalLoaded(loadedCount);
        const currentProgress = Math.round((loadedCount / frameCount) * 100);
        setProgress(currentProgress);
        if (loadedCount >= frameCount) {
          setIsLoaded(true);
        }
      };

      img.onload = onFrameLoad;
      img.onerror = onFrameError;
      img.src = src;

      images.push(img);
    }

    return () => {
      isMountedRef.current = false;
      // Clean up event listeners and references
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [prefix, frameCount, startIndex, formatFileName]);

  return {
    images: imagesRef.current,
    progress,
    isLoaded,
    totalLoaded,
    error,
  };
}
