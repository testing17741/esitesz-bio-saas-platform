import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | eSitesz Connect',
  description: 'Terms of Service governing usage of eSitesz Connect digital identity and bio link platform.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-100 font-sans py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-2 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-white tracking-tight">Terms of Service</h1>
          <p className="text-xs text-slate-400">Effective Date: October 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using eSitesz Connect platform, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Permitted Use & Content Guidelines</h2>
            <p>
              You are responsible for all content, links, images, and text published through your bio page. You agree not to publish deceptive, malicious, defamatory, or illegal content.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Platform Moderation</h2>
            <p>
              eSitesz administrators reserve the right to review, audit, reject, or remove any profile that violates platform standards or applicable Indian and international laws.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Attribution & Branding</h2>
            <p>
              Free and standard profiles display the signature &ldquo;Designed & Developed by Esitesz&rdquo; footer badge.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">5. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
