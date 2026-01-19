import React from 'react';
import GameCard, { GameCardProps } from './GameCard';

interface FeaturedGamesProps {
    title?: string;
    subtitle?: string;
    games?: GameCardProps[];
    onGameClick?: (gameId: string) => void;
}

export default function FeaturedGames({
    title = 'PLAY ZONE',
    subtitle = 'Featured Games',
    games = [],
    onGameClick,
}: FeaturedGamesProps) {
    // Default games if none provided
    const defaultGames: GameCardProps[] = [
        {
            id: '1',
            title: 'Cyber Odyssey',
            creator: 'dev_nexus',
            likes: 1234,
            description: 'Navigate through a neon-soaked cyberpunk universe.',
            status: 'featured',
        },
        {
            id: '2',
            title: 'Pixel Paradise',
            creator: 'arcade_master',
            likes: 892,
            description: 'A retro platformer with modern mechanics.',
            status: 'new',
        },
        {
            id: '3',
            title: 'Void Explorer',
            creator: 'space_dev',
            likes: 2156,
            description: 'Explore the infinite void and discover mysteries.',
            status: 'featured',
        },
        {
            id: '4',
            title: 'Circuit Rush',
            creator: 'tech_wizard',
            likes: 654,
            description: 'Fast-paced puzzle game about electricity.',
            status: 'beta',
        },
        {
            id: '5',
            title: 'Neon Nexus',
            creator: 'quantum_dev',
            likes: 3421,
            description: 'Connect nodes and create circuits in this puzzle game.',
            status: 'featured',
        },
        {
            id: '6',
            title: 'Game Jam Champion',
            creator: 'indie_legend',
            likes: 5678,
            description: 'The winner of last month\'s dev arcade game jam.',
            status: 'new',
        },
    ];

    const displayGames = games.length > 0 ? games : defaultGames;

    return (
        <section className="relative z-10 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
                    <div className="text-center flex-shrink-0">
                        <h2 className="font-pixel text-sm text-gray-500 tracking-widest mb-1">
                            {title}
                        </h2>
                        <p className="text-xl md:text-2xl font-bold text-white">
                            {subtitle}
                        </p>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
                </div>

                {/* Games grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayGames.map((game) => (
                        <GameCard
                            key={game.id}
                            {...game}
                            onClick={() => onGameClick?.(game.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
