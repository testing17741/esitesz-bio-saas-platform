import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  QrCode,
  Search,
  MapPin,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  ArrowRight,
  Database,
  Globe2,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Capabilities | eSitesz Connect & Esitesz Technologies',
  description:
    'Explore the capabilities of eSitesz Connect: Dark Luxury Bio Pages, AEO/GEO Schema Generation, vCard Sync, and Bespoke Software Development by Esitesz.',
};

export default function ServicesPage() {
  const platformServices = [
    {
      icon: Layers,
      title: 'Dark Luxury & Signature Identity Themes',
      description:
        'Pixel-faithful, high-end themes with glowing brand squircle icons, custom typography, subtle gradients, and zero bloated template styling.',
      tag: 'Core Platform',
    },
    {
      icon: Search,
      title: 'AEO (AI Answer Engine Optimization)',
      description:
        'Zero-code FAQPage JSON-LD schema generation so search engines and AI assistants (ChatGPT, Claude, Perplexity, Gemini) can accurately parse and cite your profile.',
      tag: 'AI-Ready',
    },
    {
      icon: MapPin,
      title: 'GEO Local Ranking & Schema.org Tags',
      description:
        'Built-in hyper-local geo-targeting with geo.region, geo.placename, geo.position coordinates, and Indian PostalAddress schemas for local discovery.',
      tag: 'Local SEO',
    },
    {
      icon: Smartphone,
      title: 'vCard 3.0 & Offline Contact Sync',
      description:
        'Instant RFC 6350 compliant .vcf export allowing visitors to save your direct phone, email, WhatsApp, and organization to their phone contacts in 1 tap.',
      tag: 'Contact Sync',
    },
    {
      icon: QrCode,
      title: 'Dynamic High-Resolution QR Codes',
      description:
        'Auto-generated crisp vector SVG and PNG QR codes ready for printing on flyers, banners, physical business cards, or event stands.',
      tag: 'Offline-to-Online',
    },
    {
      icon: ShieldCheck,
      title: 'Email OTP Security & Profile Claiming',
      description:
        'Password-less 6-digit email OTP login and profile claim flow so legitimate profile owners can manage their pages securely without password hassle.',
      tag: 'Enterprise Security',
    },
  ];

  const agencyServices = [
    {
      icon: Code2,
      title: 'Bespoke Web & SaaS Application Engineering',
      description:
        'Full-stack Next.js, React, Node.js, and cloud application engineering tailored to your business model with high-volume concurrency.',
    },
    {
      icon: Database,
      title: 'Custom API, Database & Backend Architecture',
      description:
        'Robust SQL, PostgreSQL, MongoDB, and Redis architectures designed for zero downtime, strict data retention, and high query efficiency.',
    },
    {
      icon: Globe2,
      title: 'Custom Domain Setup & White-Label Portals',
      description:
        'Deploy eSitesz Connect or your custom software under your own branded domain (e.g. bio.yourbrand.com) with SSL and edge CDN routing.',
    },
    {
      icon: Cpu,
      title: 'Enterprise Digital Transformation & Consulting',
      description:
        'Consulting on cloud migrations, payment processing (Razorpay, Stripe), DPDP Act 2023 compliance, and dedicated IT infrastructure.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-100 font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-[#0f1724]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center font-black text-slate-950 text-lg shadow-md shadow-sky-500/20">
              E
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white">eSitesz</span>
              <span className="text-xs text-sky-400 font-semibold ml-1 px-1.5 py-0.5 rounded-md bg-sky-500/10 border border-sky-500/20">
                Connect
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
            <Link href="/services" className="text-sky-400 font-semibold">
              Services
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <a
              href="https://www.esitesz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-sky-300 transition-colors"
            >
              <span>Esitesz Agency</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/login"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md transition-all hover:scale-[1.02]"
            >
              Create Bio Page
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Spectrum Digital Services</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Powerful Digital Identity &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                Custom Web Engineering
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Explore the automated capabilities of eSitesz Connect, plus bespoke digital engineering services provided by our parent agency{' '}
              <a
                href="https://www.esitesz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:underline font-semibold"
              >
                Esitesz Technologies
              </a>
              .
            </p>
          </div>
        </section>

        {/* Section 1: eSitesz Connect Platform Services */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
                Product Features
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                eSitesz Connect Platform Capabilities
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                Every profile built on eSitesz Connect includes these enterprise-ready features with zero extra setup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformServices.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between group shadow-lg"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {svc.tag}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                        {svc.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {svc.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 2: Parent Agency Services at esitesz.com */}
        <section className="py-16 bg-[#0f1724]/70 border-y border-slate-800/80 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                  Esitesz Agency • Custom Development
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Need Bespoke Software or Full Web Development?
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                  For projects requiring custom databases, dedicated portals, CRM integrations, or custom domains, the Esitesz team delivers turnkey solutions.
                </p>
              </div>

              <a
                href="https://www.esitesz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shrink-0"
              >
                <span>Explore Agency at Esitesz.com</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agencyServices.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-[#161b22] border border-slate-800/90 hover:border-emerald-500/40 transition-all flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-white">{svc.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {svc.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Ready to Claim or Build Your Official Profile?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Launch your profile with the exact dark-luxury aesthetic of our featured clients, or contact our team for enterprise onboarding.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm shadow-xl shadow-sky-500/20 transition-all hover:scale-[1.02]"
              >
                <span>Create Bio Page Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-sm transition-colors"
              >
                <span>Contact Inquiries</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-800 bg-[#0f1724] py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p>© {new Date().getFullYear()} eSitesz Connect. All Rights Reserved.</p>
            <p className="mt-0.5">
              Developed & Maintained by{' '}
              <a
                href="https://www.esitesz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:underline font-semibold"
              >
                Esitesz Technologies
              </a>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <a
              href="https://www.esitesz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline inline-flex items-center gap-0.5 font-semibold"
            >
              <span>Esitesz.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
