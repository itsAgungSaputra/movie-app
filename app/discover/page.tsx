import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DiscoverPageContent } from './DiscoverPageContent';
import { CardGridSkeleton } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Discover Movies',
  description: 'Discover and explore movies with advanced filters',
};

export default function DiscoverPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-10 text-4xl font-bold tracking-tight text-white">Discover Movies</h1>
      <Suspense fallback={<DiscoverLoading />}>
        <DiscoverPageContent />
      </Suspense>
    </div>
  );
}

function DiscoverLoading() {
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
