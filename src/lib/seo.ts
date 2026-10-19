import type { Metadata } from 'next';
import { Profile } from '@/types';

export function getBaseAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

/**
 * Dynamically builds Next.js Metadata from the user's UI-configured SEO/AEO/GEO fields.
 * Zero hardcoding — everything is derived from profile data configured by the user.
 */
export function buildProfileMetadata(profile: Profile): Metadata {
  const baseUrl = getBaseAppUrl();
  const pageUrl = `${baseUrl}/${profile.slug}`;

  const title = profile.seo?.metaTitle || `${profile.title} | Official Bio Link Page`;
  const description =
    profile.seo?.metaDescription ||
    profile.description ||
    `Official Bio Link page of ${profile.title}. Access official channels, contact details, and updates.`;

  const ogImage = profile.seo?.ogImage || profile.avatarUrl || `${baseUrl}/og-default.png`;
  const canonicalUrl = profile.seo?.canonicalUrl || pageUrl;

  const metadata: Metadata = {
    title,
    description,
    keywords: profile.seo?.keywords?.length
      ? profile.seo.keywords
      : [profile.title, 'Esitesz Bio', 'Bio Link', 'Official Page'],
    authors: [{ name: profile.seo?.author || profile.title }],
    creator: profile.title,
    publisher: 'Esitesz',
    robots: profile.seo?.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: `${profile.title} - Esitesz Bio`,
      locale: 'en_IN',
      type: profile.seo?.entityType === 'Person' ? 'profile' : 'website',
      images: [
        {
          url: ogImage,
          width: 600,
          height: 600,
          alt: profile.title,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [ogImage],
    },
    other: {},
  };

  // Dynamic Geo Meta Tags (for Local Ranking & Geo Search)
  if (profile.seo?.geoRegion) {
    (metadata.other as Record<string, string>)['geo.region'] = profile.seo.geoRegion;
  }
  if (profile.seo?.geoPlacename || profile.locationText) {
    (metadata.other as Record<string, string>)['geo.placename'] =
      profile.seo?.geoPlacename || profile.locationText || '';
  }
  if (profile.seo?.geoLatitude && profile.seo?.geoLongitude) {
    (metadata.other as Record<string, string>)['geo.position'] =
      `${profile.seo.geoLatitude};${profile.seo.geoLongitude}`;
    (metadata.other as Record<string, string>)['ICBM'] =
      `${profile.seo.geoLatitude}, ${profile.seo.geoLongitude}`;
  }

  return metadata;
}

/**
 * Builds Schema.org JSON-LD graph dynamically from user UI input
 * for Google AI Overviews, Gemini, ChatGPT Search, Perplexity & Bing.
 */
export function buildProfileJsonLd(profile: Profile): Record<string, unknown>[] {
  const baseUrl = getBaseAppUrl();
  const pageUrl = `${baseUrl}/${profile.slug}`;
  const graph: Record<string, unknown>[] = [];

  const entityType = profile.seo?.entityType || 'Person';
  const socialLinks = (profile.links || [])
    .filter((l) => l.active && l.url && !l.url.startsWith('#'))
    .map((l) => l.url);

  const mainEntity: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': entityType,
    name: profile.title,
    url: pageUrl,
    description:
      profile.seo?.aeoSummary ||
      profile.seo?.metaDescription ||
      profile.description ||
      `Official bio link page for ${profile.title}.`,
    image: profile.seo?.ogImage || profile.avatarUrl,
  };

  if (profile.subtitle) {
    mainEntity.alternateName = profile.subtitle;
  }

  if (profile.contact?.callPhone) {
    mainEntity.telephone = profile.contact.callPhone;
  }

  if (profile.contact?.emailAddress) {
    mainEntity.email = profile.contact.emailAddress;
  }

  if (socialLinks.length > 0) {
    mainEntity.sameAs = socialLinks;
  }

  // Address if provided
  if (profile.seo?.streetAddress || profile.locationText) {
    mainEntity.address = {
      '@type': 'PostalAddress',
      streetAddress: profile.seo?.streetAddress || profile.locationText,
      addressLocality: profile.seo?.addressLocality || '',
      addressRegion: profile.seo?.addressRegion || '',
      postalCode: profile.seo?.postalCode || '',
      addressCountry: profile.seo?.addressCountry || 'IN',
    };
  }

  // Geo coordinates if provided
  if (profile.seo?.geoLatitude && profile.seo?.geoLongitude) {
    mainEntity.geo = {
      '@type': 'GeoCoordinates',
      latitude: parseFloat(profile.seo.geoLatitude),
      longitude: parseFloat(profile.seo.geoLongitude),
    };
  }

  graph.push(mainEntity);

  // AEO: FAQ Schema (Answer Engine Optimization for AI Citations)
  if (profile.seo?.faqItems && profile.seo.faqItems.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: profile.seo.faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
    graph.push(faqSchema);
  }

  return graph;
}
