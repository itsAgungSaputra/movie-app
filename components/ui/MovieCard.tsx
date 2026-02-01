import Image from 'next/image';
import Link from 'next/link';
import type { Movie } from '@/types/tmdb';
import { getImageUrl } from '@/utils/image';
import { formatYear, formatVoteAverage } from '@/utils/format';
import { RatingBadge } from './RatingBadge';

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

export function MovieCard({ movie, priority = false }: MovieCardProps) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative block overflow-hidden rounded-2xl card-hover focus-ring"
    >
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-2xl bg-[#1a1a24]">
        <Image
          src={getImageUrl(movie.poster_path, 'w342')}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
          priority={priority}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Rating badge */}
        <div className="absolute right-3 top-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
          <RatingBadge rating={movie.vote_average} size="sm" />
        </div>
        
        {/* Bottom info overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="line-clamp-2 text-sm font-semibold text-white drop-shadow-lg">
            {movie.title}
          </h3>
          <p className="mt-1 text-xs text-gray-300">
            {formatYear(movie.release_date)}
          </p>
        </div>
      </div>
      
      {/* Default title below card */}
      <div className="mt-3 space-y-1 px-1">
        <h3 className="line-clamp-2 text-sm font-medium text-white/90 transition-colors group-hover:text-rose-400">
          {movie.title}
        </h3>
        <p className="text-xs text-gray-500">
          {formatYear(movie.release_date)}
        </p>
      </div>
    </Link>
  );
}

interface MovieCardCompactProps {
  movie: Movie;
  priority?: boolean;
}

export function MovieCardCompact({ movie, priority = false }: MovieCardCompactProps) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative flex gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-white/5 glass-card"
    >
      <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-[#1a1a24]">
        <Image
          src={getImageUrl(movie.poster_path, 'w154')}
          alt={movie.title}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
        />
      </div>
      
      <div className="flex flex-1 flex-col justify-center">
        <h3 className="line-clamp-2 text-sm font-semibold text-white transition-colors group-hover:text-rose-400">
          {movie.title}
        </h3>
        <p className="mt-1.5 text-xs text-gray-400">
          {formatYear(movie.release_date)}
        </p>
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center gap-1 rounded-md bg-yellow-500/20 px-2 py-0.5">
            <svg className="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-medium text-yellow-400">{formatVoteAverage(movie.vote_average)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
