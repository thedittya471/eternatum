import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Trophy, Star, Zap, Award } from 'lucide-react';

interface AchievementProps {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    earned: boolean;
}

interface UserScoreboardProps {
    playerName?: string;
    level?: number;
    xp?: number;
    maxXp?: number;
    gamesBuilt?: number;
    achievements?: AchievementProps[];
    showEditButton?: boolean;
    onEdit?: () => void;
}

export default function UserScoreboard({
    playerName = 'PLAYER_NEXUS',
    level = 12,
    xp = 3420,
    maxXp = 5000,
    gamesBuilt = 27,
    achievements,
    showEditButton = true,
    onEdit,
}: UserScoreboardProps) {
    const defaultAchievements: AchievementProps[] = [
        {
            id: '1',
            name: 'First Steps',
            icon: <Zap size={20} />,
            description: 'Built your first game',
            earned: true,
        },
        {
            id: '2',
            name: 'Speed Demon',
            icon: <Star size={20} />,
            description: 'Built 10 games',
            earned: true,
        },
        {
            id: '3',
            name: 'Creator Elite',
            icon: <Trophy size={20} />,
            description: 'Built 50 games',
            earned: false,
        },
        {
            id: '4',
            name: 'Community Star',
            icon: <Award size={20} />,
            description: 'Game played 10K times',
            earned: false,
        },
        {
            id: '5',
            name: 'Jam Champion',
            icon: <Trophy size={20} />,
            description: 'Won a game jam',
            earned: true,
        },
        {
            id: '6',
            name: 'Pixel Master',
            icon: <Star size={20} />,
            description: 'Built 5 pixel games',
            earned: false,
        },
    ];

    const displayAchievements = achievements || defaultAchievements;
    const xpPercentage = (xp / maxXp) * 100;

    return (
        <section className="relative z-10 py-16 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Section header */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
                    <div className="text-center flex-shrink-0">
                        <h2 className="font-pixel text-sm text-gray-500 tracking-widest mb-1">
                            PLAYER STATS
                        </h2>
                        <p className="text-xl md:text-2xl font-bold text-white">
                            Your Scoreboard
                        </p>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
                </div>

                {/* Main stats card */}
                <Card className="mb-8 p-8 border-b-4 border-b-neon-cyan">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Left: Player name and level */}
                        <div className="flex flex-col justify-center">
                            <h3 className="font-pixel text-sm text-gray-500 mb-2">
                                PLAYER ALIAS
                            </h3>
                            <h2 className="font-pixel text-4xl md:text-5xl font-bold text-neon-cyan text-glow-cyan mb-6">
                                {playerName}
                            </h2>

                            {/* Level display */}
                            <div className="flex items-center gap-4">
                                <div>
                                    <div className="font-pixel text-xs text-gray-500 mb-1">
                                        LEVEL
                                    </div>
                                    <div className="text-5xl font-bold text-electric-purple">
                                        {level}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="font-pixel text-xs text-gray-500 mb-2">
                                        NEXT LEVEL
                                    </div>
                                    <div className="h-2 bg-black rounded-full overflow-hidden border border-white/10">
                                        <div
                                            className="h-full bg-gradient-to-r from-electric-purple to-soft-magenta transition-all duration-500"
                                            style={{
                                                width: `${xpPercentage}%`,
                                                boxShadow: '0 0 10px #bf00ff',
                                            }}
                                        />
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        {xp.toLocaleString()} / {maxXp.toLocaleString()} XP
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Key stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="p-4 bg-surface-highlight border-l-4 border-l-neon-cyan">
                                <div className="font-pixel text-xs text-gray-500 mb-2">
                                    GAMES BUILT
                                </div>
                                <div className="text-4xl font-bold text-neon-cyan">
                                    {gamesBuilt}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    Keep building! 🎮
                                </div>
                            </Card>

                            <Card className="p-4 bg-surface-highlight border-l-4 border-l-electric-purple">
                                <div className="font-pixel text-xs text-gray-500 mb-2">
                                    TOTAL XP EARNED
                                </div>
                                <div className="text-4xl font-bold text-electric-purple">
                                    {(xp + 12300).toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    All time
                                </div>
                            </Card>

                            <Card className="p-4 bg-surface-highlight border-l-4 border-l-pixel-green">
                                <div className="font-pixel text-xs text-gray-500 mb-2">
                                    PLAYTIME
                                </div>
                                <div className="text-3xl font-bold text-pixel-green">
                                    247h
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    Hours logged
                                </div>
                            </Card>

                            <Card className="p-4 bg-surface-highlight border-l-4 border-l-soft-magenta">
                                <div className="font-pixel text-xs text-gray-500 mb-2">
                                    ACHIEVEMENTS
                                </div>
                                <div className="text-3xl font-bold text-soft-magenta">
                                    {displayAchievements.filter((a) => a.earned).length}/{displayAchievements.length}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    Unlocked
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Edit button */}
                    {showEditButton && (
                        <div className="text-center">
                            <button
                                onClick={onEdit}
                                className="font-pixel text-sm text-gray-500 hover:text-neon-cyan transition-colors"
                            >
                                [Edit Profile]
                            </button>
                        </div>
                    )}
                </Card>

                {/* Achievements grid */}
                <div>
                    <h3 className="font-pixel text-sm text-gray-500 mb-6 tracking-widest">
                        ACHIEVEMENTS & BADGES
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {displayAchievements.map((achievement) => (
                            <Card
                                key={achievement.id}
                                className={`p-4 text-center transition-all ${
                                    achievement.earned
                                        ? 'opacity-100 border-white/10 hover:border-cyan-500/50'
                                        : 'opacity-50 border-white/5'
                                }`}
                            >
                                {/* Achievement icon */}
                                <div
                                    className={`flex justify-center mb-3 ${
                                        achievement.earned
                                            ? 'text-neon-cyan drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]'
                                            : 'text-gray-600'
                                    }`}
                                >
                                    {achievement.icon}
                                </div>

                                {/* Achievement name */}
                                <h4 className="font-bold text-sm text-white mb-1">
                                    {achievement.name}
                                </h4>

                                {/* Achievement description */}
                                <p className="text-xs text-gray-400 mb-2">
                                    {achievement.description}
                                </p>

                                {/* Status badge */}
                                {achievement.earned && (
                                    <Badge variant="success" className="text-xs">
                                        ✓ EARNED
                                    </Badge>
                                )}
                                {!achievement.earned && (
                                    <Badge variant="outline" className="text-xs">
                                        LOCKED
                                    </Badge>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
