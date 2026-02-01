import type {
  TMDBResponse,
  Movie,
  MovieDetails,
  TVShow,
  TVShowDetails,
  Credits,
  MultiSearchResult,
  Genre,
  GenresResponse,
  TimeWindow,
  DiscoverMovieParams,
  DiscoverTVParams,
  SearchParams,
} from '@/types/tmdb';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TMDB_API_KEY) {
  console.warn('Warning: TMDB_API_KEY is not set in environment variables');
}

class TMDBApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'TMDBApiError';
  }
}

async function fetchFromTMDB<T>(
  endpoint: string,
  params: Record<string, string | number | boolean | undefined | null> = {}
): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  
  // Add API key and default language
  url.searchParams.set('api_key', TMDB_API_KEY || '');
  url.searchParams.set('language', 'en-US');
  
  // Add additional params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new TMDBApiError(
      response.status,
      `TMDB API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

// Movie endpoints
export async function getTrendingMovies(
  timeWindow: TimeWindow = 'week',
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>(`/trending/movie/${timeWindow}`, { page });
}

export async function getPopularMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>('/movie/popular', { page });
}

export async function getTopRatedMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>('/movie/top_rated', { page });
}

export async function getUpcomingMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>('/movie/upcoming', { page });
}

export async function getNowPlayingMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>('/movie/now_playing', { page });
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  return fetchFromTMDB<MovieDetails>(`/movie/${movieId}`);
}

export async function getMovieCredits(movieId: number): Promise<Credits> {
  return fetchFromTMDB<Credits>(`/movie/${movieId}/credits`);
}

export async function getMovieRecommendations(
  movieId: number,
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>(`/movie/${movieId}/recommendations`, { page });
}

export async function getSimilarMovies(
  movieId: number,
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>(`/movie/${movieId}/similar`, { page });
}

export async function discoverMovies(
  params: DiscoverMovieParams = {}
): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>('/discover/movie', params);
}

// TV Show endpoints
export async function getTrendingTVShows(
  timeWindow: TimeWindow = 'week',
  page: number = 1
): Promise<TMDBResponse<TVShow>> {
  return fetchFromTMDB<TMDBResponse<TVShow>>(`/trending/tv/${timeWindow}`, { page });
}

export async function getPopularTVShows(page: number = 1): Promise<TMDBResponse<TVShow>> {
  return fetchFromTMDB<TMDBResponse<TVShow>>('/tv/popular', { page });
}

export async function getTopRatedTVShows(page: number = 1): Promise<TMDBResponse<TVShow>> {
  return fetchFromTMDB<TMDBResponse<TVShow>>('/tv/top_rated', { page });
}

export async function getOnTheAirTVShows(page: number = 1): Promise<TMDBResponse<TVShow>> {
  return fetchFromTMDB<TMDBResponse<TVShow>>('/tv/on_the_air', { page });
}

export async function getAiringTodayTVShows(page: number = 1): Promise<TMDBResponse<TVShow>> {
  return fetchFromTMDB<TMDBResponse<TVShow>>('/tv/airing_today', { page });
}

export async function getTVShowDetails(tvId: number): Promise<TVShowDetails> {
  return fetchFromTMDB<TVShowDetails>(`/tv/${tvId}`);
}

export async function getTVShowCredits(tvId: number): Promise<Credits> {
  return fetchFromTMDB<Credits>(`/tv/${tvId}/credits`);
}

export async function getTVShowRecommendations(
  tvId: number,
  page: number = 1
): Promise<TMDBResponse<TVShow>> {
  return fetchFromTMDB<TMDBResponse<TVShow>>(`/tv/${tvId}/recommendations`, { page });
}

export async function getSimilarTVShows(
  tvId: number,
  page: number = 1
): Promise<TMDBResponse<TVShow>> {
  return fetchFromTMDB<TMDBResponse<TVShow>>(`/tv/${tvId}/similar`, { page });
}

export async function discoverTVShows(
  params: DiscoverTVParams = {}
): Promise<TMDBResponse<TVShow>> {
  return fetchFromTMDB<TMDBResponse<TVShow>>('/discover/tv', params);
}

// Search endpoints
export async function searchMulti(
  params: SearchParams
): Promise<TMDBResponse<MultiSearchResult>> {
  return fetchFromTMDB<TMDBResponse<MultiSearchResult>>('/search/multi', params);
}

export async function searchMovies(
  params: SearchParams
): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>('/search/movie', params);
}

export async function searchTVShows(
  params: SearchParams
): Promise<TMDBResponse<TVShow>> {
  return fetchFromTMDB<TMDBResponse<TVShow>>('/search/tv', params);
}

// Genre endpoints
export async function getMovieGenres(): Promise<Genre[]> {
  const response = await fetchFromTMDB<GenresResponse>('/genre/movie/list');
  return response.genres;
}

export async function getTVGenres(): Promise<Genre[]> {
  const response = await fetchFromTMDB<GenresResponse>('/genre/tv/list');
  return response.genres;
}

// Export error class for use in error handling
export { TMDBApiError };
