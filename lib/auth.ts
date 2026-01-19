import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

/**
 * Simple in-memory user database
 * In production, this should be replaced with a real database
 */
const users = new Map<string, { id: string; email: string; password: string; name: string }>();

// Initialize with default user for testing
users.set('test@example.com', {
  id: '1',
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
});

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = users.get(credentials.email as string);

        if (!user) {
          throw new Error('User not found');
        }

        if (user.password !== credentials.password) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret-key-for-development',
};

/**
 * Helper function to sign up a new user
 */
export async function signUpUser(
  email: string,
  password: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  // Validate input
  if (!email || !password || !name) {
    return { success: false, error: 'All fields are required' };
  }

  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters' };
  }

  // Check if user already exists
  if (users.has(email)) {
    return { success: false, error: 'User already exists' };
  }

  // Create new user
  const userId = `user-${Date.now()}`;
  users.set(email, {
    id: userId,
    email,
    password,
    name,
  });

  return { success: true };
}
