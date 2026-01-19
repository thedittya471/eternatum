import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Trophy, Users, Zap } from 'lucide-react';

interface JamEventProps {
    id: string;
    title: string;
    description: string;
    participants: number;
    games: number;
    status: 'live' | 'upcoming' | 'ended';
    daysLeft?: number;
}

interface CreatorProps {
    id: string;
    name: string;
    title: string;
    gamesCreated: number;
    following: number;
    featured?: boolean;
}

interface CommunityGameJamsProps {
    jams?: JamEventProps[];
    creators?: CreatorProps[];
}

export default function CommunityGameJams({
    jams,
    creators,
}: CommunityGameJamsProps) {
    const defaultJams: JamEventProps[] = [
        {
            id: '1',
            title: 'Game Dev Arcade Jam #42',
            description: 'Create a game in 48 hours. Theme: "Neon Nights"',
            participants: 342,
            games: 287,
            status: 'live',
            daysLeft: 2,
        },
        {
            id: '2',
            title: 'Pixel Art Challenge',
            description: 'Build with retro pixel aesthetics. Any duration.',
            participants: 156,
            games: 89,
            status: 'live',
            daysLeft: 7,
        },
        {
            id: '3',
            title: 'Next Month Mega Jam',
            description: 'The biggest jam of the year. Starts next month.',
            participants: 0,
            games: 0,
            status: 'upcoming',
            daysLeft: 28,
        },
    ];

    const defaultCreators: CreatorProps[] = [
        {
            id: '1',
            name: 'Alex Dev',
            title: 'Arcade Legend',
            gamesCreated: 47,
            following: 12400,
            featured: true,
        },
        {
            id: '2',
            name: 'Luna Coder',
            title: 'Pixel Artist',
            gamesCreated: 23,
            following: 8900,
            featured: true,
        },
        {
            id: '3',
            name: 'Neo Stream',
            title: 'Speedrunner Dev',
            gamesCreated: 15,
            following: 5600,
            featured: false,
        },
    ];

    const displayJams = jams || defaultJams;
    const displayCreators = creators || defaultCreators;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'live':
                return 'success';
            case 'upcoming':
                return 'warning';
            case 'ended':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <section className="relative z-10 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
                    <div className="text-center flex-shrink-0">
                        <h2 className="font-pixel text-sm text-gray-500 tracking-widest mb-1">
                            COMMUNITY ZONE
                        </h2>
                        <p className="text-xl md:text-2xl font-bold text-white">
                            Game Jams & Events
                        </p>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
                </div>

                {/* Two-column layout: Jams and Creators */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Game Jams - 2 columns */}
                    <div className="lg:col-span-2">
                        <h3 className="font-pixel text-sm text-gray-500 mb-6 tracking-widest">
                            ACTIVE & UPCOMING JAMS
                        </h3>
                        <div className="space-y-4">
                            {displayJams.map((jam) => (
                                <Card
                                    key={jam.id}
                                    className="p-4 hover:border-cyan-500/50 cursor-pointer group transition-all"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-bold text-white group-hover:text-neon-cyan transition-colors">
                                                    {jam.title}
                                                </h4>
                                                <Badge variant={getStatusColor(jam.status)}>
                                                    {jam.status.toUpperCase()}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-400 mb-3">
                                                {jam.description}
                                            </p>
                                            <div className="flex items-center gap-6 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Users size={14} />
                                                    <span>{jam.participants} participants</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Zap size={14} />
                                                    <span>{jam.games} games</span>
                                                </div>
                                            </div>
                                        </div>
                                        {jam.daysLeft && (
                                            <div className="text-center flex-shrink-0">
                                                <div className="font-pixel text-xs text-gray-600 mb-1">
                                                    ENDS IN
                                                </div>
                                                <div className="text-2xl font-bold text-neon-cyan">
                                                    {jam.daysLeft}d
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Creator Spotlight - 1 column */}
                    <div>
                        <h3 className="font-pixel text-sm text-gray-500 mb-6 tracking-widest">
                            TOP CREATORS
                        </h3>
                        <div className="space-y-4">
                            {displayCreators.map((creator) => (
                                <Card
                                    key={creator.id}
                                    className={`p-4 group cursor-pointer transition-all ${
                                        creator.featured
                                            ? 'border-l-4 border-l-electric-purple hover:border-l-soft-magenta'
                                            : 'hover:border-cyan-500/50'
                                    }`}
                                >
                                    {creator.featured && (
                                        <div className="flex items-center gap-1 mb-2 text-xs text-soft-magenta">
                                            <Trophy size={12} />
                                            <span className="font-pixel">FEATURED</span>
                                        </div>
                                    )}
                                    <h4 className="font-bold text-white group-hover:text-neon-cyan transition-colors mb-1">
                                        {creator.name}
                                    </h4>
                                    <p className="text-xs text-gray-400 mb-3">
                                        {creator.title}
                                    </p>
                                    <div className="space-y-2 text-xs text-gray-500">
                                        <div className="flex justify-between">
                                            <span>Games:</span>
                                            <span className="text-neon-cyan font-medium">
                                                {creator.gamesCreated}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Following:</span>
                                            <span className="text-electric-purple font-medium">
                                                {(creator.following / 1000).toFixed(1)}K
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Community stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-surface/50 rounded-lg border border-white/5">
                    <div className="text-center">
                        <div className="font-pixel text-sm text-gray-500 mb-1">
                            TOTAL PLAYERS
                        </div>
                        <div className="text-2xl font-bold text-neon-cyan">
                            47.2K
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="font-pixel text-sm text-gray-500 mb-1">
                            GAMES CREATED
                        </div>
                        <div className="text-2xl font-bold text-electric-purple">
                            12.8K
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="font-pixel text-sm text-gray-500 mb-1">
                            JAMS HOSTED
                        </div>
                        <div className="text-2xl font-bold text-pixel-green">
                            256
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="font-pixel text-sm text-gray-500 mb-1">
                            ACTIVE NOW
                        </div>
                        <div className="text-2xl font-bold text-soft-magenta">
                            3.4K
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
