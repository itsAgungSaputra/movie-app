'use client';

import {
  TrendingMoviesSection,
  PopularMoviesSection,
  UpcomingMoviesSection,
  TopRatedMoviesSection,
  PopularTVShowsSection,
} from '@/components/features';

export function HomeContent() {
  return (
    <div className="space-y-4">
      <TrendingMoviesSection />
      <PopularMoviesSection />
      <UpcomingMoviesSection />
      <TopRatedMoviesSection />
      <PopularTVShowsSection />
    </div>
  );
}
