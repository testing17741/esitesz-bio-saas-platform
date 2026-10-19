import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | DPDP Act 2023 & GDPR Compliance | eSitesz',
  description: 'Our commitment to data protection, user consent, and personal data rights under the Indian DPDP Act 2023 and GDPR.',
};

export default function PrivacyPolicyPage() {
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DPDP Act 2023 & GDPR Compliant</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Effective Date: October 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Overview & Data Fiduciary</h2>
            <p>
              eSitesz (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the digital bio link platform and acts as a Data Fiduciary under India&apos;s Digital Personal Data Protection (DPDP) Act, 2023 and Data Controller under the EU General Data Protection Regulation (GDPR).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Data We Collect (Data Minimization)</h2>
            <p>We adhere strictly to data minimization and collect only the information necessary to provide the service:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong>Account Data:</strong> Name, email address, securely salted/hashed passwords.</li>
              <li><strong>Profile Information:</strong> Public links, bios, display avatars, and contact information you explicitly choose to publish.</li>
              <li><strong>Verification Data:</strong> 6-digit email OTPs for secure authentication and ownership claiming (expired and deleted automatically).</li>
              <li><strong>Aggregated Analytics:</strong> Anonymized page view counts and link click metrics (no intrusive third-party cross-site trackers).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Your Rights Under DPDP Act 2023 & GDPR</h2>
            <p>You have full autonomy over your personal information:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong>Right to Access:</strong> View all data associated with your profile at any time in your dashboard.</li>
              <li><strong>Right to Correction & Erasure:</strong> Modify or permanently delete any profile and associated data through the dashboard.</li>
              <li><strong>Right to Grievance Redressal:</strong> Direct contact with our Data Protection Officer at privacy@esitesz.com.</li>
              <li><strong>Right to Nominate:</strong> Designate another person to exercise rights in event of death or incapacity.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Cookies & Storage</h2>
            <p>
              We only use essential HTTP-only cookies required for authentication session security. No third-party behavioral advertising cookies are placed without explicit consent.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">5. Contact Information</h2>
            <p>
              For privacy requests or data deletion demands, please contact our support desk:
              <br />
              Email: <a href="mailto:privacy@esitesz.com" className="text-sky-400 hover:underline">privacy@esitesz.com</a>
              <br />
              Operated by: Esitesz Technologies
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
