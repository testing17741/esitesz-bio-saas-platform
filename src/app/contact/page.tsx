import React from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Globe,
  ExternalLink,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | eSitesz Connect Support & Inquiries',
  description:
    'Get in touch with the eSitesz Connect team for profile claims, custom luxury themes, enterprise inquiries, and bespoke development by Esitesz.',
};

export default function ContactPage() {
  const faqs = [
    {
      q: 'How do I claim my pre-existing bio page (like Hasnain Baqai or JRM Antophill)?',
      a: 'Go to your Dashboard after signing in. Enter the slug you want to claim under "Claim Existing Profile" and enter the 6-digit verification OTP sent to the registered email address.',
    },
    {
      q: 'How does AEO (Answer Engine Optimization) work?',
      a: 'eSitesz Connect generates Schema.org FAQPage and Entity JSON-LD structures with every profile. This enables AI search tools like ChatGPT, Claude, Gemini, and Perplexity to read, index, and cite your official answers accurately.',
    },
    {
      q: 'Can Esitesz design a custom domain or bespoke website for me?',
      a: 'Yes. For full web development, bespoke mobile apps, and dedicated domain deployments, visit our parent agency portal at esitesz.com or select "Custom Web / Software Dev" in the contact form above.',
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
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sky-400 font-semibold">
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
      <main className="flex-1 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest font-mono">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Contact eSitesz Connect & Esitesz Team
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Have questions about your bio link, profile claiming, custom dark luxury themes, or need custom software developed by{' '}
              <a
                href="https://www.esitesz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline font-semibold"
              >
                Esitesz.com
              </a>
              ? We are here to assist.
            </p>
          </div>

          {/* Grid: Direct Contact Info + Interactive Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Direct Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-6 shadow-xl">
                <h2 className="text-lg font-bold text-white">Direct Communication</h2>

                <div className="space-y-4 text-xs sm:text-sm">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/919152667967"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">WhatsApp Direct Chat</p>
                      <p className="text-slate-400 text-xs mt-0.5">+91 9152667967</p>
                      <span className="text-[11px] text-emerald-400 font-medium inline-block mt-1">
                        Fastest Response ➔
                      </span>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+919152667967"
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-sky-500/40 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Telephone Support</p>
                      <p className="text-slate-400 text-xs mt-0.5">+91 9152667967</p>
                      <span className="text-[11px] text-sky-400 font-medium inline-block mt-1">
                        Mon – Sat, 10 AM – 7 PM IST
                      </span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:contact@esitesz.com"
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Official Email</p>
                      <p className="text-slate-400 text-xs mt-0.5">contact@esitesz.com</p>
                      <span className="text-[11px] text-purple-400 font-medium inline-block mt-1">
                        Inquiries & Governance
                      </span>
                    </div>
                  </a>

                  {/* Parent Website */}
                  <a
                    href="https://www.esitesz.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-sky-500/40 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Parent Agency Portal</p>
                      <p className="text-slate-400 text-xs mt-0.5">www.esitesz.com</p>
                      <span className="text-[11px] text-sky-400 font-medium inline-block mt-1">
                        Full Web & Software Services ↗
                      </span>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Headquarters & Operations</p>
                      <p className="text-slate-400 text-xs mt-0.5">Mumbai, Maharashtra, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#161b22] border border-slate-800 shadow-xl space-y-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white">Send Us An Inquiry</h2>
                  <p className="text-xs text-slate-400">
                    Fill out the form below. We usually respond within a few hours.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <section className="pt-8 border-t border-slate-800">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2">
                  <HelpCircle className="w-5 h-5 text-sky-400" />
                  <span>Frequently Asked Questions</span>
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-2xl bg-[#161b22] border border-slate-800 space-y-2"
                  >
                    <h3 className="text-sm sm:text-base font-bold text-white">{faq.q}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
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
