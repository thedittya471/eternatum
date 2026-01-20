import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getAlternatingColor } from '@/lib/utils';

interface LearnStepProps {
    number: number;
    title: string;
    description: string;
    xpReward: number;
    progress: number;
}

interface LearnByBuildingProps {
    title?: string;
    subtitle?: string;
    steps?: LearnStepProps[];
}

export default function LearnByBuilding({
    title = 'PROGRESSION SYSTEM',
    subtitle = 'Learn by Building',
    steps,
}: LearnByBuildingProps) {
    const defaultSteps: LearnStepProps[] = [
        {
            number: 1,
            title: 'Learn Basics',
            description: 'Master the fundamentals of game development. Start with simple mechanics, understand core concepts, and get your first game running.',
            xpReward: 500,
            progress: 100,
        },
        {
            number: 2,
            title: 'Build Games',
            description: 'Create your own games using our tools. Combine mechanics, add polish, and bring your ideas to life with our visual editor.',
            xpReward: 1000,
            progress: 65,
        },
        {
            number: 3,
            title: 'Share & Collaborate',
            description: 'Publish your games, join game jams, collaborate with other developers, and level up through community feedback.',
            xpReward: 1500,
            progress: 30,
        },
    ];

    const displaySteps = steps || defaultSteps;

    return (
        <section className="relative z-10 py-16 px-6 bg-surface/30">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-12">
                    <h2 className="font-pixel text-sm text-gray-500 tracking-widest mb-2">
                        {title}
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {subtitle}
                    </h3>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Every step unlocks new features and earns you XP. Progress at your own pace and join challenges to level up faster.
                    </p>
                </div>

                {/* Steps grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {displaySteps.map((step, index) => (
                        <Card
                            key={step.number}
                            className="flex flex-col h-full p-6 border-l-4"
                            style={{
                                borderLeftColor:
                                    step.number === 1
                                        ? '#00ff41'
                                        : step.number === 2
                                            ? '#00f0ff'
                                            : '#bf00ff',
                            }}
                        >
                            {/* Step number */}
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-10 h-10 rounded-sm flex items-center justify-center font-pixel font-bold text-black"
                                    style={{
                                        backgroundColor:
                                            step.number === 1
                                                ? '#00ff41'
                                                : step.number === 2
                                                    ? '#00f0ff'
                                                    : '#bf00ff',
                                    }}
                                >
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-bold text-white">
                                    {step.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-gray-400 text-sm mb-6 flex-1">
                                {step.description}
                            </p>

                            {/* XP Reward */}
                            <div className="mb-4 pb-4 border-b border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-pixel text-xs text-gray-500">
                                        XP REWARD
                                    </span>
                                    <Badge variant="success">+{step.xpReward} XP</Badge>
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-pixel text-xs text-gray-500">
                                        COMPLETION
                                    </span>
                                    <span className="font-pixel text-xs text-gray-400">
                                        {step.progress}%
                                    </span>
                                </div>
                                <div className="h-3 bg-black rounded-full overflow-hidden border border-white/10">
                                    <div
                                        className="h-full transition-all duration-500 rounded-full"
                                        style={{
                                            width: `${step.progress}%`,
                                            backgroundColor:
                                                step.number === 1
                                                    ? '#00ff41'
                                                    : step.number === 2
                                                        ? '#00f0ff'
                                                        : '#bf00ff',
                                            boxShadow:
                                                step.number === 1
                                                    ? '0 0 10px #00ff41'
                                                    : step.number === 2
                                                        ? '0 0 10px #00f0ff'
                                                        : '0 0 10px #bf00ff',
                                        }}
                                    />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mt-12">
                    <div className="text-center p-4 rounded-lg bg-surface/50 border border-white/5">
                        <div className="font-pixel text-sm text-gray-500 mb-2">
                            TOTAL XP AVAILABLE
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-neon-cyan">
                            3,000
                        </div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-surface/50 border border-white/5">
                        <div className="font-pixel text-sm text-gray-500 mb-2">
                            AVERAGE TIME
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-electric-purple">
                            ~4 hrs
                        </div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-surface/50 border border-white/5">
                        <div className="font-pixel text-sm text-gray-500 mb-2">
                            DIFFICULTY
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-pixel-green">
                            Easy
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
