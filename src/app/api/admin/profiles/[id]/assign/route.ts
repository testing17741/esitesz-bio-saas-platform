import { NextRequest } from 'next/server';
import { z } from 'zod';
import { dbService } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { jsonResponse, errorResponse } from '@/lib/api-response';

const assignSchema = z.object({
  targetEmail: z.string().email('Please enter a valid user email'),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'superadmin') {
      return errorResponse('Forbidden: Superadmin access required', 403);
    }

    const { id } = await params;
    const profile = dbService.getProfileById(id);
    if (!profile) {
      return errorResponse('Profile not found', 404);
    }

    const body = await req.json();
    const parsed = assignSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message || 'Invalid target email', 400);
    }

    const { targetEmail } = parsed.data;
    let targetUser = dbService.getUserByEmail(targetEmail);

    if (!targetUser) {
      // Auto-create user for the target email
      targetUser = dbService.createUser({
        email: targetEmail,
        name: targetEmail.split('@')[0],
        passwordHash: 'assigned_pending_activation',
        role: 'user',
        isVerified: true,
      }) as any;
    }

    const updated = dbService.updateProfile(id, {
      userId: targetUser!.id,
    });

    return jsonResponse({
      profile: updated,
      message: `Profile successfully assigned to ${targetEmail}`,
    });
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to assign profile', 500);
  }
}
