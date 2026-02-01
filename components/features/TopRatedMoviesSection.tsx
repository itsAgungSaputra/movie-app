'use client';

import Link from 'next/link';
import { useTopRatedMovies } from '@/hooks';
import { MovieCard, SectionHeader, HorizontalScroll, HorizontalCardsSkeleton, ErrorMessage } from '@/components/ui';

export function TopRatedMoviesSection() {
  const { data, isLoading, isError, refetch } = useTopRatedMovies(1);

  return (
    <section className="py-10">
      <SectionHeader
        title="Top Rated"
        action={
          <Link
            href="/discover?sort_by=vote_average.desc"
            className="inline-flex items-center gap-1 text-sm font-medium"
          >
            View All
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        }
      />
      
      {isLoading && <HorizontalCardsSkeleton count={10} />}
      
      {isError && (
        <ErrorMessage 
          message="Failed to load top rated movies." 
          onRetry={() => refetch()} 
        />
      )}
      
      {data && (
        <HorizontalScroll>
          {data.results.slice(0, 12).map((movie) => (
            <div key={movie.id} className="w-40 shrink-0 sm:w-48">
              <MovieCard movie={movie} />
            </div>
          ))}
        </HorizontalScroll>
      )}
    </section>
  );
}
