'use client';

import { useState } from 'react';
import { useTrendingMovies } from '@/hooks';
import { MovieCard, CardGridSkeleton, ErrorMessage, EmptyState, Pagination } from '@/components/ui';
import type { TimeWindow } from '@/types/tmdb';

export function TrendingPageContent() {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('week');
  const [page, setPage] = useState(1);
  
  const { data, isLoading, isError, refetch } = useTrendingMovies(timeWindow, page);

  const handleTimeWindowChange = (newWindow: TimeWindow) => {
    setTimeWindow(newWindow);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Time Window Filter */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-400">Time Window:</span>
        <div className="flex rounded-lg bg-gray-800 p-1">
          <button
            onClick={() => handleTimeWindowChange('day')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              timeWindow === 'day'
                ? 'bg-red-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => handleTimeWindowChange('week')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              timeWindow === 'week'
                ? 'bg-red-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && <CardGridSkeleton count={20} />}

      {/* Error State */}
      {isError && (
        <ErrorMessage
          message="Failed to load trending movies."
          onRetry={() => refetch()}
        />
      )}

      {/* Results */}
      {data && data.results.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {data.results.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} priority={index < 10} />
            ))}
          </div>

          {/* Pagination */}
          <div className="pt-8">
            <Pagination
              currentPage={page}
              totalPages={data.total_pages}
              onPageChange={setPage}
            />
          </div>
        </>
      )}

      {/* Empty State */}
      {data && data.results.length === 0 && (
        <EmptyState
          title="No trending movies"
          message="Check back later for trending content."
          icon="movie"
        />
      )}
    </div>
  );
}
