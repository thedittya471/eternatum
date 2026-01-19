'use client';

import { useEffect, useRef, useCallback } from 'react';

interface AudioCache {
  [key: string]: HTMLAudioElement;
}

const audioCache: AudioCache = {};

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

  const loadAudio = useCallback((soundPath: string): HTMLAudioElement | null => {
    try {
      if (!audioCache[soundPath]) {
        const audio = new Audio(soundPath);
        audio.preload = 'auto';
        audioCache[soundPath] = audio;
      }
      return audioCache[soundPath];
    } catch (error) {
      console.warn(`Failed to load audio: ${soundPath}`, error);
      return null;
    }
  }, []);

  const play = useCallback((soundPath: string, volume?: number) => {
    if (!isMountedRef.current || volumeRef.current === 0) return;

    try {
      const audio = loadAudio(soundPath);
      if (audio) {
        // Reset audio to start
        audio.currentTime = 0;
        audio.volume = volume ?? volumeRef.current;
        
        // Play with error handling
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn(`Audio playback failed for ${soundPath}:`, error);
          });
        }
      }
    } catch (error) {
      console.warn(`Error playing audio: ${soundPath}`, error);
    }
  }, [loadAudio]);

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
