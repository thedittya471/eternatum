import * as React from 'react';
import { cn } from '@/lib/utils';
import { useAudio } from '@/contexts/AudioContext';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'pixel';
    size?: 'sm' | 'md' | 'lg';
    glow?: boolean;
    colorCycle?: boolean;
    soundEffect?: 'click' | 'pop' | 'confirm';
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', glow = false, colorCycle = false, soundEffect = 'click', asChild = false, children, onClick, ...props }, ref) => {
        const audio = useAudio();

        const baseStyles = "relative inline-flex items-center justify-center rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:pointer-events-none font-sans font-medium active:translate-y-[1px]";

        const variants = {
            primary: "bg-yellow-400 text-black hover:bg-yellow-300 border border-transparent shadow-[0_0_10px_rgba(255,255,0,0.3)] hover:shadow-[0_0_20px_rgba(255,255,0,0.6)]",
            secondary: "bg-purple-600 text-white hover:bg-purple-500 border border-transparent shadow-[0_0_10px_rgba(191,0,255,0.3)] hover:shadow-[0_0_20px_rgba(191,0,255,0.6)]",
            outline: "bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-950/30",
            ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-white/5",
            pixel: "font-pixel uppercase text-sm tracking-widest bg-green-600 text-black hover:bg-green-500 border-2 border-green-400 shadow-[4px_4px_0px_#003300] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#003300] active:translate-y-[4px] active:shadow-none rounded-none transition-none",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-5 text-sm",
            lg: "h-12 px-8 text-base",
        };

        const glowEffect = colorCycle ? "animate-button-color-cycle" : glow ? "animate-pulse-slow" : "";

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            audio.play(soundEffect);
            onClick?.(e);
        };

        // For color-cycle, use a base style that will be overridden by animation
        const baseVariantStyle = colorCycle
            ? "bg-transparent text-white border border-neon-red"
            : variants[variant];

        const computedClassName = cn(baseStyles, baseVariantStyle, sizes[size], glowEffect, className);

        // If asChild is true, apply styles to child element
        if (asChild) {
            return React.cloneElement(children as React.ReactElement, {
                className: computedClassName,
                ref: ref,
                ...props,
            } as any);
        }

        return (
            <button
                ref={ref}
                className={computedClassName}
                onClick={handleClick}
                {...props}
            >
                {variant === 'primary' || variant === 'secondary' ? (
                    /* Scanline overlay for primary/secondary buttons */
                    <span className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat opacity-0 hover:opacity-100 transition-opacity duration-500 hover:bg-[position:200%_0,0_0] pointer-events-none rounded-[inherit]" />
                ) : null}
                <span className="relative z-10 flex items-center gap-2">{children}</span>
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
