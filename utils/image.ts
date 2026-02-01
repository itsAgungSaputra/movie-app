const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export type ImageSize = 
  | 'w92' 
  | 'w154' 
  | 'w185' 
  | 'w342' 
  | 'w500' 
  | 'w780' 
  | 'original';

export type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original';
export type ProfileSize = 'w45' | 'w185' | 'h632' | 'original';

export function getImageUrl(
  path: string | null | undefined,
  size: ImageSize = 'w500'
): string {
  if (!path) {
    return '/placeholder-poster.svg';
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function getBackdropUrl(
  path: string | null | undefined,
  size: BackdropSize = 'w1280'
): string {
  if (!path) {
    return '/placeholder-backdrop.svg';
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function getProfileUrl(
  path: string | null | undefined,
  size: ProfileSize = 'w185'
): string {
  if (!path) {
    return '/placeholder-profile.svg';
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}
