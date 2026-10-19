import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/db';
import { generateVCard } from '@/lib/vcard';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const profile = dbService.getProfileBySlug(slug);

  if (!profile) {
    return new NextResponse('Profile not found', { status: 404 });
  }

  const vcardText = generateVCard(profile);
  const filename = `${profile.slug.replace(/[^a-z0-9_-]/gi, '_')}.vcf`;

  return new NextResponse(vcardText, {
    status: 200,
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
