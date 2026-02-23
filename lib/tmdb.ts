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
import type { Anime, AnimeDetails, AnimeFilterParams } from '@/types/anime';
import type { Drakor, DrakorDetails, DrakorFilterParams } from '@/types/drakor';

const TMDB_BASE_URL = process.env.BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_ACCESS_TOKEN = process.env.API_READ_ACCESS_TOKEN;

if (!TMDB_ACCESS_TOKEN) {
  console.warn('Warning: API_READ_ACCESS_TOKEN is not set in environment variables');
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
  
  // Add default language
  url.searchParams.set('language', 'en-US');
  
  // Add additional params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
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

// ============================================
// ANIME ENDPOINTS (Japanese Animation)
// ============================================

// Get trending anime (Japanese TV shows with animation genre)
export async function getTrendingAnime(
  timeWindow: TimeWindow = 'week',
  page: number = 1
): Promise<TMDBResponse<Anime>> {
  // Use discover API with date filter for more reliable trending results
  const dateOffset = timeWindow === 'day' ? 7 : 30; // Last 7 days for 'day', 30 days for 'week'
  const dateFrom = new Date(Date.now() - dateOffset * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  return fetchFromTMDB<TMDBResponse<Anime>>('/discover/tv', {
    page,
    with_original_language: 'ja',
    with_genres: '16', // Animation genre
    sort_by: 'popularity.desc',
    'first_air_date.gte': dateFrom,
  });
}

// Get popular anime using discover with Japanese language filter
export async function getPopularAnime(page: number = 1): Promise<TMDBResponse<Anime>> {
  return fetchFromTMDB<TMDBResponse<Anime>>('/discover/tv', {
    page,
    with_original_language: 'ja',
    with_genres: '16', // Animation genre
    sort_by: 'popularity.desc',
  });
}

// Get top rated anime
export async function getTopRatedAnime(page: number = 1): Promise<TMDBResponse<Anime>> {
  return fetchFromTMDB<TMDBResponse<Anime>>('/discover/tv', {
    page,
    with_original_language: 'ja',
    with_genres: '16', // Animation genre
    sort_by: 'vote_average.desc',
    'vote_count.gte': 100, // Ensure quality ratings
  });
}

// Get currently airing anime
export async function getAiringAnime(page: number = 1): Promise<TMDBResponse<Anime>> {
  return fetchFromTMDB<TMDBResponse<Anime>>('/discover/tv', {
    page,
    with_original_language: 'ja',
    with_genres: '16',
    'air_date.gte': new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    'air_date.lte': new Date().toISOString().split('T')[0],
    sort_by: 'popularity.desc',
  });
}

// Discover anime with filters
export async function discoverAnime(
  params: AnimeFilterParams = {}
): Promise<TMDBResponse<Anime>> {
  const { genre, year, sortBy = 'popularity.desc', page = 1 } = params;
  
  return fetchFromTMDB<TMDBResponse<Anime>>('/discover/tv', {
    page,
    with_original_language: 'ja',
    with_genres: genre ? `16,${genre}` : '16', // Always include Animation
    first_air_date_year: year,
    sort_by: sortBy,
  });
}

// Get anime details
export async function getAnimeDetails(animeId: number): Promise<AnimeDetails> {
  return fetchFromTMDB<AnimeDetails>(`/tv/${animeId}`);
}

// Get anime credits
export async function getAnimeCredits(animeId: number): Promise<Credits> {
  return fetchFromTMDB<Credits>(`/tv/${animeId}/credits`);
}

// Get anime recommendations
export async function getAnimeRecommendations(
  animeId: number,
  page: number = 1
): Promise<TMDBResponse<Anime>> {
  const response = await fetchFromTMDB<TMDBResponse<TVShow>>(`/tv/${animeId}/recommendations`, { page });
  const filteredResults = response.results.filter(
    show => show.origin_country?.includes('JP') || show.original_language === 'ja'
  );
  return { ...response, results: filteredResults as Anime[] };
}

// Get similar anime
export async function getSimilarAnime(
  animeId: number,
  page: number = 1
): Promise<TMDBResponse<Anime>> {
  const response = await fetchFromTMDB<TMDBResponse<TVShow>>(`/tv/${animeId}/similar`, { page });
  const filteredResults = response.results.filter(
    show => show.origin_country?.includes('JP') || show.original_language === 'ja'
  );
  return { ...response, results: filteredResults as Anime[] };
}

// Search anime
export async function searchAnime(
  query: string,
  page: number = 1
): Promise<TMDBResponse<Anime>> {
  const response = await fetchFromTMDB<TMDBResponse<TVShow>>('/search/tv', {
    query,
    page,
  });
  const filteredResults = response.results.filter(
    show => (show.origin_country?.includes('JP') || show.original_language === 'ja') && 
            show.genre_ids?.includes(16)
  );
  return { ...response, results: filteredResults as Anime[] };
}

// ============================================
// DRAKOR ENDPOINTS (Korean Drama)
// ============================================

// Get trending drakor (Korean TV shows)
export async function getTrendingDrakor(
  timeWindow: TimeWindow = 'week',
  page: number = 1
): Promise<TMDBResponse<Drakor>> {
  // Use discover API with date filter for more reliable trending results
  const dateOffset = timeWindow === 'day' ? 7 : 30; // Last 7 days for 'day', 30 days for 'week'
  const dateFrom = new Date(Date.now() - dateOffset * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  return fetchFromTMDB<TMDBResponse<Drakor>>('/discover/tv', {
    page,
    with_original_language: 'ko',
    sort_by: 'popularity.desc',
    'first_air_date.gte': dateFrom,
  });
}

// Get popular drakor using discover with Korean language filter
export async function getPopularDrakor(page: number = 1): Promise<TMDBResponse<Drakor>> {
  return fetchFromTMDB<TMDBResponse<Drakor>>('/discover/tv', {
    page,
    with_original_language: 'ko',
    sort_by: 'popularity.desc',
  });
}

// Get top rated drakor
export async function getTopRatedDrakor(page: number = 1): Promise<TMDBResponse<Drakor>> {
  return fetchFromTMDB<TMDBResponse<Drakor>>('/discover/tv', {
    page,
    with_original_language: 'ko',
    sort_by: 'vote_average.desc',
    'vote_count.gte': 50, // Ensure quality ratings
  });
}

// Get currently airing drakor
export async function getAiringDrakor(page: number = 1): Promise<TMDBResponse<Drakor>> {
  return fetchFromTMDB<TMDBResponse<Drakor>>('/discover/tv', {
    page,
    with_original_language: 'ko',
    'air_date.gte': new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    'air_date.lte': new Date().toISOString().split('T')[0],
    sort_by: 'popularity.desc',
  });
}

// Discover drakor with filters
export async function discoverDrakor(
  params: DrakorFilterParams = {}
): Promise<TMDBResponse<Drakor>> {
  const { genre, year, sortBy = 'popularity.desc', page = 1 } = params;
  
  return fetchFromTMDB<TMDBResponse<Drakor>>('/discover/tv', {
    page,
    with_original_language: 'ko',
    with_genres: genre,
    first_air_date_year: year,
    sort_by: sortBy,
  });
}

// Get drakor details
export async function getDrakorDetails(drakorId: number): Promise<DrakorDetails> {
  return fetchFromTMDB<DrakorDetails>(`/tv/${drakorId}`);
}

// Get drakor credits
export async function getDrakorCredits(drakorId: number): Promise<Credits> {
  return fetchFromTMDB<Credits>(`/tv/${drakorId}/credits`);
}

// Get drakor recommendations
export async function getDrakorRecommendations(
  drakorId: number,
  page: number = 1
): Promise<TMDBResponse<Drakor>> {
  const response = await fetchFromTMDB<TMDBResponse<TVShow>>(`/tv/${drakorId}/recommendations`, { page });
  const filteredResults = response.results.filter(
    show => show.origin_country?.includes('KR') || show.original_language === 'ko'
  );
  return { ...response, results: filteredResults as Drakor[] };
}

// Get similar drakor
export async function getSimilarDrakor(
  drakorId: number,
  page: number = 1
): Promise<TMDBResponse<Drakor>> {
  const response = await fetchFromTMDB<TMDBResponse<TVShow>>(`/tv/${drakorId}/similar`, { page });
  const filteredResults = response.results.filter(
    show => show.origin_country?.includes('KR') || show.original_language === 'ko'
  );
  return { ...response, results: filteredResults as Drakor[] };
}

// Search drakor
export async function searchDrakor(
  query: string,
  page: number = 1
): Promise<TMDBResponse<Drakor>> {
  const response = await fetchFromTMDB<TMDBResponse<TVShow>>('/search/tv', {
    query,
    page,
  });
  const filteredResults = response.results.filter(
    show => show.origin_country?.includes('KR') || show.original_language === 'ko'
  );
  return { ...response, results: filteredResults as Drakor[] };
}

// Export error class for use in error handling
export { TMDBApiError };
