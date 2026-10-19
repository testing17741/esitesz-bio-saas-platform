import { NextRequest } from 'next/server';
import { z } from 'zod';
import { verifyOtpCode } from '@/lib/otp';
import { dbService } from '@/lib/db';
import { setSessionCookie } from '@/lib/auth';
import { jsonResponse, errorResponse } from '@/lib/api-response';

const verifyOtpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  code: z.string().min(6).max(6),
  purpose: z.enum(['register', 'login', 'claim', 'sensitive_edit']),
  profileId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = verifyOtpSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message || 'Invalid parameters', 400);
    }

    const { email, code, purpose, profileId } = parsed.data;
    const isValid = verifyOtpCode(email, code, purpose);

    if (!isValid) {
      return errorResponse('Invalid or expired verification code.', 400);
    }

    // If purpose is 'claim' and profileId is provided, assign the profile to the user
    if (purpose === 'claim' && profileId) {
      let user = dbService.getUserByEmail(email);
      if (!user) {
        // Auto-create user account if not registered yet
        user = dbService.createUser({
          email,
          name: email.split('@')[0],
          passwordHash: 'otp_verified_placeholder',
          role: 'user',
          isVerified: true,
        }) as any;
      }

      dbService.updateProfile(profileId, {
        userId: user!.id,
      });

      await setSessionCookie({
        userId: user!.id,
        email: user!.email,
        name: user!.name,
        role: user!.role,
      });

      return jsonResponse({
        verified: true,
        claimed: true,
        profileId,
        message: 'Profile claimed successfully! You now have full management access.',
      });
    }

    return jsonResponse({
      verified: true,
      message: 'Verification code confirmed successfully.',
    });
  } catch (err: any) {
    return errorResponse(err.message || 'Verification failed', 500);
  }
}
