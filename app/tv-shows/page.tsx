import type { Metadata } from 'next';
import { Suspense } from 'react';
import { TVShowsPageContent } from './TVShowsPageContent';
import { CardGridSkeleton } from '@/components/ui';

export const metadata: Metadata = {
  title: 'TV Shows',
  description: 'Discover and explore TV shows with advanced filters',
};

export default function TVShowsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-10 text-4xl font-bold tracking-tight text-white">TV Shows</h1>
      <Suspense fallback={<TVShowsLoading />}>
        <TVShowsPageContent />
      </Suspense>
    </div>
  );
}

function TVShowsLoading() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4">
        <div className="h-10 w-32 animate-pulse rounded-xl bg-white/10" />
        <div className="h-10 w-32 animate-pulse rounded-xl bg-white/10" />
        <div className="h-10 w-48 animate-pulse rounded-xl bg-white/10" />
      </div>
      <CardGridSkeleton count={20} />
    </div>
  );
}
