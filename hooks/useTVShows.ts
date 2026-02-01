'use client';

import { useQuery, useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import type {
  TMDBResponse,
  TVShow,
  TVShowDetails,
  Credits,
  DiscoverTVParams,
  TimeWindow,
} from '@/types/tmdb';

const BASE_URL = '/api/tmdb';

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

// Query keys factory
export const tvKeys = {
  all: ['tv-shows'] as const,
  trending: (timeWindow: TimeWindow, page: number) => 
    [...tvKeys.all, 'trending', timeWindow, page] as const,
  popular: (page: number) => [...tvKeys.all, 'popular', page] as const,
  topRated: (page: number) => [...tvKeys.all, 'top-rated', page] as const,
  onTheAir: (page: number) => [...tvKeys.all, 'on-the-air', page] as const,
  airingToday: (page: number) => [...tvKeys.all, 'airing-today', page] as const,
  details: (id: number) => [...tvKeys.all, 'details', id] as const,
  credits: (id: number) => [...tvKeys.all, 'credits', id] as const,
  recommendations: (id: number, page: number) => 
    [...tvKeys.all, 'recommendations', id, page] as const,
  similar: (id: number, page: number) => 
    [...tvKeys.all, 'similar', id, page] as const,
  discover: (params: DiscoverTVParams) => 
    [...tvKeys.all, 'discover', params] as const,
};

export function useTrendingTVShows(timeWindow: TimeWindow = 'week', page: number = 1) {
  return useQuery({
    queryKey: tvKeys.trending(timeWindow, page),
    queryFn: () => fetchFromApi<TMDBResponse<TVShow>>(
      `/trending/tv/${timeWindow}?page=${page}`
    ),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function usePopularTVShows(page: number = 1) {
  return useQuery({
    queryKey: tvKeys.popular(page),
    queryFn: () => fetchFromApi<TMDBResponse<TVShow>>(`/tv/popular?page=${page}`),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useTopRatedTVShows(page: number = 1) {
  return useQuery({
    queryKey: tvKeys.topRated(page),
    queryFn: () => fetchFromApi<TMDBResponse<TVShow>>(`/tv/top_rated?page=${page}`),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useOnTheAirTVShows(page: number = 1) {
  return useQuery({
    queryKey: tvKeys.onTheAir(page),
    queryFn: () => fetchFromApi<TMDBResponse<TVShow>>(`/tv/on_the_air?page=${page}`),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useTVShowDetails(tvId: number) {
  return useQuery({
    queryKey: tvKeys.details(tvId),
    queryFn: () => fetchFromApi<TVShowDetails>(`/tv/${tvId}`),
    staleTime: 1000 * 60 * 30,
    enabled: !!tvId,
  });
}

export function useTVShowCredits(tvId: number) {
  return useQuery({
    queryKey: tvKeys.credits(tvId),
    queryFn: () => fetchFromApi<Credits>(`/tv/${tvId}/credits`),
    staleTime: 1000 * 60 * 30,
    enabled: !!tvId,
  });
}

export function useTVShowRecommendations(tvId: number, page: number = 1) {
  return useQuery({
    queryKey: tvKeys.recommendations(tvId, page),
    queryFn: () => fetchFromApi<TMDBResponse<TVShow>>(
      `/tv/${tvId}/recommendations?page=${page}`
    ),
    staleTime: 1000 * 60 * 5,
    enabled: !!tvId,
  });
}

export function useDiscoverTVShows(params: DiscoverTVParams = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });
  
  return useQuery({
    queryKey: tvKeys.discover(params),
    queryFn: () => fetchFromApi<TMDBResponse<TVShow>>(
      `/discover/tv?${searchParams.toString()}`
    ),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useInfiniteDiscoverTVShows(params: Omit<DiscoverTVParams, 'page'> = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });
  
  return useInfiniteQuery({
    queryKey: [...tvKeys.all, 'discover-infinite', params],
    queryFn: ({ pageParam = 1 }) => fetchFromApi<TMDBResponse<TVShow>>(
      `/discover/tv?${searchParams.toString()}&page=${pageParam}`
    ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });
}
