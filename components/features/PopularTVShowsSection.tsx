'use client';

import Link from 'next/link';
import { usePopularTVShows } from '@/hooks';
import { TVShowCard, SectionHeader, HorizontalScroll, HorizontalCardsSkeleton, ErrorMessage } from '@/components/ui';

export function PopularTVShowsSection() {
  const { data, isLoading, isError, refetch } = usePopularTVShows(1);

  return (
    <section className="py-10">
      <SectionHeader
        title="Popular TV Shows"
        action={
          <Link
            href="/tv-shows"
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
          message="Failed to load popular TV shows." 
          onRetry={() => refetch()} 
        />
      )}
      
      {data && (
        <HorizontalScroll>
          {data.results.slice(0, 12).map((show) => (
            <div key={show.id} className="w-40 shrink-0 sm:w-48">
              <TVShowCard show={show} />
            </div>
          ))}
        </HorizontalScroll>
      )}
    </section>
  );
}
