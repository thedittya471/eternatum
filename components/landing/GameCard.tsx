import React from 'react';
import { Heart, Play } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import GameThumbnail from '@/components/ui/GameThumbnail';
import { useAudio } from '@/contexts/AudioContext';

export interface GameCardProps {
    id: string;
    thumbnail?: string;
    title: string;
    creator: string;
    likes: number;
    description?: string;
    status?: 'beta' | 'new' | 'featured';
    onClick?: () => void;
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
}: GameCardProps) {
    return (
        <Card
            variant="game"
            className="cursor-pointer group overflow-hidden h-full flex flex-col"
            onClick={onClick}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick?.();
                }
            }}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-surface-highlight overflow-hidden border-b border-white/5 group-hover:border-cyan-500/30 transition-colors">
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="font-pixel text-gray-600 text-sm">NO SIGNAL</span>
                    </div>
                )}

                {/* Play button overlay */}
                <button
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-300"
                    aria-label={`Play ${title}`}
                >
                    <div className="rounded-full bg-neon-cyan/0 group-hover:bg-neon-cyan/80 p-3 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.8)]">
                        <Play
                            size={24}
                            className="text-black opacity-0 group-hover:opacity-100 transition-opacity fill-black"
                        />
                    </div>
                </button>

                {/* Status badge */}
                {status && (
                    <div className="absolute top-3 right-3">
                        <Badge
                            variant={
                                status === 'featured'
                                    ? 'warning'
                                    : status === 'new'
                                        ? 'success'
                                        : 'warning'
                            }
                        >
                            {status.toUpperCase()}
                        </Badge>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
                {/* Title and Creator */}
                <div className="mb-3">
                    <h3 className="font-bold text-lg text-white group-hover:text-neon-cyan transition-colors line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">by {creator}</p>
                </div>

                {/* Description */}
                {description && (
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2 flex-1">
                        {description}
                    </p>
                )}

                {/* Likes */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-auto pt-2 border-t border-white/5">
                    <Heart size={16} className="text-soft-magenta" />
                    <span>{likes.toLocaleString()} likes</span>
                </div>
            </div>
        </Card>
    );
}
