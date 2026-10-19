import { Profile } from '@/types';

/**
 * Generates an RFC 6350 compliant vCard (VCF 3.0) string for mobile/desktop address books.
 */
export function generateVCard(profile: Profile): string {
  const lines: string[] = ['BEGIN:VCARD', 'VERSION:3.0'];

  lines.push(`FN:${profile.title}`);
  if (profile.subtitle) {
    lines.push(`TITLE:${profile.subtitle}`);
  }
  lines.push(`ORG:${profile.title}`);

  if (profile.contact?.callPhone) {
    lines.push(`TEL;TYPE=CELL,VOICE:${profile.contact.callPhone}`);
  }
  if (profile.contact?.whatsappNumber && profile.contact.whatsappNumber !== profile.contact.callPhone) {
    lines.push(`TEL;TYPE=WHATSAPP:${profile.contact.whatsappNumber}`);
  }
  if (profile.contact?.emailAddress) {
    lines.push(`EMAIL;TYPE=INTERNET,PREF:${profile.contact.emailAddress}`);
  }

  const website = profile.seo?.canonicalUrl || `https://esitesz.com/${profile.slug}`;
  lines.push(`URL:${website}`);

  if (profile.locationText) {
    lines.push(`ADR;TYPE=WORK:;;${profile.locationText};;;;`);
  }

  if (profile.description) {
    lines.push(`NOTE:${profile.description.replace(/\n/g, ' ')}`);
  }

  lines.push('END:VCARD');
  return lines.join('\r\n');
}
