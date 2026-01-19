import React from 'react';
import { Badge } from '@/components/ui/Badge';
import SignupForm from '@/components/auth/SignupForm';

export const metadata = {
  title: 'Sign Up - ETERNATUM',
  description: 'Create a new ETERNATUM account',
};

export default function SignupPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="success" className="justify-center w-full">
          NEW PLAYER REGISTRATION
        </Badge>

        <h1 className="font-pixel text-4xl md:text-5xl font-bold text-neon-green-bright text-glow-green-bright tracking-widest">
          JOIN THE ARCADE
        </h1>

        <p className="text-gray-400">
          Create your ETERNATUM account and start building amazing games
        </p>
      </div>

      {/* Form Card */}
      <div className="border border-neon-green-bright/30 rounded-lg p-8 bg-surface/50 backdrop-blur-sm">
        <SignupForm />
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-gray-600 space-y-2">
        <p>© 2024 ETERNATUM. All rights reserved.</p>
        <p className="font-pixel">SECURE CONNECTION ESTABLISHED</p>
      </div>
    </div>
  );
}
