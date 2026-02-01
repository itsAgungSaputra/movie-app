import { Suspense } from 'react';
import { getTrendingMovies } from '@/lib/tmdb';
import { FeaturedHero } from '@/components/features/FeaturedHero';
import { HorizontalCardsSkeleton } from '@/components/ui';

// Client components for home sections
import { HomeContent } from './HomeContent';

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  // Fetch featured movie on server
  const trendingData = await getTrendingMovies('day', 1);
  const featuredMovie = trendingData.results[0];

  return (
    <>
      {featuredMovie && <FeaturedHero movie={featuredMovie} />}
      
      <div className="container mx-auto px-4">
        <Suspense fallback={<HomePageSkeleton />}>
          <HomeContent />
        </Suspense>
      </div>
    </>
  );
}

function HomePageSkeleton() {
  return (
    <div className="space-y-12 py-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i}>
          <div className="mb-4 h-8 w-48 animate-pulse rounded bg-gray-700" />
          <HorizontalCardsSkeleton count={10} />
        </div>
      ))}
    </div>
  );
}
