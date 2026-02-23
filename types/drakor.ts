import type { TVShow, TVShowDetails, Genre } from './tmdb';

// Drakor (Korean Drama) extends TV Show with Korea-specific properties
export interface Drakor extends TVShow {
  // Drakor is essentially a Korean TV show
  media_type?: 'tv';
}

export interface DrakorDetails extends TVShowDetails {
  // Additional drakor-specific computed properties can be added here
}

// Common Korean Drama genres from TMDB
export const DRAKOR_GENRES: Genre[] = [
  { id: 18, name: 'Drama' },
  { id: 10749, name: 'Romance' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 9648, name: 'Mystery' },
  { id: 10759, name: 'Action & Adventure' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 10751, name: 'Family' },
  { id: 10768, name: 'War & Politics' },
];

export interface DrakorFilterParams {
  genre?: number;
  year?: number;
  sortBy?: 'popularity.desc' | 'vote_average.desc' | 'first_air_date.desc' | 'name.asc';
  page?: number;
}
