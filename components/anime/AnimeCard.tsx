import Image from 'next/image';
import Link from 'next/link';
import type { Anime } from '@/types/anime';
import { getImageUrl } from '@/utils/image';
import { formatYear, formatVoteAverage } from '@/utils/format';

interface AnimeCardProps {
  anime: Anime;
  priority?: boolean;
}

export function AnimeCard({ anime, priority = false }: AnimeCardProps) {
  return (
    <Link
      href={`/anime/${anime.id}`}
      className="group relative block overflow-hidden rounded-2xl focus-ring"
    >
      {/* Colorful glow effect on hover */}
      <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 blur-xl transition-opacity duration-500 ease-out will-change-opacity group-hover:opacity-60" style={{ transform: 'translateZ(0)' }} />
      
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-2xl bg-[#1a1a24]">
        <Image
          src={getImageUrl(anime.poster_path, 'w500')}
          alt={anime.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-110"
          style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          priority={priority}
        />
        
        {/* Colorful gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-purple-900/90 via-transparent to-transparent opacity-80" />
        
        {/* Anime badge with gradient */}
        <div className="absolute left-3 top-3">
          <span className="rounded-lg bg-linear-to-r from-pink-500 to-purple-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg shadow-purple-500/30">
            ANIME
          </span>
        </div>
        
        {/* Rating with star */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-black/50 px-2 py-1 backdrop-blur-sm">
          <svg className="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs font-bold text-white">{formatVoteAverage(anime.vote_average)}</span>
        </div>
        
        {/* Bottom info with vibrant styling */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="line-clamp-2 text-sm font-bold text-white drop-shadow-lg">
            {anime.name}
          </h3>
          {anime.original_name && anime.original_name !== anime.name && (
            <p className="mt-0.5 line-clamp-1 text-xs text-pink-200/80">
              {anime.original_name}
            </p>
          )}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-purple-200/90">
              {formatYear(anime.first_air_date)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface AnimeCardLargeProps {
  anime: Anime;
  priority?: boolean;
}

// Larger card variant for featured sections
export function AnimeCardLarge({ anime, priority = false }: AnimeCardLargeProps) {
  return (
    <Link
      href={`/anime/${anime.id}`}
      className="group relative block overflow-hidden rounded-3xl focus-ring"
    >
      {/* Multi-color glow effect */}
      <div className="absolute -inset-2 rounded-4xl bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 blur-2xl transition-opacity duration-500 ease-out will-change-opacity group-hover:opacity-70" style={{ transform: 'translateZ(0)' }} />
      
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl bg-[#1a1a24]">
        <Image
          src={getImageUrl(anime.poster_path, 'w780')}
          alt={anime.name}
          fill
          sizes="(max-width: 768px) 80vw, 40vw"
          className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
          style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          priority={priority}
        />
        
        {/* Rich gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f] via-purple-900/40 to-transparent" />
        
        {/* Top badges */}
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <span className="rounded-xl bg-linear-to-r from-pink-500 to-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-purple-500/40">
            ANIME
          </span>
          <div className="flex items-center gap-1.5 rounded-xl bg-black/60 px-3 py-1.5 backdrop-blur-md">
            <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-bold text-white">{formatVoteAverage(anime.vote_average)}</span>
          </div>
        </div>
        
        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="text-xl font-bold text-white drop-shadow-lg md:text-2xl">
            {anime.name}
          </h3>
          {anime.original_name && anime.original_name !== anime.name && (
            <p className="mt-1 text-sm text-pink-200/80">
              {anime.original_name}
            </p>
          )}
          <p className="mt-3 line-clamp-2 text-sm text-gray-300/90">
            {anime.overview || 'No description available.'}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300 ring-1 ring-purple-500/30">
              {formatYear(anime.first_air_date)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface AnimeCardCompactProps {
  anime: Anime;
  rank?: number;
  priority?: boolean;
}

// Compact card for lists/rankings
export function AnimeCardCompact({ anime, rank, priority = false }: AnimeCardCompactProps) {
  return (
    <Link
      href={`/anime/${anime.id}`}
      className="group relative flex gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-purple-500/10"
    >
      {/* Rank number */}
      {rank && (
        <div className="flex w-8 shrink-0 items-center justify-center">
          <span className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-b from-pink-400 to-purple-600">
            {rank}
          </span>
        </div>
      )}
      
      <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-[#1a1a24]">
        <Image
          src={getImageUrl(anime.poster_path, 'w154')}
          alt={anime.name}
          fill
          sizes="64px"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          priority={priority}
        />
      </div>
      
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-linear-to-r from-pink-500/20 to-purple-500/20 px-1.5 py-0.5 text-[10px] font-bold text-pink-400">
            ANIME
          </span>
        </div>
        <h3 className="mt-1 line-clamp-1 text-sm font-bold text-white transition-colors group-hover:text-pink-400">
          {anime.name}
        </h3>
        <p className="mt-1 text-xs text-gray-400">
          {formatYear(anime.first_air_date)}
        </p>
        <div className="mt-2 flex items-center gap-1">
          <svg className="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs font-medium text-gray-300">{formatVoteAverage(anime.vote_average)}</span>
        </div>
      </div>
    </Link>
  );
}
