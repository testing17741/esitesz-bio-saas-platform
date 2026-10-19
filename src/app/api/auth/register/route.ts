import { NextRequest } from 'next/server';
import { z } from 'zod';
import { dbService } from '@/lib/db';
import { hashPassword, setSessionCookie } from '@/lib/auth';
import { jsonResponse, errorResponse } from '@/lib/api-response';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message || 'Invalid input', 400);
    }

    const { name, email, password } = parsed.data;

    // Check if user already exists
    const existing = dbService.getUserByEmail(email);
    if (existing) {
      return errorResponse('An account with this email address already exists.', 409);
    }

    const passwordHash = hashPassword(password);
    const user = dbService.createUser({
      name,
      email,
      passwordHash,
      role: 'user',
      isVerified: true,
    });

    await setSessionCookie({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return jsonResponse({
      user,
      message: 'Account created successfully',
    }, 201);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to create account', 500);
  }
}
