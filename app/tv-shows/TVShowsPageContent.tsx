'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useDiscoverTVShows, useTVGenres } from '@/hooks';
import { TVShowCard, CardGridSkeleton, ErrorMessage, EmptyState, Pagination, Select } from '@/components/ui';
import type { SortBy } from '@/types/tmdb';

const sortOptions = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'popularity.asc', label: 'Least Popular' },
  { value: 'vote_average.desc', label: 'Highest Rated' },
  { value: 'vote_average.asc', label: 'Lowest Rated' },
  { value: 'first_air_date.desc', label: 'Newest First' },
  { value: 'first_air_date.asc', label: 'Oldest First' },
];

export function TVShowsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get filter values from URL
  const sortBy = (searchParams.get('sort_by') as SortBy) || 'popularity.desc';
  const genreId = searchParams.get('genre') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Fetch genres
  const { data: genres } = useTVGenres();

  // Build genre options
  const genreOptions = [
    { value: '', label: 'All Genres' },
    ...(genres?.map((g) => ({ value: String(g.id), label: g.name })) || []),
  ];

  // Fetch TV shows with filters
  const { data, isLoading, isError, refetch } = useDiscoverTVShows({
    page,
    sort_by: sortBy,
    with_genres: genreId || undefined,
    'vote_count.gte': sortBy.includes('vote_average') ? 50 : undefined,
  });

  // Update URL with new filter values
  const updateFilters = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      // Reset to page 1 when filters change (except when changing page)
      if (!('page' in updates)) {
        params.delete('page');
      }

      router.push(`/tv-shows?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handlePageChange = (newPage: number) => {
    updateFilters({ page: String(newPage) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Select
          value={sortBy}
          onChange={(value) => updateFilters({ sort_by: value })}
          options={sortOptions}
          label="Sort By"
          className="w-48"
        />
        <Select
          value={genreId}
          onChange={(value) => updateFilters({ genre: value })}
          options={genreOptions}
          label="Genre"
          className="w-40"
        />
      </div>

      {/* Results count */}
      {data && (
        <p className="text-sm text-gray-400">
          Showing {data.results.length} of {data.total_results.toLocaleString()} TV shows
        </p>
      )}

      {/* Loading State */}
      {isLoading && <CardGridSkeleton count={20} />}

      {/* Error State */}
      {isError && (
        <ErrorMessage
          message="Failed to load TV shows."
          onRetry={() => refetch()}
        />
      )}

      {/* Results */}
      {data && data.results.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {data.results.map((show, index) => (
              <TVShowCard key={show.id} show={show} priority={index < 10} />
            ))}
          </div>

          {/* Pagination */}
          <div className="pt-8">
            <Pagination
              currentPage={page}
              totalPages={data.total_pages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}

      {/* Empty State */}
      {data && data.results.length === 0 && (
        <EmptyState
          title="No TV shows found"
          message="Try adjusting your filters to find more TV shows."
          icon="tv"
        />
      )}
    </div>
  );
}
