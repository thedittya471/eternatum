'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAudio } from '@/contexts/AudioContext';

export default function SignupForm() {
  const router = useRouter();
  const audio = useAudio();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Validation
      if (!name || !email || !password || !confirmPassword) {
        throw new Error('All fields are required');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Sign up user
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Sign up failed');
      }

      audio.play('confirm');
      setSuccess('Account created! Redirecting to login...');
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      audio.play('error');
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-pixel text-gray-400 mb-2">
          PLAYER NAME
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Your gaming name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          className="border-neon-green-bright/50 focus:border-neon-green-bright"
          required
        />
      </div>

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
          className="border-neon-blue/50 focus:border-neon-blue"
          required
        />
      </div>

      {/* Confirm Password Input */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-pixel text-gray-400 mb-2">
          CONFIRM PASSWORD
        </label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
          className="border-neon-red/50 focus:border-neon-red"
          required
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-neon-red/20 border border-neon-red/50 rounded text-neon-red text-sm font-pixel">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-3 bg-neon-green-bright/20 border border-neon-green-bright/50 rounded text-neon-green-bright text-sm font-pixel">
          {success}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full text-lg font-pixel tracking-widest"
        colorCycle
        soundEffect="pop"
      >
        {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
      </Button>

      {/* Login Link */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-neon-cyan hover:text-glow-cyan transition-colors font-pixel">
            LOG IN
          </a>
        </p>
      </div>
    </form>
  );
}
