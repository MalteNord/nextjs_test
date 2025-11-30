import { NextRequest, NextResponse } from 'next/server';

// Mock user database
const MOCK_USERS = [
  { id: '1', email: 'admin@test.com', password: 'admin123', name: 'Admin User', role: 'admin' },
  { id: '2', email: 'user@test.com', password: 'user123', name: 'Regular User', role: 'user' },
];

// Simple token generation (in real app, use JWT)
function generateToken(userId: string): string {
  const payload = { userId, exp: Date.now() + 24 * 60 * 60 * 1000 }; // 24h expiry
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user.id);

    // Create response with HttpOnly cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    // Set HttpOnly, Secure cookie (this is the CORRECT way)
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
