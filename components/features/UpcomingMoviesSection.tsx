'use client';

import Link from 'next/link';
import { useUpcomingMovies } from '@/hooks';
import { MovieCard, SectionHeader, HorizontalScroll, HorizontalCardsSkeleton, ErrorMessage } from '@/components/ui';

export function UpcomingMoviesSection() {
  const { data, isLoading, isError, refetch } = useUpcomingMovies(1);

  return (
    <section className="py-10">
      <SectionHeader
        title="Coming Soon"
        action={
          <Link
            href="/discover?sort_by=release_date.desc"
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
          message="Failed to load upcoming movies." 
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
