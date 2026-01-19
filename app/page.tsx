'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// Dynamic imports for performance
const WarpIntro = dynamic(() => import('@/components/landing/WarpIntro'), { ssr: false });
const LandingScene = dynamic(() => import('@/components/landing/LandingScene'), { ssr: false });
const FeaturedGames = dynamic(() => import('@/components/landing/FeaturedGames'));
const PacManDivider = dynamic(() => import('@/components/landing/PacManDivider'));
const LearnByBuilding = dynamic(() => import('@/components/landing/LearnByBuilding'));
const CommunityGameJams = dynamic(() => import('@/components/landing/CommunityGameJams'));
const UserScoreboard = dynamic(() => import('@/components/landing/UserScoreboard'));

export default function LandingPage() {
    const [showWarpIntro, setShowWarpIntro] = useState(true);
    const [pacManEnabled, setPacManEnabled] = useState(true);

    const handleWarpComplete = () => {
        setShowWarpIntro(false);
    };

    const handleWarpSkip = () => {
        setShowWarpIntro(false);
    };

    return (
        <main className="relative min-h-screen bg-background text-gray-100 overflow-x-hidden selection:bg-neon-cyan selection:text-black">
            {/* Warp intro animation */}
            {showWarpIntro && (
                <WarpIntro
                    onComplete={handleWarpComplete}
                    onSkip={handleWarpSkip}
                    autoSkipDelay={5000}
                />
            )}

            {/* Background 3D Scene */}
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <LandingScene />
            </div>

            {/* Scanlines Overlay */}
            <div className="scanlines" />

            {/* Navbar */}
            <header className="relative z-10 mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 bg-neon-cyan rounded-sm animate-pulse-slow" />
                    <span className="font-pixel text-2xl font-bold tracking-widest text-glow-cyan group-hover:text-neon-cyan transition-colors">
                        ETERNATUM
                    </span>
                </div>
                <nav className="hidden md:flex gap-8 font-medium text-sm text-gray-400">
                    {['Games', 'Assets', 'Learn', 'Community'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="hover:text-neon-cyan hover:text-glow-cyan transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </nav>
                <div className="flex gap-4">
                    <Button variant="ghost" size="sm">
                        Log In
                    </Button>
                    <Button size="sm" glow>
                        Sign Up
                    </Button>
                </div>
            </header>

            {/* Hero Command Panel Section */}
            <section className="relative z-10 flex flex-col items-center justify-center pt-20 pb-32 px-6 text-center max-w-5xl mx-auto">
                <Badge variant="success" className="mb-6 animate-float">
                    SYSTEM ONLINE_ v1.0
                </Badge>

                <h1 className="font-pixel text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
                    Build. Play.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-electric-purple text-glow-cyan">
                        Level Up.
                    </span>
                </h1>

                <p className="max-w-2xl text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
                    Create games. Learn by doing. Join the dev arcade.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Button size="lg" glow className="min-w-[200px] text-lg">
                        Start Building
                    </Button>
                    <Button variant="outline" size="lg" className="min-w-[200px] text-lg">
                        Play Games
                    </Button>
                </div>
            </section>

            {/* Featured Games (Play Zone) Section */}
            <FeaturedGames
                title="PLAY ZONE"
                subtitle="Featured Games"
                onGameClick={(id) => console.log('Playing game:', id)}
            />

            {/* Pac-Man Divider */}
            <PacManDivider
                enabled={pacManEnabled}
                onToggle={setPacManEnabled}
            />

            {/* Learn by Building Section */}
            <LearnByBuilding
                title="PROGRESSION SYSTEM"
                subtitle="Learn by Building"
            />

            {/* Community & Game Jams Section */}
            <CommunityGameJams />

            {/* User Scoreboard Section */}
            <UserScoreboard
                playerName="PLAYER_NEXUS"
                level={12}
                xp={3420}
                maxXp={5000}
                gamesBuilt={27}
            />

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/5 bg-surface/50 py-12 px-6 mt-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h4 className="font-pixel text-sm text-gray-400 mb-4">PRODUCT</h4>
                            <ul className="space-y-2 text-sm text-gray-500 hover:text-gray-400 transition-colors">
                                <li><a href="#">Create</a></li>
                                <li><a href="#">Play</a></li>
                                <li><a href="#">Learn</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-pixel text-sm text-gray-400 mb-4">COMMUNITY</h4>
                            <ul className="space-y-2 text-sm text-gray-500 hover:text-gray-400 transition-colors">
                                <li><a href="#">Discord</a></li>
                                <li><a href="#">Game Jams</a></li>
                                <li><a href="#">Events</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-pixel text-sm text-gray-400 mb-4">RESOURCES</h4>
                            <ul className="space-y-2 text-sm text-gray-500 hover:text-gray-400 transition-colors">
                                <li><a href="#">Docs</a></li>
                                <li><a href="#">Tutorials</a></li>
                                <li><a href="#">API</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-pixel text-sm text-gray-400 mb-4">LEGAL</h4>
                            <ul className="space-y-2 text-sm text-gray-500 hover:text-gray-400 transition-colors">
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#">Terms</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/5 pt-8 text-center text-sm text-gray-600">
                        <p>© 2024 ETERNATUM. Built with ❤️ for indie developers.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
