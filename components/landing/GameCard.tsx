import React from 'react';
import { Heart, Play } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import GameThumbnail from '@/components/ui/GameThumbnail';
import { useAudio } from '@/contexts/AudioContext';
import { getAlternatingColor } from '@/lib/utils';

export interface GameCardProps {
    id: string;
    thumbnail?: string;
    title: string;
    creator: string;
    likes: number;
    description?: string;
    status?: 'beta' | 'new' | 'featured';
    onClick?: () => void;
    index?: number;
}

export default function GameCard({
    id,
    thumbnail,
    title,
    creator,
    likes,
    description,
    status,
    onClick,
    index = 0,
}: GameCardProps) {
    const audio = useAudio();
    const alternatingColor = getAlternatingColor(index);

    const handleClick = () => {
        audio.play('confirm');
        onClick?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            audio.play('confirm');
            onClick?.();
        }
    };

    const borderColor = alternatingColor.border;

    return (
        <Card
            variant="game"
            className={`cursor-pointer group overflow-hidden h-full flex flex-col border-2 ${borderColor} transition-all duration-300 hover:shadow-lg hover:box-glow`}
            onClick={handleClick}
            role="link"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            {/* Thumbnail */}
            <div className="relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <GameThumbnail
                    gameId={id}
                    title={title}
                    customImage={thumbnail}
                    className="border-b border-white/5"
                />

                {/* Play button overlay with pop animation */}
                <button
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-colors duration-300"
                    aria-label={`Play ${title}`}
                >
                    <div className="rounded-full bg-neon-cyan/0 group-hover:bg-neon-cyan p-3 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,240,255,1)] group-hover:animate-pop-bounce">
                        <Play
                            size={28}
                            className="text-black opacity-0 group-hover:opacity-100 transition-opacity fill-black"
                        />
                    </div>
                </button>

                {/* Status badge with dynamic colors */}
                {status && (
                    <div className="absolute top-3 right-3 animate-pulse-neon">
                        <Badge
                            variant={
                                status === 'featured'
                                    ? 'warning'
                                    : status === 'new'
                                        ? 'success'
                                        : 'warning'
                            }
                            className={
                                status === 'featured'
                                    ? 'border-neon-red border text-neon-red'
                                    : status === 'new'
                                        ? 'border-neon-blue border text-neon-blue'
                                        : 'border-neon-green-bright border text-neon-green-bright'
                            }
                        >
                            {status.toUpperCase()}
                        </Badge>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col bg-gradient-to-b from-transparent to-black/20">
                {/* Title and Creator */}
                <div className="mb-3">
                    <h3 className="font-bold text-lg text-white group-hover:text-neon-cyan transition-colors line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1 font-pixel">by {creator}</p>
                </div>

                {/* Description */}
                {description && (
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2 flex-1">
                        {description}
                    </p>
                )}

                {/* Likes with animated heart */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-auto pt-3 border-t border-white/10 group-hover:border-white/20 transition-colors">
                    <Heart size={16} className="text-soft-magenta group-hover:animate-pop-bounce" />
                    <span className="group-hover:text-soft-magenta transition-colors">{likes.toLocaleString()} likes</span>
                </div>
            </div>
        </Card>
    );
}
