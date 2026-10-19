'use client';

import React from 'react';
import { Profile } from '@/types';
import { DarkLuxuryTheme } from './DarkLuxuryTheme';
import { LinktreeMinimalTheme } from './LinktreeMinimalTheme';
import { ExecutiveCardTheme } from './ExecutiveCardTheme';
import { CreatorGlowTheme } from './CreatorGlowTheme';

interface ThemeRendererProps {
  profile: Profile;
  onShareClick?: () => void;
  onQrClick?: () => void;
  isLivePreview?: boolean;
}

export function ThemeRenderer({
  profile,
  onShareClick,
  onQrClick,
  isLivePreview = false,
}: ThemeRendererProps) {
  switch (profile.theme) {
    case 'linktree-minimal':
      return (
        <LinktreeMinimalTheme
          profile={profile}
          onShareClick={onShareClick}
          onQrClick={onQrClick}
          isLivePreview={isLivePreview}
        />
      );
    case 'executive-card':
      return (
        <ExecutiveCardTheme
          profile={profile}
          onShareClick={onShareClick}
          onQrClick={onQrClick}
          isLivePreview={isLivePreview}
        />
      );
    case 'creator-glow':
      return (
        <CreatorGlowTheme
          profile={profile}
          onShareClick={onShareClick}
          onQrClick={onQrClick}
          isLivePreview={isLivePreview}
        />
      );
    case 'islamic-community':
    case 'esitesz-dark-luxury':
    default:
      return (
        <DarkLuxuryTheme
          profile={profile}
          onShareClick={onShareClick}
          onQrClick={onQrClick}
          isLivePreview={isLivePreview}
        />
      );
  }
}
