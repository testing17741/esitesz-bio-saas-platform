import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Globe2,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Users,
  Code2,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | eSitesz Connect by Esitesz Technologies',
  description:
    'Discover eSitesz Connect — an enterprise-grade digital identity and bio link platform engineered by Esitesz Technologies. Learn about our mission, technology, and AEO optimization.',
};

export default function AboutPage() {
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
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-sky-400 font-semibold">
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
        <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engineering the Future of Digital Identity</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              A Bio Link Platform Built For{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                High-Impact Presence
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              eSitesz Connect is developed by{' '}
              <a
                href="https://www.esitesz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:underline font-semibold"
              >
                Esitesz Technologies
              </a>
              . We replace disposable generic link trees with production-grade, pixel-perfect identity portals engineered for search engines, AI answer engines, and real-world conversions.
            </p>
          </div>
        </section>

        {/* Our Story & Origin */}
        <section className="py-12 bg-[#0f1724]/60 border-y border-slate-800/80 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Our Genesis
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Why Generic Link Trees Are No Longer Enough
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Most bio-link tools treat your brand like an afterthought — forcing identical centered button stacks, generic purple palettes, zero local SEO schema, and zero Answer Engine Optimization (AEO) for modern AI search engines like ChatGPT, Claude, and Perplexity.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We engineered eSitesz Connect to provide leaders, public figures, community organizations, and creators with the same bespoke, dark-luxury aesthetic originally crafted for verified figures like Syed Shah Hasnain Baqai and Jamat Raza-E-Mustafa Antophill — complete with self-serve CRUD, email OTP verification, and instant schema deployment.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-sky-400" />
                <span>The Esitesz Standard</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero AI Slop:</strong> Handcrafted typography, purposeful CSS variables, and bespoke contrast ratios.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>AEO + GEO First:</strong> Native Schema.org Person & LocalBusiness JSON-LD so AI tools cite you accurately.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>DPDP Act 2023 Compliant:</strong> Built ground-up according to Indian data fiduciary regulations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Sub-Second Edge Delivery:</strong> Instant load times worldwide via serverless Next.js edge caching.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* About Esitesz Parent Agency */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-[#161b22] to-[#0f1724] border border-sky-500/20 shadow-2xl relative overflow-hidden">
              <div className="space-y-4 max-w-2xl">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-widest font-mono">
                  Parent Company • Esitesz Technologies
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Looking For Custom Software Or Enterprise Web Development?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  eSitesz Connect is an independent product in the Esitesz ecosystem. For bespoke custom websites, full-stack software development, mobile apps, e-commerce, and enterprise IT infrastructure, visit our primary portal at{' '}
                  <a
                    href="https://www.esitesz.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 underline font-semibold"
                  >
                    esitesz.com
                  </a>
                  .
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="https://www.esitesz.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition-all"
                  >
                    <span>Visit Esitesz.com</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-colors"
                  >
                    <span>Inquire About Custom Projects</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Reference Showcases */}
        <section className="py-12 bg-[#0f1724]/40 border-t border-slate-800/80 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Production Case Studies
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Live Platforms Powered by eSitesz
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      Spiritual Leader & Scholar
                    </span>
                    <span className="text-xs text-slate-400">Safipur Sharif, U.P</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Syed Shah Hasnain Baqai Official
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Official digital identity portal featuring verified WhatsApp channel, social media updates, and direct contact options.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <Link
                    href="/hasnainbaqai"
                    className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:underline font-semibold"
                  >
                    <span>View Live Profile Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href="https://hasnainbaqai.esitesz.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-slate-200 inline-flex items-center gap-1"
                  >
                    <span>Original Domain</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Islamic Organisation
                    </span>
                    <span className="text-xs text-slate-400">Wadala, Mumbai</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Jamat Raza - E - Mustafa Antophill
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Historic Sunni Islamic organization portal complete with hyper-local Mumbai geo-coordinates, event broadcast links, and contact channels.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <Link
                    href="/jrmantophill"
                    className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:underline font-semibold"
                  >
                    <span>View Live Profile Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href="https://jrmantophill.esitesz.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-slate-200 inline-flex items-center gap-1"
                  >
                    <span>Original Domain</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
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
