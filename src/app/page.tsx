import React from 'react';
import Link from 'next/link';
import { getSessionUser } from '@/lib/auth';
import { dbService } from '@/lib/db';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  Bot,
  MapPin,
  ExternalLink,
  Layers,
  Phone,
  QrCode,
  Layout,
  Check,
  Star,
} from 'lucide-react';
import { CookieConsent } from '@/components/CookieConsent';

export default async function HomePage() {
  const user = await getSessionUser();
  const allApproved = dbService.listProfiles({ status: 'approved' });
  // Limit showcase to up to 6 profiles (Hasnain Baqai, JRM Antophill, + any recent approved profiles)
  const showcaseProfiles = allApproved.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-slate-950">
      {/* Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-[#0f1724]/80 backdrop-blur-md sticky top-0 z-40">
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

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
            <Link href="/services" className="hover:text-white transition-colors">
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

          <nav className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                {user.role === 'superadmin' && (
                  <Link
                    href="/admin"
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 transition-colors"
                  >
                    Super Admin
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md transition-all hover:scale-[1.02]"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
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
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32 px-4 sm:px-6">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-sm text-xs font-semibold text-sky-300">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Production Bio Link & Digital Identity Platform</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Create High-Converting Bio Link Pages Like{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                Hasnain Baqai & JRM Antophill
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Anyone can instantly build and customize production-grade bio pages, portfolio links, and digital business cards. Powered by automated SEO, AEO (for AI Answer Engines), and local GEO targeting.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm shadow-xl shadow-sky-500/20 transition-all hover:scale-[1.02]"
              >
                <span>Start Building Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-sm transition-colors"
              >
                <span>Sign In to Account</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Live Reference Showcases */}
        <section className="py-12 bg-[#0f1724]/50 border-y border-slate-800/80 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Live Reference Implementations
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Pre-Seeded & Ready for Instant Customization
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                These official profiles run live on this platform with full CRUD, OTP security, and dynamic themes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {showcaseProfiles.map((p) => {
                const isHasnain = p.slug === 'hasnainbaqai';
                const isJrm = p.slug === 'jrmantophill';
                const categoryBadge = isHasnain
                  ? 'Spiritual & Public Figure'
                  : isJrm
                  ? 'Community & Religious Org'
                  : p.theme === 'esitesz-dark-luxury'
                  ? 'Dark Luxury'
                  : p.theme === 'linktree-minimal'
                  ? 'Minimalist'
                  : 'Digital Card';

                return (
                  <div
                    key={p.id}
                    className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 hover:border-sky-500/40 shadow-xl flex flex-col justify-between transition-all group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/20">
                          {categoryBadge}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">/{p.slug}</span>
                      </div>

                      <div className="flex items-start gap-3.5">
                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-sky-500/20 bg-slate-900 flex items-center justify-center">
                          {p.avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.avatarUrl}
                              alt={p.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-bold text-sky-400">
                              {p.title.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                            {p.title}
                          </h3>
                          {p.locationText && (
                            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                              <span className="truncate">{p.locationText}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {p.description ||
                          (isHasnain
                            ? 'Safipur Sharif U.P • Official WhatsApp Channel, Instagram, Facebook & YouTube.'
                            : isJrm
                            ? 'Antophill, Wadala, Mumbai • WhatsApp Updates, Social Channels & Official Address.'
                            : 'Official digital bio link page with direct WhatsApp, social channels, and vCard sync.')}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-sky-400" />
                          <span>Contact Grid</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <QrCode className="w-3 h-3 text-emerald-400" />
                          <span>vCard & QR</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>SEO Schema</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-800">
                      <Link
                        href={`/${p.slug}`}
                        target="_blank"
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 text-xs font-bold text-sky-400 hover:text-sky-300 inline-flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>View Live Profile</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {allApproved.length > showcaseProfiles.length && (
              <p className="text-center text-xs text-slate-400 pt-2">
                Showing top {showcaseProfiles.length} verified public profiles • Over {allApproved.length} live digital identities created
              </p>
            )}
          </div>
        </section>

        {/* Feature Grid: Zero-Code SEO, AEO, GEO & Themes */}
        <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Engineered For Speed, Ranking & Conversions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Everything the user inputs in the UI is transformed into production search meta and Schema.org graphs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-2">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Dynamic SEO Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated OpenGraph cards, Twitter preview cards, sitemap.xml registration, canonical tags, and real-time Google search snippet previews without touching code.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">AEO (AI Answer Optimization)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tailored for Google AI Overviews, ChatGPT Search, Gemini, and Perplexity. Injects structured FAQPage and Person/Organization JSON-LD so AI bots cite you accurately.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">GEO (Local India Ranking)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Region codes (<code className="text-emerald-400">IN-MH</code>, <code className="text-emerald-400">IN-UP</code>), city placenames, and geo-coordinates for hyper-local search discovery on Google Maps.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
                <Layout className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">5 Tailored Design Themes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Switch in 1 click between Esitesz Dark Luxury, Minimalist Linktree, Executive Business Card, Creator Neon Glow, and Islamic Community styles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Email OTP Security</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Profile claiming and sensitive edits require a 6-digit email OTP verification so no unauthorized party can alter someone else&apos;s digital bio card.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-2">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Super Admin Control</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Centralized dashboard with view counters, click analytics, profile approval/rejection workflows, and full CRUD governance across the entire platform.
              </p>
            </div>
          </div>
        </section>

        {/* Client Reviews & Testimonials Section */}
        <section className="py-20 px-4 sm:px-6 bg-[#0f1724]/40 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
                Verified Client Reviews
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Trusted by Leaders, Creators & Community Organizations
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                See why verified organizations and public figures choose eSitesz Connect over generic link trees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Review 1: Hasnain Baqai / Spiritual Office */}
              <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    &ldquo;The dark luxury layout matches our dignity and presence perfectly. Our community members across India can join our official WhatsApp channel in one tap without confusion. It looks like an exclusive bespoke app.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">Syed Shah Hasnain Baqai Safvi Office</h4>
                    <p className="text-[11px] text-slate-400">Safipur Sharif, Uttar Pradesh</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Verified Page
                  </span>
                </div>
              </div>

              {/* Review 2: Jamat Raza-E-Mustafa */}
              <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    &ldquo;The local SEO schema and Google Maps coordinates integration made a huge difference. When community members search for our Wadala Mumbai organization, our official page and contact channels rank right at the top.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">Jamat Raza-E-Mustafa (Antophill)</h4>
                    <p className="text-[11px] text-slate-400">Wadala, Mumbai</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Verified Org
                  </span>
                </div>
              </div>

              {/* Review 3: Digital Creator */}
              <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    &ldquo;Linktree charged heavy monthly fees for basic branding and analytics. eSitesz Connect gives me superior aesthetics, OTP security, offline vCard export, and lightning-fast speed with zero monthly subscriptions.&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">Arif M.</h4>
                    <p className="text-[11px] text-slate-400">Tech Lead & Digital Creator</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    Creator Pro
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Esitesz Parent Agency Banner */}
        <section className="py-12 px-4 sm:px-6 bg-[#0f1724]/70 border-t border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-[#161b22] border border-sky-500/20 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest font-mono">
                Bespoke Software & Custom Solutions
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Looking for Custom Web Development or Enterprise Software?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                eSitesz Connect is engineered by Esitesz Technologies. For full-scale custom websites, mobile applications, dedicated portals, and IT consulting, visit our primary company portal at esitesz.com.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="https://www.esitesz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg"
              >
                <span>Visit Esitesz.com</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-colors"
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
              Privacy Policy (DPDP Act)
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              Sign In
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

      {/* Privacy Consent Banner */}
      <CookieConsent />
    </div>
  );
}
