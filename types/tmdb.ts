// Base types
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// Movie types
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  video: boolean;
  media_type?: 'movie';
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  imdb_id: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
}

// TV Show types
export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  origin_country: string[];
  media_type?: 'tv';
}

export interface Season {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

export interface Network {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

export interface TVShowDetails extends Omit<TVShow, 'genre_ids'> {
  created_by: CreatedBy[];
  episode_run_time: number[];
  genres: Genre[];
  homepage: string | null;
  in_production: boolean;
  languages: string[];
  last_air_date: string | null;
  last_episode_to_air: Episode | null;
  next_episode_to_air: Episode | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  type: string;
}

// Person/Cast types
export interface CastMember {
  id: number;
  name: string;
  original_name: string;
  profile_path: string | null;
  character: string;
  credit_id: string;
  order: number;
  gender: number;
  known_for_department: string;
  popularity: number;
  adult: boolean;
}

export interface CrewMember {
  id: number;
  name: string;
  original_name: string;
  profile_path: string | null;
  department: string;
  job: string;
  credit_id: string;
  gender: number;
  known_for_department: string;
  popularity: number;
  adult: boolean;
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

// Search types
export interface MultiSearchResult {
  id: number;
  media_type: 'movie' | 'tv' | 'person';
  name?: string;
  title?: string;
  original_name?: string;
  original_title?: string;
  overview?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  profile_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  popularity: number;
  adult?: boolean;
  genre_ids?: number[];
  known_for_department?: string;
  known_for?: (Movie | TVShow)[];
}

// API response types
export interface GenresResponse {
  genres: Genre[];
}

// Filter types
export type TimeWindow = 'day' | 'week';
export type MediaType = 'movie' | 'tv' | 'all';
export type SortBy = 
  | 'popularity.asc' 
  | 'popularity.desc' 
  | 'vote_average.asc' 
  | 'vote_average.desc'
  | 'release_date.asc'
  | 'release_date.desc'
  | 'primary_release_date.asc'
  | 'primary_release_date.desc'
  | 'first_air_date.asc'
  | 'first_air_date.desc';

export interface DiscoverMovieParams {
  [key: string]: string | number | boolean | undefined;
  page?: number;
  sort_by?: SortBy;
  year?: number;
  primary_release_year?: number;
  with_genres?: string;
}

export interface DiscoverTVParams {
  [key: string]: string | number | boolean | undefined;
  page?: number;
  sort_by?: SortBy;
  first_air_date_year?: number;
  with_genres?: string;
}

export interface SearchParams {
  [key: string]: string | number | boolean | undefined;
  query: string;
  page?: number;
  include_adult?: boolean;
}
