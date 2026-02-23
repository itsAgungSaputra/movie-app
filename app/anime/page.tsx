'use client';

import { AnimeHero } from '@/components/anime';
import { AnimeSection } from '@/components/anime';
import { HorizontalCardsSkeleton } from '@/components/ui';
import {
  usePopularAnime,
  useTopRatedAnime,
  useAiringAnime,
  useTrendingAnime,
} from '@/hooks';

export default function AnimePage() {
  const { data: trendingData, isLoading: trendingLoading } = useTrendingAnime('week', 1);
  const { data: popularData, isLoading: popularLoading } = usePopularAnime(1);
  const { data: topRatedData, isLoading: topRatedLoading } = useTopRatedAnime(1);
  const { data: airingData, isLoading: airingLoading } = useAiringAnime(1);

  return (
    <div className="min-h-screen -mt-16 lg:-mt-18">
      {/* Page Header */}
      <header className="relative overflow-hidden bg-linear-to-b from-purple-900/20 to-transparent pb-16 pt-32">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 lg:px-6 relative">
          <div className="flex items-center gap-4">
            <div className="h-12 w-2 rounded-full bg-linear-to-b from-pink-500 via-purple-500 to-cyan-500" />
            <div>
              <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                Anime
              </h1>
              <p className="mt-2 text-lg text-purple-200/70 md:text-xl">
                Discover Japanese Animation
              </p>
            </div>
          </div>
          
          <p className="mt-6 max-w-2xl text-gray-400">
            Explore the world of anime - from action-packed adventures to heartwarming stories. 
            Find trending, popular, and top-rated Japanese animations all in one place.
          </p>
        </div>
      </header>

      {/* Hero Carousel */}
      {!popularLoading && popularData?.results && popularData.results.length > 0 && (
        <AnimeHero animeList={popularData.results.slice(0, 5)} />
      )}

      {/* Content Sections */}
      <div className="space-y-4 pb-16">
        {/* Trending Anime */}
        <AnimeSection
          title="Trending This Week"
          subtitle="Most popular anime right now"
          animeList={trendingData?.results || []}
          viewAllHref="/anime/trending"
          isLoading={trendingLoading}
          priority
        />

        {/* Currently Airing */}
        <AnimeSection
          title="Currently Airing"
          subtitle="Anime airing this season"
          animeList={airingData?.results || []}
          viewAllHref="/anime/airing"
          isLoading={airingLoading}
        />

        {/* Popular Anime */}
        <AnimeSection
          title="Popular Anime"
          subtitle="All-time favorites"
          animeList={popularData?.results || []}
          viewAllHref="/anime/popular"
          isLoading={popularLoading}
        />

        {/* Top Rated */}
        <AnimeSection
          title="Top Rated"
          subtitle="Highest rated anime of all time"
          animeList={topRatedData?.results || []}
          viewAllHref="/anime/top-rated"
          isLoading={topRatedLoading}
          showRanking
        />
      </div>
    </div>
  );
}
