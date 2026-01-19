'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="font-pixel text-2xl text-neon-cyan animate-pulse">LOADING...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <main className="relative min-h-screen bg-background text-gray-100 overflow-x-hidden">
      {/* Scanlines */}
      <div className="scanlines" />

      {/* Navbar */}
      <header className="relative z-10 border-b border-white/5 bg-surface/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-pixel text-2xl font-bold text-glow-cyan">ETERNATUM</h1>
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              Explore Games
            </Button>
            <Button variant="ghost" size="sm" onClick={() => signOut({ redirect: true })}>
              Log Out
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="space-y-4">
            <Badge variant="success">PLAYER DASHBOARD</Badge>
            <h2 className="font-pixel text-5xl font-bold text-neon-cyan">
              Welcome back, {session.user.name}!
            </h2>
            <p className="text-gray-400 text-lg">
              You're logged in to ETERNATUM. Explore games, build creations, and level up!
            </p>
          </div>

          {/* User Info Card */}
          <div className="border border-neon-cyan/30 rounded-lg p-8 bg-surface/50 backdrop-blur-sm space-y-6">
            <h3 className="font-pixel text-xl text-neon-cyan">PLAYER PROFILE</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 font-pixel text-sm mb-2">PLAYER NAME</p>
                <p className="text-xl text-white">{session.user.name}</p>
              </div>

              <div>
                <p className="text-gray-500 font-pixel text-sm mb-2">EMAIL ADDRESS</p>
                <p className="text-xl text-white">{session.user.email}</p>
              </div>

              <div>
                <p className="text-gray-500 font-pixel text-sm mb-2">PLAYER ID</p>
                <p className="text-xl text-neon-green-bright font-mono">{session.user.id}</p>
              </div>

              <div>
                <p className="text-gray-500 font-pixel text-sm mb-2">STATUS</p>
                <p className="text-xl text-neon-blue">ONLINE ●</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="border border-neon-blue/30 rounded-lg p-8 bg-surface/50 backdrop-blur-sm space-y-6">
            <h3 className="font-pixel text-xl text-neon-blue">NEXT STEPS</h3>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="text-neon-blue font-pixel text-lg">01</span>
                <div>
                  <p className="font-bold text-white mb-1">Explore Featured Games</p>
                  <p className="text-gray-400 text-sm">Check out the latest games in the arcade</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="text-neon-blue font-pixel text-lg">02</span>
                <div>
                  <p className="font-bold text-white mb-1">Start Building</p>
                  <p className="text-gray-400 text-sm">Create your first game using our editor</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="text-neon-blue font-pixel text-lg">03</span>
                <div>
                  <p className="font-bold text-white mb-1">Join the Community</p>
                  <p className="text-gray-400 text-sm">Participate in game jams and events</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" glow className="text-lg font-pixel">
              Explore Games
            </Button>
            <Button size="lg" variant="outline" className="text-lg font-pixel">
              Start Building
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
