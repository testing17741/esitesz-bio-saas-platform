'use client';

import React, { useState } from 'react';
import { Profile, ProfileSeo, FaqItem, EntityType } from '@/types';
import {
  Search,
  Bot,
  MapPin,
  Plus,
  Trash2,
  HelpCircle,
  Sparkles,
  ExternalLink,
  Info,
} from 'lucide-react';

interface SeoStudioTabProps {
  profile: Profile;
  onChange: (updated: Partial<Profile>) => void;
}

export function SeoStudioTab({ profile, onChange }: SeoStudioTabProps) {
  const [subTab, setSubTab] = useState<'seo' | 'aeo' | 'geo'>('seo');

  const seo: ProfileSeo = profile.seo || {
    metaTitle: '',
    metaDescription: '',
    canonicalUrl: '',
    ogImage: '',
    keywords: [],
    author: '',
    entityType: 'Person',
    aeoSummary: '',
    faqItems: [],
    showFaqOnPage: true,
    geoRegion: 'IN-MH',
    geoPlacename: '',
    addressCountry: 'IN',
  };

  const updateSeo = (updates: Partial<ProfileSeo>) => {
    onChange({
      seo: {
        ...seo,
        ...updates,
      },
    });
  };

  const handleAddFaq = () => {
    const newFaq: FaqItem = {
      id: `faq_${Date.now()}`,
      question: 'Frequently Asked Question?',
      answer: 'Detailed, authoritative answer for users and AI search engines.',
    };
    updateSeo({
      faqItems: [...(seo.faqItems || []), newFaq],
    });
  };

  const handleUpdateFaq = (id: string, updates: Partial<FaqItem>) => {
    const updated = (seo.faqItems || []).map((f) => (f.id === id ? { ...f, ...updates } : f));
    updateSeo({ faqItems: updated });
  };

  const handleDeleteFaq = (id: string) => {
    const updated = (seo.faqItems || []).filter((f) => f.id !== id);
    updateSeo({ faqItems: updated });
  };

  const handleKeywordsChange = (val: string) => {
    const keywords = val
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);
    updateSeo({ keywords });
  };

  const currentTitle = seo.metaTitle || `${profile.title} | Official Bio Link Page`;
  const currentDesc =
    seo.metaDescription ||
    profile.description ||
    `Official Bio Link page of ${profile.title}. Access official channels, contact details, and updates.`;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <h3 className="text-base font-semibold text-white">SEO, AEO & GEO Studio</h3>
        </div>
        <p className="text-xs text-slate-400">
          Rank higher on Google Search, Gemini, ChatGPT, Claude, and local India maps. Everything you customize here is automatically rendered into SSR meta tags and Schema.org JSON-LD without code.
        </p>
      </div>

      {/* Sub-tab Pills */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
        <button
          type="button"
          onClick={() => setSubTab('seo')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
            subTab === 'seo'
              ? 'bg-sky-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>SEO (Google / Search)</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('aeo')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
            subTab === 'aeo'
              ? 'bg-purple-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>AEO (AI Engines)</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('geo')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
            subTab === 'geo'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>GEO (Local & India)</span>
        </button>
      </div>

      {/* ===================== SUBTAB 1: SEO ===================== */}
      {subTab === 'seo' && (
        <div className="space-y-4">
          {/* Live Google Search Preview */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Google Search Result Snippet Preview
            </span>
            <div className="text-xs text-slate-400 truncate">
              https://esitesz.com/{profile.slug}
            </div>
            <div className="text-sm font-semibold text-sky-400 hover:underline cursor-pointer truncate">
              {currentTitle}
            </div>
            <div className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {currentDesc}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-300">Meta Title (Title Tag)</label>
              <span className="text-[11px] text-slate-500 font-mono">
                {currentTitle.length} chars
              </span>
            </div>
            <input
              type="text"
              value={seo.metaTitle || ''}
              onChange={(e) => updateSeo({ metaTitle: e.target.value })}
              placeholder={`${profile.title} | Official Bio Link Page`}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-300">Meta Description</label>
              <span className="text-[11px] text-slate-500 font-mono">
                {currentDesc.length} chars (aim for 140-160)
              </span>
            </div>
            <textarea
              rows={3}
              value={seo.metaDescription || ''}
              onChange={(e) => updateSeo({ metaDescription: e.target.value })}
              placeholder={`Official Bio Link page of ${profile.title}. Access official channels, contact details, and updates.`}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Focus Search Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={(seo.keywords || []).join(', ')}
              onChange={(e) => handleKeywordsChange(e.target.value)}
              placeholder="e.g. Hasnain Baqai, Safipur Sharif, Official Bio, Esitesz"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Social Share OpenGraph Image URL
            </label>
            <input
              type="url"
              value={seo.ogImage || ''}
              onChange={(e) => updateSeo({ ogImage: e.target.value })}
              placeholder={profile.avatarUrl || 'https://example.com/banner.jpg'}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Used when sharing your bio page on WhatsApp, Twitter, LinkedIn, and Facebook.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white">Hide from Search Engines (NoIndex)</p>
              <p className="text-[11px] text-slate-400">Keep profile private/unlisted</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(seo.noIndex)}
                onChange={(e) => updateSeo({ noIndex: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-500"></div>
            </label>
          </div>
        </div>
      )}

      {/* ===================== SUBTAB 2: AEO (Answer Engine Optimization) ===================== */}
      {subTab === 'aeo' && (
        <div className="space-y-5">
          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-purple-200 text-xs leading-relaxed flex items-start gap-2.5">
            <Bot className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white mb-0.5">Answer Engine Optimization (AEO)</p>
              <p>
                When users ask AI models (ChatGPT, Google Gemini, Perplexity, Claude) about you, these structured entities and FAQ schemas tell the AI exactly how to cite and summarize your credentials accurately.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Primary Schema Entity Type
            </label>
            <select
              value={seo.entityType || 'Person'}
              onChange={(e) => updateSeo({ entityType: e.target.value as EntityType })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
            >
              <option value="Person">Person (Public Figure / Creator / Influencer / Professional)</option>
              <option value="Organization">Organization (Company / Institution / Brand)</option>
              <option value="LocalBusiness">Local Business (Shop / Clinic / Office / Agency)</option>
              <option value="ReligiousOrganization">Religious / Spiritual Community Organization</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              AI Summary & Facts (For AI Knowledge Graphs)
            </label>
            <textarea
              rows={3}
              value={seo.aeoSummary || ''}
              onChange={(e) => updateSeo({ aeoSummary: e.target.value })}
              placeholder="e.g. Syed Shah Hasnain Baqai is an official spiritual leader based in Safipur Sharif, Uttar Pradesh. He conducts religious lectures and community guidance..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 leading-relaxed"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Direct, factual sentences that AI bots can quote word-for-word.
            </p>
          </div>

          {/* Dynamic FAQ Builder */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  FAQ Schema & Q&A Pairs ({seo.faqItems?.length || 0})
                </h4>
                <p className="text-[11px] text-slate-400">
                  Generates schema.org/FAQPage JSON-LD for AI search engines.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddFaq}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Show FAQ Accordion on Public Profile</p>
                <p className="text-[11px] text-slate-400">Display questions on your public link page</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(seo.showFaqOnPage)}
                  onChange={(e) => updateSeo({ showFaqOnPage: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>

            {(!seo.faqItems || seo.faqItems.length === 0) ? (
              <div className="p-6 text-center rounded-xl bg-slate-900/60 border border-slate-800 text-slate-500 text-xs">
                No FAQs added yet. Click &ldquo;Add Question&rdquo; to add answers for AI engines.
              </div>
            ) : (
              <div className="space-y-3">
                {seo.faqItems.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-purple-400">
                        Q{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleUpdateFaq(faq.id, { question: e.target.value })}
                      placeholder="Question"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => handleUpdateFaq(faq.id, { answer: e.target.value })}
                      placeholder="Authoritative Answer"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================== SUBTAB 3: GEO (Local & Regional SEO) ===================== */}
      {subTab === 'geo' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 text-xs leading-relaxed flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white mb-0.5">India & Global GEO Search Optimization</p>
              <p>
                Generates <code className="text-emerald-300">geo.region</code>, <code className="text-emerald-300">geo.placename</code>, <code className="text-emerald-300">geo.position</code>, and <code className="text-emerald-300">PostalAddress</code> schemas so Google and AI search index your local presence correctly.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Geo Region Code (e.g. IN-MH, IN-UP)
              </label>
              <input
                type="text"
                value={seo.geoRegion || ''}
                onChange={(e) => updateSeo({ geoRegion: e.target.value })}
                placeholder="e.g. IN-MH (Maharashtra) or IN-UP (Uttar Pradesh)"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Geo Placename
              </label>
              <input
                type="text"
                value={seo.geoPlacename || ''}
                onChange={(e) => updateSeo({ geoPlacename: e.target.value })}
                placeholder="e.g. Antophill, Wadala, Mumbai or Safipur Sharif"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={seo.streetAddress || ''}
                onChange={(e) => updateSeo({ streetAddress: e.target.value })}
                placeholder="e.g. Akbar Suleman Compound (Bada Maidan), Antophill"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                City / Locality
              </label>
              <input
                type="text"
                value={seo.addressLocality || ''}
                onChange={(e) => updateSeo({ addressLocality: e.target.value })}
                placeholder="e.g. Wadala, Mumbai or Safipur"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Postal Code (PIN Code)
              </label>
              <input
                type="text"
                value={seo.postalCode || ''}
                onChange={(e) => updateSeo({ postalCode: e.target.value })}
                placeholder="e.g. 400037 or 209871"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Latitude (optional)
              </label>
              <input
                type="text"
                value={seo.geoLatitude || ''}
                onChange={(e) => updateSeo({ geoLatitude: e.target.value })}
                placeholder="e.g. 19.0222"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Longitude (optional)
              </label>
              <input
                type="text"
                value={seo.geoLongitude || ''}
                onChange={(e) => updateSeo({ geoLongitude: e.target.value })}
                placeholder="e.g. 72.8665"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
