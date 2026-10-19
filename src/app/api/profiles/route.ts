import { NextRequest } from 'next/server';
import { z } from 'zod';
import { dbService } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { jsonResponse, errorResponse } from '@/lib/api-response';

const createProfileSchema = z.object({
  slug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .max(50)
    .regex(/^[a-z0-9_-]+$/, 'Slug can only contain lowercase letters, numbers, hyphens, and underscores'),
  title: z.string().min(2, 'Title is required').max(100),
  subtitle: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  theme: z.enum([
    'esitesz-dark-luxury',
    'linktree-minimal',
    'executive-card',
    'creator-glow',
    'islamic-community',
  ]).default('esitesz-dark-luxury'),
  locationText: z.string().max(150).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return errorResponse('Authentication required', 401);
    }

    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';

    // Super admin can request all profiles; standard users get their own
    if (all && user.role === 'superadmin') {
      const profiles = dbService.listProfiles();
      return jsonResponse({ profiles });
    }

    const profiles = dbService.listProfiles({ userId: user.id });
    return jsonResponse({ profiles });
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to fetch profiles', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return errorResponse('Authentication required to create a profile', 401);
    }

    const body = await req.json();
    const parsed = createProfileSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message || 'Invalid profile data', 400);
    }

    const { slug, title, subtitle, description, theme, locationText } = parsed.data;

    // Check slug uniqueness
    const existing = dbService.getProfileBySlug(slug);
    if (existing) {
      return errorResponse('This username/slug is already taken. Please pick another one.', 409);
    }

    const newProfile = dbService.createProfile({
      slug,
      userId: user.id,
      title,
      subtitle: subtitle || '',
      description: description || '',
      theme,
      locationText: locationText || '',
      status: 'approved', // Auto-approved by default
      links: [
        {
          id: `link_${Date.now()}_1`,
          title: 'WhatsApp Channel / Chat',
          subtitle: 'Direct Message',
          url: 'https://wa.me/',
          icon: 'whatsapp',
          color: '#25D366',
          active: true,
          order: 1,
        },
        {
          id: `link_${Date.now()}_2`,
          title: 'Instagram',
          subtitle: 'Follow updates',
          url: 'https://instagram.com/',
          icon: 'instagram',
          color: '#E1306C',
          active: true,
          order: 2,
        },
        {
          id: `link_${Date.now()}_3`,
          title: 'Share Page',
          subtitle: 'Share with friends',
          url: '#share',
          icon: 'share',
          color: '#0ea5e9',
          active: true,
          order: 3,
        },
      ],
      contact: {
        showCall: true,
        showWhatsapp: true,
        showEmail: true,
        showLocation: true,
      },
      seo: {
        metaTitle: `${title} | Official Bio Link Page`,
        metaDescription: description || `Official bio link page for ${title}.`,
        entityType: 'Person',
        keywords: [title, 'Bio Link', 'Esitesz'],
        faqItems: [],
        showFaqOnPage: true,
        addressCountry: 'IN',
      },
    });

    return jsonResponse({
      profile: newProfile,
      message: 'Profile created successfully!',
    }, 201);
  } catch (err: any) {
    return errorResponse(err.message || 'Failed to create profile', 500);
  }
}
