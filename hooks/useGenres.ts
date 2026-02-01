'use client';

import { useQuery } from '@tanstack/react-query';
import type { Genre } from '@/types/tmdb';

const BASE_URL = '/api/tmdb';

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

// Query keys factory
export const genreKeys = {
  all: ['genres'] as const,
  movie: () => [...genreKeys.all, 'movie'] as const,
  tv: () => [...genreKeys.all, 'tv'] as const,
};

export function useMovieGenres() {
  return useQuery({
    queryKey: genreKeys.movie(),
    queryFn: () => fetchFromApi<{ genres: Genre[] }>('/genre/movie/list')
      .then(data => data.genres),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - genres rarely change
  });
}

export function useTVGenres() {
  return useQuery({
    queryKey: genreKeys.tv(),
    queryFn: () => fetchFromApi<{ genres: Genre[] }>('/genre/tv/list')
      .then(data => data.genres),
    staleTime: 1000 * 60 * 60 * 24,
  });
}
