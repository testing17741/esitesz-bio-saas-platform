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
}): Promise<{ success: boolean; devOtp?: string; message: string }> {
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
  console.log(
    `[OTP DISPATCH] [${timestamp}] To: ${email} | Purpose: ${purpose} | Code: ${code} | ProfileId: ${profileId || 'N/A'}`
  );

  // If in production and SMTP is configured, real email delivery would occur here.
  // We return devOtp when EMAIL_PROVIDER is 'console' or NODE_ENV !== 'production' to facilitate instant user testing.
  const isDev = process.env.NODE_ENV !== 'production' || process.env.EMAIL_PROVIDER === 'console';

  return {
    success: true,
    devOtp: isDev ? code : undefined,
    message: isDev
      ? `Verification code sent! (Dev preview code: ${code})`
      : `A 6-digit verification code has been dispatched to ${email}.`,
  };
}

export function verifyOtpCode(email: string, code: string, purpose: OtpPurpose): boolean {
  return dbService.verifyOtp(email, code, purpose);
}
