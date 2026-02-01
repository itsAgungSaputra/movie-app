'use client';

import { useQuery, useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import type { TMDBResponse, MultiSearchResult, Movie, TVShow } from '@/types/tmdb';

const BASE_URL = '/api/tmdb';

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

// Query keys factory
export const searchKeys = {
  all: ['search'] as const,
  multi: (query: string, page: number) => 
    [...searchKeys.all, 'multi', query, page] as const,
  movies: (query: string, page: number) => 
    [...searchKeys.all, 'movies', query, page] as const,
  tvShows: (query: string, page: number) => 
    [...searchKeys.all, 'tv-shows', query, page] as const,
};

export function useSearchMulti(query: string, page: number = 1) {
  return useQuery({
    queryKey: searchKeys.multi(query, page),
    queryFn: () => fetchFromApi<TMDBResponse<MultiSearchResult>>(
      `/search/multi?query=${encodeURIComponent(query)}&page=${page}`
    ),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    enabled: query.length >= 2,
  });
}

export function useSearchMovies(query: string, page: number = 1) {
  return useQuery({
    queryKey: searchKeys.movies(query, page),
    queryFn: () => fetchFromApi<TMDBResponse<Movie>>(
      `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    ),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    enabled: query.length >= 2,
  });
}

export function useSearchTVShows(query: string, page: number = 1) {
  return useQuery({
    queryKey: searchKeys.tvShows(query, page),
    queryFn: () => fetchFromApi<TMDBResponse<TVShow>>(
      `/search/tv?query=${encodeURIComponent(query)}&page=${page}`
    ),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    enabled: query.length >= 2,
  });
}

export function useInfiniteSearchMulti(query: string) {
  return useInfiniteQuery({
    queryKey: [...searchKeys.all, 'multi-infinite', query],
    queryFn: ({ pageParam = 1 }) => fetchFromApi<TMDBResponse<MultiSearchResult>>(
      `/search/multi?query=${encodeURIComponent(query)}&page=${pageParam}`
    ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    enabled: query.length >= 2,
  });
}
