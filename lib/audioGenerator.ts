'use client';

/**
 * Web Audio API-based sound effect generator
 * Creates various arcade-style sounds programmatically
 */

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext && typeof window !== 'undefined') {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext!;
}

export function playClickSound(volume: number = 0.7) {
  if (typeof window === 'undefined') return;
  
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create oscillator for click sound
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Quick beep: 800Hz down to 400Hz
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.1);
    
    gainNode.gain.setValueAtTime(volume * 0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    oscillator.start(now);
    oscillator.stop(now + 0.1);
  } catch (error) {
    console.warn('Failed to play click sound:', error);
  }
}

export function playPopSound(volume: number = 0.7) {
  if (typeof window === 'undefined') return;
  
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create a "pop" sound with quick frequency drop
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(1200, now);
    oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.15);
    
    gainNode.gain.setValueAtTime(volume * 0.4, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    oscillator.start(now);
    oscillator.stop(now + 0.15);
  } catch (error) {
    console.warn('Failed to play pop sound:', error);
  }
}

export function playConfirmSound(volume: number = 0.7) {
  if (typeof window === 'undefined') return;
  
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create a confirmation sound: two ascending tones
    const oscillator1 = ctx.createOscillator();
    const oscillator2 = ctx.createOscillator();
    const gainNode1 = ctx.createGain();
    const gainNode2 = ctx.createGain();
    
    oscillator1.connect(gainNode1);
    oscillator2.connect(gainNode2);
    gainNode1.connect(ctx.destination);
    gainNode2.connect(ctx.destination);
    
    // First tone: 600Hz
    oscillator1.frequency.setValueAtTime(600, now);
    gainNode1.gain.setValueAtTime(volume * 0.3, now);
    gainNode1.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    oscillator1.start(now);
    oscillator1.stop(now + 0.12);
    
    // Second tone: 800Hz (delayed)
    oscillator2.frequency.setValueAtTime(800, now + 0.1);
    gainNode2.gain.setValueAtTime(volume * 0.3, now + 0.1);
    gainNode2.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    oscillator2.start(now + 0.1);
    oscillator2.stop(now + 0.25);
  } catch (error) {
    console.warn('Failed to play confirm sound:', error);
  }
}

export function playErrorSound(volume: number = 0.7) {
  if (typeof window === 'undefined') return;
  
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create a buzz/error sound
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(200, now);
    oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.2);
    
    gainNode.gain.setValueAtTime(volume * 0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    oscillator.start(now);
    oscillator.stop(now + 0.2);
  } catch (error) {
    console.warn('Failed to play error sound:', error);
  }
}
