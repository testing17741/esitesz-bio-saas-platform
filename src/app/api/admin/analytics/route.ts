import { dbService } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { jsonResponse, errorResponse } from '@/lib/api-response';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'superadmin') {
      return errorResponse('Forbidden: Superadmin access required', 403);
    }

    const stats = dbService.getSystemAnalytics();
    return jsonResponse(stats);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to fetch analytics', 500);
  }
}
