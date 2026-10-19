import { NextRequest } from 'next/server';
import { z } from 'zod';
import { dbService } from '@/lib/db';
import { verifyPassword, setSessionCookie } from '@/lib/auth';
import { verifyOtpCode } from '@/lib/otp';
import { jsonResponse, errorResponse } from '@/lib/api-response';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().optional(),
  otpCode: z.string().optional(),
  loginMethod: z.enum(['password', 'otp']).default('password'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message || 'Invalid input', 400);
    }

    const { email, password, otpCode, loginMethod } = parsed.data;
    const userWithHash = dbService.getUserByEmail(email);

    if (!userWithHash) {
      return errorResponse('Invalid email or credentials.', 401);
    }

    if (loginMethod === 'otp') {
      if (!otpCode) {
        return errorResponse('OTP code is required for OTP login.', 400);
      }
      const isValid = verifyOtpCode(email, otpCode, 'login');
      if (!isValid) {
        return errorResponse('Invalid or expired OTP code.', 400);
      }
    } else {
      if (!password) {
        return errorResponse('Password is required.', 400);
      }
      const isValid = verifyPassword(password, userWithHash.passwordHash);
      if (!isValid) {
        return errorResponse('Invalid email or password.', 401);
      }
    }

    await setSessionCookie({
      userId: userWithHash.id,
      email: userWithHash.email,
      name: userWithHash.name,
      role: userWithHash.role,
    });

    const user = {
      id: userWithHash.id,
      email: userWithHash.email,
      name: userWithHash.name,
      role: userWithHash.role,
      isVerified: userWithHash.isVerified,
      createdAt: userWithHash.createdAt,
      updatedAt: userWithHash.updatedAt,
    };

    return jsonResponse({
      user,
      message: 'Logged in successfully',
    });
  } catch (err: any) {
    return errorResponse(err.message || 'Login failed', 500);
  }
}
