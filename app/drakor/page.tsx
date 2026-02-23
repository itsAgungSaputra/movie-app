'use client';

import { DrakorHero, DrakorSection } from '@/components/drakor';
import {
  usePopularDrakor,
  useTopRatedDrakor,
  useAiringDrakor,
  useTrendingDrakor,
} from '@/hooks';

export default function DrakorPage() {
  const { data: trendingData, isLoading: trendingLoading } = useTrendingDrakor('week', 1);
  const { data: popularData, isLoading: popularLoading } = usePopularDrakor(1);
  const { data: topRatedData, isLoading: topRatedLoading } = useTopRatedDrakor(1);
  const { data: airingData, isLoading: airingLoading } = useAiringDrakor(1);

  return (
    <div className="min-h-screen">
      {/* Page Header - elegant minimal */}
      <header className="relative overflow-hidden bg-linear-to-b from-[#0f0f14] to-transparent pb-16 pt-32">
        <div className="container mx-auto px-4 lg:px-6 relative">
          <div className="flex items-center gap-4">
            <div className="h-10 w-0.5 rounded-full bg-linear-to-b from-rose-400 to-amber-300" />
            <div>
              <h1 className="text-4xl font-semibold tracking-wide text-white md:text-5xl">
                K-Drama
              </h1>
              <p className="mt-2 text-lg text-gray-400">
                Korean Drama Collection
              </p>
            </div>
          </div>
          
          <p className="mt-6 max-w-2xl text-gray-500 leading-relaxed">
            Discover the best of Korean drama - from romantic comedies to thrilling mysteries. 
            Experience stories that captivate audiences worldwide.
          </p>
        </div>
      </header>

      {/* Hero Carousel */}
      {!popularLoading && popularData?.results && popularData.results.length > 0 && (
        <DrakorHero drakorList={popularData.results.slice(0, 5)} />
      )}

      {/* Content Sections */}
      <div className="space-y-4 pb-16">
        {/* Trending Drakor */}
        <DrakorSection
          title="Trending This Week"
          subtitle="Most popular K-dramas right now"
          drakorList={trendingData?.results || []}
          viewAllHref="/drakor/trending"
          isLoading={trendingLoading}
          priority
        />

        {/* Currently Airing */}
        <DrakorSection
          title="Currently Airing"
          subtitle="On-air dramas"
          drakorList={airingData?.results || []}
          viewAllHref="/drakor/airing"
          isLoading={airingLoading}
        />

        {/* Popular Drakor */}
        <DrakorSection
          title="Popular"
          subtitle="All-time favorites"
          drakorList={popularData?.results || []}
          viewAllHref="/drakor/popular"
          isLoading={popularLoading}
        />

        {/* Top Rated */}
        <DrakorSection
          title="Top Rated"
          subtitle="Highest rated dramas"
          drakorList={topRatedData?.results || []}
          viewAllHref="/drakor/top-rated"
          isLoading={topRatedLoading}
        />
      </div>
    </div>
  );
}
