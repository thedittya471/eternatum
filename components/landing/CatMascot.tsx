'use client';

import React from 'react';
import Image from 'next/image';

interface CatMascotProps {
  animate?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 96,
  md: 128,
  lg: 192,
};

export default function CatMascot({
  animate = true,
  className = '',
  size = 'md',
}: CatMascotProps) {
  const dimension = sizeMap[size];

  return (
    <div
      className={`${className} relative inline-flex items-center justify-center`}
      style={{
        width: `${dimension}px`,
        height: `${dimension}px`,
      }}
    >
      <Image
        src="https://cdn.builder.io/api/v1/image/assets%2Fb46c142b13d84d9484edef66fb44edd7%2Feeb1fc9ec2cb45ea93c5004978e69e21?format=webp&width=800"
        alt="Cool thug cat mascot"
        width={dimension}
        height={dimension}
        className={`w-full h-full object-contain drop-shadow-lg ${
          animate ? 'animate-pulse-neon' : ''
        }`}
        priority
      />

      {/* Neon glow effect around cat */}
      {animate && (
        <div
          className="absolute inset-0 rounded-full animate-pulse-neon pointer-events-none"
          style={{
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.3), 0 0 60px rgba(191, 0, 255, 0.2)',
          }}
        />
      )}
    </div>
  );
}
