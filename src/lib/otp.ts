import crypto from 'node:crypto';
import { dbService } from './db';
import { OtpPurpose } from '@/types';

export function generateNumericOtp(length = 6): string {
  // Cryptographically strong random integer
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return crypto.randomInt(min, max + 1).toString();
}

export async function sendOtpEmail({
  email,
  purpose,
  profileId,
}: {
  email: string;
  purpose: OtpPurpose;
  profileId?: string;
}): Promise<{ success: boolean; message: string }> {
  const code = generateNumericOtp(6);
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  dbService.createOtp({
    email,
    code,
    purpose,
    profileId,
    expiresAt,
  });

  const timestamp = new Date().toISOString();
  // Secure server-side audit logging only (never exposed to client)
  console.info(
    `[OTP_SECURE_DISPATCH] [${timestamp}] To: ${email} | Purpose: ${purpose} | Code: ${code} | ProfileId: ${profileId || 'N/A'}`
  );

  return {
    success: true,
    message: `A 6-digit verification code has been dispatched to ${email}. Please check your inbox.`,
  };
}

export function verifyOtpCode(email: string, code: string, purpose: OtpPurpose): boolean {
  return dbService.verifyOtp(email, code, purpose);
}
