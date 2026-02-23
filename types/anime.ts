import type { TVShow, TVShowDetails, Genre } from './tmdb';

// Anime extends TV Show with Japan-specific properties
export interface Anime extends TVShow {
  // Anime is essentially a Japanese TV show
  media_type?: 'tv';
}

export interface AnimeDetails extends TVShowDetails {
  // Additional anime-specific computed properties can be added here
}

// Anime-specific genre IDs from TMDB
export const ANIME_GENRE_IDS = {
  ACTION_ADVENTURE: 10759,
  ANIMATION: 16,
  COMEDY: 35,
  DRAMA: 18,
  FAMILY: 10751,
  FANTASY: 10765, // Sci-Fi & Fantasy
  KIDS: 10762,
  MYSTERY: 9648,
  ROMANCE: 10749,
} as const;

// Common anime genres for filtering
export const ANIME_GENRES: Genre[] = [
  { id: 16, name: 'Animation' },
  { id: 10759, name: 'Action & Adventure' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 10749, name: 'Romance' },
  { id: 9648, name: 'Mystery' },
  { id: 10751, name: 'Family' },
];

export interface AnimeFilterParams {
  genre?: number;
  year?: number;
  sortBy?: 'popularity.desc' | 'vote_average.desc' | 'first_air_date.desc' | 'name.asc';
  page?: number;
}
