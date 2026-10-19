import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { dbService } from '@/lib/db';
import { getBaseAppUrl } from '@/lib/seo';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const profile = dbService.getProfileBySlug(slug);

  if (!profile) {
    return new NextResponse('Profile not found', { status: 404 });
  }

  const baseUrl = getBaseAppUrl();
  const profileUrl = `${baseUrl}/${profile.slug}`;

  try {
    const pngBuffer = await QRCode.toBuffer(profileUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#0f1724',
        light: '#ffffff',
      },
    });

    return new NextResponse(new Uint8Array(pngBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return new NextResponse('QR code generation failed', { status: 500 });
  }
}
