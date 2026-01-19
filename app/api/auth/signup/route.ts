import { signUpUser } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    const result = await signUpUser(email, password, name);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Sign up failed' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Account created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred during sign up' },
      { status: 500 }
    );
  }
}
