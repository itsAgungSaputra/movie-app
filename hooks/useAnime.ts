'use client';

import { useQuery, useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import type { TMDBResponse, Credits, TimeWindow } from '@/types/tmdb';
import type { Anime, AnimeDetails, AnimeFilterParams } from '@/types/anime';

const BASE_URL = '/api/tmdb';

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

// Filter results to only include Japanese animation
function filterAnime(results: Anime[]): Anime[] {
  return results.filter(
    show => (show.origin_country?.includes('JP') || show.original_language === 'ja')
  );
}

// Query keys factory
export const animeKeys = {
  all: ['anime'] as const,
  trending: (timeWindow: TimeWindow, page: number) => 
    [...animeKeys.all, 'trending', timeWindow, page] as const,
  popular: (page: number) => [...animeKeys.all, 'popular', page] as const,
  topRated: (page: number) => [...animeKeys.all, 'top-rated', page] as const,
  airing: (page: number) => [...animeKeys.all, 'airing', page] as const,
  details: (id: number) => [...animeKeys.all, 'details', id] as const,
  credits: (id: number) => [...animeKeys.all, 'credits', id] as const,
  recommendations: (id: number, page: number) => 
    [...animeKeys.all, 'recommendations', id, page] as const,
  similar: (id: number, page: number) => 
    [...animeKeys.all, 'similar', id, page] as const,
  discover: (params: AnimeFilterParams) => 
    [...animeKeys.all, 'discover', params] as const,
  search: (query: string, page: number) =>
    [...animeKeys.all, 'search', query, page] as const,
};

export function useTrendingAnime(timeWindow: TimeWindow = 'week', page: number = 1) {
  return useQuery({
    queryKey: animeKeys.trending(timeWindow, page),
    queryFn: async () => {
      const data = await fetchFromApi<TMDBResponse<Anime>>(
        `/trending/tv/${timeWindow}?page=${page}`
      );
      return { ...data, results: filterAnime(data.results) };
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function usePopularAnime(page: number = 1) {
  return useQuery({
    queryKey: animeKeys.popular(page),
    queryFn: () => fetchFromApi<TMDBResponse<Anime>>(
      `/discover/tv?page=${page}&with_original_language=ja&with_genres=16&sort_by=popularity.desc`
    ),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useTopRatedAnime(page: number = 1) {
  return useQuery({
    queryKey: animeKeys.topRated(page),
    queryFn: () => fetchFromApi<TMDBResponse<Anime>>(
      `/discover/tv?page=${page}&with_original_language=ja&with_genres=16&sort_by=vote_average.desc&vote_count.gte=100`
    ),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useAiringAnime(page: number = 1) {
  const today = new Date().toISOString().split('T')[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  return useQuery({
    queryKey: animeKeys.airing(page),
    queryFn: () => fetchFromApi<TMDBResponse<Anime>>(
      `/discover/tv?page=${page}&with_original_language=ja&with_genres=16&air_date.gte=${thirtyDaysAgo}&air_date.lte=${today}&sort_by=popularity.desc`
    ),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useAnimeDetails(animeId: number) {
  return useQuery({
    queryKey: animeKeys.details(animeId),
    queryFn: () => fetchFromApi<AnimeDetails>(`/tv/${animeId}`),
    staleTime: 1000 * 60 * 10,
    enabled: !!animeId,
  });
}

export function useAnimeCredits(animeId: number) {
  return useQuery({
    queryKey: animeKeys.credits(animeId),
    queryFn: () => fetchFromApi<Credits>(`/tv/${animeId}/credits`),
    staleTime: 1000 * 60 * 10,
    enabled: !!animeId,
  });
}

export function useAnimeRecommendations(animeId: number, page: number = 1) {
  return useQuery({
    queryKey: animeKeys.recommendations(animeId, page),
    queryFn: async () => {
      const data = await fetchFromApi<TMDBResponse<Anime>>(
        `/tv/${animeId}/recommendations?page=${page}`
      );
      return { ...data, results: filterAnime(data.results) };
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!animeId,
  });
}

export function useSimilarAnime(animeId: number, page: number = 1) {
  return useQuery({
    queryKey: animeKeys.similar(animeId, page),
    queryFn: async () => {
      const data = await fetchFromApi<TMDBResponse<Anime>>(
        `/tv/${animeId}/similar?page=${page}`
      );
      return { ...data, results: filterAnime(data.results) };
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!animeId,
  });
}

export function useDiscoverAnime(params: AnimeFilterParams = {}) {
  const { genre, year, sortBy = 'popularity.desc', page = 1 } = params;
  
  const queryParams = new URLSearchParams({
    page: String(page),
    with_original_language: 'ja',
    with_genres: genre ? `16,${genre}` : '16',
    sort_by: sortBy,
  });
  
  if (year) {
    queryParams.set('first_air_date_year', String(year));
  }
  
  return useQuery({
    queryKey: animeKeys.discover(params),
    queryFn: () => fetchFromApi<TMDBResponse<Anime>>(
      `/discover/tv?${queryParams.toString()}`
    ),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useInfiniteDiscoverAnime(params: Omit<AnimeFilterParams, 'page'> = {}) {
  const { genre, year, sortBy = 'popularity.desc' } = params;
  
  return useInfiniteQuery({
    queryKey: [...animeKeys.all, 'infinite', 'discover', params],
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = new URLSearchParams({
        page: String(pageParam),
        with_original_language: 'ja',
        with_genres: genre ? `16,${genre}` : '16',
        sort_by: sortBy,
      });
      
      if (year) {
        queryParams.set('first_air_date_year', String(year));
      }
      
      return fetchFromApi<TMDBResponse<Anime>>(
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

export function useSearchAnime(query: string, page: number = 1) {
  return useQuery({
    queryKey: animeKeys.search(query, page),
    queryFn: async () => {
      const data = await fetchFromApi<TMDBResponse<Anime>>(
        `/search/tv?query=${encodeURIComponent(query)}&page=${page}`
      );
      // Filter for Japanese animation
      const filtered = data.results.filter(
        show => (show.origin_country?.includes('JP') || show.original_language === 'ja') &&
                show.genre_ids?.includes(16)
      );
      return { ...data, results: filtered };
    },
    staleTime: 1000 * 60 * 5,
    enabled: query.length >= 2,
  });
}
