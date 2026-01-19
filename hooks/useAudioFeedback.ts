'use client';

import { useEffect, useRef, useCallback } from 'react';
import { playClickSound, playPopSound, playConfirmSound, playErrorSound } from '@/lib/audioGenerator';

const SOUND_PATHS = {
  click: 'click',
  pop: 'pop',
  confirm: 'confirm',
  error: 'error',
};

export function useAudioFeedback() {
  const isMountedRef = useRef(true);
  const volumeRef = useRef(0.7);

  useEffect(() => {
    // Check if user has reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check localStorage for user's audio preference
    const savedVolume = localStorage.getItem('audioVolume');
    if (savedVolume) {
      volumeRef.current = parseFloat(savedVolume);
    }

    // Disable sounds if user prefers reduced motion
    if (prefersReducedMotion) {
      volumeRef.current = 0;
    }

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const play = useCallback((soundType: string, volume?: number) => {
    if (!isMountedRef.current || volumeRef.current === 0) return;

    const effectiveVolume = volume ?? volumeRef.current;

    try {
      switch (soundType) {
        case SOUND_PATHS.click:
          playClickSound(effectiveVolume);
          break;
        case SOUND_PATHS.pop:
          playPopSound(effectiveVolume);
          break;
        case SOUND_PATHS.confirm:
          playConfirmSound(effectiveVolume);
          break;
        case SOUND_PATHS.error:
          playErrorSound(effectiveVolume);
          break;
        default:
          console.warn(`Unknown sound type: ${soundType}`);
      }
    } catch (error) {
      console.warn(`Error playing sound: ${soundType}`, error);
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    volumeRef.current = clampedVolume;
    localStorage.setItem('audioVolume', clampedVolume.toString());
  }, []);

  const getVolume = useCallback(() => volumeRef.current, []);

  const mute = useCallback(() => {
    volumeRef.current = 0;
    localStorage.setItem('audioVolume', '0');
  }, []);

  const unmute = useCallback(() => {
    const savedVolume = localStorage.getItem('audioVolume');
    const volume = savedVolume ? parseFloat(savedVolume) : 0.7;
    volumeRef.current = Math.max(0.1, volume); // Unmute to at least 0.1
    localStorage.setItem('audioVolume', volumeRef.current.toString());
  }, []);

  const isMuted = useCallback(() => volumeRef.current === 0, []);

  return {
    play,
    setVolume,
    getVolume,
    mute,
    unmute,
    isMuted,
  };
}
