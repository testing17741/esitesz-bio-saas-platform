'use client';

import React from 'react';
import { Profile, ProfileContact } from '@/types';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';

interface ContactTabProps {
  profile: Profile;
  onChange: (updated: Partial<Profile>) => void;
}

export function ContactTab({ profile, onChange }: ContactTabProps) {
  const contact = profile.contact || {
    showCall: true,
    showWhatsapp: true,
    showEmail: true,
    showLocation: true,
  };

  const updateContact = (updates: Partial<ProfileContact>) => {
    onChange({
      contact: {
        ...contact,
        ...updates,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-white mb-1">Direct Contact Buttons</h3>
        <p className="text-xs text-slate-400">
          Configure direct tap-to-call, WhatsApp chat, and email action buttons displayed on your profile.
        </p>
      </div>

      <div className="space-y-4">
        {/* Call Section */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Phone Call Button</p>
                <p className="text-[11px] text-slate-400">Direct dialing for mobile visitors</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={contact.showCall}
                onChange={(e) => updateContact({ showCall: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-500"></div>
            </label>
          </div>
          {contact.showCall && (
            <input
              type="tel"
              value={contact.callPhone || ''}
              onChange={(e) => updateContact({ callPhone: e.target.value })}
              placeholder="e.g. +91 9152667967"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
            />
          )}
        </div>

        {/* WhatsApp Section */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">WhatsApp Button</p>
                <p className="text-[11px] text-slate-400">Direct 1-tap chat initiation</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={contact.showWhatsapp}
                onChange={(e) => updateContact({ showWhatsapp: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>
          {contact.showWhatsapp && (
            <input
              type="text"
              value={contact.whatsappNumber || ''}
              onChange={(e) => updateContact({ whatsappNumber: e.target.value })}
              placeholder="e.g. +91 9152667967 (Include country code)"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          )}
        </div>

        {/* Email Section */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Email Button</p>
                <p className="text-[11px] text-slate-400">Instant webmail composer & copy</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={contact.showEmail}
                onChange={(e) => updateContact({ showEmail: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-500"></div>
            </label>
          </div>
          {contact.showEmail && (
            <input
              type="email"
              value={contact.emailAddress || ''}
              onChange={(e) => updateContact({ emailAddress: e.target.value })}
              placeholder="e.g. contact@esitesz.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
            />
          )}
        </div>

        {/* Location Visibility */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Show Location Banner</p>
              <p className="text-[11px] text-slate-400">Display address badge on your profile</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={contact.showLocation}
              onChange={(e) => updateContact({ showLocation: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-500"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
