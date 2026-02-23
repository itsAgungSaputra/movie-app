'use client';

import Link from 'next/link';
import { AnimeCard } from './AnimeCard';
import { HorizontalScroll, Skeleton } from '@/components/ui';
import type { Anime } from '@/types/anime';

interface AnimeSectionProps {
  title: string;
  subtitle?: string;
  animeList: Anime[];
  viewAllHref?: string;
  isLoading?: boolean;
  error?: Error | null;
  priority?: boolean;
  showRanking?: boolean;
}

export function AnimeSection({
  title,
  subtitle,
  animeList,
  viewAllHref,
  isLoading = false,
  error = null,
  priority = false,
  showRanking = false,
}: AnimeSectionProps) {
  if (error) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-red-500/10 p-6 ring-1 ring-red-500/20">
            <p className="text-red-400">Failed to load anime. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header with anime styling */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3">
              {/* Colorful accent bar */}
              <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-pink-500 via-purple-500 to-cyan-500" />
              <div>
                <h2 className="text-xl font-bold text-white md:text-2xl lg:text-3xl">
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-1 text-sm text-purple-300/70">{subtitle}</p>
                )}
              </div>
            </div>
          </div>
          
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="group flex items-center gap-1.5 rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300 ring-1 ring-purple-500/20 transition-all duration-300 hover:bg-purple-500/20 hover:ring-purple-500/40"
            >
              View All
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="shrink-0">
                <Skeleton className="h-72 w-44 rounded-2xl md:h-80 md:w-52" />
                <Skeleton className="mt-3 h-4 w-36" />
                <Skeleton className="mt-2 h-3 w-20" />
              </div>
            ))}
          </div>
        ) : animeList.length === 0 ? (
          <div className="flex items-center justify-center rounded-2xl bg-purple-500/5 py-16 ring-1 ring-purple-500/10">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                <svg className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <p className="text-gray-400">No anime found</p>
            </div>
          </div>
        ) : (
          <HorizontalScroll>
            {animeList.map((anime, index) => (
              <div 
                key={anime.id} 
                className="shrink-0 w-44 md:w-52"
              >
                {showRanking && (
                  <div className="mb-2 flex items-center justify-center">
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-500">
                      #{index + 1}
                    </span>
                  </div>
                )}
                <AnimeCard 
                  anime={anime} 
                  priority={priority && index < 4} 
                />
              </div>
            ))}
          </HorizontalScroll>
        )}
      </div>
    </section>
  );
}

// Grid layout variant
interface AnimeSectionGridProps {
  title: string;
  subtitle?: string;
  animeList: Anime[];
  isLoading?: boolean;
  columns?: 4 | 5 | 6;
}

export function AnimeSectionGrid({
  title,
  subtitle,
  animeList,
  isLoading = false,
  columns = 5,
}: AnimeSectionGridProps) {
  const gridCols = {
    4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
  };

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-10 w-1.5 rounded-full bg-linear-to-b from-pink-500 via-purple-500 to-cyan-500" />
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
            {subtitle && (
              <p className="mt-1 text-sm text-purple-300/70">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-2/3 w-full rounded-2xl" />
                <Skeleton className="mt-3 h-4 w-3/4" />
                <Skeleton className="mt-2 h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
            {animeList.map((anime, index) => (
              <AnimeCard key={anime.id} anime={anime} priority={index < 6} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
