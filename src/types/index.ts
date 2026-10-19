export type UserRole = 'superadmin' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProfileStatus = 'approved' | 'pending' | 'rejected';

export type ThemeId =
  | 'esitesz-dark-luxury'
  | 'linktree-minimal'
  | 'executive-card'
  | 'creator-glow'
  | 'islamic-community';

export interface ProfileLink {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  icon: string; // 'whatsapp' | 'instagram' | 'facebook' | 'youtube' | 'x' | 'linkedin' | 'github' | 'globe' | 'share' | 'phone' | 'mail' | 'music' | 'telegram'
  color?: string;
  active: boolean;
  order: number;
}

export interface ProfileContact {
  callPhone?: string;
  whatsappNumber?: string;
  emailAddress?: string;
  locationAddress?: string;
  showCall: boolean;
  showWhatsapp: boolean;
  showEmail: boolean;
  showLocation: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type EntityType = 'Person' | 'Organization' | 'LocalBusiness' | 'ReligiousOrganization';

export interface ProfileSeo {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords: string[];
  author?: string;
  // AEO (Answer Engine Optimization for AI Assistants: ChatGPT, Claude, Perplexity, Gemini)
  entityType: EntityType;
  aeoSummary?: string;
  faqItems: FaqItem[];
  showFaqOnPage: boolean;
  // GEO (Local & Regional Search Engine Optimization - India & Global)
  geoRegion?: string; // e.g., "IN-UP", "IN-MH", "IN-DL"
  geoPlacename?: string; // e.g., "Safipur Sharif, U.P", "Antophill, Wadala, Mumbai"
  geoLatitude?: string;
  geoLongitude?: string;
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry: string; // "IN"
  // Crawling controls
  noIndex?: boolean;
}

export interface ProfileAnalytics {
  views: number;
  clicks: Record<string, number>; // linkId -> click count
  viewsHistory: Array<{ date: string; count: number }>;
}

export interface Profile {
  id: string;
  slug: string;
  userId?: string | null;
  userEmail?: string | null;
  title: string;
  subtitle?: string;
  description?: string;
  avatarUrl?: string;
  coverUrl?: string;
  locationText?: string;
  theme: ThemeId;
  status: ProfileStatus;
  rejectionReason?: string | null;
  links: ProfileLink[];
  contact: ProfileContact;
  seo: ProfileSeo;
  analytics: ProfileAnalytics;
  footerText: string; // 'Designed & Developed by'
  footerBrand: string; // 'Esitesz'
  footerUrl: string; // 'https://www.esitesz.com'
  copyrightText?: string;
  createdAt: string;
  updatedAt: string;
}

export type OtpPurpose = 'register' | 'login' | 'claim' | 'sensitive_edit';

export interface OtpRecord {
  id: string;
  email: string;
  code: string;
  purpose: OtpPurpose;
  profileId?: string | null;
  expiresAt: number;
  used: boolean;
  createdAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
