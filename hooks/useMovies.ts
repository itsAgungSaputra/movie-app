'use client';

import { useQuery, useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import type {
  TMDBResponse,
  Movie,
  MovieDetails,
  Credits,
  DiscoverMovieParams,
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
export const movieKeys = {
  all: ['movies'] as const,
  trending: (timeWindow: TimeWindow, page: number) => 
    [...movieKeys.all, 'trending', timeWindow, page] as const,
  popular: (page: number) => [...movieKeys.all, 'popular', page] as const,
  topRated: (page: number) => [...movieKeys.all, 'top-rated', page] as const,
  upcoming: (page: number) => [...movieKeys.all, 'upcoming', page] as const,
  nowPlaying: (page: number) => [...movieKeys.all, 'now-playing', page] as const,
  details: (id: number) => [...movieKeys.all, 'details', id] as const,
  credits: (id: number) => [...movieKeys.all, 'credits', id] as const,
  recommendations: (id: number, page: number) => 
    [...movieKeys.all, 'recommendations', id, page] as const,
  similar: (id: number, page: number) => 
    [...movieKeys.all, 'similar', id, page] as const,
  discover: (params: DiscoverMovieParams) => 
    [...movieKeys.all, 'discover', params] as const,
};

export function useTrendingMovies(timeWindow: TimeWindow = 'week', page: number = 1) {
  return useQuery({
    queryKey: movieKeys.trending(timeWindow, page),
    queryFn: () => fetchFromApi<TMDBResponse<Movie>>(
      `/trending/movie/${timeWindow}?page=${page}`
    ),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: keepPreviousData,
  });
}

export function usePopularMovies(page: number = 1) {
  return useQuery({
    queryKey: movieKeys.popular(page),
    queryFn: () => fetchFromApi<TMDBResponse<Movie>>(`/movie/popular?page=${page}`),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useTopRatedMovies(page: number = 1) {
  return useQuery({
    queryKey: movieKeys.topRated(page),
    queryFn: () => fetchFromApi<TMDBResponse<Movie>>(`/movie/top_rated?page=${page}`),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useUpcomingMovies(page: number = 1) {
  return useQuery({
    queryKey: movieKeys.upcoming(page),
    queryFn: () => fetchFromApi<TMDBResponse<Movie>>(`/movie/upcoming?page=${page}`),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useNowPlayingMovies(page: number = 1) {
  return useQuery({
    queryKey: movieKeys.nowPlaying(page),
    queryFn: () => fetchFromApi<TMDBResponse<Movie>>(`/movie/now_playing?page=${page}`),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useMovieDetails(movieId: number) {
  return useQuery({
    queryKey: movieKeys.details(movieId),
    queryFn: () => fetchFromApi<MovieDetails>(`/movie/${movieId}`),
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!movieId,
  });
}

export function useMovieCredits(movieId: number) {
  return useQuery({
    queryKey: movieKeys.credits(movieId),
    queryFn: () => fetchFromApi<Credits>(`/movie/${movieId}/credits`),
    staleTime: 1000 * 60 * 30,
    enabled: !!movieId,
  });
}

export function useMovieRecommendations(movieId: number, page: number = 1) {
  return useQuery({
    queryKey: movieKeys.recommendations(movieId, page),
    queryFn: () => fetchFromApi<TMDBResponse<Movie>>(
      `/movie/${movieId}/recommendations?page=${page}`
    ),
    staleTime: 1000 * 60 * 5,
    enabled: !!movieId,
  });
}

export function useDiscoverMovies(params: DiscoverMovieParams = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });
  
  return useQuery({
    queryKey: movieKeys.discover(params),
    queryFn: () => fetchFromApi<TMDBResponse<Movie>>(
      `/discover/movie?${searchParams.toString()}`
    ),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useInfiniteDiscoverMovies(params: Omit<DiscoverMovieParams, 'page'> = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });
  
  return useInfiniteQuery({
    queryKey: [...movieKeys.all, 'discover-infinite', params],
    queryFn: ({ pageParam = 1 }) => fetchFromApi<TMDBResponse<Movie>>(
      `/discover/movie?${searchParams.toString()}&page=${pageParam}`
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
