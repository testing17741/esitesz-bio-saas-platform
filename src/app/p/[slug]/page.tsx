import type { Metadata } from 'next';
import PublicProfilePage, { generateMetadata as baseGenerateMetadata } from '../[slug]/page';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return baseGenerateMetadata({ params });
}

export default async function Page({ params }: PageProps) {
  return <PublicProfilePage params={params} />;
}
