import { Suspense } from 'react';
import { getTrendingMovies } from '@/lib/tmdb';
import { HeroCarousel } from '@/components/features';
import { HorizontalCardsSkeleton } from '@/components/ui';

// Client components for home sections
import { HomeContent } from './HomeContent';

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  // Fetch trending movies for carousel on server
  const trendingData = await getTrendingMovies('day', 1);
  const heroMovies = trendingData.results.slice(0, 5); // Top 5 for carousel

  return (
    <>
      {heroMovies.length > 0 && <HeroCarousel movies={heroMovies} />}
      
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
