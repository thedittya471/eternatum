'use client';

import React, { useState, useEffect } from 'react';

interface PacManDividerProps {
    enabled?: boolean;
    onToggle?: (enabled: boolean) => void;
}

export default function PacManDivider({ enabled = true, onToggle }: PacManDividerProps) {
    const [dotsEaten, setDotsEaten] = useState(0);
    const [ghostPhase, setGhostPhase] = useState(0);

    useEffect(() => {
        if (!enabled) return;

        // Simulate Pac-Man eating dots as user "progresses"
        const pacTimer = setInterval(() => {
            setDotsEaten((prev) => (prev + 1) % 12);
        }, 150);

        // Ghost appearance phases
        const ghostTimer = setInterval(() => {
            setGhostPhase((prev) => (prev + 1) % 4);
        }, 2000);

        return () => {
            clearInterval(pacTimer);
            clearInterval(ghostTimer);
        };
    }, [enabled]);

    if (!enabled) {
        return (
            <div className="relative z-10 py-8 px-6 flex justify-center">
                <button
                    onClick={() => onToggle?.(true)}
                    className="text-xs font-pixel text-gray-500 hover:text-neon-cyan transition-colors"
                >
                    [Enable Pac-Man divider]
                </button>
            </div>
        );
    }

    // SVG assets for Pac-Man style divider
    const pacmanSize = 32;
    const dotRadius = 3;
    const dotSpacing = 20;
    const dotsCount = 12;
    const dividerHeight = 60;

    return (
        <div className="relative z-10 py-12 px-6 bg-gradient-to-r from-surface/0 via-surface/50 to-surface/0">
            <div className="max-w-7xl mx-auto">
                <svg
                    viewBox={`0 0 1200 ${dividerHeight}`}
                    className="w-full h-auto"
                    preserveAspectRatio="none"
                >
                    {/* Dots */}
                    {Array.from({ length: dotsCount }).map((_, i) => {
                        const xPos = (i * dotSpacing) + 80;
                        const isEaten = i < dotsEaten;
                        return (
                            <circle
                                key={`dot-${i}`}
                                cx={xPos}
                                cy={dividerHeight / 2}
                                r={dotRadius}
                                fill={isEaten ? 'transparent' : '#00f0ff'}
                                opacity={isEaten ? 0 : 0.6}
                                className="transition-opacity duration-100"
                            />
                        );
                    })}

                    {/* Pac-Man */}
                    <g transform={`translate(${50 + dotsEaten * dotSpacing}, ${dividerHeight / 2})`}>
                        {/* Body */}
                        <circle
                            cx={0}
                            cy={0}
                            r={pacmanSize / 2}
                            fill="#ffff00"
                        />
                        {/* Mouth */}
                        <path
                            d={`M 0 0 L ${pacmanSize * 0.4} ${pacmanSize * 0.3} A ${pacmanSize / 2} ${pacmanSize / 2} 0 1 1 ${pacmanSize * 0.4} ${-pacmanSize * 0.3}`}
                            fill="#0a0a0a"
                        />
                        {/* Eye */}
                        <circle
                            cx={-pacmanSize * 0.1}
                            cy={-pacmanSize * 0.15}
                            r={2}
                            fill="#000"
                        />
                    </g>

                    {/* Ghosts */}
                    {/* Ghost 1 - Red */}
                    {ghostPhase >= 1 && (
                        <g transform={`translate(${300 + ghostPhase * 40}, ${dividerHeight / 2 - 15})`} opacity={0.8 - ghostPhase * 0.1}>
                            <rect width="16" height="20" fill="#ff0000" rx="2" />
                            <circle cx="4" cy="4" r="2" fill="white" />
                            <circle cx="12" cy="4" r="2" fill="white" />
                        </g>
                    )}

                    {/* Ghost 2 - Pink */}
                    {ghostPhase >= 2 && (
                        <g transform={`translate(${500 + ghostPhase * 30}, ${dividerHeight / 2 + 10})`} opacity={0.7 - ghostPhase * 0.15}>
                            <rect width="16" height="20" fill="#ff00aa" rx="2" />
                            <circle cx="4" cy="4" r="2" fill="white" />
                            <circle cx="12" cy="4" r="2" fill="white" />
                        </g>
                    )}

                    {/* Ghost 3 - Cyan */}
                    {ghostPhase >= 3 && (
                        <g transform={`translate(${700 + ghostPhase * 20}, ${dividerHeight / 2 - 10})`} opacity={0.6 - ghostPhase * 0.1}>
                            <rect width="16" height="20" fill="#00f0ff" rx="2" />
                            <circle cx="4" cy="4" r="2" fill="black" />
                            <circle cx="12" cy="4" r="2" fill="black" />
                        </g>
                    )}
                </svg>

                {/* Toggle button */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => onToggle?.(false)}
                        className="text-xs font-pixel text-gray-600 hover:text-gray-400 transition-colors"
                        title="Disable Pac-Man divider"
                    >
                        [Disable animation]
                    </button>
                </div>
            </div>
        </div>
    );
}
