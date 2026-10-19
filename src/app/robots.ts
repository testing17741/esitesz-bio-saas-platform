import { MetadataRoute } from 'next';
import { getBaseAppUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseAppUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/dashboard', '/api/'],
      },
      // Explicitly allow leading AI search crawlers (Google Gemini/Extended, Perplexity, GPTBot, ClaudeBot)
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot', 'ClaudeBot'],
        allow: '/',
        disallow: ['/admin', '/dashboard', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
