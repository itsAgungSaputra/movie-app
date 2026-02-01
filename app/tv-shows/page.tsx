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
    <div className="container mx-auto px-4 py-10 md:py-12">
      <div className="mb-10 flex flex-col items-start gap-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1.5 rounded-full bg-linear-to-b from-rose-500 to-rose-600" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">TV Shows</h1>
        </div>
        <p className="text-gray-400 ml-5">Discover the best TV series to binge-watch</p>
      </div>
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
