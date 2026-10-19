import { NextRequest } from 'next/server';
import { z } from 'zod';
import { dbService } from '@/lib/db';
import { jsonResponse, errorResponse } from '@/lib/api-response';

const clickSchema = z.object({
  profileId: z.string(),
  linkId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = clickSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Invalid parameters', 400);
    }

    const { profileId, linkId } = parsed.data;
    dbService.recordClick(profileId, linkId);

    return jsonResponse({ tracked: true });
  } catch (err: any) {
    return errorResponse(err.message || 'Tracking error', 500);
  }
}
