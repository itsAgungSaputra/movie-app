'use client';

import { useQuery, useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import type { TMDBResponse, Credits, TimeWindow } from '@/types/tmdb';
import type { Drakor, DrakorDetails, DrakorFilterParams } from '@/types/drakor';

const BASE_URL = '/api/tmdb';

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

// Filter results to only include Korean shows
function filterDrakor(results: Drakor[]): Drakor[] {
  return results.filter(
    show => show.origin_country?.includes('KR') || show.original_language === 'ko'
  );
}

// Query keys factory
export const drakorKeys = {
  all: ['drakor'] as const,
  trending: (timeWindow: TimeWindow, page: number) => 
    [...drakorKeys.all, 'trending', timeWindow, page] as const,
  popular: (page: number) => [...drakorKeys.all, 'popular', page] as const,
  topRated: (page: number) => [...drakorKeys.all, 'top-rated', page] as const,
  airing: (page: number) => [...drakorKeys.all, 'airing', page] as const,
  details: (id: number) => [...drakorKeys.all, 'details', id] as const,
  credits: (id: number) => [...drakorKeys.all, 'credits', id] as const,
  recommendations: (id: number, page: number) => 
    [...drakorKeys.all, 'recommendations', id, page] as const,
  similar: (id: number, page: number) => 
    [...drakorKeys.all, 'similar', id, page] as const,
  discover: (params: DrakorFilterParams) => 
    [...drakorKeys.all, 'discover', params] as const,
  search: (query: string, page: number) =>
    [...drakorKeys.all, 'search', query, page] as const,
};

export function useTrendingDrakor(timeWindow: TimeWindow = 'week', page: number = 1) {
  return useQuery({
    queryKey: drakorKeys.trending(timeWindow, page),
    queryFn: async () => {
      const data = await fetchFromApi<TMDBResponse<Drakor>>(
        `/trending/tv/${timeWindow}?page=${page}`
      );
      return { ...data, results: filterDrakor(data.results) };
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function usePopularDrakor(page: number = 1) {
  return useQuery({
    queryKey: drakorKeys.popular(page),
    queryFn: () => fetchFromApi<TMDBResponse<Drakor>>(
      `/discover/tv?page=${page}&with_original_language=ko&sort_by=popularity.desc`
    ),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useTopRatedDrakor(page: number = 1) {
  return useQuery({
    queryKey: drakorKeys.topRated(page),
    queryFn: () => fetchFromApi<TMDBResponse<Drakor>>(
      `/discover/tv?page=${page}&with_original_language=ko&sort_by=vote_average.desc&vote_count.gte=50`
    ),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useAiringDrakor(page: number = 1) {
  const today = new Date().toISOString().split('T')[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  return useQuery({
    queryKey: drakorKeys.airing(page),
    queryFn: () => fetchFromApi<TMDBResponse<Drakor>>(
      `/discover/tv?page=${page}&with_original_language=ko&air_date.gte=${thirtyDaysAgo}&air_date.lte=${today}&sort_by=popularity.desc`
    ),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useDrakorDetails(drakorId: number) {
  return useQuery({
    queryKey: drakorKeys.details(drakorId),
    queryFn: () => fetchFromApi<DrakorDetails>(`/tv/${drakorId}`),
    staleTime: 1000 * 60 * 10,
    enabled: !!drakorId,
  });
}

export function useDrakorCredits(drakorId: number) {
  return useQuery({
    queryKey: drakorKeys.credits(drakorId),
    queryFn: () => fetchFromApi<Credits>(`/tv/${drakorId}/credits`),
    staleTime: 1000 * 60 * 10,
    enabled: !!drakorId,
  });
}

export function useDrakorRecommendations(drakorId: number, page: number = 1) {
  return useQuery({
    queryKey: drakorKeys.recommendations(drakorId, page),
    queryFn: async () => {
      const data = await fetchFromApi<TMDBResponse<Drakor>>(
        `/tv/${drakorId}/recommendations?page=${page}`
      );
      return { ...data, results: filterDrakor(data.results) };
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!drakorId,
  });
}

export function useSimilarDrakor(drakorId: number, page: number = 1) {
  return useQuery({
    queryKey: drakorKeys.similar(drakorId, page),
    queryFn: async () => {
      const data = await fetchFromApi<TMDBResponse<Drakor>>(
        `/tv/${drakorId}/similar?page=${page}`
      );
      return { ...data, results: filterDrakor(data.results) };
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!drakorId,
  });
}

export function useDiscoverDrakor(params: DrakorFilterParams = {}) {
  const { genre, year, sortBy = 'popularity.desc', page = 1 } = params;
  
  const queryParams = new URLSearchParams({
    page: String(page),
    with_original_language: 'ko',
    sort_by: sortBy,
  });
  
  if (genre) {
    queryParams.set('with_genres', String(genre));
  }
  if (year) {
    queryParams.set('first_air_date_year', String(year));
  }
  
  return useQuery({
    queryKey: drakorKeys.discover(params),
    queryFn: () => fetchFromApi<TMDBResponse<Drakor>>(
      `/discover/tv?${queryParams.toString()}`
    ),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useInfiniteDiscoverDrakor(params: Omit<DrakorFilterParams, 'page'> = {}) {
  const { genre, year, sortBy = 'popularity.desc' } = params;
  
  return useInfiniteQuery({
    queryKey: [...drakorKeys.all, 'infinite', 'discover', params],
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = new URLSearchParams({
        page: String(pageParam),
        with_original_language: 'ko',
        sort_by: sortBy,
      });
      
      if (genre) {
        queryParams.set('with_genres', String(genre));
      }
      if (year) {
        queryParams.set('first_air_date_year', String(year));
      }
      
      return fetchFromApi<TMDBResponse<Drakor>>(
        `/discover/tv?${queryParams.toString()}`
      );
    },
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

export function useSearchDrakor(query: string, page: number = 1) {
  return useQuery({
    queryKey: drakorKeys.search(query, page),
    queryFn: async () => {
      const data = await fetchFromApi<TMDBResponse<Drakor>>(
        `/search/tv?query=${encodeURIComponent(query)}&page=${page}`
      );
      return { ...data, results: filterDrakor(data.results) };
    },
    staleTime: 1000 * 60 * 5,
    enabled: query.length >= 2,
  });
}
