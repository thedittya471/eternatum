'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAudio } from '@/contexts/AudioContext';

export default function LoginForm() {
  const router = useRouter();
  const audio = useAudio();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        audio.play('error');
        setError(result.error || 'Invalid credentials');
      } else {
        audio.play('confirm');
        router.push('/dashboard');
      }
    } catch (err) {
      audio.play('error');
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-pixel text-gray-400 mb-2">
          EMAIL ADDRESS
        </label>
        <Input
          id="email"
          type="email"
          placeholder="player@eternatum.dev"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="border-neon-cyan/50 focus:border-neon-cyan"
          required
        />
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-pixel text-gray-400 mb-2">
          PASSWORD
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="border-neon-cyan/50 focus:border-neon-cyan"
          required
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-neon-red/20 border border-neon-red/50 rounded text-neon-red text-sm font-pixel">
          {error}
        </div>
      )}

      {/* Demo Credentials Info */}
      <div className="p-3 bg-neon-blue/20 border border-neon-blue/50 rounded text-neon-blue text-xs font-pixel">
        <p className="mb-1">DEMO CREDENTIALS:</p>
        <p>Email: test@example.com</p>
        <p>Password: password123</p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full text-lg font-pixel tracking-widest"
        colorCycle
        soundEffect="confirm"
      >
        {isLoading ? 'LOGGING IN...' : 'LOG IN'}
      </Button>

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/signup" className="text-neon-cyan hover:text-glow-cyan transition-colors font-pixel">
            SIGN UP
          </a>
        </p>
      </div>
    </form>
  );
}
