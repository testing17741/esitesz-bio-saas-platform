import { NextRequest } from 'next/server';
import { dbService } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { jsonResponse, errorResponse } from '@/lib/api-response';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const profile = dbService.getProfileById(id);
    if (!profile) {
      return errorResponse('Profile not found', 404);
    }
    return jsonResponse({ profile });
  } catch (err: any) {
    return errorResponse(err.message || 'Error fetching profile', 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return errorResponse('Authentication required', 401);
    }

    const { id } = await params;
    const existing = dbService.getProfileById(id);
    if (!existing) {
      return errorResponse('Profile not found', 404);
    }

    // Permission check: owner or superadmin
    const isOwner = existing.userId === user.id;
    const isSuperAdmin = user.role === 'superadmin';
    if (!isOwner && !isSuperAdmin) {
      return errorResponse('Forbidden: You do not have permission to modify this profile', 403);
    }

    const body = await req.json();

    // Check slug collision if slug is being changed
    if (body.slug && body.slug.toLowerCase().trim() !== existing.slug) {
      const slugCheck = dbService.getProfileBySlug(body.slug.toLowerCase().trim());
      if (slugCheck && slugCheck.id !== existing.id) {
        return errorResponse('This username/slug is already taken by another profile', 409);
      }
    }

    // Non-superadmins cannot tamper with footer branding or approval status directly
    const updates: Record<string, any> = { ...body };
    if (!isSuperAdmin) {
      delete updates.status;
      delete updates.rejectionReason;
      delete updates.footerText;
      delete updates.footerBrand;
      delete updates.footerUrl;
      delete updates.userId;
    }

    const updated = dbService.updateProfile(id, updates);
    return jsonResponse({
      profile: updated,
      message: 'Profile updated successfully',
    });
  } catch (err: any) {
    return errorResponse(err.message || 'Error updating profile', 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return errorResponse('Authentication required', 401);
    }

    const { id } = await params;
    const existing = dbService.getProfileById(id);
    if (!existing) {
      return errorResponse('Profile not found', 404);
    }

    const isOwner = existing.userId === user.id;
    const isSuperAdmin = user.role === 'superadmin';
    if (!isOwner && !isSuperAdmin) {
      return errorResponse('Forbidden: You do not have permission to delete this profile', 403);
    }

    dbService.deleteProfile(id);
    return jsonResponse({
      message: 'Profile deleted successfully',
    });
  } catch (err: any) {
    return errorResponse(err.message || 'Error deleting profile', 500);
  }
}
