import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { dbService } from '@/lib/db';
import { buildProfileMetadata, buildProfileJsonLd } from '@/lib/seo';
import { ThemeRenderer } from '@/components/themes/ThemeRenderer';
import { getSessionUser } from '@/lib/auth';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = dbService.getProfileBySlug(slug);

  if (!profile) {
    return {
      title: 'Profile Not Found | eSitesz',
      description: 'The requested profile does not exist.',
    };
  }

  return buildProfileMetadata(profile);
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const profile = dbService.getProfileBySlug(slug);

  if (!profile) {
    notFound();
  }

  // Increment view counter asynchronously (safe, non-blocking)
  try {
    dbService.recordView(profile.id);
  } catch {}

  const user = await getSessionUser();
  const isOwner = user && user.id === profile.userId;
  const isSuperAdmin = user && user.role === 'superadmin';

  // Moderation check: if rejected or pending, only owner or superadmin can view
  if (profile.status !== 'approved' && !isOwner && !isSuperAdmin) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#161b22] border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-white">Profile Under Review</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            This profile is currently undergoing standard platform review and will be publicly accessible once approved.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const jsonLdGraph = buildProfileJsonLd(profile);

  return (
    <>
      {/* Schema.org JSON-LD Structured Data Graph for AI engines & Google */}
      {jsonLdGraph.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Owner Admin Bar Banner (if logged in owner/admin) */}
      {(isOwner || isSuperAdmin) && (
        <aside
          aria-label="Owner Toolbar"
          className="bg-slate-900 border-b border-slate-800 px-4 py-2 text-xs flex items-center justify-between text-slate-300"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Viewing as {isSuperAdmin ? 'Super Admin' : 'Profile Owner'}</span>
            {profile.status !== 'approved' && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Status: {profile.status}
              </span>
            )}
          </div>
          <Link
            href="/dashboard"
            className="px-2.5 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-[11px] transition-colors"
          >
            Edit Profile in Dashboard
          </Link>
        </aside>
      )}

      {/* Dynamic Theme Renderer */}
      <ThemeRenderer profile={profile} />
    </>
  );
}
