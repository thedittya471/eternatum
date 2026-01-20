'use client';

import React, { useState, useMemo } from 'react';
import GameCard, { GameCardProps } from './GameCard';
import { Button } from '@/components/ui/Button';
import { getAlternatingColor } from '@/lib/utils';

interface FeaturedGamesProps {
    title?: string;
    subtitle?: string;
    games?: GameCardProps[];
    onGameClick?: (gameId: string) => void;
}

type SortOption = 'featured' | 'likes' | 'newest';
type FilterStatus = 'all' | 'featured' | 'new' | 'beta';

export default function FeaturedGames({
    title = 'PLAY ZONE',
    subtitle = 'Featured Games',
    games = [],
    onGameClick,
}: FeaturedGamesProps) {
    const [sortBy, setSortBy] = useState<SortOption>('featured');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
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

    const allGames = games.length > 0 ? games : defaultGames;

    // Filter games based on status
    const filteredGames = useMemo(() => {
        if (filterStatus === 'all') {
            return allGames;
        }
        return allGames.filter((game) => game.status === filterStatus);
    }, [allGames, filterStatus]);

    // Sort games
    const sortedGames = useMemo(() => {
        const gamesCopy = [...filteredGames];
        switch (sortBy) {
            case 'likes':
                return gamesCopy.sort((a, b) => b.likes - a.likes);
            case 'newest':
                return gamesCopy.reverse();
            case 'featured':
            default:
                return gamesCopy.sort((a, b) => {
                    const statusOrder = { featured: 0, new: 1, beta: 2 };
                    const statusA = statusOrder[a.status as keyof typeof statusOrder] ?? 3;
                    const statusB = statusOrder[b.status as keyof typeof statusOrder] ?? 3;
                    return statusA - statusB;
                });
        }
    }, [filteredGames, sortBy]);

    return (
        <section className="relative z-10 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <div className="flex items-center gap-4 mb-8">
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

                {/* Filter and Sort Controls */}
                <div className="flex flex-col md:flex-row gap-6 mb-10 items-start md:items-center justify-between">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-gray-500 font-pixel self-center mr-2">FILTER:</span>
                        {(['all', 'featured', 'new', 'beta'] as const).map((status, idx) => {
                            const altColor = getAlternatingColor(idx);
                            return (
                                <Button
                                    key={status}
                                    variant={filterStatus === status ? 'primary' : 'outline'}
                                    size="sm"
                                    onClick={() => setFilterStatus(status)}
                                    soundEffect="click"
                                    className={`capitalize font-pixel text-xs tracking-wider ${
                                        filterStatus === status
                                            ? 'text-black'
                                            : `${altColor.text} hover:${altColor.text}`
                                    }`}
                                >
                                    {status === 'all' ? '◆ ALL' : `◆ ${status.toUpperCase()}`}
                                </Button>
                            );
                        })}
                    </div>

                    {/* Sort Options */}
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-gray-500 font-pixel self-center mr-2">SORT:</span>
                        {(['featured', 'likes', 'newest'] as const).map((sort, idx) => {
                            const altColor = getAlternatingColor(idx);
                            return (
                                <Button
                                    key={sort}
                                    variant={sortBy === sort ? 'primary' : 'outline'}
                                    size="sm"
                                    onClick={() => setSortBy(sort)}
                                    soundEffect="pop"
                                    className={`capitalize font-pixel text-xs tracking-wider ${
                                        sortBy === sort ? 'text-black' : `${altColor.text} hover:${altColor.text}`
                                    }`}
                                >
                                    {sort === 'featured'
                                        ? '★ FEATURED'
                                        : sort === 'likes'
                                            ? '♥ TRENDING'
                                            : '► NEW'}
                                </Button>
                            );
                        })}
                    </div>
                </div>

                {/* Games grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedGames.map((game, index) => (
                        <GameCard
                            key={game.id}
                            {...game}
                            index={index}
                            onClick={() => onGameClick?.(game.id)}
                        />
                    ))}
                </div>

                {sortedGames.length === 0 && (
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <p className="text-gray-400 font-pixel text-lg mb-2">NO GAMES FOUND</p>
                            <p className="text-gray-600 text-sm">Try adjusting your filters</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
