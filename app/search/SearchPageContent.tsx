'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useDebounce, useInfiniteSearchMulti } from '@/hooks';
import { SearchInput, EmptyState, ErrorMessage, Skeleton, RatingBadge } from '@/components/ui';
import { getImageUrl } from '@/utils/image';
import { formatYear, truncateText } from '@/utils/format';
import type { MultiSearchResult } from '@/types/tmdb';

export function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 300);
  
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteSearchMulti(debouncedQuery);

  // Update URL when query changes
  useEffect(() => {
    if (debouncedQuery) {
      router.replace(`/search?q=${encodeURIComponent(debouncedQuery)}`, { scroll: false });
    } else {
      router.replace('/search', { scroll: false });
    }
  }, [debouncedQuery, router]);

  const allResults = data?.pages.flatMap((page) => page.results) || [];
  const totalResults = data?.pages[0]?.total_results || 0;

  return (
    <div className="space-y-6">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search for movies, TV shows, or people..."
        autoFocus
      />

      {/* Results count */}
      {debouncedQuery && !isLoading && (
        <p className="text-sm text-gray-400">
          {totalResults > 0
            ? `Found ${totalResults.toLocaleString()} results for "${debouncedQuery}"`
            : null}
        </p>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <SearchResultSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <ErrorMessage
          message="Failed to search. Please try again."
          onRetry={() => refetch()}
        />
      )}

      {/* Empty state */}
      {!isLoading && debouncedQuery && allResults.length === 0 && (
        <EmptyState
          title="No results found"
          message={`We couldn't find anything matching "${debouncedQuery}". Try different keywords.`}
          icon="search"
        />
      )}

      {/* Initial state */}
      {!debouncedQuery && !isLoading && (
        <EmptyState
          title="Start searching"
          message="Enter a movie, TV show, or person name to get started."
          icon="search"
        />
      )}

      {/* Results */}
      {allResults.length > 0 && (
        <div className="space-y-4">
          {allResults.map((result) => (
            <SearchResultCard key={`${result.media_type}-${result.id}`} result={result} />
          ))}

          {/* Load more button */}
          {hasNextPage && (
            <div className="flex justify-center pt-6">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="rounded-xl bg-rose-500 px-8 py-3 font-medium text-white shadow-lg shadow-rose-500/25 transition-all duration-200 hover:bg-rose-600 hover:scale-[1.02] disabled:opacity-50"
              >
                {isFetchingNextPage ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SearchResultCard({ result }: { result: MultiSearchResult }) {
  const isMovie = result.media_type === 'movie';
  const isTVShow = result.media_type === 'tv';
  const isPerson = result.media_type === 'person';

  const title = result.title || result.name || '';
  const date = result.release_date || result.first_air_date;
  const imagePath = result.poster_path || result.profile_path;
  const href = isMovie
    ? `/movie/${result.id}`
    : isTVShow
    ? `/tv/${result.id}`
    : '#';

  if (isPerson) {
    return (
      <div className="flex gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur-sm">
        <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-800">
          <Image
            src={getImageUrl(imagePath, 'w154')}
            alt={title}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-500/20 px-3 py-1 text-[10px] font-semibold text-purple-400">
              PERSON
            </span>
            <h3 className="font-medium text-white">{title}</h3>
          </div>
          {result.known_for_department && (
            <p className="mt-1 text-sm text-gray-400">
              Known for: {result.known_for_department}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="group flex gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:ring-white/20"
    >
      <div className="relative h-36 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-800">
        <Image
          src={getImageUrl(imagePath, 'w185')}
          alt={title}
          fill
          sizes="96px"
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col py-1">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
              isMovie ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'
            }`}
          >
            {isMovie ? 'MOVIE' : 'TV'}
          </span>
          <h3 className="font-medium text-white transition-colors group-hover:text-rose-400">
            {title}
          </h3>
        </div>
        <p className="mt-1 text-sm text-gray-400">{formatYear(date)}</p>
        {result.vote_average !== undefined && result.vote_average > 0 && (
          <div className="mt-1">
            <RatingBadge rating={result.vote_average} size="sm" />
          </div>
        )}
        {result.overview && (
          <p className="mt-2 line-clamp-2 text-sm text-gray-400">
            {truncateText(result.overview, 200)}
          </p>
        )}
      </div>
    </Link>
  );
}

function SearchResultSkeleton() {
  return (
    <div className="flex gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <Skeleton className="h-36 w-24 shrink-0 rounded-xl" />
      <div className="flex flex-1 flex-col py-1">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12 rounded-full" />
          <Skeleton className="h-5 w-48 rounded" />
        </div>
        <Skeleton className="mt-2 h-4 w-20 rounded" />
        <Skeleton className="mt-2 h-16 w-full rounded" />
      </div>
    </div>
  );
}
