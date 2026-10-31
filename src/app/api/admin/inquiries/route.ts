import { NextRequest } from 'next/server';
import { dbService } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { jsonResponse, errorResponse } from '@/lib/api-response';
import { z } from 'zod';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'superadmin') {
      return errorResponse('Unauthorized: Super Admin access required', 403);
    }

    const inquiries = dbService.listContactInquiries();
    return jsonResponse(inquiries);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to retrieve inquiries', 500);
  }
}

const updateStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(['new', 'contacted', 'resolved']),
});

export async function PATCH(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'superadmin') {
      return errorResponse('Unauthorized: Super Admin access required', 403);
    }

    const body = await req.json();
    const parsed = updateStatusSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message || 'Invalid parameters', 400);
    }

    const { id, status } = parsed.data;
    const ok = dbService.updateContactInquiryStatus(id, status);
    if (!ok) {
      return errorResponse('Inquiry not found or could not be updated', 404);
    }

    return jsonResponse({ success: true, message: 'Status updated successfully' });
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to update inquiry status', 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user || user.role !== 'superadmin') {
      return errorResponse('Unauthorized: Super Admin access required', 403);
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return errorResponse('Inquiry ID is required', 400);
    }

    const ok = dbService.deleteContactInquiry(id);
    if (!ok) {
      return errorResponse('Inquiry not found', 404);
    }

    return jsonResponse({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to delete inquiry', 500);
  }
}
