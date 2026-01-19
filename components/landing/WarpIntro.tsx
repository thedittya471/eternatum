'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface WarpIntroProps {
    onSkip?: () => void;
    onComplete?: () => void;
    autoSkipDelay?: number;
}

export default function WarpIntro({ onSkip, onComplete, autoSkipDelay = 5000 }: WarpIntroProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [textPhase, setTextPhase] = useState(0);
    const [shouldAutoComplete, setShouldAutoComplete] = useState(false);

    useEffect(() => {
        // Text animation phases
        const textTimers = [
            setTimeout(() => setTextPhase(1), 500),
            setTimeout(() => setTextPhase(2), 2500),
            setTimeout(() => setShouldAutoComplete(true), autoSkipDelay),
        ];

        return () => textTimers.forEach(timer => clearTimeout(timer));
    }, [autoSkipDelay]);

    useEffect(() => {
        if (shouldAutoComplete) {
            handleComplete();
        }
    }, [shouldAutoComplete]);

    const handleSkip = () => {
        setIsVisible(false);
        onSkip?.();
    };

    const handleComplete = () => {
        setIsVisible(false);
        onComplete?.();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Animated starfield background */}
            <div className="absolute inset-0 bg-black">
                <div className="starfield-background" />
                {/* Multiple layers for depth */}
                <div className="starfield-layer-1" />
                <div className="starfield-layer-2" />
                <div className="starfield-layer-3" />
            </div>

            {/* Vignette effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />

            {/* Skip button */}
            <button
                onClick={handleSkip}
                className="absolute top-6 right-6 z-10 p-2 text-gray-300 hover:text-neon-cyan transition-colors focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                aria-label="Skip intro"
            >
                <X size={24} />
            </button>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Logo with glow */}
                <div className="mb-12 text-center animate-pulse-slow">
                    <div className="w-16 h-16 bg-neon-cyan rounded-sm mx-auto mb-6 shadow-[0_0_40px_rgba(0,240,255,0.8)]" />
                    <h1 className="font-pixel text-4xl md:text-5xl font-bold text-neon-cyan tracking-widest text-glow-cyan">
                        ETERNATUM
                    </h1>
                </div>

                {/* Text animation */}
                <div className="text-center max-w-md space-y-4">
                    {/* Phase 1: Initializing message */}
                    {(textPhase >= 1) && (
                        <div className="animate-fade-in">
                            <p className="font-pixel text-lg text-gray-300 tracking-wide">
                                Initializing game universe…
                            </p>
                        </div>
                    )}

                    {/* Phase 2: Entering message */}
                    {(textPhase >= 2) && (
                        <div className="animate-fade-in">
                            <p className="font-pixel text-lg text-neon-cyan text-glow-cyan tracking-wide">
                                Entering developer space…
                            </p>
                        </div>
                    )}
                </div>

                {/* Loading indicator */}
                <div className="absolute bottom-20 flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
            </div>

            {/* Warp speed lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="warp-lines" />
            </div>
        </div>
    );
}
