import { NextRequest } from 'next/server';
import { z } from 'zod';
import { dbService } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { jsonResponse, errorResponse } from '@/lib/api-response';

const statusSchema = z.object({
  status: z.enum(['approved', 'pending', 'rejected']),
  rejectionReason: z.string().optional(),
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
    const existing = dbService.getProfileById(id);
    if (!existing) {
      return errorResponse('Profile not found', 404);
    }

    const body = await req.json();
    const parsed = statusSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message || 'Invalid parameters', 400);
    }

    const { status, rejectionReason } = parsed.data;

    const updated = dbService.updateProfile(id, {
      status,
      rejectionReason: status === 'rejected' ? rejectionReason || 'Content does not meet platform guidelines' : null,
    });

    return jsonResponse({
      profile: updated,
      message: `Profile status updated to ${status}`,
    });
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to update profile status', 500);
  }
}
