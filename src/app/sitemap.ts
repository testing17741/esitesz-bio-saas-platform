import { MetadataRoute } from 'next';
import { dbService } from '@/lib/db';
import { getBaseAppUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseAppUrl();
  const profiles = dbService.listProfiles({ status: 'approved' });

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  const profileRoutes: MetadataRoute.Sitemap = profiles
    .filter((p) => !p.seo?.noIndex)
    .map((p) => ({
      url: `${baseUrl}/${p.slug}`,
      lastModified: new Date(p.updatedAt || p.createdAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  return [...staticRoutes, ...profileRoutes];
}
