import { NextRequest } from 'next/server';
import { z } from 'zod';
import { sendOtpEmail } from '@/lib/otp';
import { jsonResponse, errorResponse } from '@/lib/api-response';

const sendOtpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  purpose: z.enum(['register', 'login', 'claim', 'sensitive_edit']),
  profileId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = sendOtpSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message || 'Invalid parameters', 400);
    }

    const { email, purpose, profileId } = parsed.data;
    const result = await sendOtpEmail({ email, purpose, profileId });

    return jsonResponse(result);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to dispatch verification code', 500);
  }
}
